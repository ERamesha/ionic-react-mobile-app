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
interface ChallanItem {
  item_list_id: string;
  item_name: string;
  item_weight: string;
}

const ReceivingChallan: React.FC = () => {
  const [challan, setChallan] = useState<ChallanItem[]>([]);

  useEffect(() => {
    const fetchrechallancounts = async() => {
       try{
          const response = await axios.get('http://localhost:5000/recieving_challan')
          const data = response.data
          setChallan(data)
          console.log(data)
       }catch(error){
            console.error('Error fetching challan counts:', error)
       }

    };
    fetchrechallancounts();

  },[]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonTitle className="ion-text-center" style={{background:'rgba(232, 232, 232, 1)'}}>Warehouse Name</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <div className="header">Receiving Challan</div>
              <table className="item-table">
                <thead>
                  <tr>
                    <th>item_list_id</th>
                    <th>item_name</th>
                    <th>item_weight</th>
                  </tr>
                </thead>
                <tbody>
                {challan.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item_list_id}</td>
                      <td>{item.item_name}</td>
                      <td>{item.item_weight}</td>
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

export default ReceivingChallan;
