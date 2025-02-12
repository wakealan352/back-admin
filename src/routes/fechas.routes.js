const express = require('express');
const router = express.Router();
const Fecha = require('../models/Fecha');
const auth = require('../middleware/auth');
const cache = require('../config/cache');

// Middleware para limpiar caché cuando se modifica una fecha
const clearFechasCache = (req, res, next) => {
    cache.del('todas_fechas');
    if (req.params.id) {
        cache.del(`fecha_${req.params.id}`);
    }
    next();
};

// Obtener todas las fechas
router.get('/', async (req, res) => {
    try {
        // Intentar obtener del caché
        const cachedFechas = cache.get('todas_fechas');
        if (cachedFechas) {
            return res.json(cachedFechas);
        }

        const fechas = await Fecha.getAll();
        
        // Guardar en caché
        cache.set('todas_fechas', fechas);
        
        res.json(fechas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener fechas' });
    }
});

// Obtener una fecha específica
router.get('/:id', async (req, res) => {
    try {
        const fechaId = req.params.id;
        // Intentar obtener del caché
        const cachedFecha = cache.get(`fecha_${fechaId}`);
        if (cachedFecha) {
            return res.json(cachedFecha);
        }

        const fecha = await Fecha.getById(fechaId);
        if (fecha) {
            // Guardar en caché
            cache.set(`fecha_${fechaId}`, fecha);
            res.json(fecha);
        } else {
            res.status(404).json({ mensaje: 'Fecha no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la fecha' });
    }
});

// Crear una nueva fecha
router.post('/', auth, clearFechasCache, async (req, res) => {
    try {
        const id = await Fecha.create(req.body);
        res.status(201).json({ mensaje: 'Fecha creada', id });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la fecha' });
    }
});

// Actualizar una fecha
router.put('/:id', auth, clearFechasCache, async (req, res) => {
    try {
        const updated = await Fecha.update(req.params.id, req.body);
        if (updated) {
            res.json({ mensaje: 'Fecha actualizada' });
        } else {
            res.status(404).json({ mensaje: 'Fecha no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la fecha' });
    }
});

// Eliminar una fecha
router.delete('/:id', auth, clearFechasCache, async (req, res) => {
    try {
        const deleted = await Fecha.delete(req.params.id);
        if (deleted) {
            res.json({ mensaje: 'Fecha eliminada correctamente' });
        } else {
            res.status(404).json({ mensaje: 'Fecha no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la fecha' });
    }
});

module.exports = router; 