import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueTrend, regionalSales, customerSegmentation } from "../../data/dashboard";

const COLORS = ["#06B6D4", "#22D3EE", "#0891B2", "#67E8F9"];

const tooltipStyle = {
  contentStyle: {
    background: "#0F172A",
    border: "1px solid #1E293B",
    borderRadius: "12px",
    color: "#F8FAFC",
  },
  itemStyle: { color: "#94A3B8" },
};

export function RevenueLineChart({ compact }) {
  return (
    <ResponsiveContainer width="100%" height={compact ? 220 : 280}>
      <LineChart data={revenueTrend}>
        <CartesianGrid stroke="#1E293B" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 12 }} />
        <YAxis
          stroke="#64748B"
          tick={{ fill: "#94A3B8", fontSize: 12 }}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip {...tooltipStyle} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#06B6D4"
          strokeWidth={2}
          dot={{ fill: "#06B6D4", r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RevenueAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={revenueTrend}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1E293B" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 12 }} />
        <YAxis
          stroke="#64748B"
          tick={{ fill: "#94A3B8", fontSize: 12 }}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#22D3EE"
          fill="url(#revGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RegionalBarChart({ compact }) {
  return (
    <ResponsiveContainer width="100%" height={compact ? 220 : 280}>
      <BarChart data={regionalSales} layout="vertical" margin={{ left: 8 }}>
        <CartesianGrid stroke="#1E293B" horizontal={false} />
        <XAxis type="number" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="region"
          width={70}
          stroke="#64748B"
          tick={{ fill: "#94A3B8", fontSize: 12 }}
        />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="sales" radius={[0, 6, 6, 0]} fill="#06B6D4" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SegmentPieChart({ compact }) {
  return (
    <ResponsiveContainer width="100%" height={compact ? 220 : 260}>
      <PieChart>
        <Pie
          data={customerSegmentation}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={compact ? 45 : 60}
          outerRadius={compact ? 70 : 90}
          paddingAngle={3}
        >
          {customerSegmentation.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
        {!compact && <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />}
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ProfitBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={revenueTrend}>
        <CartesianGrid stroke="#1E293B" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} />
        <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="profit" fill="#22D3EE" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
