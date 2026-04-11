// ── Global API Configuration ──────────────────────────────────────────────────

export const BASE_URL = "https://dev.bhcjobs.com";
export const STORAGE_BASE_URL = "https://api.bhcjobs.com/storage";

// ── Endpoints ────────────────────────────────────────────────────────────────

export const ENDPOINTS = {
  // GET
  INDUSTRY_GET: "/api/industry/get",
  JOB_GET: "/api/job/get",
  COMPANY_GET: "/api/company/get",
  // POST
  JOB_SEEKER_REGISTER: "/api/job_seeker/register",
  JOB_SEEKER_LOGIN: "/api/job_seeker/login",
} as const;

// ── Query Keys ────────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
  INDUSTRIES: ["industries"] as const,
  JOBS: ["jobs"] as const,
  COMPANIES: ["companies"] as const,
} as const;

// ── Image Folder Map ─────────────────────────────────────────────────────────

export const IMAGE_FOLDERS = {
  INDUSTRY: "industry-image",
  JOB: "job-image",
  COMPANY: "company-image",
  JOB_SEEKER: "job-seeker-image",
} as const;

/**
 * Build a full image URL from a folder name and image filename.
 * Handles all shapes the API might return:
 *  - Full URL   → pass-through  (e.g. "https://api.bhcjobs.com/storage/industry-image/file.webp")
 *  - Root path  → prepend host  (e.g. "/industry-image/file.webp")
 *  - Rel path   → prepend base  (e.g. "industry-image/file.webp")
 *  - Filename   → build full    (e.g. "file.webp")
 * @example getImageUrl("industry-image", "2362_1754539698.webp")
 *   → "https://api.bhcjobs.com/storage/industry-image/2362_1754539698.webp"
 */
export const getImageUrl = (folder: string, image: string): string => {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return `https://api.bhcjobs.com${image}`;
  if (image.includes("/")) return `${STORAGE_BASE_URL}/${image}`;
  return `${STORAGE_BASE_URL}/${folder}/${image}`;
};
