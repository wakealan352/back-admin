const db = require('../config/database');

class Evento {
  static async getAll() {
    const [eventos] = await db.query('SELECT * FROM eventos');
    return eventos;
  }

  static async getById(id) {
    const [evento] = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
    return evento[0];
  }

  static async create(eventoData) {
    const { image, titulo, descripcion, textoBoton, linkBoton } = eventoData;
    const [result] = await db.query(
      'INSERT INTO eventos (image, titulo, descripcion, textoBoton, linkBoton) VALUES (?, ?, ?, ?, ?)',
      [image, titulo, descripcion, textoBoton, linkBoton]
    );
    return result.insertId;
  }

  static async update(id, eventoData) {
    const { image, titulo, descripcion, textoBoton, linkBoton } = eventoData;
    const [result] = await db.query(
      'UPDATE eventos SET image = ?, titulo = ?, descripcion = ?, textoBoton = ?, linkBoton = ? WHERE id = ?',
      [image, titulo, descripcion, textoBoton, linkBoton, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM eventos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Evento;