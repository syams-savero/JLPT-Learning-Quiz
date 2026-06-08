"use client";

import { useState, useEffect } from "react";
import { BunpouItem, shuffleArray } from "@/lib/utils";

interface BunpouQuizProps {
  data: {
    bunpou: BunpouItem[];
  };
}

export default function BunpouQuiz({ data }: BunpouQuizProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledParts, setShuffledParts] = useState<{ text: string, originalIndex: number }[]>([]);
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const currentItem = data.bunpou[currentIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setShuffledParts(shuffleArray(currentItem.parts.map((p, i) => ({ text: p, originalIndex: i }))));
  }, [currentIndex, mounted, currentItem.parts]);

  const handlePartClick = (originalIndex: number) => {
    if (showResult || selectedParts.includes(originalIndex)) return;
    const newSelected = [...selectedParts, originalIndex];
    setSelectedParts(newSelected);

    if (newSelected.length === currentItem.parts.length) {
      const correct = newSelected.every((val, index) => val === index);
      setIsCorrect(correct);
      setShowResult(true);
      if (correct) setScore(score + 1);
    }
  };

  const handleReset = () => {
    setSelectedParts([]);
  };

  const handleNext = () => {
    if (currentIndex < data.bunpou.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedParts([]);
      setShowResult(false);
      setIsCorrect(null);
    } else {
      alert(`Quiz Selesai! Skor Anda: ${score}/${data.bunpou.length}`);
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
    }
  };

  const renderTextWithFurigana = (text: string) => {
    // Format: 漢[かん]字[じ]
    const regex = /([^\[\]]+)\[([^\[\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const kanji = match[1];
      const reading = match[2];
      
      parts.push(
        <ruby key={match.index}>
          {kanji}
          <rt className="text-[10px] text-blue-500 font-bold">{reading}</rt>
        </ruby>
      );
      
      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  if (!mounted) return <div className="max-w-md mx-auto p-4 h-64 flex items-center justify-center text-black font-bold">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-black font-bold">
          Soal {currentIndex + 1} / {data.bunpou.length}
        </span>
        <span className="text-sm font-bold text-blue-600">Skor: {score}</span>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-black font-bold">Susun Kalimat:</h3>
        <p className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-xl min-h-[4rem] flex items-center justify-center flex-wrap gap-2 text-black font-bold">
          {currentItem.question.split("___")[0]}
          {selectedParts.map((idx) => (
            <span key={idx} className="text-blue-600 font-bold underline decoration-blue-300 decoration-2 underline-offset-4">
              {renderTextWithFurigana(currentItem.parts[idx])}
            </span>
          ))}
          {selectedParts.length < currentItem.parts.length && <span className="text-blue-300 animate-pulse">___</span>}
          {currentItem.question.split("___")[1]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {shuffledParts.map((part) => (
          <button
            key={part.originalIndex}
            onClick={() => handlePartClick(part.originalIndex)}
            disabled={showResult || selectedParts.includes(part.originalIndex)}
            className={`p-3 text-sm font-medium rounded-lg border-2 transition-all min-h-[3.5rem] flex items-center justify-center ${
              selectedParts.includes(part.originalIndex)
                ? "bg-gray-100 border-gray-100 text-gray-300"
                : "bg-white border-gray-200 hover:border-blue-400 active:bg-blue-50 text-black font-bold"
            }`}
          >
            <span className="leading-relaxed">{renderTextWithFurigana(part.text)}</span>
          </button>
        ))}
      </div>

      {!showResult && selectedParts.length > 0 && (
        <button
          onClick={handleReset}
          className="text-xs text-red-500 font-medium hover:underline block mx-auto"
        >
          Reset Susunan
        </button>
      )}

      {showResult && (
        <div className={`mt-6 p-4 rounded-lg animate-in fade-in slide-in-from-bottom-2 ${
          isCorrect ? "bg-green-50" : "bg-red-50"
        }`}>
          <p className={`font-bold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
            {isCorrect ? "Benar!" : "Salah!"}
          </p>
          <p className="mt-2 text-black font-extrabold">{currentItem.full_sentence}</p>
          <p className="text-blue-800 mt-1">Arti: {currentItem.meaning_id}</p>
          <button
            onClick={handleNext}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            {currentIndex < data.bunpou.length - 1 ? "Soal Berikutnya" : "Lihat Hasil Akhir"}
          </button>
        </div>
      )}
    </div>
  );
}
