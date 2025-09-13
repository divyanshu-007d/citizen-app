// src/screens/MapScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../design-system';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Mock map data with realistic coordinates (Delhi area)
const mockMapData = [
  { 
    id: '1', 
    title: 'Broken Street Light', 
    lat: 28.6139, 
    lng: 77.2090, 
    status: 'Pending',
    description: 'Street light not working since 3 days',
    category: 'Infrastructure',
    upvotes: 12
  },
  { 
    id: '2', 
    title: 'Large Pothole', 
    lat: 28.6129, 
    lng: 77.2294, 
    status: 'In Progress',
    description: 'Deep pothole causing traffic issues',
    category: 'Roads',
    upvotes: 24
  },
  { 
    id: '3', 
    title: 'Water Pipeline Leak', 
    lat: 28.6169, 
    lng: 77.2088, 
    status: 'Resolved',
    description: 'Fixed water leak on main road',
    category: 'Water Supply',
    upvotes: 8
  },
  { 
    id: '4', 
    title: 'Garbage Not Collected', 
    lat: 28.6149, 
    lng: 77.2197, 
    status: 'Pending',
    description: 'Garbage pile accumulating for a week',
    category: 'Sanitation',
    upvotes: 18
  }
];

// OpenStreetMap HTML for WebView
const getMapHTML = (complaints, selectedId) => {
  const markersScript = complaints.map(complaint => {
    const color = complaint.status === 'Resolved' ? '#4CAF50' : 
                  complaint.status === 'In Progress' ? '#2979ff' : '#FF9800';
    const selected = selectedId === complaint.id ? 'true' : 'false';
    
    return `
      var marker${complaint.id} = L.circleMarker([${complaint.lat}, ${complaint.lng}], {
        color: '${color}',
        fillColor: '${color}',
        fillOpacity: ${selected === 'true' ? '1.0' : '0.7'},
        radius: ${selected === 'true' ? '12' : '8'},
        weight: ${selected === 'true' ? '3' : '2'}
      }).addTo(map);
      
      marker${complaint.id}.bindPopup(\`
        <div style="font-family: system-ui, -apple-system, sans-serif;">
          <h4 style="margin: 0 0 8px 0; color: #333;">${complaint.title}</h4>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${complaint.category}</p>
          <p style="margin: 0 0 8px 0; font-size: 13px;">${complaint.description}</p>
          <span style="background: ${color}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">${complaint.status}</span>
          <span style="margin-left: 8px; color: #666; font-size: 11px;">👍 ${complaint.upvotes}</span>
        </div>
      \`);
      
      marker${complaint.id}.on('click', function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'markerClick',
          complaint: ${JSON.stringify(complaint)}
        }));
      });
    `;
  }).join('\n');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
        .leaflet-popup-content { margin: 8px 12px; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([28.6139, 77.2090], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);
        
        ${markersScript}
        
        // Handle map clicks
        map.on('click', function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'mapClick'
          }));
        });
      </script>
    </body>
    </html>
  `;
};

const MapScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [complaints, setComplaints] = useState(mockMapData);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [mapView, setMapView] = useState('all'); // all, pending, resolved
  const [showLegend, setShowLegend] = useState(true);

  const styles = createStyles(theme);

  const handleComplaintPress = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'markerClick') {
        handleComplaintPress(data.complaint);
      } else if (data.type === 'mapClick') {
        setSelectedComplaint(null);
      }
    } catch (error) {
      console.log('Error parsing WebView message:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return theme.colors.error;
      case 'In Progress': return theme.colors.primary;
      case 'Resolved': return theme.colors.tertiary;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (mapView === 'pending') return complaint.status === 'Pending';
    if (mapView === 'resolved') return complaint.status === 'Resolved';
    return true;
  });

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
              <View>
                <Text style={styles.title}>Complaint Map</Text>
                <Text style={styles.subtitle}>{filteredComplaints.length} active reports</Text>
              </View>
              <View style={styles.headerControls}>
                <TouchableOpacity 
                  style={styles.headerButton}
                  onPress={() => setShowLegend(!showLegend)}
                >
                  <BlurView intensity={30} tint="light" style={styles.headerButtonBlur}>
                    <FontAwesome5 name="info" size={16} color={theme.colors.primary} />
                  </BlurView>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <BlurView intensity={30} tint="light" style={styles.headerButtonBlur}>
                    <FontAwesome5 name="filter" size={16} color={theme.colors.primary} />
                  </BlurView>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            {['all', 'pending', 'resolved'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  mapView === filter && styles.activeFilterTab
                ]}
                onPress={() => setMapView(filter)}
              >
                <BlurView 
                  intensity={mapView === filter ? 60 : 40} 
                  tint="light" 
                  style={styles.filterTabBlur}
                >
                  <Text style={[
                    styles.filterText,
                    mapView === filter && styles.activeFilterText
                  ]}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>

          {/* OpenStreetMap WebView */}
          <View style={styles.mapContainer}>
            <WebView
              source={{ 
                html: getMapHTML(filteredComplaints, selectedComplaint?.id) 
              }}
              style={styles.webView}
              onMessage={handleWebViewMessage}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={Platform.OS === 'android'}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />

            {/* Glassmorphism Map Controls */}
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.controlContainer}>
                <BlurView intensity={60} tint="light" style={styles.controlButton}>
                  <FontAwesome5 name="crosshairs" size={18} color={theme.colors.primary} />
                </BlurView>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlContainer}>
                <BlurView intensity={60} tint="light" style={styles.controlButton}>
                  <FontAwesome5 name="search-plus" size={18} color={theme.colors.primary} />
                </BlurView>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlContainer}>
                <BlurView intensity={60} tint="light" style={styles.controlButton}>
                  <FontAwesome5 name="search-minus" size={18} color={theme.colors.primary} />
                </BlurView>
              </TouchableOpacity>
            </View>
          </View>

          {/* Selected Complaint Details */}
          {selectedComplaint && (
            <BlurView intensity={80} tint="light" style={styles.detailCardBlur}>
              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailTitle}>{selectedComplaint.title}</Text>
                    <Text style={styles.detailCategory}>{selectedComplaint.category}</Text>
                    <Text style={styles.detailDescription}>{selectedComplaint.description}</Text>
                    
                    <View style={styles.detailMetrics}>
                      <BlurView intensity={30} tint="light" style={styles.statusBadge}>
                        <View style={[
                          styles.statusDot, 
                          { backgroundColor: getStatusColor(selectedComplaint.status) }
                        ]} />
                        <Text style={[
                          styles.statusText, 
                          { color: getStatusColor(selectedComplaint.status) }
                        ]}>
                          {selectedComplaint.status}
                        </Text>
                      </BlurView>
                      
                      <View style={styles.upvoteContainer}>
                        <FontAwesome5 name="thumbs-up" size={12} color={theme.colors.primary} />
                        <Text style={styles.upvoteText}>{selectedComplaint.upvotes}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    onPress={() => setSelectedComplaint(null)}
                    style={styles.closeButton}
                  >
                    <BlurView intensity={30} tint="light" style={styles.closeButtonBlur}>
                      <FontAwesome5 name="times" size={16} color={theme.colors.onSurfaceVariant} />
                    </BlurView>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          )}

          {/* Legend */}
          {showLegend && (
            <BlurView intensity={80} tint="light" style={styles.legendCardBlur}>
              <View style={styles.legendCard}>
                <Text style={styles.legendTitle}>Status Legend</Text>
                <View style={styles.legendItems}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.error }]} />
                    <Text style={styles.legendText}>Pending</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                    <Text style={styles.legendText}>In Progress</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.tertiary }]} />
                    <Text style={styles.legendText}>Resolved</Text>
                  </View>
                </View>
              </View>
            </BlurView>
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary + '10',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface + '80',
  },
  title: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
  },
  headerControls: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  headerButton: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  headerButtonBlur: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
  },
  // Filter Tabs
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterTab: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    flex: 1,
  },
  activeFilterTab: {
    transform: [{ scale: 1.02 }],
  },
  filterTabBlur: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface + '60',
    alignItems: 'center',
  },
  filterText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  activeFilterText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  // Map Container
  mapContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  // Glassmorphism Map Controls
  mapControls: {
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  controlContainer: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  controlButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface + '80',
  },
  // Selected Complaint Details
  detailCardBlur: {
    position: 'absolute',
    bottom: 100,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  detailCard: {
    backgroundColor: theme.colors.surface + '90',
    padding: theme.spacing.lg,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  detailTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  detailCategory: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  detailDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  detailMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant + '40',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  upvoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  upvoteText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '600',
  },
  closeButton: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  closeButtonBlur: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant + '60',
  },
  // Legend
  legendCardBlur: {
    position: 'absolute',
    bottom: 20,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  legendCard: {
    backgroundColor: theme.colors.surface + '90',
    padding: theme.spacing.md,
  },
  legendTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
});

export default MapScreen;

