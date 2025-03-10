import React, {useState,useEffect} from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Header from './Header2';
import AsyncStorage from '@react-native-community/async-storage';

addToWishlist = async (prodId, setWishlistFlag) => {
  
  const url = "http://10.0.2.2:8080/addToWishlist";
  
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
    setWishlistFlag(true);
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

addToCartConnect = async (prodId, setCartFlag) => {
  
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
    setCartFlag(true);
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

dataConnect = async (setWishlist, setCart, categoryid) => {                        

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
    var wishlistData = datalist.wishlist;
    var cartData = datalist.cart;
    
    setWishlist({ wishlistData: wishlistData})
    setCart({ cartlistData: cartData})
  }
  catch(error) {
    Alert.alert(error.message);
  }
}



export default function Product( props ) {
  
  var [wishlist, setWishlist] = useState({ wishlistData: []})
  var [cart, setCart] = useState({ cartlistData: []})
  const isFocused = useIsFocused();
  const [cartFlag, setCartFlag] = useState(false);
  const [wishlistFlag, setWishlistFlag] = useState(false);

  useEffect(() => {
    setCartFlag(false);
    setWishlistFlag(false);
    dataConnect(setWishlist, setCart, props.route.params.CategoryId)
  }, [isFocused, cartFlag, wishlistFlag])



  addToCartButton = (prodId) => {
    return(
      <TouchableOpacity style = {styles.cartButton} onPress = {() => addToCartConnect(prodId, setCartFlag)}>
        <Text style = {styles.cartButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    );
  }
  
  
  goToCartButton = () => {
    return(
      <TouchableOpacity style = {styles.cartButton} onPress = {() => props.navigation.navigate('Cart')}>
        <Text style = {styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    );
  }
  

  cartButtonSelector = (prodId, cartList) => {
    let cartBtn;
    if(cartList.length == 0 ) {
     cartBtn = addToCartButton(prodId);
    }
    else {
      cartList.every(row => {
        if ( prodId == row.ProductId ) {
         cartBtn = goToCartButton();
          return false;
        }
        else {
         cartBtn = addToCartButton(prodId);
          return true;
        }
      });
    }
    return cartBtn
  }


  
  addToWishlistButton = (prodId) => {
    return(
      <TouchableOpacity style = {styles.saveButton} onPress = {() => addToWishlist(prodId, setWishlistFlag)}>
        <Text style = {styles.saveButtonText}>Add to Wishlist</Text>
      </TouchableOpacity>
    );
  }
  
  goToWishlistButton = () => {
    return(
      <TouchableOpacity style = {styles.saveButton} onPress = {() => props.navigation.navigate('Wishlist')}>
        <Text style = {styles.saveButtonText}>Go to Wishlist</Text>
      </TouchableOpacity>
    );
  }
  
  
  wishListButtonSelector = (prodId, wishList) => {
    let wishlistBtn;
    if(wishList.length == 0 ) {
      wishlistBtn = addToWishlistButton(prodId);
    }
    else {
      wishList.every(row => {
        if ( prodId == row.ProductId ) {
         wishlistBtn = goToWishlistButton();
          return false;
        }
        else {
         wishlistBtn = addToWishlistButton(prodId);
          return true;
        }
      });
    }
    
    return wishlistBtn
  }



  return(
    
    <SafeAreaView style = {styles.container}>
      
      <Header {...props} />
      
      <ScrollView>
        <View style = {styles.itemBox}>
          <View style = {styles.image}>
            <Image source = {{ uri: props.route.params.ProductImage }}
              style = {styles.cardImage}
              resizeMode = "stretch"
            />
          </View>

          <View style = {styles.contentDetails}>
            <Text style = {styles.prodName}>{props.route.params.ProductName}</Text>
            <Text style = {styles.prodInfo}>{props.route.params.ProductInfo}</Text>
            
            <View style = {styles.priceBox}>
              <Text style = {styles.prodDisPrice}>₹{props.route.params.DiscountedPrice}</Text>
              <Text style = {styles.prodPrice}>₹{props.route.params.ActualPrice}</Text>
              <Text style = {styles.prodDiscount}>{props.route.params.DiscountPercent}%</Text>
            </View>
            
            <Text style = {styles.prodDesc}>{props.route.params.About}</Text>
          </View>
        
        </View>
      </ScrollView>
      
      <View style = {styles.bottomButtons}>

        {wishListButtonSelector(props.route.params.ProductId, wishlist.wishlistData)}

        {cartButtonSelector(props.route.params.ProductId, cart.cartlistData)}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  bottomButtons: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  cartButton: {
    backgroundColor: "#ff0a54",
    width: "50%",
    paddingVertical: 18,
    paddingHorizontal:16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 50,
  },

  saveButton: {
    width: "50%",
    backgroundColor: "#84c225",
    paddingVertical: 18,
    paddingHorizontal:16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 50,
  },

  saveButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },

  cartButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },

  image: {
    height: 400,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

  },

  cardImage: {
    height: '70%',
    width: '70%',
  },

  itemBox: {
    flexShrink: 1,
    backgroundColor: "#ffffff",
  },

  contentDetails: {
    marginLeft: "5%",
  },

  prodName: {
    fontSize: 22,
    color: "#000000",
  },

  prodInfo: {
    fontSize: 18,
    color: "#7f7f7f"
  },

  prodDesc: {
    fontSize: 30,
    color: "#7f7f7f"
  },

  priceBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  prodDisPrice: {
    fontSize: 25,
    fontWeight: '400',
    color: "#000000",
  },

  prodPrice: {
    marginLeft: "2%",
    fontSize: 22,
    textDecorationLine: "line-through",
    fontWeight: '900',
    color: "#3a3a40",

  },

  prodDiscount: {
    marginLeft: "2%",
    fontSize: 20,
    fontWeight: 'bold',
    color: "#557824",
  },
})