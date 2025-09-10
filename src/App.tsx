import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

// Páginas públicas
import Home from './pages/Home';
import AirPods from './pages/AirPods';
import MacBook from './pages/MacBook';
import Ipad from './pages/ipad';
import Watch from './pages/watch'
import Sobre from './pages/Sobre';
import Iphone from './pages/Iphone';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Account from './pages/Account';

// Admin
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPage from './pages/Admin/AdminPage';
import AdminUsers from './components/admin/users';
import AdminDashboard from './components/admin/dashboard';
import AdminProducts from './components/admin/products';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1">
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/airpods" element={<AirPods />} />
                <Route path="/macbook" element={<MacBook />} />
                <Route path="/ipad" element={<Ipad />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/iphone" element={<Iphone />} />
                <Route path="/watch" element={<Watch />} />

                <Route path="/product/:id" element={<ProductPage />} />

                {/* Login admin */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Rotas admin protegidas */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminProtectedRoute>
                      <AdminProducts />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminProtectedRoute>
                      <AdminUsers />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminPage />
                    </AdminProtectedRoute>
                  }
                />

                {/* Rotas protegidas do usuário */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/conta"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <div className="text-center py-20 text-gray-500">
                      Página não encontrada
                    </div>
                  }
                />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
