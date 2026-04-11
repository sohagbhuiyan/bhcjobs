// ── Theme Context & Provider ──────────────────────────────────────────────────

import { Theme, ThemeName, themes } from "@/constants/Colors";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  themeName: "dark",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("dark");

  // Persist key used if SecureStore is available
  const STORAGE_KEY = "app_theme";

  useEffect(() => {
    let mounted = true;

    (async () => {
      // 1) Try to read persisted theme (expo-secure-store) if available
      try {
        const requireFunc: any = eval("require");
        const SecureStore = requireFunc("expo-secure-store");
        const stored = await SecureStore.getItemAsync(STORAGE_KEY);
        if (mounted && stored && stored in themes) {
          setThemeName(stored as ThemeName);
          return;
        }
      } catch (e) {
        // ignore if expo-secure-store isn't installed or fails
      }

      // 2) Fallback to system preference
      try {
        const colorScheme = Appearance.getColorScheme();
        if (mounted) {
          if (colorScheme === "dark") setThemeName("dark");
          else setThemeName("light");
        }
      } catch (e) {
        // leave default
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // wrapper that also persists selection when possible
  const setTheme = async (name: ThemeName) => {
    setThemeName(name);
    try {
      const requireFunc: any = eval("require");
      const SecureStore = requireFunc("expo-secure-store");
      await SecureStore.setItemAsync(STORAGE_KEY, name);
    } catch (e) {
      // ignore if not available
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeName],
        themeName,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
