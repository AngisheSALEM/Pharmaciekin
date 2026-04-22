import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';

// Use EXPO_PUBLIC_ prefix for Expo to pick it up from .env
MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || '');

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
  isOnDuty: boolean;
  is24h: boolean;
}

interface MapProps {
  pharmacies: Pharmacy[];
  onSelectPharmacy: (pharmacy: Pharmacy) => void;
}

const Map = ({ pharmacies, onSelectPharmacy }: MapProps) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Fallback to Kinshasa center
        setUserLocation([15.310, -4.325]);
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation([location.coords.longitude, location.coords.latitude]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} logoEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={userLocation || [15.310, -4.325]}
        />

        {userLocation && (
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={userLocation}
          >
            <View style={styles.userMarker} />
          </MapboxGL.PointAnnotation>
        )}

        {pharmacies.map((pharmacy) => (
          <MapboxGL.PointAnnotation
            key={pharmacy.id}
            id={pharmacy.id}
            coordinate={[pharmacy.longitude, pharmacy.latitude]}
            onSelected={() => onSelectPharmacy(pharmacy)}
          >
            <View
              style={[
                styles.marker,
                {
                  backgroundColor: pharmacy.isOnDuty
                    ? '#f97316' // Orange
                    : pharmacy.is24h
                    ? '#22c55e' // Green
                    : '#94a3b8', // Gray
                },
              ]}
            />
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userMarker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Map;
