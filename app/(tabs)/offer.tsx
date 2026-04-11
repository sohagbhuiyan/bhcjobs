// ── Offer Tab ─────────────────────────────────────────────────────────────────

import { getImageUrl, IMAGE_FOLDERS } from "@/constants/api";
import { useCompanies, useJobs } from "@/hooks/useApiQueries";
import { useTheme } from "@/hooks/useTheme";
import { normalizeJob, type Company, type Job } from "@/types/api.types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

// ── Icons ──────────────────────────────────────────────────────────────────────

const StarIcon = ({ color = "#F59E0B" }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

const BriefcaseIcon = ({ color = "#9CA3AF" }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M12 12v4M10 14h4"
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

// ── Featured Job Card ─────────────────────────────────────────────────────────

const FeaturedJobCard = ({ job, theme }: { job: Job; theme: any }) => {
  const router = useRouter();
  const { displayTitle, displaySalary, displayCompany, displayImageUrl } =
    normalizeJob(job);
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => router.push(`/(tabs)/job/${job.slug ?? job.id}` as any)}
      className="rounded-2xl overflow-hidden mr-4"
      style={{
        width: 220,
        backgroundColor: theme.card,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <Image
        source={
          displayImageUrl
            ? { uri: displayImageUrl }
            : require("@/assets/images/icon.png")
        }
        style={{ width: "100%", height: 100 }}
        contentFit="cover"
      />
      <View className="p-3">
        <Text
          className="font-bold text-[14px] mb-1"
          style={{ color: theme.text }}
          numberOfLines={2}
        >
          {displayTitle}
        </Text>
        {displayCompany && (
          <Text
            className="text-[12px] mb-2"
            style={{ color: theme.textMuted }}
            numberOfLines={1}
          >
            {displayCompany}
          </Text>
        )}
        <View className="flex-row items-center justify-between">
          {displaySalary ? (
            <Text
              className="font-bold text-[13px]"
              style={{ color: theme.primary }}
            >
              {displaySalary}
            </Text>
          ) : (
            <View />
          )}
          <View
            className="rounded-full px-2 py-1"
            style={{ backgroundColor: theme.primary + "18" }}
          >
            <Text
              className="text-[10px] font-semibold"
              style={{ color: theme.primary }}
            >
              Apply
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ── Company Card ──────────────────────────────────────────────────────────────

const CompanyCard = ({
  company,
  jobCount,
  theme,
}: {
  company: Company;
  jobCount: number;
  theme: any;
}) => (
  <View
    className="rounded-xl p-4 mb-3 flex-row items-center"
    style={{
      backgroundColor: theme.card,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    }}
  >
    {company.image ? (
      <Image
        source={{ uri: getImageUrl(IMAGE_FOLDERS.COMPANY, company.image) }}
        style={{ width: 48, height: 48, borderRadius: 12, marginRight: 14 }}
        contentFit="cover"
      />
    ) : (
      <View
        className="rounded-xl mr-4 items-center justify-center"
        style={{ width: 48, height: 48, backgroundColor: theme.primary + "20" }}
      >
        <Text style={{ color: theme.primary, fontWeight: "800", fontSize: 18 }}>
          {(company.name?.charAt(0) ?? "C").toUpperCase()}
        </Text>
      </View>
    )}
    <View className="flex-1">
      <Text
        className="font-bold text-[15px] mb-0.5"
        style={{ color: theme.text }}
        numberOfLines={1}
      >
        {company.name}
      </Text>
      {company.location && (
        <View
          className="flex-row items-center"
          style={{ gap: 4, marginBottom: 4 }}
        >
          <LocationIcon color={theme.textMuted} />
          <Text className="text-[12px]" style={{ color: theme.textMuted }}>
            {company.location}
          </Text>
        </View>
      )}
      <View className="flex-row items-center" style={{ gap: 4 }}>
        <BriefcaseIcon color={theme.primary} />
        <Text
          className="text-[12px] font-semibold"
          style={{ color: theme.primary }}
        >
          {jobCount} open positions
        </Text>
      </View>
    </View>
    <View
      className="rounded-full px-3 py-1.5"
      style={{ backgroundColor: theme.primary }}
    >
      <Text className="text-[11px] font-bold text-white">View</Text>
    </View>
  </View>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function Offer() {
  const { theme, themeName } = useTheme();
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data: companies = [], isLoading: companiesLoading } = useCompanies();

  // Top-paying jobs (those with salary defined first)
  const featuredJobs = [...jobs]
    .sort((a, b) => (a.salary ? -1 : b.salary ? 1 : 0))
    .slice(0, 10);

  // Companies with job count
  const companyJobCounts = jobs.reduce<Record<number, number>>((acc, job) => {
    if (job.company_id) acc[job.company_id] = (acc[job.company_id] ?? 0) + 1;
    return acc;
  }, {});

  const topCompanies = companies
    .filter((c) => (companyJobCounts[c.id] ?? 0) > 0)
    .sort(
      (a, b) => (companyJobCounts[b.id] ?? 0) - (companyJobCounts[a.id] ?? 0),
    )
    .slice(0, 8);

  const isLoading = jobsLoading || companiesLoading;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <StatusBar
        style={themeName === "dark" ? "light" : "dark"}
        backgroundColor={theme.background}
      />

      {/* ── Header ── */}
      <View
        className="overflow-hidden"
        style={{
          backgroundColor: theme.primary,
          paddingBottom: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        {/* Glow blob */}
        <View
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />
        <View className="px-5 pt-5 pb-1">
          <Text
            className="text-white"
            style={{ fontWeight: "800", fontSize: 24, marginBottom: 4 }}
          >
            Hot Offers 🔥
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Top paying jobs and hiring companies
          </Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row px-5 mt-4" style={{ gap: 10 }}>
          {[
            { label: "Live Jobs", value: jobs.length },
            { label: "Companies", value: companies.length },
          ].map((stat) => (
            <View
              key={stat.label}
              className="flex-1 rounded-xl py-3 px-4 items-center"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            >
              <Text className="text-white font-bold" style={{ fontSize: 22 }}>
                {stat.value}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={theme.primary} size="large" />
          <Text className="mt-3 text-[14px]" style={{ color: theme.textMuted }}>
            Loading offers…
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* ── Featured Jobs ── */}
          {featuredJobs.length > 0 && (
            <View className="mt-6">
              <View className="flex-row items-center justify-between px-5 mb-3">
                <View className="flex-row items-center" style={{ gap: 6 }}>
                  <StarIcon />
                  <Text
                    className="font-bold text-[17px]"
                    style={{ color: theme.text }}
                  >
                    Featured Jobs
                  </Text>
                </View>
                <Text
                  className="text-[13px] font-semibold"
                  style={{ color: theme.primary }}
                >
                  {featuredJobs.length} jobs
                </Text>
              </View>
              <FlatList
                data={featuredJobs}
                keyExtractor={(item) => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                  <FeaturedJobCard job={item} theme={theme} />
                )}
              />
            </View>
          )}

          {/* ── Top Companies ── */}
          {topCompanies.length > 0 && (
            <View className="mt-7 px-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="font-bold text-[17px]"
                  style={{ color: theme.text }}
                >
                  Top Hiring Companies
                </Text>
                <Text
                  className="text-[13px] font-semibold"
                  style={{ color: theme.primary }}
                >
                  {topCompanies.length} companies
                </Text>
              </View>
              {topCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  jobCount={companyJobCounts[company.id] ?? 0}
                  theme={theme}
                />
              ))}
            </View>
          )}

          {featuredJobs.length === 0 && topCompanies.length === 0 && (
            <View className="items-center justify-center mt-20 px-8">
              <Text style={{ fontSize: 48 }}>📭</Text>
              <Text
                className="font-bold text-[18px] mt-4 text-center"
                style={{ color: theme.text }}
              >
                No Offers Yet
              </Text>
              <Text
                className="text-[14px] text-center mt-2"
                style={{ color: theme.textMuted }}
              >
                Check back soon for featured jobs and company highlights.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
