import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Pedido {
  id: number
  usuario_id: number
  data_pedido: string
  status: 'pendente' | 'processando' | 'enviado' | 'entregue' | 'cancelado'
  subtotal: number
  valor_frete: number
  total: number
  metodo_pagamento?: string
  endereco_cep: string
  endereco_logradouro: string
  endereco_bairro: string
  endereco_cidade: string
  endereco_uf: string
  frete_transportadora: string
  frete_prazo: string
}

const Account: React.FC = () => {
  const { usuario, logout } = useAuth()


  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!usuario?.id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        console.log(' Buscando pedidos do usuário:', usuario.id)
        
        const response = await fetch(`https://ecommerce-apple.onrender.com/api/pedidos/usuario/${usuario.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erro ao carregar pedidos')
        }

        const data = await response.json()
        console.log(' Pedidos encontrados:', data.pedidos)
        
        setPedidos(data.pedidos || [])
        setError(null)
      } catch (err) {
        console.error(' Erro ao buscar pedidos:', err)
        setError('Erro ao carregar seus pedidos')
      } finally {
        setLoading(false)
      }
    }

    fetchPedidos()
  }, [usuario?.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'processando': return 'bg-blue-100 text-blue-800'
      case 'enviado': return 'bg-purple-100 text-purple-800'
      case 'entregue': return 'bg-green-100 text-green-800'
      case 'cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente': return 'Aguardando Pagamento'
      case 'processando': return 'Pedido Processando'
      case 'enviado': return 'Pedido Enviado'
      case 'entregue': return 'Entregue'
      case 'cancelado': return 'Cancelado'
      default: return status
    }
  }

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
          
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold">{usuario.nome}</h2>
                <p className="text-gray-600">{usuario.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-1">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Informações Pessoais</h3>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>CPF:</strong>***********</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Status da Conta</h3>
                <p><strong>Status:</strong> <span className="text-green-600">Ativo</span></p>
                <p><strong>Pedidos realizados:</strong> {pedidos.length}</p>
                <p><strong>Tipo:</strong> Cliente</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Editar Perfil
              </button>
              
              <Link 
                to="/cart" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Meu Carrinho
              </Link>
              
              <button 
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Sair da Conta
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Meus Pedidos</h3>
              <div className="text-sm text-gray-500">
                {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-500">Carregando pedidos do banco de dados...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Tentar Novamente
                </button>
              </div>
            ) : pedidos.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                <div className="text-6xl mb-4"></div>
                <p className="mb-4">Você ainda não fez nenhum pedido.</p>
                <p className="text-sm mb-4 text-gray-400">
                  Finalize uma compra no carrinho para ver seus pedidos aqui
                </p>
                <Link 
                  to="/home" 
                  className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                >
                  Começar a comprar
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {pedidos.map((pedido) => (
                  <div key={pedido.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                          {getStatusText(pedido.status)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-black">
                          {new Date(pedido.data_pedido).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="font-bold text-lg text-green-500">
                          R$ {pedido.total.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Entrega:</div>
                        <div className="text-gray-600">
                          {pedido.endereco_logradouro}, {pedido.endereco_bairro}
                        </div>
                        <div className="text-gray-600">
                          {pedido.endereco_cidade}-{pedido.endereco_uf} - CEP: {pedido.endereco_cep}
                        </div>
                        <div className="text-gray-600">
                          {pedido.frete_transportadora} - {pedido.frete_prazo}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Pagamento:</div>
                        <div className="text-gray-600">
                          {pedido.status === 'processando' ? 'Pagamento Aprovado' : 
                           pedido.metodo_pagamento || 'Aguardando pagamento'}
                        </div>
                        <div className="text-gray-600">
                          Subtotal: R$ {pedido.subtotal.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-gray-600">
                          Frete: R$ {pedido.valor_frete.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t">
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium">
                        Ver Detalhes
                      </button>
                      
                      {pedido.status === 'enviado' && (
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 font-medium">
                          Rastrear Pedido
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="px-4 py-6 pb-20">
          <div className="bg-gradient-to-r from-black to-gray-500 -mx-4 px-4 py-8 mb-6 text-white">
            <h1 className="text-2xl font-bold text-center mb-4">Minha Conta</h1>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
              
              <h2 className="text-xl font-semibold mb-1">{usuario.nome}</h2>
              <p className="text-blue-100 text-sm">{usuario.email}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3">
                <div className="text-2xl font-bold text-green-600">{pedidos.length}</div>
                <div className="text-xs text-gray-600">Pedidos</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold text-blue-600">Ativo</div>
                <div className="text-xs text-gray-600">Status</div>
              </div>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            <Link 
              to="/cart" 
              className="flex items-center justify-center w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 font-semibold shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"></path>
              </svg>
              Meu Carrinho
            </Link>
            
            <button className="flex items-center justify-center w-full bg-yellow-400 text-gray-800 py-4 rounded-xl hover:bg-gray-200 font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Editar Perfil
            </button>
            
            <button 
              onClick={logout}
              className="flex items-center justify-center w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 font-semibold shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sair da Conta
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Meus Pedidos</h3>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'}
              </span>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Carregando pedidos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-6">
                <div className="text-red-500 mb-3">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <p className="text-red-600 text-sm mb-3">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                >
                  Tentar Novamente
                </button>
              </div>
            ) : pedidos.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-600 mb-2 font-medium">Nenhum pedido ainda</p>
                <p className="text-gray-400 text-sm mb-4 px-4">
                  Que tal fazer sua primeira compra? Temos produtos incríveis esperando por você!
                </p>
                <Link 
                  to="/home" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold shadow-sm"
                >
                  Explorar Produtos
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {pedidos.map((pedido) => (
                  <div key={pedido.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-gray-800">Pedido #{pedido.id}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(pedido.data_pedido).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                          {getStatusText(pedido.status)}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="font-bold text-lg text-green-600">
                          R$ {pedido.total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <div className="truncate">
                           {pedido.endereco_cidade}-{pedido.endereco_uf}
                        </div>
                        <div className="truncate mt-1">
                           {pedido.frete_transportadora} - {pedido.frete_prazo}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-white text-gray-700 py-2 px-3 rounded-lg border hover:bg-gray-50 text-sm font-medium">
                        Ver Detalhes
                      </button>
                      
                      {pedido.status === 'enviado' && (
                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm font-medium">
                          Rastrear
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
