// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CreateProductForm from '../components/CreateProductForm';
import { useAuth } from '../context/AuthContext'; // 1. Import 'useAuth'

function HomePage() {
    const [products, setProducts] = useState([]);
    const { isLoggedIn } = useAuth(); // 2. Ambil status login dari "Awan"

    // ... (fetchProducts kodenya sama persis) ...
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

    return (
        <div>
            {/* 3. Tampilkan form jika 'isLoggedIn' dari context true */}
            {isLoggedIn && (
                <>
                    <CreateProductForm onProductCreated={fetchProducts} />
                    <hr />
                </>
            )}

            <h2>Daftar Produk:</h2>
            <div className="product-list">
                <ul>
                    {/* ... (kode map produk sama persis) ... */}
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <li key={product.id}>
                                <strong>{product.name}</strong> - Rp {product.price}
                            </li>
                        ))
                    ) : (
                        <p>Belum ada produk.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;