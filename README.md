# Birthday Surprise Website 💌

Website surprise ulang tahun romantis berbentuk digital love letter dengan animasi interaktif.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Canvas Confetti

## Cara Menjalankan Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

Website akan berjalan di `http://localhost:5173`

## Cara Kustomisasi

### 1. Mengganti Nama dan Isi Surat

Edit file `src/data/letter.js`:

```javascript
export const letterContent = {
  greeting: "Happy Birthday, Sayang ❤️",  // Ganti sapaan
  paragraphs: [
    "Paragraf pertama...",
    "Paragraf kedua...",
    // Tambah atau kurangi paragraf sesuai kebutuhan
  ],
  closing: "With all my love,",  // Ganti penutup
  signature: "Faizal ❤️"  // Ganti nama pengirim
};
```

### 2. Menambahkan/Mengganti Foto Kenangan

1. Simpan foto ke folder `public/images/`
2. Beri nama: `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`, dst.
3. Edit file `src/data/memories.js`:

```javascript
export const memories = [
  {
    image: "/images/memory-1.jpg",
    caption: "Caption foto pertama"
  },
  {
    image: "/images/memory-2.jpg",
    caption: "Caption foto kedua"
  },
  // Tambah foto lain jika mau
];
```

**Format foto yang didukung:** JPG, PNG, JPEG, WebP

### 3. Mengganti Lagu

1. Simpan file audio ke `public/music/our-song.mp3`
2. Format yang didukung: MP3, WAV, OGG
3. Untuk mengganti nama lagu yang ditampilkan, edit `src/components/MusicPlayer.jsx` baris 101:

```javascript
<p className="font-body text-sm text-burgundy font-medium mb-1">
  Nama Lagu Anda  {/* Ganti di sini */}
</p>
```

### 4. Mengganti Warna Theme (Opsional)

Edit file `tailwind.config.js` di bagian `colors`:

```javascript
colors: {
  'cream': '#FFF8F0',
  'warm-white': '#FFFBF5',
  'soft-pink': '#FFE5E5',
  'dusty-rose': '#D4A5A5',
  'burgundy': '#8B4049',
  'dark-brown': '#5C3A3A',
}
```

## Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## Deploy ke Vercel

### Opsi 1: Menggunakan Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Untuk production:
```bash
vercel --prod
```

### Opsi 2: Menggunakan Vercel Dashboard

1. Push project ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Login dan klik "Add New Project"
4. Import repository dari GitHub
5. Vercel akan otomatis detect Vite project
6. Klik "Deploy"

**Build Settings (otomatis terdeteksi):**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Opsi 3: Deploy Manual (Upload folder dist)

1. Jalankan build:
```bash
npm run build
```

2. Upload folder `dist/` ke Vercel:
```bash
vercel --prod dist/
```

## Struktur Project

```
birthday-girlfriend/
├── public/
│   ├── images/           # Tempat foto kenangan
│   │   ├── memory-1.jpg
│   │   ├── memory-2.jpg
│   │   └── memory-3.jpg
│   └── music/            # Tempat file audio
│       └── our-song.mp3
├── src/
│   ├── components/       # Komponen React
│   │   ├── Opening.jsx
│   │   ├── Envelope.jsx
│   │   ├── Letter.jsx
│   │   ├── MemoryGallery.jsx
│   │   ├── FinalSurprise.jsx
│   │   └── MusicPlayer.jsx
│   ├── data/             # Data content
│   │   ├── letter.js     # Isi surat
│   │   └── memories.js   # Data foto
│   ├── App.jsx           # Main app
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Fitur Website

1. **Opening Screen** - Tampilan awal dengan amplop
2. **Envelope Animation** - Animasi amplop terbuka
3. **Letter** - Surat cinta dengan typing effect
4. **Memory Gallery** - Galeri foto kenangan
5. **Final Surprise** - Ucapan ulang tahun dengan confetti
6. **Music Player** - Player lagu dengan kontrol play/pause

## Tips

- Gunakan foto dengan resolusi baik tapi tidak terlalu besar (max 2MB per foto)
- File audio sebaiknya ukuran max 10MB
- Test di HP sebelum kirim ke pacar
- Pastikan semua foto dan lagu sudah diganti sebelum deploy
- Website responsive, bisa dibuka di HP maupun desktop

## Troubleshooting

**Audio tidak play di mobile?**
- Pastikan user menekan tombol "Play Our Song" (autoplay tidak diizinkan browser)
- Gunakan format MP3 untuk kompatibilitas terbaik

**Foto tidak muncul?**
- Cek path file sudah benar di `src/data/memories.js`
- Pastikan file foto ada di `public/images/`
- Refresh browser atau clear cache

**Build error?**
- Jalankan `npm install` ulang
- Pastikan semua file import path benar

## License

Personal project - Dibuat dengan ❤️ untuk orang tersayang
