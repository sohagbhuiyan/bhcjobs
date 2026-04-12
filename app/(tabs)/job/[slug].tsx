import { useJobs } from "@/hooks/useApiQueries";
import { useTheme } from "@/hooks/useTheme";
import { normalizeJob, type Job } from "@/types/api.types";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
}

export default function JobDetail() {
  const { theme, themeName } = useTheme();
  const { slug } = useLocalSearchParams();
  const { data: jobs = [], isLoading } = useJobs();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          style={themeName === "dark" ? "light" : "dark"}
          backgroundColor={theme.background}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const rawJob = jobs.find(
    (j: Job) => j.slug === slug || j.job_title === slug || j.title === slug,
  );
  const job = rawJob ? normalizeJob(rawJob) : null;
  const raw = rawJob;

  if (!job) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          style={themeName === "dark" ? "light" : "dark"}
          backgroundColor={theme.background}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Text style={{ color: theme.text, fontWeight: "700", fontSize: 18 }}>
            Job not found
          </Text>
          <Text style={{ color: theme.textMuted, marginTop: 8 }}>
            We could not find that job.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        style={themeName === "dark" ? "light" : "dark"}
        backgroundColor={theme.background}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16 }}
        >
          <Image
            source={
              job.displayImageUrl
                ? { uri: job.displayImageUrl }
                : require("@/assets/images/icon.png")
            }
            style={{
              width: "100%",
              height: 160,
              borderRadius: 12,
              marginBottom: 12,
            }}
            contentFit="cover"
          />

          <Text
            style={{
              color: theme.text,
              fontWeight: "800",
              fontSize: 20,
              marginBottom: 6,
            }}
          >
            {job.displayTitle}
          </Text>
          {job.displayCompany && (
            <Text style={{ color: theme.textMuted, marginBottom: 8 }}>
              {job.displayCompany}
            </Text>
          )}

          {(job.displayLocation || job.displayType || job.displayDeadline) && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 10,
              }}
            >
              {job.displayLocation && (
                <View
                  style={{
                    backgroundColor: theme.primary + "15",
                    borderRadius: 99,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: theme.primary,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {job.displayLocation}
                  </Text>
                </View>
              )}
              {job.displayType && (
                <View
                  style={{
                    backgroundColor: "#F0FDF4",
                    borderRadius: 99,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#16A34A",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {job.displayType}
                  </Text>
                </View>
              )}
              {job.displayDeadline && (
                <View
                  style={{
                    backgroundColor: "#FFF1F2",
                    borderRadius: 99,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#DC2626",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Deadline: {job.displayDeadline}
                  </Text>
                </View>
              )}
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 6,
              marginBottom: 4,
            }}
          >
            <View>
              {job.displaySalary && (
                <Text
                  style={{
                    color: theme.primary,
                    fontWeight: "800",
                    fontSize: 16,
                  }}
                >
                  {job.displaySalary}
                </Text>
              )}
              {job.displayFoodAllowance && (
                <Text
                  style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}
                >
                  + {job.displayFoodAllowance} food allowance
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: theme.primary,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Apply Now
              </Text>
            </TouchableOpacity>
          </View>

          {job.displayDescription && (
            <View
              style={{
                marginTop: 14,
                borderTopWidth: 1,
                borderTopColor: theme.tabBarBorder,
                paddingTop: 14,
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontWeight: "700",
                  marginBottom: 6,
                }}
              >
                About the Role
              </Text>
              <Text
                style={{ color: theme.textMuted, lineHeight: 22, fontSize: 14 }}
              >
                {stripHtml(job.displayDescription)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
