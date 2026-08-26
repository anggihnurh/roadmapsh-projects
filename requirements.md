# 📄 Dokumen Spesifikasi Kebutuhan Proyek (Software Requirements Specification)

**Nama Proyek:** Weather Web Application  
**Klien:** *Client*  
**Pengembang:** *Developer*  
**Tanggal:** 25 Agustus 2026  
**Referensi Acuan:** [roadmap.sh/projects/weather-app](https://roadmap.sh/projects/weather-app)

---

## 1. Pendahuluan & Tujuan Proyek

Aplikasi **Weather Web App** adalah aplikasi berbasis web yang dirancang untuk menyajikan data cuaca real-time berdasarkan lokasi yang dicari oleh pengguna. Aplikasi ini juga menampilkan tren cuaca 24 jam yang lalu hingga 24 jam ke depan, serta menyajikan antarmuka pengguna yang responsif, intuitif, dan menarik secara visual.

---

## 2. Kebutuhan Fungsional (Functional Requirements)

### 2.1. Pencarian & Input Lokasi (Core)
* **[F-01.1] Kolom Pencarian Lokasi:** Pengguna dapat memasukkan nama kota, daerah, atau kode wilayah pada kolom input pencarian.
* **[F-01.2] Eksekusi Pencarian:** Aplikasi mengambil data cuaca terbaru begitu pengguna menekan tombol *Search* atau menekan tombol `Enter`.
* **[F-01.3] Penanganan Input Tidak Valid:** Jika lokasi tidak ditemukan oleh API, tampilkan pesan error yang informatif dan ramah pengguna.

### 2.2. Tampilan Informasi Cuaca Utama (Core)
Halaman utama menampilkan ringkasan cuaca di lokasi terpilih yang mencakup detail berikut:
* **[F-02.1] Temperatur:** Suhu udara saat ini (ditampilkan dalam °C atau °F).
* **[F-02.2] Kecepatan Angin (Wind Speed):** Kecepatan angin terkini (misal: km/jam atau mph).
* **[F-02.3] Probabilitas Hujan (Likelihood of Rain):** Persentase/peluang terjadinya hujan/presipitasi.
* **[F-02.4] Kondisi Cuaca Umum:** Ringkasan kondisi cuaca (contoh: *Sunny*, *Raining*, *Cloudy*, *Snowing*, dll.) lengkap dengan ikon/ilustrasi visual yang relevan.

### 2.3. Riwayat & Prakiraan 24 Jam (Previous & Future 24-Hour Outlook) (Core)
* **[F-03.1] Riwayat 24 Jam Lalu:** Tampilan data cuaca per jam untuk periode 24 jam ke belakang.
* **[F-03.2] Prakiraan 24 Jam Ke Depan:** Tampilan estimasi cuaca per jam untuk 24 jam ke depan.
* **[F-03.3] Format Tampilan Timeline:** Data 48 jam disajikan dalam bentuk *timeline horizontal*, grafik interaktif, atau *card slider* yang mudah di-scroll oleh pengguna.

### 2.4. Pembaruan Data Manual (Manual Refresh) (Core)
* **[F-04.1] Tombol Refresh:** Pengguna dapat memperbarui (*refresh*) data cuaca terkini secara manual melalui tombol tanpa perlu melakukan *reload* penuh pada browser.

### 2.5. Fitur Tambahan (Stretch Goals / Bonus)
* **[F-05.1] Deteksi Lokasi Otomatis (Geolocation Default):** Saat aplikasi pertama kali dibuka, aplikasi meminta izin akses lokasi (*Browser Geolocation API*) dan langsung menampilkan cuaca di lokasi pengguna secara otomatis sebagai *default view*.
* **[F-05.2] Animasi & Transisi Visual:** Menggunakan pustaka animasi (seperti Framer Motion atau CSS animations) untuk memberikan efek transisi halus saat memuat data (*loading states*) maupun perubahan ikon cuaca.

---

## 3. Integrasi API & Data Source

* **Sumber API Utama:** [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) (atau OpenWeatherMap / WeatherAPI).
* **Keamanan API Key:** API Key disimpan dengan aman di variabel lingkungan (`.env`).
* **State Handling:**
  * **Loading State:** Menampilkan *skeleton loader* atau *spinner* animasi saat data sedang di-fetch.
  * **Error Handling:** Menangani kegagalan koneksi internet atau pencapaian limit API kuota.

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

* **Desain UI/UX Modern:** Antarmuka responsif, modern, dan menarik (menggunakan tema warna dinamis, gradien, atau efek visual modern).
* **Responsivitas Perangkat:** Kompatibel penuh di ponsel (*mobile*), tablet, dan komputer (*desktop*).
* **Performa:** *Initial load time* yang cepat dan interaksi UI yang responsif.

---

## 5. Kriteria Penerimaan Pekerjaan (Acceptance Criteria)

| No | Modul / Fitur | Kriteria Lolos (Definition of Done) |
|---|---|---|
| 1 | **Input Lokasi** | Pengguna bisa mengetik nama kota dan data cuaca kota tersebut berhasil ditampilkan. |
| 2 | **Detail Cuaca** | Informasi suhu, kecepatan angin, peluang hujan, dan status cuaca tampil lengkap dan akurat. |
| 3 | **Tampilan 24 Jam** | Tersedia *hourly forecast* & *history* 24 jam yang intuitif untuk dibaca. |
| 4 | **Manual Refresh** | Mengklik tombol refresh memicu panggilan API baru dan memperbarui UI tanpa reload browser. |
| 5 | **Handling Error & Loading** | Indikator loading muncul saat fetch data, dan ada notifikasi jika lokasi tidak ditemukan. |
| 6 | **Responsivitas** | Tampilan menyesuaikan dengan baik di ukuran layar HP maupun Laptop. |
