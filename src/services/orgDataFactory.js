/**
 * Seeded synthetic period data for orgs without curated workspaceMock.
 * Deterministic per (orgId + period) so demos don't jitter on every render.
 */

/** @typedef {import('./orgs.js').Organization} Organization */

const DEPT_NAMES = [
  "Emergency",
  "Surgery",
  "Medicine",
  "Women's Health",
  "Outpatient",
  "Revenue Cycle",
];

/**
 * @param {string} str
 * @returns {number}
 */
function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Mulberry32 PRNG
 * @param {number} seed
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function round(n, digits = 1) {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

/**
 * @param {() => number} rand
 * @param {number} min
 * @param {number} max
 */
function randBetween(rand, min, max) {
  return min + rand() * (max - min);
}

function formatDeltaPct(value, favorableWhenPositive) {
  const sign = value >= 0 ? "+" : "";
  const up = favorableWhenPositive ? value >= 0 : value <= 0;
  return { delta: `${sign}${round(value, 1)}%`, up };
}

function formatDeltaPts(value, favorableWhenPositive) {
  const sign = value >= 0 ? "+" : "";
  const up = favorableWhenPositive ? value >= 0 : value <= 0;
  return { delta: `${sign}${round(value, 1)} pts`, up };
}

/**
 * Scale Northbridge-like baselines by bed count (Northbridge ~620 beds).
 * @param {Organization} org
 * @param {'7D'|'30D'|'90D'|string} period
 */
export function generateSyntheticPeriodData(org, period = "30D") {
  const rand = mulberry32(hashSeed(`${org.id}::${period}`));
  const scale = clamp(org.bedCount / 620, 0.28, 1.15);

  const periodScale =
    period === "7D" ? 0.23 : period === "90D" ? 3.0 : 1.0;

  const admissionsRaw = Math.round(
    randBetween(rand, 3800, 4600) * scale * periodScale,
  );
  const revenueRaw = round(randBetween(rand, 36, 48) * scale * periodScale, 1);
  const marginRaw = round(randBetween(rand, 5.5, 9.2), 1);
  const alosRaw = round(randBetween(rand, 3.9, 4.9), 1);
  const readmitRaw = round(randBetween(rand, 10.2, 13.5), 1);
  const satRaw = round(randBetween(rand, 82, 91), 1);
  const edwaitRaw = Math.round(randBetween(rand, 95, 165));

  const admDelta = randBetween(rand, -2.5, 6);
  const revDelta = randBetween(rand, -1.5, 8);
  const marginDelta = randBetween(rand, -0.8, 1.0);
  const alosDelta = randBetween(rand, -0.4, 0.35);
  const readmitDelta = randBetween(rand, -1.2, 0.9);
  const satDelta = randBetween(rand, -1.5, 2.0);
  const edDelta = randBetween(rand, -4, 16);

  const admD = formatDeltaPct(admDelta, true);
  const revD = formatDeltaPct(revDelta, true);
  const marD = formatDeltaPts(marginDelta, true);
  const alosD = {
    delta: `${alosDelta >= 0 ? "+" : ""}${round(alosDelta, 1)}`,
    up: alosDelta <= 0,
  };
  const readD = formatDeltaPts(readmitDelta, false);
  const satD = {
    delta: `${satDelta >= 0 ? "+" : ""}${round(satDelta, 1)}`,
    up: satDelta >= 0,
  };
  const edD = formatDeltaPct(edDelta, false);

  const kpis = [
    {
      id: "admissions",
      name: "Admissions",
      value: admissionsRaw.toLocaleString("en-US"),
      delta: admD.delta,
      unit: "",
      benchmark: null,
      up: admD.up,
      raw: admissionsRaw,
    },
    {
      id: "revenue",
      name: "Revenue",
      value: `$${revenueRaw.toFixed(1)}M`,
      delta: revD.delta,
      unit: "$",
      benchmark: null,
      up: revD.up,
      raw: revenueRaw,
    },
    {
      id: "margin",
      name: "Operating Margin",
      value: `${marginRaw}%`,
      delta: marD.delta,
      unit: "%",
      benchmark: null,
      up: marD.up,
      raw: marginRaw,
    },
    {
      id: "alos",
      name: "Avg. Length of Stay",
      value: `${alosRaw} days`,
      delta: alosD.delta,
      unit: "days",
      benchmark: null,
      up: alosD.up,
      raw: alosRaw,
    },
    {
      id: "readmit",
      name: "Readmission Rate",
      value: `${readmitRaw}%`,
      delta: readD.delta,
      unit: "%",
      benchmark: null,
      up: readD.up,
      raw: readmitRaw,
    },
    {
      id: "sat",
      name: "Patient Satisfaction",
      value: `${satRaw}`,
      delta: satD.delta,
      unit: "",
      benchmark: null,
      up: satD.up,
      raw: satRaw,
    },
    {
      id: "edwait",
      name: "ED Wait Time",
      value: `${edwaitRaw} min`,
      delta: edD.delta,
      unit: "min",
      benchmark: null,
      up: edD.up,
      raw: edwaitRaw,
    },
  ];

  const departments = DEPT_NAMES.map((name) => {
    const peer = org.benchmarkProfile[name] ?? 80;
    // Score wanders around the org's peer profile
    const offset = randBetween(rand, -12, 10);
    const score = Math.round(clamp(peer + offset, 55, 98));
    return {
      id: name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, ""),
      name,
      score,
      benchmark: peer,
      status:
        score >= peer + 3 ? "ahead" : score >= peer ? "on_pace" : "behind",
    };
  });

  const labels =
    period === "7D"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : period === "90D"
        ? ["M1", "M2", "M3"]
        : ["W1", "W2", "W3", "W4"];

  const baseAdm = admissionsRaw / labels.length;
  const baseRev = revenueRaw / labels.length;
  const trend = labels.map((label, i) => {
    const wave = 0.88 + (i / Math.max(labels.length - 1, 1)) * 0.22 + (rand() - 0.5) * 0.08;
    return {
      period: label,
      admissions: Math.round(baseAdm * wave),
      revenue: round(baseRev * wave, 1),
    };
  });

  const periodLabel =
    period === "7D" ? "Last 7 days" : period === "90D" ? "Last 90 days" : "Last 30 days";

  const headlineRisk = edD.up === false && edDelta > 5;
  const summary = {
    headline: headlineRisk
      ? `${org.name.split(" ")[0]} volume solid; ED access remains the primary operational risk`
      : `${org.name.split(" ")[0]} performance mixed; monitoring capacity and quality side-by-side`,
    keyMetrics: [
      {
        label: "Admissions",
        value: kpis[0].value,
        note: `${kpis[0].delta} vs prior ${period}`,
      },
      {
        label: "Revenue",
        value: kpis[1].value,
        note: `${kpis[1].delta} vs prior ${period}`,
      },
      {
        label: "ED Wait",
        value: kpis[6].value,
        note: `${kpis[6].delta} vs prior ${period}`,
      },
    ],
    summary:
      `${org.name} (${org.type}, ${org.bedCount} beds) shows synthetic demo metrics for ${periodLabel}. ` +
      `Admissions ${kpis[0].value} and revenue ${kpis[1].value} with operating margin ${kpis[2].value}. ` +
      `Department benchmarks reflect this org's ${org.type} peer profile. Demo data only.`,
  };

  return {
    label: periodLabel,
    kpis,
    departments,
    trend,
    summary,
  };
}
