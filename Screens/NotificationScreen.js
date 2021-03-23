import * as React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'
import { ListItem } from 'react-native-elements'
import SwipeableFlatList from '../components/SwipeableFlatList'

export default class Notifications extends React.Component {

  constructor() {
    super()

    this.state = {

      CurrentUserid: firebase.auth().currentUser.email,
      AllUserNotifications: []
    }

    this.request = null
  }


  GetAllNotifications = () => {

    this.request = db.collection("Notifications").where("TargetedUserID", '==', this.state.CurrentUserid)
      .onSnapshot(Snapshot => {

        var AllNotifications = Snapshot.docs.map(document => document.data());
        this.setState({

          AllUserNotifications: AllNotifications

        })
      })
  }

  componentDidMount = () => {

    this.GetAllNotifications()

  }

  render() {
    
    console.log(this.state.AllUserNotifications)
    return (
      <View>

        <MyHeader title='Notifications' navigation={this.props.navigation} />

        <View>

          <SwipeableFlatList

           AllUserNotifications={this.state.AllUserNotifications}

          />

        </View>

      </View>
    )
  }
}