import {
  HomeTabIcon,
  JobsTabIcon,
  MenuTabIcon,
  OfferTabIcon,
} from "@/components/ui/SvgComponents";
import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 0,
          height: 68,
        },
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeTabIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <JobsTabIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="offer"
        options={{
          title: "Offer",
          tabBarIcon: ({ color, size }) => (
            <OfferTabIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Theme",
          tabBarIcon: ({ color, size }) => (
            <MenuTabIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="job/[slug]" options={{ href: null }} />
    </Tabs>
  );
}
