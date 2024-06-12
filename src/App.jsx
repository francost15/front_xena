import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Register from './components/Register';
import logoxena from "./assets/xenavar.png"
import { AuthProvider } from './components/AuthContext';
function App() {
    const token = localStorage.getItem('token');

    return (
        <AuthProvider>
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        {token && (
                            <>
                                <li>
                                    <Link to="/">
                                    <div className="flex justify-center mb-8">
                    <img src={logoxena} alt="Empresa Logo" className="h-24" />
                </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/create" className='text-white text-2xl'>Crear Producto</Link>
                                </li>
                            </>
                        )}
                        {!token && (
                            <>
                                <li>
                                    <Link to="/login"  className='text-white' >Iniciar Sesión</Link>
                                </li>
                                <li>
                                    <Link to="/register" className='text-white'>Registrarse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={token ? <ProductList /> : <Navigate to="/login" />}
                        />
                    <Route
                        path="/create"
                        element={token ? <CreateProduct /> : <Navigate to="/login" />}
                        />
                    <Route
                        path="/edit/:id"
                        element={token ? <EditProduct /> : <Navigate to="/login" />}
                        />
                </Routes>
            </div>
        </BrowserRouter>
    </AuthProvider>
    );
}

export default App;