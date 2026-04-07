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
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

// ── Types ──────────────────────────────────────────────────────────────────

interface Industry {
  id: number;
  name: string;
  count: number;
  icon: React.ReactNode;
}

// ── Data ───────────────────────────────────────────────────────────────────

const industries: Industry[] = [
  { id: 1, name: "Construction", count: 6, icon: <ConstructionIcon /> },
  { id: 2, name: "Facilities Management", count: 1, icon: <FacilitiesIcon /> },
  { id: 3, name: "Fast Food Restaurant", count: 4, icon: <FoodIcon /> },
  { id: 4, name: "Cafés & Coffee Shops", count: 0, icon: <CafeIcon /> },
  { id: 5, name: "Agriculture", count: 0, icon: <AgricultureIcon /> },
  {
    id: 6,
    name: "Contracting & Maintenance",
    count: 2,
    icon: <ContractingIcon />,
  },
  { id: 7, name: "Factory & Manufacturing", count: 1, icon: <FactoryIcon /> },
  { id: 8, name: "Hotel", count: 0, icon: <HotelIcon /> },
];

// ── Sub-components ─────────────────────────────────────────────────────────

const IndustryCard = ({ item }: { item: Industry }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.85}
      className="bg-white rounded-2xl p-4 flex-row items-center"
      style={{
        width: (width - 48) / 2,
        marginBottom: 12,
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: pressed ? 1 : 3 },
        shadowOpacity: pressed ? 0.08 : 0.12,
        shadowRadius: pressed ? 4 : 10,
        elevation: pressed ? 2 : 5,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      }}
    >
      <View className="mr-3">{item.icon}</View>
      <View className="flex-1">
        <Text
          className="text-gray-800 font-semibold text-sm leading-tight"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-blue-500 text-xs mt-0.5">
          {item.count} Available Jobs
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const rows: Industry[][] = [];
  for (let i = 0; i < industries.length; i += 2) {
    rows.push(industries.slice(i, i + 2));
  }

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={true}

      >
        {/* ── Hero Section ── */}
        <View
          style={{
            backgroundColor: "#3B82F6",
            paddingBottom: 60,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: "hidden",
          }}
        >
          {/* Subtle radial glow top-right */}
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

          {/* ── Navbar ── */}
          <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
            {/* Logo */}
            <View className="flex-row items-center gap-x-1.5">
              <LogoIcon />
              <Text className="text-white font-bold text-lg tracking-wide">
                BHC<Text className="font-light">JOBS</Text>
              </Text>
            </View>

            {/* Nav Actions */}
            <View className="flex-row items-center gap-x-2">
              <TouchableOpacity
                activeOpacity={0.8}
                className="border border-white/70 rounded-full px-4 py-1.5"
              >
                <Text className="text-white text-sm font-medium">Jobs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                className="border border-white/70 rounded-full px-4 py-1.5"
              >
                <Text className="text-white text-sm font-medium">Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                className="border border-white/70 rounded-full w-8 h-8 items-center justify-center"
              >
                <MoonIcon />
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Hero Text ── */}
          <View className="items-center px-6 pt-8 pb-2">
            <Text className="text-white text-3xl font-extrabold text-center leading-tight">
              #1 Platform for{"\n"}Saudi Jobs
            </Text>
            <Text className="text-white/80 text-sm text-center mt-3 leading-relaxed px-4">
              Apply for jobs in Saudi Arabia with verified employers.{"\n"}
              We connect Bangladeshi workforce with{"\n"}high-demand Saudi Jobs.
            </Text>
          </View>

          {/* ── Search Bar ── */}
          <View className="mx-5 mt-7">
            <View
              className="flex-row items-center bg-white rounded-full px-5"
              style={{
                shadowColor: "#1e40af",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search Job"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-gray-700 text-base py-4"
                style={{ fontFamily: "System" }}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                className="w-11 h-11 rounded-full bg-blue-500 items-center justify-center"
                style={{ marginRight: -4 }}
              >
                <SearchIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Popular Industries ── */}
        <View className="px-6 pt-8 pb-6">
          {/* Section Header */}
          <View className="items-center mb-6">
            <View
              className="px-5 py-2 rounded-full"
              style={{
                backgroundColor: "#EFF6FF",
                borderWidth: 1,
                borderColor: "#BFDBFE",
              }}
            >
              <Text className="text-gray-800 font-bold text-base">
                Popular Industries
              </Text>
            </View>
          </View>

          {/* Industry Grid */}
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} className="flex-row justify-between">
              {row.map((item) => (
                <IndustryCard key={item.id} item={item} />
              ))}
              {/* If odd item in last row, fill empty space */}
              {row.length === 1 && <View style={{ width: (width - 48) / 2 }} />}
            </View>
          ))}

          {/* Show More Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="self-center mt-2 border border-blue-300 rounded-full px-8 py-2.5"
          >
            <Text className="text-blue-500 font-semibold text-sm">
              Show More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
