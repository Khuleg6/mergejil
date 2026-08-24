"use client";

import dynamic from "next/dynamic";
import React from "react";

const IQBarChart = dynamic(() => import("./IQBarChart"), { ssr: false });

type IQData = {
  totalScore: number;
  label: string;
  percentile: number;
  description: string;
  subScores: {
    id: string;
    category: string;
    score: number;
    max: number;
    color: string;
  }[];
};

const IQ_LABEL_COLORS: Record<string, string> = {
  "Маш өндөр": "bg-violet-100 text-violet-700 border-violet-200",
  Өндөр: "bg-blue-100 text-blue-700 border-blue-200",
  Дундаж: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Доод дундаж": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function IQSection({ iq }: { iq: IQData }) {
  const labelColor =
    IQ_LABEL_COLORS[iq.label] || "bg-muted text-muted-foreground border-border";

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-foreground mb-1">
            IQ Танин мэдэхүйн оноо
          </h3>
          <p className="text-xs text-muted-foreground">
            Стандартчилсан хэмжүүрээр
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-primary tabular-nums">
            {iq.totalScore}
          </div>
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mt-1 ${labelColor}`}
          >
            {iq.label}
          </span>
        </div>
      </div>

      {/* Percentile bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Байр суурь</span>
          <span className="font-semibold text-foreground tabular-nums">
            Дээрээс {100 - iq.percentile}%
          </span>
        </div>
        <div className="relative h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-700"
            style={{ width: `${iq.percentile}%` }}
          />
          <div
            className="absolute top-0 h-full w-0.5 bg-white/80"
            style={{ left: `${iq.percentile}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>70</span>
          <span className="text-primary font-semibold">
            Та: {iq.totalScore}
          </span>
          <span>145+</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {iq.description}
      </p>

      {/* Sub-scores chart */}
      <div className="h-44">
        <IQBarChart subScores={iq.subScores} />
      </div>

      {/* Sub-score detail */}
      <div className="space-y-3 mt-4">
        {iq.subScores.map((sub) => (
          <div key={sub.id}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground font-medium">
                {sub.category}
              </span>
              <span className="font-bold text-foreground tabular-nums">
                {sub.score}/{sub.max}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${sub.score}%`, backgroundColor: sub.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
