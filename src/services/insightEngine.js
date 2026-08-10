/**
 * Insight rules engine — generates strategic insights from live KPI +
 * department scorecard data (not hardcoded mock copy).
 *
 * Adjust THRESHOLDS when tuning sensitivity.
 */

/** @typedef {{ id: string, name: string, value: string, delta: string, unit?: string, benchmark?: number|null, up?: boolean }} Kpi */
/** @typedef {{ id: string, name: string, score: number, benchmark: number, status?: string }} Scorecard */
/** @typedef {{ id: string, title: string, category: string, confidence: number, explanation: string, whyItMatters: string, recommendedAction: string }} Insight */
/** @typedef {{ date: string, value: number }} TrendPoint */

/* ──────────────────────────────────────────────────────────────
 * THRESHOLDS
 * ────────────────────────────────────────────────────────────── */
export const THRESHOLDS = {
  /** |Δ%| greater than this triggers a KPI insight (e.g. +6%, −8%). */
  KPI_DELTA_PCT_ALERT: 5,
  /** |Δ pts| greater than this (deltas like "+0.3 pts", "−0.8 pts"). */
  KPI_DELTA_PTS_ALERT: 0.25,
  /** |Δ| for unitless / day-like deltas (e.g. ALOS "+0.1", sat "−0.4"). */
  KPI_DELTA_RAW_ALERT: 0.25,
  /** Department score more than this many points below peer → risk insight. */
  DEPT_GAP_POINTS: 5,
  /** Consecutive rising periods in a trend series to elevate ED confidence. */
  TREND_RISE_STREAK: 2,
  /** Max insights returned after ranking. */
  MAX_INSIGHTS: 6,
  CONFIDENCE: {
    kpiBase: 78,
    kpiStrongDelta: 88,
    deptBase: 84,
    trendElevated: 92,
    gainBase: 80,
  },
};

const CATEGORY = {
  COST: "Cost",
  QUALITY: "Quality",
  OP_RISK: "Operational Risk",
  EXPERIENCE: "Patient Experience",
};

/**
 * inverted = true  → higher is bad (readmit, alos, edwait)
 * inverted = false → higher is good (revenue, sat, admissions)
 */
const KPI_META = {
  admissions: {
    category: CATEGORY.OP_RISK,
    inverted: false,
    why: "Census swings drive staffing, bed demand, and elective capacity planning.",
    actionUp:
      "Confirm flex staffing and discharge-by-11 pathways ahead of the next census spike.",
    actionDown:
      "Review elective ramp and outbound transfers; protect OR utilization if volume softens further.",
  },
  revenue: {
    category: CATEGORY.COST,
    inverted: false,
    why: "Revenue trajectory frames margin headroom for capacity and quality investments.",
    actionUp: "Ring-fence a share of uplift for ED throughput and workforce float bank.",
    actionDown:
      "Pressure-test denials, imaging auth, and case-mix drift with revenue cycle this week.",
  },
  margin: {
    category: CATEGORY.COST,
    inverted: false,
    why: "Operating margin compresses first when labor intensity outruns productive volume.",
    actionUp: "Lock in labor discipline while protecting high-margin surgical block time.",
    actionDown:
      "Pull float before agency overtime; freeze non-urgent OT until census stabilizes.",
  },
  alos: {
    category: CATEGORY.QUALITY,
    inverted: true,
    why: "Length-of-stay creep reduces bed turns and can cascade into ED boarding.",
    actionUp:
      "Escalate multidisciplinary discharge huddles for medicine outliers past expected LOS.",
    actionDown: "Codify successful care pathways that shortened stays this period.",
  },
  readmit: {
    category: CATEGORY.QUALITY,
    inverted: true,
    why: "Readmissions hit value-based contracts and free capacity already under pressure.",
    actionUp: "Require 24-hour post-acute outreach for high-risk medicine discharges.",
    actionDown:
      "Expand the care-transition bundle that drove the improvement to adjacent service lines.",
  },
  sat: {
    category: CATEGORY.EXPERIENCE,
    inverted: false,
    why: "Experience scores lag operational friction by 24–48 hours and feed board reporting.",
    actionUp:
      "Export floor/ambulatory practices that lifted scores; keep ED wait messaging transparent.",
    actionDown:
      "Stand up bedside liaison coverage for prolonged waits; hourly charge-nurse updates.",
  },
  edwait: {
    category: CATEGORY.OP_RISK,
    inverted: true,
    why: "Prolonged door-to-provider and boarding elevate LWBS risk and tank ED experience.",
    actionUp:
      "Add triage capacity for mid-week peaks and accelerate rapid-admission pathways for ESI 3.",
    actionDown:
      "Hold the gains with standing ED throughput review and weekly bed-command authority.",
  },
};

/** Used only if rules produce zero insights. */
export const MANUAL_INSIGHT_FALLBACK = /** @type {Insight[]} */ ([
  {
    id: "fallback-ed-capacity",
    title: "Capacity and flow deserve standing governance",
    category: CATEGORY.OP_RISK,
    confidence: 72,
    explanation:
      "System metrics did not cross automated alert thresholds this period, but emergency and bed-flow domains remain the highest leverage watch items for leadership.",
    whyItMatters:
      "Without a standing throughput forum, small deteriorations compound across quality, experience, and margin before they re-trigger alerts.",
    recommendedAction:
      "Keep a weekly multi-disciplinary ED/bed command review even when automated alerts are quiet.",
  },
  {
    id: "fallback-quality-watch",
    title: "Quality trajectory is stable enough for exportable practices",
    category: CATEGORY.QUALITY,
    confidence: 70,
    explanation:
      "No quality KPI crossed the deterioration threshold. Use the calm window to codify successful readmission and LOS interventions for service-line spread.",
    whyItMatters:
      "Practice standardization during stable periods protects gains when census next spikes.",
    recommendedAction:
      "Document the medicine discharge bundle as a system standard before the next volume surge.",
  },
  {
    id: "fallback-margin-discipline",
    title: "Hold labor discipline while volume is constructive",
    category: CATEGORY.COST,
    confidence: 68,
    explanation:
      "Cost and margin KPIs are within normal bands. Maintaining float-before-agency discipline preserves headroom for capacity investments.",
    whyItMatters:
      "Margin is easier to protect than recover when agency intensity returns with ED demand.",
    recommendedAction:
      "Review agency and overtime triggers at daily capacity meetings for the next 14 days.",
  },
]);

/**
 * @param {string} delta
 * @returns {{ magnitude: number, sign: number, kind: 'pct'|'pts'|'raw', display: string }}
 */
export function parseDelta(delta) {
  const display = String(delta ?? "").trim();
  const cleaned = display.replace(/[−–]/g, "-");
  const match = cleaned.match(/([+-]?\d+(?:\.\d+)?)\s*(%|pts)?/i);
  if (!match) {
    return { magnitude: 0, sign: 0, kind: "raw", display };
  }
  const value = Number(match[1]);
  const unit = (match[2] || "").toLowerCase();
  const kind = unit === "%" ? "pct" : unit === "pts" ? "pts" : "raw";
  return {
    magnitude: Math.abs(value),
    sign: value === 0 ? 0 : value > 0 ? 1 : -1,
    kind,
    display,
  };
}

function isMaterialDelta(parsed) {
  const t = THRESHOLDS;
  if (parsed.kind === "pct") return parsed.magnitude >= t.KPI_DELTA_PCT_ALERT;
  if (parsed.kind === "pts") return parsed.magnitude >= t.KPI_DELTA_PTS_ALERT;
  return parsed.magnitude >= t.KPI_DELTA_RAW_ALERT;
}

function isDeterioration(kpi, parsed) {
  const meta = KPI_META[kpi.id];
  if (typeof kpi.up === "boolean") {
    return kpi.up === false && parsed.sign !== 0;
  }
  if (!meta) return parsed.sign < 0;
  if (meta.inverted) return parsed.sign > 0;
  return parsed.sign < 0;
}

function directionWord(isWorse, parsed) {
  if (parsed.sign === 0) return "unchanged at";
  if (isWorse) return parsed.sign > 0 ? "up" : "down";
  return parsed.sign > 0 ? "up" : "down";
}

function unitLabel(parsed) {
  if (parsed.kind === "pct") return "%";
  if (parsed.kind === "pts") return " pts";
  return "";
}

function trailingRiseStreak(series) {
  if (!series || series.length < 2) return 0;
  let streak = 0;
  for (let i = series.length - 1; i > 0; i -= 1) {
    if (series[i].value > series[i - 1].value) streak += 1;
    else break;
  }
  return streak;
}

function buildKpiInsight(kpi, worse, parsed, opts = {}) {
  const meta = KPI_META[kpi.id] || {
    category: CATEGORY.OP_RISK,
    why: "Material period-over-period movement warrants executive review.",
    actionUp: "Assign an owner to investigate drivers within 48 hours.",
    actionDown: "Monitor closely through the next operating review.",
  };

  const dir = directionWord(worse, parsed);
  const unit = unitLabel(parsed);
  const magnitudeText = `${parsed.magnitude}${unit}`;
  const polarity = worse ? "deteriorated" : "improved";

  let confidence = THRESHOLDS.CONFIDENCE.kpiBase;
  if (parsed.kind === "pct" && parsed.magnitude >= THRESHOLDS.KPI_DELTA_PCT_ALERT * 2) {
    confidence = THRESHOLDS.CONFIDENCE.kpiStrongDelta;
  }
  if (opts.elevated) confidence = Math.max(confidence, THRESHOLDS.CONFIDENCE.trendElevated);
  if (!worse) confidence = Math.min(confidence, THRESHOLDS.CONFIDENCE.gainBase + 4);

  const title = worse
    ? `${kpi.name} ${dir} ${magnitudeText} versus last period`
    : `${kpi.name} improved ${magnitudeText} versus last period`;

  const explanation =
    `${kpi.name} is ${dir} ${magnitudeText} versus last period ` +
    `(current value ${kpi.value}). Performance has ${polarity} on this signal` +
    (opts.elevated
      ? ", and the underlying series shows a multi-period rise that elevates recurrence risk."
      : ".");

  return {
    id: `rule-kpi-${kpi.id}-${worse ? "risk" : "gain"}`,
    title,
    category: meta.category,
    confidence,
    explanation,
    whyItMatters: meta.why,
    recommendedAction: worse ? meta.actionUp : meta.actionDown,
  };
}

function buildDeptInsight(dept) {
  const gap = Number((dept.benchmark - dept.score).toFixed(1));
  const confidence = Math.min(95, THRESHOLDS.CONFIDENCE.deptBase + Math.floor(gap));

  return {
    id: `rule-dept-${dept.id}`,
    title: `${dept.name} trails peer benchmark by ${gap} points`,
    category: CATEGORY.OP_RISK,
    confidence,
    explanation:
      `${dept.name} scores ${dept.score} versus a peer benchmark of ${dept.benchmark} ` +
      `(${gap} points below). That gap exceeds the ${THRESHOLDS.DEPT_GAP_POINTS}-point risk threshold.`,
    whyItMatters:
      "Service lines lagging peers usually concentrate staffing, throughput, or revenue-cycle friction that will surface in quality and margin if unaddressed.",
    recommendedAction: `Prioritize a focused ops review in ${dept.name}; export practices from peer-leading departments and set a 30-day close-the-gap plan.`,
  };
}

function rankInsights(list) {
  const catWeight = {
    [CATEGORY.OP_RISK]: 0,
    [CATEGORY.QUALITY]: 1,
    [CATEGORY.COST]: 2,
    [CATEGORY.EXPERIENCE]: 3,
  };
  return [...list].sort((a, b) => {
    const cw = (catWeight[a.category] ?? 9) - (catWeight[b.category] ?? 9);
    if (cw !== 0) return cw;
    return b.confidence - a.confidence;
  });
}

/**
 * @param {Kpi[]} kpis
 * @param {Scorecard[]} departmentScorecards
 * @param {{ edWaitTrend?: TrendPoint[] }} [options]
 * @returns {Insight[]}
 */
export function generateInsights(kpis = [], departmentScorecards = [], options = {}) {
  /** @type {Insight[]} */
  const out = [];
  const seen = new Set();

  const push = (insight) => {
    if (!insight || seen.has(insight.id)) return;
    seen.add(insight.id);
    out.push(insight);
  };

  for (const kpi of kpis) {
    if (!kpi?.delta) continue;
    const parsed = parseDelta(kpi.delta);
    if (!isMaterialDelta(parsed)) continue;
    const worse = isDeterioration(kpi, parsed);

    let elevated = false;
    if (kpi.id === "edwait" && options.edWaitTrend?.length) {
      elevated = trailingRiseStreak(options.edWaitTrend) >= THRESHOLDS.TREND_RISE_STREAK;
    } else if (
      kpi.id === "edwait" &&
      worse &&
      parsed.kind === "pct" &&
      parsed.magnitude >= THRESHOLDS.KPI_DELTA_PCT_ALERT * 2
    ) {
      elevated = true;
    }

    if (
      worse ||
      kpi.id === "revenue" ||
      kpi.id === "margin" ||
      kpi.id === "sat" ||
      kpi.id === "readmit"
    ) {
      push(buildKpiInsight(kpi, worse, parsed, { elevated }));
    }
  }

  for (const dept of departmentScorecards) {
    if (dept == null || typeof dept.score !== "number" || typeof dept.benchmark !== "number") {
      continue;
    }
    const gap = dept.benchmark - dept.score;
    if (gap > THRESHOLDS.DEPT_GAP_POINTS) {
      push(buildDeptInsight(dept));
    }
  }

  if (options.edWaitTrend?.length) {
    const streak = trailingRiseStreak(options.edWaitTrend);
    if (streak >= THRESHOLDS.TREND_RISE_STREAK) {
      const last = options.edWaitTrend[options.edWaitTrend.length - 1];
      const first = options.edWaitTrend[options.edWaitTrend.length - 1 - streak];
      const rise = last && first ? last.value - first.value : 0;
      push({
        id: "rule-trend-edwait-streak",
        title: `ED wait signal rising for ${streak} consecutive periods`,
        category: CATEGORY.OP_RISK,
        confidence: THRESHOLDS.CONFIDENCE.trendElevated,
        explanation:
          `ED-related trend values increased across the last ${streak} periods` +
          (rise ? ` (net +${rise} on the tracked series ending at ${last.value})` : "") +
          ". Recurring upward drift raises confidence that this is structural, not noise.",
        whyItMatters: KPI_META.edwait.why,
        recommendedAction: KPI_META.edwait.actionUp,
      });
    }
  }

  const ranked = rankInsights(out).slice(0, THRESHOLDS.MAX_INSIGHTS);
  if (ranked.length === 0) {
    return MANUAL_INSIGHT_FALLBACK.slice(0, 3);
  }
  return ranked;
}
