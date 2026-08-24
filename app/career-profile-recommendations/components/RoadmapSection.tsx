"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Lock } from "lucide-react";

type RoadmapPhase = {
  id: string;
  phase: number;
  title: string;
  status: "current" | "upcoming" | "planned";
  color: string;
  items: string[];
  xp: number;
};

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; border: string }
> = {
  current: {
    label: "Одоогийн",
    icon: <CheckCircle2 size={16} className="text-success" />,
    border: "border-success",
  },
  upcoming: {
    label: "Дараагийн",
    icon: <Clock size={16} className="text-info" />,
    border: "border-info",
  },
  planned: {
    label: "Төлөвлөсөн",
    icon: <Lock size={16} className="text-muted-foreground" />,
    border: "border-border",
  },
};

export default function RoadmapSection({
  roadmap,
  totalXP,
}: {
  roadmap: RoadmapPhase[];
  totalXP: number;
}) {
  const [activePhase, setActivePhase] = useState<string>("roadmap-phase1");

  const active = roadmap.find((r) => r.id === activePhase) || roadmap[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Хөгжлийн Roadmap</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Таны карьерийн суралцах замын 4 үе шат
        </p>
      </div>

      {/* XP progress overview */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">XP Явц</h3>
            <p className="text-white/70 text-sm">
              Нийт боломжит оноо: 2,870 XP
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black tabular-nums">{totalXP}</div>
            <div className="text-white/70 text-sm">Одоогийн XP</div>
          </div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700"
            style={{ width: `${(totalXP / 2870) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>0 XP</span>
          <span className="text-white font-semibold">
            {Math.round((totalXP / 2870) * 100)}% дууссан
          </span>
          <span>2,870 XP</span>
        </div>
      </div>

      {/* Phase selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {roadmap.map((phase) => {
          const config = STATUS_CONFIG[phase.status];
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                isActive
                  ? `${config.border} bg-primary/5`
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {config.icon}
                <span className="text-xs font-semibold text-muted-foreground">
                  {config.label}
                </span>
              </div>
              <div
                className={`w-8 h-8 rounded-xl ${phase.color} flex items-center justify-center text-white font-bold text-sm mb-2`}
              >
                {phase.phase}
              </div>
              <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                {phase.title.split(":")[1]?.trim() || phase.title}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-accent font-semibold tabular-nums">
                  +{phase.xp} XP
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active phase detail */}
      {active && (
        <div
          className={`bg-card border-2 ${STATUS_CONFIG[active.status].border} rounded-2xl p-6 card-shadow animate-fade-in`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl ${active.color} flex items-center justify-center text-white font-black text-xl`}
              >
                {active.phase}
              </div>
              <div>
                <h3 className="font-bold text-foreground">{active.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {STATUS_CONFIG[active.status].icon}
                  <span className="text-xs text-muted-foreground">
                    {STATUS_CONFIG[active.status].label}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-accent tabular-nums">
                +{active.xp}
              </div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {active.items.map((item) => (
              <div
                key={`item-${active.id}-${item}`}
                className="flex items-start gap-2.5 p-3 bg-muted rounded-xl"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    active.status === "current"
                      ? "bg-success"
                      : active.status === "upcoming"
                        ? "bg-info"
                        : "bg-muted-foreground"
                  }`}
                >
                  {active.status === "current" ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4.5 7.5L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          {active.status !== "current" && (
            <div className="mt-4 p-4 bg-muted rounded-xl flex items-center gap-3">
              <Lock size={18} className="text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Энэ үе шат нээгдэхийн тулд өмнөх үе шатыг дуусгаж,{" "}
                {active.xp - totalXP > 0
                  ? `${active.xp - totalXP} XP цуглуулах`
                  : "бэлэн байна"}{" "}
                шаардлагатай.
              </p>
            </div>
          )}

          {active.status === "current" && (
            <div className="mt-4 flex gap-3">
              <button className="flex-1 py-3 px-4 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-150">
                Суралцах замыг эхлэх →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Gamification teaser */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            id: "badge-first",
            icon: "🏅",
            title: "Анхны алхам",
            desc: "Бүх тест дуусгасан",
            earned: true,
            xp: 100,
          },
          {
            id: "badge-streak",
            icon: "🔥",
            title: "7 өдрийн streak",
            desc: "7 хоног дараалан нэвтэрсэн",
            earned: false,
            xp: 100,
          },
          {
            id: "badge-mentor",
            icon: "💎",
            title: "AI Ментор",
            desc: "AI менторт 10 асуулт асуусан",
            earned: false,
            xp: 150,
          },
        ].map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-2xl border flex items-center gap-3 ${
              badge.earned
                ? "bg-amber-50 border-amber-200"
                : "bg-muted border-border opacity-60"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                badge.earned ? "bg-amber-100" : "bg-border"
              }`}
            >
              {badge.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.desc}</p>
              <p className="text-xs font-semibold text-accent mt-0.5 tabular-nums">
                +{badge.xp} XP
              </p>
            </div>
            {badge.earned && (
              <div className="ml-auto">
                <CheckCircle2 size={20} className="text-success" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
