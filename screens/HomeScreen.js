import React from 'react';
import { View, TouchableOpacity, Text, Linking, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'; // Import styles from the separate file
import heroImage from '../assets/lapland.jpg'

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={[styles.menuItemText]}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
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

  const handleOrderButtonPress = () => {
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <Image
        source={heroImage}
        style={styles.headerImage}
        resizeMode="cover"
      />
  
      <View>
        <View style={styles.menuItemContainer}>
          <CustomButton title="Varaa lumityö" onPress={handleOrderButtonPress} />
        </View>
  
        <View style={styles.menuItemContainer}>
          {/* Apply the light grey style directly */}
          <TouchableOpacity
            style={styles.lightGreyButton}
            onPress={handleCallButtonPress}
          >
            <Text style={[styles.menuItemText, { color: 'black' }]}>Soita</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default HomeScreen;
