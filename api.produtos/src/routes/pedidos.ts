import { Router, Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const router = Router()
const prisma = new PrismaClient()

interface AuthRequest extends Request {
  usuario?: any
}

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui'


const verificarToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    req.usuario = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' })
  }
}


router.get('/usuario/:id', async (req: Request, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuario_id: parseInt(req.params.id) },
      orderBy: { id: 'desc' }
    })
    
    res.json({ pedidos })
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    res.status(500).json({ erro: 'Erro ao buscar pedidos' })
  }
})


router.post('/', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    console.log(' Usuário autenticado:', req.usuario)
    console.log(' Dados recebidos do frontend:', req.body)

    const {
      subtotal,
      valor_frete,
      total,
      endereco_cep,
      endereco_logradouro,
      endereco_bairro,
      endereco_cidade,
      endereco_uf,
      frete_transportadora,
      frete_prazo,
      status
    } = req.body

   
    const dadosPedido = {
      usuario_id: req.usuario.id,
      subtotal: parseFloat(subtotal),
      valor_frete: parseFloat(valor_frete),
      total: parseFloat(total),
      endereco_cep,
      endereco_logradouro,
      endereco_bairro,
      endereco_cidade,
      endereco_uf,
      frete_transportadora,
      frete_prazo,
      status: status || 'processando'
    }

    console.log(' Salvando no banco:', dadosPedido)

    const pedido = await prisma.pedido.create({
      data: dadosPedido
    })
    
    console.log(' Pedido criado com ID:', pedido.id)
    res.status(201).json({ pedido })
  } catch (error) {
    console.error(' Erro ao criar pedido:', error)
    res.status(500).json({ erro: 'Erro ao criar pedido', details: error })
  }
})


router.put('/:id/pagamento', async (req: Request, res: Response) => {
  try {
    const { status, metodoPagamento } = req.body

    const pedido = await prisma.pedido.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status,
        metodo_pagamento: metodoPagamento
      }
    })

    res.json({ pedido })
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error)
    res.status(500).json({ erro: 'Erro ao atualizar pedido' })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { status, metodo_pagamento } = req.body
    
    const pedido = await prisma.pedido.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(status && { status }),
        ...(metodo_pagamento && { metodo_pagamento })
      }
    })

    res.json({ pedido })
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error)
    res.status(500).json({ erro: 'Erro ao atualizar pedido' })
  }
})

export default router
