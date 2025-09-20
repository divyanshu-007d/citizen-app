// src/navigation/TabNavigator.js
// Enhanced Bottom Tab Navigation with Material Design 3 styling

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
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
          paddingTop: theme.spacing.md, // Extra padding for elevated button
          paddingHorizontal: theme.spacing.xs,
          // Add glassmorphism to tab bar
          ...Platform.select({
            ios: {
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
          }),
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
                width: 64,
                height: 64,
                marginTop: -20, // Elevate above tab bar
                borderRadius: 32,
                overflow: 'hidden',
                ...Platform.select({
                  ios: {
                    shadowColor: theme.colors.primary,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.25,
                    shadowRadius: 16,
                  },
                  android: {
                    elevation: 12,
                  },
                }),
              }}>
                {/* Gradient Background */}
                <LinearGradient
                  colors={[
                    theme.colors.primary + 'E6',
                    theme.colors.secondary + 'CC',
                    theme.colors.primary + 'F2'
                  ]}
                  locations={[0, 0.5, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Glassmorphism Overlay */}
                  <BlurView
                    intensity={20}
                    tint="light"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: theme.colors.surface + '40',
                      backgroundColor: theme.colors.surface + '15',
                    }}
                  >
                    {/* Inner Icon Container */}
                    <View style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: theme.colors.surface + '20',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: theme.colors.surface + '30',
                    }}>
                      <FontAwesome5 
                        name="plus" 
                        size={24} 
                        color={theme.colors.surface}
                        style={{
                          textShadowColor: theme.colors.primary + '80',
                          textShadowOffset: { width: 0, height: 2 },
                          textShadowRadius: 4,
                        }}
                      />
                    </View>
                  </BlurView>
                  
                  {/* Animated Ring Effect */}
                  <View style={{
                    position: 'absolute',
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    borderWidth: 2,
                    borderColor: focused 
                      ? theme.colors.surface + '60' 
                      : theme.colors.surface + '30',
                    opacity: focused ? 1 : 0.7,
                  }} />
                </LinearGradient>
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