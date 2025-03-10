import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

redirect = (props) => {
  if( props.route.params.uType == 0 ) {
    props.navigation.navigate('BuyerRegister', {mobile: props.route.params.mobile});
  }
  else {
    props.navigation.navigate('SellerRegister', {mobile: props.route.params.mobile});
  }
}


const setterOtp = (setOtp, text) => {
  setOtp({otp: text});
}


export default function OtpScreen( props ) {

  const [otpInput, setOtp] = useState({otp: ""});

  return (
    <View style = {styles.container}>
      <View style = {styles.mpinContainer}>
        <Text style = {styles.displayText}>Enter the OTP</Text>
        <OTPTextView
          textInputStyle = {styles.roundedTextInput}
          containerStyle = {styles.textInputContainer}
          handleTextChange = {(text) => setterOtp(setOtp, text)} 
          inputCount = {4}
          keyboardType = {'number-pad'}
        />
        
        <TouchableOpacity style = {styles.button} onPress = {() => {redirect(props)}}>
          <Text style = {styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#455a64"
  },

  mpinContainer: {
    flex: 1,
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

  displayText: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 10
  }
});
  