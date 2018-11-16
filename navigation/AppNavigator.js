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
import Ratings from '../screens/RatingsScreen';
import noMatch from '../screens/noMatch'

const App = createStackNavigator({
  SignIn: {screen: SignIn},
  Home: { screen: HomeScreen },
  noMatch: {screen: noMatch},
  Ratings: { screen: Ratings },
  Mentor: { screen: MentorRegistration },
  Student: {screen: StudentRegistration},

  Main: { screen: MainTabNavigator, navigationOptions: () => ({ header: null }) },
  Search: { screen: SearchScreen},
  Profile: { screen: Profile},
});

export default App;

