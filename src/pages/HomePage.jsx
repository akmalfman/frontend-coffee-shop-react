// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. Import <Link>
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const [products, setProducts] = useState([]);
    const { isLoggedIn, token } = useAuth(); // Ambil status login

    // ... (fungsi fetchProducts sama persis, tidak ada yg berubah)
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Terjadi error:', error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // 2. FUNGSI BARU UNTUK DELETE
    const handleDelete = async (productId) => {
        // Tampilkan konfirmasi (best practice)
        if (!window.confirm('Yakin mau hapus produk ini?')) {
            return;
        }

        try {
            // Panggil API DELETE (harus kirim token)
            await axios.delete(`http://localhost:8080/products/${productId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Jika sukses, 'fetch' ulang datanya
            fetchProducts();
        } catch (err) {
            alert('Gagal menghapus produk.');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-stone-900">Daftar Produk</h2>
                {isLoggedIn && (
                    <Link
                        to="/add-product"
                        className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded shadow-lg"
                    >
                        +
                    </Link>
                )}
            </div>

            <div className="space-y-4">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        // 3. MODIFIKASI "KARTU" PRODUK
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 flex justify-between items-center">

                            {/* Bagian Nama & Harga */}
                            <div>
                                <strong className="text-lg text-stone-900">{product.name}</strong>
                                <p className="text-lg font-semibold text-amber-800">
                                    Rp {product.price}
                                </p>
                            </div>

                            {/* 4. TOMBOL BARU (Hanya jika login) */}
                            {isLoggedIn && (
                                <div className="flex gap-2">
                                    {/* Tombol Edit (sebagai Link) */}
                                    <Link
                                        to={`/edit-product/${product.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                                    >
                                        Edit
                                    </Link>
                                    {/* Tombol Delete (sebagai Button) */}
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-stone-500">Belum ada produk.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;