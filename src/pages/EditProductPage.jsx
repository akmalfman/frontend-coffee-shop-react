import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function EditProductPage() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // State loading

    const { id } = useParams(); // 1. Ambil 'id' dari URL (misal: "1")
    const { token } = useAuth();
    const navigate = useNavigate();

    // 2. Ambil data produk saat halaman dibuka
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Panggil API Go kita yang baru!
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                // Isi form dengan data yang didapat
                setName(response.data.name);
                setPrice(response.data.price);
                setLoading(false);
            } catch (err) {
                setError('Gagal memuat data produk.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]); // Dependensi [id], jalankan jika id berubah

    // 3. Handle 'submit' untuk UPDATE (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put(
                `http://localhost:8080/products/${id}`, // URL untuk update
                { name: name, price: parseInt(price) }, // Data baru
                { headers: { 'Authorization': `Bearer ${token}` } } // Pakai token
            );
            navigate('/'); // Kembali ke Home setelah sukses
        } catch (err) {
            setError('Gagal meng-update produk.');
        }
    };

    if (loading) {
        return <p className="text-center text-stone-600">Loading data produk...</p>;
    }

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-stone-900">
                Edit Produk
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-stone-50 p-6 rounded-lg border border-stone-200">
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Nama Produk:
                    </label>
                    <input
                        type="text"
                        value={name} // State 'name'
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-md bg-white text-stone-900 border border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Harga:
                    </label>
                    <input
                        type="number"
                        value={price} // State 'price'
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="Contoh: 20000"
                        className="w-full p-3 rounded-md bg-white text-stone-900 border border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-4 rounded"
                >
                    Simpan Perubahan
                </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
}

export default EditProductPage;