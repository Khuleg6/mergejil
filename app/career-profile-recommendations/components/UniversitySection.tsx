"use client";

import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

type University = {
  id: string;
  name: string;
  fullName: string;
  programs: string[];
  matchScore: number;
  location: string;
  type: string;
  tuition: string;
  highlight: string;
};

type Profession = {
  id: string;
  name: string;
  matchPct: number;
};

export default function UniversitySection({
  universities,
  professions,
}: {
  universities: University[];
  professions: Profession[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Боловсролын байгууллага
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Таны мэргэжлийн зорилгод нийцсэн их сургуулиуд
        </p>
      </div>

      {/* Top profession reminder */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🎯</span>
          <span className="text-sm font-semibold text-primary">
            Таны хамгийн тохирох мэргэжлүүд
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {professions.slice(0, 3).map((prof) => (
            <span
              key={`prof-badge-${prof.id}`}
              className="text-xs px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg text-primary font-medium"
            >
              {prof.name} — {prof.matchPct}%
            </span>
          ))}
        </div>
      </div>

      {/* University cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
        {universities.map((uni) => (
          <div
            key={uni.id}
            className="bg-card border border-border rounded-2xl p-5 card-shadow hover:border-primary/30 transition-all duration-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {uni.name.slice(0, 2)}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-primary tabular-nums">
                  {uni.matchScore}%
                </div>
                <div className="text-xs text-muted-foreground">тохирол</div>
              </div>
            </div>

            <h3 className="font-bold text-foreground text-base mb-0.5">
              {uni.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 leading-snug">
              {uni.fullName}
            </p>

            {/* Match bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
              <div
                className="h-full gradient-primary rounded-full"
                style={{ width: `${uni.matchScore}%` }}
              />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                {uni.location}
              </div>
              <span className="px-2 py-0.5 bg-muted rounded-full">
                {uni.type}
              </span>
            </div>

            {/* Programs */}
            <div className="mb-3 flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Хөтөлбөрүүд
              </p>
              <div className="space-y-1">
                {uni.programs.map((prog) => (
                  <div
                    key={`prog-${uni.id}-${prog}`}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs text-foreground">{prog}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tuition */}
            <div className="bg-muted rounded-xl p-3 mb-3">
              <p className="text-xs text-muted-foreground mb-0.5">
                Жилийн төлбөр
              </p>
              <p className="text-sm font-bold text-foreground tabular-nums">
                {uni.tuition}
              </p>
            </div>

            {/* Highlight */}
            <p className="text-xs text-muted-foreground italic mb-4">
              ✨ {uni.highlight}
            </p>

            <button className="w-full py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-1.5 mt-auto">
              Дэлгэрэнгүй
              <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Admission tips */}
      <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
        <h3 className="font-bold text-foreground mb-4">Элсэлтийн зөвлөмж</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: "tip-score",
              icon: "📝",
              title: "ЭЕШ онооны шаардлага",
              desc: "ШУТИС IT: 500+, МУИС IT: 480+, МЖИС: 460+ оноо шаардлагатай",
            },
            {
              id: "tip-deadline",
              icon: "📅",
              title: "Элсэлтийн хугацаа",
              desc: "2026 оны 6-р сарын 15–30-ны хооронд бүртгэл авна. Эрт бэлдэж эхлэх хэрэгтэй.",
            },
            {
              id: "tip-scholarship",
              icon: "🏆",
              title: "Тэтгэлэгт хөтөлбөр",
              desc: "ШУТИС болон МУИС-д ЭЕШ-ийн дээд оноотой элсэгчдэд 50-100% тэтгэлэг олгодог.",
            },
          ].map((tip) => (
            <div key={tip.id} className="flex gap-3">
              <div className="text-2xl flex-shrink-0">{tip.icon}</div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
