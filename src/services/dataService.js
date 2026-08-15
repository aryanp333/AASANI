/**
 * AASANI data interface layer.
 *
 * Talks to the real Node/Express backend (see VITE_API_BASE_URL) instead of
 * reading from src/data/workspaceMock.js. Every request is authenticated with
 * the bearer token stored by authService at login/signup.
 */

import { apiRequest } from "./apiClient";

/** @typedef {'7D' | '30D' | '90D'} Period */

const PERIOD_LABELS = {
  "7D": "Last 7 days",
  "30D": "Last 30 days",
  "90D": "Last 90 days",
};

// The backend doesn't expose a prompts endpoint — these are just starter
// questions the chat panel offers, grounded in the KPIs the API returns.
const SUGGESTED_PROMPTS = [
  "Why did readmissions change this period?",
  "Which department is most at risk?",
  "Why are ED wait times elevated?",
  "Summarize margin drivers for leadership",
];

// Metrics where a falling value is the good outcome (used only to color the
// KPI card's delta as "up"/favorable vs. "down"/unfavorable).
const LOWER_IS_BETTER = new Set(["edWaitTime", "readmissionRate", "avgLengthOfStay"]);

function slugify(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/'/g, "");
}

/**
 * Backend KPIs arrive as a raw number + separate unit string
 * (e.g. value: 42600000, unit: "$"). Render that into display text.
 */
function formatValue(value, unit) {
  if (value == null || Number.isNaN(value)) return "—";
  if (unit === "$") {
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toLocaleString()}`;
  }
  if (unit === "%") return `${value}%`;
  if (!unit) return value.toLocaleString();
  return `${value}${unit}`;
}

function formatDelta(delta) {
  if (delta == null || Number.isNaN(delta)) return "—";
  const sign = delta > 0 ? "+" : delta < 0 ? "-" : "";
  return `${sign}${Math.abs(delta)}%`;
}

function isFavorable(id, delta) {
  if (delta == null) return true;
  return LOWER_IS_BETTER.has(id) ? delta <= 0 : delta >= 0;
}

function mapKpi(kpi) {
  return {
    id: kpi.id,
    name: kpi.name,
    value: formatValue(kpi.value, kpi.unit),
    delta: formatDelta(kpi.delta),
    up: isFavorable(kpi.id, kpi.delta),
    unit: kpi.unit,
    benchmark: kpi.benchmark,
  };
}

function mapDepartment(dept) {
  return {
    id: slugify(dept.name),
    name: dept.name,
    score: dept.score,
    benchmark: dept.benchmark,
    status: dept.status,
  };
}

function mapInsight(insight, index) {
  return {
    id: `${index}-${slugify(insight.title)}`,
    title: insight.title,
    category: insight.category,
    confidence: Math.round((insight.confidence || 0) * 100),
    explanation: insight.explanation,
    whyItMatters: insight.whyItMatters,
    recommendedAction: insight.recommendedAction,
  };
}

/* ── Public async API ── */

/**
 * @param {Period | string} [period]
 */
export async function getKPIs(period = "30D") {
  const rows = await apiRequest(`/api/kpis?period=${encodeURIComponent(period)}`);
  return (rows || []).map(mapKpi);
}

/**
 * @param {Period | string} [period]
 */
export async function getDepartmentScorecards(period = "30D") {
  const rows = await apiRequest(`/api/departments?period=${encodeURIComponent(period)}`);
  return (rows || []).map(mapDepartment);
}

/**
 * @param {Period | string} [period]
 */
export async function getInsights(period = "30D") {
  const rows = await apiRequest(`/api/insights?period=${encodeURIComponent(period)}`);
  return (rows || []).map(mapInsight);
}

/**
 * @param {Period | string} [period]
 */
export async function getNarrativeSummary(period = "30D") {
  const data = await apiRequest(`/api/narrative?period=${encodeURIComponent(period)}`);
  if (!data) return null;
  return {
    headline: data.headline,
    keyMetrics: (data.keyMetrics || []).map((k) => ({
      label: k.name,
      value: formatValue(k.value, k.unit),
      note: `${formatDelta(k.delta)} vs prior period`,
    })),
    summary: data.summary,
  };
}

/**
 * @param {string} question
 * @param {Period | string} [period]
 * @returns {Promise<{ text: string }>}
 */
export async function sendChatMessage(question, period = "30D") {
  const data = await apiRequest(`/api/chat?period=${encodeURIComponent(period)}`, {
    method: "POST",
    body: { question },
  });
  return { text: data?.answer || "I couldn't find an answer for that." };
}

/**
 * @param {Period | string} [period]
 */
export function getPeriodLabel(period = "30D") {
  return PERIOD_LABELS[period] || PERIOD_LABELS["30D"];
}

/** @returns {string[]} */
export function getSuggestedPrompts() {
  return SUGGESTED_PROMPTS;
}
