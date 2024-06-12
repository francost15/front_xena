import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Asegúrate de instalar react-icons usando npm o yarn
import Tooltip from '@mui/material/Tooltip'; // Asegúrate de instalar @mui/material y @emotion/react @emotion/styled si aún no lo has hecho

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/login`, { email, password });
            console.log(response);
            localStorage.setItem('token', response.data.data.token);
            login(response.data.data.token);
            navigate('/', { replace: true });
        } catch (error) {
            console.error(error);
            setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex justify-center'>
            <div className="max-w-md mx-auto mt-8 p-14 bg-neutral-900 rounded-lg shadow-md">
                <h1 className="text-4xl font-semibold mb-4 text-white">Iniciar Sesión</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-white text-lg mb-2">Email:</label>
                        <input type="email" id="email" className="form-input rounded-xl p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-white text-lg mb-2">Contraseña:</label>
                        <input type={showPassword ? "text" : "password"} id="password" className="form-input rounded-xl p-3 w-full pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Tooltip title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-9 right-0 pr-2 flex items-center text-sm leading-5 mt-3 bg-white rounded-r-xl">
                                {showPassword ? <FaEyeSlash size="1.5em" color="black" /> : <FaEye size="1.5em" color="black" />}
                            </button>
                        </Tooltip>
                    </div>
                    <button type="submit" className="bg-red-700 text-white py-2 px-6 rounded hover:bg-red-900">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;