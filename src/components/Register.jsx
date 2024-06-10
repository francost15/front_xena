import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACK_URL}/api/users`, { name, email, password });
            navigate('/login');
        } catch (error) {
            setError('Error al registrarse. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="max-w-md w-full bg-neutral-900 p-14 rounded-lg shadow-md">
                <h1 className="text-4xl font-semibold mb-4 text-white text-center">Registrarse</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-white text-lg mb-2">Nombre:</label>
                        <input type="text" id="name" className="form-input w-full rounded-xl p-3" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-white text-lg mb-2">Email:</label>
                        <input type="email" id="email" className="form-input w-full rounded-xl p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white text-lg mb-2">Contraseña:</label>
                        <input type="password" id="password" className="form-input w-full rounded-xl p-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-red-700 text-white py-2 px-6 w-full rounded-xl hover:bg-red-900 transition-colors duration-300">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
