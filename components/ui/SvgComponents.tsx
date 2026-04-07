// ── SVG Icons ──────────────────────────────────────────────────────────────

import Svg, { Circle, Path, Rect } from "react-native-svg";

// ── Tab Bar Icons (accept color + size from expo-router Tabs) ─────────────

export const HomeTabIcon = ({
  color = "#3B82F6",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path
      d="M9 21V13h6v8"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

export const JobsTabIcon = ({
  color = "#3B82F6",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="2"
      y="7"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path d="M12 12v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M10 14h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const OfferTabIcon = ({
  color = "#3B82F6",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Circle cx="7" cy="7" r="1.5" fill={color} />
  </Svg>
);

export const MenuTabIcon = ({
  color = "#3B82F6",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 6h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 12h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 18h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const SearchIcon = ({ color = "white" }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <Path
      d="M21 21l-4.35-4.35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const MoonIcon = ({
  color = "#3B82F6",
  size = 18,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ConstructionIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M2 20h20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path
      d="M6 20V10l6-6 6 6v10"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Rect x="9" y="14" width="6" height="6" stroke={color} strokeWidth="2" />
    <Path
      d="M3 10l9-9 9 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const FacilitiesIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="7" r="3" stroke={color} strokeWidth="2" />
    <Circle cx="15" cy="7" r="3" stroke={color} strokeWidth="2" />
    <Path
      d="M3 20c0-4 2.5-7 6-7h6c3.5 0 6 3 6 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const FoodIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11l2-8h14l2 8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 11h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9z"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M12 11v10" stroke={color} strokeWidth="2" />
    <Path d="M8 11v10" stroke={color} strokeWidth="2" />
    <Path d="M16 11v10" stroke={color} strokeWidth="2" />
  </Svg>
);

export const CafeIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 2v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M10 2v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M14 2v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path
      d="M4 6h16l-1.5 10A2 2 0 0 1 16.5 18h-9A2 2 0 0 1 5.5 16L4 6z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path d="M20 10h2a2 2 0 0 1 0 4h-2" stroke={color} strokeWidth="2" />
    <Path d="M2 22h20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const AgricultureIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6 2 3 7 3 12c3 0 5-1 6-3-1 3-1 6 0 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2c6 0 9 5 9 10-3 0-5-1-6-3 1 3 1 6 0 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 22V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ContractingIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <Rect
      x="13"
      y="3"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <Rect
      x="3"
      y="13"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M17 13v2m0 4v2m-2-4h2m2 0h2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const FactoryIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 20V9l5-3v3l5-3v3l5-3v14H2z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Rect x="15" y="9" width="7" height="11" stroke={color} strokeWidth="2" />
    <Rect x="5" y="14" width="3" height="3" stroke={color} strokeWidth="2" />
    <Rect x="11" y="14" width="3" height="3" stroke={color} strokeWidth="2" />
    <Path d="M16 9V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M19 9V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const HotelIcon = ({
  color = "#3B82F6",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="2"
      y="3"
      width="20"
      height="18"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M2 9h20" stroke={color} strokeWidth="2" />
    <Path d="M9 3v6" stroke={color} strokeWidth="2" />
    <Rect x="5" y="13" width="3" height="3" stroke={color} strokeWidth="2" />
    <Rect x="11" y="13" width="3" height="3" stroke={color} strokeWidth="2" />
    <Rect x="17" y="13" width="3" height="3" stroke={color} strokeWidth="2" />
  </Svg>
);

export const LogoIcon = ({
  color = "#3B82F6",
  size = 22,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={color} />
    <Path d="M9 22V12h6v10" stroke="white" strokeWidth="1.5" />
  </Svg>
);
