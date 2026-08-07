# Experience AASANI — manual QA checklist

Use after any change to `/experience`, boot screen, or `ExecutiveWorkspace`.

## Critical path

- [ ] Open `/` (landing). Confirm healthcare copy (“One platform. Every healthcare decision.”) — no “Your databases / growth workspace / Meridian Retail”.
- [ ] Click **Experience AASANI** (nav or hero CTA).
- [ ] URL is `/experience` (or `/AASANI/experience` on GitHub Pages).
- [ ] **Secure connectors** screen lists all seven with labels:
  - Electronic Health Record
  - Revenue Cycle
  - Scheduling
  - Laboratory
  - HR
  - Patient Experience
  - FHIR APIs
- [ ] No blank/checkmark-only row.
- [ ] Progress reaches 100% and status shows health-data / workspace ready copy.
- [ ] After boot, **Executive Workspace** appears:
  - Org switcher defaults to Northbridge Health System
  - KPIs include Admissions, Revenue, Operating Margin, ALOS, Readmission Rate, Patient Satisfaction, ED Wait Time
  - Department benchmarking is clinical departments (Emergency, Surgery, etc.)
- [ ] **Never** see Postgres + CRM, Gross Margin/Churn retail cards, or “Orders · revenue trend” after boot.
- [ ] Toggle 7D / 30D / 90D — KPI values change.
- [ ] **AI Insights** and **Reports** show healthcare narrative.
- [ ] **Ask AASANI** answers grounded questions (e.g. ED wait).
- [ ] **Exit experience** returns to `/` marketing home.
- [ ] Navbar/footer hidden during entire experience flow.

## Automated

```bash
node scripts/experience-flow.check.mjs
```

Must exit 0.
