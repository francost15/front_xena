import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [product, setProduct] = useState({
        products: '',
        name: '',
        price: '',
        type: '',
        ml: '',
        imagen: null,
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProduct(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('products', product.products);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('type', product.type);
            formData.append('ml', product.ml);
            if (product.imagen) {
                formData.append('imagen', product.imagen);
            }

            await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, imagen: e.target.files[0] });
    };


    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="products">Producto:</label>
                    <input
                        type="text"
                        id="products"
                        name="products"
                        value={product.products}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="type">Tipo:</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="ml">ml:</label>
                    <input
                        type="number"
                        id="ml"
                        name="ml"
                        value={product.ml}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="imagen">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditProduct;