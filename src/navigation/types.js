// src/navigation/types.js
// Navigation Type Definitions

/**
 * Authentication Stack Parameter List
 */
export const AuthStackParamList = {
  Login: undefined,
  Register: undefined,
  OTPVerification: undefined, // { phoneNumber: string }
};

/**
 * Main Tab Navigation Parameter List
 */
export const MainTabParamList = {
  Home: undefined,
  Map: undefined,
  Report: undefined,
  Leaderboard: undefined,
  Profile: undefined,
};

/**
 * Home Stack Parameter List
 */
export const HomeStackParamList = {
  HomeFeed: undefined,
  ComplaintDetails: undefined, // { complaintId: string }
  FilterView: undefined,
};

/**
 * Complaints Stack Parameter List
 */
export const ComplaintsStackParamList = {
  ComplaintHistory: undefined,
  ComplaintDetails: undefined, // { complaintId: string }
  ComplaintTracking: undefined, // { complaintId: string }
  ComplaintEdit: undefined, // { complaintId: string }
};

/**
 * Community Stack Parameter List
 */
export const CommunityStackParamList = {
  CommunityFeed: undefined,
  Discussion: undefined, // { discussionId: string }
  UserProfile: undefined, // { userId: string }
};

/**
 * Profile Stack Parameter List
 */
export const ProfileStackParamList = {
  ProfileMain: undefined,
  EditProfile: undefined,
  Achievements: undefined,
  Settings: undefined,
  NotificationSettings: undefined,
  PrivacySettings: undefined,
  LanguageSettings: undefined,
  SecuritySettings: undefined,
};