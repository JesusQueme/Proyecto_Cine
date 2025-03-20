const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db'); // Importa tu conexión a la base de datos

const app = express();
app.use(express.json());

// Endpoint para crear un usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { usuario, password, rol } = req.body;

    // Verifica si el usuario ya existe
    const usuarioExistente = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (usuarioExistente.length > 0) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Cifra la contraseña
    const passwordCifrado = await bcrypt.hash(password, 10);

    // Crea el usuario en la base de datos
    await db.query('INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)', [usuario, passwordCifrado, rol]);

    // Genera un token JWT
    const token = jwt.sign({ usuario, rol }, 'tokensecreto', { expiresIn: '1h' });

    res.status(201).json({ mensaje: 'Usuario creado correctamente', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
});

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, 'tu_secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    req.usuario = decoded;
    next();
  });
}

// Ejemplo de ruta protegida
app.get('/perfil', verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

app.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001');
});