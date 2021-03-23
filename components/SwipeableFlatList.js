import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { ListItem, Icon } from 'react-native-elements'
import db from '../config'

export default class SwipeableFlatList extends React.Component {

 constructor(props) {
  super(props)

  this.state = {

   AllUserNotifications: this.props.AllUserNotifications

  }
 }

 renderItem = (data) => (

  <Animated.View>

   <ListItem bottomDivider>

    <ListItem.Content>

     <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
      {data.item.BookName}
     </ListItem.Title>

     <ListItem.Subtitle>
      {data.item.Message}
     </ListItem.Subtitle>
     <Icon name="book" type="font-awesome" color='#696969' />
    </ListItem.Content>

   </ListItem>

  </Animated.View>


 )


 renderHiddenItem = () => (

  <View style={styles.rowBack}>
   <View style={styles.backRightBtn}>
    <Text style={styles.backTextWhite}>Mark as Read</Text>
   </View>
  </View>
 )


 updataMarkAsRead = (Notifications) => {

  db.collection("Notifications").doc(Notifications.doc_id).update({

   NotificationStatus: 'Read'

  })
 }

 onSwipeValueChange = (swipeData) => {

  var AllUserNotifications = this.state.AllUserNotifications;

  const { key, value } = swipeData;

  if (value < -Dimensions.get("window").width) {

   const newData = [...AllUserNotifications];

   this.updataMarkAsRead(AllUserNotifications[key]);

   newData.splice(key, 1);

   this.setState({
    AllUserNotifications: newData

   })

  }

 }

 render() {
  console.log(this.state.AllUserNotifications)
  return (

   <View style={styles.container}>

    <SwipeListView
     
     disableRightSwipe
     data={this.state.AllUserNotifications}
     renderItem={this.renderItem}
     renderHiddenItem={this.renderHiddenItem}
     previewRowKey={"0"}
     onSwipeValueChange={this.onSwipeValueChange}
    />

   </View>

  )
 }
}

const styles = StyleSheet.create({

 container: {
  backgroundColor: "white",
  flex: 1
 },
 rowBack: {
  alignItems: "center",
  backgroundColor: "#29b6f6",
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: 15
 },
 backRightBtn: {
  alignItems: "center",
  bottom: 0,
  justifyContent: "center",
  position: "absolute",
  top: 0,
  width: 100
 },
 backTextWhite: {
  color: "#FFF",
  fontWeight: "bold",
  fontSize: 15,
  textAlign: "center",
  alignSelf: "flex-start"
 },
})