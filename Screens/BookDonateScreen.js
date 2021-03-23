import * as React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import db from "../config.js"
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
export default class BookDonateScreen extends React.Component {

  constructor() {
    super()

    this.state = {

      BookList: ''
    }
    this.requestRef = null;
  }

  getBookList = () => {

    this.requestRef = db.collection("BookRequest")
      .onSnapshot((snapshot) => {

        var RequestedBookList = snapshot.docs.map(document => document.data());
        this.setState({
          BookList: RequestedBookList
        })

      })
  }

  componentDidMount() {

    this.getBookList()

  }

  render() {
    return (

      <View>
        <MyHeader title="Donate Books" navigation = {this.props.navigation}/>
        <FlatList

          data={this.state.BookList}
          renderItem={({ item, i }) => {
            return (

              <View>
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>

                      {item.BookName}

                    </ListItem.Title>

                    <ListItem.Subtitle>

                      {item.ReasonForBook}

                    </ListItem.Subtitle>

                  </ListItem.Content>

                  <TouchableOpacity style={styles.button} onPress={() => {

                    this.props.navigation.navigate('ReciverDetials', { "details": item })

                  }}>

                    <Text style={{ color: '#ffff' }}>View</Text>

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
      height: 8,

    }
  }
})