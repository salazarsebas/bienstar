import { TreeTabBar } from '@/components/TreeTabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TreeTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="trending" options={{ title: 'Trending' }} />
      <Tabs.Screen name="campaings" options={{ title: 'Campaigns' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}


