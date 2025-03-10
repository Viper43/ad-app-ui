import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export default function FloatingButton( props ) {
  return(
    <FAB
      style={styles.fab}
      icon="plus"
      label = "Add"
      onPress={() => props.navigation.navigate('AddProduct')} 
    />
  );
  
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#ff0a54",
    position: "absolute",
    bottom: 30,
    right: 15,
  },
})
