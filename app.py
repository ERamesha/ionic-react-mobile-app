from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import logging

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:8100"])  # Include all necessary origins

# Configure MySQL connection
db_config = {
    'user': 'warehouse_ttipl',
    'password': 'warehouse@ttipl',
    'host': '10.10.10.10',
    'database': 'warehouse',
    'port': 3306
}

# Set up logging
logging.basicConfig(level=logging.DEBUG)

def get_user(username):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT user_name, user_password, user_role FROM users WHERE user_name = %s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    print(user)
    logging.debug('User data:', user)  # Log user data
    cursor.close()
    conn.close()
    return user

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    logging.debug('Received login request with data: %s', data)

    if not data:
        logging.error('No data received')
        return jsonify({"success": False, "error": "Invalid request"}), 400

    user_name = data.get('username')
    user_password = data.get('password')

    if not user_name or not user_password:
        logging.debug('Missing username or password')
        return jsonify({"success": False, "error": "Missing username or password"}), 400

    user = get_user(user_name)

    if user and user['user_password'] == user_password:
        logging.debug('User authenticated successfully')
        return jsonify({"success": True, "user_role": user['user_role']}), 200
    else:
        logging.debug('Authentication failed for user: %s', user_name)
        return jsonify({"success": False, "error": "Invalid credentials"}), 401
    
def get_item_count(db_config):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Query for item count by warehouse
        query_count = """
            SELECT w.warehouse_id, COUNT(i.item_id) AS item_count 
            FROM warehouses w 
            JOIN items i ON i.warehouse_id = w.warehouse_id 
            GROUP BY w.warehouse_id;
        """

        # Query for sent items
        query_sent_items = """
            SELECT w.warehouse_id, SUM(rl.item_count) AS total_item_count 
            FROM warehouses w 
            JOIN requests r ON w.warehouse_id = r.from_warehouse 
            JOIN request_items_list rl ON r.request_id = rl.request_id 
            WHERE r.request_status = 1 
            GROUP BY w.warehouse_id;
        """

        # Query for receiving items
        query_receiving_items = """
            SELECT w.warehouse_id, SUM(rl.item_count) AS total_item_count 
            FROM warehouses w 
            JOIN requests r ON w.warehouse_id = r.to_warehouse 
            JOIN request_items_list rl ON r.request_id = rl.request_id 
            WHERE r.request_status = 1 
            GROUP BY w.warehouse_id;
        """

        cursor.execute(query_count)
        item_counts = cursor.fetchall()
        print('item_counts====', item_counts)

        cursor.execute(query_sent_items)
        sent_items = cursor.fetchall()
        print('sent_items=========',  sent_items)

        cursor.execute(query_receiving_items)
        receiving_items = cursor.fetchall()
        print('receiving_items=========', receiving_items)

        result = {}
        for item in item_counts:
            warehouse_id = item['warehouse_id']
            result[warehouse_id] = {
                'item_count': item['item_count'],
                'sent_items': 0,
                'receiving_items': 0
            }

        for item in sent_items:
            warehouse_id = item['warehouse_id']
            if warehouse_id in result:
                result[warehouse_id]['sent_items'] = item['total_item_count']

        for item in receiving_items:
            warehouse_id = item['warehouse_id']
            if warehouse_id in result:
                result[warehouse_id]['receiving_items'] = item['total_item_count']

        return result
    except mysql.connector.Error as err:
        logging.error("Error: %s", err)
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/item_count')
def item_count():
    count = get_item_count(db_config)
    if count is not None:
        return jsonify(count)
        
    else:
        return jsonify({'error': 'Failed to retrieve item counts'}), 500

def delchallans(db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = 'SELECT challan_id, delivery_status, shipment_date FROM challans'
        cursor.execute(query)
        challans = cursor.fetchall()
        cursor.close()
        conn.close()
        return challans
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

@app.route('/delivery_challan', methods=['GET'])
def delivery_challan():
    delivery_challans = delchallans(db_config)
    if delivery_challans is not None:
        return jsonify(delivery_challans)
    else:
        return jsonify({'error': 'Failed to retrieve delchallans'}), 500
    
def rechallans(db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = 'select item_list_id,item_name,item_weight from items_list'
        cursor.execute(query)
        challans_rec = cursor.fetchall()
        cursor.close()
        conn.close()
        return challans_rec
    except mysql.connector.Error as err1:
        print(f"Error:{err1}")
        return None
    
@app.route('/recieving_challan', methods=['GET'])
def recieving_challan():
    recieving_challans = rechallans(db_config)
    if recieving_challans is not None:
        return jsonify(recieving_challans)
    else:
        return jsonify({'error':'failed to retrieve rechallans'}), 500

if __name__ == '__main__':
    app.run(debug=True)
