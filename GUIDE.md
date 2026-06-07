# Panduan Skalabilitas & Instruksi AI (JLPT Quiz)

Dokumen ini berfungsi sebagai panduan agar website kuis ini bisa terus dikembangkan (N5-N1) tanpa merusak struktur kode yang sudah ada. Gunakan instruksi di bawah ini saat ingin menambahkan materi baru.

## 1. Struktur Folder (Standard)
Agar scalable, simpan file data dengan struktur berikut:
```text
/data
  /n3
    /sou-matome
      /week1
        - day1.json
        - day2.json
  /n4
    /genki
      - lesson1.json
```

## 2. Schema JSON Standard
AI harus selalu mengikuti format ini agar kuis tidak error.

### Format Goi (Vocabulary)
```json
{
  "kanji": "Kanji",
  "reading": "Hiragana/Katakana",
  "meaning_en": "English",
  "meaning_id": "Bahasa Indonesia"
}
```

### Format Bunpou (Grammar)
Penting: Gunakan format `漢字[かんじ]` untuk Furigana di bagian `parts` dan `example`.
```json
{
  "pattern": "Pola",
  "usage": "Cara pakai",
  "structure": "Struktur kalimat",
  "question": "Kalimat soal dengan ___",
  "parts": ["potongan1[furigana]", "potongan2"],
  "correct_order": [0, 1],
  "full_sentence": "Kalimat utuh",
  "meaning_id": "Arti Indonesia"
}
```

## 3. Perintah (Prompt) untuk AI (Copy-Paste)

Saat ingin menambah materi baru, gunakan prompt ini agar AI tidak "ngawur":

### A. Untuk Menambah Materi Baru (Day/Lesson baru)
> "Tolong buatkan file data kuis baru di `/data/[LEVEL]/[SUMBER]/week[X]/day[Y].json`. Ikuti schema yang sudah ada. Materi yang harus dimasukkan adalah: [LIST MATERI]. Pastikan semua kanji di bagian Bunpou menggunakan format furigana `Kanji[furigana]`. Buat tepat [JUMLAH] soal Bunpou yang di-mix."

### B. Untuk Update Komponen Agar Support Level Lain
> "Update `app/page.tsx` agar mendukung pemilihan Level (N3/N4/N5) dan sumber buku. Pastikan sistem routing bisa membaca file JSON secara dinamis berdasarkan pilihan user."

## 4. Tips Agar AI Tetap Akurat
1. **Verifikasi Dulu:** Minta AI menampilkan "Draf 5 soal pertama" sebelum dia menulis seluruh file JSON besar.
2. **Gunakan Furigana Tag:** Selalu ingatkan AI untuk menggunakan format `[ ]` untuk furigana agar fungsi `renderTextWithFurigana` di `BunpouQuiz.tsx` bekerja.
3. **Hardcode vs Dynamic:** Untuk awal, hardcode di folder `/data` adalah yang paling stabil. Jika sudah mencapai ribuan soal, baru pertimbangkan pindah ke Database (Supabase/PostgreSQL).
