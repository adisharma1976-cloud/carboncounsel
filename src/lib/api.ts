// CarbonCounsel API Client
// Connects the React frontend to the Express backend

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json() as T;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface CCTSSector {
  id: string;
  name: string;
  riskLevel: "High" | "Medium" | "Low";
  geiBaseline: number;
  geiUnit: string;
  covered: boolean;
  obligatedEntities: number;
  complianceDeadline: string | null;
  tradingStatus: string;
  lastUpdated: string;
  notes: string;
}

export interface RegulatoryUpdate {
  id: string;
  title: string;
  body: string;
  source: string;
  date: string;
  sector: string;
  urgency: "High" | "Medium" | "Low";
  tags: string[];
}

export interface CarbonProject {
  id: string;
  name: string;
  type: string;
  registry: string;
  status: string;
  vintage: string;
  creditsIssued: number;
  creditsPending: number;
  additionality: string;
  permanenceRisk: string;
  leakageRisk: string;
  doubleCounting: string;
  buyerReadiness: number;
  lastAudit: string;
}

export interface AIQueryResult {
  id: string;
  query: string;
  answer: string;
  riskLevel: string;
  sources: string[];
  relatedSectors: string[];
  actionItems: string[];
  timestamp: string;
}

export interface EarlyAccessPayload {
  name: string;
  email: string;
  phone?: string;
  org: string;
  role: string;
  sector?: string;
  type: string;
  usecase?: string;
  interest?: string[];
  message?: string;
}

// ── API Methods ────────────────────────────────────────────────────────────

export const api = {
  health: () => apiFetch<{ status: string; version: string }>("/api/health"),

  ccts: {
    getSectors: (params?: { riskLevel?: string; covered?: boolean }) => {
      const query = new URLSearchParams();
      if (params?.riskLevel) query.set("riskLevel", params.riskLevel);
      if (params?.covered !== undefined) query.set("covered", String(params.covered));
      return apiFetch<{ sectors: CCTSSector[]; total: number }>(`/api/ccts/sectors?${query}`);
    },
    getSector: (id: string) => apiFetch<CCTSSector>(`/api/ccts/sectors/${id}`),
  },

  intelligence: {
    getUpdates: (params?: { sector?: string; urgency?: string; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.sector) query.set("sector", params.sector);
      if (params?.urgency) query.set("urgency", params.urgency);
      if (params?.limit) query.set("limit", String(params.limit));
      return apiFetch<{ updates: RegulatoryUpdate[]; total: number }>(`/api/intelligence/updates?${query}`);
    },
    analyseCompany: (company: string, sector?: string) =>
      apiFetch<{ exposureScore: string; exposureLevel: string; recommendations: string[] }>("/api/intelligence/company", {
        method: "POST",
        body: JSON.stringify({ company, sector }),
      }),
  },

  projects: {
    getAll: (params?: { type?: string; status?: string; registry?: string }) => {
      const query = new URLSearchParams();
      if (params?.type) query.set("type", params.type);
      if (params?.status) query.set("status", params.status);
      if (params?.registry) query.set("registry", params.registry);
      return apiFetch<{ projects: CarbonProject[]; total: number }>(`/api/projects?${query}`);
    },
    getById: (id: string) => apiFetch<CarbonProject>(`/api/projects/${id}`),
  },

  ai: {
    query: (query: string) =>
      apiFetch<AIQueryResult>("/api/ai/query", { method: "POST", body: JSON.stringify({ query }) }),
  },

  earlyAccess: {
    submit: (payload: EarlyAccessPayload) =>
      apiFetch<{ success: boolean; message: string; id: string }>("/api/early-access", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  },

  dashboard: {
    getStats: () =>
      apiFetch<{ sectorsTracked: number; regulatoryUpdates: number; projectsReviewed: number; lastSync: string }>("/api/dashboard/stats"),
  },
};

export default api;
