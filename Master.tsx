import { IonPage, IonRow, IonContent, IonGrid, IonCol, IonFooter, IonImg, IonIcon,IonLabel, IonTabButton } from '@ionic/react';
import React from 'react';
import './HomeScreen.css';
import { useHistory } from 'react-router';

import { notifications, home, settings, fileTrayFull, fileTray, document,settingsOutline,notificationsOutline,documentOutline,homeOutline  } from 'ionicons/icons';

const HomeScreen: React.FC = () => {

  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div id='Homescreen'>
          <IonGrid>
            <IonRow>
              <IonCol size='12' id='Rectangle147'>
                <div id='title_name'>MASTER PAGE</div>
              </IonCol>
              <IonCol size='12' id='Rectangle147'>
                <div id='title_name'>Warehouse Name</div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6"></IonCol>
              <IonCol size="6" id="Rectangle160">
                <div id="createchallan">Create Challan</div>
              </IonCol>
            </IonRow>
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
                      <td id='Rectangle157'><div id='total_warehouse_count'>452</div></td>
                    </tr>
                    <tr id='Rectangle155'>
                      <th id='total_items_sent'>Total Items Sent</th>
                      <td id='Rectangle158'><div id='total_items_sent_count'>102</div></td>
                    </tr>
                    <tr id='Rectangle154'>
                      <th id='total_items_recieved'>Total Items to be received</th>
                      <td id='Rectangle159'><div id='total_items_recieved_count'>41</div></td>
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
