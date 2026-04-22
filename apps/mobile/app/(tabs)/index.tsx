import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Map from '@/components/Map';
import PharmacyDetails from '@/components/PharmacyDetails';
import { Filter } from 'lucide-react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [filterOnDuty, setFilterOnDuty] = useState(false);

  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000';

  const { data: pharmacies = [], isLoading } = useQuery<Pharmacy[]>({
    queryKey: ['pharmacies'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/pharmacies/search?lat=-4.325&lng=15.310&radius=10000`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });

  const confirmMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pharmacyId: id, type: 'confirm_open' }),
      });
      if (!res.ok) throw new Error('Failed to confirm');
      return res.json();
    },
    onSuccess: () => alert('Merci pour votre confirmation !'),
  });

  const reportMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pharmacyId: id, type: 'report_error' }),
      });
      if (!res.ok) throw new Error('Failed to report');
      return res.json();
    },
    onSuccess: () => alert('Signalement envoyé, merci !'),
  });

  const filteredPharmacies = filterOnDuty
    ? pharmacies.filter(p => p.isOnDuty)
    : pharmacies;

  return (
    <View style={styles.container}>
      <Map
        pharmacies={filteredPharmacies}
        onSelectPharmacy={(p: Pharmacy) => setSelectedPharmacy(p)}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterOnDuty && styles.filterButtonActive]}
          onPress={() => setFilterOnDuty(!filterOnDuty)}
        >
          <Filter size={20} color={filterOnDuty ? '#fff' : '#1e3a8a'} />
          <Text style={[styles.filterText, filterOnDuty && styles.filterTextActive]}>
            De Garde Uniquement
          </Text>
        </TouchableOpacity>
      </View>

      {selectedPharmacy && (
        <PharmacyDetails
          pharmacy={selectedPharmacy}
          onClose={() => setSelectedPharmacy(null)}
          onConfirmOpen={(id) => confirmMutation.mutate(id)}
          onReportError={(id) => reportMutation.mutate(id)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: '#1e3a8a',
  },
  filterText: {
    color: '#1e3a8a',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
});
