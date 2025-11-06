import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Email atau password salah.');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-stone-900">
                Login
            </h2>

            {/* Form dengan background krem & border */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-stone-50 p-6 rounded-lg border border-stone-200">
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Email:
                    </label>
                    {/* Input style light mode */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-md bg-white text-stone-900 border border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-md bg-white text-stone-900 border border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>

                {/* Tombol pakai warna aksen Cokelat/Amber */}
                <button
                    type="submit"
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-4 rounded"
                >
                    Login
                </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="text-center mt-6 text-stone-700">
                Belum punya akun?{' '}
                <Link to="/register" className="font-medium text-amber-700 hover:text-amber-600">
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;