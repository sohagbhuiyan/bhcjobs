// ── Home Tab – Index ──────────────────────────────────────────────────────────

import { useAuth } from "@/app/providers/AuthProvider";
import {
  AgricultureIcon,
  CafeIcon,
  ConstructionIcon,
  ContractingIcon,
  FacilitiesIcon,
  FactoryIcon,
  FoodIcon,
  HotelIcon,
  LogoIcon,
  MoonIcon,
  SearchIcon,
} from "@/components/ui/SvgComponents";
import { getImageUrl, IMAGE_FOLDERS } from "@/constants/api";
import { useIndustries, useJobs } from "@/hooks/useApiQueries";
import { useTheme } from "@/hooks/useTheme";
import { type Industry, type Job, normalizeJob } from "@/types/api.types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ── Industry Icon Map ─────────────────────────────────────────────────────────

const industryIconMap: Record<string, React.ReactNode> = {
  Construction: <ConstructionIcon />,
  "Facilities Management": <FacilitiesIcon />,
  "Fast Food Restaurant": <FoodIcon />,
  "Cafés & Coffee Shops": <CafeIcon />,
  Agriculture: <AgricultureIcon />,
  "Contracting & Maintenance": <ContractingIcon />,
  "Factory & Manufacturing": <FactoryIcon />,
  Hotel: <HotelIcon />,
};

const getIndustryIcon = (name: string) =>
  industryIconMap[name] ?? <ConstructionIcon />;

// ── Industry Card ─────────────────────────────────────────────────────────────

const IndustryCard = ({
  item,
  jobCounts,
  theme,
  isLast,
}: {
  item: Industry;
  jobCounts: Record<number, number>;
  theme: any;
  isLast?: boolean;
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.85}
      className="mb-3 rounded-xl p-4 flex-row items-center"
      style={{
        width: (width - 48) / 2,
        marginRight: isLast ? 0 : 12,
        backgroundColor: theme.card,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: pressed ? 1 : 3 },
        shadowOpacity: pressed ? 0.04 : 0.12,
        shadowRadius: pressed ? 4 : 10,
        elevation: pressed ? 2 : 5,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      }}
    >
      {item.image ? (
        <Image
          source={{ uri: getImageUrl(IMAGE_FOLDERS.INDUSTRY, item.image) }}
          style={{ width: 32, height: 32, borderRadius: 8, marginRight: 10 }}
          contentFit="cover"
        />
      ) : (
        <View style={{ marginRight: 10 }}>{getIndustryIcon(item.name)}</View>
      )}
      <View className="flex-1">
        <Text
          className="font-semibold text-[13px]"
          style={{ color: theme.text, lineHeight: 18 }}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-[11px] mt-1" style={{ color: theme.primary }}>
          {jobCounts[item.id] ?? 0} Available Jobs
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ── Recommended Job Card ─────────────────────────────────────────────────────

const JobRowCard = ({ job: rawJob, theme }: { job: Job; theme: any }) => {
  const router = useRouter();
  const job = normalizeJob(rawJob);

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => router.push(`/(tabs)/job/${job.slug ?? job.id}` as any)}
      className="rounded-2xl mb-4 overflow-hidden"
      style={{
        backgroundColor: theme.card,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Top row: logo + title + company */}
      <View className="flex-row items-center p-4 pb-3">
        <Image
          source={
            job.displayImageUrl
              ? { uri: job.displayImageUrl }
              : require("@/assets/images/icon.png")
          }
          style={{ width: 56, height: 56, borderRadius: 14, marginRight: 14 }}
          contentFit="cover"
        />
        <View className="flex-1">
          <Text
            style={{
              color: theme.text,
              fontWeight: "800",
              fontSize: 15,
              marginBottom: 2,
            }}
            numberOfLines={2}
          >
            {job.displayTitle}
          </Text>
          {job.displayCompany && (
            <Text
              style={{ color: theme.textMuted, fontSize: 13 }}
              numberOfLines={1}
            >
              {job.displayCompany}
            </Text>
          )}
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: theme.tabBarBorder,
          marginHorizontal: 16,
        }}
      />

      {/* Salary + Allowance */}
      <View className="px-4 pt-3 pb-2">
        {job.displaySalary && (
          <View className="flex-row items-center mb-1" style={{ gap: 6 }}>
            <Text style={{ color: theme.textMuted, fontSize: 12 }}>
              Salary:
            </Text>
            <Text
              style={{ color: theme.text, fontWeight: "700", fontSize: 13 }}
            >
              {job.displaySalary}
            </Text>
          </View>
        )}
        {job.displayFoodAllowance && (
          <View className="flex-row items-center mb-1" style={{ gap: 6 }}>
            <Text style={{ color: theme.textMuted, fontSize: 12 }}>
              Food Allowance:
            </Text>
            <Text
              style={{ color: theme.text, fontWeight: "700", fontSize: 13 }}
            >
              {job.displayFoodAllowance}
            </Text>
          </View>
        )}

        {/* Tags */}
        <View className="flex-row flex-wrap mt-2" style={{ gap: 6 }}>
          {job.displayType && (
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: theme.primary + "18" }}
            >
              <Text
                style={{
                  color: theme.primary,
                  fontSize: 10,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {job.displayType}
              </Text>
            </View>
          )}
          {job.displayLocation && (
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: "#F0F9FF" }}
            >
              <Text
                style={{
                  color: "#0369A1",
                  fontSize: 10,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {job.displayLocation}
              </Text>
            </View>
          )}
          {rawJob.vacancy ? (
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <Text
                style={{ color: "#16A34A", fontSize: 10, fontWeight: "700" }}
              >
                {rawJob.vacancy}{" "}
                {rawJob.vacancy === 1 ? "vacancy" : "vacancies"}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Deadline */}
        {job.displayDeadline && (
          <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 8 }}>
            Application Deadline:{" "}
            <Text style={{ color: "#DC2626", fontWeight: "600" }}>
              {job.displayDeadline}
            </Text>
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row px-4 pb-4 pt-1" style={{ gap: 10 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            router.push(`/(tabs)/job/${job.slug ?? job.id}` as any)
          }
          className="flex-1 rounded-xl items-center py-2.5"
          style={{ borderWidth: 1.5, borderColor: theme.primary }}
        >
          <Text
            style={{ color: theme.primary, fontWeight: "700", fontSize: 13 }}
          >
            View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 rounded-xl items-center py-2.5"
          style={{ backgroundColor: theme.primary }}
        >
          <Text style={{ color: "white", fontWeight: "700", fontSize: 13 }}>
            Apply Now
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// ── Error Banner ──────────────────────────────────────────────────────────────

const ErrorBanner = ({
  message,
  onRetry,
  theme,
}: {
  message: string;
  onRetry: () => void;
  theme: any;
}) => (
  <View
    style={{
      backgroundColor: "#FEF2F2",
      borderRadius: 12,
      padding: 14,
      marginHorizontal: 20,
      marginVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Text style={{ color: "#DC2626", fontSize: 13, flex: 1 }} numberOfLines={2}>
      {message}
    </Text>
    <TouchableOpacity onPress={onRetry} style={{ marginLeft: 10 }}>
      <Text style={{ color: theme.primary, fontWeight: "600", fontSize: 13 }}>
        Retry
      </Text>
    </TouchableOpacity>
  </View>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryDisplayCount, setIndustryDisplayCount] = useState(8);
  const { theme, themeName, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    data: industries = [],
    isLoading: industriesLoading,
    isError: industriesError,
    refetch: refetchIndustries,
    error: industriesErr,
  } = useIndustries();

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
    refetch: refetchJobs,
    error: jobsErr,
  } = useJobs();

  const jobCounts = jobs.reduce<Record<number, number>>((acc, job) => {
    if (job.industry_id) acc[job.industry_id] = (acc[job.industry_id] ?? 0) + 1;
    return acc;
  }, {});

  const filteredJobs = searchQuery
    ? jobs.filter(
        (j) =>
          j.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.country?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : jobs.slice(0, 5);

  const displayIndustries = industries.slice(0, industryDisplayCount);
  const industryRows: Industry[][] = [];
  for (let i = 0; i < displayIndustries.length; i += 2)
    industryRows.push(displayIndustries.slice(i, i + 2));

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <StatusBar
        style={themeName === "dark" ? "light" : "dark"}
        backgroundColor={theme.background}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* ── Hero Section ── */}
        <View
          className="overflow-hidden"
          style={{
            backgroundColor: theme.primary,
            paddingBottom: 60,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: -30,
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          />

          {/* Navbar */}
          <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
            <View className="flex-row items-center" style={{ gap: 6 }}>
              <LogoIcon color="white" />
              <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                BHC<Text style={{ fontWeight: "300" }}>JOBS</Text>
              </Text>
            </View>
            <View className="flex-row items-center" style={{ gap: 8 }}>
              {!isAuthenticated && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push("/(auth)/login" as any)}
                    className="rounded-full px-4 py-1 border"
                    style={{ borderColor: "rgba(255,255,255,0.7)" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push("/(auth)/register" as any)}
                    className="rounded-full px-4 py-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setTheme(themeName === "dark" ? "light" : "dark")
                }
                className="rounded-[20px] w-8 h-8 items-center justify-center border"
                style={{ borderColor: "rgba(255,255,255,0.7)" }}
              >
                <MoonIcon color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Text */}
          <View className="items-center px-6 pt-7 pb-2">
            <Text
              className="text-white text-center"
              style={{ fontSize: 30, fontWeight: "800", lineHeight: 38 }}
            >
              #1 Platform for{"\n"}Saudi Jobs
            </Text>
            <Text
              className="text-center mt-3"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 14,
                lineHeight: 22,
                paddingHorizontal: 16,
              }}
            >
              Apply for jobs in Saudi Arabia with verified employers.{"\n"}
              We connect Bangladeshi workforce with{"\n"}high-demand Saudi Jobs.
            </Text>
          </View>

          {/* Search Bar */}
          <View className="mx-5 mt-6">
            <View
              className="flex-row items-center rounded-full px-5"
              style={{
                backgroundColor: theme.card,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.12,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search jobs, companies…"
                placeholderTextColor="#9CA3AF"
                className="flex-1"
                style={{ paddingVertical: 14, fontSize: 14, color: theme.text }}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.primary, marginRight: -4 }}
              >
                <SearchIcon color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Error Banners ── */}
        {industriesError && (
          <ErrorBanner
            message={
              (industriesErr as Error)?.message ?? "Failed to load industries."
            }
            onRetry={refetchIndustries}
            theme={theme}
          />
        )}
        {jobsError && (
          <ErrorBanner
            message={(jobsErr as Error)?.message ?? "Failed to load jobs."}
            onRetry={refetchJobs}
            theme={theme}
          />
        )}

        {/* ── Popular Industries ── */}
        <View style={{ backgroundColor: theme.background }}>
          <View
            style={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 8 }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 99,
                  backgroundColor: theme.primary + "15",
                  borderWidth: 1,
                  borderColor: theme.primary + "40",
                }}
              >
                <Text
                  style={{ color: theme.text, fontWeight: "700", fontSize: 15 }}
                >
                  Popular Industries
                </Text>
              </View>
            </View>

            {industriesLoading ? (
              <View style={{ alignItems: "center", paddingVertical: 32 }}>
                <ActivityIndicator color={theme.primary} size="large" />
                <Text
                  style={{
                    color: theme.textMuted,
                    marginTop: 10,
                    fontSize: 13,
                  }}
                >
                  Loading industries…
                </Text>
              </View>
            ) : industryRows.length === 0 && !industriesError ? (
              <Text
                style={{
                  color: theme.textMuted,
                  textAlign: "center",
                  paddingVertical: 20,
                  fontSize: 14,
                }}
              >
                No industries available.
              </Text>
            ) : (
              <>
                {industryRows.map((row, rowIdx) => (
                  <View key={rowIdx} style={{ flexDirection: "row" }}>
                    {row.map((item, idx) => (
                      <IndustryCard
                        key={item.id}
                        item={item}
                        jobCounts={jobCounts}
                        theme={theme}
                        isLast={idx === row.length - 1}
                      />
                    ))}
                    {row.length === 1 && (
                      <View style={{ width: (width - 48) / 2 }} />
                    )}
                  </View>
                ))}
                {industries.length > industryDisplayCount && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setIndustryDisplayCount((c) => c + 8)}
                    style={{
                      alignSelf: "center",
                      marginTop: 4,
                      borderWidth: 1,
                      borderColor: theme.primary + "80",
                      borderRadius: 99,
                      paddingHorizontal: 28,
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.primary,
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      Show More
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>

        {/* ── Recent Jobs ── */}
        <View
          style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text
              style={{ color: theme.text, fontWeight: "700", fontSize: 17 }}
            >
              {searchQuery ? "Search Results" : "Recommended Jobs"}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/jobs" as any)}
              >
                <Text
                  style={{
                    color: theme.primary,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {jobsLoading ? (
            <View style={{ alignItems: "center", paddingVertical: 24 }}>
              <ActivityIndicator color={theme.primary} />
            </View>
          ) : filteredJobs.length === 0 ? (
            <Text
              style={{
                color: theme.textMuted,
                textAlign: "center",
                paddingVertical: 20,
                fontSize: 14,
              }}
            >
              {searchQuery
                ? "No jobs match your search."
                : "No jobs available."}
            </Text>
          ) : (
            filteredJobs.map((job) => (
              <JobRowCard key={job.id} job={job} theme={theme} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
