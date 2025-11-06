import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from '../components/CreateProductForm';

function AddProductPage() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/');
    };

    return (
        <div>
            <CreateProductForm onProductCreated={handleSuccess} />
        </div>
    );
}

export default AddProductPage;