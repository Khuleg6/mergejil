"use client";

import React, { useState } from "react";
import { mbtiQuestions } from "./assessmentData";

const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

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

export default function MBTIModule({
  onComplete,
}: {
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [manualType, setManualType] = useState<string>("");
  const [matches, setMatches] = useState<any[] | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  // Inline test state
  const [testMode, setTestMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testDone, setTestDone] = useState(false);
  const [detectedType, setDetectedType] = useState<string>("");

  const handleSubmitManual = async (type: string) => {
    if (!type) return;
    onComplete({ mbtiType: type });
    setMatchError(null);
    setMatches(null);
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
      let data: any;
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        setMatchError(text || "Unexpected non-JSON response from server");
        return;
      }
      if (data?.matches) {
        setMatches(data.matches);
      } else if (data?.error) {
        setMatchError(data.error);
      } else {
        setMatchError("Үр дүн олдсонгүй");
      }
    } catch (e) {
      console.error(e);
      setMatchError("Серверт холбогдоход алдаа гарлаа");
    } finally {
      setLoadingMatches(false);
    }
  };

  const handleTestAnswer = (dimension: string) => {
    const q = mbtiQuestions[currentQ];
    const newAnswers = { ...testAnswers, [q.id]: dimension };
    setTestAnswers(newAnswers);

    if (currentQ + 1 < mbtiQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      const result = calculateMBTI(newAnswers);
      setDetectedType(result);
      setManualType(result);
      setTestDone(true);
      setTestMode(false);
    }
  };

  const handleUseDetectedType = () => {
    handleSubmitManual(detectedType);
  };

  const handleRestartTest = () => {
    setTestMode(false);
    setTestDone(false);
    setCurrentQ(0);
    setTestAnswers({});
    setDetectedType("");
  };

  const question = mbtiQuestions[currentQ];
  const progress = Math.round((currentQ / mbtiQuestions.length) * 100);

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Manual MBTI selection */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-3">Та MBTI-гээ сонгоно уу</h3>
          <div className="flex gap-2">
            <select
              value={manualType}
              onChange={(e) => setManualType(e.target.value)}
              className="flex-1 p-3 border rounded-md bg-card"
            >
              <option value="">-- Сонгох --</option>
              {MBTI_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleSubmitManual(manualType)}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Оруулах
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Эндээс өөрийн MBTI төрлийг сонгоно уу.
          </p>
        </div>

        {/* Inline MBTI test */}
        {!testMode && !testDone && (
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-3">
              MBTI тест өгөх
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Манай суулгасан MBTI тестийг өгч, өөрийн төрлийг тодорхойлоорой!
            </p>
            <button
              onClick={() => { setTestMode(true); setCurrentQ(0); setTestAnswers({}); }}
              className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors text-sm"
            >
              Тест рүү очих
            </button>
          </div>
        )}

        {/* Test in progress */}
        {testMode && !testDone && (
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">MBTI Тест</h3>
              <span className="text-sm text-muted-foreground">
                {currentQ + 1} / {mbtiQuestions.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-base font-medium mb-2">{question.text}</p>
            {question.subtext && (
              <p className="text-sm text-muted-foreground mb-4">{question.subtext}</p>
            )}

            <div className="flex flex-col gap-3 mt-4">
              {question.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleTestAnswer(opt.dimension || "")}
                  className="w-full text-left px-4 py-3 border border-border rounded-xl hover:bg-secondary hover:border-primary transition-all duration-150 text-sm"
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <button
              onClick={handleRestartTest}
              className="mt-4 text-xs text-muted-foreground underline"
            >
              Цуцлах
            </button>
          </div>
        )}

        {/* Test done — show result */}
        {testDone && (
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-2">Таны MBTI төрөл</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-primary">{detectedType}</span>
              <p className="text-sm text-muted-foreground">
                Тест дууссан! Таны хариулт дээр үндэслэн тооцоолсон MBTI төрөл.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleUseDetectedType}
                className="px-4 py-2 bg-primary text-white rounded-md text-sm"
              >
                Энэ төрлийг ашиглах
              </button>
              <button
                onClick={handleRestartTest}
                className="px-4 py-2 border border-border rounded-md text-sm hover:bg-secondary transition-colors"
              >
                Дахин өгөх
              </button>
            </div>
          </div>
        )}

        {loadingMatches && <p className="text-sm mt-3">Ачааллаж байна...</p>}
        {matchError && (
          <p className="text-sm text-red-600 mt-3">{matchError}</p>
        )}
        {matches && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Тохирох мэргэжлүүд</h4>
            <ul className="space-y-2">
              {matches.map((m: any) => (
                <li key={m.id} className="p-3 border rounded-md bg-card">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {m.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {Math.round(m.score * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.explanation}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
