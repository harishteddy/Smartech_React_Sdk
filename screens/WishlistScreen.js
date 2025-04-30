import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmartechBaseReact from "smartech-base-react-native"



const WishlistScreen = ({ route }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { message } = route.params || {};
  const payloadata = {
    name: "WishlistScreen",
    description: "WishlistScreen of products",
    payload_id: "1",
    event_id:21
};

  useEffect(() => {
    SmartechBaseReact.trackEvent("Wishlist_Screen", payloadata);

    const fetchWishlistItems = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem('wishlist');
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.log('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, []);

  const removeFromWishlist = async (item) => {
    try {
      const updatedWishlist = wishlistItems.filter(wishlistItem => wishlistItem.id !== item.id);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
    } catch (error) {
      console.log('Error removing item from wishlist:', error);
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
          onPress={() => removeFromWishlist(item)}
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
        data={wishlistItems}
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

export default WishlistScreen;
