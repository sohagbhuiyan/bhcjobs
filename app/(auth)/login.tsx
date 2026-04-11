// ── Login Page ────────────────────────────────────────────────────────────────

import { useAuth } from "@/app/providers/AuthProvider";
import { LogoIcon } from "@/components/ui/SvgComponents";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

// ── Icons ─────────────────────────────────────────────────────────────────────

const PhoneIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Circle cx="12" cy="16" r="1.5" fill={color} />
  </Svg>
);

const EyeIcon = ({
  color = "#9CA3AF",
  off = false,
}: {
  color?: string;
  off?: boolean;
}) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    {off ? (
      <>
        <Path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M1 1l22 22"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <Path
          d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"
          stroke={color}
          strokeWidth="2"
        />
        <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      </>
    )}
  </Svg>
);

const BackArrowIcon = ({ color = "white" }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path
      d="M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Input Field ───────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  icon: React.ReactNode;
  secureEntry?: boolean;
  keyboardType?: "default" | "phone-pad" | "email-address";
  error?: string;
  theme: any;
  rightElement?: React.ReactNode;
}

const InputField = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  icon,
  secureEntry,
  keyboardType = "default",
  error,
  theme,
  rightElement,
}: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: theme.textMuted,
          fontSize: 13,
          fontWeight: "600",
          marginBottom: 8,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: error
            ? "#EF4444"
            : focused
              ? theme.primary
              : theme.tabBarBorder,
          backgroundColor: theme.card,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ marginRight: 10 }}>{icon}</View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted + "99"}
          secureTextEntry={secureEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          style={{
            flex: 1,
            paddingVertical: 14,
            fontSize: 15,
            color: theme.text,
          }}
        />
        {rightElement}
      </View>
      {error ? (
        <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function LoginPage() {
  const { theme, themeName } = useTheme();
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch, formState } = useForm<{
    phone: string;
    password: string;
  }>({
    defaultValues: { phone: "", password: "" },
  });
  const { errors } = formState;

  const onSubmit = async (values: { phone: string; password: string }) => {
    setLoading(true);
    try {
      await login({ phone: values.phone.trim(), password: values.password });
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err?.message ?? "Something went wrong. Please try again.",
        [{ text: "OK" }],
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <StatusBar
        style={themeName === "dark" ? "light" : "dark"}
        backgroundColor={theme.background}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* ── Header ── */}
          <View
            className="overflow-hidden"
            style={{
              backgroundColor: theme.primary,
              paddingBottom: 48,
              borderBottomLeftRadius: 36,
              borderBottomRightRadius: 36,
            }}
          >
            {/* Glow */}
            <View
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
            {/* Navbar */}
            <View className="flex-row items-center px-5 pt-4 pb-2">
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                className="w-9 h-9 rounded-full mr-3 items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <BackArrowIcon />
              </TouchableOpacity>
              <View className="flex-row items-center" style={{ gap: 6 }}>
                <LogoIcon color="white" />
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 17 }}
                >
                  BHC<Text style={{ fontWeight: "300" }}>JOBS</Text>
                </Text>
              </View>
            </View>

            {/* Title */}
            <View className="px-6 pt-5">
              <Text
                className="text-white"
                style={{ fontWeight: "800", fontSize: 28, marginBottom: 6 }}
              >
                Welcome Back!
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 14,
                  lineHeight: 22,
                }}
              >
                Sign in to access your account and{"\n"}browse hundreds of Saudi
                jobs.
              </Text>
            </View>
          </View>

          {/* ── Form Card ── */}
          <View
            className="mx-5"
            style={{
              marginTop: -28,
              backgroundColor: theme.card,
              borderRadius: 24,
              padding: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 6,
            }}
          >
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Phone number is required.",
                pattern: {
                  value: /^\+?[0-9]{7,15}$/,
                  message: "Enter a valid phone number.",
                },
              }}
              render={({
                field,
                fieldState,
              }: {
                field: any;
                fieldState: any;
              }) => (
                <InputField
                  label="Phone Number"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="+880 1XXXXXXXXX"
                  icon={
                    <PhoneIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  keyboardType="phone-pad"
                  error={fieldState.error?.message}
                  theme={theme}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              }}
              render={({
                field,
                fieldState,
              }: {
                field: any;
                fieldState: any;
              }) => (
                <InputField
                  label="Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Enter your password"
                  icon={
                    <LockIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  secureEntry={!showPassword}
                  error={fieldState.error?.message}
                  theme={theme}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setShowPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <EyeIcon color={theme.textMuted} off={!showPassword} />
                    </TouchableOpacity>
                  }
                />
              )}
            />

            {/* Forgot Password */}
            <TouchableOpacity
              className="self-end"
              style={{ marginBottom: 24, marginTop: -4 }}
            >
              <Text
                style={{
                  color: theme.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className="rounded-lg items-center"
              style={{
                backgroundColor: theme.primary,
                paddingVertical: 16,
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 10,
                elevation: 5,
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 16 }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ── Divider ── */}
          <View className="flex-row items-center mt-7 mb-6 px-8">
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.tabBarBorder,
              }}
            />
            <Text
              className="mx-3"
              style={{ color: theme.textMuted, fontSize: 13 }}
            >
              New to BHC Jobs?
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.tabBarBorder,
              }}
            />
          </View>

          {/* ── Register CTA ── */}
          <View className="px-5 pb-8">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/(auth)/register" as any)}
              className="rounded-lg items-center"
              style={{
                borderWidth: 2,
                borderColor: theme.primary,
                paddingVertical: 14,
              }}
            >
              <Text
                style={{
                  color: theme.primary,
                  fontWeight: "700",
                  fontSize: 15,
                }}
              >
                Create New Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
