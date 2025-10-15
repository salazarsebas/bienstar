import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header blob */}
      <View style={styles.header} />

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.avatarWrap}>
          <Image source={require('@/assets/images/logo.png')} style={styles.avatar} contentFit="cover" />
        </View>
        <Text style={styles.name}>Ricardo Joseph</Text>
        <View style={styles.verifiedRow}>
          <Text style={styles.email}>ricardojoseph@gmail.com</Text>
          <Ionicons name="checkmark-circle" size={16} color="#34C759" style={{ marginLeft: 6 }} />
        </View>

        {/* Badges row (placeholders) */}
        <View style={styles.badges}>
          {[0,1,2,3].map((i) => (
            <View key={i} style={styles.badge} />
          ))}
        </View>
      </View>

      {/* Balance card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceBig}>$ 0.00</Text>
        <View style={styles.walletRow}>
          <Text style={styles.walletText}>0xA1B2...F3C4</Text>
          <TouchableOpacity style={styles.copyBtn} onPress={() => Clipboard.setStringAsync('0xA1B2...F3C4')}>
            <Ionicons name="copy-outline" size={16} color="#1f3a2d" />
          </TouchableOpacity>
        </View>
      </View>

      {/* General section */}
      <Text style={styles.sectionTitle}>GENERAL</Text>
      <View style={styles.list}>
        <ListItem icon="settings-outline" title="Profile Settings" subtitle="Update and modify your profile" />
        <ListItem icon="lock-closed-outline" title="Privacy" subtitle="Change your password" />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ListItem({ icon, title, subtitle }: { icon: React.ComponentProps<typeof Ionicons>['name']; title: string; subtitle: string; }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemIconWrap}>
        <Ionicons name={icon} size={18} color="#1f3a2d" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#1f3a2d" />
    </View>
  );
}

const styles = StyleSheet.create({
  // palette
  // #dad7cd  #a3b18a  #588157  #3a5a40  #344e41  + iOS green #34C759
  container: { flex: 1, backgroundColor: '#dad7cd' },
  header: {
    height: 140,
    backgroundColor: '#588157',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 12,
    justifyContent: 'flex-end',
  },
  headerTitle: { color: '#ffffff' },
  headerIcon: { },

  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: -32,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  avatarWrap: {
    alignSelf: 'center',
    width: 78,
    height: 78,
    borderRadius: 16,
    backgroundColor: '#a3b18a',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -46,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  avatar: { width: 62, height: 62, borderRadius: 12 },
  name: { textAlign: 'center', color: '#344e41', fontSize: 18, fontWeight: '800', marginTop: 8 },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  email: { color: '#65706a', fontSize: 13 },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef3ec',
    borderRadius: 12,
    padding: 10,
    marginTop: 14,
  },
  badge: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#a3b18a' },

  balanceCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  balanceLabel: { color: '#6f7b74', fontSize: 12, fontWeight: '700' },
  balanceBig: { color: '#344e41', fontSize: 28, fontWeight: '900', marginTop: 4 },
  walletRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  walletText: { color: '#1f3a2d', fontSize: 13, fontWeight: '700' },
  copyBtn: { backgroundColor: '#a3b18a', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  sectionTitle: { color: '#6f7b74', fontSize: 12, fontWeight: '800', marginTop: 18, marginHorizontal: 16 },
  list: { marginTop: 10, gap: 10, paddingHorizontal: 16 },
  item: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#ffffff', borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  itemIconWrap: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#a3b18a' },
  itemTitle: { color: '#344e41', fontSize: 16, fontWeight: '800' },
  itemSubtitle: { color: '#6f7b74', fontSize: 12 },
  logoutBtn: {
    marginTop: 16,
    backgroundColor: 'rgba(255,59,48,0.15)',
    borderColor: 'rgba(255,59,48,0.35)',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '800' },
});


