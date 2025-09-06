function authMiddleware(req, res, next) {
  const { tipoUsuario } = req.body;

  if (tipoUsuario === 'ADM') {
    next();
  } else {
    res.status(401).json({ mensagem: 'Funcao nao permitida para esse usuario' });
  }
}

module.exports = authMiddleware;
