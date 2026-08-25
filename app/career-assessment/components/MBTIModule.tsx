"use client";

import React, { useState, useCallback } from "react";
import { mbtiQuestions } from "./assessmentData";

const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

const MBTI_DESCRIPTIONS: Record<string, { title: string; emoji: string; desc: string; color: string }> = {
  INTJ: { title: "Стратегич", emoji: "🧠", desc: "Бие даасан, шийдэмгий, урт хугацааны стратегич сэтгэгч.", color: "#6366f1" },
  INTP: { title: "Логикч", emoji: "🔬", desc: "Нарийн дүн шинжилгээ хийдэг, онолын сэтгэгч.", color: "#8b5cf6" },
  ENTJ: { title: "Командлагч", emoji: "👑", desc: "Байгалийн удирдагч, шийдэмгий, стратегич.", color: "#dc2626" },
  ENTP: { title: "Маргаанч", emoji: "⚡", desc: "Бүтээлч, ухаалаг, санааг сорьдог.", color: "#f59e0b" },
  INFJ: { title: "Зөгнөгч", emoji: "🌟", desc: "Зорилготой, зарчимтай, хүмүүсийг ойлгодог.", color: "#10b981" },
  INFP: { title: "Зуучлагч", emoji: "🌸", desc: "Яруу найрагч зүрхтэй, үнэт зүйлсдээ үнэнч.", color: "#ec4899" },
  ENFJ: { title: "Протагонист", emoji: "🎯", desc: "Харизматик удирдагч, хүмүүсийг урамшуулдаг.", color: "#f97316" },
  ENFP: { title: "Кампанит ажилтан", emoji: "🎨", desc: "Урам зориг өгдөг, бүтээлч, нийгэмч.", color: "#06b6d4" },
  ISTJ: { title: "Логистикч", emoji: "📋", desc: "Практик, баримт баримталдаг, найдвартай.", color: "#1b3a6b" },
  ISFJ: { title: "Хамгаалагч", emoji: "🛡️", desc: "Тэвчээртэй, хичээнгүй, хүмүүст анхаардаг.", color: "#0891b2" },
  ESTJ: { title: "Гүйцэтгэгч", emoji: "⚙️", desc: "Зохион байгуулагч, дүрэм журмыг дагадаг.", color: "#1d4ed8" },
  ESFJ: { title: "Консул", emoji: "🤝", desc: "Анхааралтай, нийгэмч, хамт олноо дэмждэг.", color: "#7c3aed" },
  ISTP: { title: "Виртуоз", emoji: "🔧", desc: "Туршилт хийдэг, практик, логик сэтгэгч.", color: "#374151" },
  ISFP: { title: "Адал явдалтан", emoji: "🎭", desc: "Уян хатан, нийгэмч, нээлттэй туршлагатай.", color: "#be185d" },
  ESTP: { title: "Бизнесмен", emoji: "🚀", desc: "Ухаалаг, эрч хүчтэй, ойлгомжтой.", color: "#b45309" },
  ESFP: { title: "Зугаалагч", emoji: "🎉", desc: "Аяндаа, эрч хүчтэй, хүмүүст дуртай.", color: "#db2777" },
};

const DIMENSION_LABELS: Record<string, { left: string; right: string; leftFull: string; rightFull: string }> = {
  "EI": { left: "E", right: "I", leftFull: "Экстраверт", rightFull: "Интроверт" },
  "SN": { left: "S", right: "N", leftFull: "Мэдрэхүй", rightFull: "Зөн совин" },
  "TF": { left: "T", right: "F", leftFull: "Сэтгэлгээ", rightFull: "Мэдрэмж" },
  "JP": { left: "J", right: "P", leftFull: "Шийдэмгий", rightFull: "Ойлголт" },
};

function calculateMBTI(answers: Record<string, string>): string {
  const counts: Record<string, number> = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach((dim) => {
    if (dim && counts[dim] !== undefined) counts[dim]++;
  });
  return (
    (counts.E >= counts.I ? "E" : "I") +
    (counts.S >= counts.N ? "S" : "N") +
    (counts.T >= counts.F ? "T" : "F") +
    (counts.J >= counts.P ? "J" : "P")
  );
}

function getDimensionScores(answers: Record<string, string>) {
  const counts: Record<string, number> = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).forEach((dim) => {
    if (dim && counts[dim] !== undefined) counts[dim]++;
  });
  const total = (pair: [string, string]) => counts[pair[0]] + counts[pair[1]] || 1;
  return [
    { key: "EI", leftVal: counts.E, rightVal: counts.I, total: total(["E", "I"]) },
    { key: "SN", leftVal: counts.S, rightVal: counts.N, total: total(["S", "N"]) },
    { key: "TF", leftVal: counts.T, rightVal: counts.F, total: total(["T", "F"]) },
    { key: "JP", leftVal: counts.J, rightVal: counts.P, total: total(["J", "P"]) },
  ];
}

type ViewMode = "intro" | "test" | "done" | "manual";

export default function MBTIModule({
  onComplete,
}: {
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [detectedType, setDetectedType] = useState<string>("");
  const [manualType, setManualType] = useState<string>("");
  const [animating, setAnimating] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const question = mbtiQuestions[currentQ];
  const totalQ = mbtiQuestions.length;
  const progress = Math.round((currentQ / totalQ) * 100);

  const handleSubmitType = useCallback(async (type: string) => {
    if (!type) return;
    onComplete({ mbtiType: type });
    setMatchError(null);
    setLoadingMatches(true);
    try {
      const res = await fetch("/api/profile/match", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mbtiType: type, top: 6 }),
      });
      if (!res.ok) {
        const text = await res.text();
        setMatchError(text || `Server error ${res.status}`);
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data?.error) setMatchError(data.error);
      } else {
        const text = await res.text();
        setMatchError(text || "Unexpected response");
      }
    } catch (e) {
      console.error(e);
      setMatchError("Серверт холбогдоход алдаа гарлаа");
    } finally {
      setLoadingMatches(false);
    }
  }, [onComplete]);

  const handleTestAnswer = (dimension: string, optId: string) => {
    if (animating) return;
    setSelectedOpt(optId);
    setAnimating(true);

    setTimeout(() => {
      const q = mbtiQuestions[currentQ];
      const newAnswers = { ...testAnswers, [q.id]: dimension };
      setTestAnswers(newAnswers);
      setSelectedOpt(null);

      if (currentQ + 1 < totalQ) {
        setCurrentQ(currentQ + 1);
        setAnimating(false);
      } else {
        const result = calculateMBTI(newAnswers);
        setDetectedType(result);
        setManualType(result);
        setViewMode("done");
        setAnimating(false);
      }
    }, 350);
  };

  const handleRestart = () => {
    setViewMode("intro");
    setCurrentQ(0);
    setTestAnswers({});
    setDetectedType("");
    setSelectedOpt(null);
    setAnimating(false);
  };

  const dimensionScores = detectedType ? getDimensionScores(testAnswers) : [];
  const mbtiInfo = MBTI_DESCRIPTIONS[detectedType] || {
    title: "Хувийн шинж",
    emoji: "✨",
    desc: "Таны хувийн шинжийн дүн шинжилгээ.",
    color: "#1b3a6b",
  };

  // ── INTRO SCREEN ──────────────────────────────────────────────────────────
  if (viewMode === "intro") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 min-h-[calc(100vh-56px)]">
        <div className="w-full max-w-lg">
          {/* Hero card */}
          <div
            className="rounded-3xl p-8 sm:p-10 mb-6 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1b3a6b 0%, #2d5aa0 60%, #3b6fd4 100%)" }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10" style={{ background: "#f5a623" }} />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10" style={{ background: "#f5a623" }} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(245,166,35,0.2)" }}>
                  🧬
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Модуль 1</p>
                  <h2 className="text-xl font-bold">MBTI Хувийн шинж</h2>
                </div>
              </div>

              <p className="text-sm opacity-80 leading-relaxed mb-6">
                16 хувийн шинжийн загвараас өөрийнхөө төрлийг олоорой. Асуултуудад үнэнчээр хариулснаар таны карьерийн зам тодорхой болно.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: "❓", label: `${totalQ} асуулт` },
                  { icon: "⏱️", label: "~10 минут" },
                  { icon: "🎯", label: "16 төрөл" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="text-lg mb-1">{item.icon}</div>
                    <p className="text-xs font-medium opacity-90">{item.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setViewMode("test")}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "#f5a623", color: "#1b3a6b" }}
              >
                Тест эхлэх →
              </button>
            </div>
          </div>

          {/* Manual option */}
          <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
            <p className="text-sm font-semibold text-foreground mb-3">Аль хэдийн мэдэх үү?</p>
            <p className="text-xs text-muted-foreground mb-4">Хэрэв та өөрийн MBTI төрлийг мэдэж байвал шууд оруулж болно.</p>
            <div className="flex gap-2">
              <select
                value={manualType}
                onChange={(e) => setManualType(e.target.value)}
                className="flex-1 px-3 py-2.5 border border-border rounded-xl bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="">-- MBTI сонгох --</option>
                {MBTI_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={() => { if (manualType) handleSubmitType(manualType); }}
                disabled={!manualType}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                style={{ background: "#1b3a6b", color: "#fff" }}
              >
                Оруулах
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TEST SCREEN ───────────────────────────────────────────────────────────
  if (viewMode === "test") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 min-h-[calc(100vh-56px)]">
        <div className="w-full max-w-xl">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Буцах
            </button>
            <span className="text-xs font-semibold text-muted-foreground">
              {currentQ + 1} <span className="opacity-50">/</span> {totalQ}
            </span>
          </div>

          {/* Progress bar with dots */}
          <div className="mb-6">
            <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #1b3a6b 0%, #2d5aa0 100%)",
                }}
              />
            </div>
            {/* Dimension labels */}
            <div className="flex justify-between mt-2">
              {["E/I", "S/N", "T/F", "J/P"].map((dim, i) => {
                const qPerDim = Math.ceil(totalQ / 4);
                const dimStart = i * qPerDim;
                const dimEnd = Math.min((i + 1) * qPerDim, totalQ);
                const isDimDone = currentQ >= dimEnd;
                const isDimActive = currentQ >= dimStart && currentQ < dimEnd;
                return (
                  <span
                    key={dim}
                    className="text-xs font-bold transition-colors duration-300"
                    style={{
                      color: isDimDone ? "#16a34a" : isDimActive ? "#1b3a6b" : "#94a3b8",
                    }}
                  >
                    {dim}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Question card */}
          <div
            className="bg-card border border-border rounded-3xl p-7 sm:p-9 card-shadow-md mb-5"
            style={{ transition: "opacity 0.2s", opacity: animating ? 0.5 : 1 }}
          >
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "#eff4ff", color: "#1b3a6b" }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#1b3a6b" }} />
                Асуулт {currentQ + 1}
              </span>
            </div>

            {/* Question text */}
            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-2">
              {question.text}
            </h3>
            {question.subtext && (
              <p className="text-sm text-muted-foreground mb-1">{question.subtext}</p>
            )}
          </div>

          {/* Answer options */}
          <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt.id;
              const letters = ["A", "B"];
              return (
                <button
                  key={opt.id}
                  onClick={() => handleTestAnswer(opt.dimension || "", opt.id)}
                  disabled={animating}
                  className="group w-full text-left rounded-2xl border transition-all duration-200 disabled:cursor-not-allowed"
                  style={{
                    padding: "16px 20px",
                    borderColor: isSelected ? "#1b3a6b" : "#e2e8f0",
                    background: isSelected
                      ? "linear-gradient(135deg, #eff4ff 0%, #dbeafe 100%)"
                      : "#ffffff",
                    boxShadow: isSelected
                      ? "0 0 0 2px #1b3a6b" :"0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
                    transform: isSelected ? "scale(0.99)" : "scale(1)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200"
                      style={{
                        background: isSelected ? "#1b3a6b" : "#f1f5f9",
                        color: isSelected ? "#ffffff" : "#64748b",
                      }}
                    >
                      {letters[idx]}
                    </div>
                    <p
                      className="text-sm font-medium leading-relaxed pt-1 transition-colors duration-200"
                      style={{ color: isSelected ? "#1b3a6b" : "#0f172a" }}
                    >
                      {opt.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Skip / cancel */}
          <div className="flex justify-center mt-5">
            <button
              onClick={handleRestart}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Тестийг цуцлах
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────────────
  if (viewMode === "done") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 min-h-[calc(100vh-56px)]">
        <div className="w-full max-w-lg">

          {/* Result hero */}
          <div
            className="rounded-3xl p-8 sm:p-10 mb-5 text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${mbtiInfo.color} 0%, ${mbtiInfo.color}cc 100%)` }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 bg-white" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 bg-white" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Таны MBTI төрөл</span>
              </div>

              <div className="flex items-center gap-5 mb-4">
                <div className="text-6xl sm:text-7xl font-black tracking-tight">{detectedType}</div>
                <div>
                  <div className="text-3xl mb-1">{mbtiInfo.emoji}</div>
                  <div className="text-lg font-bold">{mbtiInfo.title}</div>
                </div>
              </div>

              <p className="text-sm opacity-85 leading-relaxed">{mbtiInfo.desc}</p>
            </div>
          </div>

          {/* Dimension breakdown */}
          <div className="bg-card border border-border rounded-3xl p-6 card-shadow-md mb-5">
            <h4 className="text-sm font-bold text-foreground mb-4">Хэмжигдэхүүний үр дүн</h4>
            <div className="flex flex-col gap-4">
              {dimensionScores.map((dim) => {
                const labels = DIMENSION_LABELS[dim.key];
                const leftPct = Math.round((dim.leftVal / dim.total) * 100);
                const rightPct = 100 - leftPct;
                const dominantLeft = dim.leftVal >= dim.rightVal;
                return (
                  <div key={dim.key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className="text-xs font-bold"
                        style={{ color: dominantLeft ? "#1b3a6b" : "#94a3b8" }}
                      >
                        {labels.leftFull} ({labels.left})
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: !dominantLeft ? "#1b3a6b" : "#94a3b8" }}
                      >
                        ({labels.right}) {labels.rightFull}
                      </span>
                    </div>
                    <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${leftPct}%`,
                          background: "linear-gradient(90deg, #1b3a6b 0%, #2d5aa0 100%)",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{leftPct}%</span>
                      <span className="text-xs text-muted-foreground">{rightPct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSubmitType(detectedType)}
              disabled={loadingMatches}
              className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #1b3a6b 0%, #2d5aa0 100%)", color: "#fff" }}
            >
              {loadingMatches ? "Боловсруулж байна..." : `${detectedType} — Энэ төрлийг ашиглах →`}
            </button>
            <button
              onClick={handleRestart}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm border border-border hover:bg-secondary transition-all duration-200"
              style={{ color: "#1b3a6b" }}
            >
              Дахин тест өгөх
            </button>
          </div>

          {matchError && (
            <p className="text-sm text-red-600 mt-3 text-center">{matchError}</p>
          )}
        </div>
      </div>
    );
  }

  return null;
}
