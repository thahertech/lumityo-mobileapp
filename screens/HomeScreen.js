import React from 'react';
import { View, Text, Button, Linking } from 'react-native';

const HomeScreen = () => {
  const phoneNumber = '+358407362403'; // Replace with the desired phone number

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
      <Text>Lumityö X Tilaus</Text>
      <Button title="Soita" onPress={handleCallButtonPress} />
      <Button title="Varaa lumityö" onPress={() => navigation.navigate('Order')} />
    </View>
  );
};

export default HomeScreen;
