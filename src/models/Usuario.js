const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  static async findByUsername(username) {
    const [users] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    return users[0];
  }

  static async create(userData) {
    const { username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO usuarios (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId;
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.query(
      'UPDATE usuarios SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Usuario;