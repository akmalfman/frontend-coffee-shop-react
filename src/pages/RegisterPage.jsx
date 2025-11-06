import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password minimal 6 karakter');
            return;
        }

        try {
            await axios.post('http://localhost:8080/register', {
                email: email,
                password: password,
            });

            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError('Registrasi gagal. Coba lagi nanti.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-stone-900">
                Register
            </h2>

            <form onSubmit={handleRegister} className="flex flex-col gap-4 bg-stone-50 p-6 rounded-lg border border-stone-200">
                <div>
                    <label className="block text-sm font-medium text-stone-600 mb-2">
                        Email:
                    </label>
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

                <button
                    type="submit"
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-4 rounded"
                >
                    Register
                </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="text-center mt-6 text-stone-700">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-medium text-amber-700 hover:text-amber-600">
                    Login di sini
                </Link>
            </p>
        </div>
    );
}

export default RegisterPage;