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

const App = createStackNavigator({
  // Ratings: { screen: Ratings },
  Home: { screen: HomeScreen },
  Mentor: { screen: MentorRegistration },
  Student: {screen: StudentRegistration},
  SignIn: {screen: SignIn},
  Main: { screen: MainTabNavigator, navigationOptions: () => ({ header: null }) },
  Search: { screen: SearchScreen},
  Profile: { screen: Profile},
});

export default App;

