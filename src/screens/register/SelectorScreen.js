import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Logo from '../../components/Logo'

var types = [
  {label: "Buyer", value: 0 },
  {label: "Seller", value: 1 },
];

check = (phoneNo, userType, navigation) => {
  if(phoneNo.pno != "" && ( userType.utype == 0 || userType.utype == 1)) {
    navigation.navigate('OtpScreen', {uType: userType.utype, mobile: phoneNo.pno});
  }
  else {
    alert('Please fillup all the fields!');
  }
}

setterPhoneNo = (setPhoneNo, text) => {
  setPhoneNo({pno: text});
}

setterUserType = (setUserType, text) => {
  setUserType({utype: text})
}

export default function SelectorScreen({navigation}) {

  const [phoneNo, setPhoneNo] = useState({pno: ""});
  const [userType, setUserType] = useState({utype: -1});
  
  return (
    <View style = {styles.container}>
      
      <Logo/>
      <View style = {styles.selectContainer}>

        <RadioForm
          formHorizontal={true}
          marginLeft={20}
          radio_props={types}
          initial={10}
          buttonColor={'#2196f3'}
          buttonSize={7}
          buttonOuterSize={20}
          labelStyle={{fontSize: 20, color: '#ffffff', marginRight: 100}}
          animation={true}
          onPress={(value) => {setterUserType(setUserType, value)}}
        />

        <TextInput style={styles.inputBox} 
          
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder="Phone no."
          placeholderTextColor="#ffffff"
          onChangeText = {text => setterPhoneNo(setPhoneNo, text)}/>    
        
        <TouchableOpacity style={styles.button} onPress = {() => {check(phoneNo, userType, navigation)}}>
          <Text style={styles.buttonText}> Register </Text>
        </TouchableOpacity>
      </View>

      <View style = { styles.loginTextContainer }>
        <Text style = { styles.loginText }> Already have an account? </Text>
        <TouchableOpacity onPress = {() => navigation.navigate('LoginPin')}>
          <Text style = { styles.loginButton }>Login</Text>
        </TouchableOpacity>      
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#455a64',
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  selectContainer: {
    flexGrow: 5,
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

  buttonRadio: {
    backgroundColor:'#1c313a',
    borderRadius:25,
    width: 30,
    marginVertical: 10
  },

  loginTextContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginVertical: 22,
    flexDirection:"row"
  },

  loginText:{
    fontSize:18,
    color:"rgb(255,255,255)",
    fontWeight: 'normal'
  },
  
  loginButton:{
    fontSize:18,
    color:"rgb(255,255,255)" ,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});
