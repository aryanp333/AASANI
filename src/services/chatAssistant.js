/**
 * Chat assistant: intent routing + answers built from live dataService payload.
 * No canned KPI numbers — templates interpolate current kpis / scorecards / insights.
 */

/**
 * @typedef {{ id: string, name: string, value: string, delta: string, unit?: string, up?: boolean }} Kpi
 * @typedef {{ id: string, name: string, score: number, benchmark: number, status?: string }} Scorecard
 * @typedef {{ id: string, title: string, category: string, confidence: number, explanation: string, whyItMatters: string, recommendedAction: string }} Insight
 */

/**
 * @typedef {'readmit'|'edwait'|'margin'|'revenue'|'admissions'|'sat'|'alos'|'department_risk'|'insight_overview'|'overview'} ChatIntent
 */

/**
 * Lightweight keyword → intent router (not the answer itself).
 * Prefer multi-character tokens; avoid bare "ed" (matches "changed", etc.).
 * @param {string} question
 * @returns {ChatIntent}
 */
export function resolveIntent(question) {
  const q = String(question || "").toLowerCase();

  // "readmissions" does not contain the substring "readmit" (readmi-s vs readmi-t)
  if (q.includes("readmission") || q.includes("readmit") || /\bre-admit/.test(q)) {
    return "readmit";
  }
  if (
    /\bed\b/.test(q) ||
    q.includes("ed wait") ||
    q.includes("edwait") ||
    q.includes("emergency") ||
    q.includes("boarding") ||
    (q.includes("wait") && (q.includes("ed") || q.includes("door") || q.includes("triage")))
  ) {
    return "edwait";
  }
  if (q.includes("margin") || q.includes("cost") || q.includes("profit")) return "margin";
  if (q.includes("revenue") || q.includes("cash")) return "revenue";
  // Prefer exact admission volume over substring of "readmission" (already handled above)
  if (
    q.includes("admission") ||
    q.includes("admissions") ||
    q.includes("census") ||
    q.includes("volume")
  ) {
    return "admissions";
  }
  if (q.includes("satisfaction") || q.includes("hcahps") || q.includes("experience score")) {
    return "sat";
  }
  if (q.includes("length of stay") || q.includes("alos") || /\blos\b/.test(q)) return "alos";
  if (
    q.includes("risk") ||
    q.includes("department") ||
    q.includes("which dept") ||
    q.includes("service line") ||
    q.includes("benchmark")
  ) {
    return "department_risk";
  }
  if (q.includes("insight") || q.includes("recommend") || q.includes("action")) {
    return "insight_overview";
  }
  return "overview";
}

/**
 * @param {Kpi[]} kpis
 * @param {string} id
 */
function kpiById(kpis, id) {
  return kpis.find((k) => k.id === id) || null;
}

/**
 * Best-effort match of a computed insight to a KPI topic.
 * Prefer engine ids (`rule-kpi-<id>-*`) over loose text.
 * @param {Insight[]} insights
 * @param {Kpi|null} kpi
 */
function relatedInsight(insights, kpi) {
  if (!insights?.length) return null;
  if (!kpi) return insights[0] || null;

  const byId = insights.find(
    (ins) => ins.id === `rule-kpi-${kpi.id}-risk` || ins.id === `rule-kpi-${kpi.id}-gain` || ins.id.includes(`-${kpi.id}-`),
  );
  if (byId) return byId;

  const name = kpi.name.toLowerCase();
  const byTitle = insights.find((ins) => {
    const t = `${ins.title} ${ins.explanation}`.toLowerCase();
    if (t.includes(name)) return true;
    if (kpi.id === "edwait") {
      return t.includes("ed wait") || t.includes("emergency") || t.includes("boarding");
    }
    if (kpi.id === "readmit") {
      return t.includes("readmission");
    }
    return false;
  });
  if (byTitle) return byTitle;

  const categoryByKpi = {
    readmit: "Quality",
    alos: "Quality",
    edwait: "Operational Risk",
    margin: "Cost",
    revenue: "Cost",
    sat: "Patient Experience",
    admissions: "Operational Risk",
  };
  const cat = categoryByKpi[kpi.id];
  if (cat) {
    // Only attach same-category insight if its title token matches the KPI family
    const byCat = insights.find((ins) => {
      if (ins.category !== cat) return false;
      const t = ins.title.toLowerCase();
      if (kpi.id === "readmit") return t.includes("readmission") || t.includes("quality");
      if (kpi.id === "edwait") return t.includes("ed") || t.includes("emergency") || t.includes("wait");
      if (kpi.id === "margin") return t.includes("margin") || t.includes("cost");
      if (kpi.id === "revenue") return t.includes("revenue");
      if (kpi.id === "sat") return t.includes("satisfaction") || t.includes("experience");
      if (kpi.id === "alos") return t.includes("length") || t.includes("stay") || t.includes("alos");
      if (kpi.id === "admissions") return t.includes("admission") || t.includes("census");
      return false;
    });
    if (byCat) return byCat;
  }
  return null;
}

/**
 * @param {Scorecard[]} departments
 */
function rankDepartments(departments) {
  const scored = [...(departments || [])];
  const worst = [...scored].sort((a, b) => a.score - b.score)[0] || null;
  const best = [...scored].sort((a, b) => b.score - a.score)[0] || null;
  const biggestGap = [...scored]
    .map((d) => ({ ...d, gap: d.benchmark - d.score }))
    .sort((a, b) => b.gap - a.gap)[0] || null;
  return { worst, best, biggestGap };
}

/**
 * @param {Kpi} kpi
 * @param {string} orgName
 * @param {string} periodLabel
 * @param {Insight|null} insight
 */
function templateKpiAnswer(kpi, orgName, periodLabel, insight) {
  const polarity =
    typeof kpi.up === "boolean"
      ? kpi.up
        ? "that move is favorable for this metric"
        : "that move is unfavorable for this metric"
      : "review the direction against your performance targets";

  let text =
    `For ${orgName} over ${periodLabel}, ${kpi.name} is ${kpi.value} ` +
    `(${kpi.delta} vs prior period). AASANI reads ${polarity}.`;

  if (insight) {
    text +=
      ` Related insight (${insight.confidence}% confidence): ${insight.explanation}` +
      ` Why it matters: ${insight.whyItMatters}` +
      ` Recommended action: ${insight.recommendedAction}`;
  }

  return text;
}

/**
 * Build a chat reply from live payload after intent routing.
 *
 * @param {string} question
 * @param {{
 *   orgName: string,
 *   period: string,
 *   periodLabel: string,
 *   kpis: Kpi[],
 *   departments: Scorecard[],
 *   insights: Insight[],
 * }} ctx
 * @returns {{ text: string, refs: string[], intent: ChatIntent }}
 */
export function answerFromLiveData(question, ctx) {
  const {
    orgName,
    period,
    periodLabel,
    kpis = [],
    departments = [],
    insights = [],
  } = ctx;

  const intent = resolveIntent(question);
  const refs = [period, intent];

  if (intent === "department_risk") {
    const { worst, best, biggestGap } = rankDepartments(departments);
    if (!worst) {
      return {
        text: `I don't have department scorecards for ${orgName} in ${periodLabel} yet.`,
        refs,
        intent,
      };
    }

    const gapFocus = biggestGap && biggestGap.gap > 0 ? biggestGap : worst;
    const deptInsight = insights.find(
      (i) =>
        i.title.toLowerCase().includes(gapFocus.name.toLowerCase()) ||
        i.id.includes(gapFocus.id),
    );

    let text =
      `Among departments for ${orgName} in ${periodLabel}, ` +
      `${gapFocus.name} is most at risk (score ${gapFocus.score} vs peer ${gapFocus.benchmark}` +
      (gapFocus.gap != null && gapFocus.gap > 0 ? `, gap ${gapFocus.gap} pts` : "") +
      `). ` +
      (best
        ? `${best.name} is the relative bright spot (score ${best.score} vs peer ${best.benchmark}). `
        : "");

    if (deptInsight) {
      text += `${deptInsight.explanation} Recommended action: ${deptInsight.recommendedAction}`;
    } else {
      text += `Leadership should prioritize capacity and labor actions in ${gapFocus.name}`;
      if (best) text += ` while exporting practices from ${best.name}`;
      text += ".";
    }

    refs.push("departments", gapFocus.id);
    return { text, refs, intent };
  }

  if (intent === "insight_overview") {
    if (!insights.length) {
      return {
        text: `No ranked insights are available for ${orgName} in ${periodLabel}.`,
        refs,
        intent,
      };
    }
    const top = insights.slice(0, 3);
    const lines = top
      .map(
        (ins, i) =>
          `${i + 1}. [${ins.category}, ${ins.confidence}%] ${ins.title} — ${ins.explanation} Action: ${ins.recommendedAction}`,
      )
      .join(" ");
    return {
      text: `Top AASANI insights for ${orgName} (${periodLabel}): ${lines}`,
      refs: [...refs, ...top.map((i) => i.id)],
      intent,
    };
  }

  /** @type {Record<string, string>} */
  const intentToKpi = {
    readmit: "readmit",
    edwait: "edwait",
    margin: "margin",
    revenue: "revenue",
    admissions: "admissions",
    sat: "sat",
    alos: "alos",
  };

  if (intentToKpi[intent]) {
    const kpi = kpiById(kpis, intentToKpi[intent]);
    if (!kpi) {
      return {
        text: `I don't have a live ${intentToKpi[intent]} KPI for ${orgName} in ${periodLabel}.`,
        refs,
        intent,
      };
    }
    const insight = relatedInsight(insights, kpi);
    refs.push(kpi.id);
    if (insight) refs.push(insight.id);
    return {
      text: templateKpiAnswer(kpi, orgName, periodLabel, insight),
      refs,
      intent,
    };
  }

  // Overview — interpolate whatever KPIs exist
  const pick = (id) => kpiById(kpis, id);
  const adm = pick("admissions");
  const revenue = pick("revenue");
  const margin = pick("margin");
  const readmit = pick("readmit");
  const ed = pick("edwait");
  const { worst, best } = rankDepartments(departments);

  let text =
    `Here is what AASANI sees for ${orgName} in ${periodLabel}:` +
    (adm ? ` admissions ${adm.value} (${adm.delta})` : "") +
    (revenue ? `, revenue ${revenue.value} (${revenue.delta})` : "") +
    (margin ? `, margin ${margin.value} (${margin.delta})` : "") +
    (readmit ? `, readmissions ${readmit.value} (${readmit.delta})` : "") +
    (ed ? `, ED wait ${ed.value} (${ed.delta})` : "") +
    ".";

  if (best && worst) {
    text += ` Strongest department score is ${best.name} (${best.score}); weakest relative to peers is ${worst.name} (${worst.score} vs ${worst.benchmark}).`;
  }
  if (insights[0]) {
    text += ` Top insight: ${insights[0].title} — ${insights[0].explanation}`;
  }
  text += " Ask about readmissions, ED waits, margin, or department risk for a deeper drill-down.";

  refs.push("overview");
  return { text, refs, intent };
}
