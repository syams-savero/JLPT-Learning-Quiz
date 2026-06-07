"use client";

import { useState } from "react";
import GoiQuiz from "@/components/GoiQuiz";
import BunpouQuiz from "@/components/BunpouQuiz";
import GrammarReview from "@/components/GrammarReview";

export default function Home() {
  const [mode, setMode] = useState<"goi" | "bunpou">("goi");
  const [showBunpouQuiz, setShowBunpouQuiz] = useState(false);

  const handleModeChange = (newMode: "goi" | "bunpou") => {
    setMode(newMode);
    setShowBunpouQuiz(false); // Reset Bunpou state when switching modes
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          JLPT N3 Quiz
        </h1>
        <p className="text-black font-bold">Week 5 Day 1</p>
      </div>

      <div className="max-w-md mx-auto mb-6 flex bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => handleModeChange("goi")}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
            mode === "goi"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Goi (Vocabulary)
        </button>
        <button
          onClick={() => handleModeChange("bunpou")}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
            mode === "bunpou"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Bunpou (Grammar)
        </button>
      </div>

      <div className="animate-in fade-in duration-500">
        {mode === "goi" ? (
          <GoiQuiz />
        ) : showBunpouQuiz ? (
          <div className="space-y-4">
             <button 
              onClick={() => setShowBunpouQuiz(false)}
              className="max-w-md mx-auto block text-blue-600 font-bold text-sm hover:underline mb-2"
            >
              ← Kembali ke Materi
            </button>
            <BunpouQuiz />
          </div>
        ) : (
          <GrammarReview onStartQuiz={() => setShowBunpouQuiz(true)} />
        )}
      </div>

      <footer className="max-w-md mx-auto mt-12 text-center text-gray-400 text-xs">
        <p>© 2026 JLPT N3 Study Companion</p>
        <p className="mt-1">Nihongo Sou Matome Prep</p>
      </footer>
    </main>
  );
}
