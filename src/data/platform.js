/** Marketing site copy for AASANI healthcare intelligence. No retail/BI templates. */

export const heroMetrics = [
  { label: "Health systems connected", value: 340, suffix: "+" },
  { label: "Data events unified daily", value: 12, suffix: "M" },
  { label: "Faster board reporting", value: 65, suffix: "%" },
  { label: "Time to first live workspace", value: 6, suffix: " weeks avg." },
];

export const trustedOrganizations = [
  "Northbridge Health System",
  "Summit Care Network",
  "Meridian Medical Group",
  "Coastal Regional",
  "Atlas Health Partners",
  "Pioneer Clinical",
];

export const architectureLayers = [
  {
    title: "Hospital Systems",
    items: ["EHR", "Revenue Cycle", "Scheduling", "Laboratory", "HR", "Patient Experience"],
  },
  {
    title: "AASANI Integration Layer",
    items: ["FHIR", "HL7", "Secure connectors", "Identity / SSO", "Audit logs"],
  },
  {
    title: "Unified Health Data Model",
    items: ["Clinical", "Operational", "Financial", "Workforce", "Quality"],
  },
  {
    title: "Executive Intelligence",
    items: ["KPIs", "AI Insights", "Benchmarks", "Board reports", "Alerts"],
  },
];

export const connectSteps = [
  {
    step: "01",
    title: "Connect your systems",
    body: "Secure connectors to EHR, scheduling, labs, HR, patient experience, and FHIR/HL7 feeds.",
  },
  {
    step: "02",
    title: "AASANI normalizes & analyzes",
    body: "Events map to a shared clinical–operational model with AI trend and peer analysis.",
  },
  {
    step: "03",
    title: "AI-driven insights in your workspace",
    body: "Leaders get live hospital KPIs, ranked recommendations, and board reports in one place.",
  },
];

export const securityFeatures = [
  {
    title: "HIPAA-aligned access",
    detail: "Least-privilege connectors and role-based views for clinical, ops, and finance leaders.",
  },
  {
    title: "SOC 2 ready controls",
    detail: "Access, encryption, and change management designed for health system audits.",
  },
  {
    title: "Encryption everywhere",
    detail: "TLS in transit and AES-256 at rest for connector payloads and workspace data.",
  },
  {
    title: "Audit logs",
    detail: "Immutable trails for every query, export, and admin action.",
  },
  {
    title: "Role-based access",
    detail: "COO, CFO, CQO, and service line leaders see only the domains they need.",
  },
  {
    title: "VPC & private link",
    detail: "Optional private networking so PHI-bearing feeds stay inside your perimeter.",
  },
];

export const pricingTiers = [
  {
    name: "Growth",
    description: "Single-hospital systems standardizing executive KPIs across core feeds.",
    price: "Custom",
    features: [
      "Up to 5 system connectors",
      "Live executive workspace",
      "Standard AI insights & alerts",
      "Email support",
    ],
  },
  {
    name: "Health System",
    description: "Multi-facility networks running clinical–operational intelligence at scale.",
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
    description: "Complex multi-EHR estates, private networking, and custom programs.",
    price: "Custom",
    features: [
      "Everything in Health System",
      "Private VPC connectivity",
      "Custom clinical data models",
      "SLA-backed support",
      "On-site implementation",
    ],
  },
];

export const resources = [
  {
    title: "Connecting hospital systems without rip-and-replace",
    type: "Guide",
    description: "How to plug AASANI into EHR and operational stacks while keeping security teams calm.",
  },
  {
    title: "The executive KPI stack hospital leaders need",
    type: "Brief",
    description: "From admissions and ALOS to margin and ED wait—metrics that drive weekly ops forums.",
  },
  {
    title: "FHIR & HL7 integration playbook",
    type: "Technical",
    description: "Patterns for clinical events, scheduling feeds, and quality reporting interfaces.",
  },
  {
    title: "From silos to board decisions",
    type: "Webinar",
    description: "How COOs and CFOs align on a single live view of the health system.",
  },
];

export const solutions = [
  {
    title: "Operations & capacity",
    description:
      "Unify admissions, census, ED flow, and staffing so COOs act on live capacity risk—not stale census reports.",
  },
  {
    title: "Quality & patient experience",
    description:
      "Track readmissions, satisfaction, and service-line quality with peer benchmarks and AI action guidance.",
  },
  {
    title: "Finance & margin",
    description:
      "Live revenue, operating margin, and labor cost signals pulled from revenue cycle and HR sources.",
  },
  {
    title: "Service line performance",
    description:
      "Department benchmarking for Emergency, Surgery, Medicine, and beyond—always linked to financial impact.",
  },
];
