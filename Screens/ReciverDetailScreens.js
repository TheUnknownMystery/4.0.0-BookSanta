import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import db from '../config'
import { Card } from 'react-native-elements'


export default class ReciverDetailScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      UserId: firebase.auth().currentUser.email,
      UserName: '',
      ReciverID: this.props.navigation.getParam('details')["UserID"],
      RequestID: this.props.navigation.getParam("details")["RequestID"],
      Book_Name: this.props.navigation.getParam("details")["BookName"],
      Reason_ToRequest: this.props.navigation.getParam("details")["ReasonForBook"],

      ReciverName: '',
      ReciverContact: '',
      ReciverAddress: '',
      ReciverRequestDocID: ''

    }
  }

  getReciverDetails = () => {

    db.collection("Users").where("Email", '==', this.state.ReciverID).get()

      .then(snapshot => {

        snapshot.forEach(doc => {

          this.setState({

            ReciverName: doc.data().FirstName,
            ReciverContact: doc.data().ContactNumber,
            ReciverAddress: doc.data().Address,

          })
        })
      })

  }

  componentDidMount() {

    this.getReciverDetails();
    this.getUserDetails(this.state.UserId);
  }


  getUserDetails = (UserID) => {

    db.collection("Users").where("Email", '==', UserID).get()
      .then(snapshot => {
        snapshot.forEach(doc => {

          this.setState({

            UserName: doc.data().FirstName + " " + doc.data().LastName

          })
        })
      })
  }

  UpdateBookStatus = () => {

    db.collection('Donation').add({

      'BookName': this.state.Book_Name,
      'RequestID': this.state.RequestID,
      'RequestedBy': this.state.ReciverName,
      'DonorID': this.state.UserId,
      'RequestStatus': "Donor Interested"

    })
  }

  AddNotification = () => {

    var message = this.state.UserName + " has shown interest  in donating the book";

    db.collection("Notifications").add({

      "TargetedUserID": this.state.ReciverID,
      "DonorID": this.state.UserId,
      "RequestID": this.state.RequestID,
      "BookName": this.state.Book_Name,
      "Date": firebase.firestore.FieldValue.serverTimestamp(),
      "NotificationStatus": "Unread",
      "Message": message
    })
  }

  render() {
    //console.log(this.state.ReciverName);
    //console.log(this.state.ReciverContact);
    //console.log(this.state.ReciverAddress);
    return (

      <View style={styles.container}>

        <View style={{ flex: 0.3 }}>

          <Card
            title={"Book Information"}
            titleStyle={{ fonSize: 20 }}>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>Book Name : {this.state.Book_Name}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>Reason : {this.state.Reason_ToRequest}</Text>

            </Card>

          </Card>

        </View>

        <View style={{ flex: 0.3, paddingTop: 90 }}>

          <Card

            title={"ReciverInformaton"}
            titleStyle={{ fontSize: 20 }}>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>ReciverName : {this.state.ReciverName}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>ReciverContact: {this.state.ReciverContact}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>ReciverAddress: {this.state.ReciverAddress}</Text>

            </Card>

          </Card>

        </View>
        <View style={styles.buttonContainer} >
          {
            this.state.ReciverID !== this.state.UserID
              ? (< TouchableOpacity style={styles.button} onPress={() => {

                this.UpdateBookStatus()
                this.AddNotification()
                this.props.navigation.navigate('MyDonations')
              }}>

                <Text stye={{ fontWeight: 'bold' }}>I want to Donate!</Text>

              </TouchableOpacity>
              )
              : null
          }
        </View>
      </View >

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },


  }
})