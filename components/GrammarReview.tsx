"use client";

import data from "@/data/w5d1.json";

interface GrammarReviewProps {
  onStartQuiz: () => void;
}

export default function GrammarReview({ onStartQuiz }: GrammarReviewProps) {
  const renderTextWithFurigana = (text: string) => {
    const regex = /([^\[\]]+)\[([^\[\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
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
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-8 border-blue-600">
        <h2 className="text-2xl font-black text-black mb-4">Materi Bunpou Week 5 Day 1</h2>
        <p className="text-gray-700">Pelajari pola kalimat di bawah ini sebelum memulai kuis.</p>
      </div>

      <div className="space-y-6">
        {data.grammar_list.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-extrabold text-blue-700 mb-2">{item.title}</h3>
            <p className="text-black font-bold mb-4">Arti: {item.meaning}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Struktur:</p>
              <p className="text-black font-mono font-bold">{item.structure}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contoh Kalimat:</p>
              <p className="text-lg text-black font-bold leading-relaxed">
                {renderTextWithFurigana(item.example)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStartQuiz}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xl shadow-lg hover:bg-blue-700 transition-all transform active:scale-95"
      >
        Mulai Kuis Sekarang!
      </button>
    </div>
  );
}
