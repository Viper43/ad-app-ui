import AsyncStorage from '@react-native-community/async-storage';
import React, { useState} from 'react';
import {View,  StyleSheet, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
//import DeviceNumber from 'react-native-device-number';
//import DeviceInfo from 'react-native-device-info';
//import { getPhoneNumber } from 'react-native-device-info';
import OTPTextView from 'react-native-otp-textinput';
import Logo from '../../components/Logo';


// const getNumber = () => {
//   const phoneNumber= DeviceInfo.getPhoneNumber();
//   //DeviceNumber.get().then((res) => { 
//   //  console.log(res)
//   //})
//   //DeviceInfo.getPhoneNumber().then((phoneNumber) => {
//     // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
   
//   //});
// }

loginPinConnect = async (phoneNo, mPin, props) => {                        
  
  const url = "http://10.0.2.2:8080/loginPin";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({phoneno: phoneNo.pno,  
                            smallpin: mPin.mpin}),
      headers:{
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }

    var datalist = await response.json();

    if( datalist.length == 0 ) {
      Alert.alert("User not registerred");
    }
    else {

      const value = JSON.stringify({phone: phoneNo.pno, utype: datalist[0].UserType});
      await AsyncStorage.setItem('isLoggedIn', value);

      if( datalist[0].UserType == "Buyer" ) {
        props.navigation.navigate('DrawerScreen');
      }
      else {
        props.navigation.navigate('SellerDrawerScreen');
      }
    }
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

setterPhoneNo = (setPhoneNo, text) => {
  setPhoneNo({pno: text});
}

setterMPin = (setMPin, text) => {
  setMPin({mpin: text})
}


export default function LoginPin( props ){

  const [phoneNo, setPhoneNo] = useState({pno: ""});
  const [mPin, setMpin] = useState({mpin: ""});

  return(

    <View style={styles.container}>
      <Logo/>

      <View style={styles.formcontainer} >
        <TextInput style={styles.inputBox}
          //onFocus = {getNumber}
          underlineColorAndroid = 'rgba(0, 0, 0, 0)'
          placeholder = "Phone No."
          maxLength = {10}
          keyboardType = {'number-pad'}
          placeholderTextColor = 'rgb(255,255,255)'
          onChangeText = {text => setterPhoneNo(setPhoneNo, text)}
        />
        
        <View style = {styles.mpinContainer}>
          <Text style = {styles.mpinText}>Enter MPIN</Text>
          <OTPTextView
            textInputStyle = {styles.roundedTextInput}
            containerStyle = {styles.textInputContainer}
            handleTextChange = {(text) => setterMPin(setMpin, text)} 
            inputCount = {4}
            keyboardType = {'number-pad'}
          />
        </View>

        <TouchableOpacity style = {styles.button} onPress = {() => loginPinConnect(phoneNo, mPin, props)}>
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.alternate_button} onPress = {() => props.navigation.navigate('LoginPass')}>
          <Text style = {styles.buttonText}>Login with another account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupTextContainer}>
        
        <Text style={styles.signupText}>Don't have an account? </Text>
        
        <TouchableOpacity onPress={() => props.navigation.navigate('SelectorScreen')}>
          <Text style={styles.signupButton}>Register</Text>
        </TouchableOpacity>
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#455a64"
  },

  formcontainer : {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  signupTextContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginVertical: 22,
    flexDirection:"row"
  },

  signupText:{
    fontSize:18,
    color:"rgb(255,255,255)",
    fontWeight: 'normal' 
  },

  signupButton:{
    fontSize:18,
    color:"rgb(255,255,255)" ,
    fontWeight: 'bold',
    textDecorationLine: "underline"
  },

  inputBox: {
    width: 350,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:20,
    marginVertical: 10,
    color:'#ffffff'
  },

  buttonText:{
    fontSize:20,
    fontWeight: '500',
    color:'#ffffff',
    textAlign:"center"
  },

  button: {
    backgroundColor:'#1c313a',
    borderRadius:25,
    width: 350,
    paddingVertical: 15,
    paddingHorizontal:16,
    marginVertical: 10
  },

  alternate_button: {
    backgroundColor:'#111d5e',
    height: 60,
    width: 350,
    
    paddingVertical: 15,
    paddingHorizontal:16,
    marginVertical: 10
  },

  mpinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    padding: 5,
  },
  
  textInputContainer: {
    marginBottom: 20,
  }, 

  roundedTextInput: {
    color: "#ffffff",
    borderRadius: 10,
    borderWidth: 4,
  },

  mpinText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'sans-serif',
    letterSpacing: 5,
    padding: 10,
    color: "#ffffff",
  }
});
