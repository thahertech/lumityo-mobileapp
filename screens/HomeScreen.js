import React from 'react';
import { View, TouchableOpacity, Text, Linking, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import heroImage from '../assets/lapland.jpg'
import ContactComponent from './ContactComponent'; 


const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={[styles.menuItemText]}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const phoneNumber = '+358407362403';
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
    navigation.navigate('Tilaus');
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
          <ContactComponent phoneNumber={phoneNumber} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

