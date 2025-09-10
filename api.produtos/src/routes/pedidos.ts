import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

interface AuthRequest extends Request {
  usuario?: any
}
router.get('/usuario/:id', async (req: Request, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuario_id: parseInt(req.params.id) },
      orderBy: { data_pedido: 'desc' }
    })
    
    res.json({ pedidos })
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    res.status(500).json({ erro: 'Erro ao buscar pedidos' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const pedido = await prisma.pedido.create({
      data: req.body
    })
    
    res.status(201).json({ pedido })
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    res.status(500).json({ erro: 'Erro ao criar pedido' })
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
