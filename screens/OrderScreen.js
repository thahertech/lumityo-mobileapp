import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const OrderScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const handleOrderConfirmation = () => {
    if (!firstName || !phoneNumber || !address || !selectedService) {
      Alert.alert('Incomplete Information', 'Please fill in all the required fields.');
      return;
    }

    // You can add additional logic here to submit the order or perform any necessary actions

    // Display a confirmation message
    Alert.alert('Order Confirmed', `Thank you for placing your ${selectedService} order!`);
  };

  const isFormValid = () => {
    return firstName.trim() !== '' && phoneNumber.trim() !== '' && address.trim() !== '' && selectedService !== null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lumityö tilaus</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Etunimi</Text>
        <TextInput
          style={styles.input}
          placeholder="Etunimi"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
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

      <Text style={styles.label}>Valitse palvelu:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.serviceButton, selectedService === 'Lumityö' && { backgroundColor: 'lightblue' }]}
          onPress={() => setSelectedService('Lumityö')}
        >
          <Text style={styles.serviceButtonText}>Lumityö</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.serviceButton, selectedService === 'Polanteen poisto' && { backgroundColor: 'lightblue' }]}
          onPress={() => setSelectedService('Polanteen poisto')}
        >
          <Text style={styles.serviceButtonText}>Polanteen poisto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, !isFormValid() && { backgroundColor: 'grey' }]}
        onPress={handleOrderConfirmation}
        disabled={!isFormValid()}
      >
        <Text style={styles.confirmButtonText}>Vahvista tilaus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      marginBottom: 5,
      fontWeight: 'bold',
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
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },

  confirmButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default OrderScreen;
