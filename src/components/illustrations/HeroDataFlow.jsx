import { motion } from "framer-motion";

export function HeroDataFlow() {
  return (
    <svg
      viewBox="0 0 800 520"
      className="h-full w-full"
      aria-hidden
      role="presentation"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[
        { cx: 120, cy: 140, label: "EHR" },
        { cx: 680, cy: 120, label: "RCM" },
        { cx: 640, cy: 380, label: "Lab" },
        { cx: 160, cy: 400, label: "HR" },
      ].map((node, i) => (
        <g key={node.label}>
          <motion.circle
            cx={400}
            cy={260}
            r={48}
            fill="#2563EB"
            fillOpacity={0.08}
            stroke="#2563EB"
            strokeWidth={1.5}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
          />
          <motion.line
            x1={node.cx}
            y1={node.cy}
            x2={400}
            y2={260}
            stroke="url(#lineGrad)"
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
          <circle cx={node.cx} cy={node.cy} r={36} fill="#F8FAFC" stroke="#E2E8F0" />
          <text
            x={node.cx}
            y={node.cy + 5}
            textAnchor="middle"
            className="fill-slate-600 text-[11px] font-semibold"
            style={{ fontSize: 11 }}
          >
            {node.label}
          </text>
          <motion.circle
            r={4}
            fill="#14B8A6"
            filter="url(#glow)"
            animate={{
              cx: [node.cx, 400],
              cy: [node.cy, 260],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        </g>
      ))}
      <text x={400} y={268} textAnchor="middle" fill="#2563EB" style={{ fontSize: 13, fontWeight: 700 }}>
        AASANI
      </text>
    </svg>
  );
}
