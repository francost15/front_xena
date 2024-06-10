import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        {token && (
                            <>
                                <li>
                                    <Link to="/">Productos</Link>
                                </li>
                                <li>
                                    <Link to="/create">Crear Producto</Link>
                                </li>
                            </>
                        )}
                        {!token && (
                            <>
                                <li>
                                    <Link to="/login">Iniciar Sesión</Link>
                                </li>
                                <li>
                                    <Link to="/register">Registrarse</Link>
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
    );
}

export default App;