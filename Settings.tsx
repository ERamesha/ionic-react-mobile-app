import {  IonButton,
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
    IonTabButton, } from "@ionic/react";
import React from "react";
import { notifications, home, settings } from 'ionicons/icons';
import './Settings.css';



const Settings: React.FC = () => {

    return (
        <IonPage>
    <IonHeader>
        <IonToolbar>
            <IonTitle className="centered-title">Warehouse Name</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
        <div className="centered-option">
            <IonRow className="row_spacing">
                <IonCol><IonLabel>Warehouse Head Name :</IonLabel><div id="WarehouseHead">raj</div></IonCol>
                
            </IonRow>
            <IonRow className="row_spacing">
                <IonCol><IonLabel>Warehouse Head Email ID :</IonLabel><div id="WarehouseHeadEmail">raj@gmail.com</div></IonCol>
                
            </IonRow>
            <IonButton className="logout_button">Logout</IonButton>
        </div>
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

export default Settings;