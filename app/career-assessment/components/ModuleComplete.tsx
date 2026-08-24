"use client";

import React from "react";
import { Loader2 } from "lucide-react";

type Stat = { label: string; value: string };

export default function ModuleComplete({
  moduleKey,
  title,
  subtitle,
  xp,
  nextLabel,
  onNext,
  isLoading = false,
  isFinal = false,
  stats,
}: {
  moduleKey: string;
  title: string;
  subtitle: string;
  xp: number;
  nextLabel: string;
  onNext: () => void;
  isLoading?: boolean;
  isFinal?: boolean;
  stats: Stat[];
}) {
  const icons: Record<string, string> = { mbti: "🧠", iq: "⚡", skills: "🎯" };
  const colors: Record<string, string> = {
    mbti: "from-violet-500/20 to-violet-600/5",
    iq: "from-blue-500/20 to-blue-600/5",
    skills: "from-amber-500/20 to-amber-600/5",
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center animate-scale-in">
        {/* Icon */}
        <div
          className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${colors[moduleKey] || colors.skills} border border-white flex items-center justify-center text-5xl card-shadow-md`}
        >
          {isFinal ? "🏆" : icons[moduleKey]}
        </div>

        {/* XP badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-bold text-sm mb-4">
          <span>⭐</span>+{xp} XP олгогдлоо
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-8">{subtitle}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat) => (
            <div
              key={`stat-${stat.label}`}
              className="bg-card border border-border rounded-xl p-3 card-shadow"
            >
              <div className="text-base font-bold text-foreground tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          disabled={isLoading}
          className="w-full py-4 px-6 gradient-primary text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-80 text-base"
          style={{ minHeight: "56px" }}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              AI профайл боловсруулж байна...
            </>
          ) : (
            nextLabel
          )}
        </button>

        {isFinal && !isLoading && (
          <p className="text-xs text-muted-foreground mt-4">
            Таны хариултуудыг шинжилж, хувийн карьерийн профайл үүсгэж байна
          </p>
        )}
      </div>
    </div>
  );
}
