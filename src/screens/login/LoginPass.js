import React, {useState} from 'react';
import {View,  StyleSheet, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Logo from '../../components/Logo';

loginPassConnect = async (phoneNo, passWord, props) => {                        
  
  const url = "http://10.0.2.2:8080/loginPass";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({phoneno: phoneNo.pno,
                            password: passWord.pword}),
      headers:{
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    var datalist = await response.json();

    if(datalist.length == 0){
      Alert.alert("User not registerred");
    }
    else{

      const value = JSON.stringify({phone: phoneNo.pno, utype: datalist[0].UserType});
      await AsyncStorage.setItem('isLoggedIn', value);

      if(datalist[0].UserType == "Buyer") {
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

setterPassWord = (setPassWord, text) => {
  setPassWord({pword: text});
}

export default function LoginPin(props){

  const [phoneNo, setPhoneNo] = useState({pno: ""});
  const [passWord, setPassWord] = useState({pword: ""});

  return(
    <View style={styles.container}>
      <Logo/>

      <View style={styles.formcontainer} >
        <TextInput style={styles.inputBox} 
         // onFocus = {getNumber}
          underlineColorAndroid = 'rgba(0, 0, 0, 0)'
          placeholder = "Phone No."
          maxLength = {10}
          keyboardType = {'number-pad'}
          placeholderTextColor = 'rgb(255,255,255)'
          onChangeText = {text => setterPhoneNo(setPhoneNo, text)}
        />
        
        <TextInput style={styles.inputBox} 
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor='rgb(255,255,255)'
          onChangeText = {text => setterPassWord(setPassWord, text)}
        />
        
        <TouchableOpacity style={styles.button} onPress= {() =>  loginPassConnect(phoneNo, passWord, props)}>
          <Text style={styles.buttonText}>Login</Text>
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
  }
    
});