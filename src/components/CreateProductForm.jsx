import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CreateProductForm({ onProductCreated }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!token) {
            setError('Kamu harus login untuk menambah produk.');
            return;
        }
        try {
            await axios.post(
                'http://localhost:8080/products',
                { name: name, price: parseInt(price) },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setName('');
            setPrice('');
            onProductCreated();
        } catch (err) {
            setError('Gagal menambah produk.');
        }
    };

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-stone-800">Tambah Produk Baru</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-stone-50 p-6 rounded-lg border border-stone-200">
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Nama Produk:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Kopi Susu"
                        className="w-full p-3 rounded-md bg-white text-stone-900 border border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Harga:
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="20000"
                        className="w-full p-3 rounded-md bg-white text-stone-900 border border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-4 rounded"
                >
                    Tambah Produk
                </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
}

export default CreateProductForm;