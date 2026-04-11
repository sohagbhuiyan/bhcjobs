// ── Data Fetching Hooks ───────────────────────────────────────────────────────

import { ENDPOINTS, QUERY_KEYS } from "@/constants/api";
import axiosInstance from "@/lib/axiosInstance";
import type { Company, Industry, Job } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// ── Helper: safely extract array from any API response shape ──────────────────

function extractArray<T>(raw: any): T[] {
  if (Array.isArray(raw)) return raw as T[];
  return (raw?.data ?? raw?.results ?? raw?.items ?? []) as T[];
}

// ── useIndustries ─────────────────────────────────────────────────────────────

export const useIndustries = () => {
  return useQuery<Industry[]>({
    queryKey: QUERY_KEYS.INDUSTRIES,
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.INDUSTRY_GET);
      console.log(
        "[industries] RESPONSE data →",
        JSON.stringify(res.data, null, 2),
      );
      return extractArray<Industry>(res.data);
    },
  });
};

// ── useJobs ───────────────────────────────────────────────────────────────────

export const useJobs = () => {
  return useQuery<Job[]>({
    queryKey: QUERY_KEYS.JOBS,
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.JOB_GET);
      console.log("[jobs] RESPONSE data →", JSON.stringify(res.data, null, 2));
      return extractArray<Job>(res.data);
    },
  });
};

// ── useCompanies ──────────────────────────────────────────────────────────────

export const useCompanies = () => {
  return useQuery<Company[]>({
    queryKey: QUERY_KEYS.COMPANIES,
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.COMPANY_GET);
      console.log(
        "[companies] RESPONSE data →",
        JSON.stringify(res.data, null, 2),
      );
      return extractArray<Company>(res.data);
    },
  });
};
