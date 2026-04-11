// ── API Types ─────────────────────────────────────────────────────────────────

import { getImageUrl, IMAGE_FOLDERS } from "@/constants/api";

export interface Industry {
  id: number;
  name: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface JobCategory {
  id: number;
  name: string;
}

export interface SoftSkill {
  id: number;
  name: string;
}

export interface HardSkill {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  slug?: string;
  image?: string;
  desc?: string;
  description?: string;
  location?: string;
  industry_id?: number;
  country_id?: number;
  industry?: Industry;
  country?: Country;
  created_at?: string;
  updated_at?: string;
}

/** Raw Job shape as returned by the API */
export interface Job {
  id: number;
  // Title — API returns as job_title
  job_title?: string;
  title?: string; // fallback / legacy
  slug?: string;

  // Descriptions (HTML)
  job_desc?: string;
  job_requirement?: string;
  recruitment_process?: string;
  description?: string; // legacy

  // Salary
  currency?: string;
  min_salary?: number;
  max_salary?: number;
  salary?: string; // legacy flat string
  salary_type?: string; // "monthly" | "weekly" etc.

  // Food & Benefits
  food_option?: string; // "allowance" | "provided" etc.
  food_amount?: number;
  accommodation?: number; // 1 = yes
  transportation?: number;
  medical_service?: number;
  iqama?: number;

  // Job Meta
  type?: string; // "overseas" | "local"
  employment_type?: string; // "full_time" | "part_time"
  gender?: string;
  min_age?: number;
  max_age?: number;
  vacancy?: number;
  experience?: string;
  expiry?: string; // deadline date
  deadline?: string; // legacy alias
  address?: string;
  working_days?: number;
  working_hours?: number;
  job_collar?: string; // "blue" | "white"

  // Flags
  is_trending?: number;
  is_hot?: number;
  view_count?: number;
  is_active?: number;

  // Flat denormalized fields
  company_name?: string;
  industry_name?: string;

  // Foreign keys
  company_id?: number;
  industry_id?: number;
  country_id?: number;
  category_id?: number;
  city_id?: number;

  // Images
  image?: string;

  // Nested
  company?: Company;
  industry?: Industry;
  category?: JobCategory;
  country?: Country;
  soft_skills?: SoftSkill[];
  hard_skills?: HardSkill[];

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

/** Normalised display-ready job — use this in UI components */
export interface NormalizedJob extends Job {
  displayTitle: string;
  displaySalary: string | null;
  displayFoodAllowance: string | null;
  displayLocation: string | null;
  displayType: string | null;
  displayDeadline: string | null;
  displayCompany: string | null;
  /** Raw filename or null – use displayImageUrl for rendering */
  displayImage: string | null;
  /** Fully-resolved image URL ready for <Image source={{ uri }} /> */
  displayImageUrl: string | null;
  displayDescription: string | null;
}

/** Convert a raw Job from the API into a display-ready NormalizedJob */
export function normalizeJob(job: Job): NormalizedJob {
  const currency = job.currency ?? "SAR";

  const displayTitle = job.job_title ?? job.title ?? "(Untitled)";

  const displaySalary =
    job.min_salary != null
      ? job.max_salary && job.max_salary !== job.min_salary
        ? `${currency} ${job.min_salary} – ${job.max_salary}`
        : `${currency} ${job.min_salary}`
      : (job.salary ?? null);

  const displayFoodAllowance =
    job.food_option === "allowance" && job.food_amount
      ? `${currency} ${job.food_amount}`
      : null;

  const displayLocation =
    job.country?.name ?? job.company?.country?.name ?? job.address ?? null;

  const displayType = job.type
    ? job.type.charAt(0).toUpperCase() + job.type.slice(1)
    : job.employment_type
      ? job.employment_type
          .replace("_", " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : (job.category?.name ?? null);

  const rawDeadline = job.expiry ?? job.deadline;
  const displayDeadline = rawDeadline
    ? new Date(rawDeadline).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const displayCompany = job.company?.name ?? job.company_name ?? null;

  const displayImage = job.image ? job.image : (job.company?.image ?? null);

  const displayImageUrl = job.image
    ? getImageUrl(IMAGE_FOLDERS.JOB, job.image)
    : job.company?.image
      ? getImageUrl(IMAGE_FOLDERS.COMPANY, job.company.image)
      : null;

  const displayDescription = job.job_desc ?? job.description ?? null;

  return {
    ...job,
    displayTitle,
    displaySalary,
    displayFoodAllowance,
    displayLocation,
    displayType,
    displayDeadline,
    displayCompany,
    displayImage,
    displayImageUrl,
    displayDescription,
  };
}

export interface JobSeeker {
  id: number;
  name?: string;
  phone: string;
  image?: string;
  token?: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface RegisterPayload {
  phone: string;
  password: string;
  name?: string;
  email?: string;
  confirm_password?: string;
  passport_number?: string;
  dob?: string; // YYYY-MM-DD
  gender?: string; // e.g. 'male' | 'female'
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: JobSeeker;
  };
  token?: string;
  user?: JobSeeker;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
