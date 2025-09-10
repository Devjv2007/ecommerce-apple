import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface Produto {
  id: number
  nome: string
  preco: number
  imagem_url?: string
}

interface ItemCarrinho {
  id: number
  produto: Produto
  quantidade: number
}

interface CartContextType {
  itens: ItemCarrinho[]
  adicionarAoCarrinho: (produto: Produto) => void
  removerDoCarrinho: (itemId: number) => void
  limparCarrinho: () => void
  obterTotalItens: () => number
  obterTotalPreco: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([])
  const { usuario } = useAuth()

  useEffect(() => {
    if (usuario) {
      const chaveCarrinho = `cartItems_${usuario.id}`
      const savedItems = localStorage.getItem(chaveCarrinho)
      if (savedItems) {
        setItens(JSON.parse(savedItems))
      } else {
        setItens([])
      }
    } else {
      setItens([])
    }
  }, [usuario])

  const salvarCarrinho = (novosItens: ItemCarrinho[]) => {
    if (usuario) {
      const chaveCarrinho = `cartItems_${usuario.id}` 
      localStorage.setItem(chaveCarrinho, JSON.stringify(novosItens))
    }
  }

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemExistente = itens.find(item => item.produto.id === produto.id)
    
    if (itemExistente) {
      const novosItens = itens.map(item =>
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
      setItens(novosItens)
      salvarCarrinho(novosItens) 
    } else {
      const novoItem: ItemCarrinho = {
        id: Date.now(),
        produto,
        quantidade: 1
      }
      const novosItens = [...itens, novoItem]
      setItens(novosItens)
      salvarCarrinho(novosItens) 
    }
  }

    const removerDoCarrinho = (itemId: number) => {
      const novosItens = itens.filter(item => item.id !== itemId)
      setItens(novosItens)
      salvarCarrinho(novosItens)
    }


  const limparCarrinho = () => {
    setItens([])
    if (usuario) {
      const chaveCarrinho = `cartItems_${usuario.id}`
      localStorage.removeItem(chaveCarrinho)
    }
  }

  const obterTotalItens = () => {
    return itens.reduce((total, item) => total + item.quantidade, 0)
  }

  const obterTotalPreco = () => {
    return itens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0)
  }

  return (
    <CartContext.Provider value={{
      itens,
      adicionarAoCarrinho,
      removerDoCarrinho,
      limparCarrinho,
      obterTotalItens,
      obterTotalPreco
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
