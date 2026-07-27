export const heroMetrics = [
  { label: "Health systems connected", value: 340, suffix: "+" },
  { label: "Data sources unified", value: 12, suffix: "M daily events" },
  { label: "Executive decisions supported", value: 98, suffix: "% satisfaction" },
  { label: "Time to first insight", value: 6, suffix: " weeks avg." },
];

export const trustedOrganizations = [
  "Northbridge Health",
  "Summit Care Network",
  "Meridian Medical Group",
  "Coastal Regional",
  "Atlas Health Partners",
  "Pioneer Clinical",
];

export const problemPoints = [
  {
    title: "Disconnected applications",
    description:
      "EHR, scheduling, revenue cycle, and HR each tell a different story—with no shared context for leadership.",
  },
  {
    title: "Multiple dashboards",
    description:
      "Teams export the same metrics into parallel BI tools, creating conflicting versions of performance.",
  },
  {
    title: "Duplicate reporting",
    description:
      "Finance, operations, and clinical quality rebuild the same reports every month from raw extracts.",
  },
  {
    title: "Manual spreadsheets",
    description:
      "Critical decisions still depend on fragile Excel models that lag reality by weeks.",
  },
];

export const architectureLayers = [
  {
    title: "Hospital Systems",
    items: ["EHR", "Scheduling", "Revenue Cycle", "Lab", "HR", "Patient Experience"],
  },
  {
    title: "AASANI Integration Layer",
    items: ["FHIR", "HL7", "REST APIs", "Secure connectors", "Identity sync"],
  },
  {
    title: "Unified Data Platform",
    items: ["Clinical", "Operational", "Financial", "Workforce", "Quality"],
  },
  {
    title: "Executive Intelligence",
    items: ["KPIs", "Benchmarks", "Insights", "Board reports", "Alerts"],
  },
];

export const executiveKpis = [
  { id: "admissions", label: "Admissions", value: "4,218", delta: "+3.2%", up: true },
  { id: "revenue", label: "Revenue", value: "$42.6M", delta: "+5.8%", up: true },
  { id: "margin", label: "Operating Margin", value: "8.4%", delta: "+0.6 pts", up: true },
  { id: "alos", label: "Avg. Length of Stay", value: "4.2 days", delta: "-0.3", up: true },
  { id: "readmit", label: "Readmission Rate", value: "11.2%", delta: "-0.8 pts", up: true },
  { id: "sat", label: "Patient Satisfaction", value: "87.4", delta: "+1.2", up: true },
  { id: "edwait", label: "ED Wait Time", value: "142 min", delta: "+13%", up: false },
];

export const departmentBenchmark = [
  { dept: "Emergency", score: 72, peer: 78 },
  { dept: "Surgery", score: 88, peer: 84 },
  { dept: "Medicine", score: 81, peer: 79 },
  { dept: "Women's Health", score: 91, peer: 86 },
  { dept: "Outpatient", score: 85, peer: 82 },
  { dept: "Revenue Cycle", score: 76, peer: 80 },
];

export const trendSeries = [
  { week: "W1", admissions: 980, revenue: 9.8, margin: 7.9 },
  { week: "W2", admissions: 1012, revenue: 10.1, margin: 8.0 },
  { week: "W3", admissions: 1045, revenue: 10.4, margin: 8.1 },
  { week: "W4", admissions: 1020, revenue: 10.2, margin: 8.3 },
  { week: "W5", admissions: 1088, revenue: 10.8, margin: 8.2 },
  { week: "W6", admissions: 1120, revenue: 11.1, margin: 8.4 },
];

export const strategicInsights = [
  {
    id: 1,
    title: "Emergency wait times increased by 13%",
    observation: "Median door-to-provider time rose across afternoon shifts.",
    impact: "Patient satisfaction in ED dropped 2.1 points week-over-week.",
    recommendation: "Adjust nurse scheduling to align with arrival peaks.",
    value: "Modeled 18% reduction in wait times within 30 days.",
    severity: "high",
  },
  {
    id: 2,
    title: "Surgery block utilization below peer benchmark",
    observation: "OR blocks idle 14% more than comparable regional systems.",
    impact: "Estimated $1.2M quarterly revenue opportunity.",
    recommendation: "Reallocate block time and enable dynamic release rules.",
    value: "Projected 6–9% uplift in surgical throughput.",
    severity: "medium",
  },
  {
    id: 3,
    title: "Denial rate spike in outpatient claims",
    observation: "Authorization-related denials up 9% in revenue cycle.",
    impact: "Cash acceleration delayed by an average of 11 days.",
    recommendation: "Deploy pre-service eligibility checks at scheduling.",
    value: "Recover $840K in net patient revenue this quarter.",
    severity: "medium",
  },
];

export const boardReports = [
  {
    id: "exec",
    title: "Executive Summary",
    description: "System-wide performance, risks, and strategic priorities.",
    pages: 12,
  },
  {
    id: "ops",
    title: "Operations",
    description: "Capacity, throughput, staffing, and patient flow.",
    pages: 18,
  },
  {
    id: "finance",
    title: "Finance",
    description: "Margin, revenue cycle, payer mix, and cash position.",
    pages: 16,
  },
  {
    id: "clinical",
    title: "Clinical Quality",
    description: "Outcomes, safety, readmissions, and quality indicators.",
    pages: 14,
  },
  {
    id: "rcm",
    title: "Revenue Cycle",
    description: "Denials, collections, AR days, and coding accuracy.",
    pages: 15,
  },
];

export const bootSystems = [
  "Electronic Health Record",
  "Revenue Cycle",
  "Scheduling",
  "Laboratory",
  "HR",
  "Patient Experience",
  "FHIR APIs",
];

export const integrations = [
  "Epic",
  "Oracle Health",
  "Cerner",
  "athenahealth",
  "MEDITECH",
  "NextGen",
  "Workday",
  "SAP",
  "Microsoft",
  "Power BI",
  "Snowflake",
  "FHIR",
  "HL7",
  "REST API",
];

export const securityFeatures = [
  { title: "HIPAA Ready", detail: "Designed for PHI handling with BAA-ready architecture." },
  { title: "SOC 2 Ready", detail: "Controls aligned to enterprise audit requirements." },
  { title: "Encryption", detail: "Data encrypted in transit and at rest with modern TLS." },
  { title: "Audit Logs", detail: "Immutable activity trails for compliance and forensics." },
  { title: "Role Based Access", detail: "Granular permissions mapped to clinical and admin roles." },
  { title: "Cloud Infrastructure", detail: "Resilient, monitored deployment on enterprise cloud." },
];

export const pricingTiers = [
  {
    name: "Professional",
    description: "Regional hospitals and multi-site groups standardizing executive visibility.",
    price: "Custom",
    features: [
      "Unified executive workspace",
      "Core integrations (EHR, RCM, scheduling)",
      "Standard insights & alerts",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    description: "IDNs and health systems requiring cross-department intelligence at scale.",
    price: "Custom",
    featured: true,
    features: [
      "Everything in Professional",
      "Advanced benchmarking",
      "Board-ready reporting suite",
      "Dedicated customer success",
      "SSO & RBAC",
    ],
  },
  {
    name: "Enterprise Plus",
    description: "Complex enterprises with custom data estates and governance requirements.",
    price: "Custom",
    features: [
      "Everything in Enterprise",
      "Custom integration program",
      "Private deployment options",
      "Executive advisory workshops",
      "24/7 priority support",
    ],
  },
];

export const resources = [
  {
    title: "The Healthcare Intelligence Layer",
    type: "Guide",
    description: "How to unify operational, financial, and clinical data without replacing core systems.",
  },
  {
    title: "Executive KPIs That Matter",
    type: "Brief",
    description: "A framework for board-level metrics in modern health systems.",
  },
  {
    title: "Integration Playbook",
    type: "Technical",
    description: "Connecting EHR, RCM, and workforce systems through FHIR and HL7.",
  },
  {
    title: "From Fragmentation to Decisions",
    type: "Webinar",
    description: "How CIOs and COOs align on a single source of truth.",
  },
];

export const solutions = [
  {
    title: "Operational Intelligence",
    description:
      "Monitor capacity, patient flow, and department performance in one workspace—aligned to daily stand-ups and weekly ops reviews.",
  },
  {
    title: "Financial Performance",
    description:
      "Connect revenue cycle, margin, and payer mix to operational drivers executives can act on immediately.",
  },
  {
    title: "Clinical & Quality",
    description:
      "Surface readmissions, length of stay, and satisfaction alongside operational context—not in isolation.",
  },
  {
    title: "Workforce & Scheduling",
    description:
      "Link staffing patterns to wait times, overtime, and patient experience without exporting to spreadsheets.",
  },
];
