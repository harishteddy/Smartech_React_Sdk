import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // For navigation
import { NativeModules } from 'react-native';
import SmartechBaseReact from "smartech-base-react-native"
import SmartechAppInboxReact from 'smartech-appinbox-react-native'



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
  const navigation = useNavigation();  // To navigate to the dress details page




  useEffect(()=>{
    SmartechBaseReact.login("Laxmeemedliswift");


// Sample code for reference purpose only
const payloadata = {
    name: "HomeScreen",
    description: "home page with products",
    payload_id: "1",
    event_id:21
};
SmartechBaseReact.trackEvent("Home_Screen", payloadata);

NativeModules.HanselRn.setNativeID()
  },[])

function openAppInbox(){
  navigation.navigate('AppInbox');

}

  return (
    <ScrollView style={styles.container} >
      <TouchableOpacity onPress={openAppInbox}>
      <Text style={{fontSize:20, fontWeight:"bold", color:"red"}}>  Notifications</Text>

      </TouchableOpacity>
      {/* Categories ScrollView */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryItem}  >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name.toUpperCase()}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Shop for Men and Women Buttons */}
      <View style={styles.shopButtonsContainer}  >
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>SHOP FOR WOMEN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>SHOP FOR MEN</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Grid of Dresses */}
      <View style={styles.gridContainer}>
        {dresses.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            onPress={() => navigation.navigate('DressDetails', { item })}
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
