import React from 'react';
import { View, Text, Button, Linking } from 'react-native';

const ContactScreen = () => {
  const phoneNumber = '0406877798'; // Replace with the desired phone number

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
    <View>
      <Text>Soita</Text>
      <Button title="Soita" onPress={handleCallButtonPress} />
      {/* Add components for other contact details */}
    </View>
  );
};

export default ContactScreen;
