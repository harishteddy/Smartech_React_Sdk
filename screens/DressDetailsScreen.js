import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SmartechBaseReact from "smartech-base-react-native"



const DressDetailsScreen = ({ route }) => {
  const { id } = route.params;
  console.log();

  const payloadata = {
    name: "DressDetailsScreen",
    description: "DressDetailsScreen of products",
    payload_id: "1",
    event_id:21
};

  useEffect(()=>{

    // Sample code for reference purpose only
  
      },[])
      SmartechBaseReact.trackEvent("DressDetails_Screen", payloadata);

  const { item } = route.params;
  const navigation = useNavigation();

  const addToWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem('wishlist');
      const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      wishlist.push(item);
      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      navigation.navigate('Wishlist', { message: 'Item added to wishlist' });
    } catch (error) {
      console.log('Error adding to wishlist:', error);
    }
  };

  const addToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];
      cart.push(item);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      navigation.navigate('Cart', { message: 'Item added to cart' });
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  return (
    <View style={styles.container} >
      {/* {item.image && <Image source={item.image} style={styles.image} />} */}
      
      {/* <Text style={styles.name}>{typeof item.name === 'string' ? item.name : 'Item Name'}</Text> */}

      {/* <Text style={styles.price}>Price: ₹{item.price}</Text> */}

      <TouchableOpacity 
        style={styles.button} 
        onPress={addToCart}
      >
        <Text style={styles.buttonText}  >ADD TO CART</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={addToWishlist}
      >
        <Text style={styles.buttonText}>ADD TO WISHLIST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DressDetailsScreen;
