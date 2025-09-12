// src/navigation/StackNavigators.js
// Stack Navigators for each main section

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../design-system';

// Import actual screens
import HomeScreen from '../screens/home/HomeScreen';
import ComplaintDetailsScreen from '../screens/ComplaintDetailsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import ReferralScreen from '../screens/ReferralScreen';

// Import Settings screens
import SettingsScreen from '../screens/settings/SettingsScreen';
import NotificationSettings from '../screens/settings/NotificationSettings';
import PrivacySettings from '../screens/settings/PrivacySettings';
import LanguageSettings from '../screens/settings/LanguageSettings';
import SecuritySettings from '../screens/settings/SecuritySettings';

// Import other existing screens
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Placeholder screens - to be implemented later
const FilterViewScreen = () => null;
const ComplaintHistoryScreen = () => null;
const ComplaintTrackingScreen = () => null;
const ComplaintEditScreen = () => null;
const CommunityFeedScreen = () => null;
const DiscussionScreen = () => null;
const UserProfileScreen = () => null;
const EditProfileScreen = () => null;

// Create Stack Navigators
const HomeStack = createStackNavigator();
const ComplaintsStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export const HomeStackNavigator = () => {
  const { theme } = useTheme();
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          ...theme.typography.titleMedium,
        },
      }}
    >
      <HomeStack.Screen 
        name="HomeFeed" 
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="ComplaintDetails" 
        component={ComplaintDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="FilterView" 
        component={FilterViewScreen}
        options={{ title: 'Filter Complaints' }}
      />
      <HomeStack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Notifications" 
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Map" 
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Report" 
        component={ReportScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export const ComplaintsStackNavigator = () => {
  const { theme } = useTheme();
  
  return (
    <ComplaintsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          ...theme.typography.titleMedium,
        },
      }}
    >
      <ComplaintsStack.Screen 
        name="ComplaintHistory" 
        component={ComplaintHistoryScreen}
        options={{ title: 'My Complaints' }} 
      />
      <ComplaintsStack.Screen 
        name="ComplaintDetails" 
        component={ComplaintDetailsScreen}
        options={{ title: 'Complaint Details' }}
      />
      <ComplaintsStack.Screen 
        name="ComplaintTracking" 
        component={ComplaintTrackingScreen}
        options={{ title: 'Track Complaint' }}
      />
      <ComplaintsStack.Screen 
        name="ComplaintEdit" 
        component={ComplaintEditScreen}
        options={{ title: 'Edit Complaint' }}
      />
    </ComplaintsStack.Navigator>
  );
};

export const CommunityStackNavigator = () => {
  const { theme } = useTheme();
  
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          ...theme.typography.titleMedium,
        },
      }}
    >
      <CommunityStack.Screen 
        name="CommunityFeed" 
        component={CommunityFeedScreen}
        options={{ title: 'Community' }} 
      />
      <CommunityStack.Screen 
        name="Discussion" 
        component={DiscussionScreen}
        options={{ title: 'Discussion' }}
      />
      <CommunityStack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{ title: 'User Profile' }}
      />
    </CommunityStack.Navigator>
  );
};

export const ProfileStackNavigator = () => {
  const { theme } = useTheme();
  
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          ...theme.typography.titleMedium,
        },
      }}
    >
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ headerShown: false }} 
      />
      <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <ProfileStack.Screen 
        name="Achievements" 
        component={AchievementsScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="NotificationSettings" 
        component={NotificationSettings}
        options={{ title: 'Notifications' }}
      />
      <ProfileStack.Screen 
        name="PrivacySettings" 
        component={PrivacySettings}
        options={{ title: 'Privacy' }}
      />
      <ProfileStack.Screen 
        name="LanguageSettings" 
        component={LanguageSettings}
        options={{ title: 'Language' }}
      />
      <ProfileStack.Screen 
        name="SecuritySettings" 
        component={SecuritySettings}
        options={{ title: 'Security' }}
      />
      <ProfileStack.Screen 
        name="Referrals" 
        component={ReferralScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
