import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase'
import db from '../config'
export default class SettingsScreen extends React.Component {

  constructor() {
    super()

    this.state = {

      FirstName: '',
      LastName: '',
      contactNo: '',
      Address: '',
      EmailID: '',
      Doc_ID: ''

    }
  }

  GetUserDetails = () => {

    var user = firebase.auth().currentUser;
    var email = user.email;

    db.collection("Users").where("Email", "==", email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var data = doc.data();
          this.setState({
            FirstName: data.FirstName,
            LastName: data.LastName,
            contactNo: data.ContactNumber,
            Address: data.Address,
            EmailID: data.Email,
            Doc_ID: doc.id
          })
        })
      })

  }

  componentDidMount = () => {

    this.GetUserDetails()

  }


  updateUserDetails = () => {

    alert("Updated Account")
    db.collection('Users').doc(this.state.Doc_ID).update({

      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      contactNo: this.state.contactNo,
      Address: this.state.Address,

    })

    alert("Updated Account")
  }
  render() {
    return (

      <View >

        <MyHeader title='Settings' navigation = {this.props.navigation}/>

        <View style={styles.container}>

          <TextInput

            style={styles.FoarmTextInput}
            placeholder='FirstName'
            maxLength={10}
            value={this.state.FirstName}

            onChangeText={(text) => {

              this.setState({ FirstName: text })

            }}
          />

          <TextInput

            style={styles.FoarmTextInput}
            placeholder='LastName'
            maxLength={10}
            value={this.state.LastName}

            onChangeText={(text) => {

              this.setState({ LastName: text })

            }}
          />
          <TextInput

            style={styles.FoarmTextInput}
            placeholder='ContactNumber'
            maxLength={10}
            keyboardType='numeric'
            value={this.state.contactNo}

            onChangeText={(text) => {

              this.setState({ contactNo: text })

            }}
          />

          <TextInput

            style={styles.FoarmTextInput}
            placeholder='Address'
            multiline={true}
            value={this.state.Address}
            onChangeText={(text) => {

              this.setState({ Address: text })

            }}
          />

          <TextInput

            style={styles.FoarmTextInput}
            placeholder='Email'
            keyboardType='email-address'
            value={this.state.EmailID}

          />

        </View>


        <TouchableOpacity style={styles.SaveButton} onPress={() => {

          this.updateUserDetails()

        }}>

          <Text style={styles.SaveButtonText}>Save</Text>

        </TouchableOpacity>

      </View >


    )
  }
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },

  FoarmTextInput: {

    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10
  },
  SaveButton: {

    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'lightblue',
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 650

  },

  SaveButtonText: {

    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'

  }
})