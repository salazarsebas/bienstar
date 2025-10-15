import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Campaign = {
  id: string;
  name: string;
  goal: number; // in USD
  location: string;
  collected: number; // in USD
};

const DATA: Campaign[] = [
  { id: '1', name: 'Forest Revival', goal: 10000, location: 'Oregon, USA', collected: 6420 },
  { id: '2', name: 'Urban Green', goal: 7500, location: 'Bogotá, COL', collected: 3150 },
  { id: '3', name: 'Mangrove Roots', goal: 12000, location: 'Tulum, MX', collected: 8900 },
  { id: '4', name: 'Andes Releaf', goal: 9000, location: 'Cusco, PER', collected: 2380 },
  { id: '5', name: 'Savanna Bloom', goal: 5000, location: 'Arusha, TZA', collected: 4120 },
  { id: '6', name: 'Patagonia Pines', goal: 11000, location: 'Santa Cruz, ARG', collected: 9450 },
];

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/backgroundHome.png')} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.dim} />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => <CampaignCard data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function formatUSD(value: number): string {
  return `$ ${value.toLocaleString('en-US')}`;
}

function CampaignCard({ data }: { data: Campaign }) {
  const progress = Math.min(1, data.collected / data.goal);
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>{data.name}</Text>
      <View style={styles.row}><Text style={styles.label}>Goal</Text><Text style={styles.value}>{formatUSD(data.goal)}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Location</Text><Text style={styles.value}>{data.location}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Collected</Text><Text style={[styles.value, styles.collected]}>{formatUSD(data.collected)}</Text></View>
      {/* progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  dim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  content: { padding: 16, gap: 12 },
  card: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  title: { color: '#ecf4ea', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  label: { color: '#cfe6d3', fontSize: 12 },
  value: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
  collected: { color: '#34C759' },
  progressTrack: {
    height: 8,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
  },
});


