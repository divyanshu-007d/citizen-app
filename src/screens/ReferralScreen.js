// src/screens/ReferralScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Share,
  Alert,
  Clipboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const ReferralScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [referralCode] = useState('CIVIC2024ABC');
  const [referralStats] = useState({
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalEarnings: 800, // points
    currentMonthReferrals: 3,
    rank: 23 // among referrers
  });

  const [referralHistory] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      status: 'completed',
      joinDate: new Date('2024-08-15'),
      pointsEarned: 100,
      avatar: null
    },
    {
      id: 2,
      name: 'Priya Singh',
      phone: '+91 87654 32109',
      status: 'completed',
      joinDate: new Date('2024-08-20'),
      pointsEarned: 100,
      avatar: null
    },
    {
      id: 3,
      name: 'Amit Kumar',
      phone: '+91 76543 21098',
      status: 'pending',
      joinDate: new Date('2024-09-01'),
      pointsEarned: 0,
      avatar: null
    },
    {
      id: 4,
      name: 'Sneha Patel',
      phone: '+91 65432 10987',
      status: 'completed',
      joinDate: new Date('2024-09-05'),
      pointsEarned: 100,
      avatar: null
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      phone: '+91 54321 09876',
      status: 'pending',
      joinDate: new Date('2024-09-10'),
      pointsEarned: 0,
      avatar: null
    }
  ]);

  const rewardTiers = [
    {
      id: 1,
      referrals: 1,
      points: 100,
      bonus: 'Welcome Badge',
      achieved: true
    },
    {
      id: 2,
      referrals: 5,
      points: 500,
      bonus: 'Referrer Badge + 100 bonus points',
      achieved: true
    },
    {
      id: 3,
      referrals: 10,
      points: 1000,
      bonus: 'Super Referrer Badge + Premium features',
      achieved: referralStats.successfulReferrals >= 10
    },
    {
      id: 4,
      referrals: 25,
      points: 2500,
      bonus: 'Community Leader Badge + Special recognition',
      achieved: false
    },
    {
      id: 5,
      referrals: 50,
      points: 5000,
      bonus: 'Elite Referrer + Exclusive rewards',
      achieved: false
    }
  ];

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'whatsapp',
      color: '#25D366'
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: 'sms',
      color: theme.colors.primary40
    },
    {
      id: 'email',
      name: 'Email',
      icon: 'envelope',
      color: theme.colors.info
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: 'copy',
      color: theme.colors.neutral40
    },
    {
      id: 'more',
      name: 'More',
      icon: 'share-alt',
      color: theme.colors.warning
    }
  ];

  const copyReferralCode = async () => {
    try {
      await Clipboard.setString(referralCode);
      Alert.alert('Copied!', 'Referral code copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy referral code');
    }
  };

  const generateReferralLink = () => {
    return `https://citizenapp.com/join?ref=${referralCode}`;
  };

  const shareReferral = async (option) => {
    const referralLink = generateReferralLink();
    const message = `Join me on Citizen App and help make our city better! Use my referral code: ${referralCode} or click: ${referralLink}`;

    switch (option.id) {
      case 'whatsapp':
        // In a real app, you would use a WhatsApp sharing library
        Alert.alert('WhatsApp', 'Opening WhatsApp...');
        break;
      case 'sms':
        // In a real app, you would use SMS sharing
        Alert.alert('SMS', 'Opening SMS app...');
        break;
      case 'email':
        // In a real app, you would use email sharing
        Alert.alert('Email', 'Opening email app...');
        break;
      case 'copy':
        try {
          await Clipboard.setString(referralLink);
          Alert.alert('Copied!', 'Referral link copied to clipboard');
        } catch (error) {
          Alert.alert('Error', 'Failed to copy referral link');
        }
        break;
      case 'more':
        try {
          await Share.share({
            message: message,
            url: referralLink,
            title: 'Join Citizen App'
          });
        } catch (error) {
          Alert.alert('Error', 'Failed to share');
        }
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      default: return theme.colors.neutral40;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Joined';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Referral Code Card */}
        <Card style={styles.referralCodeCard}>
          <View style={styles.codeHeader}>
            <FontAwesome5 name="gift" size={24} color={theme.colors.primary40} />
            <Text style={styles.codeTitle}>Your Referral Code</Text>
          </View>
          
          <View style={styles.codeContainer}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyReferralCode}>
              <FontAwesome5 name="copy" size={16} color={theme.colors.primary40} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.codeDescription}>
            Share your code with friends and earn 100 points for each successful referral!
          </Text>
        </Card>

        {/* Stats Overview */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Referral Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <FontAwesome5 name="users" size={20} color={theme.colors.primary40} />
              <Text style={styles.statNumber}>{referralStats.totalReferrals}</Text>
              <Text style={styles.statLabel}>Total Referrals</Text>
            </View>
            
            <View style={styles.statItem}>
              <FontAwesome5 name="check-circle" size={20} color={theme.colors.success} />
              <Text style={styles.statNumber}>{referralStats.successfulReferrals}</Text>
              <Text style={styles.statLabel}>Successful</Text>
            </View>
            
            <View style={styles.statItem}>
              <FontAwesome5 name="coins" size={20} color={theme.colors.warning} />
              <Text style={styles.statNumber}>{referralStats.totalEarnings}</Text>
              <Text style={styles.statLabel}>Points Earned</Text>
            </View>
            
            <View style={styles.statItem}>
              <FontAwesome5 name="trophy" size={20} color={theme.colors.error} />
              <Text style={styles.statNumber}>#{referralStats.rank}</Text>
              <Text style={styles.statLabel}>Your Rank</Text>
            </View>
          </View>
        </Card>

        {/* How it Works */}
        <Card style={styles.howItWorksCard}>
          <Text style={styles.sectionTitle}>How it Works</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Share your code</Text>
                <Text style={styles.stepDescription}>Send your referral code to friends via WhatsApp, SMS, or social media</Text>
              </View>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Friend joins</Text>
                <Text style={styles.stepDescription}>Your friend downloads the app and signs up using your referral code</Text>
              </View>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Both earn rewards</Text>
                <Text style={styles.stepDescription}>You get 100 points, your friend gets 50 bonus points to start!</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Reward Tiers */}
        <Card style={styles.rewardTiersCard}>
          <Text style={styles.sectionTitle}>Reward Tiers</Text>
          <Text style={styles.sectionDescription}>
            Unlock better rewards as you refer more friends
          </Text>
          
          {rewardTiers.map((tier, index) => (
            <View 
              key={tier.id} 
              style={[
                styles.tierItem,
                tier.achieved && styles.achievedTier
              ]}
            >
              <View style={styles.tierLeft}>
                <View style={[
                  styles.tierIcon,
                  { backgroundColor: tier.achieved ? theme.colors.success + '20' : theme.colors.neutral20 }
                ]}>
                  <FontAwesome5 
                    name={tier.achieved ? "check" : "lock"} 
                    size={16} 
                    color={tier.achieved ? theme.colors.success : theme.colors.neutral40} 
                  />
                </View>
                <View style={styles.tierContent}>
                  <Text style={[
                    styles.tierTitle,
                    !tier.achieved && styles.lockedText
                  ]}>
                    {tier.referrals} Referral{tier.referrals > 1 ? 's' : ''}
                  </Text>
                  <Text style={[
                    styles.tierReward,
                    !tier.achieved && styles.lockedText
                  ]}>
                    {tier.points} points + {tier.bonus}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tierProgress}>
                <Text style={styles.tierProgressText}>
                  {referralStats.successfulReferrals}/{tier.referrals}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Share Options */}
        <Card style={styles.shareCard}>
          <Text style={styles.sectionTitle}>Share with Friends</Text>
          
          <View style={styles.shareOptions}>
            {shareOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.shareOption}
                onPress={() => shareReferral(option)}
              >
                <View style={[
                  styles.shareIcon,
                  { backgroundColor: option.color + '20' }
                ]}>
                  <FontAwesome5 name={option.icon} size={20} color={option.color} />
                </View>
                <Text style={styles.shareOptionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Referral History */}
        <Card style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Referral History</Text>
            <Text style={styles.historyCount}>
              {referralHistory.length} referrals
            </Text>
          </View>
          
          {referralHistory.slice(0, 5).map((referral) => (
            <View key={referral.id} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <View style={styles.historyAvatar}>
                  <FontAwesome5 name="user" size={16} color={theme.colors.primary40} />
                </View>
                <View style={styles.historyContent}>
                  <Text style={styles.historyName}>{referral.name}</Text>
                  <Text style={styles.historyPhone}>{referral.phone}</Text>
                  <Text style={styles.historyDate}>
                    Joined {referral.joinDate.toLocaleDateString()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.historyRight}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(referral.status) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(referral.status) }
                  ]}>
                    {getStatusText(referral.status)}
                  </Text>
                </View>
                {referral.pointsEarned > 0 && (
                  <Text style={styles.pointsEarned}>
                    +{referral.pointsEarned} pts
                  </Text>
                )}
              </View>
            </View>
          ))}
          
          {referralHistory.length > 5 && (
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Referrals</Text>
              <FontAwesome5 name="chevron-right" size={14} color={theme.colors.primary40} />
            </TouchableOpacity>
          )}
        </Card>

        {/* Terms */}
        <Card style={styles.termsCard}>
          <View style={styles.termsHeader}>
            <FontAwesome5 name="info-circle" size={16} color={theme.colors.info} />
            <Text style={styles.termsTitle}>Terms & Conditions</Text>
          </View>
          
          <Text style={styles.termsText}>
            • Referral rewards are credited within 24 hours of successful sign-up
          </Text>
          <Text style={styles.termsText}>
            • Your friend must use your referral code during registration
          </Text>
          <Text style={styles.termsText}>
            • Points can be redeemed for app premium features and badges
          </Text>
          <Text style={styles.termsText}>
            • Referral program is subject to change without notice
          </Text>
          
          <TouchableOpacity 
            style={styles.viewTermsButton}
            onPress={() => Alert.alert('Terms', 'Full terms and conditions would be displayed here.')}
          >
            <Text style={styles.viewTermsText}>View Full Terms</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  // Referral Code Card
  referralCodeCard: {
    backgroundColor: theme.colors.primary40 + '10',
    borderWidth: 1,
    borderColor: theme.colors.primary40 + '30',
    marginBottom: theme.spacing.lg,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  codeTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  referralCode: {
    ...theme.typography.titleLarge,
    color: theme.colors.primary40,
    fontWeight: '700',
    letterSpacing: 2,
  },
  copyButton: {
    padding: theme.spacing.sm,
  },
  codeDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 18,
  },
  // Stats Card
  statsCard: {
    marginBottom: theme.spacing.lg,
  },
  statsTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statNumber: {
    ...theme.typography.titleLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  // How it Works
  howItWorksCard: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  sectionDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: theme.spacing.md,
  },
  stepContainer: {
    marginTop: theme.spacing.sm,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  stepNumberText: {
    ...theme.typography.bodyMedium,
    color: 'white',
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  stepDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    lineHeight: 18,
  },
  // Reward Tiers
  rewardTiersCard: {
    marginBottom: theme.spacing.lg,
  },
  tierItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  achievedTier: {
    backgroundColor: theme.colors.success + '05',
  },
  tierLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tierIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  tierContent: {
    flex: 1,
  },
  tierTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  tierReward: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  lockedText: {
    opacity: 0.5,
  },
  tierProgress: {
    alignItems: 'flex-end',
  },
  tierProgressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  // Share Options
  shareCard: {
    marginBottom: theme.spacing.lg,
  },
  shareOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareOption: {
    alignItems: 'center',
    width: '18%',
    marginBottom: theme.spacing.md,
  },
  shareIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  shareOptionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    textAlign: 'center',
  },
  // History
  historyCard: {
    marginBottom: theme.spacing.lg,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  historyCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  historyContent: {
    flex: 1,
  },
  historyName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  historyPhone: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: theme.spacing.xs,
  },
  historyDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.5,
    marginTop: theme.spacing.xs,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.xs,
  },
  statusText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  pointsEarned: {
    ...theme.typography.bodySmall,
    color: theme.colors.success,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  viewAllText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary40,
    marginRight: theme.spacing.xs,
  },
  // Terms
  termsCard: {
    backgroundColor: theme.colors.neutral10 + '50',
    marginBottom: theme.spacing.lg,
  },
  termsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  termsTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  termsText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.8,
    lineHeight: 18,
    marginBottom: theme.spacing.xs,
  },
  viewTermsButton: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
  },
  viewTermsText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    textDecorationLine: 'underline',
  },
});

export default ReferralScreen;

