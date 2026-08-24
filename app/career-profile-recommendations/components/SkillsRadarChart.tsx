"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: { subject: string } }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2 card-shadow text-xs">
        <p className="font-semibold text-foreground">
          {payload[0].payload.subject}
        </p>
        <p className="text-muted-foreground">
          Оноо:{" "}
          <span className="font-bold text-foreground tabular-nums">
            {payload[0].value}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SkillsRadarChart({
  data,
}: {
  data: { subject: string; value: number; fullMark: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        data={data}
        margin={{ top: 8, right: 24, bottom: 8, left: 24 }}
      >
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fontSize: 12,
            fill: "var(--muted-foreground)",
            fontWeight: 500,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Radar
          name="Ур чадвар"
          dataKey="value"
          stroke="var(--accent)"
          fill="var(--accent)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
