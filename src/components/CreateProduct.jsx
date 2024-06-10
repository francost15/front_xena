import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

    const token = localStorage.getItem('token');

    const [product, setProduct] = useState({
        products: '',
        name: '',
        price: '',
        type: '',
        ml: '',
        imagen: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('products', product.products);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('type', product.type);
            formData.append('ml', product.ml);
            formData.append('imagen', product.imagen);

            // Include token in Authorization header if it exists
            if (token) {
                await axios.post('http://localhost:5000/api/products', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                console.warn('No token found in local storage. Authorization header omitted.');
            }

            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Crear Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Producto:</label>
                    <input type="text" name="products" value={product.products} onChange={handleChange} />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} />
                </div>
                <div>
                    <label>Tipo:</label>
                    <input type="text" name="type" value={product.type} onChange={handleChange} />
                </div>
                <div>
                    <label>ml:</label>
                    <input type="number" name="ml" value={product.ml} onChange={handleChange} />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="file" name="imagen" onChange={handleFileChange} />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CreateProduct;