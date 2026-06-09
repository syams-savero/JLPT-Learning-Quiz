export type GoiItem = {
  kanji: string;
  reading: string;
  meaning_en: string;
  meaning_id: string;
};

export type BunpouItem = {
  pattern: string;
  question: string;
  parts: string[];
  correct_order: number[];
  full_sentence: string;
  meaning_id: string;
};

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
