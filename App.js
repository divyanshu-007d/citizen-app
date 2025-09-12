import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './src/design-system';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Import root navigator
import RootNavigator from './src/navigation';

// App content component that uses auth context
const AppContent = () => {
  const { isAuthenticated } = useAuth();

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
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
