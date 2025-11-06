// src/components/CreateProductForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 1. Import 'useAuth'

function CreateProductForm({ onProductCreated }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');

    const { token } = useAuth(); // 2. Ambil 'token' dari "Awan"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) { // 3. Cek token dari context
            setError('Kamu harus login untuk menambah produk.');
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/products',
                { name: name, price: parseInt(price) },
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // 4. Pakai token dari context
                    }
                }
            );
            alert('Produk berhasil ditambahkan!');
            setName('');
            setPrice(0);
            onProductCreated();

        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Token tidak valid. Silakan login lagi.');
            } else {
                setError('Gagal menambah produk.');
            }
        }
    };

    return (
        <div>
            <h3>Tambah Produk Baru</h3>
            <form onSubmit={handleSubmit}>
                {/* ... (kode form sama persis) ... */}
                <div>
                    <label>Nama Produk: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Harga: </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Tambah</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default CreateProductForm;