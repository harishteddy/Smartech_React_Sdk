import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmartechBaseReact from "smartech-base-react-native"




const CartScreen = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);
  const { message } = route.params || {};

  const payloadata = {
    name: "CartScreen",
    description: "CartScreen of products",
    payload_id: "1",
    event_id:21
};

  useEffect(() => {
    SmartechBaseReact.trackEvent("Cart_Screen", payloadata);

    const fetchCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.log('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (item) => {
    try {
      const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Price: ₹{item.price}</Text>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removeFromCart(item)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00f',
    marginBottom: 20,
  },
});

export default CartScreen;
