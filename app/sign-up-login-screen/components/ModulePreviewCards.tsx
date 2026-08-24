import React from "react";

const modules = [
  {
    id: "module-mbti",
    number: "01",
    title: "MBTI Хувийн шинж",
    desc: "16 хувийн онцлогийн төрөл",
    duration: "10 мин",
    color: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-400/20",
    dot: "bg-violet-400",
    icon: "🧠",
  },
  {
    id: "module-iq",
    title: "IQ Танин мэдэхүй",
    number: "02",
    desc: "Логик, орон зай, хэл, бүтээлч",
    duration: "15 мин",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-400/20",
    dot: "bg-blue-400",
    icon: "⚡",
  },
  {
    id: "module-skills",
    title: "Практик Ур чадвар",
    number: "03",
    desc: "Техник, нийгмийн, бүтээлч, удирдлага",
    duration: "8 мин",
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-400/20",
    dot: "bg-amber-400",
    icon: "🎯",
  },
];

export default function ModulePreviewCards({
  compact = false,
}: {
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex gap-2">
        {modules.map((m) => (
          <div
            key={m.id}
            className="flex-1 p-3 bg-secondary border border-border rounded-xl"
          >
            <div className="text-lg mb-1">{m.icon}</div>
            <div className="text-xs font-semibold text-foreground leading-tight">
              {m.title}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {m.duration}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {modules.map((m) => (
        <div
          key={m.id}
          className={`flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r ${m.color} border ${m.border}`}
        >
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
            {m.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-white/40 text-xs font-mono">
                {m.number}
              </span>
              <span className="text-white font-semibold text-sm">
                {m.title}
              </span>
            </div>
            <span className="text-white/50 text-xs">{m.desc}</span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
            <span className="text-white/60 text-xs font-medium">
              {m.duration}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
