// styles.js
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 240,
    marginTop: -200,
    marginBottom: 80,
  },
  menuItemContainer: {
    marginVertical: 10,
  },
  menuItem: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#4AA1DB',
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
  },
  menuItemText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 60,
  },
  centerText: {
    textAlign: 'center',
  },
  // Add a new style for the light grey button
  lightGreyButton: {
    borderRadius: 20,
    padding: 20,
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
  },
});

export default styles;
