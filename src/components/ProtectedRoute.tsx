import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { usuario } = useAuth()
  
  const [carregando, setCarregando] = React.useState(true)
  
  React.useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 100)
    return () => clearTimeout(timer)
  }, [])

  if (carregando) {
    return <div>Carregando...</div>
  }

  if (!usuario) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute
