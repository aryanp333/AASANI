export const analysts = [
  {
    id: "sarah",
    name: "Sarah",
    role: "Senior Data Analyst",
    task: "Cleaning Data",
    initialProgress: 85,
    avatar: "SM",
  },
  {
    id: "raj",
    name: "Raj",
    role: "Business Intelligence Analyst",
    task: "Building Dashboard",
    initialProgress: 60,
    avatar: "RK",
  },
  {
    id: "emily",
    name: "Emily",
    role: "SQL Analyst",
    task: "Writing Queries",
    initialProgress: 100,
    avatar: "EC",
  },
];

export const pipelineStages = [
  { id: "upload", label: "Upload" },
  { id: "cleaning", label: "Data Cleaning" },
  { id: "sql", label: "SQL Analysis" },
  { id: "python", label: "Python Analysis" },
  { id: "dashboard", label: "Dashboard Design" },
  { id: "report", label: "Business Report" },
];

export const activityTemplates = [
  { analyst: "Sarah", action: "cleaned duplicate records" },
  { analyst: "Raj", action: "created Revenue Dashboard" },
  { analyst: "Emily", action: "completed SQL joins" },
  { analyst: "Sarah", action: "validated sales totals in Excel" },
  { analyst: "Raj", action: "published Power BI workspace" },
  { analyst: "Emily", action: "optimized query performance" },
  { analyst: "Sarah", action: "standardized product categories" },
  { analyst: "Raj", action: "added regional drill-downs" },
  { analyst: "Emily", action: "exported dataset for Python" },
  { analyst: "Team", action: "Dashboard exported" },
];
