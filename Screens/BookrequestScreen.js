import * as React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import MyHeader from "../components/MyHeader"
import db from "../config"
import firebase from 'firebase'

export default class BookRequestScreen extends React.Component {

 constructor() {
  super()

  this.state = {

   userId: firebase.auth().currentUser.email,
   BookName: '',
   ReasonToRequest: '',

  }
 }


 createUniqueId() {
  return Math.random().toString(36).substring(7);
 }

 componentDidMount = () => {

  var hours = new Date().getHours(); //To get the Current Hours
  console.log(hours)

 }

 addRequest = async (BookName, Reason) => {

  var userId = this.state.userId;
  var randomRequestId = this.createUniqueId();
  db.collection("BookRequest").add({

   'UserID': userId,
   'RequestID': randomRequestId,
   'BookName': BookName,
   'ReasonForBook': Reason


  });

  this.setState({

   bookName: '',
   ReasonToRequest: ''

  })

  return alert('Request Submitted')
 }

 render() {
  return (

   <View style={{ flex: 1 }}>



    <KeyboardAvoidingView style={styles.KeyboardStyle}>

     <TextInput

      placeholder='Enter Book Name'
      style={styles.FoarmTextInput}
      onChangeText={(text) => {

       this.setState({ BookName: text })

      }}
      value={this.state.bookName}
     />


     <TextInput

      placeholder='Why do you need the Book?'
      style={[styles.FoarmTextInput, { height: 300 }]}
      multiline={true}
      numberOfLines={10}
      onChangeText={(text) => {

       this.setState({ ReasonToRequest: text })

      }}
      value={this.state.ReasonToRequest}
     />

     <TouchableOpacity style={styles.ButtonStyle} onPress={() => {

      this.addRequest(this.state.BookName, this.state.ReasonToRequest)

     }}>

      <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'orange' }}>Submit</Text>


     </TouchableOpacity>

    </KeyboardAvoidingView>
   </View>

  )
 }
}

const styles = StyleSheet.create({

 KeyboardStyle: {

  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'

 },

 FoarmTextInput: {

  width: '75%',
  height: 35,
  alignSelf: 'center',
  borderColor: 'orange',
  borderRadius: 10,
  borderWidth: 1,
  marginTop: 20,
  padding: 10


 },

 ButtonStyle: {

  width: 200,
  height: 40,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  borderColor: 'lightblue',
  borderRadius: 10,
  marginTop: 30

 },
})