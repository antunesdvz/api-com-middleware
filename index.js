const express = require('express');
const authMiddleware = require('./auth');

const app = express();
const PORT = 3000;

// Lista simulada de usuários
const usuarios = [
  { id: 1, nome: 'Alice' },
  { id: 2, nome: 'Bob' }
];

let proximoId = 3;

// Middleware global
app.use((req, res, next) => {
  console.log('Chamando API');
  next();
});

// Parsing de JSON
app.use(express.json());

// Rota pública
app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

// Rota privada com autenticação
app.post('/usuarios', authMiddleware, (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: 'Nome é obrigatório para criar usuário' });
  }

  const novoUsuario = { id: proximoId++, nome };
  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: 'Usuário criado com sucesso',
    usuario: novoUsuario
  });
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
