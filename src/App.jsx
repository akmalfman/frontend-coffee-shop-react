import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css'; // Import CSS baru kita
import { useAuth } from './context/AuthContext'; // 1. Import hook 'useAuth'

function App() {
  // 2. Ambil data dari "Awan" (Context)
  const { isLoggedIn, logout } = useAuth();

  return (
    // 3. Terapkan class CSS
    <div className="app-container">
      <nav className="navbar">
        <h1 className="nav-logo">Kopi Ohang</h1>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li>
                {/* 4. 'logout' langsung dari context */}
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* 5. Outlet akan merender halaman (HomePage, dll) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;