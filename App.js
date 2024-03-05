import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import ContactComponent from './screens/ContactComponent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Kotisivu" component={HomeScreen} />
        <Stack.Screen name="Yhteystiedot" component={ContactComponent} />
        <Stack.Screen name="Tilaus" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
