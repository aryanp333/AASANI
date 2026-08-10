/**
 * Smoke test: chat answers must reflect live workspaceMock KPI deltas.
 * Run: npx vite-node scripts/chat-live-data.check.mjs
 */
import { mockData } from "../src/data/workspaceMock.js";
import { answerFromLiveData } from "../src/services/chatAssistant.js";
import { generateInsights } from "../src/services/insightEngine.js";

function mapKpis(period) {
  return mockData[period].kpis.map((k) => ({
    id: k.id,
    name: k.label,
    value: k.value,
    delta: k.delta,
    up: k.up,
  }));
}

function mapDepts(period) {
  return mockData[period].departments.map((d) => ({
    id: d.dept.toLowerCase().replace(/\s+/g, "-"),
    name: d.dept,
    score: d.score,
    benchmark: d.peer,
  }));
}

function answer(period) {
  const kpis = mapKpis(period);
  const departments = mapDepts(period);
  const insights = generateInsights(kpis, departments);
  return answerFromLiveData("why did readmissions change", {
    orgName: "Northbridge Health System",
    period,
    periodLabel: mockData[period].label,
    kpis,
    departments,
    insights,
  }).text;
}

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exitCode = 1;
  } else {
    console.log("OK:", msg);
  }
}

const period = "30D";
const original = { ...mockData[period].kpis.find((k) => k.id === "readmit") };

const before = answer(period);
assert(before.includes(original.value), `baseline includes value ${original.value}`);
assert(before.includes(original.delta), `baseline includes delta ${original.delta}`);
assert(
  before.toLowerCase().includes("readmission"),
  "baseline answer is about readmissions",
);

// Mutate mock in memory (what Phase 4 requires: chat logic unchanged)
const readmit = mockData[period].kpis.find((k) => k.id === "readmit");
readmit.value = "99.9%";
readmit.delta = "+9.9 pts";
readmit.up = false;

const after = answer(period);
assert(after.includes("99.9%"), "after mutation includes new value 99.9%");
assert(after.includes("+9.9 pts"), "after mutation includes new delta +9.9 pts");
assert(!after.includes(original.value) || original.value === "99.9%", "old value no longer required");

// Restore
Object.assign(readmit, original);

if (!process.exitCode) {
  console.log("\nChat live-data check passed.");
  console.log("Sample answer:", after.slice(0, 180) + "…");
} else {
  console.error("\nChat live-data check failed.");
  process.exit(1);
}
