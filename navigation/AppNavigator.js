import MainTabNavigator from './MainTabNavigator';
import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import MentorRegistration from '../screens/MentorRegistration'
import StudentRegistration from '../screens/StudentRegistration'
import SignIn from '../screens/SignIn'
import SearchScreen from '../screens/SearchScreen'
import Profile from '../screens/Profile1/Profile'

const App = createStackNavigator({
  Main: MainTabNavigator,
  Home: { screen: HomeScreen },
  Mentor: { screen: MentorRegistration },
  Student: {screen: StudentRegistration},
  SignIn: {screen: SignIn},
<<<<<<< HEAD
=======
  Main: { screen: MainTabNavigator, navigationOptions: () => ({ header: null }) },
>>>>>>> 4f083a6a7b5266bb17c301c799b1f7e9c66bcb55
  Search: { screen: SearchScreen},
  Profile: { screen: Profile}
});

export default App;
