# BHC Jobs — React Native (Expo) App

A mobile job portal connecting Bangladeshi workforce with high-demand Saudi jobs. Built with **Expo Router**, **NativeWind**, **TanStack Query**, and **Axios**.

---

## Tech Stack

| Layer         | Library                            |
| ------------- | ---------------------------------- |
| Framework     | Expo SDK 54 + React Native 0.81    |
| Routing       | Expo Router v6 (file-system based) |
| Styling       | NativeWind v4 (TailwindCSS for RN) |
| Data Fetching | @tanstack/react-query v5           |
| HTTP Client   | Axios                              |
| Forms         | react-hook-form v7                 |
| Auth Storage  | expo-secure-store                  |
| Image         | expo-image                         |

---

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Expo Go app (iOS / Android) **or** an emulator/simulator

---

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd bhcjobs
pnpm install
```

### 2. Environment

The API base URLs are configured in `constants/api.ts`:

```ts
export const BASE_URL = "https://dev.bhcjobs.com"; // REST API
export const STORAGE_BASE_URL = "https://api.bhcjobs.com/storage"; // Images
```

No `.env` file is required — update those constants directly if endpoints change.

### 3. Start Dev Server

```bash
pnpm start          # Interactive Expo CLI
pnpm android        # Android (emulator or device)
pnpm ios            # iOS simulator (macOS only)
pnpm web            # Browser
```

Scan the QR code with **Expo Go** to run on a physical device.

### 4. Clear Metro Cache (if needed)

```bash
pnpm expo start -c
```

---

## Project Structure

```
bhcjobs/
├── app/
│   ├── _layout.tsx              # Root layout (Providers)
│   ├── index.tsx                # Root redirect → /(tabs)
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab bar config
│   │   ├── index.tsx            # Home tab
│   │   ├── jobs.tsx             # Jobs list tab
│   │   ├── offer.tsx            # Offers / Featured tab
│   │   ├── menu.tsx             # Menu tab
│   │   └── job/
│   │       └── [slug].tsx       # Job detail page
│   └── providers/
│       ├── AuthProvider.tsx
│       ├── QueryProvider.tsx
│       └── ThemeProvider.tsx
├── components/
│   └── ui/
│       └── SvgComponents.tsx
├── constants/
│   └── api.ts                   # Base URLs, endpoints, image helpers
├── hooks/
│   ├── useApiQueries.ts         # useJobs, useIndustries, useCompanies
│   └── useTheme.ts
├── lib/
│   └── axiosInstance.ts
├── types/
│   └── api.types.ts
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── tsconfig.json
```

---

## Key Features

- **Guest access** — app opens to Home tab without requiring login
- **Job search & filter** — search by title, company, location; filter by industry
- **Job detail page** — navigates via `/(tabs)/job/[slug]`
- **Industry browser** — paginated "Load More" cards
- **Offer/Featured tab** — top-paying jobs + top hiring companies
- **Auth** — phone + password login, full registration with passport validation
- **Dark / Light theme** — toggle in the header
- **Image loading** — smart URL builder handles both relative filenames and full URLs

---

## Image URL Format

```
https://api.bhcjobs.com/storage/{folder-name}/{filename}
```

Folder constants (`constants/api.ts`):

```ts
IMAGE_FOLDERS.INDUSTRY  → "industry-image"
IMAGE_FOLDERS.JOB       → "job-image"
IMAGE_FOLDERS.COMPANY   → "company-image"
```

`getImageUrl(folder, image)` automatically passes through full URLs returned by the API.

---

## Scripts

| Script               | Description                    |
| -------------------- | ------------------------------ |
| `pnpm start`         | Start Expo dev server          |
| `pnpm android`       | Run on Android                 |
| `pnpm ios`           | Run on iOS                     |
| `pnpm web`           | Run in browser                 |
| `pnpm lint`          | Run ESLint via Expo            |
| `pnpm expo start -c` | Start with cleared Metro cache |

## Type Check

```bash
pnpm tsc --noEmit
```

---

## License

Private — BHC Jobs © 2026
