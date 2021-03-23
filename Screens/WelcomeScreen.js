import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import firebase from 'firebase'
import db from "../config"

export default class WelcomeScreen extends React.Component {

  constructor() {
    super()

    this.state = {

      EmailID: '',
      Password: '',
      FirstName: '',
      LastName: '',
      Address: '',
      contactNo: '',
      ConfirmPassword: '',
      isModalVisible: false

    }
  }


  ShowModal = () => {

    return (

      <Modal animationType='fade' transparent={true} visible={this.state.isModalVisible}>

        <View style={styles.ModelConatiner}>

          <ScrollView style={{ width: '100%' }}>

            <KeyboardAvoidingView style={styles.FoarmView}>

              <Text style={styles.FoarmTitle}>Registration</Text>

              <TextInput

                style={styles.FoarmTextInput}
                placeholder='FirstName'
                maxLength={10}

                onChangeText={(text) => {

                  this.setState({ FirstName: text })

                }}
              />

              <TextInput

                style={styles.FoarmTextInput}
                placeholder='LastName'
                maxLength={10}

                onChangeText={(text) => {

                  this.setState({ LastName: text })

                }}
              />
              <TextInput

                style={styles.FoarmTextInput}
                placeholder='ContactNumber'
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(text) => {

                  this.setState({ contactNo: text })

                }}
              />

              <TextInput

                style={styles.FoarmTextInput}
                placeholder='Address'
                multiline={true}
                onChangeText={(text) => {

                  this.setState({ Address: text })

                }}
              />

              <TextInput

                style={styles.FoarmTextInput}
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={(text) => {

                  this.setState({ EmailID: text })

                }}
              />

              <TextInput

                style={styles.FoarmTextInput}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text) => {

                  this.setState({ Password: text })

                }}
              />

              <TextInput

                style={styles.FoarmTextInput}
                placeholder='ConfirmPassword'
                secureTextEntry={true}
                onChangeText={(text) => {

                  this.setState({ ConfirmPassword: text })

                }}
              />
              <View>

                <TouchableOpacity style={styles.RegisterButton} onPress={() => {

                  this.UserSignUp(this.state.EmailID, this.state.Password, this.state.ConfirmPassword)

                }}>

                  <Text style={styles.RegisterButtonText}>Register</Text>

                </TouchableOpacity>

              </View>

              <View>

                <TouchableOpacity style={styles.RegisterButton} onPress={() => {

                  this.setState({
                    isModalVisible: false
                  })

                }}>

                  <Text style={styles.RegisterButtonText}>Cancel</Text>

                </TouchableOpacity>

              </View>

            </KeyboardAvoidingView>

          </ScrollView>

        </View>

      </Modal>


    )

  }
  UserSignUp = (Email, Password, ConfirmPassword) => {

    if (Password !== ConfirmPassword) {
      return alert("Password Does not match Confirm Password")
    } else {

      firebase.auth().createUserWithEmailAndPassword(Email, Password)
        .then((response) => {

          db.collection("Users").add({

            "FirstName": this.state.FirstName,
            "LastName": this.state.LastName,
            "Address": this.state.Address,
            "ContactNumber": this.state.FirstName,
            "Email": this.state.EmailID

          })
          return Alert.alert(
            'User Added Successfully',
            '',
            [
              { text: 'Ok', onPress: () => this.setState({ isModalVisible: false }) }
            ]
          );
        })
        .catch(function (error) {

          var errorMessage = error.message;
          return alert(errorMessage);
        })
    }
  }

  userLogin = (Email, Password) => {

    firebase.auth().signInWithEmailAndPassword(Email, Password)
      .then((response) => {

        this.props.navigation.navigate('DonateBooks');
      })
      .catch(function (error) {

        var errorMessage = error.message;
        return alert(errorMessage);
      })
  }


  render() {
    return (

      <View style={styles.container}>

        <View style={styles.innerContainer}>
          {this.ShowModal()}
          <Text style={styles.Title}>BookSanta</Text>

        </View>

        <View>
          <Image

            source={require("../assets/rocksanta.gif")}
            style={{ width: 200, height: 100, alignSelf: 'center', marginTop: -900 }}

          />
          <TextInput

            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType='email-address'
            onChangeText={(text) => {
              this.setState({ EmailID: text })
            }}
          />


          <TextInput

            style={styles.loginBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ Password: text })
            }}
          />

          <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 20 }]} onPress={() => {

            //this.UserSignUp(this.state.EmailID, this.state.Password)
            this.setState({ isModalVisible: true })

          }}>

            <Text style={styles.buttonText}>SignUp</Text>


          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={() => {

            this.userLogin(this.state.EmailID, this.state.Password)


          }}>

            <Text style={styles.buttonText}>Login</Text>


          </TouchableOpacity>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'lightblue',


  },
  Title: {

    fontSize: 65,
    paddingBottom: 1000,
    marginLeft: -90,
    fontWeight: '300',
    color: 'white'

  },

  loginBox: {

    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: 'grey',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10

  },

  button: {

    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderRadius: 3
  },

  buttonText: {

    fontSize: 20,
    fontWeight: '300',
    color: 'white'

  },
  innerContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    paddingLeft: 80
  },

  FoarmView: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  FoarmTitle: {

    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: 'orange',
    margin: 50
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

  ModelConatiner: {

    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80

  },

  RegisterButton: {

    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'lightblue',
    borderRadius: 10,
    marginTop: 30

  },

  RegisterButtonText: {

    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'



  }
})