import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoggedIn, logout } = useAuth();

  return (
    // Dulu: bg-gray-900
    // Sekarang: bg-white, shadow-xl (bayangan lebih tebal)
    <div className="w-full max-w-3xl mx-auto my-10 p-8 text-left bg-white rounded-lg shadow-xl">

      {/* Navbar */}
      <nav className="flex justify-between items-center pb-4 border-b border-stone-200 mb-8">

        {/* H1 (Judul) pakai warna aksen */}
        <h1 className="text-3xl font-bold text-amber-900">
          Toko Kopi
        </h1>

        <div className="flex items-center">
          <ul className="flex list-none m-0 p-0 gap-6 items-center">
            <li>
              {/* Link pakai warna teks biasa, hover jadi warna aksen */}
              <Link to="/" className="font-medium text-stone-700 hover:text-amber-700">
                Home
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="font-medium text-stone-700 hover:text-amber-700">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="font-medium text-stone-700 hover:text-amber-700">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Outlet (Halaman akan muncul di sini) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;