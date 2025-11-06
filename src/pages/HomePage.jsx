import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const [products, setProducts] = useState([]);
    const { isLoggedIn, token } = useAuth();

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

    const handleDelete = async (productId) => {
        if (!window.confirm('Yakin mau hapus produk ini?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/products/${productId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
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
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 flex justify-between items-center">

                            <div>
                                <strong className="text-lg text-stone-900">{product.name}</strong>
                                <p className="text-lg font-semibold text-amber-800">
                                    Rp {product.price}
                                </p>
                            </div>

                            {isLoggedIn && (
                                <div className="flex gap-2">
                                    <Link
                                        to={`/edit-product/${product.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                                    >
                                        Edit
                                    </Link>
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