"use client";

import React from "react";
import Link from "next/link";
import { type AssessmentAnswers } from "./AssessmentPageClient";

const MODULES = [
  {
    id: "header-mod-mbti",
    label: "MBTI",
    sublabel: "Хувийн шинж",
    duration: "10 мин",
  },
  {
    id: "header-mod-iq",
    label: "IQ",
    sublabel: "Танин мэдэхүй",
    duration: "15 мин",
  },
  {
    id: "header-mod-skills",
    label: "Ур чадвар",
    sublabel: "Практик",
    duration: "8 мин",
  },
];

export default function AssessmentHeader({
  moduleIndex,
  answers,
}: {
  moduleIndex: number;
  answers: AssessmentAnswers;
}) {
  const totalAnswered =
    Object.keys(answers.mbti).length +
    Object.keys(answers.iq).length +
    Object.keys(answers.skills).length;
  const totalQuestions = 47;
  const progressPct = Math.round((totalAnswered / totalQuestions) * 100);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L8 15M1 8L15 8"
                  stroke="#F5A623"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 1L10.5 4.5M8 1L5.5 4.5"
                  stroke="#F5A623"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-bold text-sm text-primary hidden sm:block">
              Мэргэжил.мн
            </span>
          </Link>

          {/* Module steps */}
          <div className="flex items-center gap-1 sm:gap-4">
            {MODULES.map((mod, idx) => {
              const isDone = idx < moduleIndex;
              const isActive = idx === moduleIndex;
              return (
                <div key={mod.id} className="flex items-center gap-1 sm:gap-2">
                  <div
                    className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : isDone
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isActive
                          ? "bg-white/20"
                          : isDone
                            ? "bg-success/20"
                            : "bg-border"
                      }`}
                    >
                      {isDone ? (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5L4.5 7.5L8 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-semibold leading-none">
                        {mod.label}
                      </div>
                      <div className="text-xs opacity-70 leading-none mt-0.5">
                        {mod.duration}
                      </div>
                    </div>
                    <span className="sm:hidden text-xs font-semibold">
                      {mod.label}
                    </span>
                  </div>
                  {idx < MODULES.length - 1 && (
                    <div
                      className={`w-4 sm:w-8 h-0.5 ${idx < moduleIndex ? "bg-success" : "bg-border"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-foreground tabular-nums">
                {progressPct}%
              </span>
              <span className="text-xs text-muted-foreground">
                {totalAnswered}/{totalQuestions}
              </span>
            </div>
            <div className="w-16 sm:w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
