import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Lista de Productos</h1>
            <table>
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Tipo</th>
                    <th>ml</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>

                        <td>{product.products}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.type}</td>
                        <td>{product.ml}ml</td>
                        <td>
                            <img src={`http://localhost:5000${product.imagen}`} alt={product.name}
                                 style={{maxWidth: '100px'}}/>
                        </td>
                        <td>
                            <Link to={`/edit/${product._id}`}>Editar</Link>
                            <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;