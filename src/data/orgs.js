/**
 * Multi-tenant organization catalog for AASANI workspace demos.
 * Northbridge keeps curated mock data; other orgs get seeded synthetic data.
 */

/** @typedef {{
 *   id: string,
 *   name: string,
 *   type: string,
 *   bedCount: number,
 *   benchmarkProfile: Record<string, number>,
 *   hasCuratedMock?: boolean
 * }} Organization */

/**
 * Peer benchmark score targets (0–100) by department.
 * Academic centers often peer higher on specialty quality; community peers
 * sit a bit lower — "good" is relative to the profile, not a global constant.
 */
const ACADEMIC_BENCHMARKS = {
  Emergency: 78,
  Surgery: 84,
  Medicine: 79,
  "Women's Health": 86,
  Outpatient: 82,
  "Revenue Cycle": 80,
};

const COMMUNITY_BENCHMARKS = {
  Emergency: 76,
  Surgery: 80,
  Medicine: 77,
  "Women's Health": 82,
  Outpatient: 79,
  "Revenue Cycle": 77,
};

const NETWORK_BENCHMARKS = {
  Emergency: 77,
  Surgery: 82,
  Medicine: 78,
  "Women's Health": 84,
  Outpatient: 81,
  "Revenue Cycle": 79,
};

const REGIONAL_BENCHMARKS = {
  Emergency: 75,
  Surgery: 81,
  Medicine: 76,
  "Women's Health": 83,
  Outpatient: 80,
  "Revenue Cycle": 78,
};

/** @type {Organization[]} */
export const organizations = [
  {
    id: "northbridge",
    name: "Northbridge Health System",
    type: "academic medical center",
    bedCount: 620,
    // Peers match existing Northbridge mock department peer columns
    benchmarkProfile: { ...ACADEMIC_BENCHMARKS },
    hasCuratedMock: true,
  },
  {
    id: "summit-care",
    name: "Summit Care Network",
    type: "multi-hospital network",
    bedCount: 480,
    benchmarkProfile: { ...NETWORK_BENCHMARKS },
  },
  {
    id: "meridian-medical",
    name: "Meridian Medical Group",
    type: "community hospital",
    bedCount: 210,
    benchmarkProfile: { ...COMMUNITY_BENCHMARKS },
  },
  {
    id: "coastal-regional",
    name: "Coastal Regional",
    type: "regional medical center",
    bedCount: 340,
    benchmarkProfile: { ...REGIONAL_BENCHMARKS },
  },
  {
    id: "atlas-health",
    name: "Atlas Health Partners",
    type: "community hospital",
    bedCount: 175,
    benchmarkProfile: {
      ...COMMUNITY_BENCHMARKS,
      Emergency: 74,
      Surgery: 79,
    },
  },
  {
    id: "pioneer-clinical",
    name: "Pioneer Clinical",
    type: "academic medical center",
    bedCount: 550,
    benchmarkProfile: {
      ...ACADEMIC_BENCHMARKS,
      Emergency: 80,
      Medicine: 81,
    },
  },
];

export const DEFAULT_ORG_ID = "northbridge";

/**
 * @param {string} [orgIdOrName]
 * @returns {Organization}
 */
export function getOrgById(orgIdOrName) {
  if (!orgIdOrName) {
    return organizations.find((o) => o.id === DEFAULT_ORG_ID) || organizations[0];
  }
  const byId = organizations.find((o) => o.id === orgIdOrName);
  if (byId) return byId;
  const byName = organizations.find(
    (o) => o.name.toLowerCase() === String(orgIdOrName).toLowerCase(),
  );
  if (byName) return byName;
  return organizations.find((o) => o.id === DEFAULT_ORG_ID) || organizations[0];
}

export function listOrganizations() {
  return organizations.map((o) => ({
    id: o.id,
    name: o.name,
    type: o.type,
    bedCount: o.bedCount,
  }));
}
