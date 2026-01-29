# Dokumentasi Teknis

## 1. Instalasi dan Cara Menjalankan Aplikasi

Berikut adalah panduan langkah demi langkah untuk menginstal dan menjalankan aplikasi frontend ini di lingkungan lokal.

### Prasyarat (Requirements)

Pastikan Anda telah menginstal:

- **Node.js** (Versi 18 atau lebih baru disarankan)
- **Package Manager**: npm, yarn, atau pnpm

### Langkah Instalasi

1.  **Clone Repository**
    Unduh kode sumber proyek ke komputer lokal Anda.

2.  **Instal Dependensi**
    Buka terminal, navigasikan ke direktori proyek, dan jalankan perintah:
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

### Menjalankan Aplikasi (Development)

Untuk menjalankan aplikasi dalam mode pengembangan:

```bash
npm run dev
# atau
yarn dev
```

Aplikasi biasanya akan berjalan di `http://localhost:5173`. Periksa terminal untuk alamat yang tepat.

### Membangun untuk Produksi (Build)

Untuk membuat versi build yang dioptimalkan untuk deployment:

```bash
npm run build
```

Hasil build akan berada di folder `dist`.

---

## 2. Struktur Folder dan Penjelasan Komponen

Aplikasi ini diorganisir menggunakan prinsip modular dan **Atomic Design** untuk skalabilitas dan kemudahan pemeliharaan. Berikut adalah penjelasan struktur direktori utama di dalam `src/`:

### `src/components/`

Pusat komponen UI aplikasi. Terbagi menjadi beberapa sub-folder berdasarkan kompleksitas:

- **`ui/`**: Komponen dasar _reusable_ (Library UI/Shadcn), seperti Button, Input, Card, Dialog.
- **`atoms/`**: Komponen terkecil yang unik untuk aplikasi ini.
- **`molecules/`**: Gabungan dari beberapa atom (contoh: SearchBar, FormField).
- **`organisms/`**: Komponen kompleks yang membentuk bagian halaman (contoh: Navbar, Sidebar, DocumentTable).
- **`templates/`**: Tata letak (layout) halaman utama.
- **`pages/`**: Halaman-halaman aplikasi yang terhubung ke Routing.
  - `auth/`: Halaman Login dan Register.
  - `document/`: Halaman Daftar Dokumen dan manajemennya.

### `src/routers/`

Mengatur navigasi dan rute dalam aplikasi.

- **`index.tsx`**: Definisi utama rute aplikasi (URL path ke Komponen Page).
- **`guards.tsx`**: Logic untuk melindungi rute (misalnya redirect ke login jika belum terautentikasi).

### `src/services/`

Layer komunikasi dengan Backend API.

- **`document.ts`**: Berisi fungsi-fungsi API terkait dokumen (Get, Create, Update, Delete).
- **`service.ts`**: Konfigurasi dasar Axios atau fetcher.

### `src/hooks/`

Berisi Custom Hooks React untuk logika bisnis yang dapat digunakan kembali (misalnya manajemen state lokal yang kompleks).

### `src/types/`

Definisi tipe TypeScript (Interfaces/Types) untuk memastikan konsistensi data di seluruh aplikasi, terutama untuk respons API dan Props komponen.

### `src/lib/`

Fungsi utilitas (helpers) dan konfigurasi library pihak ketiga.

### `src/assets/`

Menyimpan file statis seperti gambar, ikon, dan font.

---

## Teknologi Utama

- **Framework**: React 19
- **Bahasa**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State/Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
