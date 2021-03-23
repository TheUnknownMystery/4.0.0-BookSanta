import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase'

export default class CustomSideBarMenu extends React.Component {

 render() {
  return (

   <View style={{ flex: 1 }}>

    <View style={{ flex: 0.8, marginTop: 14 }}>

     <DrawerItems {...this.props} />

    </View>
    <View style={styles.logOutContainer}>
     <TouchableOpacity style={styles.logOutButton} onPress={() => {

     firebase.auth().signOut();
     this.props.navigation.navigate("WelcomeScreen")

     }}
     >

      <Text style={styles.logOutText}>LogOut</Text>

     </TouchableOpacity>
    </View>
   </View>

  )
 }
}

const styles = StyleSheet.create({

 logOutContainer: {
  flex: 0.2,
  justifyContent: 'flex-end',
 
 },

 logOutButton: {
  height: 30,
  width: '100%',
  justifyContent: 'center',
 
 },

 logOutText: {
  fontSize: 30,
  fontWeight: 'bold'
 }

})