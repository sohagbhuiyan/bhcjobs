import { ThemeName, themes } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const THEME_KEYS = Object.keys(themes) as ThemeName[];

export default function Menu() {
  const { theme, themeName, setTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={[styles.heading, { color: theme.text }]}>Settings</Text>
        <Text style={[styles.subheading, { color: theme.textMuted }]}>
          Customize your experience
        </Text>

        {/* Theme Picker Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.tabBarBorder,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Color Theme
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
            Tap a theme to apply it instantly
          </Text>

          {/* Theme swatches grid */}
          <View style={styles.swatchGrid}>
            {THEME_KEYS.map((key) => {
              const t = themes[key];
              const isActive = themeName === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setTheme(key)}
                  activeOpacity={0.75}
                  style={styles.swatchWrapper}
                >
                  {/* Glow ring when active */}
                  <View
                    style={[
                      styles.swatchRing,
                      {
                        borderColor: isActive ? t.primary : "transparent",
                        shadowColor: t.primary,
                        shadowOpacity: isActive ? 0.7 : 0,
                        shadowRadius: 10,
                        elevation: isActive ? 10 : 0,
                      },
                    ]}
                  >
                    <View
                      style={[styles.swatch, { backgroundColor: t.primary }]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.swatchLabel,
                      {
                        color: isActive ? theme.text : theme.textMuted,
                        fontWeight: isActive ? "700" : "500",
                      },
                    ]}
                  >
                    {t.emoji}
                  </Text>
                  <Text
                    style={[
                      styles.swatchName,
                      {
                        color: isActive ? theme.text : theme.textMuted,
                        fontWeight: isActive ? "700" : "400",
                      },
                    ]}
                  >
                    {t.name}
                  </Text>
                  {isActive && (
                    <View
                      style={[
                        styles.activeBadge,
                        { backgroundColor: t.primary },
                      ]}
                    >
                      <Text style={styles.activeBadgeText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Active palette preview */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.tabBarBorder,
              marginTop: 16,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {themes[themeName].emoji} {themes[themeName].name}
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
            Active palette
          </Text>

          <View style={styles.paletteRow}>
            {(
              [
                ["Primary", theme.primary],
                ["Background", theme.background],
                ["Card", theme.card],
                ["Text", theme.text],
                ["Muted", theme.textMuted],
              ] as [string, string][]
            ).map(([label, color]) => (
              <View key={label} style={styles.paletteItem}>
                <View
                  style={[
                    styles.paletteChip,
                    {
                      backgroundColor: color,
                      borderColor: theme.tabBarBorder,
                    },
                  ]}
                />
                <Text style={[styles.paletteLabel, { color: theme.textMuted }]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tab bar preview */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.tabBarBorder,
              marginTop: 16,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Tab Bar Preview
          </Text>

          <View
            style={[
              styles.tabBarPreview,
              {
                backgroundColor: theme.tabBar,
                borderColor: theme.tabBarBorder,
              },
            ]}
          >
            {(["Home", "Jobs", "Offer", "Theme"] as const).map((tab) => {
              const isActive = tab === "Theme";
              return (
                <View key={tab} style={styles.tabPreviewItem}>
                  <View
                    style={[
                      styles.tabPreviewDot,
                      {
                        backgroundColor: isActive
                          ? theme.tabActive
                          : theme.tabInactive,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.tabPreviewLabel,
                      {
                        color: isActive ? theme.tabActive : theme.tabInactive,
                        fontWeight: isActive ? "700" : "400",
                      },
                    ]}
                  >
                    {tab}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    marginBottom: 28,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    marginBottom: 20,
  },
  swatchGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  swatchWrapper: {
    alignItems: "center",
    width: "30%",
    marginBottom: 8,
    position: "relative",
  },
  swatchRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    padding: 4,
    marginBottom: 8,
  },
  swatch: {
    flex: 1,
    borderRadius: 24,
  },
  swatchLabel: {
    fontSize: 18,
    marginBottom: 2,
  },
  swatchName: {
    fontSize: 10,
    textAlign: "center",
  },
  activeBadge: {
    position: "absolute",
    top: 0,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  paletteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paletteItem: {
    alignItems: "center",
    flex: 1,
  },
  paletteChip: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
  paletteLabel: {
    fontSize: 9,
    textAlign: "center",
  },
  tabBarPreview: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tabPreviewItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  tabPreviewDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  tabPreviewLabel: {
    fontSize: 10,
  },
});
