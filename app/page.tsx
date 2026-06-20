"use client";

import { useState, useEffect } from "react";
import GoiQuiz from "@/components/GoiQuiz";
import type { GoiItem } from "@/lib/utils";
import BunpouQuiz from "@/components/BunpouQuiz";
import type { BunpouItem } from "@/lib/utils";
import GrammarReview from "@/components/GrammarReview";
import LandingPage from "@/components/LandingPage";

interface QuizData {
  week: number;
  day: number;
  goi: GoiItem[];
  bunpou: BunpouItem[];
  grammar_list: {
    title: string;
    meaning: string;
    structure: string;
    example: string;
  }[];
}

// Mapping of available data files
type DataLoader = () => Promise<{ default: Record<string, unknown> } | Record<string, unknown>>;

const dataMap: Record<string, DataLoader> = {
  "n3-w1-d1": () => import("@/data/w1d1.json"),
  "n3-w1-d2": () => import("@/data/w1d2.json"),
  "n3-w1-d3": () => import("@/data/w1d3.json"),
  "n3-w1-d4": () => import("@/data/w1d4.json"),
  "n3-w1-d5": () => import("@/data/w1d5.json"),
  "n3-w5-d1": () => import("@/data/w5d1.json"),
  "n3-w5-d2": () => import("@/data/w5d2.json"),
  "n3-w5-d3": () => import("@/data/w5d3.json"),
  "n3-w5-d4": () => import("@/data/w5d4.json"),
  "n3-w5-d5": () => import("@/data/w5d5.json"),
  "n3-w5-d6": () => import("@/data/w5d6.json"),
  "n3-w5-d7": () => import("@/data/w5d7.json"),
  "n3-w6-d1": () => import("@/data/w6d1.json"),
  "n3-w6-d2": () => import("@/data/w6d2.json"),
  "n3-w6-d3": () => import("@/data/w6d3.json"),
  "n3-w6-d4": () => import("@/data/w6d4.json"),
  "n3-w6-d5": () => import("@/data/w6d5.json"),
  "n3-w6-d6": () => import("@/data/w6d6.json"),
  "n3-w6-d7": () => import("@/data/w6d7.json"),
};

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [mode, setMode] = useState<"goi" | "bunpou">("goi");
  const [showBunpouQuiz, setShowBunpouQuiz] = useState(false);
  
  const [level] = useState("n3");
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);
  
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

  const dataKey = `${level}-w${week}-d${day}`;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (dataMap[dataKey]) {
          const mod = await dataMap[dataKey]();
          setQuizData((mod.default || mod) as QuizData);
        } else {
          setQuizData(null);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setQuizData(null);
      }
      setLoading(false);
    };
    loadData();
  }, [dataKey]);

  const handleModeChange = (newMode: "goi" | "bunpou") => {
    setMode(newMode);
    setShowBunpouQuiz(false);
  };

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          JLPT {level.toUpperCase()} Quiz
        </h1>
        
        {/* Selection UI */}
        <div className="flex gap-2 justify-center mt-4">
          <select 
            value={week} 
            onChange={(e) => setWeek(Number(e.target.value))}
            className="bg-white border border-gray-300 text-black font-bold text-sm rounded-lg p-2"
          >
            <option value={1}>Week 1</option>
            <option value={5}>Week 5</option>
            <option value={6}>Week 6</option>
          </select>
          <select 
            value={day} 
            onChange={(e) => setDay(Number(e.target.value))}
            className="bg-white border border-gray-300 text-black font-bold text-sm rounded-lg p-2"
          >
            {[1, 2, 3, 4, 5, 6, 7].map(d => (
              <option key={d} value={d}>Day {d}</option>
            ))}
          </select>
        </div>
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
        {loading ? (
          <div className="text-center py-20 text-black font-bold">Memuat Data...</div>
        ) : quizData ? (
          mode === "goi" ? (
            <GoiQuiz key={dataKey} data={quizData} />
          ) : showBunpouQuiz ? (
            <div className="space-y-4">
               <button 
                onClick={() => setShowBunpouQuiz(false)}
                className="max-w-md mx-auto block text-blue-600 font-bold text-sm hover:underline mb-2"
              >
                ← Kembali ke Materi
              </button>
              <BunpouQuiz key={dataKey} data={quizData} />
            </div>
          ) : (
            <GrammarReview data={quizData} onStartQuiz={() => setShowBunpouQuiz(true)} />
          )
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-black font-bold mb-4">Materi untuk Week {week} Day {day} belum tersedia.</p>
            <p className="text-gray-500 text-sm">Silakan pilih materi lain atau tambahkan data baru.</p>
          </div>
        )}
      </div>

      <footer className="max-w-md mx-auto mt-12 text-center text-gray-400 text-xs font-bold">
        <p>© 2026 JLPT N3 Study Companion</p>
        <p className="mt-1">Nihongo Sou Matome Prep</p>
      </footer>
    </main>
  );
}
