/**
 * Experience flow integrity tests (no browser required).
 * Run: node scripts/experience-flow.check.mjs
 *
 * Asserts:
 * - Single /experience route entry in App.jsx
 * - ExperiencePage only boots → ExecutiveWorkspace (no HomePage)
 * - workspaceMock has healthcare KPIs and boot systems
 * - Retail/generic BI phrases are banned from experience/workspace modules
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = (...p) => path.join(root, "src", ...p);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exitCode = 1;
  } else {
    console.log("OK:", msg);
  }
}

const app = read(src("App.jsx"));
const experience = read(src("pages", "ExperiencePage.jsx"));
const workspace = read(src("components", "product", "ExecutiveWorkspace.jsx"));
const boot = read(src("components", "product", "ProductBootScreen.jsx"));
const mock = read(src("data", "workspaceMock.js"));
const hero = read(src("components", "marketing", "HeroProductPreview.jsx"));

// Exactly one experience route definition
const experienceRoutes = (app.match(/path="\/experience"/g) || []).length;
assert(experienceRoutes === 1, "exactly one /experience route in App.jsx");

// ExperiencePage wires ProductBoot → ExecutiveWorkspace only
assert(
  experience.includes("ProductBootScreen") && experience.includes("ExecutiveWorkspace"),
  "ExperiencePage mounts ProductBootScreen and ExecutiveWorkspace",
);
assert(!experience.includes("HomePage"), "ExperiencePage must not import HomePage");
assert(
  experience.includes('stage === "workspace"') && experience.includes('stage === "booting"'),
  "ExperiencePage uses booting → workspace stage machine",
);

// Workspace is healthcare
assert(workspace.includes("Admissions") || mock.includes("Admissions"), "workspace has Admissions KPI");
assert(mock.includes("ED Wait Time") || mock.includes("edwait"), "workspace mock has ED wait");
assert(mock.includes("Northbridge Health System"), "demo org includes Northbridge Health System");
assert(mock.includes("Electronic Health Record"), "boot systems include EHR");

// Banned retail / generic BI phrases in experience pipeline
const banned = [
  "Meridian Retail",
  "Your databases.",
  "One growth workspace",
  "Postgres + CRM",
  "Gross Margin",
  "Orders · revenue",
];

for (const phrase of banned) {
  assert(!experience.includes(phrase), `ExperiencePage free of: "${phrase}"`);
  assert(!workspace.includes(phrase), `ExecutiveWorkspace free of: "${phrase}"`);
  assert(!boot.includes(phrase), `ProductBootScreen free of: "${phrase}"`);
  assert(!mock.includes(phrase), `workspaceMock free of: "${phrase}"`);
  assert(!hero.includes(phrase), `HeroProductPreview free of: "${phrase}"`);
}

// Hero marketing preview is healthcare when shown on home
assert(hero.includes("Northbridge Health System"), "hero preview is Northbridge healthcare");
assert(hero.includes("ED Wait Time") || hero.includes("Admissions"), "hero preview uses clinical KPIs");

// Legacy retail dashboard templates must stay deleted
const bannedPaths = [
  "pages/DashboardPage.jsx",
  "pages/SimulationPage.jsx",
  "components/dashboard/ExecutiveDashboard.jsx",
  "components/dashboard/SimulationDashboardReveal.jsx",
  "components/charts/ChartBlocks.jsx",
  "data/dashboard.js",
];
for (const rel of bannedPaths) {
  assert(!fs.existsSync(src(...rel.split("/"))), `removed leftover template: src/${rel}`);
}

// Experience tree never imports HomePage / retail pages
assert(!experience.includes("DashboardPage"), "ExperiencePage does not use DashboardPage");
assert(
  !app.includes("ExecutiveDashboard") && !app.includes("DashboardPage"),
  "App.jsx does not mount retail ExecutiveDashboard",
);

if (process.exitCode) {
  console.error("\nExperience flow checks failed.");
  process.exit(1);
}
console.log("\nAll experience flow checks passed.");
