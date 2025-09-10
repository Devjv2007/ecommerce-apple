// src/components/admin/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  nome: string;
  descricao?: string;
  preco: string | number;
  imagem_url: string | null;
  imagem_2?: string | null;
  imagem_3?: string | null;
  imagem_4?: string | null;
  imagem_5?: string | null;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem_url: '',
    imagem_2: '',
    imagem_3: '',
    imagem_4: '',
    imagem_5: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.15.167:3000/produtos');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Erro na API: ' + response.status);
      }
    } catch (error) {
      setError('Erro de conexão: ' + error);
    } finally {
      setLoading(false);
    }
  };


  const addProduct = async () => {
    if (formData.nome && formData.preco) {
      try {
        console.log('=== DADOS DO FORMULÁRIO ===');
        console.log('Nome:', formData.nome);  
        console.log('Preço:', formData.preco);
        console.log('Imagem Principal:', formData.imagem_url);
        console.log('Imagem 2:', formData.imagem_2);
        console.log('Imagem 3:', formData.imagem_3);
        console.log('Imagem 4:', formData.imagem_4);
        console.log('Imagem 5:', formData.imagem_5);
        console.log('=============================');

        const dataToSend = {
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          imagem_url: formData.imagem_url || null,
          imagem_2: formData.imagem_2 || null,
          imagem_3: formData.imagem_3 || null,
          imagem_4: formData.imagem_4 || null,
          imagem_5: formData.imagem_5 || null
        };

        console.log('Dados enviando para API:', dataToSend);

        const response = await fetch('http://192.168.15.167:3000/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Resposta da API:', result);
          
          setFormData({ nome: '', descricao: '', preco: '', imagem_url: '', imagem_2: '', imagem_3: '', imagem_4: '', imagem_5: '' });
          setShowAddForm(false);
          fetchProducts();
          alert('Produto adicionado com sucesso!');
        } else {
          console.error('Erro HTTP:', response.status);
          alert('Erro ao adicionar produto');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro de conexão: ' + error);
      }
    } else {
      alert('Preencha pelo menos nome e preço!');
    }
  };

  const updateProduct = async () => {
    if (editingProduct && formData.nome && formData.preco) {
      try {
        console.log('=== EDITANDO PRODUTO ===');
        console.log('ID:', editingProduct.id);
        console.log('Dados do formulário:', formData);
        console.log('=======================');

        const dataToSend = {
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          imagem_url: formData.imagem_url || null,
          imagem_2: formData.imagem_2 || null,
          imagem_3: formData.imagem_3 || null,
          imagem_4: formData.imagem_4 || null,
          imagem_5: formData.imagem_5 || null
        };

        console.log('Dados enviando para API (UPDATE):', dataToSend);

        const response = await fetch(`http://192.168.15.167:3000/produtos/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Resposta da API (UPDATE):', result);
          
          setFormData({ nome: '', descricao: '', preco: '', imagem_url: '', imagem_2: '', imagem_3: '', imagem_4: '', imagem_5: '' });
          setEditingProduct(null);
          fetchProducts();
          alert('Produto editado com sucesso!');
        } else {
          console.error('Erro HTTP (UPDATE):', response.status);
          alert('Erro ao editar produto');
        }
      } catch (error) {
        console.error('Erro de conexão (UPDATE):', error);
        alert('Erro de conexão: ' + error);
      }
    } else {
      alert('Preencha pelo menos nome e preço!');
    }
  };


  const deleteProduct = async (id: number, nome: string) => {
    if (confirm(` Tem certeza que deseja excluir "${nome}"?\n\nEsta ação não pode ser desfeita!`)) {
      try {
        const response = await fetch(`http://192.168.15.167:3000/produtos/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchProducts();
          alert(' Produto excluído com sucesso!');
        } else {
          alert(' Erro ao excluir produto');
        }
      } catch (error) {
        alert(' Erro de conexão: ' + error);
      }
    }
  };


  const startEdit = (product: Product) => {
    console.log('=== PREPARANDO EDIÇÃO ===');
    console.log('Produto selecionado:', product);
    console.log('========================');
    
    setEditingProduct(product);
    setFormData({
      nome: product.nome,
      descricao: product.descricao || '',
      preco: product.preco.toString(),
      imagem_url: product.imagem_url || '',
      imagem_2: product.imagem_2 || '',
      imagem_3: product.imagem_3 || '',
      imagem_4: product.imagem_4 || '',
      imagem_5: product.imagem_5 || ''
    });
    setShowAddForm(false);
  };


  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({ nome: '', descricao: '', preco: '', imagem_url: '', imagem_2: '', imagem_3: '', imagem_4: '', imagem_5: '' });
  };


  const formatPrice = (preco: string | number) => {
    const numPrice = typeof preco === 'string' ? parseFloat(preco) : preco;
    return numPrice.toFixed(2);
  };


  const getProductImages = (product: Product) => {
    const images = [
      product.imagem_url,
      product.imagem_2,
      product.imagem_3,
      product.imagem_4,
      product.imagem_5
    ].filter(Boolean); 
    return images;
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1>Carregando produtos...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-red-600">Erro: {error}</h1>
        <p>Verifique se sua API está rodando</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin</h1>

      <div className="mb-6">
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingProduct(null);
            setFormData({ nome: '', descricao: '', preco: '', imagem_url: '', imagem_2: '', imagem_3: '', imagem_4: '', imagem_5: '' });
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? ' Cancelar' : ' Adicionar Produto'}
        </button>
      </div>


      {(showAddForm || editingProduct) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border">
          <h3 className="text-lg font-semibold mb-4">
            {editingProduct ? ` Editando: ${editingProduct.nome}` : '➕ Novo Produto'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nome do produto *"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Preço (R$) *"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Descrição (opcional)"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-3 text-gray-700">📸 Imagens do Produto</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                   Imagem Principal *
                </label>
                <input
                  type="url"
                  placeholder="URL da imagem principal"
                  value={formData.imagem_url}
                  onChange={(e) => setFormData({ ...formData, imagem_url: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                     Imagem 2 (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="URL da segunda imagem"
                    value={formData.imagem_2}
                    onChange={(e) => setFormData({ ...formData, imagem_2: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                     Imagem 3 (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="URL da terceira imagem"
                    value={formData.imagem_3}
                    onChange={(e) => setFormData({ ...formData, imagem_3: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                     Imagem 4 (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="URL da quarta imagem"
                    value={formData.imagem_4}
                    onChange={(e) => setFormData({ ...formData, imagem_4: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                     Imagem 5 (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="URL da quinta imagem"
                    value={formData.imagem_5}
                    onChange={(e) => setFormData({ ...formData, imagem_5: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={editingProduct ? updateProduct : addProduct}
              className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              {editingProduct ? ' Salvar Alterações' : ' Salvar Produto'}
            </button>
            {editingProduct && (
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Produtos ({products.length})</h3>
        
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum produto cadastrado ainda. Adicione o primeiro!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => {
              const allImages = getProductImages(product);
              
              return (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  

                  {allImages.length > 0 && (
                    <div className="mb-3">
                      <div className="relative mb-2">
                        <img 
                          src={product.imagem_url!} 
                          alt={product.nome}
                          className="w-full h-40 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Principal
                        </div>
                      </div>

                      {allImages.length > 1 && (
                        <div className="flex gap-1 overflow-x-auto">
                          {allImages.slice(1).map((img, index) => (
                            <img
                              key={index}
                              src={img!}
                              alt={`${product.nome} - ${index + 2}`}
                              className="w-16 h-16 object-cover rounded flex-shrink-0 border-2 border-gray-200"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 mt-1">
                        {allImages.length} imagem{allImages.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}

                  <h4 className="font-bold text-lg">{product.nome}</h4>
                  {product.descricao && (
                    <p className="text-gray-600 mb-2 text-sm">{product.descricao}</p>
                  )}
                  <p className="text-green-600 font-bold text-xl">
                    R$ {formatPrice(product.preco)}
                  </p>
                  
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={() => startEdit(product)}
                      className="flex-1 text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    >
                       Editar
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id, product.nome)}
                      className="flex-1 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                       Excluir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
