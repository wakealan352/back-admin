const bcrypt = require('bcryptjs');
const db = require('../config/database');

async function createAdminUser() {
  try {
    // Generar hash de la contraseña
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Eliminar usuario admin si existe
    await db.query('DELETE FROM usuarios WHERE username = ?', ['admin']);

    // Crear nuevo usuario admin
    await db.query(
      'INSERT INTO usuarios (username, password) VALUES (?, ?)',
      ['admin', hashedPassword]
    );

    console.log('Usuario admin creado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al crear usuario admin:', error);
    process.exit(1);
  }
}

createAdminUser();