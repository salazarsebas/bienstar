import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Floating custom tab bar that matches the provided design
export function TreeTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const onPressIndex = (index: number) => {
    const route = state.routes[index];
    if (!route) return;
    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (!event.defaultPrevented && state.index !== index) navigation.navigate(route.name);
  };

  // Order: secure, cart, home(index), settings
  const ICONS: React.ReactNode[] = [
    <Ionicons key="home" name="home-outline" size={34} color="#ecf4ea" />,
    <Ionicons key="trending" name="stats-chart-outline" size={34} color="#ecf4ea" />,
    <Ionicons key="campaings" name="calendar-outline" size={34} color="#ecf4ea" />,
    <Ionicons key="profile" name="person-circle-outline" size={34} color="#ecf4ea" />,
  ];

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: (insets.bottom || 0) + 16 }] }>
      <View style={styles.bar}>
        {/* Active bubble */}
        <View style={[styles.activeBubble, getActiveBubbleStyle(state.index)]} />

        {/* Hit areas and icons */}
        <View style={styles.row}>
          {[0, 1, 2, 3].map((i) => (
            <Pressable key={i} onPress={() => onPressIndex(i)} style={styles.item} hitSlop={12}>
              {ICONS[i]}
            </Pressable>
          ))}
        </View>

        {/* Plant removed per request */}
      </View>
    </View>
  );
}

function getActiveBubbleStyle(activeIndex: number) {
  // centers for 4 equal slots (no horizontal padding)
  const LEFTS = ['12.5%', '37.5%', '62.5%', '87.5%'];
  const clamped = Math.max(0, Math.min(3, activeIndex));
  return { left: LEFTS[clamped] } as const;
}

const HEIGHT = 77; // 15px thinner

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  // shadow removed to avoid line artifact behind the bar
  bar: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: 'rgba(88,129,87,0.55)', // richer green, more glassy
    borderWidth: 1.5,
    borderColor: 'rgba(58,90,64,0.7)',
    overflow: 'visible',
  },
  row: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // no horizontal padding to align centers with active bubble
  },
  item: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBubble: {
    position: 'absolute',
    top: 7,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(52,199,89,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    transform: [{ translateX: -32 }],
    // mimic bubble gloss
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  
});


