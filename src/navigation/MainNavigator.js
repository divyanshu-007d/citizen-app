// src/navigation/MainNavigator.js
// Main Application Navigation Structure

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import { 
  ComplaintsStackNavigator, 
  CommunityStackNavigator 
} from './StackNavigators';

// Modal screens
const CameraModalScreen = () => null;
const ImageViewerModalScreen = () => null;
const LocationPickerModalScreen = () => null;
const FilterModalScreen = () => null;
const ShareModalScreen = () => null;

const RootStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      {/* Main App Flow */}
      <RootStack.Screen name="TabNavigator" component={TabNavigator} />
      
      {/* Additional Stack Navigators */}
      <RootStack.Screen name="Complaints" component={ComplaintsStackNavigator} />
      <RootStack.Screen name="Community" component={CommunityStackNavigator} />
      
      {/* Modal Screens */}
      <RootStack.Screen 
        name="CameraModal" 
        component={CameraModalScreen}
        options={{ presentation: 'fullScreenModal' }} 
      />
      <RootStack.Screen 
        name="ImageViewerModal" 
        component={ImageViewerModalScreen} 
      />
      <RootStack.Screen 
        name="LocationPickerModal" 
        component={LocationPickerModalScreen} 
      />
      <RootStack.Screen 
        name="FilterModal" 
        component={FilterModalScreen} 
      />
      <RootStack.Screen 
        name="ShareModal" 
        component={ShareModalScreen} 
      />
    </RootStack.Navigator>
  );
};

export default MainNavigator;