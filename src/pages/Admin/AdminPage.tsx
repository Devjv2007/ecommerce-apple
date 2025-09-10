// src/pages/Admin/AdminPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../../components/admin/products';
import Dashboard from '../../components/admin/dashboard';
import AdminUsers from '../../components/admin/users';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // Estado para controlar qual aba está ativa

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', name: 'Produtos'},
    { id: 'products', name: 'Dashboard'},
    { id: 'users', name: 'Usuários'},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b -mt-2 border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">
                 Painel Administrativo
              </h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>Sair</span>
              </button>
            </div>
          </div>
          <nav className="px-6">
            <div className="flex space-x-0">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)} 
                  className={`px-6 py-4 font-medium transition-all border-b-2 ${
                    activeTab === item.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg"></span>
                    <span>{item.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
          {activeTab === 'dashboard' && (
            <AdminDashboard />
          )}
          
          {activeTab === 'products' && (
            <Dashboard />
          )}

          {activeTab === 'users' && (
            <AdminUsers />
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPage;
