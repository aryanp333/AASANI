import { motion } from "framer-motion";

export function HeroDataFlow() {
  const nodes = [
    { cx: 110, cy: 120, label: "Postgres" },
    { cx: 690, cy: 100, label: "CRM" },
    { cx: 700, cy: 360, label: "ERP" },
    { cx: 100, cy: 380, label: "Billing" },
    { cx: 400, cy: 60, label: "Snowflake" },
    { cx: 400, cy: 460, label: "Support" },
  ];

  return (
    <svg viewBox="0 0 800 520" className="h-full w-full" aria-hidden role="presentation">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#0D9488" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={400} cy={260} r={120} fill="url(#coreGlow)" />

      {nodes.map((node, i) => (
        <g key={node.label}>
          <motion.line
            x1={node.cx}
            y1={node.cy}
            x2={400}
            y2={260}
            stroke="url(#lineGrad)"
            strokeWidth={1.75}
            strokeDasharray="4 6"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.25, 0.85, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.25 }}
          />
          <motion.circle
            r={3.5}
            fill="#0D9488"
            filter="url(#glow)"
            animate={{
              cx: [node.cx, 400, node.cx],
              cy: [node.cy, 260, node.cy],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: i * 0.45,
              ease: "easeInOut",
            }}
          />
          <rect
            x={node.cx - 46}
            y={node.cy - 18}
            width={92}
            height={36}
            rx={10}
            fill="#fff"
            stroke="#E6ECF2"
          />
          <text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fill="#5B6B7C"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            {node.label}
          </text>
        </g>
      ))}

      <motion.circle
        cx={400}
        cy={260}
        r={52}
        fill="#fff"
        stroke="#2563EB"
        strokeWidth={1.5}
        animate={{ r: [50, 54, 50] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <text
        x={400}
        y={255}
        textAnchor="middle"
        fill="#0B1220"
        style={{ fontSize: 12, fontWeight: 700 }}
      >
        AASANI
      </text>
      <text
        x={400}
        y={272}
        textAnchor="middle"
        fill="#5B6B7C"
        style={{ fontSize: 9, fontWeight: 500 }}
      >
        Intelligence
      </text>
    </svg>
  );
}
