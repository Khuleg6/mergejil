"use client";

import React, { useState } from "react";
import AssessmentHeader from "./AssessmentHeader";
import MBTIModule from "./MBTIModule";
import IQModule from "./IQModule";
import SkillsModule from "./SkillsModule";
import ModuleComplete from "./ModuleComplete";
import { useRouter } from "next/navigation";

export type ModuleState =
  | "mbti" |"mbti-complete" |"iq" |"iq-complete" |"skills" |"skills-complete" |"submitting";

export type AssessmentAnswers = {
  mbti: Record<string, string>;
  iq: Record<string, string>;
  skills: Record<string, string>;
};

export default function AssessmentPageClient() {
  const [currentModule, setCurrentModule] = useState<ModuleState>("mbti");
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    mbti: {},
    iq: {},
    skills: {},
  });
  const router = useRouter();

  const handleMBTIComplete = (mbtiAnswers: Record<string, string>) => {
    setAnswers((prev) => ({ ...prev, mbti: mbtiAnswers }));
    setCurrentModule("mbti-complete");
  };

  const handleIQComplete = (iqAnswers: Record<string, string>) => {
    setAnswers((prev) => ({ ...prev, iq: iqAnswers }));
    setCurrentModule("iq-complete");
  };

  const handleSkillsComplete = (skillsAnswers: Record<string, string>) => {
    setAnswers((prev) => ({ ...prev, skills: skillsAnswers }));
    setCurrentModule("skills-complete");
  };

  const handleFinalSubmit = async () => {
    setCurrentModule("submitting");
    // BACKEND INTEGRATION: POST /api/assessment/submit with all answers → triggers AI profile generation
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/career-profile-recommendations");
  };

  const getModuleIndex = () => {
    if (currentModule === "mbti" || currentModule === "mbti-complete") return 0;
    if (currentModule === "iq" || currentModule === "iq-complete") return 1;
    return 2;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AssessmentHeader
        moduleIndex={getModuleIndex()}
        answers={answers}
      />

      <main className="flex-1 flex flex-col">
        {currentModule === "mbti" && (
          <MBTIModule onComplete={handleMBTIComplete} />
        )}
        {currentModule === "mbti-complete" && (
          <ModuleComplete
            moduleKey="mbti"
            title="MBTI Тест дууслаа!"
            subtitle="Хувийн шинжийн үнэлгээ амжилттай дууслаа"
            xp={120}
            nextLabel="IQ Тест эхлэх →"
            onNext={() => setCurrentModule("iq")}
            stats={[
              {
                label: "Хариулсан асуулт",
                value: `${Object.keys(answers.mbti).length}/20`,
              },
              { label: "Олгосон XP", value: "+120 XP" },
              { label: "Дараагийн модуль", value: "IQ Тест" },
            ]}
          />
        )}
        {currentModule === "iq" && <IQModule onComplete={handleIQComplete} />}
        {currentModule === "iq-complete" && (
          <ModuleComplete
            moduleKey="iq"
            title="IQ Тест дууслаа!"
            subtitle="Танин мэдэхүйн чадварын үнэлгээ дууслаа"
            xp={150}
            nextLabel="Ур чадварын тест эхлэх →"
            onNext={() => setCurrentModule("skills")}
            stats={[
              {
                label: "Хариулсан асуулт",
                value: `${Object.keys(answers.iq).length}/15`,
              },
              { label: "Олгосон XP", value: "+150 XP" },
              { label: "Дараагийн модуль", value: "Ур чадвар" },
            ]}
          />
        )}
        {currentModule === "skills" && (
          <SkillsModule onComplete={handleSkillsComplete} />
        )}
        {(currentModule === "skills-complete" ||
          currentModule === "submitting") && (
          <ModuleComplete
            moduleKey="skills"
            title="Бүх тест дууслаа! 🎉"
            subtitle="Таны карьерийн профайл боловсруулагдаж байна..."
            xp={100}
            nextLabel={
              currentModule === "submitting" ?"Боловсруулж байна..." :"Карьерийн профайл харах →"
            }
            onNext={handleFinalSubmit}
            isLoading={currentModule === "submitting"}
            isFinal
            stats={[
              { label: "Нийт олгосон XP", value: "+370 XP" },
              { label: "Дууссан модуль", value: "3/3" },
              { label: "Зарцуулсан хугацаа", value: "~32 мин" },
            ]}
          />
        )}
      </main>
    </div>
  );
}
