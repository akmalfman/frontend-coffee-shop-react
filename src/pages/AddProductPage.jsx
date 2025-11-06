import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from '../components/CreateProductForm';

function AddProductPage() {
    const navigate = useNavigate();

    // Ini adalah fungsi yang akan kita oper ke form.
    // Setelah form sukses, kita 'navigate' (pindah) ke Home.
    const handleSuccess = () => {
        navigate('/');
    };

    return (
        <div>
            {/* Kita panggil form-nya di sini.
        Saat onProductCreated dipanggil, 'handleSuccess' akan jalan.
      */}
            <CreateProductForm onProductCreated={handleSuccess} />
        </div>
    );
}

export default AddProductPage;