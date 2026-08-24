"use client";

import dynamic from "next/dynamic";
import React from "react";

const SkillsRadarChart = dynamic(() => import("./SkillsRadarChart"), {
  ssr: false,
});

type SkillsData = {
  radarData: { subject: string; value: number; fullMark: number }[];
  summary: string;
  strengths: string[];
  gaps: string[];
};

export default function SkillsRadarSection({ skills }: { skills: SkillsData }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-foreground mb-1">
            Ур чадварын радар
          </h3>
          <p className="text-xs text-muted-foreground">
            4 чиглэлийн хүч чадлын харьцаа
          </p>
        </div>
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
          🎯
        </div>
      </div>

      {/* Radar chart */}
      <div className="h-56">
        <SkillsRadarChart data={skills.radarData} />
      </div>

      <p className="text-sm text-muted-foreground mt-4 mb-5 leading-relaxed">
        {skills.summary}
      </p>

      {/* Strengths & Gaps */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-semibold text-success uppercase tracking-wider mb-2 flex items-center gap-1">
            <span>✓</span> Хүч чадал
          </h4>
          <div className="space-y-1.5">
            {skills.strengths.map((s) => (
              <div key={`strength-${s}`} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                <span className="text-xs text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-warning uppercase tracking-wider mb-2 flex items-center gap-1">
            <span>↑</span> Хөгжүүлэх
          </h4>
          <div className="space-y-1.5">
            {skills.gaps.map((g) => (
              <div key={`gap-${g}`} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
                <span className="text-xs text-foreground">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="space-y-3 mt-5 pt-5 border-t border-border">
        {skills.radarData.map((item) => (
          <div key={`radar-bar-${item.subject}`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground font-medium">
                {item.subject}
              </span>
              <span className="font-bold text-foreground tabular-nums">
                {item.value}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-accent rounded-full transition-all duration-700"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
