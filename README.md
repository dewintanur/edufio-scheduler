# Edufio - Penjadwalan Sesi Les

Edufio adalah aplikasi web sederhana untuk membantu proses penjadwalan sesi les secara terstruktur.

Aplikasi ini memungkinkan pengguna untuk mengisi data pendaftaran, memilih tanggal sesi, menentukan waktu belajar, dan melihat ringkasan seluruh sesi sebelum melakukan konfirmasi.

## Fitur

- Form pendaftaran siswa
- Pemilihan program les
- Pemilihan paket jumlah sesi
- Pemilihan durasi sesi
- Pilihan mode belajar:
  - Online
  - Offline
- Kalender pemilihan tanggal
- Validasi tanggal minimal H+3
- Pengaturan jam mulai sesi
- Perhitungan jam selesai secara otomatis
- Input lokasi untuk sesi offline
- Input Google Meet untuk sesi online
- Input materi pembelajaran
- Validasi form
- Validasi bentrok jadwal
- Penambahan beberapa sesi
- Edit sesi yang sudah dibuat
- Ringkasan seluruh jadwal
- Konfirmasi penjadwalan
- Halaman hasil setelah penjadwalan berhasil

## Teknologi

- React.js
- Vite
- JavaScript
- Tailwind CSS
- HTML
- CSS

## Alur Aplikasi

### 1. Pendaftaran

Pengguna mengisi informasi:

- Nama siswa
- Program les
- Mode belajar
- Jumlah sesi
- Durasi sesi

### 2. Pilih Tanggal

Pengguna memilih tanggal sesi melalui kalender.

Tanggal yang dapat dipilih dimulai dari H+3 untuk memastikan jadwal dapat dibuat dengan waktu yang sesuai.

### 3. Detail Sesi

Pengguna menentukan:

- Jam mulai
- Jam selesai otomatis
- Lokasi atau Google Meet
- Materi pembelajaran

Sistem juga melakukan pengecekan bentrok dengan sesi yang sudah dibuat.

### 4. Ringkasan

Seluruh sesi yang sudah dibuat ditampilkan dalam bentuk daftar.

Pengguna dapat:

- Melihat detail sesi
- Menambahkan sesi
- Mengedit sesi
- Kembali ke tahap sebelumnya
- Melakukan konfirmasi

Konfirmasi hanya dapat dilakukan jika jumlah sesi sudah sesuai dengan paket yang dipilih.

### 5. Penjadwalan Berhasil

Setelah dikonfirmasi, sistem menampilkan informasi bahwa seluruh sesi berhasil dijadwalkan beserta detail jadwalnya.

## Validasi

Aplikasi memiliki beberapa validasi, antara lain:

- Jam mulai wajib diisi
- Lokasi wajib diisi untuk mode offline
- Link Google Meet wajib diisi untuk mode online
- Materi wajib diisi
- Tanggal harus memenuhi batas minimal H+3
- Jadwal yang bentrok tidak dapat disimpan
- Jumlah sesi harus sesuai dengan paket sebelum konfirmasi

## Validasi Bentrok Jadwal

Sistem melakukan pengecekan terhadap sesi yang sudah tersimpan.

Jika terdapat jadwal yang waktunya bertabrakan, pengguna akan mendapatkan pesan error langsung pada form.

Contoh:

> Jadwal bentrok dengan sesi yang sudah terjadwal. Silakan pilih jam lain.

Pada saat mengedit sesi, sesi yang sedang diedit tidak ikut dibandingkan dengan dirinya sendiri sehingga pengguna tetap dapat menyimpan perubahan pada sesi tersebut.

## Struktur Project

src/
├── components/
│   └── StepIndicator.jsx
│
├── pages/
│   ├── Registration.jsx
│   ├── SelectDate.jsx
│   ├── SessionDetail.jsx
│   └── Summary.jsx
│
├── utils/
│   ├── date.js
│   └── schedule.js
│
├── App.jsx
└── main.jsx

## Installasi 

    1. Clone repository:
            git clone https://github.com/dewintanur/edufio-scheduler.git

    2. Masuk ke folder project:
            cd edufio-scheduler

    3. Install dependencies:
            npm install

    4. Jalankan aplikasi:
            npm run dev

    5. Aplikasi dapat diakses melalui alamat yang diberikan oleh Vite, biasanya:
            http://localhost:5173
## Keputusan yang Diambil di Luar Brief

Beberapa hal perlu ditentukan sendiri karena tidak dijelaskan secara detail di brief :
1.  Sesi dapat diedit
     Sesi yang sudah dibuat dapat dipilih kembali dari halaman ringkasan untuk
     mengubah tanggal atau detail sesi. Saat melakukan edit, sesi yang sedang diedit tidak dibandingkan dengan dirinya sendiri ketika melakukan pengecekan bentrok.
     Alasan:
      Agar sesi yang sedang diedit tidak dianggap sebagai jadwal yang bentrok
      dengan dirinya sendiri.

2. Jumlah sesi mengikuti paket
    Pengguna hanya dapat melakukan konfirmasi apabila jumlah sesi yang dibuat
    sudah sesuai dengan jumlah sesi pada paket.

## Hal yang Menurut Saya Seharusnya Berbeda dari Brief

Menurut saya, beberapa bagian masih dapat dikembangkan apabila aplikasi ini
digunakan pada kondisi nyata.
1.  Data jadwal seharusnya berasal dari backend
    Pada implementasi ini data sesi masih disimpan di state aplikasi.
    Untuk aplikasi production, data jadwal seharusnya disimpan pada database
    dan diambil melalui API.Hal tersebut diperlukan agar jadwal tetap tersimpan ketika halaman direfresh dan dapat digunakan oleh beberapa pengguna.

2.  Validasi bentrok seharusnya dilakukan di backend
    Validasi bentrok saat ini dilakukan pada sisi frontend.
    Untuk aplikasi production, pengecekan juga perlu dilakukan di backend
    sebelum jadwal disimpan. Hal ini penting karena validasi frontend masih dapat dilewati oleh client.

3. Seharusnya ada informasi jadwal yang sudah tersedia

    Pengguna akan lebih mudah memilih waktu apabila sistem dapat menampilkan
    slot waktu yang sudah terisi atau waktu yang tersedia.
    Dengan begitu pengguna tidak perlu mencoba beberapa jam untuk menemukan
    waktu yang kosong.

4. Konfirmasi sebaiknya benar-benar menyimpan data
    Pada versi ini tombol konfirmasi digunakan untuk menyelesaikan proses
    penjadwalan pada sisi aplikasi.
    Pada sistem nyata, proses konfirmasi seharusnya mengirim data ke backend
    dan menyimpannya secara permanen.

## Penggunaan AI
1. AI saya gunakan untuk benar-benar memahami soal
2. membantu menentukan langkah awal yang harus dilakukan 
3. membantu saat debugging
4. Membantu mengevaluasi dan memperbaiki logic validasi.
5. Membantu memperbaiki logic pengecekan bentrok jadwal.
6. Membantu merapikan struktur dan tampilan komponen React.
7. Membantu menemukan edge case pada proses tambah dan edit sesi.

namun dari itu semua saya tetap melakukan pengecekan dan tes terhadap kode, dan juga melakukan customisasi sesuai dengan apa yang saya mau dan juga bagaimana saya mengerjakan soal 

## Yang Belum Selesai
1. Backend dan database
    Belum terdapat backend untuk menyimpan data pendaftaran dan jadwal secara
    permanen.

2. Authentication
    Belum terdapat sistem login dan authentication karena tidak diperlukan
    untuk alur utama technical test.

3. Multi-user scheduling
    Belum terdapat mekanisme untuk menangani jadwal dari banyak pengguna
    secara bersamaan.

4. Persistent data
    Data sesi masih berada pada state aplikasi sehingga data akan hilang
    ketika aplikasi di-refresh.

5. Integrasi kalender eksternal
    Belum terdapat integrasi dengan Google Calendar atau kalender lainnya.

## Ketika AI tidak sesuai dengan apa yang saya mau 

1. Disini saya mengingnkan bahwa tampian ui yang belum sesua seperti penulsan tanggal, masih bentuk tangga utuh, sementara yang saya mau adalah hari dan tanggal. namun ai salah sangka sehingga saya membei prompt lagi yang lebih lengkap
    .screenshoot/1.png
    .screenshoot/1jawaban.png
    .screenshoot/1pomptlengkap.png

untuk yang lainnya saya rasa ai dan saya sudah saling mengerti, apalagi dengan saya yang mengetik dengan typo dia sudah sedikit terbiasa. saya akan berikan keseluruhan chat dengan AI nya. https://chatgpt.com/share/6a814909-a2c8-83ec-813a-ea788026bfd5 

## Link setelah deploy 
https://edufio-scheduler-nine.vercel.app/
