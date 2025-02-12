const NodeCache = require('node-cache');

// Configuración del caché con un tiempo de vida estándar de 5 minutos
const cache = new NodeCache({
  stdTTL: 300, // 5 minutos en segundos
  checkperiod: 320, // Período de limpieza automática
});

module.exports = cache; 