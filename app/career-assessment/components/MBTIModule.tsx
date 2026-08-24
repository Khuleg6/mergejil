"use client";

import React, { useState } from "react";
// no icon imports needed

const DIMENSION_LABELS: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  I: {
    label: "Дотогшоо",
    color: "text-violet-700",
    bg: "bg-violet-50 border-violet-200",
  },
  E: {
    label: "Гадагшаа",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  S: {
    label: "Мэдрэхүй",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
  N: {
    label: "Зөн совин",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
  },
  T: {
    label: "Сэтгэхүй",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  F: {
    label: "Мэдрэмж",
    color: "text-pink-700",
    bg: "bg-pink-50 border-pink-200",
  },
  J: {
    label: "Шүүлт",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  P: {
    label: "Хүлээн авах",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
  },
};

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

export default function MBTIModule({
  onComplete,
}: {
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [manualType, setManualType] = useState<string>("");
  const [matches, setMatches] = useState<any[] | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

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
              onClick={async () => {
                if (!manualType) return;
                const type = String(manualType || "")
                  .trim()
                  .toUpperCase();
                // keep existing contract
                onComplete({ mbtiType: type });

                // fetch matches and show them
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
                    setMatchError(
                      text || "Unexpected non-JSON response from server",
                    );
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
              }}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Оруулах
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Эндээс өөрийн MBTI төрлийг сонгоно уу.
          </p>
        </div>

        {/* External 16Personalities option */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-3">
            16Personalities тестээр өгөх
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            16Personalities-аас авсан үр дүн байгаа бол дээрх хэсэгт оруул!
            Хэрэв байхгүй бол тестээ өгнө үү!.
          </p>
          <div className="flex gap-2">
            <a
              href="https://16personalities.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-secondary rounded-md"
            >
              Тест рүү очих
            </a>
          </div>
        </div>

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

        {/* End MBTI input cards */}
      </div>
    </div>
  );
}
