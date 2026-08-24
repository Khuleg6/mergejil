"use client";

import React, { useState, useEffect, useCallback } from "react";
import { iqQuestions, IQ_CATEGORIES } from "./assessmentData";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const QUESTION_TIME = 45; // seconds per IQ question

export default function IQModule({
  onComplete,
}: {
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const question = iqQuestions[currentIndex];
  const isAnswered = !!answers[question.id];
  const activeCategory = question.category;

  const goNext = useCallback(() => {
    if (currentIndex < iqQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setTimeLeft(QUESTION_TIME);
    } else {
      onComplete(answers);
    }
  }, [currentIndex, answers, onComplete]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.setTimeout(goNext, 0);
          return QUESTION_TIME;
        }

        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [goNext]);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setTimeout(() => goNext(), 350);
  };

  const timePct = (timeLeft / QUESTION_TIME) * 100;
  const timeColor =
    timeLeft <= 10
      ? "text-danger"
      : timeLeft <= 20
        ? "text-warning"
        : "text-success";
  const timeBarColor =
    timeLeft <= 10 ? "#DC2626" : timeLeft <= 20 ? "#D97706" : "#16A34A";

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <h2 className="font-bold text-foreground text-base">
                IQ Танин мэдэхүйн тест
              </h2>
              <p className="text-xs text-muted-foreground">
                Асуулт бүрт {QUESTION_TIME} секунд байна
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className={timeColor} />
            <span
              className={`text-xl font-bold tabular-nums transition-colors ${timeColor}`}
            >
              {timeLeft}с
            </span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 linear"
            style={{ width: `${timePct}%`, backgroundColor: timeBarColor }}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {IQ_CATEGORIES.map((cat) => {
            const catQs = iqQuestions.filter((q) => q.category === cat.key);
            const catAnswered = catQs.filter((q) => answers[q.id]).length;
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  const firstUnanswered = iqQuestions.findIndex(
                    (q) => q.category === cat.key && !answers[q.id],
                  );
                  const firstInCat = iqQuestions.findIndex(
                    (q) => q.category === cat.key,
                  );
                  const targetIdx =
                    firstUnanswered >= 0 ? firstUnanswered : firstInCat;
                  if (targetIdx >= 0) {
                    setCurrentIndex(targetIdx);
                    setTimeLeft(QUESTION_TIME);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-border"
                  }`}
                >
                  {catAnswered}/{catQs.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Question card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow-md mb-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {IQ_CATEGORIES.find((c) => c.key === question.category)?.label} —
              Асуулт {currentIndex + 1}
            </span>
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-semibold text-primary tabular-nums">
              {currentIndex + 1}/{iqQuestions.length}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-6 leading-relaxed">
            {question.text}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option) => {
              const isSelected = answers[question.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {option.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex((i) => i - 1);
                setTimeLeft(QUESTION_TIME);
              }
            }}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
            Буцах
          </button>

          <span className="text-xs text-muted-foreground tabular-nums">
            {Object.keys(answers).length} / {iqQuestions.length} хариулсан
          </span>

          <button
            onClick={goNext}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          >
            {currentIndex === iqQuestions.length - 1
              ? "Дуусгах"
              : isAnswered
                ? "Дараагийн"
                : "Алгасах"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
