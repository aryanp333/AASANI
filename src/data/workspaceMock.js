/** @typedef {'7D' | '30D' | '90D'} Timeframe */

export const demoOrganizations = [
  "Northbridge Health System",
  "Summit Care Network",
  "Meridian Medical Group",
  "Coastal Regional",
  "Atlas Health Partners",
  "Pioneer Clinical",
];

/**
 * Healthcare boot / integration system names (no empty entries).
 * Fixed list — length must match expected checklist row count.
 */
export const bootSystems = [
  "Electronic Health Record",
  "Revenue Cycle",
  "Scheduling",
  "Laboratory",
  "HR",
  "Patient Experience",
  "FHIR APIs",
];

/**
 * Per-timeframe mock datasets for Executive Workspace.
 * Structure: mockData[timeframe].{ kpis, departments, trend, insights, summary }
 * Ready to swap for real API payloads later.
 */
export const mockData = {
  "7D": {
    label: "Last 7 days",
    kpis: [
      { id: "admissions", label: "Admissions", value: "982", raw: 982, delta: "+2.1%", up: true },
      { id: "revenue", label: "Revenue", value: "$9.8M", raw: 9.8, delta: "+1.4%", up: true },
      { id: "margin", label: "Operating Margin", value: "7.9%", raw: 7.9, delta: "-0.2 pts", up: false },
      { id: "alos", label: "Avg. Length of Stay", value: "4.4 days", raw: 4.4, delta: "+0.1", up: false },
      { id: "readmit", label: "Readmission Rate", value: "11.8%", raw: 11.8, delta: "+0.3 pts", up: false },
      { id: "sat", label: "Patient Satisfaction", value: "86.1", raw: 86.1, delta: "-0.4", up: false },
      { id: "edwait", label: "ED Wait Time", value: "128 min", raw: 128, delta: "+6%", up: false },
    ],
    departments: [
      { dept: "Emergency", score: 68, peer: 76 },
      { dept: "Surgery", score: 90, peer: 84 },
      { dept: "Medicine", score: 79, peer: 78 },
      { dept: "Women's Health", score: 93, peer: 86 },
      { dept: "Outpatient", score: 83, peer: 81 },
      { dept: "Revenue Cycle", score: 71, peer: 79 },
    ],
    trend: [
      { period: "Mon", admissions: 128, revenue: 1.2 },
      { period: "Tue", admissions: 152, revenue: 1.5 },
      { period: "Wed", admissions: 161, revenue: 1.6 },
      { period: "Thu", admissions: 140, revenue: 1.4 },
      { period: "Fri", admissions: 148, revenue: 1.5 },
      { period: "Sat", admissions: 132, revenue: 1.3 },
      { period: "Sun", admissions: 121, revenue: 1.3 },
    ],
    insights: [
      {
        id: "7d-1",
        title: "ED wait times rose 6% this week",
        category: "Operational Risk",
        confidence: 91,
        explanation:
          "Median door-to-provider time increased, driven primarily by a 19% jump in Tuesday/Wednesday volume versus the prior week.",
        why: "Prolonged boarding compresses inpatient beds later in the week and depresses patient satisfaction in the emergency department.",
        action: "Shift 2 additional triage staff to Tuesday and Wednesday afternoon peaks; stage discharge facilitation by 11:00 a.m.",
      },
      {
        id: "7d-2",
        title: "Operating margin softened 0.2 pts",
        category: "Cost",
        confidence: 84,
        explanation:
          "Agency nursing hours in Medicine rose 11% week-over-week while elective OR case volume held flat.",
        why: "Labor cost outpacing revenue this week signals an early margin risk heading into the next census spike.",
        action: "Pull from float pool before agency and freeze non-urgent elective OT until census stabilizes.",
      },
      {
        id: "7d-3",
        title: "Readmission rate edged higher",
        category: "Quality",
        confidence: 78,
        explanation:
          "7-day all-cause readmissions increased 0.3 pts, concentrated in Medicine discharges after Friday handoffs.",
        why: "Weekend care transitions without next-day follow-up increase avoidable utilization and quality penalties.",
        action: "Require post-acute outreach within 24 hours for high-risk Medicine discharges Fri–Sun.",
      },
      {
        id: "7d-4",
        title: "Patient satisfaction dipped in ED",
        category: "Patient Experience",
        confidence: 82,
        explanation:
          "Top-box likelihood-to-recommend fell 0.4 points after multi-hour waits Tue–Wed evening.",
        why: "Experience scores trail ED wait performance by 24–48 hours and will feed this month’s public reporting pack.",
        action: "Stand up bedside liaison shifts for stays over 90 minutes; auto-notify charge nurse at 75 minutes.",
      },
    ],
    summary: {
      headline: "Weekly operations strong in surgery; ED capacity is the primary headwind",
      keyMetrics: [
        { label: "Admissions", value: "982", note: "+2.1% vs prior 7D" },
        { label: "Revenue", value: "$9.8M", note: "+1.4% vs prior 7D" },
        { label: "ED Wait", value: "128 min", note: "+6% vs prior 7D" },
      ],
      narrative:
        "Northbridge posted solid elective and surgical throughput this week, but emergency boarding compressed flow and nudged satisfaction lower. Labor costs briefly outpaced revenue on agency hours in Medicine. Leadership priority: rebalance ED triage for mid-week peaks before the pattern sets for the month.",
    },
  },
  "30D": {
    label: "Last 30 days",
    kpis: [
      { id: "admissions", label: "Admissions", value: "4,218", raw: 4218, delta: "+3.2%", up: true },
      { id: "revenue", label: "Revenue", value: "$42.6M", raw: 42.6, delta: "+5.8%", up: true },
      { id: "margin", label: "Operating Margin", value: "8.4%", raw: 8.4, delta: "+0.6 pts", up: true },
      { id: "alos", label: "Avg. Length of Stay", value: "4.2 days", raw: 4.2, delta: "-0.3", up: true },
      { id: "readmit", label: "Readmission Rate", value: "11.2%", raw: 11.2, delta: "-0.8 pts", up: true },
      { id: "sat", label: "Patient Satisfaction", value: "87.4", raw: 87.4, delta: "+1.2", up: true },
      { id: "edwait", label: "ED Wait Time", value: "142 min", raw: 142, delta: "+13%", up: false },
    ],
    departments: [
      { dept: "Emergency", score: 72, peer: 78 },
      { dept: "Surgery", score: 88, peer: 84 },
      { dept: "Medicine", score: 81, peer: 79 },
      { dept: "Women's Health", score: 91, peer: 86 },
      { dept: "Outpatient", score: 85, peer: 82 },
      { dept: "Revenue Cycle", score: 76, peer: 80 },
    ],
    trend: [
      { period: "W1", admissions: 980, revenue: 9.8 },
      { period: "W2", admissions: 1012, revenue: 10.1 },
      { period: "W3", admissions: 1045, revenue: 10.4 },
      { period: "W4", admissions: 1181, revenue: 12.3 },
    ],
    insights: [
      {
        id: "30d-1",
        title: "ED wait times rose 13% this month",
        category: "Operational Risk",
        confidence: 94,
        explanation:
          "Driven primarily by a 22% increase in Tuesday/Wednesday volume and longer boarding when ICU beds were tight late-month.",
        why: "Persistent boarding elevates LWBS risk, lowers HCAHPS-adjacent ED experience, and can cascade into higher ALOS.",
        action: "Shift 2 additional triage nurses Tue/Wed 14:00–22:00 and expand rapid admission pathways for ESI 3.",
      },
      {
        id: "30d-2",
        title: "Readmissions improved 0.8 pts",
        category: "Quality",
        confidence: 88,
        explanation:
          "Medicine care-transition program and Pharmacy discharge counseling correlated with fewer 30-day returns.",
        why: "Quality gains protect value-based contracts and free capacity already strained by ED demand.",
        action: "Expand care-transition coverage to Women’s Health and Surgery same-day discharges.",
      },
      {
        id: "30d-3",
        title: "Operating margin expanded 0.6 pts",
        category: "Cost",
        confidence: 86,
        explanation:
          "Elective surgical revenue growth and a 4% reduction in overtime hours offset rising ED labor intensity.",
        why: "Margin resilience matters while leadership invests in ED capacity remediations.",
        action: "Ring-fence portion of surgical margin uplift for ED throughput tools and staffing float bank.",
      },
      {
        id: "30d-4",
        title: "Patient satisfaction recovered overall",
        category: "Patient Experience",
        confidence: 80,
        explanation:
          "System NPS-proxy rose 1.2 points on inpatient floors even as ED scores lagged boarding delays.",
        why: "Outpatient and floor experience gains will not fully compensate if ED delay narrative dominates public commentary.",
        action: "Publish transparent wait estimates in ED lobby kiosks; coach charge teams on hourly bedside updates.",
      },
      {
        id: "30d-5",
        title: "Revenue cycle trailing peers",
        category: "Cost",
        confidence: 77,
        explanation:
          "Authorization-related denials ticked up in outpatient imaging; clean claim rate sits 3 pts below peer median.",
        why: "Cash acceleration lag can mute reported monthly revenue strength.",
        action: "Deploy pre-service eligibility checks at scheduling for top-volume imaging orders.",
      },
    ],
    summary: {
      headline: "Strong month for revenue and quality; ED wait times remain the strategic risk",
      keyMetrics: [
        { label: "Admissions", value: "4,218", note: "+3.2% vs prior 30D" },
        { label: "Revenue", value: "$42.6M", note: "+5.8% vs prior 30D" },
        { label: "Operating Margin", value: "8.4%", note: "+0.6 pts vs prior 30D" },
      ],
      narrative:
        "Across the last 30 days, Northbridge grew admissions and revenue while improving readmissions and length of stay. Margin expanded on surgical productivity. The counterweight is a 13% rise in emergency wait times, concentrating risk in mid-week afternoons. Recommended focus: rebalance ED staffing and protect hard-won quality gains as volume continues.",
    },
  },
  "90D": {
    label: "Last 90 days",
    kpis: [
      { id: "admissions", label: "Admissions", value: "12,640", raw: 12640, delta: "+4.7%", up: true },
      { id: "revenue", label: "Revenue", value: "$124.2M", raw: 124.2, delta: "+6.9%", up: true },
      { id: "margin", label: "Operating Margin", value: "8.1%", raw: 8.1, delta: "+0.4 pts", up: true },
      { id: "alos", label: "Avg. Length of Stay", value: "4.3 days", raw: 4.3, delta: "-0.2", up: true },
      { id: "readmit", label: "Readmission Rate", value: "11.5%", raw: 11.5, delta: "-0.5 pts", up: true },
      { id: "sat", label: "Patient Satisfaction", value: "86.9", raw: 86.9, delta: "+0.8", up: true },
      { id: "edwait", label: "ED Wait Time", value: "136 min", raw: 136, delta: "+9%", up: false },
    ],
    departments: [
      { dept: "Emergency", score: 70, peer: 77 },
      { dept: "Surgery", score: 86, peer: 84 },
      { dept: "Medicine", score: 82, peer: 80 },
      { dept: "Women's Health", score: 89, peer: 86 },
      { dept: "Outpatient", score: 87, peer: 83 },
      { dept: "Revenue Cycle", score: 74, peer: 80 },
    ],
    trend: [
      { period: "M1", admissions: 3980, revenue: 39.1 },
      { period: "M2", admissions: 4240, revenue: 41.5 },
      { period: "M3", admissions: 4420, revenue: 43.6 },
    ],
    insights: [
      {
        id: "90d-1",
        title: "Quarterly ED performance lagging peers",
        category: "Operational Risk",
        confidence: 92,
        explanation:
          "90-day median waits remain elevated versus regional peers even as monthly admissions grew 4.7%.",
        why: "Sustained ED friction threatens quarterly quality scorecards and community perception.",
        action: "Standing multi-disciplinary ED throughput committee with weekly bed command authority.",
      },
      {
        id: "90d-2",
        title: "Surgical service line driving quarter growth",
        category: "Cost",
        confidence: 89,
        explanation:
          "Elective cases up across orthopedics and general surgery contributed disproportionately to the $124.2M revenue base.",
        why: "Protecting block utilization sustains margin while ED investments are funded.",
        action: "Hold surgeon-priority blocks for high-margin service lines; release unused time at T-72h.",
      },
      {
        id: "90d-3",
        title: "Readmissions trend favorable quarter-to-date",
        category: "Quality",
        confidence: 85,
        explanation:
          "All-cause readmissions improved 0.5 pts vs prior quarter after care-transition expansion.",
        why: "Quality trajectory supports value-based reimbursements and frees capacity.",
        action: "Codify the Medicine discharge bundle as system standard for FY next quarter.",
      },
      {
        id: "90d-4",
        title: "Patient experience mixed across access points",
        category: "Patient Experience",
        confidence: 79,
        explanation:
          "Inpatient and ambulatory scores improved while ED stayed the lowest-scoring access channel for 90 days.",
        why: "Board reporting will highlight experience disparity unless ED access improves.",
        action: "Invest in ED lobby experience redesign pilot at main campus first.",
      },
    ],
    summary: {
      headline: "Solid 90-day growth and quality trajectory; emergency access remains a board-level theme",
      keyMetrics: [
        { label: "Admissions", value: "12,640", note: "+4.7% vs prior 90D" },
        { label: "Revenue", value: "$124.2M", note: "+6.9% vs prior 90D" },
        { label: "ED Wait", value: "136 min", note: "+9% vs prior 90D" },
      ],
      narrative:
        "Over the last 90 days, cumulative admissions and revenue expanded with healthy surgical contribution and improved quality indicators. Operating margin held above 8%. Board discussion should balance growth success with chronic emergency wait times that still trail peers—an issue that recurs monthly and will not self-correct without capacity redesign.",
    },
  },
};

export const suggestedChatPrompts = [
  "Why did readmissions change this period?",
  "Which department is most at risk?",
  "Why are ED wait times elevated?",
  "Summarize margin drivers for leadership",
];

/**
 * Lightweight rule-based "AI" responses grounded in mockData.
 */
export function answerHealthcareQuestion(question, timeframe, orgName) {
  const data = mockData[timeframe] || mockData["30D"];
  const q = question.toLowerCase();
  const kpi = (id) => data.kpis.find((k) => k.id === id);
  const ed = kpi("edwait");
  const readmit = kpi("readmit");
  const margin = kpi("margin");
  const revenue = kpi("revenue");
  const worst = [...data.departments].sort((a, b) => a.score - b.score)[0];
  const best = [...data.departments].sort((a, b) => b.score - a.score)[0];

  if (q.includes("readmit")) {
    return {
      text: `For ${orgName} over ${data.label}, readmission rate is ${readmit.value} (${readmit.delta} vs prior period). ${
        readmit.up === false
          ? "The improvement tracks with care-transition outreach and pharmacy counseling on high-risk Medicine discharges."
          : "The uptick is concentrated after late-week discharges without next-day outreach."
      } AASANI recommends standardizing post-acute callbacks within 24 hours for high-risk cohorts.`,
      refs: ["readmit", timeframe],
    };
  }
  if (q.includes("ed") || q.includes("wait") || q.includes("emergency")) {
    return {
      text: `ED wait time is currently ${ed.value} for ${data.label} (${ed.delta} vs prior). Mid-week afternoon volume and boarding when inpatient beds are tight explain most of the delay. Emergency department peer gap: score ${worst?.dept === "Emergency" ? worst.score : data.departments.find((d) => d.dept === "Emergency")?.score} vs peer benchmark. Recommended action: add triage capacity Tue/Wed peaks and accelerate discharge-by-11 pathways.`,
      refs: ["edwait", timeframe],
    };
  }
  if (q.includes("margin") || q.includes("cost") || q.includes("profit")) {
    return {
      text: `Operating margin sits at ${margin.value} (${margin.delta}). Revenue for the period is ${revenue.value}. Surgical productivity and labor mix are the dominant margin drivers; agency hours in Medicine and ED intensity are the primary offsets. Protect elective block utilization while funding ED float resources.`,
      refs: ["margin", "revenue", timeframe],
    };
  }
  if (q.includes("risk") || q.includes("department") || q.includes("which")) {
    return {
      text: `Among departments for ${data.label}, ${worst.dept} is most at risk of underperformance (score ${worst.score} vs peer ${worst.peer}). ${best.dept} is the relative bright spot (score ${best.score}). Leadership should prioritize capacity and labor actions in ${worst.dept} while exporting practices from ${best.dept}.`,
      refs: ["departments", timeframe],
    };
  }
  if (q.includes("revenue") || q.includes("admission")) {
    const adm = kpi("admissions");
    return {
      text: `${orgName} recorded ${adm.value} admissions and ${revenue.value} revenue over ${data.label} (${adm.delta} and ${revenue.delta} respectively). Growth is solid, but ED access and revenue cycle clean claims remain watch-items for cash realization.`,
      refs: ["admissions", "revenue", timeframe],
    };
  }

  // Default grounded overview
  return {
    text: `Here is what AASANI sees for ${orgName} in ${data.label}: admissions ${kpi("admissions").value}, revenue ${revenue.value}, margin ${margin.value}, readmissions ${readmit.value}, ED wait ${ed.value}. Strongest department score is ${best.dept}; weakest relative to peers is ${worst.dept}. Ask about readmissions, ED waits, margin, or department risk for a deeper drill-down.`,
    refs: [timeframe],
  };
}

export const healthcareConnectors = [
  {
    name: "EHR",
    title: "Electronic Health Record",
    blurb:
      "Ingests encounters, diagnoses, orders, and discharge events via FHIR and vendor interfaces. Normalizes to a common clinical event model.",
  },
  {
    name: "Scheduling",
    title: "Scheduling & Capacity",
    blurb:
      "Pulls OR blocks, clinic templates, and appointment fills to forecast demand and measure no-show risk.",
  },
  {
    name: "Laboratory",
    title: "Laboratory Systems",
    blurb:
      "Captures turnaround times and critical-result pathways that influence length of stay and safety events.",
  },
  {
    name: "HR",
    title: "HR & Workforce",
    blurb:
      "Links staffing mix, overtime, and agency hours to volume and quality outcomes for cost intelligence.",
  },
  {
    name: "Patient Experience",
    title: "Patient Experience",
    blurb:
      "Streams survey and real-time feedback signals correlated with wait times and care transitions.",
  },
  {
    name: "FHIR / HL7",
    title: "FHIR & HL7 Interfaces",
    blurb:
      "Standards-based pipelines for interoperability—AASANI normalizes HL7/FHIR payloads into governed metrics.",
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Connect your systems",
    body: "Secure connectors to EHR, scheduling, labs, HR, patient experience, and FHIR/HL7 feeds—read-only where required.",
  },
  {
    step: "02",
    title: "AASANI normalizes & analyzes",
    body: "Events map to a shared clinical–operational model. AI layers trends, peers, and drivers across departments.",
  },
  {
    step: "03",
    title: "AI-driven insights in your workspace",
    body: "Leaders get live KPIs, ranked recommendations, board reports, and natural-language answers—inside one workspace.",
  },
];
