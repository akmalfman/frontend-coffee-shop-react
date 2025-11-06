import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import 'useAuth'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth(); // 2. Ambil fungsi 'login' dari "Awan"
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // 3. Panggil 'login' dari context
            await login(email, password);
            // 4. Redirect JIKA sukses
            navigate('/');
        } catch (err) {
            setError('Email atau password salah.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                Belum punya akun? <Link to="/register">Daftar di sini</Link>
            </p>
        </div>
    );
}

export default LoginPage;