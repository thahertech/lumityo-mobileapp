import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Alert } from 'react-native';
import firebaseConfig from './firebaseConfig'; //Config file imported


// Initializing Firebase
const app = initializeApp(firebaseConfig);


const sendOrderToCloudFunction = async (orderData) => {
  try {
    const functions = getFunctions(app);
    const sendEmailCallable = httpsCallable(functions, 'sendEmail');

    console.log('Order Data:', orderData);

    const response = await sendEmailCallable(orderData);

    try {
      if (response.data) {
        console.log('Email sent successfully!');
      }
        else if (response.status) {

        console.error('Failed to send email. Status:', response.status);
        Alert.alert('Virhe', 'Sähköpostin lähettäminen epäonnistui. Yritä uudelleen.');
      } 
        else {

        console.error('Unexpected response structure:', response);
        Alert.alert('Virhe', 'Odottamaton vastauksen rakenne. Yritä uudelleen.');
      }

      return response;
      
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error occurred while calling the cloud function:', error);
    throw error;
  }
};

export default sendOrderToCloudFunction;
