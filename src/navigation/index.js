// src/navigation/index.js
// Main export file for navigation components

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import TabNavigator from './TabNavigator';
import { 
  HomeStackNavigator,
  ComplaintsStackNavigator,
  CommunityStackNavigator,
  ProfileStackNavigator 
} from './StackNavigators';

// Types
import * as NavigationTypes from './types';

export {
  AuthNavigator,
  MainNavigator,
  TabNavigator,
  HomeStackNavigator,
  ComplaintsStackNavigator,
  CommunityStackNavigator,
  ProfileStackNavigator,
  NavigationTypes
};

// Root Navigator - Determines if user is authenticated
// This is the main navigator that will be imported in App.js
const RootNavigator = ({ isAuthenticated = false }) => {
  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;