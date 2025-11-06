import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook untuk redirect

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inisialisasi hook

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
            // Redirect ke halaman login setelah sukses
            navigate('/login');

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error); // "Email sudah terdaftar"
            } else {
                setError('Registrasi gagal. Coba lagi nanti.');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default RegisterPage;