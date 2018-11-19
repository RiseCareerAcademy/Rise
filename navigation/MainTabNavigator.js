import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SettingsScreen from '../screens/Settings';
import MatchesScreen from '../screens/MatchesScreen';
//import SearchScreen from '../screens/SearchScreen'
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import ProfileScreen from '../screens/Profile';
import Messages from '../screens/Messages';
import SearchScreen from '../screens/SearchScreen';
import EditProfileScreen from '../screens/EditProfile';
import PasswordScreen from '../screens/PasswordScreen';
import MentorProfileScreen from '../screens/MentorProfileScreen';


const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon.MaterialCommunityIcons
      name="face-profile"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};



const SuggestedMatchStack = createStackNavigator({
  Links: MatchesScreen,
});

SuggestedMatchStack.navigationOptions = {
  tabBarLabel: 'Suggested Matches',
  tabBarIcon: ({ focused }) => (
    <Icon.Feather
      name="users"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const MessageStack = createStackNavigator({
  Main: {screen: Messages},
});

MessageStack.navigationOptions = {
  headerTintColor: "rgb(212, 21, 2)",
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <Icon.Feather
      name="message-circle"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};


const SettingStack = createStackNavigator({
  Settings: SettingsScreen,
  EditProfile: EditProfileScreen,
  Password: PasswordScreen,
});

SettingStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Icon.Feather
      name="settings"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  MentorProfile: MentorProfileScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <Icon.Feather
      name="search"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
}


const TabNavigator = createBottomTabNavigator({
  ProfileStack,
  SuggestedMatchStack,
  SearchStack,
  MessageStack,
  SettingStack,
});

TabNavigator.navigationOptions = {
  header: null,
}

export default TabNavigator;
