# 🐑 Sheep Farm Management System

A complete web-based solution for managing sheep farm inventory, finances, and health records. Built with HTML, CSS, and JavaScript with local storage persistence.

**Available Languages / Bahasa Tersedia:**
- 🇬🇧 **English** - `index.html`
- 🇮🇩 **Indonesian (Bahasa Indonesia)** - `index_id.html`

---

## Quick Start / Mulai Cepat

### English Version
```bash
# Open in browser
index.html
```

### Indonesian Version (Versi Bahasa Indonesia)
```bash
# Buka di browser
index_id.html
```

Both versions use the same `script.js` and `styles.css` files.

---

## Features / Fitur Utama

### 📊 Dashboard
- Real-time overview of farm statistics
- Total sheep count by type (Ram, Ewe, Lamb)
- Inventory valuation
- Year-to-date income and expenses
- Net profit/loss tracking

### 🐑 Inventory Management
- Add and manage individual sheep records
- Track sheep by ID, name, breed, and type
- Monitor sheep status (Active, Pregnant, Nursing, Injured, Sold)
- Record weight and estimated value
- Filter by status, type, breed, or search by ID/name
- Edit sheep information
- Delete records

### 💰 Financial Management
- Record income transactions (wool sales, meat sales, breeding stock, etc.)
- Record expenses (feed, veterinary care, equipment, labor, etc.)
- Categorized transaction history
- Running balance calculation
- Filter by transaction type
- Delete transactions

### 🏥 Health Records
- Track vaccinations and treatments for each sheep
- Record check-ups and medical events
- Track medical costs
- Birth and death records
- Detailed notes for each health event
- Link health records to specific sheep

### 📈 Reports & Analytics
- Monthly income trends
- Monthly expense trends
- Expense category breakdown (pie chart)
- Sheep type distribution
- Year-to-date financial summary
- Profit margin calculation

### 📥 Data Export
- Export inventory to CSV
- Export financial records to CSV
- Export health records to CSV
- Print reports functionality

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Core functionality
- **Chart.js** - Data visualization
- **LocalStorage API** - Data persistence

## Installation / Instalasi

### Method 1: Direct File Access
Simply open `index.html` (English) or `index_id.html` (Indonesian) in your browser.

### Method 2: Local Server
```bash
# Clone the repository
git clone https://github.com/muhammadzuhuuron/sheep-farm-management.git
cd sheep-farm-management

# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server

# Then visit:
# English: http://localhost:8000/index.html
# Indonesian: http://localhost:8000/index_id.html
```

## File Structure / Struktur File

```
sheep-farm-management/
├── index.html              # English version
├── index_id.html           # Indonesian version (Versi Bahasa Indonesia)
├── styles.css              # Shared styling
├── script.js               # Shared JavaScript functionality
├── README.md               # English documentation
├── README_ID.md            # Indonesian documentation (Dokumentasi Bahasa Indonesia)
└── .gitignore
```

## Usage Guide / Panduan Penggunaan

### Adding a Sheep / Menambah Domba
1. Navigate to the **Inventory** tab / Buka tab **Inventaris**
2. Fill in the form with sheep details / Isi formulir dengan detail domba
3. Click "Add Sheep" / Klik "Tambah Domba"

### Recording Finances / Mencatat Keuangan
1. Go to **Finances** tab / Buka tab **Keuangan**
2. Use either "Record Income" or "Record Expense" / Gunakan "Catat Pendapatan" atau "Catat Pengeluaran"
3. Fill in details and submit / Isi detail dan kirim

### Health Tracking / Pelacakan Kesehatan
1. Navigate to **Health Records** tab / Buka tab **Catatan Kesehatan**
2. Select a sheep and enter health event details / Pilih domba dan masukkan detail acara kesehatan
3. Submit the form / Kirim formulir

### Viewing Reports / Melihat Laporan
1. Click on **Reports** tab / Klik tab **Laporan**
2. View interactive charts and summaries / Lihat grafik interaktif dan ringkasan
3. Export or print reports / Ekspor atau cetak laporan

## Data Structure / Struktur Data

### Sheep Object / Objek Domba
```javascript
{
  id: timestamp,
  sheepId: "TAG-001",
  name: "Fluffy",
  type: "Ewe",
  dob: "2022-03-15",
  weight: 45.5,
  value: 250.00,
  breed: "Merino",
  status: "Active",
  dateAdded: ISO8601 timestamp
}
```

### Financial Record Object / Objek Catatan Keuangan
```javascript
{
  id: timestamp,
  type: "Income",
  category: "Wool Sale",
  amount: 150.00,
  date: "2024-01-15",
  description: "Sold 10 kg wool",
  timestamp: ISO8601 timestamp
}
```

### Health Record Object / Objek Catatan Kesehatan
```javascript
{
  id: timestamp,
  sheepId: sheepObjectId,
  sheepName: "Fluffy",
  sheepTag: "TAG-001",
  date: "2024-01-15",
  type: "Vaccination",
  description: "Annual flu shot",
  cost: 25.00,
  notes: "No adverse reactions",
  timestamp: ISO8601 timestamp
}
```

## Local Storage / Penyimpanan Lokal

All data is stored in browser's localStorage:
- `sheepData` - Sheep inventory / Inventaris domba
- `financialData` - Financial transactions / Transaksi keuangan
- `healthData` - Health records / Catatan kesehatan

To clear data, open browser DevTools and run:
```javascript
localStorage.clear();
```

## Supported Categories / Kategori yang Didukung

### Sheep Breeds / Ras Domba
- Merino
- Dorper
- Hampshire
- Suffolk
- Corriedale
- Other / Lainnya

### Income Categories / Kategori Pendapatan
- Wool Sale / Penjualan Bulu
- Meat Sale / Penjualan Daging
- Breeding Stock Sale / Penjualan Stok Bibit
- Milk Sale / Penjualan Susu
- Other / Lainnya

### Expense Categories / Kategori Pengeluaran
- Feed & Grain / Pakan & Bijian
- Veterinary Care / Perawatan Hewan
- Medication / Obat-obatan
- Shelter Maintenance / Perbaikan Kandang
- Equipment & Tools / Peralatan & Alat
- Labor / Tenaga Kerja
- Transportation / Transportasi
- Utilities / Utilitas
- Other / Lainnya

### Health Event Types / Jenis Acara Kesehatan
- Vaccination / Vaksinasi
- Treatment / Pengobatan
- Check-up / Pemeriksaan
- Birth / Kelahiran
- Death / Kematian

## Browser Compatibility / Kompatibilitas Browser

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance / Performa

- Optimized for up to 1000+ sheep records
- Real-time filtering and searching
- Efficient chart rendering
- Smooth animations and transitions

## Responsive Design / Desain Responsif

- Desktop optimized (1400px max-width)
- Tablet friendly
- Mobile responsive layout
- Touch-friendly buttons and controls

## Troubleshooting / Pemecahan Masalah

### Data Not Saving / Data Tidak Tersimpan
- Check if localStorage is enabled in browser / Periksa apakah localStorage diaktifkan
- Clear browser cache and reload / Hapus cache browser dan reload
- Check browser storage quota / Periksa kuota penyimpanan browser

### Charts Not Displaying / Grafik Tidak Ditampilkan
- Ensure Chart.js loads from CDN (internet required) / Pastikan Chart.js dimuat dari CDN
- Check browser console for errors / Periksa console browser untuk error
- Refresh the page / Refresh halaman

### Missing Sheep in Dropdown / Domba Hilang di Dropdown
- Add sheep to inventory first / Tambah domba ke inventaris terlebih dahulu
- Refresh the page to sync dropdown / Refresh halaman untuk menyinkronkan dropdown

## Keyboard Shortcuts / Shortcut Keyboard

- **Tab** - Navigate through form fields / Navigasi antar field formulir
- **Enter** - Submit forms / Kirim formulir
- **Escape** - Close modals / Tutup modal

## Data Backup & Restore / Backup & Restore Data

### Backup
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `copy(localStorage.getItem('sheepData'))`
4. Paste into a text file and save

### Restore
1. Open DevTools Console
2. Run: `localStorage.setItem('sheepData', 'YOUR_COPIED_DATA')`

## Future Enhancements / Peningkatan Masa Depan

- Backend database integration (Firebase, MongoDB)
- User authentication and multi-farm support
- Mobile app version
- Advanced analytics and forecasting
- Breeding records and pedigree tracking
- Photo gallery for sheep records
- Weather integration
- Integration with veterinary databases
- QR code scanning for sheep identification
- API integration for market prices

## License / Lisensi

This project is open source and available under the MIT License.

## Contributing / Kontribusi

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Support / Dukungan

For issues or questions / Untuk masalah atau pertanyaan:
- Open a GitHub issue / Buka issue GitHub
- Contact the developer / Hubungi developer

## Changelog

### Version 1.0.0 (Initial Release)
- Complete sheep inventory management
- Financial transaction recording
- Health record tracking
- Interactive dashboard and reports
- CSV export functionality
- Responsive design
- English & Indonesian language versions

---

## Multilingual Support / Dukungan Multibahasa

This application is available in multiple languages:
- **English** - Main interface in English
- **Indonesian (Bahasa Indonesia)** - Antarmuka lengkap dalam Bahasa Indonesia

Simply click the appropriate version to switch languages.

---

Made with ❤️ for sheep farmers / Dibuat dengan ❤️ untuk peternak domba

**Repository:** https://github.com/muhammadzuhuuron/sheep-farm-management