import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonImg, IonInput, IonButton, IonRow, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any previous error

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      console.log('Response received:', response.data); // Log entire response data

      if (response.data.success) {
        const userRole = response.data.user_role; // Access user_role from response data
        console.log('User role:', userRole); // Log user role
        history.push(`/${userRole}`); // Update route based on user_role
        window.location.reload();
      } else {
        console.log('Login failed:', response.data);
        setError('Entered credentials are wrong');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          if (error.response.status === 401) {
            setError('Entered credentials are wrong');
          } else {
            setError(error.response.data.error || 'An error occurred. Please try again.');
          }
        } else {
          console.error('Axios error logging in:', error);
          setError('An error occurred. Please try again.');
        }
      } else {
        console.error('Unexpected error logging in:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div id='loginscreen'>
          <div className="content-container">
            <IonRow>
              <div id="rectangle144">
                <IonImg id="logo-img" src="/timing_logo.png" alt="Logo"></IonImg>
              </div>
            </IonRow>
            <IonRow>
              <div id='rectangle145'>
                <div id='heading'>Timing Technologies Inventory Management System</div>
              </div>
            </IonRow>
            <form onSubmit={handleLogin}>
              <IonRow>
                <div id='rectangle142'>
                  <IonInput
                    id="user-name"
                    placeholder='Username'
                    onIonInput={e => setUsername(e.detail.value ?? '')}
                    autocomplete="off"
                  ></IonInput>
                </div>
              </IonRow>
              <IonRow>
                <div id="rectangle143">
                  <IonInput
                    id="password"
                    type="password"
                    placeholder='Password'
                    onIonInput={e => setPassword(e.detail.value ?? '')}
                    autocomplete="off"
                  ></IonInput>
                </div>
              </IonRow>
              <IonRow>
                <div>
                  <IonButton id="button_login" expand="block" type='submit'>Login</IonButton>
                </div>
              </IonRow>
            </form>
            {error && (
              <IonRow>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonRow>
            )}
            <IonRow>
            <div id="rectangle146">
              <a href="#" id="button" className="anchor-button">Forgot Password? Click Here</a>
            </div>
          </IonRow>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
