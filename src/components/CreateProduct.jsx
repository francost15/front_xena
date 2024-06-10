import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const token = localStorage.getItem('token');

    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: '',
        tipo: '',
        marca: '',
        imagen: null,
    });

    const [addingNewBrand, setAddingNewBrand] = useState(false);
    const [newBrand, setNewBrand] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, imagen: e.target.files[0] });
    };

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        if (selectedBrand === 'add-new') {
            setAddingNewBrand(true);
            setProduct({ ...product, marca: '' });
        } else {
            setAddingNewBrand(false);
            setProduct({ ...product, marca: selectedBrand });
        }
    };

    const handleNewBrandChange = (e) => {
        setNewBrand(e.target.value);
        setProduct({ ...product, marca: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', product.nombre);
            formData.append('descripcion', product.descripcion);
            formData.append('precio', product.precio);
            formData.append('cantidad', product.cantidad);
            formData.append('tipo', product.tipo);
            formData.append('marca', product.marca);
            formData.append('imagen', product.imagen);

            // Include token in Authorization header if it exists
            if (token) {
                await axios.post(`${import.meta.env.VITE_BACK_URL}/api/products`, formData, {
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

    const handleCancel = () => {
        navigate(-1); // Navegar a la página anterior
    };

    return (
        <div className="min-h-screen bg-neutral-900 shadow-2xl border rounded-xl flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Crear Producto</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={product.nombre} 
                                onChange={handleChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre del producto"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Descripción</label>
                            <input 
                                type="text" 
                                name="descripcion" 
                                value={product.descripcion} 
                                onChange={handleChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Descripción del producto"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Precio</label>
                            <input 
                                type="number" 
                                name="precio" 
                                value={product.precio} 
                                onChange={handleChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Precio del producto"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Cantidad</label>
                            <input 
                                type="number" 
                                name="cantidad" 
                                value={product.cantidad} 
                                onChange={handleChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Cantidad del producto"
                            />
                        </div>
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Tipo</label>
                            <select 
                                name="tipo" 
                                value={product.tipo} 
                                onChange={handleChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                            >
                                <option value="">Seleccione un tipo</option>
                                <option value="Proteína">Proteína</option>
                                <option value="creatina">Creatina</option>
                                <option value="vitamina">Vitamina</option>
                                <option value="Ropa">Ropa</option>
                                <option value="preworkout">Preworkout</option>
                            </select>
                        </div>
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Marca</label>
                            <select 
                                name="marca" 
                                value={product.marca} 
                                onChange={handleBrandChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                            >
                                <option value="">Seleccione una marca</option>
                                <option value="Raw">Raw</option>
                                <option value="Mutant">Mutant</option>
                                <option value="Optimum Nutrition">Optimum Nutrition</option>
                                <option value="BSN">BSN</option>
                                <option value="Dymatize">Dymatize</option>
                                <option value="add-new">Agregar nueva marca</option>
                            </select>
                            {addingNewBrand && (
                                <div className="py-2">
                                    <label className="block text-sm font-medium text-gray-300">Nueva Marca</label>
                                    <input 
                                        type="text" 
                                        name="newBrand" 
                                        value={newBrand} 
                                        onChange={handleNewBrandChange} 
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                        placeholder="Ingrese nueva marca"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="py-2">
                            <label className="block text-sm font-medium text-gray-300">Imagen</label>
                            <input 
                                type="file" 
                                name="imagen" 
                                onChange={handleFileChange} 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-2"
                        >
                            Crear Producto
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
