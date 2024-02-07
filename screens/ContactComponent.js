import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'; // Import styles from the separate file

const ContactComponent = () => {
  const phoneNumber = '+358407362403'; // Replace with the desired phone number
  const navigation = useNavigation();

  const handleCallButtonPress = () => {
    const phoneUrl = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          console.error("Phone number is not supported on this device.");
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error('Error occurred:', err));
  };

  return (
    <TouchableOpacity
      style={styles.lightGreyButton}
      onPress={handleCallButtonPress}
    >
      <Text style={[styles.menuItemText, { color: 'black' }]}>Soita</Text>
    </TouchableOpacity>
  );
};

export default ContactComponent;
