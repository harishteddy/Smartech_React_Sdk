import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SmartechBaseReact from 'smartech-base-react-native';

const categories = [
  { name: 'Shirt', image: require('../assets/boyspic1.jpg') },
  { name: 'Tshirt', image: require('../assets/bp2.jpg') },
  { name: 'Cargo', image: require('../assets/bp3.jpg') },
  { name: 'Jeans', image: require('../assets/bp4.jpg') },
  { name: 'Trousers', image: require('../assets/bp5.jpg') },
  { name: 'Tops', image: require('../assets/bp6.jpg') },
];

const dresses = [
  { id: 1, name: 'Dress 1', image: require('../assets/gp2.jpg') },
  { id: 2, name: 'Dress 2', image: require('../assets/gp3.jpg') },
  { id: 3, name: 'Dress 3', image: require('../assets/gp4.jpg') },
  { id: 4, name: 'Dress 4', image: require('../assets/gp5.jpg') },
  { id: 5, name: 'Dress 5', image: require('../assets/gp6.jpg') },
  { id: 6, name: 'Dress 6', image: require('../assets/gp7.jpg') },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // ✅ Smartech login
    SmartechBaseReact.login('guest_user');

    // ✅ Smartech event tracking
    SmartechBaseReact.trackEvent('Home_Screen', {
      name: 'HomeScreen',
      description: 'home page with products',
      payload_id: '1',
      event_id: 21,
    });
  }, []);

  const openAppInbox = () => {
    navigation.navigate('AppInbox');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={openAppInbox}>
        <Text style={styles.notificationText}>Notifications</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryBar}
      >
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>
              {item.name.toUpperCase()}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.shopButtonsContainer}>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>SHOP FOR WOMEN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>SHOP FOR MEN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {dresses.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            onPress={() =>
              navigation.navigate('DressDetails', { item })
            }
          >
            <Image source={item.image} style={styles.gridImage} />
            <Text style={styles.gridText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    margin: 10,
  },
  categoryBar: {
    marginVertical: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  shopButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  shopButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gridItem: {
    width: '48%',
    marginBottom: 20,
  },
  gridImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  gridText: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;
