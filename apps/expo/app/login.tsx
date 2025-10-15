import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={require('@/assets/images/background.png')}
        style={styles.bgTop}
        contentFit="cover"
      />
      {/* Irregular bottom edge for the top image */}
      <Svg width="100%" height={120} style={styles.wave} preserveAspectRatio="none" viewBox="0 0 100 100">
        {/* Symmetric, deeper center wave */}
        <Path d="M0,60 C 25,35 25,85 50,60 C 75,35 75,85 100,60 L100,100 L0,100 Z" fill="#ffffff" />
      </Svg>

      {/* Brand title between image and card */}
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>BienStar</Text>
      </View>

      <View style={styles.bottom}>
        <BlurView intensity={10} tint="light" style={styles.card}>
          <Pressable style={({ pressed }) => [styles.buttonPrimary, pressed && styles.pressed]} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.buttonText}>Email & Password</Text>
          </Pressable>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    minHeight: 200,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    gap: 16,
    marginTop: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
  },
  wave: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    // slightly overlap the image bottom
    marginTop: -20,
    pointerEvents: 'none',
  },
  brandContainer: {
    position: 'absolute',
    top: '59%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brand: {
    fontSize: 46,
    fontWeight: '800',
    color: '#3a5a40',
    // If Lato is loaded in the app, this will use it
    fontFamily: 'Lato',
  },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(58,90,64,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    top: 10,
  },
  buttonPrimary: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(88,129,87,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: { opacity: 0.9 },
});


