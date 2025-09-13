// src/navigation/TabNavigator.js
// Enhanced Bottom Tab Navigation with Material Design 3 styling

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';

// Import Stack Navigators
import { 
  HomeStackNavigator, 
  ProfileStackNavigator 
} from './StackNavigators';

// Import individual screens for tab navigation
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          ...theme.elevation.level2,
          height: theme.componentTokens.bottomNavigation.height + insets.bottom,
          paddingBottom: insets.bottom + theme.spacing.xs,
          paddingTop: theme.spacing.sm,
          paddingHorizontal: theme.spacing.xs,
        },
        tabBarLabelStyle: {
          ...theme.typography.labelSmall,
          fontWeight: '500',
          marginTop: theme.spacing.xs,
        },
        tabBarItemStyle: {
          paddingVertical: theme.spacing.xs,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = theme.iconSizes.md;
          
          // Define icons for each tab
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Map':
              iconName = focused ? 'map-marked-alt' : 'map';
              break;
            case 'Report':
              iconName = 'plus-circle';
              iconSize = theme.iconSizes.lg; // Larger for emphasis
              color = focused ? theme.colors.primary : theme.colors.primary;
              break;
            case 'Leaderboard':
              iconName = focused ? 'trophy' : 'trophy';
              break;
            case 'Profile':
              iconName = focused ? 'user-alt' : 'user';
              break;
            default:
              iconName = 'question-circle';
          }

          // Special styling for Report tab (center action)
          if (route.name === 'Report') {
            return (
              <View style={{
                width: 48,
                height: 48,
                borderRadius: theme.borderRadius.xl,
                backgroundColor: focused 
                  ? theme.colors.primaryContainer 
                  : theme.colors.primaryContainer,
                justifyContent: 'center',
                alignItems: 'center',
                ...theme.elevation.level1,
              }}>
                <FontAwesome5 
                  name={iconName} 
                  size={iconSize} 
                  color={focused 
                    ? theme.colors.onPrimaryContainer 
                    : theme.colors.onPrimaryContainer
                  } 
                />
              </View>
            );
          }

          return <FontAwesome5 name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home tab - View civic reports dashboard',
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarAccessibilityLabel: 'Map tab - View reports on map',
        }}
      />
      <Tab.Screen 
        name="Report" 
        component={ReportScreen}
        options={{
          tabBarLabel: '',
          tabBarAccessibilityLabel: 'Report tab - Create new civic report',
          tabBarLabelStyle: {
            ...theme.typography.labelMedium,
            fontWeight: '600',
            color: theme.colors.primary,
          },
        }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Rankings',
          tabBarAccessibilityLabel: 'Leaderboard tab - View community rankings',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarAccessibilityLabel: 'Profile tab - View and edit your profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;