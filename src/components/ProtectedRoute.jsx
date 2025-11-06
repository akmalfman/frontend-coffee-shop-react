import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate }
    from 'react-router-dom';

// Ini adalah komponen 'High-Order' (pembungkus)
function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth(); // Ambil status dari "awan"

    if (!isLoggedIn) {
        // Jika tidak login, "tendang" ke /login
        // 'replace' berarti user tidak bisa klik 'back' ke halaman ini
        return <Navigate to="/login" replace />;
    }

    // Jika login, tampilkan 'children' (halaman yang dilindungi)
    return children;
}

export default ProtectedRoute;