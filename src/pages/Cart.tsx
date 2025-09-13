import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import PaymentModal from '../components/PaymentModal'
import { toast } from 'react-toastify'

type FreteOpcao = {
  transportadora: string
  valor: number
  prazo: string
}

const Cart: React.FC = () => {
  const { itens, removerDoCarrinho, limparCarrinho } = useCart()
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState<any>(null)
  const [frete, setFrete] = useState<FreteOpcao[] | null>(null)
  const [freteSelecionado, setFreteSelecionado] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const subtotal = itens.reduce((acc, item) => {
    return acc + item.produto.preco * item.quantidade
  }, 0)

  const total = subtotal + (freteSelecionado ? freteSelecionado.valor : 0)

  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      toast.error("Digite um CEP válido com 8 dígitos.", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) {
        toast.error("CEP inválido!", {
          position: "top-right",
          autoClose: 3000,
        })
        return
      }
      setEndereco(data)

      const freteSimulado: FreteOpcao[] = [
        { transportadora: "Correios PAC", valor: 25.90, prazo: "2 dias úteis" },
        { transportadora: "Correios Sedex", valor: 15.50, prazo: "6 dias úteis" }
      ]
      setFrete(freteSimulado)
      setFreteSelecionado(null) 

    } catch (err) {
      console.error(err)
      toast.error("Erro ao buscar CEP.", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const handlePaymentSuccess = async () => {
    try {
      console.log('Pagamento aprovado! Criando pedido...')

      const dadosPedido = {
        usuario_id: usuario?.id,
        subtotal: subtotal,
        valor_frete: freteSelecionado.valor,
        total: total,
        endereco_cep: endereco.cep,
        endereco_logradouro: endereco.logradouro,
        endereco_bairro: endereco.bairro,
        endereco_cidade: endereco.localidade,
        endereco_uf: endereco.uf,
        frete_transportadora: freteSelecionado.transportadora,
        frete_prazo: freteSelecionado.prazo,
        status: 'processando'
      }

      const response = await fetch('https://ecommerce-apple.onrender.com/api/pedidos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPedido)
      })

      if (response.ok) {
        const { pedido } = await response.json()
        console.log('Pedido criado com sucesso:', pedido)
        
        if (limparCarrinho) {
          limparCarrinho()
        }
        
        setIsPaymentModalOpen(false)
        
        toast.success("Compra realizada com sucesso! Pedido criado e em processamento.", {
          position: "top-right",
          autoClose: 5000,
        })
        
        setTimeout(() => {
          navigate('/conta')
        }, 2000)
      } else {
        throw new Error('Erro ao criar pedido')
      }
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      toast.error("Erro ao processar pedido. Tente novamente.", {
        position: "top-right",
        autoClose: 4000,
      })
    }
  }

  const handleFinalizarCompra = () => {
    if (!freteSelecionado) {
      toast.warning("Selecione uma opção de frete antes de finalizar a compra.", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    if (!usuario) {
      toast.error("Você precisa estar logado para finalizar a compra.", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          navigate('/login')
        }
      })
      return
    }

    if (!endereco) {
      toast.warning("Digite seu CEP para calcular o frete.", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    setIsPaymentModalOpen(true)
  }

  if (itens.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
        <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
        <Link 
          to="/home" 
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Continuar Comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      
      {itens.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 mb-4">
          <div className="flex gap-4 items-center">
            {item.produto.imagem_url ? (
              <img 
                src={item.produto.imagem_url} 
                alt={item.produto.nome}
                className="w-28 object-cover rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold">{item.produto.nome}</h3>
              <p className="text-gray-600">R$ {item.produto.preco.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                R$ {(item.produto.preco * item.quantidade).toFixed(2)}
              </p>
              <button
                onClick={() => removerDoCarrinho(item.id)}
                className="text-red-600 hover:text-red-800 text-sm mt-2"
              >
                Remover
              </button>
            </div>
          </div>
        </div> 
      ))}

      <div className="bg-gray-100 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Calcular Frete</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
            className="border p-2 rounded w-1/3"
            maxLength={8}
          />
          <button 
            onClick={calcularFrete}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Calcular
          </button>
        </div>

        {endereco && (
          <p className="mt-4 text-gray-700">
            Destino: {endereco.logradouro}, {endereco.bairro}, {endereco.localidade}-{endereco.uf}
          </p>
        )}

        {frete && (
          <div className="mt-4 space-y-3">
            <h3 className="font-semibold mb-2">Escolha o frete:</h3>
            {frete.map((opcao, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-3 rounded shadow">
                <div>
                  <p>{opcao.transportadora} ({opcao.prazo})</p>
                  <p className="font-semibold">R$ {opcao.valor.toFixed(2)}</p>
                </div>
                <input
                  type="radio"
                  name="frete"
                  checked={freteSelecionado?.transportadora === opcao.transportadora}
                  onChange={() => setFreteSelecionado(opcao)}
                  className="w-5 h-5 accent-green-600"
                />
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
          
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Frete</span>
            <span>
              {freteSelecionado ? `R$ ${freteSelecionado.valor.toFixed(2)}` : "Selecione o frete"}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="bg-green-600 text-white px-40 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-200"
            disabled={!freteSelecionado}
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        total={total}
        subtotal={subtotal}
        freteSelecionado={freteSelecionado}
      />
    </div>  
  )
}

export default Cart
