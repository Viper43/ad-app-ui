import React, { useState, useEffect } from 'react';
import {View,  StyleSheet, Text, Image, FlatList, TouchableOpacity, Alert} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';


addToCart = async (prodId, setFlag) => {
  
  const url = "http://10.0.2.2:8080/addToCart";
  
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
    setFlag(true);
  }
  catch(error) {
    Alert.alert(error.message);
  }
}


contentConnect = async (setContent, setCart, categoryid) => {                        

  const url = "http://10.0.2.2:8080/contents";
  try {

    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({id: categoryid, pNo: value.phone}),
      headers: {
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    
    var datalist = await response.json();
    var contentData = datalist.content;
    var cartData = datalist.cart;
    
    setContent({ contentList: contentData})
    setCart({ cartList: cartData})
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

const numColumns = 1



export default function ContentScreen( props) {

  var [content, setContent] = useState({ contentList: []})
  var [cart, setCart] = useState({ cartList: []})
  const isFocused = useIsFocused();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(false);
    contentConnect(setContent, setCart, props.route.params.CategoryId)
  }, [isFocused, flag])


  addButton = (item) => {
    return(
      <TouchableOpacity style = {styles.addButton} onPress = {() => addToCart(item.ProductId, setFlag)}>
        <Text style = {styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    );
  }
  
  goToCartButton = () => {
    return(
      <TouchableOpacity style = {styles.addButton} onPress = {() => props.navigation.navigate('Cart')}>
        <Text style = {styles.addButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    );
  }
  
  buttonSelector = (item, cartList) => {
    let selectedButton;
    if(cartList.length == 0 ) {
      selectedButton = addButton(item);
    }
    else {
      cartList.every(row => {
        if ( item.ProductId == row.ProductId ) {
          selectedButton = goToCartButton();
          return false;
        }
        else {
          selectedButton = addButton(item);
          return true;
        }
      });
    }
    
    return selectedButton
  } 
  if(content.contentList.length != 0) {
    return (
      <View style = {styles.container}>
        <Header {...props}/>
        <View style = {styles.listContainer}>
          <FlatList
            numColumns = {numColumns}
            keyExtractor = {(item, index) => index.toString()}
            data = {content.contentList}
            renderItem = {({item}) => {
              return ( 
                <TouchableOpacity style = {styles.itemBox} onPress = {() => props.navigation.navigate('Product', item)}>
                  <View style = {styles.imageBox}>
                    <Image source = {{ uri: item.ProductImage }}
                      style = {styles.cardImage}
                      resizeMode = "cover"
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
                        {buttonSelector(item, cart.cartList)}
                      </View>
                    
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    );
  }
  else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 160,
    padding: 15,
    elevation: 5,
  },

  imageBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 10,
    elevation: 10,
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
    borderRadius: 10,
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

  counterButton: {
    borderColor: '#e76f51',
    borderWidth: 1,
  },

  counterButtontext: {
    color: '#e76f51',
  },

  counterText: {
    color: '#e76f51',
  },

  addButton: {
    //backgroundColor: "#84c225",
    backgroundColor: "#ff0a54",
    paddingHorizontal: 35,
    paddingVertical: 6,
    borderRadius: 5,
  },

  addButtonText: {
    fontSize: 20,
    color: "#ffffff",
  }
})