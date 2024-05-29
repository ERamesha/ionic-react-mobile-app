import { IonPage, IonRow, IonContent, IonGrid, IonCol, IonFooter, IonImg, IonIcon,IonLabel, IonTabButton } from '@ionic/react';
import './HomeScreen.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { notifications, home, settings, fileTrayFull, fileTray, document,settingsOutline,notificationsOutline,documentOutline,homeOutline  } from 'ionicons/icons';

const HomeScreen: React.FC = () => {
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [sentItemCount, setSentItemCount] = useState<number | null>(null);
  const [receivedItemCount, setReceivedItemCount] = useState<number | null>(null);
  const history = useHistory();


  useEffect(() => {
    const fetchItemCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/item_count');
        const data = response.data;
        // Assuming you want to display data for warehouse with ID 1
        const warehouseId = 2;

        if (data[warehouseId]) {
          setItemCount(data[warehouseId].item_count);
          setSentItemCount(data[warehouseId].sent_items);
          setReceivedItemCount(data[warehouseId].receiving_items);
        } else {
          setItemCount(0);
          setSentItemCount(0);
          setReceivedItemCount(0);
        }
      } catch (error) {
        console.error('Error fetching item counts:', error);
        setItemCount(0);
        setSentItemCount(0);
        setReceivedItemCount(0);
      }
    };

    fetchItemCounts();
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div id='Homescreen'>
          <IonGrid>
            <IonRow>
              <IonCol size='12' id='Rectangle147'>
                <div id='title_name'>Timing Technologies</div>
              </IonCol>
              <IonCol size='12' id='Rectangle147'>
                <div id='title_name'>Secundrabad warehouse</div>
              </IonCol>
            </IonRow>
            {/* <IonRow>
              <IonCol size="6"></IonCol>
              <IonCol size="6" id="Rectangle160">
                <div id="createchallan">Create Challan</div>
              </IonCol>
            </IonRow> */}
            <IonRow  id='Rectangle148'>
              <IonCol size='6'>
                <div id='deliverychallan'>Delivery Challan</div>
              </IonCol>
              <IonCol size='6'>
                <div id='viewall1'>View All</div>
              </IonCol>
            </IonRow>
            <IonRow id='Rectangle153'>
              <IonCol>
                <div id='receivingchallan'>Receiving Challan</div>
              </IonCol>
              <IonCol>
                <div id='viewall2'>View All</div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol id="Rectangle151">
                <div id='inventorystatus'>Inventory Status</div>
                <table>
                  <tbody>
                    <tr id='Rectangle156'>
                      <th id='total_warehouse'>Total Items in the Warehouse</th>
                      <td id='Rectangle157'>
                        <div id='total_warehouse_count'>
                          {itemCount !== null ? itemCount : 'Loading...'}
                        </div>
                      </td>
                    </tr>
                    <tr id='Rectangle155'>
                      <th id='total_items_sent'>Total Items Sent</th>
                      <td id='Rectangle158'>
                        <div id='total_items_sent_count'>
                          {sentItemCount !== null ? sentItemCount : 'Loading...'}
                        </div>
                      </td>
                    </tr>
                    <tr id='Rectangle154'>
                      <th id='total_items_recieved'>Total Items to be received</th>
                      <td id='Rectangle159'>
                        <div id='total_items_recieved_count' >
                          {receivedItemCount !== null ? receivedItemCount : 'Loading...'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </IonCol>
            </IonRow>
            <IonFooter id="Group34">
              <IonRow id="Group33">
                <div className="navbar">
                  <div className="nav-item">
                    <IonIcon icon={notificationsOutline} className="icon" onClick={() => history.push('/notifications')}/>
                    <span className="text">Notification</span>
                  </div>
                  <div className="separator"></div>
                  <div className="nav-item">
                    <IonIcon icon={documentOutline} className="icon" onClick={() => history.push('/deliverychallan')}/>
                    <span className="text">Delivery<br/> Challan</span>
                  </div>
                  <div className="separator"></div>
                  <div className="nav-item">
                    <IonIcon icon={documentOutline} className="icon" onClick={() => history.push('/receivingchallan')}/>
                    <span className="text">Receiving<br/> Challan</span>
                  </div>
                  <div className="separator"></div>
                  <div className="nav-item">
                    <IonIcon icon={homeOutline} className="icon" onClick={() => history.push('/home')}/>
                    <span className="text">Home</span>
                  </div>
                  <div className="separator"></div>
                  <div className="nav-item">
                    <IonIcon icon={settingsOutline} className="icon" onClick={() => history.push('/settings')}/>
                    <span className="text">Settings</span>
                  </div>
                </div>
              </IonRow>
            </IonFooter>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default HomeScreen;
