// ── Color Themes ─────────────────────────────────────────────────────────────

export const themes = {
  dark: {
    name: "Midnight",
    emoji: "🌙",
    primary: "#60A5FA",
    primaryLight: "#93C5FD",
    background: "#071024",
    card: "#0F1A2B",
    text: "#E6F0FF",
    textMuted: "#9FB3D6",
    tabBar: "#071024",
    tabBarBorder: "#122438",
    tabActive: "#60A5FA",
    tabInactive: "#5B6B78",
  },

  light: {
    name: "Clean Light",
    emoji: "☀️",
    primary: "#2563EB",
    primaryLight: "#3B82F6",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    textMuted: "#64748B",
    tabBar: "#FFFFFF",
    tabBarBorder: "#E2E8F0",
    tabActive: "#2563EB",
    tabInactive: "#94A3B8",
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];
