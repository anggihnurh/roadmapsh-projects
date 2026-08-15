# Product Requirements Document — Quiz App

| Informasi | Detail |
| --- | --- |
| Nama produk | Quiz App |
| Platform | Web browser |
| Level proyek | Intermediate Frontend |
| Status dokumen | Siap untuk implementasi MVP |
| Versi | 1.0 |

## 1. Latar Belakang

Quiz App adalah aplikasi kuis berbasis browser yang menyajikan serangkaian pertanyaan pilihan ganda. Setelah memilih jawaban, pengguna langsung mengetahui apakah jawabannya benar atau salah. Pada akhir sesi, aplikasi menampilkan skor akhir dan rekap hasil untuk seluruh pertanyaan.

Proyek ini ditujukan untuk melatih pengelolaan state frontend yang memiliki beberapa fase, interaksi pengguna, conditional rendering, pemrosesan data berbasis JSON, dan penyajian hasil sesi.

## 2. Tujuan Produk

Produk harus memungkinkan pengguna untuk:

1. Memahami isi dan aturan kuis sebelum memulai.
2. Menjawab pertanyaan pilihan ganda satu per satu.
3. Mendapatkan feedback langsung setelah memilih jawaban.
4. Mengetahui jawaban yang benar untuk setiap pertanyaan.
5. Melihat perkembangan skor selama atau setelah kuis.
6. Melihat skor akhir dan rekap jawaban setelah semua pertanyaan selesai.
7. Mengulangi kuis dari awal tanpa memuat ulang halaman.

## 3. Ruang Lingkup

### 3.1 Termasuk dalam MVP

- Halaman pembuka berisi informasi singkat tentang kuis dan tombol **Mulai Kuis**.
- Data pertanyaan disimpan dalam format JSON lokal.
- Pertanyaan ditampilkan satu per satu dalam bentuk card.
- Setiap pertanyaan memiliki beberapa pilihan jawaban dalam bentuk button.
- Hanya ada satu jawaban benar untuk setiap pertanyaan.
- Pengguna mendapatkan feedback benar atau salah segera setelah memilih jawaban.
- Pilihan yang benar dan salah dibedakan secara visual dan tekstual.
- Skor bertambah ketika pengguna menjawab dengan benar.
- Pengguna dapat melanjutkan ke pertanyaan berikutnya setelah melihat feedback.
- Halaman hasil menampilkan skor akhir dan rekap seluruh jawaban.
- Pengguna dapat memulai ulang kuis dari halaman hasil.
- Tampilan dapat digunakan pada perangkat desktop dan mobile.

### 3.2 Fitur Opsional

- Timer 60 detik untuk setiap pertanyaan.
- Pengurangan skor sebesar 1 poin jika waktu habis sebelum pengguna memilih jawaban.
- Perpindahan otomatis ke pertanyaan berikutnya saat waktu habis.

Fitur opsional dikerjakan setelah seluruh acceptance criteria MVP terpenuhi. Implementasi timer tidak boleh mengubah aturan penilaian untuk jawaban benar dan salah pada MVP.

### 3.3 Di Luar Ruang Lingkup

- Login, registrasi, dan profil pengguna.
- Backend, database, atau penyimpanan hasil secara permanen.
- Dashboard admin untuk membuat pertanyaan.
- Leaderboard dan perbandingan skor antar pengguna.
- Kategori, level kesulitan, dan pemilihan paket kuis.
- Soal dengan lebih dari satu jawaban benar.
- Soal berbentuk esai.
- Pengambilan soal dari API eksternal.
- Pembagian atau publikasi hasil ke media sosial.

## 4. Target Pengguna

Pengguna adalah seseorang yang ingin mengerjakan kuis singkat melalui browser tanpa harus membuat akun atau melakukan konfigurasi terlebih dahulu.

## 5. Asumsi Produk

- Aplikasi menjalankan satu sesi kuis pada satu waktu.
- Semua pertanyaan sudah tersedia saat halaman dimuat.
- Urutan pertanyaan dan pilihan jawaban tetap selama satu sesi.
- Setiap pertanyaan mempunyai ID unik.
- Setiap pilihan jawaban dalam satu pertanyaan mempunyai ID unik.
- Setiap pertanyaan mempunyai tepat satu jawaban benar.
- Pengguna tidak dapat mengubah jawaban setelah jawaban dikonfirmasi melalui pemilihan button.
- Data sesi disimpan di memory aplikasi. Refresh browser akan mengembalikan pengguna ke halaman pembuka.
- Bahasa antarmuka dapat ditentukan developer, tetapi harus konsisten pada seluruh halaman.

## 6. User Story

### US-01 — Melihat informasi kuis

Sebagai pengguna, saya ingin melihat informasi singkat dan aturan kuis agar memahami apa yang akan saya kerjakan sebelum memulai.

### US-02 — Memulai kuis

Sebagai pengguna, saya ingin memulai kuis melalui satu tombol agar dapat langsung melihat pertanyaan pertama.

### US-03 — Menjawab pertanyaan

Sebagai pengguna, saya ingin memilih satu jawaban dari beberapa pilihan agar dapat menjawab pertanyaan yang sedang ditampilkan.

### US-04 — Mendapatkan feedback

Sebagai pengguna, saya ingin langsung mengetahui apakah jawaban saya benar atau salah dan melihat jawaban yang benar agar dapat belajar dari hasil tersebut.

### US-05 — Melanjutkan kuis

Sebagai pengguna, saya ingin berpindah ke pertanyaan berikutnya setelah membaca feedback agar dapat menyelesaikan seluruh kuis.

### US-06 — Melihat hasil akhir

Sebagai pengguna, saya ingin melihat skor dan rekap semua jawaban agar dapat mengevaluasi hasil kuis saya.

### US-07 — Mengulangi kuis

Sebagai pengguna, saya ingin mengulang kuis dari awal agar dapat mencoba memperoleh hasil yang lebih baik.

## 7. Alur Pengguna Utama

1. Pengguna membuka aplikasi.
2. Aplikasi menampilkan halaman pembuka.
3. Pengguna membaca judul, deskripsi, jumlah pertanyaan, dan aturan penilaian.
4. Pengguna memilih tombol **Mulai Kuis**.
5. Aplikasi menampilkan pertanyaan pertama.
6. Pengguna memilih satu jawaban.
7. Aplikasi mengunci seluruh pilihan jawaban dan langsung menampilkan feedback.
8. Jika jawaban benar, skor bertambah 1 poin.
9. Pengguna memilih tombol **Pertanyaan Berikutnya**.
10. Langkah 5–9 berulang sampai pertanyaan terakhir.
11. Pada pertanyaan terakhir, tombol lanjutan menggunakan label **Lihat Hasil**.
12. Aplikasi menampilkan skor akhir dan rekap seluruh jawaban.
13. Pengguna dapat memilih **Ulangi Kuis** untuk memulai sesi baru.

## 8. Kebutuhan Fungsional

### FR-01 — Halaman Pembuka

Saat aplikasi pertama kali dibuka, sistem harus menampilkan:

- Judul kuis.
- Deskripsi singkat kuis.
- Jumlah total pertanyaan.
- Aturan penilaian.
- Informasi timer apabila fitur opsional diaktifkan.
- Tombol **Mulai Kuis**.

Kuis tidak boleh dimulai sebelum pengguna memilih tombol **Mulai Kuis**.

### FR-02 — Memulai Sesi

Ketika tombol **Mulai Kuis** dipilih, sistem harus:

- Mengatur pertanyaan aktif ke pertanyaan pertama.
- Mengatur skor awal menjadi 0.
- Mengosongkan riwayat jawaban dari sesi sebelumnya.
- Mengubah status kuis menjadi sedang berlangsung.
- Menampilkan card pertanyaan pertama.

### FR-03 — Sumber Data Pertanyaan

Pertanyaan harus berasal dari file atau object JSON lokal. Dataset MVP harus memenuhi ketentuan berikut:

- Memiliki minimal 10 pertanyaan agar cukup untuk menguji alur dan state aplikasi.
- Setiap pertanyaan memiliki 2–4 pilihan jawaban.
- Setiap pertanyaan mempunyai tepat satu jawaban benar.
- ID pertanyaan dan ID pilihan tidak boleh bergantung pada teks yang tampil.
- `correctOptionId` harus merujuk pada salah satu pilihan yang tersedia pada pertanyaan yang sama.

Struktur data yang direkomendasikan memisahkan metadata kuis dari daftar
pertanyaan. Nilai turunan seperti jumlah pertanyaan, indeks terakhir, dan skor
maksimum dihitung dari `questions`, sehingga tidak disimpan ulang di metadata:

```json
{
  "metadata": {
    "schemaVersion": 1,
    "id": "frontend-fundamentals",
    "title": "Frontend Quiz",
    "description": "Kuis sederhana tentang dasar-dasar frontend development.",
    "category": "frontend-development",
    "locale": "id-ID",
    "version": 1
  },
  "questions": [
    {
      "id": "q-001",
      "question": "Apa kepanjangan dari HTML?",
      "options": [
        { "id": "a", "text": "HyperText Markup Language" },
        { "id": "b", "text": "HighText Machine Language" },
        { "id": "c", "text": "HyperTool Multi Language" },
        { "id": "d", "text": "Home Tool Markup Language" }
      ],
      "correctOptionId": "a"
    }
  ]
}
```

Nama properti boleh disesuaikan dengan konvensi framework atau codebase selama semua informasi di atas tetap tersedia.

### FR-04 — Card Pertanyaan

Untuk setiap pertanyaan aktif, sistem harus menampilkan:

- Indikator progres, misalnya **Pertanyaan 3 dari 10**.
- Teks pertanyaan.
- Seluruh pilihan jawaban sebagai button.
- Satu pilihan per button.
- Area feedback yang awalnya tidak menampilkan hasil.

Dalam satu waktu, hanya satu pertanyaan boleh terlihat sebagai pertanyaan aktif.

### FR-05 — Memilih Jawaban

Saat status pertanyaan masih aktif:

- Pengguna dapat memilih satu button jawaban.
- Pemilihan jawaban langsung dianggap final dan memicu proses pemeriksaan.
- Sistem harus menyimpan ID pertanyaan, ID jawaban yang dipilih, ID jawaban benar, serta status benar atau salah.
- Setelah satu jawaban dipilih, semua button jawaban pada pertanyaan tersebut harus dinonaktifkan.
- Klik berikutnya pada pilihan yang sama maupun berbeda tidak boleh mengubah jawaban atau skor.

### FR-06 — Feedback Jawaban Benar

Jika jawaban pengguna benar, sistem harus:

- Mengubah button yang dipilih ke tampilan sukses, menggunakan warna hijau.
- Menampilkan teks yang menyatakan bahwa jawaban benar.
- Menambahkan skor sebesar 1 poin, tepat satu kali.
- Menampilkan tombol untuk melanjutkan.

Feedback tidak boleh hanya mengandalkan warna. Teks, icon, atau label status harus ikut digunakan agar hasil tetap dapat dipahami pengguna dengan gangguan persepsi warna.

### FR-07 — Feedback Jawaban Salah

Jika jawaban pengguna salah, sistem harus:

- Mengubah button yang dipilih ke tampilan error, menggunakan warna merah.
- Mengubah button jawaban yang benar ke tampilan sukses, menggunakan warna hijau.
- Menampilkan teks yang menyatakan bahwa jawaban salah.
- Menyebutkan atau menunjukkan jawaban yang benar.
- Tidak menambah dan tidak mengurangi skor pada versi MVP.
- Menampilkan tombol untuk melanjutkan.

Feedback tidak boleh hanya mengandalkan warna.

### FR-08 — Berpindah Pertanyaan

- Tombol untuk melanjutkan hanya tampil atau aktif setelah jawaban diberikan.
- Pada semua pertanyaan selain pertanyaan terakhir, tombol diberi label **Pertanyaan Berikutnya**.
- Saat tombol dipilih, sistem menampilkan pertanyaan selanjutnya dalam kondisi belum dijawab.
- Pengguna tidak dapat kembali ke pertanyaan sebelumnya untuk mengubah jawaban.
- Pada pertanyaan terakhir, tombol diberi label **Lihat Hasil**.

### FR-09 — Perhitungan Skor MVP

Aturan skor pada MVP:

| Kondisi | Perubahan skor |
| --- | ---: |
| Jawaban benar | +1 |
| Jawaban salah | 0 |

Skor maksimum sama dengan jumlah pertanyaan. Skor minimum MVP adalah 0. Skor harus dihitung dari hasil jawaban yang tersimpan dan tidak boleh bertambah lebih dari satu kali untuk pertanyaan yang sama.

### FR-10 — Halaman Hasil

Setelah pertanyaan terakhir selesai, sistem harus menampilkan:

- Penanda bahwa kuis telah selesai.
- Skor akhir dalam format yang mudah dipahami, misalnya **8 dari 10**.
- Jumlah jawaban benar.
- Jumlah jawaban salah.
- Daftar hasil untuk seluruh pertanyaan sesuai urutan kuis.
- Tombol **Ulangi Kuis**.

Setiap item dalam daftar hasil minimal menampilkan:

- Teks atau nomor pertanyaan.
- Jawaban yang dipilih pengguna.
- Jawaban yang benar.
- Status **Benar** atau **Salah**.

### FR-11 — Mengulangi Kuis

Ketika tombol **Ulangi Kuis** dipilih, sistem harus:

- Menghapus seluruh jawaban dari sesi yang telah selesai.
- Mengembalikan skor menjadi 0.
- Mengembalikan indeks pertanyaan ke pertanyaan pertama.
- Menghapus seluruh status feedback sebelumnya.
- Memulai sesi kuis baru dari pertanyaan pertama.

Data dari sesi sebelumnya tidak boleh memengaruhi sesi baru.

### FR-12 — Penanganan Data Tidak Valid

Jika data pertanyaan kosong atau tidak dapat digunakan, sistem harus:

- Tidak memulai sesi kuis.
- Menampilkan pesan error yang dapat dipahami pengguna.
- Tidak mengalami blank screen atau crash tanpa informasi.

Developer boleh melakukan validasi data pada build time, load time, atau keduanya.

## 9. Kebutuhan Fitur Timer (Opsional)

Bagian ini hanya berlaku apabila timer diimplementasikan.

### FR-OPT-01 — Timer per Pertanyaan

- Setiap pertanyaan mempunyai waktu 60 detik.
- Timer dimulai ketika pertanyaan ditampilkan dalam status aktif.
- Sisa waktu harus terlihat oleh pengguna.
- Timer berhenti segera setelah pengguna memilih jawaban.
- Timer di-reset menjadi 60 detik ketika pertanyaan berikutnya ditampilkan.
- Hanya boleh ada satu timer aktif agar skor dan perpindahan pertanyaan tidak diproses dua kali.

### FR-OPT-02 — Waktu Habis

Jika waktu mencapai 0 sebelum jawaban dipilih, sistem harus:

- Menandai pertanyaan sebagai **Tidak dijawab — waktu habis**.
- Menyimpan jawaban pengguna sebagai `null` atau nilai kosong yang eksplisit.
- Mengurangi skor sebesar 1 poin, tepat satu kali.
- Menonaktifkan seluruh button jawaban.
- Berpindah otomatis ke pertanyaan berikutnya.
- Menampilkan halaman hasil apabila waktu habis pada pertanyaan terakhir.

Jawaban benar untuk pertanyaan yang terlewat tetap harus terlihat pada rekap hasil akhir.

### FR-OPT-03 — Skor dengan Timer

Jika timer digunakan, aturan skor berubah menjadi:

| Kondisi | Perubahan skor |
| --- | ---: |
| Jawaban benar | +1 |
| Jawaban salah sebelum waktu habis | 0 |
| Tidak menjawab sampai waktu habis | -1 |

Skor akhir boleh bernilai negatif. Untuk `N` pertanyaan, rentang skor adalah `-N` sampai `N`.

Halaman hasil juga harus menampilkan jumlah pertanyaan yang tidak dijawab karena waktu habis.

## 10. Model State yang Dibutuhkan

Implementasi framework dan state management diserahkan kepada developer. Namun, aplikasi minimal harus dapat merepresentasikan state berikut:

| State | Keterangan |
| --- | --- |
| `quizStatus` | Fase aplikasi: `intro`, `in_progress`, atau `completed` |
| `questions` | Daftar pertanyaan dari JSON |
| `currentQuestionIndex` | Indeks pertanyaan yang sedang aktif |
| `selectedOptionId` | Pilihan pengguna pada pertanyaan aktif; `null` jika belum memilih |
| `answerStatus` | Status pertanyaan aktif: `unanswered`, `correct`, `incorrect`, atau `timed_out` untuk fitur timer |
| `score` | Total skor sesi berjalan |
| `results` | Riwayat hasil setiap pertanyaan |
| `timeRemaining` | Sisa waktu pertanyaan; hanya untuk fitur timer |

Riwayat hasil disarankan mempunyai bentuk berikut:

```ts
type QuizResult = {
  questionId: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  status: "correct" | "incorrect" | "timed_out";
};
```

Diagram transisi state utama:

```text
INTRO
  └─ Mulai Kuis → QUESTION_ACTIVE
                       ├─ Pilih jawaban → ANSWERED
                       │                    ├─ Berikutnya → QUESTION_ACTIVE
                       │                    └─ Soal terakhir → COMPLETED
                       └─ Waktu habis → QUESTION_ACTIVE / COMPLETED  [opsional]

COMPLETED
  └─ Ulangi Kuis → QUESTION_ACTIVE
```

## 11. Kebutuhan Antarmuka dan Pengalaman Pengguna

### 11.1 Hierarki Tampilan

- Konten utama harus mempunyai fokus visual yang jelas.
- Card pertanyaan harus mudah dibedakan dari background halaman.
- Pilihan jawaban harus terlihat sebagai elemen interaktif.
- Feedback dan tombol lanjutan harus tampil dekat dengan card pertanyaan.
- Halaman hasil harus membedakan ringkasan skor dan daftar detail jawaban.

### 11.2 Responsive Design

- Seluruh fungsi harus dapat digunakan mulai dari viewport mobile 320 px hingga desktop.
- Teks pertanyaan dan jawaban tidak boleh terpotong.
- Button jawaban harus tetap mudah ditekan pada perangkat sentuh.
- Daftar hasil harus tetap terbaca tanpa horizontal scrolling pada ukuran mobile yang didukung.

### 11.3 Accessibility Dasar

- Seluruh button dapat diakses menggunakan keyboard.
- Focus indicator harus terlihat.
- Urutan tab harus mengikuti urutan visual yang logis.
- Pertanyaan menggunakan heading atau struktur semantik yang sesuai.
- Setiap button mempunyai accessible name dari teks jawabannya.
- Status benar atau salah diumumkan secara tekstual; disarankan memakai live region yang sesuai.
- Kontras teks dan warna status harus tetap mudah dibaca.
- Warna hijau dan merah tidak boleh menjadi satu-satunya penanda hasil.

## 12. Kebutuhan Nonfungsional

### NFR-01 — Kompatibilitas

Aplikasi harus berfungsi pada versi stabil terbaru browser modern berikut:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

### NFR-02 — Performa

- Interaksi memilih jawaban harus menghasilkan feedback tanpa delay yang disengaja.
- Pergantian pertanyaan tidak boleh memuat ulang seluruh halaman.
- Aset dan dataset lokal harus cukup ringan untuk penggunaan normal pada koneksi dan perangkat modern.

### NFR-03 — Reliability

- Satu pertanyaan hanya dapat menghasilkan satu record hasil.
- Satu jawaban benar hanya dapat menambah satu poin.
- Timeout hanya dapat mengurangi satu poin jika timer digunakan.
- Jumlah item pada rekap hasil harus sama dengan jumlah pertanyaan yang telah diproses.

### NFR-04 — Maintainability

- Data pertanyaan dipisahkan dari komponen presentasi.
- Logic penilaian tidak diduplikasi di beberapa komponen.
- Nama state, function, dan component harus menjelaskan tanggung jawabnya.
- Komponen dapat dipisahkan berdasarkan kebutuhan, misalnya `QuizIntro`, `QuestionCard`, `AnswerOption`, dan `QuizResults`.
- Framework dan library state management bebas dipilih selama tidak menambah fitur di luar scope.

## 13. Acceptance Criteria MVP

### AC-01 — Membuka Aplikasi

**Given** pengguna baru membuka aplikasi  
**When** halaman selesai dimuat  
**Then** pengguna melihat informasi kuis dan tombol **Mulai Kuis**, tetapi belum melihat pertanyaan aktif.

### AC-02 — Memulai Kuis

**Given** pengguna berada di halaman pembuka  
**When** pengguna memilih **Mulai Kuis**  
**Then** pertanyaan pertama tampil dengan seluruh pilihan jawaban dan indikator progres.

### AC-03 — Jawaban Benar

**Given** pertanyaan aktif belum dijawab  
**When** pengguna memilih jawaban yang benar  
**Then** pilihan tersebut ditandai hijau, feedback benar tampil, seluruh pilihan terkunci, dan skor bertambah 1.

### AC-04 — Jawaban Salah

**Given** pertanyaan aktif belum dijawab  
**When** pengguna memilih jawaban yang salah  
**Then** pilihan tersebut ditandai merah, jawaban benar ditandai hijau, feedback salah tampil, seluruh pilihan terkunci, dan skor tidak berubah.

### AC-05 — Mencegah Jawaban Ganda

**Given** pertanyaan aktif sudah dijawab  
**When** pengguna mencoba memilih pilihan lain  
**Then** pilihan dan skor sebelumnya tidak berubah serta tidak ada hasil kedua yang dibuat.

### AC-06 — Melanjutkan Pertanyaan

**Given** pengguna sudah menjawab pertanyaan yang bukan pertanyaan terakhir  
**When** pengguna memilih **Pertanyaan Berikutnya**  
**Then** pertanyaan berikutnya tampil dalam kondisi belum dijawab.

### AC-07 — Menyelesaikan Kuis

**Given** pengguna sudah menjawab pertanyaan terakhir  
**When** pengguna memilih **Lihat Hasil**  
**Then** halaman hasil menampilkan skor akhir dan satu item rekap untuk setiap pertanyaan.

### AC-08 — Isi Rekap

**Given** pengguna berada pada halaman hasil  
**When** pengguna membaca salah satu item rekap  
**Then** pengguna dapat mengetahui pertanyaan, jawaban yang dipilih, jawaban benar, serta status hasilnya.

### AC-09 — Mengulangi Kuis

**Given** pengguna berada pada halaman hasil  
**When** pengguna memilih **Ulangi Kuis**  
**Then** pertanyaan pertama tampil dengan skor 0 dan tanpa jawaban atau feedback dari sesi sebelumnya.

### AC-10 — Tampilan Responsive dan Keyboard

**Given** aplikasi dibuka pada mobile, tablet, atau desktop  
**When** pengguna menjalankan seluruh alur kuis menggunakan pointer, touch, atau keyboard  
**Then** semua konten tetap terbaca dan seluruh aksi utama dapat diselesaikan.

## 14. Acceptance Criteria Timer (Opsional)

### AC-OPT-01 — Countdown

**Given** pertanyaan aktif baru ditampilkan  
**When** pengguna belum memilih jawaban  
**Then** timer menghitung mundur dari 60 detik dan sisa waktu terlihat.

### AC-OPT-02 — Timer Berhenti Setelah Menjawab

**Given** timer sedang berjalan  
**When** pengguna memilih salah satu jawaban  
**Then** timer berhenti dan tidak dapat memicu timeout untuk pertanyaan tersebut.

### AC-OPT-03 — Timeout

**Given** pengguna belum memilih jawaban  
**When** timer mencapai 0  
**Then** pertanyaan dicatat sebagai timeout, skor berkurang 1, dan aplikasi berpindah otomatis ke pertanyaan berikutnya atau ke halaman hasil jika itu pertanyaan terakhir.

### AC-OPT-04 — Rekap Timeout

**Given** setidaknya satu pertanyaan berakhir karena timeout  
**When** halaman hasil ditampilkan  
**Then** pertanyaan tersebut ditandai tidak dijawab dan jawaban benarnya tetap ditampilkan.

## 15. Kasus Tepi yang Harus Ditangani

- Pengguna melakukan klik cepat berulang pada button jawaban.
- Pengguna memilih jawaban tepat ketika timer mencapai 0, jika timer diaktifkan.
- Data hanya memiliki satu pertanyaan yang valid.
- Teks pertanyaan atau pilihan jawaban sangat panjang.
- Skor menjadi negatif karena beberapa timeout, jika timer diaktifkan.
- Pengguna mengulang kuis setelah seluruh pertanyaan selesai.
- Dataset kosong atau `correctOptionId` tidak cocok dengan pilihan yang tersedia.
- Komponen di-unmount saat timer aktif, jika timer diaktifkan.

Untuk kompetisi antara klik jawaban dan timeout, event pertama yang berhasil mengubah status dari `unanswered` menjadi status final adalah hasil yang berlaku. Event berikutnya harus diabaikan.

## 16. Prioritas Implementasi

### P0 — Wajib untuk MVP

1. Data pertanyaan berbasis JSON.
2. Halaman pembuka dan tombol mulai.
3. Card pertanyaan dan pilihan jawaban.
4. Pemeriksaan jawaban dan feedback langsung.
5. Pengelolaan skor.
6. Navigasi antar pertanyaan.
7. Halaman hasil dan rekap lengkap.
8. Mengulangi kuis.
9. Responsive design dan accessibility dasar.

### P1 — Opsional Setelah MVP

1. Timer 60 detik per pertanyaan.
2. Timeout dan pengurangan skor.
3. Perpindahan otomatis setelah timeout.
4. Status timeout pada halaman hasil.

## 17. Definition of Done

Fitur dinyatakan selesai apabila:

- Seluruh kebutuhan P0 telah diimplementasikan.
- Seluruh acceptance criteria MVP lulus.
- Dataset mempunyai minimal 10 pertanyaan yang valid.
- Tidak ada error pada console selama alur normal.
- Skor dan rekap tetap akurat setelah klik berulang dan setelah mengulang kuis.
- Seluruh alur dapat diselesaikan menggunakan keyboard.
- Tampilan telah diperiksa pada ukuran mobile dan desktop.
- Aplikasi telah diperiksa pada minimal dua browser modern.
- Source code telah melalui formatter dan linter yang digunakan proyek.
- README menjelaskan cara menginstal dependency, menjalankan aplikasi, dan build production.
- Fitur timer, apabila dipilih, juga memenuhi seluruh acceptance criteria opsional.

## 18. Deliverable Developer

Developer menyerahkan:

1. Source code Quiz App.
2. File JSON berisi data kuis.
3. README berisi petunjuk instalasi, menjalankan development server, build, dan ringkasan fitur.
4. Test otomatis untuk logic penilaian dan state utama jika test tooling digunakan.
5. Build aplikasi yang berhasil tanpa error.

## 19. Catatan Keputusan Produk

- Feedback diberikan langsung saat button jawaban dipilih; tidak diperlukan button **Periksa Jawaban** terpisah.
- Setelah dijawab, pertanyaan dikunci untuk menjaga integritas skor.
- Perpindahan normal menggunakan button agar pengguna mempunyai waktu membaca feedback.
- Perpindahan otomatis hanya berlaku pada timeout apabila fitur timer diaktifkan.
- Timer merupakan enhancement terpisah dan bukan syarat kelulusan MVP.
- Pemilihan framework dan state management diserahkan kepada developer.

---

Referensi brief: [roadmap.sh — Quiz App](https://roadmap.sh/projects/quiz-app)
