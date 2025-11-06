# Frontend React - Aplikasi Kopi Full-Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
</p>

Ini adalah proyek *frontend* yang dibangun dengan **React** dan **Vite** sebagai antarmuka (UI) untuk [API Backend Go](https://github.com/akmalfman/go-clean-architecture-api).

Aplikasi ini adalah **Single Page Application (SPA)** yang fungsional penuh, menerapkan *best practices* React modern, termasuk *routing* sisi klien, manajemen *state* global dengan **Context API**, *styling* modern dengan **Tailwind CSS**, dan **Full CRUD** (Create, Read, Update, Delete) yang diamankan.

---

## 🚀 Fitur Utama

* **Full CRUD:** Fungsionalitas penuh untuk *Create, Read, Update,* dan *Delete* data produk.
* **Autentikasi JWT:** Alur registrasi dan login yang terhubung ke API. Token JWT disimpan di `localStorage` dan dikirim secara otomatis di *header* `Authorization` untuk *request* yang diamankan.
* **Manajemen State Global (Context API):** Status login (`isLoggedIn`, `token`) dikelola secara global menggunakan React Context. Komponen seperti Navbar dan halaman-halaman lain "mendengarkan" perubahan *state* ini secara reaktif.
* **Routing & Protected Routes (React Router):**
    * Navigasi *multi-halaman* (`/`, `/login`, `/register`, `/add-product`, `/edit-product/:id`) tanpa *refresh*.
    * **Protected Routes:** Halaman sensitif (seperti `/add-product` dan `/edit-product/:id`) "dijaga". Pengguna yang belum login akan otomatis "ditendang" ke halaman `/login`.
* **Styling Modern (Tailwind CSS):** Antarmuka yang bersih dan responsif dibangun menggunakan *utility-first classes* dari Tailwind.
* **Konsumsi API (Axios):** Semua *request* jaringan (GET, POST, PUT, DELETE) ditangani dengan `axios`, termasuk penanganan *error*.
* **UI Reaktif:**
    * Navbar berubah secara dinamis (menampilkan "Login" atau "Logout") berdasarkan status autentikasi.
    * Daftar produk otomatis *auto-refresh* setelah operasi Create, Update, atau Delete berhasil.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Library:** React
* **Bundler:** Vite
* **Styling:** Tailwind CSS (v3)
* **Routing:** React Router (`react-router-dom`)
* **Manajemen State:** React Context API (bawaan React)
* **HTTP Client:** Axios
* **Bahasa:** JavaScript (JSX)

---

## 🏁 Cara Menjalankan (Getting Started)

### Prasyarat

* [Node.js](https://nodejs.org/) (versi 20+)
* **PENTING:** **[Backend API Go](https://github.com/akmalfman/go-clean-architecture-api)** harus sudah berjalan di `http://localhost:8080`.

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    # Ganti [NAMA_USER_KAMU]/[NAMA_REPO_KAMU]
    git clone [https://github.com/](https://github.com/)[NAMA_USER_KAMU]/[NAMA_REPO_KAMU].git
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd [NAMA_REPO_KAMU]
    ```

3.  **Install dependensi:**
    ```bash
    npm install
    ```

4.  **Jalankan Server Pengembangan (Vite):**
    ```bash
    npm run dev
    ```

✅ Aplikasi frontend sekarang berjalan di `http://localhost:5173`.

---

## 🗺️ Alur Halaman (Pages Flow)

* **`/` (Home):** Menampilkan semua produk.
    * Jika *login*, menampilkan tombol `+` (Tambah) dan tombol `Edit`/`Delete` pada tiap produk.
* **`/login`:** Halaman form login.
* **`/register`:** Halaman form registrasi.
* **`/add-product` (Terproteksi):** Halaman form untuk membuat produk baru.
* **`/edit-product/:id` (Terproteksi):** Halaman form untuk meng-edit produk, yang sudah terisi data produk tersebut.

---

## 🔗 Koneksi ke Backend

Proyek ini dirancang untuk berkomunikasi dengan API backend terpisah. Pastikan repositori backend berikut sudah berjalan:

**[https://github.com/akmalfman/go-clean-architecture-api](https://github.com/akmalfman/go-clean-architecture-api)**
