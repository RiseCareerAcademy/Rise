import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import MentorRegistration from '../screens/MentorRegistration'

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Mentor: { screen: MentorRegistration },
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html

  Main: MainTabNavigator,
});
