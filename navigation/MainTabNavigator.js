import React from 'react';
import { Icon } from 'expo';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/Settings';
import Colors from '../constants/Colors';
import ProfileScreen from '../screens/Profile1';
import Messages from '../screens/Messages';
import Conversation from '../screens/Conversation';



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
  Links: LinksScreen,
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
  Conversation: {screen: Conversation},
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

const ConversationStack = createStackNavigator({
  Conversation: Conversation,
});

ConversationStack.navigationOptions = {
  headerTintColor: "rgb(212, 21, 2)",
  tabBarLabel: 'Conversation',
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
  ConversationStack
});
