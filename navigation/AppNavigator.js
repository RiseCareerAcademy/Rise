import MainTabNavigator from './MainTabNavigator';
import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import MentorRegistration from '../screens/MentorRegistration'
import StudentRegistration from '../screens/StudentRegistration'
import SignIn from '../screens/SignIn'
import Profile from '../screens/Profile1/Profile'

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Mentor: { screen: MentorRegistration },
  Student: {screen: StudentRegistration},
  SignIn: {screen: SignIn},
  Main: { screen: MainTabNavigator, navigationOptions: () => ({ header: null }) },
  Profile: { screen: Profile},
});

export default App;
