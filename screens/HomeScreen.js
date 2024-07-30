import React from 'react';
import { View, TouchableOpacity, Text, Linking, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'; 
import heroImage from '../assets/Mountains.jpg'
import HeaderImage from '../assets/SnowTruck.png'
import ContactComponent from './ContactComponent';
import { StatusBar } from 'react-native';



const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={[styles.menuItemText]}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const phoneNumber = '+358407362403';
  const navigation = useNavigation();


  const handleOrderButtonPress = () => {
    navigation.navigate('Tilaus');
  };

 return (
    <View style={styles.container}>
      {/* Customize the status bar */}
      <StatusBar
        barStyle="dark-content" // or "dark-content" based on your design
        backgroundColor="transparent" // Use a color if you want a specific background color
        translucent={true} // Set to true if you want the status bar to be translucent
      />

      <Image
        source={HeaderImage}
        style={styles.smallerHeaderImage}
        resizeMode="cover" 
      />

      <Image
        source={heroImage}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View>
        <View style={styles.menuItemContainer}>
          <CustomButton title="Tilaa Lumityö" onPress={handleOrderButtonPress} />
        </View>

        <View style={styles.menuItemContainer}>
          <ContactComponent phoneNumber={phoneNumber} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

