import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './src/design-system';

// Import root navigator
import RootNavigator from './src/navigation';

export default function App() {
  // For now, we'll assume the user is not authenticated
  // Later this can be managed through authentication state
  const isAuthenticated = false;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator isAuthenticated={isAuthenticated} />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
