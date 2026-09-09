# 🐑 Sistem Manajemen Farm Domba

Solusi berbasis web lengkap untuk mengelola inventaris farm domba, keuangan, dan catatan kesehatan. Dibangun dengan HTML, CSS, dan JavaScript dengan penyimpanan data lokal.

## Fitur Utama

### 📊 Dasbor
- Ringkasan real-time statistik farm
- Jumlah domba berdasarkan jenis (Jantan, Betina, Anak Domba)
- Valuasi inventaris
- Pendapatan dan pengeluaran tahun ini
- Pelacakan laba/rugi bersih

### 🐑 Manajemen Inventaris
- Tambah dan kelola catatan domba individual
- Lacak domba berdasarkan ID, nama, ras, dan jenis
- Pantau status domba (Aktif, Hamil, Menyusui, Cedera, Terjual)
- Catat berat dan nilai perkiraan
- Filter berdasarkan status, jenis, ras, atau cari berdasarkan ID/nama
- Edit informasi domba
- Hapus catatan

### 💰 Manajemen Keuangan
- Catat transaksi pendapatan (penjualan bulu, daging, stok bibit, dll)
- Catat pengeluaran (pakan, perawatan hewan, peralatan, tenaga kerja, dll)
- Riwayat transaksi terkategori
- Perhitungan saldo berjalan
- Filter berdasarkan jenis transaksi
- Hapus transaksi

### 🏥 Catatan Kesehatan
- Lacak vaksinasi dan pengobatan untuk setiap domba
- Catat pemeriksaan dan peristiwa medis
- Lacak biaya medis
- Catatan kelahiran dan kematian
- Catatan detail untuk setiap acara kesehatan
- Hubungkan catatan kesehatan ke domba spesifik

### 📈 Laporan & Analitik
- Tren pendapatan bulanan
- Tren pengeluaran bulanan
- Breakdown kategori pengeluaran (grafik pie)
- Distribusi jenis domba
- Ringkasan keuangan tahun ini
- Perhitungan margin keuntungan

### 📥 Ekspor Data
- Ekspor inventaris ke CSV
- Ekspor catatan keuangan ke CSV
- Ekspor catatan kesehatan ke CSV
- Fungsi cetak laporan

## Stack Teknologi

- **HTML5** - Markup semantik dan struktur
- **CSS3** - Styling modern dengan gradient dan animasi
- **JavaScript (ES6+)** - Fungsionalitas inti
- **Chart.js** - Visualisasi data
- **LocalStorage API** - Penyimpanan data lokal

## Instalasi

1. Clone repositori:
```bash
git clone https://github.com/muhammadzuhuuron/sheep-farm-management.git
cd sheep-farm-management
```

2. Buka `index_id.html` di browser web modern:
```bash
# Menggunakan Python
python -m http.server 8000
# Kemudian kunjungi http://localhost:8000/index_id.html

# Atau cukup double-click index_id.html
```

## Panduan Penggunaan

### Menambah Domba
1. Buka tab **Inventaris**
2. Isi form dengan detail domba:
   - Nomor ID/Tag Domba (wajib)
   - Nama (opsional)
   - Jenis (Jantan, Betina, atau Anak Domba)
   - Tanggal Lahir
   - Berat (kg)
   - Nilai Perkiraan ($)
   - Ras
   - Status Saat Ini
3. Klik "Tambah Domba"

### Mencatat Keuangan
1. Buka tab **Keuangan**
2. Gunakan formulir "Catat Pendapatan" atau "Catat Pengeluaran"
3. Pilih kategori, jumlah, tanggal, dan deskripsi
4. Klik tombol yang sesuai

### Pelacakan Kesehatan
1. Buka tab **Catatan Kesehatan**
2. Pilih domba dari dropdown
3. Masukkan detail acara kesehatan
4. Tentukan jenis (Vaksinasi, Pengobatan, Pemeriksaan, Kelahiran, Kematian)
5. Tambahkan biaya dan catatan jika diperlukan
6. Kirim formulir

### Melihat Laporan
1. Klik tab **Laporan**
2. Lihat grafik interaktif untuk:
   - Tren pendapatan bulanan
   - Tren pengeluaran bulanan
   - Breakdown kategori pengeluaran
   - Distribusi jenis domba
3. Periksa ringkasan tahun ini
4. Ekspor atau cetak laporan

### Filter & Pencarian
- Gunakan dropdown filter untuk memfilter berdasarkan status, jenis, atau ras
- Gunakan kotak pencarian untuk mencari domba berdasarkan ID atau nama
- Beralih antara tab Semua/Pendapatan/Pengeluaran di bagian keuangan

## Struktur Data

### Objek Domba
```javascript
{
  id: timestamp,
  sheepId: "TAG-001",
  name: "Fluffy",
  type: "Ewe", // Ram, Ewe, atau Lamb
  dob: "2022-03-15",
  weight: 45.5,
  value: 250.00,
  breed: "Merino",
  status: "Active", // Active, Pregnant, Nursing, Injured, Sold
  dateAdded: timestamp ISO8601
}
```

### Objek Catatan Keuangan
```javascript
{
  id: timestamp,
  type: "Income", // Income atau Expense
  category: "Penjualan Bulu",
  amount: 150.00,
  date: "2024-01-15",
  description: "Jual 10 kg bulu",
  timestamp: timestamp ISO8601
}
```

### Objek Catatan Kesehatan
```javascript
{
  id: timestamp,
  sheepId: sheepObjectId,
  sheepName: "Fluffy",
  sheepTag: "TAG-001",
  date: "2024-01-15",
  type: "Vaccination",
  description: "Vaksin flu tahunan",
  cost: 25.00,
  notes: "Tidak ada reaksi buruk",
  timestamp: timestamp ISO8601
}
```

## Penyimpanan Lokal (LocalStorage)

Semua data disimpan di localStorage browser:
- `sheepData` - Inventaris domba
- `financialData` - Transaksi keuangan
- `healthData` - Catatan kesehatan

Data tetap ada di seluruh sesi browser. Untuk menghapus data, buka DevTools browser dan jalankan:
```javascript
localStorage.clear();
```

## Fitur Detail

### Ras Domba yang Didukung
- Merino
- Dorper
- Hampshire
- Suffolk
- Corriedale
- Lainnya

### Kategori Pendapatan
- Penjualan Bulu
- Penjualan Daging
- Penjualan Stok Bibit
- Penjualan Susu
- Lainnya

### Kategori Pengeluaran
- Pakan & Bijian
- Perawatan Hewan
- Obat-obatan
- Perbaikan Kandang
- Peralatan & Alat
- Tenaga Kerja
- Transportasi
- Utilitas
- Lainnya

### Jenis Acara Kesehatan
- Vaksinasi
- Pengobatan
- Pemeriksaan
- Kelahiran
- Kematian

## Kompatibilitas Browser

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performa

- Dioptimalkan untuk 1000+ catatan domba
- Filter dan pencarian real-time
- Rendering grafik yang efisien
- Animasi dan transisi yang mulus

## Desain Responsif

- Dioptimalkan untuk desktop (lebar maks 1400px)
- Ramah tablet
- Layout responsif mobile
- Tombol dan kontrol yang mudah disentuh

## Shortcut Keyboard

- Tab untuk berpindah antar field formulir
- Enter untuk mengirim formulir
- Escape untuk menutup modal

## Backup Data

Untuk backup data Anda:
1. Buka DevTools browser (F12)
2. Buka tab Console
3. Jalankan: `copy(localStorage.getItem('sheepData'))`
4. Tempel ke file teks dan simpan

Untuk mengembalikan:
1. Buka Console DevTools
2. Jalankan: `localStorage.setItem('sheepData', 'DATA_ANDA_YANG_DISALIN')`

## Pemecahan Masalah

### Data Tidak Tersimpan
- Periksa apakah localStorage diaktifkan di browser
- Hapus cache browser dan reload
- Periksa kuota penyimpanan browser

### Grafik Tidak Ditampilkan
- Pastikan Chart.js dimuat dari CDN (internet diperlukan)
- Periksa console browser untuk error
- Refresh halaman

### Domba Hilang di Dropdown
- Tambah domba ke inventaris terlebih dahulu
- Refresh halaman untuk menyinkronkan dropdown

## Peningkatan Masa Depan

- Integrasi database backend (Firebase, MongoDB)
- Autentikasi pengguna dan dukungan multi-farm
- Versi aplikasi mobile
- Analitik lanjutan dan forecasting
- Catatan breeding dan pedigree tracking
- Galeri foto untuk catatan domba
- Integrasi cuaca
- Integrasi dengan database hewan ternak
- Pemindaian kode QR untuk identifikasi domba
- Integrasi API untuk harga pasar

## Lisensi

Proyek ini bersifat open source dan tersedia di bawah Lisensi MIT.

## Kontribusi

Kontribusi sangat diterima! Silakan ajukan pull request atau buka issues untuk laporan bug dan permintaan fitur.

## Dukungan

Untuk masalah atau pertanyaan, silakan buka issue GitHub atau hubungi developer.

## Changelog

### Versi 1.0.0 (Rilis Awal)
- Manajemen inventaris domba lengkap
- Pencatatan transaksi keuangan
- Pelacakan catatan kesehatan
- Dasbor interaktif dan laporan
- Fungsi ekspor CSV
- Desain responsif
- Versi Bahasa Indonesia

---

Dibuat dengan ❤️ untuk peternak domba