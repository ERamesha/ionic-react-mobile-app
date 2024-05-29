import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButtons, IonBackButton, IonIcon, IonFooter, IonButton } from '@ionic/react';
import { calendar, homeOutline, notificationsOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import axios from 'axios';

const Material: React.FC = () => {
    const history = useHistory();
    const [projectName, setProjectName] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [date, setDate] = useState('');
    const [cost, setCost] = useState('');
    const [mode, setMode] = useState('');

    const handleCategory = () => {

        const data = {
            projectName: projectName,
            fromLocation: fromLocation,
            toLocation: toLocation,
            date: date,
            cost: cost,
            mode: mode
        };

        // Send a POST request to the backend
        axios.post('http://localhost:5000/getWarehouseNames', data)
            .then(response => {
                // Handle success
                console.log('Response from backend:', response.data);
                // Redirect or do anything else as needed
                history.push('/category');
            })
            .catch(error => {
                // Handle error
                console.error('Error sending request:', error);
            });
            console.log('=======', data);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle><center>MATERIAL</center></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {/* Project Name Input */}
                    <IonRow style={{ marginTop: '1rem' }}>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="floating"></IonLabel>
                                <IonInput type="text" placeholder="Enter Project Name" value={projectName} onIonChange={e => setProjectName(e.detail.value!)} />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    {/* From and To Dropdowns */}
                    <IonRow style={{ marginTop: '1rem' }}>
                        <IonCol size="6">
                            <div className="dropdown-container" style={{ width: '160px', height: '150px' }}>
                                <IonItem>
                                    <IonSelect value={fromLocation} placeholder="Select From" onIonChange={e => setFromLocation(e.detail.value)}>
                                        <IonSelectOption value="kokapet">kokapet</IonSelectOption>
                                        <IonSelectOption value="secunderabad">secunderabad</IonSelectOption>
                                        <IonSelectOption value="madhapur">madhapur</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </div>
                        </IonCol>
                        <IonCol size="6">
                            <div className="dropdown-container" style={{ width: '160px', height: '150px' }}>
                                <IonItem>
                                    <IonSelect value={toLocation} placeholder="Select To" onIonChange={e => setToLocation(e.detail.value)}>
                                        <IonSelectOption value="jaipur">jaipur</IonSelectOption>
                                        <IonSelectOption value="hyderabad">hyderabad</IonSelectOption>
                                        <IonSelectOption value="nagpur">nagpur</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" style={{ marginTop: '-4rem' }} >
                            <div className="center-dropdown-container" style={{ margin: 'auto', width: '340px', textAlign: 'center', backgroundColor: '#cccccc', padding: '1rem', paddingTop: '1rem', borderRadius: '8px' }}>
                                <div className="date-input-container" style={{ marginBottom: '2rem' }}>
                                    <IonItem>
                                        <IonLabel position="floating"></IonLabel>
                                        <IonInput type="date" value={date} onIonChange={e => setDate(e.detail.value!)} />
                                    </IonItem>
                                </div>
                                <div className="cost-input-container" style={{ marginBottom: '2rem' }}>
                                    <IonItem>
                                        <IonLabel position="floating"></IonLabel>
                                        <IonInput type="number" placeholder="Enter Cost" value={cost} onIonChange={e => setCost(e.detail.value!)} />
                                    </IonItem>
                                </div>
                                <div className="mode-select-container">
                                    <IonItem>
                                        <IonLabel position="floating"></IonLabel>
                                        <IonSelect value={mode} placeholder="Select Mode" onIonChange={e => setMode(e.detail.value)}>
                                            <IonSelectOption value="AUTO">AUTO</IonSelectOption>
                                            <IonSelectOption value="TROLLEY">TROLLEY</IonSelectOption>
                                            <IonSelectOption value="FLIGHT">FLIGHT</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                                <IonButton expand="block" onClick={handleCategory}>Next</IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonFooter style={{ height: '60px' }}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4" className="ion-text-center">
                            <IonIcon icon={homeOutline} style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => history.push('/home')} />
                            <p>Home</p>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                            <IonIcon icon={settingsOutline} style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => history.push('/settings')} />
                            <p>Settings</p>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                            <IonIcon icon={notificationsOutline} style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => history.push('/notifications')} />
                            <p>Notifications</p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Material;
