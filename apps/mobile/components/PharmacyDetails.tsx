import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Phone, Navigation, AlertTriangle, CheckCircle } from 'lucide-react-native';

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

interface PharmacyDetailsProps {
  pharmacy: Pharmacy | null;
  onClose: () => void;
  onConfirmOpen: (id: string) => void;
  onReportError: (id: string) => void;
}

const PharmacyDetails = ({
  pharmacy,
  onClose,
  onConfirmOpen,
  onReportError,
}: PharmacyDetailsProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  if (!pharmacy) return null;

  const handleCall = () => {
    if (pharmacy.phone) {
      Linking.openURL(`tel:${pharmacy.phone}`);
    }
  };

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
    Linking.openURL(url);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>{pharmacy.name}</Text>
        <Text style={styles.address}>{pharmacy.address}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {pharmacy.isOnDuty ? 'De Garde' : pharmacy.is24h ? 'Ouvert 24h/24' : 'Horaires standards'}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Phone size={24} color="#3b82f6" />
            <Text style={styles.actionLabel}>Appeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleNavigate}>
            <Navigation size={24} color="#3b82f6" />
            <Text style={styles.actionLabel}>Itinéraire</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reliabilityContainer}>
          <TouchableOpacity
            style={[styles.reliabilityButton, styles.confirmButton]}
            onPress={() => onConfirmOpen(pharmacy.id)}
          >
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.reliabilityText}>Je confirme qu'elle est ouverte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.reliabilityButton, styles.reportButton]}
            onPress={() => onReportError(pharmacy.id)}
          >
            <AlertTriangle size={20} color="#ef4444" />
            <Text style={[styles.reliabilityText, { color: '#ef4444' }]}>Signaler une erreur</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 15,
    textAlign: 'center',
  },
  statusBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: 5,
    color: '#3b82f6',
    fontWeight: '500',
  },
  reliabilityContainer: {
    width: '100%',
    gap: 10,
  },
  reliabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  confirmButton: {
    backgroundColor: '#22c55e',
  },
  reportButton: {
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  reliabilityText: {
    fontWeight: '600',
    color: '#fff',
  },
});

export default PharmacyDetails;
