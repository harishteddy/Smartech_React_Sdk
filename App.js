// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DressDetailsScreen from './screens/DressDetailsScreen';
import WishlistScreen from './screens/WishlistScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import AppInbox from './screens/AppInbox';
import { Button, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import SmartechBaseReact from "smartech-base-react-native"
import SmartechPushReact from "smartech-push-react-native"
import SmartechReact from 'smartech-base-react-native';
import { useNavigation } from '@react-navigation/native';




const Stack = createStackNavigator();

export default function App() {
  // const navigation = useNavigation();


  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        // console.log("position",position);
        // console.log("==>", position.coords.latitude, position.coords.longitude);
        SmartechBaseReact.setUserLocation(position.coords.latitude, position.coords.longitude);
        // SmartechBaseReact.optTracking(true)
        // SmartechBaseReact.hasOptedTracking(function() {

        // })
        SmartechPushReact.optPushNotification(true)
        // SmartechPushReact.hasOptedPushNotification(function() {
        // })

      



        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  const handleDeeplinkWithPayload = (smartechData) => {
    console.log('Smartech Data :: ', smartechData.smtDeeplink);
    console.log('Smartech Deeplink :: ', smartechData.smtDeeplink);

    Linking.openURL(smartechData.smtDeeplink); // Open the deep link

    console.log('Smartech CustomPayload:: ', smartechData.smtCustomPayload);
 };
  useEffect(() => {
    // Add the deeplink listener
    SmartechReact.addListener(SmartechReact.SmartechDeeplink, handleDeeplinkWithPayload);
  
    // Cleanup function to remove the listener when the component unmounts
    return () => {
      SmartechReact.removeListener(SmartechReact.SmartechDeeplink, handleDeeplinkWithPayload);
    };
  }, []);

  const linking = {
    prefixes: ['style://'],
    config: {
      screens: {
        Home: 'Home',
        DressDetails: 'DressDetails', // Example deep link path with parameters
        Cart: 'Cart',
      },
    },
  };
return (
    <NavigationContainer nativeID={'hansel_ignore_container'} linking={linking} onReady={() => console.log('Navigation is ready')}
    onStateChange={(state) => console.log('Navigation state:', state)} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DressDetails" component={DressDetailsScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="AppInbox" component={AppInbox} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center'
  },
});

