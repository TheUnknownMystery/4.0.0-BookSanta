import * as React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class MyDonationScreen extends React.Component {

  constructor() {
    super()
    this.state = {

      AllDonations: [],
      UserID: firebase.auth().currentUser.email,
      DonorName: ''
    }
    this.requestRef = null;
  }

  getAllDonation = () => {

    this.requestRef = db.collection("Donation").where("DonorID", '==', this.state.UserID)
      .onSnapshot(snapshot => {
        var allDonations = snapshot.docs.map(document => document.data());
        this.setState({
          AllDonations: allDonations
        })
      })

  }

  componentDidMount = () => {

    this.getAllDonation();
    this.getDonorDetials(this.state.UserID)
  }



  sendBook = (BookDetails) => {
    console.log(BookDetails.id);
    var RequestStatus = "Book Sent"
    var requestId = BookDetails.RequestID

    db.collection("Donation").where("RequestID", "==", requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
      
      db.collection("Donation").doc(doc.id).update({
        RequestStatus: "Book Sent"
      })
       
      })
    })

    this.sendNotification(BookDetails, RequestStatus)
  }

  getDonorDetials = (DonorID) => {

    db.collection("Users").where("Email", '==', DonorID).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({

            DonorName: doc.data().FirstName + " " + doc.data().LastName

          })
        })
      })
  }

  sendNotification = (BookDetails, RequestStatus) => {

    var requestId = BookDetails.RequestID
    var donorId = BookDetails.DonorID
    db.collection("Notifications").where("RequestID", "==", requestId).where("DonorID", "==", donorId)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {

          var message = this.state.DonorName + " sent you a book";
          db.collection("Notifications").doc(doc.id).update({
            "Message": message,
            "Date": firebase.firestore.FieldValue.serverTimestamp(),
            "NotificationStatus": "Unread"
          })
        })
      })
  }

  render() {
    console.log("Donations : " + this.state.AllDonations)
    return (

      <View>

        <FlatList

          data={this.state.AllDonations}
          renderItem={({ item, i }) => {
            return (

              <View>
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>

                      {item.BookName}

                    </ListItem.Title>

                    <ListItem.Subtitle>

                      {item.RequestedBy}

                    </ListItem.Subtitle>
                  </ListItem.Content>

                  <TouchableOpacity style={styles.button} onPress={() => {

                    this.sendBook(item)

                  }}>

                    <Text style={{ color: '#ffff' }}>Send Book</Text>

                  </TouchableOpacity>
                </ListItem>

              </View>
            )
          }} />

      </View>

    )
  }
}

const styles = StyleSheet.create({

  button: {

    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    }
  }
})