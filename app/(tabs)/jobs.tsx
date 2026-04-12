// ── Jobs Tab ──────────────────────────────────────────────────────────────────

import { useIndustries, useJobs } from "@/hooks/useApiQueries";
import { useTheme } from "@/hooks/useTheme";
import { normalizeJob, type Job } from "@/types/api.types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

const { width } = Dimensions.get("window");

// ── Icons ─────────────────────────────────────────────────────────────────────

const SearchIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <Path
      d="M21 21l-4.35-4.35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const LocationIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke={color}
      strokeWidth="2"
    />
    <Circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="2" />
  </Svg>
);

const FilterIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M7 12h10M11 18h2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// ── Job Card ──────────────────────────────────────────────────────────────────

const JobCard = ({ job, theme }: { job: Job; theme: any }) => {
  const router = useRouter();
  const {
    displayTitle,
    displaySalary,
    displayLocation,
    displayType,
    displayDescription,
    displayImage,
    displayImageUrl,
    displayCompany,
  } = normalizeJob(job);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/(tabs)/job/${job.slug ?? job.id}` as any)}
      style={{
        backgroundColor: theme.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.09,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        {/* Logo */}
        <Image
          source={
            displayImageUrl
              ? { uri: displayImageUrl }
              : require("@/assets/images/icon.png")
          }
          style={{ width: 52, height: 52, borderRadius: 12, marginRight: 14 }}
          contentFit="cover"
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.text,
              fontWeight: "700",
              fontSize: 15,
              marginBottom: 3,
            }}
            numberOfLines={2}
          >
            {displayTitle}
          </Text>
          {displayCompany && (
            <Text
              style={{ color: theme.textMuted, fontSize: 13, marginBottom: 8 }}
              numberOfLines={1}
            >
              {displayCompany}
            </Text>
          )}

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {displayLocation && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  backgroundColor: theme.primary + "15",
                  borderRadius: 99,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <LocationIcon color={theme.primary} />
                <Text
                  style={{
                    color: theme.primary,
                    fontSize: 11,
                    fontWeight: "600",
                  }}
                >
                  {displayLocation}
                </Text>
              </View>
            )}
            {displayType && (
              <View
                style={{
                  backgroundColor: "#F0FDF4",
                  borderRadius: 99,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{ color: "#16A34A", fontSize: 11, fontWeight: "600" }}
                >
                  {displayType}
                </Text>
              </View>
            )}
          </View>
        </View>

        {displaySalary && (
          <View
            style={{ alignItems: "flex-end", justifyContent: "flex-start" }}
          >
            <Text
              style={{
                color: theme.primary,
                fontWeight: "800",
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {displaySalary}
            </Text>
          </View>
        )}
      </View>
      {displayDescription && (
        <View
          style={{
            marginTop: 10,
            borderTopWidth: 1,
            borderTopColor: theme.tabBarBorder,
            paddingTop: 10,
          }}
        >
          <RenderHtml
            contentWidth={width}
            source={{ html: displayDescription }}
            tagsStyles={{
              p: {
                color: theme.textMuted,
                fontSize: 12,
                lineHeight: 18,
              },
            }}
          />
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          marginTop: 12,
          backgroundColor: theme.primary,
          borderRadius: 10,
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 13 }}>
          Apply Now
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState = ({ theme, query }: { theme: any; query: string }) => (
  <View
    style={{ alignItems: "center", paddingVertical: 60, paddingHorizontal: 32 }}
  >
    <View
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: theme.primary + "18",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
      }}
    >
      <SearchIcon color={theme.primary} />
    </View>
    <Text
      style={{
        color: theme.text,
        fontWeight: "700",
        fontSize: 17,
        marginBottom: 8,
      }}
    >
      {query ? "No Results Found" : "No Jobs Available"}
    </Text>
    <Text
      style={{
        color: theme.textMuted,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
      }}
    >
      {query
        ? `No jobs matched "${query}". Try a different keyword.`
        : "Check back later for new job listings."}
    </Text>
  </View>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function Jobs() {
  const { theme, themeName } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<number | null>(null);
  const { width } = useWindowDimensions();

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
    refetch: refetchJobs,
  } = useJobs();

  const { data: industries = [], isLoading: industriesLoading } =
    useIndustries();

  const filteredJobs = useMemo(() => {
    let result = jobs;
    if (activeIndustry !== null)
      result = result.filter((j) => j.industry_id === activeIndustry);
    if (searchQuery.trim())
      result = result.filter(
        (j) =>
          j.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.country?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return result;
  }, [jobs, activeIndustry, searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        style={themeName === "dark" ? "light" : "dark"}
        backgroundColor={theme.background}
      />

      {/* ── Header ── */}
      <View
        style={{
          backgroundColor: theme.card,
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: theme.tabBarBorder,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "800",
            fontSize: 22,
            marginBottom: 12,
          }}
        >
          Browse Jobs{" "}
          <Text
            style={{ color: theme.primary, fontWeight: "600", fontSize: 16 }}
          >
            ({jobs.length})
          </Text>
        </Text>

        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.background,
            borderRadius: 12,
            paddingHorizontal: 14,
            borderWidth: 1.5,
            borderColor: theme.tabBarBorder,
          }}
        >
          <SearchIcon color={theme.textMuted} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by title, company, location…"
            placeholderTextColor={theme.textMuted + "99"}
            style={{
              flex: 1,
              paddingVertical: 11,
              paddingHorizontal: 10,
              fontSize: 14,
              color: theme.text,
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={{ color: theme.textMuted, fontSize: 18 }}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Industry Filter Chips ── */}
      {!industriesLoading && industries.length > 0 && (
        <View style={{ paddingVertical: 12 }}>
          <FlatList
            data={[{ id: null, name: "All" } as any, ...industries]}
            keyExtractor={(item) => String(item.id ?? "all")}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
            renderItem={({ item }) => {
              const isActive =
                item.id === null
                  ? activeIndustry === null
                  : activeIndustry === item.id;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    setActiveIndustry(item.id === null ? null : item.id)
                  }
                  style={{
                    borderRadius: 99,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    backgroundColor: isActive ? theme.primary : theme.card,
                    borderWidth: 1.5,
                    borderColor: isActive ? theme.primary : theme.tabBarBorder,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: isActive ? "white" : theme.textMuted,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* ── Jobs List ── */}
      {jobsLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={theme.primary} size="large" />
          <Text style={{ color: theme.textMuted, marginTop: 12, fontSize: 14 }}>
            Loading jobs…
          </Text>
        </View>
      ) : jobsError ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <Text
            style={{
              color: "#DC2626",
              fontSize: 15,
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            Failed to load jobs
          </Text>
          <TouchableOpacity
            onPress={() => refetchJobs()}
            style={{
              backgroundColor: theme.primary,
              borderRadius: 10,
              paddingHorizontal: 24,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <JobCard job={item} theme={theme} />}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 32,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState theme={theme} query={searchQuery} />}
        />
      )}
    </SafeAreaView>
  );
}
