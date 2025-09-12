// src/navigation/AuthNavigator.js
// Authentication Flow Navigation

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import actual auth screens
import { LoginScreen } from '../screens/auth';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;