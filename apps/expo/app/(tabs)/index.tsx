import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [btcVisible, setBtcVisible] = useState(false);
  const [btcAddress, setBtcAddress] = useState('bc1q...');
  const [btcBalance, setBtcBalance] = useState('0.00');
  const [btcAmount, setBtcAmount] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/backgroundHome.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.dim} />

      {/* Top bar with hearts and balance */}
      <View style={styles.topRow}>
        <View style={styles.leftCol}>
          <View style={styles.heartsBox}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Ionicons key={i} name="heart" size={16} color={i < 3 ? '#34C759' : '#2a2a2a'} style={styles.heart} />
            ))}
          </View>
          <Pressable style={styles.btcButton} onPress={() => setBtcVisible(true)}>
            <Ionicons name="logo-bitcoin" size={18} color="#1f3a2d" />
          </Pressable>
        </View>

        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceValue}>$ 0.00</Text>
        </View>
      </View>

      {/* Center plant */}
      <View style={styles.center}>
        <Image source={require('@/assets/images/plant.png')} style={styles.plant} contentFit="contain" />
      </View>

      {/* Bitcoin modal */}
      <Modal transparent animationType="fade" visible={btcVisible} onRequestClose={() => setBtcVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Bitcoin</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput style={styles.input} value={btcAddress} onChangeText={setBtcAddress} placeholder="Address" placeholderTextColor="#7a8" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Balance</Text>
              <TextInput style={styles.input} value={btcBalance} onChangeText={setBtcBalance} placeholder="0.00" placeholderTextColor="#7a8" keyboardType="decimal-pad" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cantidad</Text>
              <TextInput style={styles.input} value={btcAmount} onChangeText={setBtcAmount} placeholder="0.00" placeholderTextColor="#7a8" keyboardType="decimal-pad" />
            </View>
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setBtcVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, styles.acceptBtn]} onPress={() => setBtcVisible(false)}>
                <Text style={styles.acceptText}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plant: {
    width: 260,
    height: 260,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  leftCol: { alignItems: 'flex-start', position: 'relative' },
  heartsBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  heart: {
    marginHorizontal: 4,
  },
  btcButton: {
    position: 'absolute',
    top: 80,
    left: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  balanceBox: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  balanceLabel: {
    color: '#e7f0ea',
    fontSize: 12,
    opacity: 0.9,
  },
  balanceValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 16, padding: 16 },
  modalTitle: { color: '#1f3a2d', fontSize: 18, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  inputGroup: { marginTop: 8 },
  inputLabel: { color: '#244b30', fontSize: 12, marginBottom: 4 },
  input: { height: 44, borderRadius: 10, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)', color: '#1f3a2d' },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  modalBtn: { flex: 1, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  cancelBtn: { backgroundColor: 'rgba(0,0,0,0.1)', borderColor: 'rgba(0,0,0,0.15)' },
  acceptBtn: { backgroundColor: '#34C759', borderColor: '#2fb150' },
  cancelText: { color: '#1f1f1f', fontWeight: '700' },
  acceptText: { color: '#ffffff', fontWeight: '800' },
});


