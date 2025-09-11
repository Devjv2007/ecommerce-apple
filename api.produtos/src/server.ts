import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import pedidosRoutes from './routes/pedidos'
import dashboardRoutes from './routes/dashboard'


const app = express()
const prisma = new PrismaClient()

interface AuthRequest extends Request {
  usuario?: any
}

app.use(cors())
app.use(express.json())
app.use('/api/pedidos', pedidosRoutes)
app.use('/api/dashboard', dashboardRoutes)

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

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true })
})

app.get('/produtos', async (_req: Request, res: Response) => {
  try {
    const produtos = await prisma.produtos.findMany({
      orderBy: { id: 'desc' }
    })
    res.json(produtos)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})


app.get('/produtos/buscar', async (req: Request, res: Response) => {
  try {
    const { termo } = req.query
    
    if (!termo) {
      return res.status(400).json({ error: 'Termo de busca é obrigatório' })
    }

    console.log('Buscando por:', termo)

    const produtos = await prisma.produtos.findMany({
      where: {
        OR: [
          {
            nome: {
              contains: termo as string,
              mode: 'insensitive'
            }
          },
          {
            descricao: {
              contains: termo as string,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: { id: 'desc' },
      take: 10
    })

    console.log('Produtos encontrados:', produtos.length)
    res.json(produtos)
  } catch (error) {
    console.error('Erro na busca:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})


app.get('/produtos/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    
    console.log('Buscando produto ID:', id)
    
    const produto = await prisma.produtos.findUnique({
      where: { id }
    })
    
    console.log('Produto encontrado:', produto)
    
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }
    
    res.json(produto)
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    res.status(500).json({ error: 'Erro ao buscar produto' })
  }
})


app.post('/produtos', async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, imagem_url, imagem_2, imagem_3, imagem_4, imagem_5 } = req.body
    
    console.log('=== CRIANDO PRODUTO ===')
    console.log('Dados recebidos:', { nome, preco, imagem_url, imagem_2, imagem_3, imagem_4, imagem_5 })
    
    const novoProduto = await prisma.produtos.create({
      data: {
        nome,
        descricao,
        preco,
        imagem_url,
        imagem_2: imagem_2 || null,
        imagem_3: imagem_3 || null,
        imagem_4: imagem_4 || null,
        imagem_5: imagem_5 || null
      }
    })
    
    console.log('Produto criado:', novoProduto)
    res.status(201).json(novoProduto)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    res.status(500).json({ error: 'Erro ao criar produto' })
  }
})


app.put('/produtos/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, descricao, preco, imagem_url, imagem_2, imagem_3, imagem_4, imagem_5 } = req.body
    
    console.log('=== ATUALIZANDO PRODUTO ===')
    console.log('ID:', id)
    console.log('Dados recebidos:', { nome, preco, imagem_url, imagem_2, imagem_3, imagem_4, imagem_5 })
    
    const produtoAtualizado = await prisma.produtos.update({
      where: { id },
      data: { 
        nome, 
        descricao, 
        preco, 
        imagem_url,
        imagem_2: imagem_2 || null,
        imagem_3: imagem_3 || null,
        imagem_4: imagem_4 || null,
        imagem_5: imagem_5 || null
      }
    })
    
    console.log('Produto atualizado:', produtoAtualizado)
    res.status(200).json(produtoAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
})

app.delete('/produtos/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    
    console.log('Excluindo produto ID:', id)
    
    const produtoExcluido = await prisma.produtos.delete({
      where: { id }
    })
    
    res.status(200).json({ message: 'Produto excluído com sucesso', produto: produtoExcluido })
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    res.status(500).json({ error: 'Erro ao excluir produto' })
  }
})


app.get('/usuarios', async (_req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        data_criacao: true
      },
      orderBy: { id: 'desc' }
    })
    res.json(usuarios)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})

app.get('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        data_criacao: true
      }
    })
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    
    res.json(usuario)
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
})


app.post('/usuarios', async (req: Request, res: Response) => {
  try {
    const { nome, email, senha_hash } = req.body
    
    console.log('=== CRIANDO USUÁRIO ===')
    console.log('Dados recebidos:', { nome, email })
    
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha_hash
      },
      select: {
        id: true,
        nome: true,
        email: true,
        data_criacao: true
      }
    })
    
    console.log('Usuário criado:', novoUsuario)
    res.status(201).json(novoUsuario)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
      res.status(400).json({ error: 'Email já cadastrado' })
    } else {
      res.status(500).json({ error: 'Erro ao criar usuário' })
    }
  }
})

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body
    
    const usuario = await prisma.usuarios.findUnique({
      where: { email }
    })
    
    if (!usuario) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }
    
    if (usuario.senha_hash !== senha) {
      return res.status(400).json({ error: 'Senha incorreta' })
    }
    
    const token = jwt.sign(
      { 
        id: usuario.id, 
        nome: usuario.nome, 
        email: usuario.email 
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    )
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    })
    
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ error: 'Erro no servidor' })
  }
})


app.get('/me', verificarToken, (req: AuthRequest, res: Response) => {
  res.json({ usuario: req.usuario })
})


app.get('/carrinho', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuario_id = req.usuario.id
    
    const itensCarrinho = await prisma.carrinho.findMany({
      where: { usuario_id },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
            preco: true,
            imagem_url: true
          }
        }
      }
    })
    
    res.json(itensCarrinho)
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error)
    res.status(500).json({ error: 'Erro ao buscar carrinho' })
  }
})


app.post('/carrinho', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuario_id = req.usuario.id
    const { produto_id, quantidade = 1 } = req.body
    
    const itemExistente = await prisma.carrinho.findUnique({
      where: {
        usuario_id_produto_id: {
          usuario_id,
          produto_id
        }
      }
    })
    
    if (itemExistente) {
      const itemAtualizado = await prisma.carrinho.update({
        where: { id: itemExistente.id },
        data: { quantidade: itemExistente.quantidade + quantidade }
      })
      res.json(itemAtualizado)
    } else {
      const novoItem = await prisma.carrinho.create({
        data: {
          usuario_id,
          produto_id,
          quantidade
        }
      })
      res.status(201).json(novoItem)
    }
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error)
    res.status(500).json({ error: 'Erro ao adicionar ao carrinho' })
  }
})

app.put('/carrinho/:id', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuario_id = req.usuario.id
    const { id } = req.params
    const { quantidade } = req.body
    
    if (quantidade <= 0) {
      await prisma.carrinho.delete({
        where: { 
          id: parseInt(id),
          usuario_id
        }
      })
      res.json({ message: 'Item removido' })
    } else {
      const itemAtualizado = await prisma.carrinho.update({
        where: { 
          id: parseInt(id),
          usuario_id 
        },
        data: { quantidade }
      })
      res.json(itemAtualizado)
    }
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error)
    res.status(500).json({ error: 'Erro ao atualizar carrinho' })
  }
})


app.delete('/carrinho/:id', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuario_id = req.usuario.id
    const { id } = req.params
    
    await prisma.carrinho.delete({
      where: { 
        id: parseInt(id),
        usuario_id 
      }
    })
    
    res.json({ message: 'Item removido do carrinho' })
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error)
    res.status(500).json({ error: 'Erro ao remover do carrinho' })
  }
})


app.delete('/carrinho', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuario_id = req.usuario.id
    
    await prisma.carrinho.deleteMany({
      where: { usuario_id }
    })
    
    res.json({ message: 'Carrinho limpo' })
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error)
    res.status(500).json({ error: 'Erro ao limpar carrinho' })
  }
})

const port = Number(process.env.PORT) || 3000

app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'API eCommerce Apple Online',
    endpoints: {
      produtos: '/produtos',
      health: '/health',
      usuarios: '/usuarios',
      carrinho: '/carrinho'
    }
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando em: http://ecommerce-apple.onrender.com/:${port}`)
})
