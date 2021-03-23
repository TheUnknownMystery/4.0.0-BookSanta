import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Icon, Badge } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'



export default class MyHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {

            value: '',
            UserID: firebase.auth().currentUser.email
            
        }
    }

    GetUnreadNotification = () => {

        db.collection('Notifications').where("TargetedUserID", '==', this.state.UserID).where("NotificationStatus", '==', 'Unread')
            .onSnapshot((snapshot) => {
                var unReadNotifications = snapshot.docs.map((doc) => doc.data());
                this.setState({
                    value: unReadNotifications.length
                })
            })
    }


    componentDidMount = () => {

        this.GetUnreadNotification()

    }

    BellIconWithBadge = () => {
        return (

            <View>

                <Icon name='bell' type='font-awesome' color='black' size={25} onPress={() => {

                    this.props.navigation.navigate("Notifications")

                }} />

                <Badge
                    value={this.state.value}
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }} />

            </View>

        )
    }

    render() {
        return (
            <Header

                leftComponent={< Icon name="bars" type="font-awesome" color='black' onPress={() => this.props.navigation.toggleDrawer()} />}
                centerComponent={{ text: this.props.title, style: { marginTop: 10, color: 'orange', fontSize: 20, fontWeight: 'bold' } }}
                backgroundColor="yellow"
                rightComponent={<this.BellIconWithBadge {...this.props} />}
            />

        )
    }
}

