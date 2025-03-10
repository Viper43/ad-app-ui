import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Text, Dimensions, Animated, Image} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './components/Header4';


datalist = [
  { id: '1', title: 'Flat 50% 0ff on Potatoes', description: 'Grab it now.', image: require('./images/FruitAd.jpg')},
  { id: '2', title: 'Flat 50% 0ff on Potatoes', description: 'Grab it now.', image: require('./images/FruitAd.jpg')},
  { id: '3', title: 'Flat 50% 0ff on Potatoes', description: 'Grab it now.', image: require('./images/FruitAd.jpg')},
  { id: '4', title: 'Flat 50% 0ff on Potatoes', description: 'Grab it now.', image: require('./images/FruitAd.jpg')},
  { id: '5', title: 'Flat 50% 0ff on Potatoes', description: 'Grab it now.', image: require('./images/FruitAd.jpg')},
]

const itemHeigt = 300;

export default function NotificationsScreen( props ) {

  const [listData, setListData] = useState(
    datalist.map((dataItem, index) => ({
      key: `${index}`,
      title: dataItem.title,
      description: dataItem.description,
      image: dataItem.image,
    })),
  );

  const closeRow = (rowMap, rowKey) => {
    if(rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  }



  const HiddenItemWithActions = props => {

    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;
    
    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return(
      <Animated.View style = {styles.trashContainer} >
        <Animated.View style = {[styles.trash, 
          {
            transform: [
              {
                scale: swipeAnimatedValue.interpolate({
                  inputRange: [45, 90],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },]}>
        
          <MaterialCommunityIcons name = "trash-can-outline" size = {25} color = "#fff"/>
        </Animated.View>
        <Animated.View style = {[styles.trash, 
          {
            transform: [
              {
                scale: swipeAnimatedValue.interpolate({
                  inputRange: [-90, -45],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },]}>
          <MaterialCommunityIcons name = "trash-can-outline" size = {25} color = "#fff"/>
        </Animated.View>
      </Animated.View>
      
    );
  }


  const renderHiddenItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    const rowActionAnimatedValue = new Animated.Value(75);

    return(
      <HiddenItemWithActions
        data = {data}
        rowMap = {rowMap}
        rowActionAnimatedValue = {rowActionAnimatedValue}
        rowHeightAnimatedValue = {rowHeightAnimatedValue}
        onClose = {() => closeRow(rowMap, data.item.key)}
        onDelete ={() => deleteRow(rowMap, data.item.key)}
      />
    );
  }

  /* Default items to be rendered */

  const VisibleItem = props => {
    const {data, rowHeightAnimatedValue, removeRow, leftActionState, rightActionState} = props

    if ( rightActionState ) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    if ( leftActionState ) {
      Animated.timing( rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return(
      <Animated.View>
        <TouchableHighlight style = {styles.itemButton} activeOpacity = {0.8}>
          <View style = {styles.itemBox}>
            <View style = {styles.itemTextBox}>
            <Text style = {styles.title}>{data.item.title}</Text>
            <Text style = {styles.description}>{data.item.description}</Text>
            </View>
            <View style = {styles.imageBox}>
              <Image source = {data.item.image}
                style = {styles.cardImage}
                resizeMode = "cover"
              />
            </View>
          </View>
        
        </TouchableHighlight>
      </Animated.View>
    );
  }


  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow = {() => deleteRow(rowMap, data.item.key)}
      />
    );
  }
  
  /* default return function loading main component */

  return(
    <View style = {styles.container}>
      <Header screenName = 'Notifications' {...props}/>
      <SwipeListView
        data = {listData}
        renderItem = {renderItem}
        renderHiddenItem = {renderHiddenItem}
        previewRowKey={'0'}
        leftOpenValue = {0}
        rightOpenValue = {0}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={500}
        rightActionValue={-500}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
  },

  itemButton: {
    backgroundColor: "#fff",
    borderRadius: 3,
    height: itemHeigt,
    width: "100%",
  },

  itemBox: {
    flex: 1,
    marginBottom: "1%",
    justifyContent: "space-between",
  },

  itemTextBox: {
    marginLeft: "3%",
    marginTop: "2%",
    marginBottom: "1%",
  },

  title: {
    fontSize: 17,
    color: "#000000",
  },

  description: {
    fontSize: 15,
    color: "#7f7f7f",
  },

  imageBox: {
    height: 0.76 * itemHeigt,
    width: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

  },

  cardImage: {
    height: "100%",
    width: "100%"
    
  },

  trashContainer: {
    height: itemHeigt,
    borderRadius: 3,
    paddingHorizontal: "5%",
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  trash: {
    
  }

});