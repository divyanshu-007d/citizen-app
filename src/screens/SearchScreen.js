// src/screens/SearchScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import { FontAwesome5 } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, complaints, users, locations
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'Road repair',
    'Water supply',
    'Street lights',
    'Garbage collection'
  ]);
  const [popularSearches] = useState([
    'Pothole repair',
    'Water shortage',
    'Electricity issue',
    'Noise pollution',
    'Traffic signal',
    'Park maintenance'
  ]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for search results
  const mockComplaints = [
    {
      id: 1,
      title: 'Road repair needed urgently',
      description: 'Deep potholes on Main Street causing traffic issues',
      location: 'Main Street, Downtown',
      status: 'In Progress',
      upvotes: 45,
      author: 'Rahul Sharma',
      timeAgo: '2 hours ago',
      type: 'complaint'
    },
    {
      id: 2,
      title: 'Street light not working',
      description: 'Street light pole #234 has been off for 3 days',
      location: 'Park Avenue, Sector 15',
      status: 'Under Review',
      upvotes: 23,
      author: 'Priya Singh',
      timeAgo: '1 day ago',
      type: 'complaint'
    },
    {
      id: 3,
      title: 'Water supply disruption',
      description: 'No water supply for the past 2 days in our locality',
      location: 'Green Valley, Block A',
      status: 'Resolved',
      upvotes: 67,
      author: 'Amit Kumar',
      timeAgo: '3 days ago',
      type: 'complaint'
    }
  ];

  const mockUsers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: null,
      complaintsCount: 15,
      badge: 'Active Citizen',
      location: 'Downtown',
      type: 'user'
    },
    {
      id: 2,
      name: 'Priya Singh',
      avatar: null,
      complaintsCount: 23,
      badge: 'Community Helper',
      location: 'Sector 15',
      type: 'user'
    }
  ];

  const mockLocations = [
    {
      id: 1,
      name: 'Main Street, Downtown',
      complaintsCount: 12,
      recentActivity: '2 hours ago',
      type: 'location'
    },
    {
      id: 2,
      name: 'Park Avenue, Sector 15',
      complaintsCount: 8,
      recentActivity: '5 hours ago',
      type: 'location'
    }
  ];

  const filters = [
    { key: 'all', label: 'All', icon: 'search' },
    { key: 'complaints', label: 'Complaints', icon: 'file-alt' },
    { key: 'users', label: 'Users', icon: 'users' },
    { key: 'locations', label: 'Locations', icon: 'map-marker-alt' }
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      performSearch();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, activeFilter]);

  const performSearch = () => {
    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      let results = [];
      
      if (activeFilter === 'all' || activeFilter === 'complaints') {
        results = [...results, ...mockComplaints.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
        )];
      }
      
      if (activeFilter === 'all' || activeFilter === 'users') {
        results = [...results, ...mockUsers.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
        )];
      }
      
      if (activeFilter === 'all' || activeFilter === 'locations') {
        results = [...results, ...mockLocations.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )];
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const addToRecentSearches = (query) => {
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      addToRecentSearches(query.trim());
      setSearchQuery(query.trim());
    }
  };

  const clearRecentSearches = () => {
    Alert.alert(
      'Clear Recent Searches',
      'Are you sure you want to clear all recent searches?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => setRecentSearches([]) }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return theme.colors.success;
      case 'in progress': return theme.colors.warning;
      case 'under review': return theme.colors.info;
      default: return theme.colors.neutral40;
    }
  };

  const renderSearchResult = ({ item }) => {
    if (item.type === 'complaint') {
      return (
        <TouchableOpacity
          style={styles.resultCard}
          onPress={() => navigation.navigate('ComplaintDetails', { complaintId: item.id })}
        >
          <View style={styles.resultHeader}>
            <View style={styles.resultType}>
              <FontAwesome5 name="file-alt" size={14} color={theme.colors.primary40} />
              <Text style={styles.resultTypeText}>Complaint</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
          </View>
          
          <Text style={styles.resultTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.resultDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.resultFooter}>
            <View style={styles.resultLocation}>
              <FontAwesome5 name="map-marker-alt" size={12} color={theme.colors.neutral40} />
              <Text style={styles.resultLocationText}>{item.location}</Text>
            </View>
            <View style={styles.resultMeta}>
              <View style={styles.upvotes}>
                <FontAwesome5 name="arrow-up" size={12} color={theme.colors.success} />
                <Text style={styles.upvoteCount}>{item.upvotes}</Text>
              </View>
              <Text style={styles.resultTime}>{item.timeAgo}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (item.type === 'user') {
      return (
        <TouchableOpacity style={styles.resultCard}>
          <View style={styles.userResult}>
            <View style={styles.userAvatar}>
              <FontAwesome5 name="user" size={20} color={theme.colors.primary40} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userBadge}>{item.badge}</Text>
              <View style={styles.userStats}>
                <Text style={styles.userStat}>{item.complaintsCount} complaints</Text>
                <Text style={styles.userLocation}>{item.location}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    } else if (item.type === 'location') {
      return (
        <TouchableOpacity 
          style={styles.resultCard}
          onPress={() => navigation.navigate('Map', { location: item.name })}
        >
          <View style={styles.locationResult}>
            <View style={styles.locationIcon}>
              <FontAwesome5 name="map-marker-alt" size={20} color={theme.colors.primary40} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationStats}>
                {item.complaintsCount} active complaints • Last activity {item.recentActivity}
              </Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color={theme.colors.neutral40} />
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderEmptyState = () => {
    if (searchQuery && !isSearching && searchResults.length === 0) {
      return (
        <View style={styles.emptyState}>
          <FontAwesome5 name="search" size={48} color={theme.colors.neutral40} />
          <Text style={styles.emptyStateTitle}>No results found</Text>
          <Text style={styles.emptyStateText}>
            Try adjusting your search terms or filters
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderDefaultContent = () => (
    <ScrollView style={styles.defaultContent}>
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={clearRecentSearches}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagContainer}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.searchTag}
                onPress={() => handleSearch(search)}
              >
                <FontAwesome5 name="clock" size={12} color={theme.colors.neutral40} />
                <Text style={styles.tagText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Popular Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.tagContainer}>
          {popularSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.searchTag, styles.popularTag]}
              onPress={() => handleSearch(search)}
            >
              <FontAwesome5 name="fire" size={12} color={theme.colors.warning} />
              <Text style={styles.tagText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Filters</Text>
        <View style={styles.quickFilters}>
          <TouchableOpacity style={styles.quickFilter}>
            <FontAwesome5 name="exclamation-circle" size={16} color={theme.colors.error} />
            <Text style={styles.quickFilterText}>Urgent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilter}>
            <FontAwesome5 name="map-marker-alt" size={16} color={theme.colors.primary40} />
            <Text style={styles.quickFilterText}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilter}>
            <FontAwesome5 name="check-circle" size={16} color={theme.colors.success} />
            <Text style={styles.quickFilterText}>Resolved</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color={theme.colors.neutral40} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search complaints, users, locations..."
            placeholderTextColor={theme.colors.neutral40}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch()}
            autoFocus
          />
          {searchQuery && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome5 name="times-circle" size={16} color={theme.colors.neutral40} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              activeFilter === filter.key && styles.activeFilterTab
            ]}
            onPress={() => setActiveFilter(filter.key)}
          >
            <FontAwesome5 
              name={filter.icon} 
              size={14} 
              color={activeFilter === filter.key ? theme.colors.primary40 : theme.colors.neutral40} 
            />
            <Text style={[
              styles.filterText,
              activeFilter === filter.key && styles.activeFilterText
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <View style={styles.content}>
        {isSearching ? (
          <View style={styles.loadingState}>
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : searchQuery ? (
          searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item) => `${item.type}-${item.id}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
            />
          ) : (
            renderEmptyState()
          )
        ) : (
          renderDefaultContent()
        )}
      </View>
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
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary40 + '20',
    borderColor: theme.colors.primary40,
  },
  filterText: {
    ...theme.typography.bodySmall,
    color: theme.colors.neutral40,
    marginLeft: theme.spacing.xs,
  },
  activeFilterText: {
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  // Default Content
  defaultContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  clearButton: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  popularTag: {
    backgroundColor: theme.colors.warning + '10',
    borderColor: theme.colors.warning + '30',
  },
  tagText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  quickFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickFilter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickFilterText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  // Search Results
  resultsList: {
    padding: theme.spacing.lg,
  },
  resultCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  resultType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTypeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    marginLeft: theme.spacing.xs,
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  statusText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  resultTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  resultDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultLocationText: {
    ...theme.typography.bodySmall,
    color: theme.colors.neutral40,
    marginLeft: theme.spacing.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvotes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  upvoteCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.success,
    marginLeft: theme.spacing.xs,
  },
  resultTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.neutral40,
  },
  // User Results
  userResult: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
  },
  userBadge: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    marginVertical: theme.spacing.xs,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStat: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
    marginRight: theme.spacing.md,
  },
  userLocation: {
    ...theme.typography.bodySmall,
    color: theme.colors.neutral40,
  },
  followButton: {
    backgroundColor: theme.colors.primary40 + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
  },
  followButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary40,
    fontWeight: '600',
  },
  // Location Results
  locationResult: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary40 + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  locationStats: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    opacity: 0.7,
  },
  // States
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default SearchScreen;

