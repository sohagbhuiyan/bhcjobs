// ── Auth Context & Provider ───────────────────────────────────────────────────

import { loginJobSeeker, registerJobSeeker } from "@/lib/api";
import type {
    JobSeeker,
    LoginPayload,
    RegisterPayload,
} from "@/types/api.types";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const TOKEN_KEY = "bhcjobs_auth_token";
const USER_KEY = "bhcjobs_auth_user";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: JobSeeker | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JobSeeker | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ── Load persisted session on mount ────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync(TOKEN_KEY),
          SecureStore.getItemAsync(USER_KEY),
        ]);
        if (storedToken) {
          setToken(storedToken);
          if (storedUser) setUser(JSON.parse(storedUser));
        }
      } catch {
        // ignore parse errors
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ── Persist helpers ────────────────────────────────────────────────────────
  const persistSession = async (t: string, u: JobSeeker) => {
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, t),
      SecureStore.setItemAsync(USER_KEY, JSON.stringify(u)),
    ]);
    setToken(t);
    setUser(u);
  };

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(
    async (payload: LoginPayload) => {
      const res = await loginJobSeeker(payload);

      const t = res.data?.token ?? res.token;
      const u = res.data?.user ?? res.user;

      if (!t || !u) {
        throw new Error(res.message ?? "Login failed. Please try again.");
      }

      await persistSession(t, u);
      router.replace("/(tabs)");
    },
    [router],
  );

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(
    async (payload: RegisterPayload) => {
      const res = await registerJobSeeker(payload);

      const t = res.data?.token ?? res.token;
      const u = res.data?.user ?? res.user;

      if (!t || !u) {
        throw new Error(
          res.message ?? "Registration failed. Please try again.",
        );
      }

      await persistSession(t, u);
      router.replace("/(tabs)");
    },
    [router],
  );

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_KEY),
    ]);
    setToken(null);
    setUser(null);
    router.replace("/(auth)/landing" as any);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
