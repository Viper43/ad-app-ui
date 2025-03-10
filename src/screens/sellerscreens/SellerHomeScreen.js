import React, { useState, useEffect } from 'react';
import {View,  StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, Image, Alert, BackHandler} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';



sellerContentConnect = async (setContent) => {                         //asynchronous method
  
  const url = "http://10.0.2.2:8080/sellerContents";
  try {

    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({pno: value.phone}),
      headers: {
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    var datalist = await response.json();
    setContent({ contentList: datalist})

  }
  catch(error) {
    Alert.alert(error.message);
  }
}

removeProduct = async (prodId) => {
  
  const url = "http://10.0.2.2:8080/removeProduct";
  
  try {

    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({id: prodId, pNo: value.phone}),
      headers: {
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

const numColumns = 1

export default function SellerHomeScreen( props ) {

  var [content, setContent] = useState({ contentList: []})

  useEffect(() => {
    sellerContentConnect(setContent);
  }, [content])

  
  useEffect(() => {
    const backActionSeller = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandlerSeller = BackHandler.addEventListener( 
      "hardwareBackPress",
      backActionSeller
    );

    return () => backHandlerSeller.remove();
  },[])

  return (
    <SafeAreaView style = {styles.container}>
      
      <Header {...props}/>
      <Text style = {styles.headerText}>Listed Products</Text>

      <View style = {styles.listContainer}>
        <FlatList
          numColumns = {numColumns}
          keyExtractor = {(item, index) => index.toString()}
          data = {content.contentList}
          renderItem = {({item}) => {
            return ( 
              <TouchableOpacity style = {styles.itemBox} onPress = {() => props.navigation.navigate('SellerProduct', item)}>
                <View style = {styles.imageBox}>
                  <Image source = {{ uri: item.ProductImage ? item.ProductImage : "abc.png", }}
                    style = {styles.cardImage}
                    resizeMode = "stretch"
                  />
                </View>

                <View style = {styles.contentDetails}>
                  <Text style = {styles.prodName}>{item.ProductName}</Text>
                  <Text style = {styles.prodInfo}>{item.ProductInfo}</Text>
                  
                  <View style = {styles.priceBox}>
                    <View>
                      <Text style = {styles.prodPrice}>₹{item.ActualPrice}</Text>
                      <Text style = {styles.prodDisPrice}>₹{item.DiscountedPrice}</Text>
                    </View>
                    
                    <View>
                      <TouchableOpacity style = {styles.deleteButton} onPress = {() => removeProduct(item.ProductId)}>
                        <Text style = {styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>  
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      <FloatingButton {...props}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'sans-serif-medium',
    padding: 10,
    borderWidth: 0.2,
    color: '#ffffff',
    backgroundColor: '#38b000'
  },

  listContainer: {
    flexShrink: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 8,
  },
  
  itemBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 150,
    padding: 15,
    elevation: 5,
  },

  imageBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 10,
    elevation: 5,
    marginBottom: "5%"
  },

  contentDetails: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  cardImage: { 
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },

  prodName: {
    fontSize: 20,
    color: "#000000",
  },

  prodInfo: {
    fontSize: 13,
    color: "#7f7f7f"
  },

  prodDisPrice: {
    fontSize: 18,
    color: "#000000",
  },

  prodPrice: {
    fontSize: 15,
    textDecorationLine: "line-through",
    color: "#3a3a40",
  },

  deleteButton: {
    //backgroundColor: "#84c225",
    backgroundColor: "#ff0a54",
    paddingHorizontal: 35,
    paddingVertical: 6,
    borderRadius: 3,
  },

  deleteButtonText: {
    fontSize: 20,
    color: "#ffffff",
  }
});