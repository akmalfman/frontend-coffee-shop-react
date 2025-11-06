// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'

import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

import AddProductPage from './pages/AddProductPage.jsx';     // <-- BARU
import EditProductPage from './pages/EditProductPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // <-- BARU

import { AuthProvider } from './context/AuthContext.jsx'; // 1. Import


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },

      {
        path: "/add-product",
        element: (
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        )
      },

      {
        path: "/edit-product/:id", // :id adalah parameter URL
        element: (<ProtectedRoute><EditProductPage /></ProtectedRoute>)
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. BUNGKUS RouterProvider dengan AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)