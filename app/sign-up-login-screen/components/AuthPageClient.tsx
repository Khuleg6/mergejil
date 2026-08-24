"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ModulePreviewCards from "./ModulePreviewCards";
import AuthBrandPanel from "./AuthBrandPanel";

export default function AuthPageClient() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <AuthBrandPanel />

      {/* Right auth panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-card lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L10 18M2 10L18 10"
                  stroke="#F5A623"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 2L13 6M10 2L7 6"
                  stroke="#F5A623"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="font-bold text-lg text-primary">Мэргэжил.мн</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === "login"
                  ? "bg-card text-primary card-shadow font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Нэвтрэх
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === "register"
                  ? "bg-card text-primary card-shadow font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Бүртгүүлэх
            </button>
          </div>

          {mode === "login" ? (
            <LoginForm onSwitchToRegister={() => setMode("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode("login")} />
          )}

          {/* Demo credentials box */}
          <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-xl">
            <p className="text-xs font-semibold text-info mb-2">
              Демо бүртгэл:
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>И-мэйл:</span>
              <span className="font-mono text-foreground font-medium">
                batbold@mergezhil.mn
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Нууц үг:</span>
              <span className="font-mono text-foreground font-medium">
                Mergezhil2026!
              </span>
            </div>
          </div>
        </div>

        {/* Mobile module preview */}
        <div className="w-full max-w-md mt-8 lg:hidden">
          <ModulePreviewCards compact />
        </div>
      </div>
    </div>
  );
}
