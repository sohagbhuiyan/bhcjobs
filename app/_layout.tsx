import { AuthProvider } from "@/app/providers/AuthProvider";
import QueryProvider from "@/app/providers/QueryProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
