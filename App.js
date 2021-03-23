import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import WelcomeScreen from './Screens/WelcomeScreen'
import BookRequestScreen from "./Screens/BookrequestScreen"
import { AppTabNavigator } from './components/appTabNavigator'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {AppStackNavigator} from './components/AppStackNavigator'

export default class App extends React.Component {
  render() {
    return (

      <SafeAreaProvider>

        <AppContainer />

      </SafeAreaProvider>
    );
  }
}

const switchNavigator = createSwitchNavigator({

  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppDrawerNavigator },
  Stack: {screen: AppStackNavigator}

})

const AppContainer = createAppContainer(switchNavigator)