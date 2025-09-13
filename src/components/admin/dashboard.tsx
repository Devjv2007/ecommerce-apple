// src/components/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react'

interface DashboardStats {
  totalPedidos: number
  receitaTotal: number
  totalUsuarios: number
  pedidosHoje: number
  receitaHoje: number
  pedidosRecentes: Array<{
    id: number
    usuario_nome: string
    total: number
    data_pedido: string
    status: string
  }>
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPedidos: 0,
    receitaTotal: 0,
    totalUsuarios: 0,
    pedidosHoje: 0,
    receitaHoje: 0,
    pedidosRecentes: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingPedido, setEditingPedido] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        console.log('Buscando estatísticas do dashboard...')
        
        const response = await fetch('https://ecommerce-apple.onrender.com/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erro ao buscar estatísticas')
        }

        const data = await response.json()
        console.log('Estatísticas carregadas:', data)
        
        setStats(data)
        setError(null)
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err)
        setError('Erro ao carregar estatísticas do dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
    
    const interval = setInterval(fetchDashboardStats, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const updatePedido = async (pedidoId: number, novoStatus: string) => {
    try {
      setUpdating(true)
      
      const response = await fetch(`https://ecommerce-apple.onrender.com/api/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar pedido')
      }

      setStats(prevStats => ({
        ...prevStats,
        pedidosRecentes: prevStats.pedidosRecentes.map(pedido => 
          pedido.id === pedidoId 
            ? { ...pedido, status: novoStatus }
            : pedido
        )
      }))

      setShowEditModal(false)
      setEditingPedido(null)
      
    } catch (err) {
      console.error('Erro ao atualizar pedido:', err)
      setError('Erro ao atualizar pedido')
    } finally {
      setUpdating(false)
    }
  }

  const handleEditClick = (pedido: any) => {
    setEditingPedido(pedido)
    setShowEditModal(true)
  }
  
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
      case 'pendente': return 'Pendente'
      case 'processando': return 'Processando'
      case 'enviado': return 'Enviado'
      case 'entregue': return 'Entregue'
      case 'cancelado': return 'Cancelado'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3">Carregando dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Tentar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
 
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Receita Total</h3>
              <p className="text-3xl font-bold">
                R$ {stats.receitaTotal.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm opacity-80">Todos os pedidos</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-200 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total de Pedidos</h3>
              <p className="text-3xl font-bold">{stats.totalPedidos}</p>
              <p className="text-sm opacity-80">Pedidos ao total</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-200 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Usuários</h3>
              <p className="text-3xl font-bold">{stats.totalUsuarios}</p>
              <p className="text-sm opacity-80">Cadastrados</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-200 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Hoje</h3>
              <p className="text-2xl font-bold">
                R$ {stats.receitaHoje.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm opacity-80">
                {stats.pedidosHoje} pedido{stats.pedidosHoje !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Banco de Pedidos</h2>
        </div>
        <div className="p-6">
          {stats.pedidosRecentes.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Nenhum pedido encontrado no banco</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.pedidosRecentes.map((pedido) => (
                    <tr key={pedido.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{pedido.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pedido.usuario_nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(pedido.data_pedido).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        R$ {pedido.total.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                          {getStatusText(pedido.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(pedido)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showEditModal && editingPedido && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Editar Pedido #{editingPedido.id}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={editingPedido.status}
                  onChange={(e) => setEditingPedido({...editingPedido, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pendente">Pendente</option>
                  <option value="processando">Processando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregue">Entregue</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingPedido(null)
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  disabled={updating}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => updatePedido(editingPedido.id, editingPedido.status)}
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {updating ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
