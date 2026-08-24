"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type MBTIDimension = {
  id: string;
  left: string;
  right: string;
  value: number;
  side: "left" | "right";
  label: string;
};

type MBTIData = {
  type: string;
  mongolianName: string;
  tagline: string;
  description: string;
  dimensions: MBTIDimension[];
  compatibleTypes: string[];
  workStyle: string;
};

const TYPE_COLORS: Record<string, string> = {
  INTJ: "from-violet-600 to-violet-800",
  INFJ: "from-teal-600 to-teal-800",
  ISTJ: "from-blue-600 to-blue-800",
  ISTP: "from-slate-600 to-slate-800",
  INTP: "from-indigo-600 to-indigo-800",
  INFP: "from-pink-500 to-pink-700",
  ISFJ: "from-green-600 to-green-800",
  ISFP: "from-emerald-500 to-emerald-700",
  ENTJ: "from-red-600 to-red-800",
  ENFJ: "from-orange-500 to-orange-700",
  ESTJ: "from-blue-700 to-blue-900",
  ESTP: "from-yellow-500 to-yellow-700",
  ENTP: "from-amber-500 to-amber-700",
  ENFP: "from-fuchsia-500 to-fuchsia-700",
  ESFJ: "from-rose-500 to-rose-700",
  ESFP: "from-orange-400 to-orange-600",
};

export default function ProfileHeroSection({ mbti }: { mbti: MBTIData }) {
  const [expanded, setExpanded] = useState(false);
  const gradient = TYPE_COLORS[mbti.type] || "from-primary to-blue-800";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main MBTI card */}
      <div
        className={`lg:col-span-2 rounded-2xl bg-gradient-to-br ${gradient} p-6 sm:p-8 text-white card-shadow-lg relative overflow-hidden`}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">
                  {mbti.type}
                </span>
                <div className="px-3 py-1.5 bg-white/20 rounded-xl">
                  <span className="text-white font-bold text-lg">
                    {mbti.mongolianName}
                  </span>
                </div>
              </div>
              <p className="text-white/80 text-sm">{mbti.tagline}</p>
            </div>
            <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl">
              🧠
            </div>
          </div>

          <p className="text-white/90 text-sm leading-relaxed mb-6">
            {mbti.description}
          </p>

          {/* Dimension bars */}
          <div className="space-y-3 mb-4">
            {mbti.dimensions.map((dim) => {
              const leftPct = dim.side === "left" ? dim.value : 100 - dim.value;
              const rightPct = 100 - leftPct;
              return (
                <div key={dim.id}>
                  <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                    <span
                      className={
                        dim.side === "left" ? "font-semibold text-white" : ""
                      }
                    >
                      {dim.left}
                    </span>
                    <span
                      className={
                        dim.side === "right" ? "font-semibold text-white" : ""
                      }
                    >
                      {dim.right}
                    </span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-white/20">
                    <div
                      className="h-full bg-white rounded-l-full transition-all duration-700"
                      style={{ width: `${leftPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/50 mt-0.5">
                    <span className="tabular-nums">{leftPct}%</span>
                    <span className="tabular-nums">{rightPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-white/70 hover:text-white text-xs transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Хураах" : "Дэлгэрэнгүй харах"}
          </button>

          {expanded && (
            <div className="mt-4 pt-4 border-t border-white/20 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                    Ажлын хэв маяг
                  </p>
                  <p className="text-white/90 text-sm">{mbti.workStyle}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                    Нийцтэй төрлүүд
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {mbti.compatibleTypes.map((t) => (
                      <span
                        key={`compat-${t}`}
                        className="px-2 py-0.5 bg-white/20 rounded-lg text-white text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side stats */}
      <div className="flex flex-col gap-4">
        {/* Profile completeness */}
        <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Профайлын бүрэн байдал
          </h3>
          <div className="space-y-3">
            {[
              {
                id: "pc-mbti",
                label: "MBTI Тест",
                pct: 100,
                color: "bg-violet-500",
              },
              { id: "pc-iq", label: "IQ Тест", pct: 100, color: "bg-blue-500" },
              {
                id: "pc-skills",
                label: "Ур чадвар",
                pct: 100,
                color: "bg-amber-500",
              },
              {
                id: "pc-learning",
                label: "Суралцах зам",
                pct: 0,
                color: "bg-emerald-500",
              },
            ].map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">
                    {item.label}
                  </span>
                  <span
                    className={`font-semibold tabular-nums ${item.pct === 100 ? "text-success" : "text-muted-foreground"}`}
                  >
                    {item.pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* XP card */}
        <div className="bg-gradient-to-br from-accent/20 to-amber-100/50 border border-accent/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⭐</span>
            <div>
              <div className="text-2xl font-black text-accent tabular-nums">
                370 XP
              </div>
              <div className="text-xs text-muted-foreground">
                Нийт олгосон оноо
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { id: "xp-mbti", label: "MBTI Тест", xp: "+120" },
              { id: "xp-iq", label: "IQ Тест", xp: "+150" },
              { id: "xp-skills", label: "Ур чадвар", xp: "+100" },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-accent tabular-nums">
                  {item.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick insight */}
        <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Гол давуу тал
          </h3>
          <div className="space-y-2">
            {[
              "Системт сэтгэлгээ",
              "Аналитик чадвар",
              "Стратегийн төлөвлөлт",
              "Бие даасан шийдвэр",
            ].map((s) => (
              <div key={`strength-${s}`} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
