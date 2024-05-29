import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { notifications, home, settings } from 'ionicons/icons';
import './Challan.css';
import axios from 'axios';

// Define the type for a challan item
interface ChallanItem {
  challan_id: string;
  delivery_status: string;
  shipment_date: string;
}

const DeliveryChallan: React.FC = () => {
  // Initialize the state with an empty array and specify the type
  const [challan, setChallan] = useState<ChallanItem[]>([]);

  useEffect(() => {
    const fetchChallanCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/delivery_challan');
        const data: ChallanItem[] = response.data;
        setChallan(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching challan counts:', error);
      }
    };

    fetchChallanCounts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center" style={{backgroundColor:'rgba(232, 232, 232, 1)'}}>Warehouse Name</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <div className="header">Delivery Challan</div>
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Challan ID</th>
                    <th>Delivery Status</th>
                    <th>Shipment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {challan.map((item, index) => (
                    <tr key={index}>
                      <td>{item.challan_id}</td>
                      <td>{item.delivery_status}</td>
                      <td>{item.shipment_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonTabBar slot="bottom">
          <IonTabButton tab="notifications" href="/notifications">
            <IonIcon icon={notifications} />
            <IonLabel>Notifications</IonLabel>
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default DeliveryChallan;
