import { createStackNavigator } from 'react-navigation-stack'
import BookDonateScreen from '../Screens/BookDonateScreen'
import ReciverDetailScreen from '../Screens/ReciverDetailScreens'

export const AppStackNavigator = createStackNavigator({

 BookDonate: {
  screen: BookDonateScreen,
  navigationOptions: {
   headerShown: false,

  }
 },
 ReciverDetials: { screen: ReciverDetailScreen }

},
 {
  initialRouteName: 'BookDonate'
 }
)