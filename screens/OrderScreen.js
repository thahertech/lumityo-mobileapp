import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';

import heroImage from '../assets/SnowView.jpg'
import bgImage from '../assets/Mountains.jpg'

const OrderScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      phoneNumber.trim() !== '' &&
      address.trim() !== '' &&
      selectedService !== null
    );
  };

  const getServiceLabel = () => {
    if (selectedService === 'Lumityö') {
      return 'Lumityö suoritetaan seuraavan kierroksen aikana \n\nHinta: 10 — 15 €';
    } else if (selectedService === 'Polanteen poisto') {
      return 'Polanteen poisto suoritetaan seuraavan kierroksen aikana\n\nHinta: 20 — 30 €';
    }
    return '';
  };

  const handleOrderConfirmation = async () => {
    if (!isFormValid()) {
      Alert.alert('Puutteelliset tiedot', 'Täytä kaikki pakolliset kentät.');
      return;
    }

    const backendEndpoint = 'https://lumityo-e0d54835abcd.herokuapp.com/sendEmail';

    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          phoneNumber,
          address,
          selectedService,
        }),
      });

      if (response.ok) {
        Alert.alert('Tilaus Vahvistettu', `Kiitos ${selectedService} tilauksesta, tehtävä hoidetaan seuraavalla kierroksella!`);
      } else {
        Alert.alert('Virhe', 'TIlausta ei vahvistettu. Yritä uudelleen.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Virhe', 'TIlausta ei vahvistettu. Yritä uudelleen.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
    <Image
      source={bgImage}
      style={styles.bgImage}
      resizeMode="cover" />

    <Text style={[styles.label, { marginTop: 25, marginBottom: 25, fontSize: 30 }]}>
      Valitse palvelu
    </Text>
    <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
      <TouchableOpacity
        style={[
          styles.serviceButton,
          selectedService === 'Lumityö' && { backgroundColor: 'lightblue' },
        ]}
        onPress={() => setSelectedService('Lumityö')}
      >
        <Text style={styles.serviceButtonText}>Lumityö</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.serviceButton,
          selectedService === 'Polanteen poisto' && { backgroundColor: 'lightblue' },
        ]}
        onPress={() => setSelectedService('Polanteen poisto')}
      >
        <Text style={styles.serviceButtonText}>Polanteen poisto</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.labelContainer}>
      <Text style={[styles.label, {marginBottom:29}]}>{getServiceLabel()}</Text>
    </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Puhelinnumero</Text>
        <TextInput
          style={styles.input}
          placeholder="Puhelinnumero"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Osoite</Text>
        <TextInput
          style={styles.input}
          placeholder="Osoite"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Etunimi</Text>
        <TextInput
          style={styles.input}
          placeholder="Etunimi"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !isFormValid() && { backgroundColor: 'grey', marginTop: 100 },
        ]}
        onPress={handleOrderConfirmation}
        disabled={!isFormValid()}
      >
        <Text style={styles.confirmButtonText}>Vahvista tilaus</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  labelContainer: {
    marginBottom: 15,
  },
  label: {
    marginTop:20,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign:'left',

  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
    }),

  },
  serviceButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  serviceButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  confirmButton: {
    marginTop: 50,
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
    }),
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  HeaderImage:{
    width:480,
    height:210,
    position:'absolute',
    top: -25,
    left: -40,
  },
  bgImage:{
    top: 240,
    height:900,
    width:400,
    position:'absolute',
  },
});

export default OrderScreen;
