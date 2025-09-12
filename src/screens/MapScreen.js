// src/screens/MapScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Alert,
  Dimensions 
} from 'react-native';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Mock map data
const mockMapData = [
  { id: '1', title: 'Broken Street Light', lat: 12.9716, lng: 77.5946, status: 'Pending' },
  { id: '2', title: 'Pothole', lat: 12.9698, lng: 77.6000, status: 'In Progress' },
  { id: '3', title: 'Water Leak', lat: 12.9750, lng: 77.5900, status: 'Resolved' },
];

const MapScreen = ({ navigation }) => {
  const theme = useTheme();
  const [complaints, setComplaints] = useState(mockMapData);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const styles = createStyles(theme);

  const handleComplaintPress = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return theme.colors.warning;
      case 'In Progress': return theme.colors.primary40;
      case 'Resolved': return theme.colors.success;
      default: return theme.colors.neutral60;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Complaint Map</Text>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={20} color={theme.colors.primary40} />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <FontAwesome5 name="map" size={80} color={theme.colors.neutral40} />
          <Text style={styles.mapPlaceholderText}>Interactive Map View</Text>
          <Text style={styles.mapSubtext}>
            Map integration will show real complaint locations
          </Text>
        </View>

        {/* Mock Map Markers */}
        {complaints.map((complaint, index) => (
          <TouchableOpacity
            key={complaint.id}
            style={[
              styles.marker,
              { 
                top: 150 + (index * 60),
                left: 50 + (index * 80),
                backgroundColor: getStatusColor(complaint.status)
              }
            ]}
            onPress={() => handleComplaintPress(complaint)}
          >
            <FontAwesome5 name="map-marker" size={20} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome5 name="crosshairs" size={20} color={theme.colors.primary40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome5 name="plus" size={20} color={theme.colors.primary40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome5 name="minus" size={20} color={theme.colors.primary40} />
        </TouchableOpacity>
      </View>

      {/* Selected Complaint Details */}
      {selectedComplaint && (
        <Card style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <View>
              <Text style={styles.detailTitle}>{selectedComplaint.title}</Text>
              <Text style={[styles.detailStatus, { color: getStatusColor(selectedComplaint.status) }]}>
                {selectedComplaint.status}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedComplaint(null)}>
              <FontAwesome5 name="times" size={20} color={theme.colors.neutral60} />
            </TouchableOpacity>
          </View>
          <Button
            title="View Details"
            size="small"
            onPress={() => Alert.alert('Feature Coming Soon', 'Detailed complaint view will be available soon!')}
          />
        </Card>
      )}

      {/* Legend */}
      <Card style={styles.legendCard}>
        <Text style={styles.legendTitle}>Status Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.colors.warning }]} />
            <Text style={styles.legendText}>Pending</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.colors.primary40 }]} />
            <Text style={styles.legendText}>In Progress</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.colors.success }]} />
            <Text style={styles.legendText}>Resolved</Text>
          </View>
        </View>
      </Card>
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
  title: {
    ...theme.typography.headlineSmall,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: theme.spacing.sm,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.large,
  },
  mapPlaceholderText: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  mapSubtext: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mapControls: {
    position: 'absolute',
    right: theme.spacing.lg,
    top: 120,
  },
  controlButton: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.background,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  detailCard: {
    position: 'absolute',
    bottom: 140,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  detailTitle: {
    ...theme.typography.titleMedium,
    color: theme.colors.text,
    fontWeight: '600',
  },
  detailStatus: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    marginTop: theme.spacing.xxs,
  },
  legendCard: {
    position: 'absolute',
    bottom: 20,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  legendTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
  },
});

export default MapScreen;