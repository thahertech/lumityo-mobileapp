// styles.js
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
      },
    }),
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity:0.65,
    position:'absolute',
    
 
  },
  smallerHeaderImage: {
    width: '60%',
    height: 220,
    opacity:0.6,
    position: 'absolute',
    top: 175,
    left:'auto',
    borderRadius: 5,
  },
 
  menuItem: {
    top:140,
    borderRadius: 20,
    padding: 15,
    backgroundColor: 'lightblue',
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
  menuItemText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'regular',
    letterSpacing: 2,
    fontSize: 36,
  },
  centerText: {
    textAlign: 'center',
  },

  lightGreyButton: {
    borderRadius: 20,
    top:150,
    padding: 15,
    backgroundColor: '#D3D3D3',  // Light grey color
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
    }),

    inputContainer:{
        color:"black"
    }
  },
  confirmButton: {

    ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    },
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',

    // Add elevation for Android
    elevation: 3,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
