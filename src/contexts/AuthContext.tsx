import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface Usuario {
  id: number
  nome: string
  email: string
}

interface AuthContextType {
  usuario: Usuario | null
  token: string | null
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void
  carregando: boolean
  loginRecente: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [loginRecente, setLoginRecente] = useState(false)

  useEffect(() => {
    const tokenSalvo = localStorage.getItem('token')
    const usuarioSalvo = localStorage.getItem('usuario')
    
    if (tokenSalvo && usuarioSalvo) {
      try {
        setToken(tokenSalvo)
        setUsuario(JSON.parse(usuarioSalvo))
        setLoginRecente(false) 
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
  }, [])

  const login = async (email: string, senha: string): Promise<boolean> => {
    setCarregando(true)
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })

      if (response.ok) {
        const data = await response.json()
        
        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        
        setUsuario(data.usuario)
        setToken(data.token)
        setLoginRecente(true)
        
        setTimeout(() => setLoginRecente(false), 1000)
        
        return true
      } else {
        const error = await response.json()
        alert(`Erro no login: ${error.error}`)
        return false
      }
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro de conexão. Tente novamente.')
      return false
    } finally {
      setCarregando(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    
    setUsuario(null)
    setToken(null)
    setLoginRecente(false)
  }

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      token, 
      login, 
      logout, 
      carregando,
      loginRecente
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
