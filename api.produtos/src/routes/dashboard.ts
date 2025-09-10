import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()


router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalPedidos = await prisma.pedido.count()
    
    const receitaTotal = await prisma.pedido.aggregate({
      _sum: {
        total: true
      }
    })
    
    const totalUsuarios = await prisma.usuarios.count()
    
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    
    const pedidosHoje = await prisma.pedido.count({
      where: {
        data_pedido: {
          gte: hoje
        }
      }
    })
    
    const receitaHoje = await prisma.pedido.aggregate({
      _sum: {
        total: true
      },
      where: {
        data_pedido: {
          gte: hoje
        }
      }
    })
    
    const pedidosRecentes = await prisma.pedido.findMany({
      take: 5,
      orderBy: {
        data_pedido: 'desc'
      },
      include: {
        usuario: {
          select: {
            nome: true
          }
        }
      }
    })
    
    res.json({
      totalPedidos,
      receitaTotal: receitaTotal._sum.total || 0,
      totalUsuarios,
      pedidosHoje,
      receitaHoje: receitaHoje._sum.total || 0,
      pedidosRecentes: pedidosRecentes.map(pedido => ({
        id: pedido.id,
        usuario_nome: pedido.usuario.nome,
        total: pedido.total,
        data_pedido: pedido.data_pedido,
        status: pedido.status
      }))
    })
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas do dashboard' })
  }
})

export default router
