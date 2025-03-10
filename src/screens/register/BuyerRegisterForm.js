import React, {useState} from 'react';
import {View, TextInput,StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import Logo from '../../components/Logo';
import AsyncStorage from '@react-native-community/async-storage';

buyerRegisterConnect = async (phoneNo, eMail, Name, mPin, Password, Address, props) => {                        
  
  const url = "http://10.0.2.2:8080/buyerRegister";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({phoneno: phoneNo.pno, 
                            emailid: eMail.email, 
                            username: Name.name, 
                            smallpin: mPin.mpin, 
                            passwords: Password.password, 
                            addresses: Address.address}),
      headers:{
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    const bool = await response.json();
    if(bool.status == true)
    {
      const value = JSON.stringify({phone: phoneNo.pno, utype: "Buyer"}); 
      await AsyncStorage.setItem('isLoggedIn', value);
      props.navigation.navigate('DrawerScreen');
    }
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

setterEMail = (setEMail, text) => {
  setEMail({email: text})
}

setterName = (setName, text) => {
  setName({name: text})
}

setterMPin = (setMPin, text) => {
  setMPin({mpin: text})
}

setterPassword = (setPassword, text) => {
  setPassword({password: text})
}

setterAddress = (setAddress, text) => {
  setAddress({address: text})
}

export default function BuyerRegisterForm( props ) {

  const [phoneNo, setPhoneNo] = useState({pno: props.route.params.mobile});
  const [eMail, setEMail] = useState({email: ""});
  const [Name, setName] = useState({name: ""});
  const [mPin, setMPin] = useState({mpin: ""});
  const [Password, setPassword] = useState({password: ""});
  const [Address, setAddress] = useState({address: ""}); 

  return(
    <View style={styles.container} >

      <Logo/>
      
      <View style = {styles.inputContainer}>

        <TextInput style={styles.inputBox} 
          
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="Email ID"
          placeholderTextColor="#ffffff"
          onChangeText = {text => setterEMail(setEMail, text)}/>

        <TextInput style={styles.inputBox} 
          
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="Name"
          placeholderTextColor="#ffffff"
          onChangeText = {text => setterName(setName, text)}/>
        
        <TextInput style={styles.inputBox} 
          
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="MPIN"
          placeholderTextColor="#ffffff"
          onChangeText = {text => setterMPin(setMPin, text)}/>

        <TextInput style={styles.inputBox} 
          
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          onChangeText = {text => setterPassword(setPassword, text)}/>

        <TextInput style={styles.inputBox} 
          
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="Address"
          placeholderTextColor="#ffffff"
          onChangeText = {text => setterAddress(setAddress, text)}/>

        <TouchableOpacity style={styles.button} onPress= {() => { buyerRegisterConnect(phoneNo, eMail, Name, mPin, Password, Address, props)}}>
          <Text style={styles.buttonText}> Register </Text>
        </TouchableOpacity>

      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer : {
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
  },

  container : {
    backgroundColor: '#455a64',
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});