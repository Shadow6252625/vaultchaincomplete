"use client";

import * as React from "react";
const { useEffect, useState } = React;
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SecurityGraph({
  data,
}: {
  data: Array<{ at: string; score: number; anomalies: number }>;
}) {
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-60 w-full bg-white/5 rounded-2xl animate-pulse" />;

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,225,255,0.35)" />
              <stop offset="100%" stopColor="rgba(10,116,255,0.02)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="at"
            tickFormatter={(v) =>
              new Date(v as string).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
            stroke="transparent"
            tick={{ fill: "rgba(234,243,255,0.35)", fontSize: 10, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            minTickGap={28}
          />
          <YAxis
            domain={[40, 100]}
            stroke="transparent"
            tick={{ fill: "rgba(234,243,255,0.35)", fontSize: 10, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(11,12,16,0.95)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              color: "rgba(234,243,255,0.85)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.60)",
              fontSize: 12,
              padding: "10px 14px",
            }}
            labelFormatter={(v) =>
              new Date(v as string).toLocaleString([], {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="rgba(0,225,255,0.90)"
            strokeWidth={2}
            fill="url(#scoreGrad)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#00e1ff",
              stroke: "rgba(0,225,255,0.30)",
              strokeWidth: 6,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SecurityGraph;
