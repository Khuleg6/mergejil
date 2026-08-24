"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

type Profession = {
  id: string;
  rank: number;
  name: string;
  englishName: string;
  matchPct: number;
  salaryMin: number;
  salaryMax: number;
  demand: string;
  demandLevel: string;
  trend: string;
  description: string;
  skills: string[];
  environment: string;
};

const DEMAND_COLORS: Record<string, string> = {
  "very-high": "bg-emerald-100 text-emerald-700 border-emerald-200",
  high: "bg-blue-100 text-blue-700 border-blue-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-red-100 text-red-700 border-red-200",
};

const MATCH_COLORS = (pct: number) => {
  if (pct >= 90) return "text-emerald-600";
  if (pct >= 80) return "text-blue-600";
  if (pct >= 70) return "text-amber-600";
  return "text-muted-foreground";
};

function formatMNT(value: number) {
  return (value / 1000000).toFixed(1) + "сая₮";
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend.includes("↑"))
    return <TrendingUp size={14} className="text-success" />;
  if (trend.includes("↓"))
    return <TrendingDown size={14} className="text-danger" />;
  return <Minus size={14} className="text-muted-foreground" />;
}

export default function ProfessionCards({
  professions,
}: {
  professions: Profession[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>("prof-software");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Мэргэжлийн санал болголт
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Таны профайлд тулгуурлан AI-ийн тодорхойлсон дээд 5 мэргэжил
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-2 rounded-xl">
          <span>📊</span>
          Монголын хөдөлмөрийн зах зээл 2026
        </div>
      </div>

      {/* Market stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            id: "mstat-unemployed",
            label: "Бүртгэлтэй ажилгүйчүүд",
            value: "120,000+",
            icon: "👥",
          },
          {
            id: "mstat-youth",
            label: "Залуучуудын ажил эрхлэлт",
            value: "68%",
            icon: "📈",
          },
          {
            id: "mstat-topdemand",
            label: "Хамгийн эрэлттэй",
            value: "IT, Санхүү",
            icon: "🔥",
          },
          {
            id: "mstat-itsalary",
            label: "IT цалин дундажаас",
            value: "2.5 дахин",
            icon: "💰",
          },
        ].map((stat) => (
          <div
            key={stat.id}
            className="bg-card border border-border rounded-xl p-3 card-shadow"
          >
            <div className="text-lg mb-1">{stat.icon}</div>
            <div className="text-sm font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profession cards */}
      <div className="space-y-4">
        {professions.map((prof) => {
          const isExpanded = expandedId === prof.id;
          const demandColor =
            DEMAND_COLORS[prof.demandLevel] || DEMAND_COLORS.medium;

          return (
            <div
              key={prof.id}
              className={`bg-card border rounded-2xl overflow-hidden card-shadow transition-all duration-200 ${
                isExpanded
                  ? "border-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {/* Card header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : prof.id)}
                className="w-full text-left p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0 ${
                      prof.rank === 1
                        ? "bg-amber-100 text-amber-700"
                        : prof.rank === 2
                          ? "bg-slate-100 text-slate-700"
                          : prof.rank === 3
                            ? "bg-orange-100 text-orange-700"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {prof.rank === 1
                      ? "🥇"
                      : prof.rank === 2
                        ? "🥈"
                        : prof.rank === 3
                          ? "🥉"
                          : prof.rank}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-bold text-foreground text-base">
                          {prof.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {prof.englishName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className={`text-lg font-black tabular-nums ${MATCH_COLORS(prof.matchPct)}`}
                        >
                          {prof.matchPct}%
                        </div>
                        {isExpanded ? (
                          <ChevronUp
                            size={18}
                            className="text-muted-foreground"
                          />
                        ) : (
                          <ChevronDown
                            size={18}
                            className="text-muted-foreground"
                          />
                        )}
                      </div>
                    </div>

                    {/* Match bar */}
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${prof.matchPct}%`,
                          background:
                            prof.matchPct >= 90
                              ? "#16A34A"
                              : prof.matchPct >= 80
                                ? "#2563EB"
                                : "#D97706",
                        }}
                      />
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Salary */}
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted-foreground">💰</span>
                        <span className="font-semibold text-foreground tabular-nums">
                          {formatMNT(prof.salaryMin)} –{" "}
                          {formatMNT(prof.salaryMax)}
                        </span>
                        <span className="text-muted-foreground">/сар</span>
                      </div>

                      <span className="text-border">·</span>

                      {/* Demand */}
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${demandColor}`}
                      >
                        {prof.demand}
                      </span>

                      {/* Trend */}
                      <div className="flex items-center gap-1">
                        <TrendIcon trend={prof.trend} />
                        <span className="text-xs text-muted-foreground font-mono">
                          {prof.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 border-t border-border animate-fade-in">
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-5">
                    {prof.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Шаардлагатай ур чадвар
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {prof.skills.map((skill) => (
                          <span
                            key={`skill-${prof.id}-${skill}`}
                            className="text-xs px-2.5 py-1 bg-secondary border border-border rounded-lg text-foreground font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Ажлын орчин
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {prof.environment}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button className="flex-1 py-2.5 px-4 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-150">
                      Суралцах зам харах
                    </button>
                    <button className="px-4 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 active:scale-[0.98] transition-all duration-150">
                      Хадгалах
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
