"use client";

import { useState, useMemo } from "react";
import { GoiItem, shuffleArray } from "@/lib/utils";

interface GoiQuizProps {
  data: {
    goi: GoiItem[];
  };
}

export default function GoiQuiz({ data }: GoiQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentItem = data.goi[currentIndex];

  const options = useMemo(() => {
    const correct = currentItem.reading;
    const others = data.goi
      .filter((g) => g.reading !== correct)
      .map((g) => g.reading);
    const shuffledOthers = shuffleArray(others).slice(0, 3);
    return shuffleArray([correct, ...shuffledOthers]);
  }, [currentItem.reading, data.goi]);

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === currentItem.reading;
    setShowResult(true);
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentIndex < data.goi.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      alert(`Quiz Selesai! Skor Anda: ${score}/${data.goi.length}`);
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-black">
          Soal {currentIndex + 1} / {data.goi.length}
        </span>
        <span className="text-sm font-bold text-blue-600">Skor: {score}</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-5xl font-bold py-8 text-black">{currentItem.kanji}</h2>
        <p className="text-black font-extrabold text-sm">Pilih cara baca yang benar:</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={showResult}
            className={`p-4 text-left rounded-lg border-2 transition-all ${
              showResult
                ? option === currentItem.reading
                  ? "border-green-500 bg-green-50 text-green-700 font-bold"
                  : option === selectedOption
                  ? "border-red-500 bg-red-50 text-red-700 font-bold"
                  : "border-gray-200 text-black font-bold"
                : "border-gray-300 hover:border-blue-600 active:bg-blue-50 text-black font-extrabold"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg animate-in fade-in slide-in-from-bottom-2">
          <p className="text-black font-extrabold">Arti: {currentItem.meaning_id}</p>
          <p className="text-blue-900 font-bold text-sm">EN: {currentItem.meaning_en}</p>
          <button
            onClick={handleNext}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            {currentIndex < data.goi.length - 1 ? "Soal Berikutnya" : "Lihat Hasil Akhir"}
          </button>
        </div>
      )}
    </div>
  );
}
