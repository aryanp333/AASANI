/**
 * AASANI data interface layer.
 *
 * Org-aware: Northbridge uses curated workspaceMock data; other orgs get
 * seeded synthetic datasets so the multi-tenant UI can demo every org.
 */

import { mockData, suggestedChatPrompts } from "../data/workspaceMock";
import {
  DEFAULT_ORG_ID,
  getOrgById,
  listOrganizations,
  organizations,
} from "../data/orgs";
import { generateInsights } from "./insightEngine";
import { answerFromLiveData } from "./chatAssistant";
import { generateSyntheticPeriodData } from "./orgDataFactory";

export { DEFAULT_ORG_ID } from "../data/orgs";

/**
 * Manual UI test switch: when true, each public dataService call waits a random
 * 300–1200ms before resolving. Flip to false for snappy demos / production.
 */
export let SIMULATE_LATENCY = true;

/** @typedef {'7D' | '30D' | '90D'} Period */

/**
 * @returns {Promise<void>}
 */
function maybeLatency() {
  if (!SIMULATE_LATENCY) return Promise.resolve();
  const ms = 300 + Math.floor(Math.random() * 901);
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * @template T
 * @param {() => T | Promise<T>} produce
 * @returns {Promise<T>}
 */
async function withLatency(produce) {
  await maybeLatency();
  return produce();
}

/**
 * @param {string} [orgId]
 */
function resolveOrg(orgId) {
  return getOrgById(orgId || DEFAULT_ORG_ID);
}

/**
 * @param {Period | string} period
 */
function resolvePeriodData(period) {
  return mockData[period] || mockData["30D"];
}

/**
 * @param {string} displayValue
 * @returns {string}
 */
function inferUnit(displayValue) {
  if (!displayValue) return "";
  if (displayValue.startsWith("$")) return "$";
  if (displayValue.endsWith("%")) return "%";
  const match = displayValue.match(/\s+([a-zA-Z]+)$/);
  return match ? match[1] : "";
}

/**
 * @param {number} score
 * @param {number} benchmark
 */
function departmentStatus(score, benchmark) {
  if (score >= benchmark + 3) return "ahead";
  if (score >= benchmark) return "on_pace";
  return "behind";
}

/**
 * True when org has hand-authored Northbridge-class mock period data.
 * @param {import('../data/orgs.js').Organization} org
 */
function usesCuratedMock(org) {
  return org.hasCuratedMock === true || org.id === "northbridge";
}

/**
 * Unified period snapshot for any org.
 * @param {import('../data/orgs.js').Organization} org
 * @param {Period | string} period
 */
function getPeriodSnapshot(org, period) {
  if (usesCuratedMock(org)) {
    const data = resolvePeriodData(period);
    const profile = org.benchmarkProfile || {};

    return {
      label: data.label,
      kpis: data.kpis.map((k) => ({
        id: k.id,
        name: k.label,
        value: k.value,
        delta: k.delta,
        unit: inferUnit(k.value),
        benchmark: null,
        up: k.up,
        raw: k.raw,
      })),
      // Scores stay curated; peer benchmarks come from org.benchmarkProfile
      departments: data.departments.map((d) => {
        const benchmark = profile[d.dept] ?? d.peer;
        return {
          id: d.dept.toLowerCase().replace(/\s+/g, "-").replace(/'/g, ""),
          name: d.dept,
          score: d.score,
          benchmark,
          status: departmentStatus(d.score, benchmark),
        };
      }),
      trend: data.trend.map((row) => ({ ...row })),
      summary: {
        headline: data.summary.headline,
        keyMetrics: data.summary.keyMetrics.map((m) => ({ ...m })),
        summary: data.summary.narrative,
      },
    };
  }

  return generateSyntheticPeriodData(org, period);
}

/* ── Mappers ── */

function mapKpis(orgId, period) {
  const org = resolveOrg(orgId);
  return getPeriodSnapshot(org, period).kpis.map((kpi) => {
    // Drop internal raw number if present
    // eslint-disable-next-line no-unused-vars -- omit raw from public KPI shape
    const { raw, ...publicKpi } = kpi;
    return publicKpi;
  });
}

function mapDepartments(orgId, period) {
  const org = resolveOrg(orgId);
  return getPeriodSnapshot(org, period).departments;
}

function mapTrend(orgId, period, metric = "admissions") {
  const org = resolveOrg(orgId);
  const snap = getPeriodSnapshot(org, period);
  const key = metric in (snap.trend[0] || {}) ? metric : "admissions";
  return snap.trend.map((row) => ({
    date: row.period,
    value: row[key],
  }));
}

function mapInsights(orgId, period) {
  return generateInsights(mapKpis(orgId, period), mapDepartments(orgId, period));
}

function mapNarrative(orgId, period) {
  const org = resolveOrg(orgId);
  const snap = getPeriodSnapshot(org, period);
  // Swap generic system name into curated narrative when viewing non-default wording hosts
  const narrative = String(snap.summary.summary || "").replace(
    /Northbridge/g,
    org.name.split(" ")[0],
  );
  return {
    headline: snap.summary.headline.replace(/Northbridge/g, org.name.split(" ")[0]),
    keyMetrics: snap.summary.keyMetrics,
    summary: narrative,
  };
}

function mapPeriodLabel(period) {
  return resolvePeriodData(period).label;
}

/* ── Public async API ── */

/**
 * @param {string} [orgId]
 * @param {Period | string} [period]
 */
export async function getKPIs(orgId, period = "30D") {
  return withLatency(() => mapKpis(orgId, period));
}

/**
 * @param {string} [orgId]
 * @param {Period | string} [period]
 */
export async function getDepartmentScorecards(orgId, period = "30D") {
  return withLatency(() => mapDepartments(orgId, period));
}

/**
 * @param {string} [orgId]
 * @param {Period | string} [period]
 * @param {string} [metric]
 */
export async function getTrendData(orgId, period = "30D", metric = "admissions") {
  return withLatency(() => mapTrend(orgId, period, metric));
}

/**
 * @param {string} [orgId]
 * @param {Period | string} [period]
 */
export async function getInsights(orgId, period = "30D") {
  return withLatency(() => mapInsights(orgId, period));
}

/**
 * @param {string} [orgId]
 * @param {Period | string} [period]
 */
export async function getNarrativeSummary(orgId, period = "30D") {
  return withLatency(() => mapNarrative(orgId, period));
}

/**
 * @returns {Promise<Array<{ id: string, name: string, type: string, bedCount: number }>>}
 */
export async function getOrganizations() {
  return withLatency(() => listOrganizations());
}

/** @returns {Promise<typeof organizations>} */
export async function getOrganizationCatalog() {
  return withLatency(() => organizations.map((o) => ({ ...o })));
}

/** @returns {Promise<string[]>} */
export async function getSuggestedPrompts() {
  return withLatency(() => [...suggestedChatPrompts]);
}

/**
 * @param {Period | string} [period]
 * @returns {Promise<string>}
 */
export async function getPeriodLabel(period = "30D") {
  return withLatency(() => mapPeriodLabel(period));
}

/**
 * @param {string} question
 * @param {Period | string} period
 * @param {string} [orgId]
 */
export async function askQuestion(question, period = "30D", orgId) {
  return withLatency(() => {
    const org = resolveOrg(orgId);
    const kpis = mapKpis(org.id, period);
    const departments = mapDepartments(org.id, period);
    const insights = mapInsights(org.id, period);
    const periodLabel = mapPeriodLabel(period);

    return answerFromLiveData(question, {
      orgName: org.name,
      period,
      periodLabel,
      kpis,
      departments,
      insights,
    });
  });
}
