import MainTabNavigator from './MainTabNavigator';
import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import MentorRegistration from '../screens/MentorRegistration'
import StudentRegistration from '../screens/StudentRegistration'
import SignIn from '../screens/SignIn'
import Profile from '../screens/Profile'
import LoadingScreen from '../screens/LoadingScreen';
import Conversation from '../screens/Conversation';
import PreviewScreen from '../screens/PreviewScreen';

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Mentor: { screen: MentorRegistration },
  Student: {screen: StudentRegistration},
  SignIn: {screen: SignIn},
  Main: { screen: MainTabNavigator },
  Profile: { screen: Profile},
  Loading: { screen: LoadingScreen },
  Conversation: { screen: Conversation },
  Preview: { screen: PreviewScreen },
});

App.navigationOptions = {
  header: null,
}

export default App;
