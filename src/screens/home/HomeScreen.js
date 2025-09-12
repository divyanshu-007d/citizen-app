// src/screens/home/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  RefreshControl,
  TouchableOpacity,
  Alert 
} from 'react-native';
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
    // Simulate API call
    setTimeout(() => {
      setComplaints(mockComplaints);
      setLoading(false);
    }, 1000);
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
      'Quick Report',
      'Choose how you want to report:',
      [
        { text: 'Camera', onPress: () => navigation.navigate('CameraModal') },
        { text: 'Form', onPress: () => navigation.navigate('Report') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const filteredComplaints = complaints.filter(complaint => 
    filter === 'All' || complaint.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return theme.colors.warning;
      case 'In Progress': return theme.colors.primary40;
      case 'Resolved': return theme.colors.success;
      default: return theme.colors.neutral60;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return theme.colors.error;
      case 'Medium': return theme.colors.warning;
      case 'Low': return theme.colors.success;
      default: return theme.colors.neutral60;
    }
  };

  const styles = createStyles(theme);

  if (loading) {
    return <Loading text="Loading complaints..." />;
  }

  const renderComplaint = ({ item }) => (
    <Card style={styles.complaintCard}>
      <View style={styles.complaintHeader}>
        <View style={styles.complaintMeta}>
          <Text style={styles.complaintTitle}>{item.title}</Text>
          <Text style={styles.complaintLocation}>{item.location}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.complaintDescription}>{item.description}</Text>

      <View style={styles.complaintFooter}>
        <View style={styles.complaintTags}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={[styles.priorityTag, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
            <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
              {item.priority}
            </Text>
          </View>
        </View>

        <View style={styles.complaintActions}>
          <TouchableOpacity 
            style={styles.upvoteButton}
            onPress={() => handleUpvote(item.id)}
          >
            <FontAwesome5 name="arrow-up" size={16} color={theme.colors.primary40} />
            <Text style={styles.upvoteText}>{item.upvotes}</Text>
          </TouchableOpacity>
          
          <Text style={styles.timeText}>{item.timeAgo}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.headerTitle}>Community Complaints</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <FontAwesome5 name="user-circle" size={32} color={theme.colors.primary40} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filters.map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterTab,
              filter === filterOption && styles.activeFilterTab
            ]}
            onPress={() => setFilter(filterOption)}
          >
            <Text style={[
              styles.filterText,
              filter === filterOption && styles.activeFilterText
            ]}>
              {filterOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Stats */}
      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>
      </Card>

      {/* Complaints List */}
      <FlatList
        data={filteredComplaints}
        renderItem={renderComplaint}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleQuickReport}>
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  welcomeText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
  },
  headerTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'transparent',
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary40,
  },
  filterText: {
    ...theme.typography.labelMedium,
    color: theme.colors.text,
  },
  activeFilterText: {
    color: theme.colors.onPrimary,
  },
  statsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...theme.typography.headlineMedium,
    color: theme.colors.primary40,
    fontWeight: 'bold',
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 80, // Space for FAB
  },
  complaintCard: {
    marginBottom: theme.spacing.md,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  complaintMeta: {
    flex: 1,
  },
  complaintTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xxs,
  },
  complaintLocation: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    ...theme.typography.labelSmall,
    fontWeight: '600',
  },
  complaintDescription: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  complaintFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  complaintTags: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryTag: {
    backgroundColor: theme.colors.primary40 + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xxs,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.xs,
  },
  categoryText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  priorityTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xxs,
    borderRadius: theme.borderRadius.small,
  },
  priorityText: {
    ...theme.typography.labelSmall,
    fontWeight: '600',
  },
  complaintActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  upvoteText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary40,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  timeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;
