import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { fcm } from './actions/auth';
import { useDispatch, useSelector } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyDLjOo8L8CVrWNX_Y2k6C9whHf0eerUqts",
  authDomain: "reward-system-ee063.firebaseapp.com",
  projectId: "reward-system-ee063",
  storageBucket: "reward-system-ee063.appspot.com",
  messagingSenderId: "357842628043",
  appId: "1:357842628043:web:f6b6c546c4e9759ab29a4e",
  measurementId: "G-MEELP4RQ69"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BKLPLjukm6fxNJvGyzKTs2K6AeXv6Ei30ea7Qu6hLz7HvwCY0Ykj2rlaEMW4BES7PQcPiurK2NNzGkkQlDVLPXE` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        localStorage.setItem('key', currentToken);        
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });