const db = require('../config/database');

class Fecha {
  static async getAll() {
    const [fechas] = await db.query('SELECT * FROM fechas');
    return fechas;
  }

  static async getById(id) {
    const [fecha] = await db.query('SELECT * FROM fechas WHERE id = ?', [id]);
    return fecha[0];
  }

  static async create(fechaData) {
    const { fecha, titulo, hora, lugar, descripcion, infoAdiccional, infoIconoTexto, banner } = fechaData;
    const [result] = await db.query(
      'INSERT INTO fechas (fecha, titulo, hora, lugar, descripcion, infoAdiccional, infoIconoTexto, banner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [fecha, titulo, hora, lugar, descripcion, infoAdiccional, infoIconoTexto, banner]
    );
    return result.insertId;
  }

  static async update(id, fechaData) {
    const { fecha, titulo, hora, lugar, descripcion, infoAdiccional, infoIconoTexto, banner } = fechaData;
    const [result] = await db.query(
      'UPDATE fechas SET fecha = ?, titulo = ?, hora = ?, lugar = ?, descripcion = ?, infoAdiccional = ?, infoIconoTexto = ?, banner = ? WHERE id = ?',
      [fecha, titulo, hora, lugar, descripcion, infoAdiccional, infoIconoTexto, banner, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM fechas WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Fecha; 