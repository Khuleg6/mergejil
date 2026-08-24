"use client";

import React, { useState } from "react";
import ResultsHeader from "./ResultsHeader";
import ProfileHeroSection from "./ProfileHeroSection";
import IQSection from "./IQSection";
import SkillsRadarSection from "./SkillsRadarSection";
import ProfessionCards from "./ProfessionCards";
import UniversitySection from "./UniversitySection";
import WorkEnvironmentSection from "./WorkEnvironmentSection";
import RoadmapSection from "./RoadmapSection";
import { PROFILE_DATA } from "./resultsData";

export default function ResultsPageClient() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "professions" | "education" | "roadmap"
  >("profile");

  const tabs = [
    {
      id: "tab-profile",
      key: "profile" as const,
      label: "Профайл",
      icon: "👤",
    },
    {
      id: "tab-professions",
      key: "professions" as const,
      label: "Мэргэжлүүд",
      icon: "💼",
    },
    {
      id: "tab-education",
      key: "education" as const,
      label: "Боловсрол",
      icon: "🎓",
    },
    {
      id: "tab-roadmap",
      key: "roadmap" as const,
      label: "Roadmap",
      icon: "🗺️",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ResultsHeader user={PROFILE_DATA.user} />

      {/* Tab navigation */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-8">
        {activeTab === "profile" && (
          <div className="space-y-8">
            <ProfileHeroSection mbti={PROFILE_DATA.mbti} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <IQSection iq={PROFILE_DATA.iq} />
              <SkillsRadarSection skills={PROFILE_DATA.skills} />
            </div>
            <WorkEnvironmentSection
              environments={PROFILE_DATA.workEnvironments}
              collaborationStyles={PROFILE_DATA.collaborationStyles}
            />
          </div>
        )}
        {activeTab === "professions" && (
          <ProfessionCards professions={PROFILE_DATA.professions} />
        )}
        {activeTab === "education" && (
          <UniversitySection
            universities={PROFILE_DATA.universities}
            professions={PROFILE_DATA.professions}
          />
        )}
        {activeTab === "roadmap" && (
          <RoadmapSection
            roadmap={PROFILE_DATA.roadmap}
            totalXP={PROFILE_DATA.user.totalXP}
          />
        )}
      </main>
    </div>
  );
}
