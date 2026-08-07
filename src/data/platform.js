export const heroMetrics = [
  { label: "Companies connected", value: 1200, suffix: "+" },
  { label: "Database queries run daily", value: 48, suffix: "M" },
  { label: "Faster reporting cycles", value: 70, suffix: "%" },
  { label: "Time to first live dashboard", value: 14, suffix: " days avg." },
];

export const trustedOrganizations = [
  "Meridian Retail",
  "Atlas Manufacturing",
  "Northline Logistics",
  "Summit Financial",
  "Cedar & Co.",
  "Pioneer Ventures",
];

export const problemPoints = [
  {
    title: "Data trapped in silos",
    description:
      "Sales, finance, inventory, and support each live in separate databases—so no one sees the full picture of the business.",
  },
  {
    title: "Dashboards that disagree",
    description:
      "Every team exports CSVs into their own BI tool. Leadership meetings start with reconciling numbers instead of deciding.",
  },
  {
    title: "Reporting that takes weeks",
    description:
      "Analysts rebuild the same monthly packs from scratch while opportunities to act close quietly in the background.",
  },
  {
    title: "Insights lag reality",
    description:
      "Critical decisions still depend on stale spreadsheets that trail operations by days—or entire accounting periods.",
  },
];

export const architectureLayers = [
  {
    title: "Your company databases",
    items: ["PostgreSQL", "MySQL", "SQL Server", "Snowflake", "BigQuery", "MongoDB"],
  },
  {
    title: "AASANI integration layer",
    items: ["Secure connectors", "OAuth / SSO", "Read-only access", "CDC sync", "REST & GraphQL"],
  },
  {
    title: "Unified business data model",
    items: ["Revenue", "Customers", "Operations", "Inventory", "Workforce"],
  },
  {
    title: "Business intelligence workspace",
    items: ["KPIs", "Benchmarks", "Insights", "Alerts", "Board reports"],
  },
];

export const executiveKpis = [
  { id: "revenue", label: "Revenue", value: "$12.4M", delta: "+8.2%", up: true },
  { id: "profit", label: "Gross Profit", value: "$4.1M", delta: "+5.4%", up: true },
  { id: "margin", label: "Gross Margin", value: "33.1%", delta: "+1.2 pts", up: true },
  { id: "orders", label: "Orders", value: "28,410", delta: "+6.1%", up: true },
  { id: "customers", label: "Active Customers", value: "6,842", delta: "+412", up: true },
  { id: "nps", label: "NPS", value: "54", delta: "+3", up: true },
  { id: "churn", label: "Monthly Churn", value: "2.8%", delta: "+0.4 pts", up: false },
];

export const departmentBenchmark = [
  { dept: "Sales", score: 88, peer: 82 },
  { dept: "Marketing", score: 79, peer: 81 },
  { dept: "Operations", score: 91, peer: 85 },
  { dept: "Support", score: 84, peer: 80 },
  { dept: "Finance", score: 87, peer: 86 },
  { dept: "Supply Chain", score: 74, peer: 79 },
];

export const trendSeries = [
  { week: "W1", orders: 4200, revenue: 1.8, margin: 31.2 },
  { week: "W2", orders: 4380, revenue: 1.9, margin: 31.8 },
  { week: "W3", orders: 4510, revenue: 2.0, margin: 32.1 },
  { week: "W4", orders: 4420, revenue: 1.95, margin: 32.4 },
  { week: "W5", orders: 4780, revenue: 2.15, margin: 32.9 },
  { week: "W6", orders: 4920, revenue: 2.25, margin: 33.1 },
];

export const strategicInsights = [
  {
    id: 1,
    title: "Churn rose 0.4 pts among mid-market accounts",
    observation: "Support ticket volume up 22% in accounts with SLA breaches over 48 hours.",
    impact: "Projected $340K ARR at risk over the next two quarters.",
    recommendation: "Prioritize response SLAs for mid-market tiers and add churn-risk playbook alerts.",
    value: "Retain ~1.1% of ARR if SLA compliance recovers to baseline.",
    severity: "high",
  },
  {
    id: 2,
    title: "Gross margin opportunity in West region logistics",
    observation: "Fulfillment cost per order is 14% above peer warehouses with similar volume.",
    impact: "Estimated $210K quarterly COGS waste from route and carrier mix.",
    recommendation: "Rebalance carrier allocation and consolidate underperforming lanes.",
    value: "Modeled 90–120 bps margin expansion in West within 60 days.",
    severity: "medium",
  },
  {
    id: 3,
    title: "Sales pipeline velocity slowing on enterprise deals",
    observation: "Average cycle time for deals >$50K increased from 41 to 58 days.",
    impact: "Q2 close risk on $1.6M pipeline currently staged as commit.",
    recommendation: "Add stage-aging alerts and enable finance-assisted proposal packaging earlier.",
    value: "Recover 8–12 days cycle time on high-value opportunities.",
    severity: "medium",
  },
];

export const boardReports = [
  {
    id: "exec",
    title: "Executive Summary",
    description: "Company-wide performance, risks, and strategic priorities from live databases.",
    pages: 12,
  },
  {
    id: "ops",
    title: "Operations",
    description: "Throughput, fulfillment, inventory turns, and capacity utilization.",
    pages: 16,
  },
  {
    id: "finance",
    title: "Finance",
    description: "Revenue, margin, cash flow drivers, and budget variance.",
    pages: 14,
  },
  {
    id: "growth",
    title: "Growth & Customers",
    description: "Pipeline health, retention, cohort quality, and CAC efficiency.",
    pages: 13,
  },
  {
    id: "product",
    title: "Product & Support",
    description: "Usage, SLAs, ticket themes, and feature adoption signals.",
    pages: 11,
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
  "PostgreSQL",
  "MySQL",
  "SQL Server",
  "Snowflake",
  "BigQuery",
  "Redshift",
  "MongoDB",
  "Salesforce",
  "HubSpot",
  "Stripe",
  "SAP",
  "NetSuite",
  "Workday",
  "REST API",
  "GraphQL",
  "S3 / CSV",
];

export const securityFeatures = [
  {
    title: "Read-only database access",
    detail: "Connect with least-privilege credentials. AASANI never overwrites your source of truth.",
  },
  {
    title: "SOC 2 ready controls",
    detail: "Access, encryption, and change management designed for enterprise audits.",
  },
  {
    title: "Encryption everywhere",
    detail: "TLS in transit and AES-256 at rest for warehouse and workspace data.",
  },
  {
    title: "Audit logs",
    detail: "Immutable trails for every query, export, and admin action.",
  },
  {
    title: "Role-based access",
    detail: "Finance, ops, and leadership see only the domains they need.",
  },
  {
    title: "VPC & private link",
    detail: "Optional private networking for databases that never leave your cloud perimeter.",
  },
];

export const pricingTiers = [
  {
    name: "Growth",
    description: "Growing teams standardizing KPIs across 2–4 core databases.",
    price: "Custom",
    features: [
      "Up to 5 database connectors",
      "Live executive workspace",
      "Standard insights & alerts",
      "Email support",
    ],
  },
  {
    name: "Business",
    description: "Mid-market companies running multi-department intelligence at scale.",
    price: "Custom",
    featured: true,
    features: [
      "Everything in Growth",
      "Unlimited viewers",
      "Department benchmarking",
      "Board-ready report suite",
      "SSO & advanced RBAC",
      "Dedicated success manager",
    ],
  },
  {
    name: "Enterprise",
    description: "Complex data estates, private networking, and custom integration programs.",
    price: "Custom",
    features: [
      "Everything in Business",
      "Private VPC connectivity",
      "Custom data models",
      "SLA-backed support",
      "On-site implementation",
    ],
  },
];

export const resources = [
  {
    title: "Connecting company databases without chaos",
    type: "Guide",
    description: "How to plug AASANI into production warehouses while keeping security teams calm.",
  },
  {
    title: "The KPI stack modern operators need",
    type: "Brief",
    description: "A practical map from raw tables to revenue, margin, and customer health metrics.",
  },
  {
    title: "Integration playbook",
    type: "Technical",
    description: "PostgreSQL, Snowflake, CRM, and billing connectors—patterns that scale.",
  },
  {
    title: "From silos to decisions",
    type: "Webinar",
    description: "How CFOs and COOs align on a single live view of the business.",
  },
];

export const solutions = [
  {
    title: "Revenue & growth",
    description:
      "Unify CRM, billing, and product usage so sales, product, and finance share one pipeline-to-cash story.",
  },
  {
    title: "Operations & supply chain",
    description:
      "Monitor throughput, inventory, fulfillment cost, and on-time performance—linked to financial impact.",
  },
  {
    title: "Finance & profitability",
    description:
      "Live margins, budget variance, and unit economics pulled directly from your warehouse and ERP.",
  },
  {
    title: "Customer success",
    description:
      "Spot churn risk and expansion opportunity from support, usage, and contract data before renewals hit.",
  },
];

export const connectSteps = [
  {
    step: "01",
    title: "Connect your databases",
    body: "Secure, read-only connectors to Postgres, MySQL, SQL Server, Snowflake, BigQuery, and more.",
  },
  {
    step: "02",
    title: "Map business logic",
    body: "We model revenue, customers, ops, and costs so metrics mean the same thing company-wide.",
  },
  {
    step: "03",
    title: "Run the business from one workspace",
    body: "Live KPIs, strategic insights, alerts, and board reports that stay in sync with the source data.",
  },
];
