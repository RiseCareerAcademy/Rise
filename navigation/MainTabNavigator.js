import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/Settings';
import MatchesScreen from '../screens/MatchesScreen';
//import SearchScreen from '../screens/SearchScreen'
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import ProfileScreen from '../screens/Profile1';

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
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
  Settings: LinksScreen,
});

MessageStack.navigationOptions = {
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

export default createBottomTabNavigator({
  ProfileStack,
  SuggestedMatchStack,
  MessageStack,
  SettingStack,
});
