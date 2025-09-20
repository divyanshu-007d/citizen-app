// src/screens/home/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { FontAwesome5 } from '@expo/vector-icons';

// Mock data for complaints
const mockComplaints = [
  {
    id: '1',
    title: 'Broken Street Light',
    description: 'Street light not working on MG Road near bus stop',
    category: 'Infrastructure',
    status: 'Pending',
    upvotes: 23,
    location: 'MG Road, Bangalore',
    timeAgo: '2 hours ago',
    image: null,
    priority: 'Medium'
  },
  {
    id: '2',
    title: 'Pothole on Main Road',
    description: 'Large pothole causing traffic issues and vehicle damage',
    category: 'Roads',
    status: 'In Progress',
    upvotes: 45,
    location: 'Brigade Road, Bangalore',
    timeAgo: '5 hours ago',
    image: null,
    priority: 'High'
  },
  {
    id: '3',
    title: 'Garbage Not Collected',
    description: 'Garbage collection missed for 3 days in residential area',
    category: 'Sanitation',
    status: 'Resolved',
    upvotes: 12,
    location: 'Koramangala, Bangalore',
    timeAgo: '1 day ago',
    image: null,
    priority: 'Medium'
  },
  {
    id: '4',
    title: 'Water Leakage',
    description: 'Major water pipe leak causing road flooding',
    category: 'Water Supply',
    status: 'Pending',
    upvotes: 67,
    location: 'Indiranagar, Bangalore',
    timeAgo: '3 hours ago',
    image: null,
    priority: 'High'
  },
];

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Pending', 'In Progress', 'Resolved'];

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    // Simulate API call with more realistic delay
    setTimeout(() => {
      setComplaints(mockComplaints);
      setLoading(false);
    }, 800);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadComplaints();
    setRefreshing(false);
  };

  const handleUpvote = (complaintId) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, upvotes: complaint.upvotes + 1 }
          : complaint
      )
    );
  };

  const handleQuickReport = () => {
    Alert.alert(
      'Report Issue',
      'How would you like to report this civic issue?',
      [
        { 
          text: 'Take Photo', 
          onPress: () => navigation.navigate('CameraModal'),
          style: 'default'
        },
        { 
          text: 'Fill Form', 
          onPress: () => navigation.navigate('Report'),
          style: 'default'
        },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };

  const filteredComplaints = complaints.filter(complaint => 
    filter === 'All' || complaint.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return theme.colors.error;
      case 'In Progress': return theme.colors.primary;
      case 'Resolved': return theme.colors.tertiary;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return theme.colors.error;
      case 'Medium': return theme.colors.tertiary;
      case 'Low': return theme.colors.onSurfaceVariant;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const styles = createStyles(theme);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading text="Loading civic reports..." />
      </SafeAreaView>
    );
  }

  const renderComplaint = ({ item }) => (
    <TouchableOpacity style={styles.complaintCardContainer}>
      <BlurView intensity={60} tint="light" style={styles.complaintCardBlur}>
        <View style={styles.complaintCard}>
          {/* Header with Title and Status */}
          <View style={styles.complaintHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.complaintTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.locationRow}>
                <FontAwesome5 
                  name="map-marker-alt" 
                  size={theme.iconSizes.xs} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text style={styles.complaintLocation} numberOfLines={1}>
                  {item.location}
                </Text>
              </View>
            </View>
            
            <BlurView intensity={30} tint="light" style={styles.statusBadge}>
              <View style={[
                styles.statusDot, 
                { backgroundColor: getStatusColor(item.status) }
              ]} />
              <Text style={[
                styles.statusText, 
                { color: getStatusColor(item.status) }
              ]}>
                {item.status}
              </Text>
            </BlurView>
          </View>

          {/* Description */}
          <Text style={styles.complaintDescription} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Bottom Section - Tags and Actions */}
          <View style={styles.bottomSection}>
            <View style={styles.tagsRow}>
              <BlurView intensity={25} tint="light" style={styles.categoryTag}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </BlurView>
              <View style={styles.priorityBadge}>
                <View style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(item.priority) }
                ]} />
                <Text style={[
                  styles.priorityText, 
                  { color: getPriorityColor(item.priority) }
                ]}>
                  {item.priority}
                </Text>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity 
                style={styles.upvoteContainer}
                onPress={() => handleUpvote(item.id)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Upvote this complaint. Currently has ${item.upvotes} upvotes`}
              >
                <BlurView intensity={30} tint="light" style={styles.upvoteButton}>
                  <FontAwesome5 
                    name="chevron-up" 
                    size={theme.iconSizes.xs} 
                    color={theme.colors.primary} 
                  />
                  <Text style={styles.upvoteText}>{item.upvotes}</Text>
                </BlurView>
              </TouchableOpacity>
              
              <Text style={styles.timeText}>{item.timeAgo}</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          theme.colors.primary + '08',
          theme.colors.secondary + '05',
          theme.colors.background
        ]}
        locations={[0, 0.5, 1]}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Glassmorphism Header */}
          <BlurView intensity={80} tint="light" style={styles.headerBlur}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.welcomeText}>Welcome back!</Text>
                <Text style={styles.headerTitle}>Divyanshu</Text>
              </View>
              <TouchableOpacity 
                style={styles.profileButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Open profile"
              >
                <FontAwesome5 
                  name="user-circle" 
                  size={theme.iconSizes.lg} 
                  color={theme.colors.primary} 
                />
              </TouchableOpacity>
            </View>
          </BlurView>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[theme.colors.primary]}
                tintColor={theme.colors.primary}
              />
            }
            contentContainerStyle={styles.scrollContent}
          >
            {/* Filter Tabs with Glassmorphism */}
            <View style={styles.filterContainer}>
              {filters.map((filterOption) => (
                <TouchableOpacity
                  key={filterOption}
                  style={[
                    styles.filterTab,
                    filter === filterOption && styles.activeFilterTab
                  ]}
                  onPress={() => setFilter(filterOption)}
                  accessible={true}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: filter === filterOption }}
                >
                  <BlurView 
                    intensity={filter === filterOption ? 60 : 40} 
                    tint="light" 
                    style={styles.filterTabBlur}
                  >
                    <Text style={[
                      styles.filterText,
                      filter === filterOption && styles.activeFilterText
                    ]}>
                      {filterOption}
                    </Text>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>

            {/* Glassmorphism Stats Card */}
            <BlurView intensity={80} tint="light" style={styles.statsBlurCard}>
              <View style={styles.statsCardOverlay}>
                <Text style={styles.statsTitle}>Quick Overview</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>In Progress</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>156</Text>
                    <Text style={styles.statLabel}>Resolved</Text>
                  </View>
                </View>
              </View>
            </BlurView>

            {/* Reports Section */}
            <View style={styles.reportsSection}>
              <Text style={styles.sectionTitle}>
                Recent Reports ({filteredComplaints.length})
              </Text>
              
              {/* Reports List */}
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((item) => (
                  <View key={item.id}>
                    {renderComplaint({ item })}
                  </View>
                ))
              ) : (
                <BlurView intensity={60} tint="light" style={styles.emptyStateBlur}>
                  <View style={styles.emptyStateContent}>
                    <FontAwesome5 
                      name="clipboard-list" 
                      size={theme.iconSizes.xxl} 
                      color={theme.colors.onSurfaceVariant} 
                      style={styles.emptyIcon} 
                    />
                    <Text style={styles.emptyTitle}>No reports found</Text>
                    <Text style={styles.emptyMessage}>
                      No civic reports match your current filter. Try changing the filter or refresh to see new reports.
                    </Text>
                  </View>
                </BlurView>
              )}
            </View>
          </ScrollView>

          {/* Floating Action Button with Glassmorphism */}
          {/* <TouchableOpacity 
            style={styles.fabContainer} 
            onPress={handleQuickReport}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Create new civic report"
          >
            <BlurView intensity={80} tint="light" style={styles.fab}>
              <FontAwesome5 
                name="plus" 
                size={theme.iconSizes.md} 
                color={theme.colors.primary} 
              />
            </BlurView>
          </TouchableOpacity> */}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  // Glassmorphism Header
  headerBlur: {
    borderRadius: 0,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.xs,
  },
  headerTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  profileButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  // Filter tabs with glassmorphism
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.screenPadding,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterTab: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeFilterTab: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterTabBlur: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  filterText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
  activeFilterText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },

  // Scroll container and content
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxxl * 2, // Extra space for FAB
  },

  // Glassmorphism Stats card
  statsBlurCard: {
    marginHorizontal: theme.spacing.screenPadding,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsCardOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: theme.spacing.lg,
  },
  statsTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: theme.spacing.md,
  },
  statNumber: {
    ...theme.typography.headlineMedium,
    color: theme.colors.primary,
    fontWeight: '800',
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Reports section
  reportsSection: {
    paddingHorizontal: theme.spacing.screenPadding,
  },
  sectionTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
    fontWeight: '700',
  },

  // List section - kept for compatibility
  listContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenPadding,
  },
  listContent: {
    paddingBottom: theme.spacing.xxxl * 2, // Extra space for FAB
  },
  listSeparator: {
    height: theme.spacing.lg, // Increased spacing between cards
  },

  // Glassmorphism complaint cards - Improved and less congested
  complaintCardContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: theme.spacing.md,
  },
  complaintCardBlur: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  complaintCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: theme.spacing.xl,
  },
  
  // Header section - cleaner layout
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  titleSection: {
    flex: 1,
    paddingRight: theme.spacing.lg,
  },
  complaintTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.onSurface,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    lineHeight: 22,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  complaintLocation: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    flex: 1,
    fontWeight: '500',
  },
  
  // Status badge - simplified
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    minWidth: 80,
    justifyContent: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    ...theme.typography.labelSmall,
    fontWeight: '700',
    fontSize: 11,
  },

  // Description - more breathing room
  complaintDescription: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: theme.spacing.xl,
    fontWeight: '400',
  },

  // Bottom section - reorganized for better spacing
  bottomSection: {
    gap: theme.spacing.lg,
  },
  
  // Tags row - cleaner alignment
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTag: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  categoryText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    fontSize: 12,
  },
  
  // Priority badge - subtle design
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
  },
  priorityText: {
    ...theme.typography.labelSmall,
    fontWeight: '600',
    fontSize: 12,
  },

  // Actions row - better spacing
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upvoteContainer: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    gap: theme.spacing.sm,
    minWidth: 60,
    justifyContent: 'center',
  },
  upvoteText: {
    ...theme.typography.labelMedium,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  timeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },

  // Empty state with glassmorphism
  emptyStateBlur: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginTop: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyStateContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  emptyIcon: {
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  emptyMessage: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: theme.spacing.lg,
  },

  // Glassmorphism Floating Action Button
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.screenPadding,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  fab: {
    width: theme.componentTokens.fab.size,
    height: theme.componentTokens.fab.size,
    borderRadius: theme.componentTokens.fab.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

