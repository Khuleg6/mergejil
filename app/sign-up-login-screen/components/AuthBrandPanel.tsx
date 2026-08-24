import React from "react";
import ModulePreviewCards from "./ModulePreviewCards";

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] gradient-hero flex-col justify-between p-12 xl:p-16 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #F5A623 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #F5A623 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />
      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center card-shadow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L12 22M2 12L22 12"
                stroke="#1B3A6B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M12 2L16 7M12 2L8 7"
                stroke="#1B3A6B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="2" fill="#1B3A6B" />
            </svg>
          </div>
          <div>
            <span className="text-white font-bold text-xl block">
              Мэргэжил.мн
            </span>
            <span className="text-white/60 text-xs">
              Career Guidance Platform
            </span>
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-semibold mb-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" />
            </svg>
            Монголын #1 Карьер удирдамжийн платформ
          </span>
        </div>

        <h1
          className="text-white font-bold leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Таны нуугдмал
          <br />
          <span className="text-accent">чадварыг илрүүлье</span>
        </h1>

        <p className="text-white/70 text-base leading-relaxed max-w-md mb-10">
          MBTI хувь хүний онцлог, IQ танин мэдэхүйн чадвар, практик ур чадварыг
          нэгтгэн таны хамгийн тохиромжтой мэргэжлийг тодорхойлно.
        </p>

        {/* Stats row */}
        <div className="flex gap-6 mb-10">
          {[
            { value: "12,400+", label: "Оролцогчид" },
            { value: "98%", label: "Хэрэглэгчийн сэтгэл ханамж" },
            { value: "33 мин", label: "Нийт хугацаа" },
          ]?.map((stat) => (
            <div key={`stat-${stat?.label}`}>
              <div className="text-white font-bold text-xl tabular-nums">
                {stat?.value}
              </div>
              <div className="text-white/50 text-xs">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Module preview */}
      <div className="relative z-10">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
          3 Үнэлгээний модуль
        </p>
        <ModulePreviewCards />
      </div>
      {/* Bottom quote */}
      <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
        <p className="text-white/60 text-sm italic leading-relaxed">
          &ldquo;Боловсролын зөв сонголт бол амьдралын хамгийн чухал
          шийдвэрүүдийн нэг.&rdquo;
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            Б
          </div>
          <div>
            <p className="text-white/80 text-xs font-semibold">Батболд Д.</p>
            <p className="text-white/40 text-xs">
              МУИС, Мэдээллийн технологи — INTJ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
