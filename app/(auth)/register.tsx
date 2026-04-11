// ── Registration Page ─────────────────────────────────────────────────────────

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

const PersonIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
    <Path
      d="M4 20c0-4 3.58-7 8-7s8 3 8 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
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

const CheckIcon = ({ color = "white" }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
  hint?: string;
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
  hint,
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
      ) : hint ? (
        <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
};

// ── Password Strength ─────────────────────────────────────────────────────────

const PasswordStrength = ({
  password,
  theme,
}: {
  password: string;
  theme: any;
}) => {
  const checks = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains a letter", valid: /[a-zA-Z]/.test(password) },
  ];

  if (!password) return null;

  return (
    <View style={{ marginTop: -8, marginBottom: 16 }}>
      {checks.map((check) => (
        <View
          key={check.label}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: check.valid ? "#22C55E" : theme.tabBarBorder,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {check.valid && <CheckIcon />}
          </View>
          <Text
            style={{
              fontSize: 12,
              color: check.valid ? "#22C55E" : theme.textMuted,
            }}
          >
            {check.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const { theme, themeName } = useTheme();
  const { register } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch, formState } = useForm<{
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    passportNumber: string;
    dob: string;
    gender: string;
  }>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      passportNumber: "",
      dob: "",
      gender: "",
    },
  });
  const { errors } = formState;

  // ── Validation ────────────────────────────────────────────────────────────
  const onSubmit = async (values: {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword?: string;
    passportNumber?: string;
    dob?: string;
    gender?: string;
  }) => {
    setLoading(true);
    try {
      // sanitize passport number: remove non-alphanumeric, uppercase, no spaces
      const passportSanitized = values.passportNumber
        ? values.passportNumber.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
        : undefined;

      const payload = {
        name: values.name.trim(),
        phone: values.phone.replace(/\D/g, ""),
        email: values.email?.trim(),
        password: values.password,
        confirm_password: values.confirmPassword,
        passport_number: passportSanitized,
        dob: values.dob?.trim(),
        gender: values.gender,
      };
      await register(payload);
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
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
            {/* Glow blobs */}
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
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: -20,
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: "rgba(255,255,255,0.05)",
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
                Create Account
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 14,
                  lineHeight: 22,
                }}
              >
                Join BHC Jobs and start your journey{"\n"}to a better career in
                Saudi Arabia.
              </Text>

              {/* Benefits Row */}
              <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
                {["Free", "Verified Jobs", "Fast Apply"].map((tag) => (
                  <View
                    key={tag}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: 99,
                      paddingHorizontal: 12,
                      paddingVertical: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckIcon color={theme.primary} />
                    </View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "600",
                      }}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
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
              name="name"
              rules={{ required: "Full name is required." }}
              render={({
                field,
                fieldState,
              }: {
                field: any;
                fieldState: any;
              }) => (
                <InputField
                  label="Full Name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Your full name"
                  icon={
                    <PersonIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  error={fieldState.error?.message}
                  theme={theme}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Phone number is required.",
                pattern: {
                  value: /^\d{11}$/, // require exactly 11 digits
                  message: "Phone must be 11 digits.",
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
                  hint="This will be your login phone number."
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
                <>
                  <InputField
                    label="Password"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Create a strong password"
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
                </>
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email.",
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
                  label="Email"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="you@example.com"
                  icon={
                    <PersonIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  error={fieldState.error?.message}
                  theme={theme}
                />
              )}
            />

            {/* Passport Number */}
            <Controller
              control={control}
              name="passportNumber"
              rules={{
                required: "Passport number is required.",
                pattern: {
                  // allow alphanumeric passport numbers (no spaces/special chars)
                  value: /^[A-Za-z0-9]{5,20}$/,
                  message: "Enter a valid passport number.",
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
                  label="Passport Number"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Passport number"
                  icon={
                    <PersonIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  error={fieldState.error?.message}
                  theme={theme}
                />
              )}
            />

            {/* DOB */}
            <Controller
              control={control}
              name="dob"
              rules={{
                required: "Date of birth is required.",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Use YYYY-MM-DD",
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
                  label="Date of Birth"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="YYYY-MM-DD"
                  icon={
                    <PersonIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  error={fieldState.error?.message}
                  theme={theme}
                />
              )}
            />

            {/* Gender selector */}
            <Controller
              control={control}
              name="gender"
              rules={{ required: "Please select your gender." }}
              render={({
                field,
                fieldState,
              }: {
                field: any;
                fieldState: any;
              }) => (
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      color: theme.textMuted,
                      fontSize: 13,
                      fontWeight: "600",
                      marginBottom: 8,
                    }}
                  >
                    Gender
                  </Text>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    {["male", "female"].map((g) => (
                      <TouchableOpacity
                        key={g}
                        onPress={() => field.onChange(g)}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 16,
                          borderRadius: 12,
                          backgroundColor:
                            field.value === g ? theme.primary : theme.card,
                          borderWidth: 1,
                          borderColor:
                            field.value === g
                              ? theme.primary
                              : theme.tabBarBorder,
                        }}
                      >
                        <Text
                          style={{
                            color: field.value === g ? "white" : theme.text,
                          }}
                        >
                          {g === "male" ? "Male" : "Female"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {fieldState.error ? (
                    <Text
                      style={{ color: "#EF4444", fontSize: 12, marginTop: 6 }}
                    >
                      {fieldState.error.message}
                    </Text>
                  ) : null}
                </View>
              )}
            />

            <PasswordStrength
              password={watch("password") || ""}
              theme={theme}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password.",
                validate: (val: string) =>
                  val === watch("password") || "Passwords do not match.",
              }}
              render={({
                field,
                fieldState,
              }: {
                field: any;
                fieldState: any;
              }) => (
                <InputField
                  label="Confirm Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Re-enter your password"
                  icon={
                    <LockIcon
                      color={fieldState.error ? "#EF4444" : theme.primary}
                    />
                  }
                  secureEntry={!showConfirmPassword}
                  error={fieldState.error?.message}
                  theme={theme}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <EyeIcon
                        color={theme.textMuted}
                        off={!showConfirmPassword}
                      />
                    </TouchableOpacity>
                  }
                />
              )}
            />

            {/* Terms */}
            <Text
              style={{
                color: theme.textMuted,
                fontSize: 12,
                textAlign: "center",
                marginBottom: 20,
                lineHeight: 18,
              }}
            >
              By registering, you agree to our{" "}
              <Text style={{ color: theme.primary, fontWeight: "600" }}>
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text style={{ color: theme.primary, fontWeight: "600" }}>
                Privacy Policy
              </Text>
              .
            </Text>

            {/* Submit */}
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
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ── Login CTA ── */}
          <View className="flex-row justify-center items-center py-7">
            <Text style={{ color: theme.textMuted, fontSize: 14 }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/login" as any)}
            >
              <Text
                style={{
                  color: theme.primary,
                  fontWeight: "700",
                  fontSize: 14,
                  marginLeft: 6,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
