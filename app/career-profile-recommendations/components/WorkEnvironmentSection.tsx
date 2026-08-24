import React from "react";

type WorkEnv = {
  id: string;
  icon: string;
  title: string;
  match: number;
  desc: string;
};
type CollabStyle = { id: string; style: string; desc: string; match: string };

const COLLAB_MATCH_COLORS: Record<string, string> = {
  "Маш тохиромжтой": "bg-emerald-100 text-emerald-700 border-emerald-200",
  Тохиромжтой: "bg-blue-100 text-blue-700 border-blue-200",
  "Бага тохиромжтой": "bg-red-100 text-red-700 border-red-200",
};

export default function WorkEnvironmentSection({
  environments,
  collaborationStyles,
}: {
  environments: WorkEnv[];
  collaborationStyles: CollabStyle[];
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Work environments */}
      <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
        <h3 className="text-base font-bold text-foreground mb-1">
          Ажлын орчны тохиромж
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          Таны INTJ хувь онцлогт тохирсон орчин
        </p>
        <div className="space-y-3">
          {environments.map((env) => (
            <div key={env.id} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {env.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">
                    {env.title}
                  </span>
                  <span className="text-sm font-bold text-primary tabular-nums flex-shrink-0">
                    {env.match}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-700"
                    style={{ width: `${env.match}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{env.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration styles */}
      <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
        <h3 className="text-base font-bold text-foreground mb-1">
          Хамтын ажиллагааны хэв маяг
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          Та ямар нөхцөлд хамгийн сайн ажилладаг вэ
        </p>
        <div className="space-y-3">
          {collaborationStyles.map((collab) => {
            const matchColor =
              COLLAB_MATCH_COLORS[collab.match] ||
              "bg-muted text-muted-foreground border-border";
            return (
              <div
                key={collab.id}
                className="flex items-start gap-4 p-3 rounded-xl border border-border hover:border-primary/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">
                      {collab.style}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${matchColor}`}
                    >
                      {collab.match}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{collab.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
