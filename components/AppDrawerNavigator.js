import { createDrawerNavigator } from 'react-navigation-drawer'
import { AppTabNavigator } from './appTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from "../Screens/SettingsScreen"
import MyDonationScreen from "../Screens/MyDonationScreen"
import Notifications from '../Screens/NotificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator,

    },
    

    Settings: {

        screen: SettingsScreen,
    },

    MyDonations: {

        screen: MyDonationScreen,

    },
    Notifications: {

        screen: Notifications

    }
},
    {
        contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName: 'Home'
    }
)