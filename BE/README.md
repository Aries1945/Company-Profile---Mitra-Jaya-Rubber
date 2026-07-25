# 🐘 Mitra Jaya Rubber — Backend API (Node.js + Express + PostgreSQL)

Folder ini berisi server **Backend API** berbasis **Node.js, Express.js, & PostgreSQL** untuk mengelola data dan foto produk Mitra Jaya Rubber secara permanen.

---

### 📁 Struktur Folder Backend
```text
WEBSITE-MITRAJAYARUBBER-BACKEND/
├── server.js          # Express Server & Endpoint API CRUD
├── schema.sql         # Script SQL untuk membuat tabel PostgreSQL
├── .env               # File konfigurasi koneksi database PostgreSQL
├── package.json       # Dependencies Node.js (Express, pg, cors, dotenv)
└── README.md          # Panduan penggunaan
```

---

### 🚀 Cara Menjalankan Backend API

1. **Buka Terminal & Masuk ke Folder Backend**:
   ```bash
   cd c:\Users\User\Documents\WEBSITE-MITRAJAYARUBBER\WEBSITE-MITRAJAYARUBBER-BACKEND
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Pastikan PostgreSQL Berjalan & Sesuaikan `.env`**:
   Buka file `.env` lalu sesuaikan kredensial PostgreSQL Anda:
   ```env
   PORT=5000
   PGHOST=localhost
   PGPORT=5432
   PGUSER=postgres
   PGPASSWORD=admin_password_anda
   PGDATABASE=mitra_jaya_rubber
   ```

4. **Jalankan Server Backend**:
   ```bash
   npm start
   ```
   Server akan berjalan di `http://localhost:5000`.

---

### 🌐 Endpoints REST API

| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Ambil semua produk dari database |
| `POST` | `/api/products` | Tambah produk baru ke database |
| `PUT` | `/api/products/:id` | Edit/Update data produk |
| `DELETE` | `/api/products/:id` | Hapus produk dari database |
