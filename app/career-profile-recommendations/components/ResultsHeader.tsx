"use client";

import React from "react";
import Link from "next/link";
import { Download, Share2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function ResultsHeader({
  user,
}: {
  user: { name: string; totalXP: number; completedAt: string };
}) {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
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

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-accent text-sm">⭐</span>
              <span className="text-sm font-bold text-accent tabular-nums">
                {user.totalXP} XP
              </span>
            </div>

            <button
              onClick={() =>
                toast.success("Холбоос хуулагдлаа!", {
                  description: "Найздаа илгээж болно",
                })
              }
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all duration-150"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Хуваалцах</span>
            </button>

            <button
              onClick={() =>
                toast.info("PDF татаж байна...", {
                  description: "Карьерийн профайл татагдаж байна",
                })
              }
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white gradient-primary rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Татах</span>
            </button>

            <Link
              href="/career-assessment"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all duration-150"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Дахин өгөх</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
