/**
 * Multi-tenant scaffold smoke test.
 * Run: npx vite-node scripts/org-multi-tenant.check.mjs
 */
import { organizations, DEFAULT_ORG_ID, getOrgById } from "../src/data/orgs.js";
import { generateSyntheticPeriodData } from "../src/services/orgDataFactory.js";
import { mockData } from "../src/data/workspaceMock.js";

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exitCode = 1;
  } else {
    console.log("OK:", msg);
  }
}

assert(DEFAULT_ORG_ID === "northbridge", "default org is northbridge");
assert(organizations.length >= 4, "catalog has multiple orgs");

const nb = getOrgById("northbridge");
assert(nb.hasCuratedMock === true, "Northbridge flagged as curated");
assert(nb.benchmarkProfile.Emergency === 78, "Northbridge ED peer profile is 78");

const curated = mockData["30D"].kpis.find((k) => k.id === "admissions");
assert(curated?.value === "4,218", "Northbridge curated admissions still 4,218");

const summit = getOrgById("summit-care");
const a = generateSyntheticPeriodData(summit, "30D");
const b = generateSyntheticPeriodData(summit, "30D");
assert(
  a.kpis[0].value === b.kpis[0].value,
  "synthetic data is stable for same org+period seed",
);

const meridian = getOrgById("meridian-medical");
const m = generateSyntheticPeriodData(meridian, "30D");
assert(
  a.kpis[0].value !== m.kpis[0].value || a.kpis[6].value !== m.kpis[6].value,
  "different orgs produce different synthetic series",
);

const edBenchSummit = a.departments.find((d) => d.name === "Emergency")?.benchmark;
assert(
  edBenchSummit === summit.benchmarkProfile.Emergency,
  "scorecard benchmarks come from org benchmarkProfile",
);

const edBenchComm = m.departments.find((d) => d.name === "Emergency")?.benchmark;
assert(
  edBenchComm === meridian.benchmarkProfile.Emergency,
  "community profile ED benchmark applied",
);
assert(edBenchSummit !== edBenchComm, "academic/network vs community peers differ");

if (!process.exitCode) {
  console.log("\nMulti-tenant org checks passed.");
} else {
  process.exit(1);
}
