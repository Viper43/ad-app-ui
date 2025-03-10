import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import IconCamera from 'react-native-vector-icons/MaterialCommunityIcons';  
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';

addProductConnect = async (ProdName, actualPrice, discountedPrice, discountPercent, productInfo, About, props) => {                        
  
  const url = "http://10.0.2.2:8080/addProduct";
  
  try {

    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({productname: ProdName.prodName, 
                            actualprice: actualPrice.aprice, 
                            discountedprice: discountedPrice.dprice, 
                            discountpercent: discountPercent.dpercent,
                            productinfo: productInfo.pinfo,
                            productabout: About.about,
                            phoneno: value.phone}),
      headers:{
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    Alert.alert("Product added successfully");
    props.navigation.navigate('SellerHome');
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

setterProductName = (setProdName, text) => {
  setProdName({prodName: text})
}

setterActualPrice = (setActualPrice, text) => {
  setActualPrice({aprice: text})
}

setterDiscountedPrice = (setDiscountedPrice, text) => {
  setDiscountedPrice({dprice: text})
}

setterDiscountPercent = (setDiscountPercent, text) => {
  setDiscountPercent({dpercent: text})
}

setterProductInfo = (setProductInfo, text) => {
  setProductInfo({pinfo: text})
}

setterAbout = (setAbout, text) => {
  setAbout({about: text})
}

export default function AddProduct(props) {
  
  const [ProdName, setProdName] = useState({prodName: ""});
  const [actualPrice, setActualPrice] = useState({aprice: ""});
  const [discountedPrice, setDiscountedPrice] = useState({dprice: ""});
  const [discountPercent, setDiscountPercent] = useState({dpercent: ""});
  const [productInfo, setProductInfo] = useState({pinfo: ""});
  const [About, setAbout] = useState({about: ""});
  const isFocused = useIsFocused();

  useEffect(() => {
    setProdName({prodName: ""})
    setActualPrice({aprice: ""})
    setDiscountedPrice({dprice: ""})
    setDiscountPercent({dpercent: ""})
    setProductInfo({pinfo: ""})
    setAbout({about: ""})
  },[isFocused])
 

  return(
    
    <View style = {styles.container}>
      <Header {...props}/>
      
      <ScrollView>
        <View style = {styles.inputContainer}>
          
          <View style = {styles.imageBox}>
            <IconCamera.Button
              name = "camera-plus"  
              size = {28} 
              backgroundColor = "grey" 
              style = {styles.addImage}  
              onPress={() => alert('Image Added')}
            />
            
            <View style = {styles.infoBox}>
              <Text style = {styles.info}> Add Product Image</Text>
            </View>
            
          </View>

          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Product Name"
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterProductName(setProdName, text)}
            value = {ProdName.prodName}/>

          <TextInput style={styles.inputBox}
            keyboardType={'numeric'}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Actual Price"
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterActualPrice(setActualPrice, text)}
            value = {actualPrice.aprice}/> 

          <TextInput style={styles.inputBox}
            keyboardType={'numeric'}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Discounted Price"
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterDiscountedPrice(setDiscountedPrice, text)}
            value = {discountedPrice.dPrice}/>

          <TextInput style={styles.inputBox}
            keyboardType={'numeric'}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Discount Percent"
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterDiscountPercent(setDiscountPercent, text)}
            value = {discountPercent.dpercent}/>

          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Product Information"
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterProductInfo(setProductInfo, text)}
            value = {productInfo.pinfo}/>

          <TextInput style={styles.inputBox}
            multiline={true}
            numberOfLines={3}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="About"
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterAbout(setAbout, text)}
            value = {About.about}/>

          <TouchableOpacity style={styles.button} onPress= {() => { addProductConnect(ProdName, actualPrice, discountedPrice, discountPercent, productInfo, About, props)}} >
            <Text style={styles.buttonText}> Add Product </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },

  inputContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  imageBox: {
    marginVertical: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
  addImage: {
    padding: 60,
  },
    
  infoBox: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  
  info: {
    fontSize: 20,
  },

  inputBox: {
    width: 350,
    elevation: 2,
    backgroundColor:'#ffffff',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:20,
    marginVertical: 10,
  },
  
  buttonText:{
    fontSize:20,
    fontWeight: '500',
    color:'#ffffff',
    textAlign:"center"
  },
  
  button: {
    backgroundColor:'#ff0a54',
    borderRadius:25,
    width: 350,
    paddingVertical: 15,
    paddingHorizontal:16,
    marginVertical: 10
  },
  
});

/*inputContainer : {
  flexGrow: 1,
  marginTop: "5%",
  alignItems: "center",
  justifyContent: "center"
},


container : {
  flex: 1,
},


}*/