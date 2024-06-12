import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (tipo) => {
        setFilterType(tipo);
        setSearchTerm('');
    };

    const filteredProducts = products.filter(product =>
        (product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
        (filterType === '' || product.tipo.toLowerCase() === filterType.toLowerCase())
    );

    return (
        <div className="text-white py-14 px-12">
            <div className="container mx-auto">
                <div className="mb-4 flex justify-center items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="px-4 py-2 pl-10 rounded-md bg-neutral-800 text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    </div>
                </div>
                <div className="mb-4 flex justify-center space-x-2">
                    <button 
                        onClick={() => handleFilter('')}
                        className="bg-neutral-900 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Todos
                    </button>
                    <button 
                        onClick={() => handleFilter('Proteína')}
                        className="bg-neutral-900 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Proteína
                    </button>
                    <button 
                        onClick={() => handleFilter('vitamina')}
                        className="bg-neutral-900 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Vitamina
                    </button>
                    <button 
                        onClick={() => handleFilter('creatina')}
                        className="bg-neutral-900 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Creatina
                    </button>
                    <button 
                        onClick={() => handleFilter('preworkout')}
                        className="bg-neutral-900 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Preworkout
                    </button>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
                            <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]">
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        {filteredProducts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-neutral-700 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-3 px-4 text-left">Nombre</th>
                                            <th className="py-3 px-4 text-left">Precio</th>
                                            <th className="py-3 px-4 text-left">Tipo</th>
                                            <th className="py-3 px-4 text-left">Marca</th>
                                            <th className="py-3 px-4 text-left">Cantidad</th>
                                            <th className="py-3 px-4 text-left">Imagen</th>
                                            <th className="py-3 px-4 text-left">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map((product) => (
                                            <tr key={product._id} className="border-b border-neutral-600 hover:bg-neutral-600 transition">
                                                <td className="py-3 px-4">{product.nombre}</td>
                                                <td className="py-3 px-4">${product.precio}</td>
                                                <td className="py-3 px-4">{product.tipo}</td>
                                                <td className="py-3 px-4">{product.marca}</td>
                                                <td className="py-3 px-4">{product.cantidad}</td>
                                                <td className="py-3 px-4">
                                                    <img
                                                        src={`${import.meta.env.VITE_BACK_URL}${product.imagen}`}
                                                        alt={product.nombre}
                                                        className="max-w-[100px] rounded"
                                                        onError={(e) => { 
                                                            console.error('Image load error:', e); // Log image load errors
                                                        }}
                                                    />
                                                </td>
                                                <td className="py-3 px-4 flex gap-2">
                                                    <Link 
                                                        to={`/edit/${product._id}`} 
                                                        className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteProduct(product._id)} 
                                                        className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center min-h-[400px]">
                                <p className="text-xl text-gray-400 mb-4">No se encontraron productos</p>
                                <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-400" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductList;