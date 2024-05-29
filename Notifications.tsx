import React from 'react';
import { 
  IonPage, IonHeader, IonTitle, IonContent, IonRow, IonLabel, IonSelect, IonSelectOption, 
  IonGrid, IonFooter, IonTabBar, IonTabButton, IonIcon 
} from '@ionic/react';
import { notifications, home, settings } from 'ionicons/icons';
import './Notifications.css';

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="notifications-header">
        <IonTitle className="centered-title1">Notification Page</IonTitle>
      </IonHeader>
      <IonContent className="notifications-content">
        <IonRow className="notifications-select-row">
          <IonLabel className="notifications-label">Notification Type</IonLabel>
          <IonSelect 
            aria-label="Notification Type" 
            placeholder="Please Select Notification Type" 
            className="notifications-select"
          >
            {['Option-1', 'Option-2', 'Option-3', 'Option-4', 'Option-5'].map(option => (
              <IonSelectOption key={option} value={option}>{option}</IonSelectOption>
            ))}
          </IonSelect>
        </IonRow>
        <IonGrid className="notifications-grid">
          <table className="notifications-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Topic</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Sample Topic {index + 1}</td>
                  <td>{new Date().toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </IonGrid>
      </IonContent>
      <IonFooter className="notifications-footer1">
        <IonTabBar >
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

export default Notifications;
