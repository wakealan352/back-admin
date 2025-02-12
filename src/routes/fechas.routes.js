const express = require('express');
const router = express.Router();
const Fecha = require('../models/Fecha');
const auth = require('../middleware/auth');

// Obtener todas las fechas
router.get('/', async (req, res) => {
    try {
        const fechas = await Fecha.getAll();
        res.json(fechas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener fechas' });
    }
});

// Obtener una fecha específica
router.get('/:id', async (req, res) => {
    try {
        const fecha = await Fecha.getById(req.params.id);
        if (fecha) {
            res.json(fecha);
        } else {
            res.status(404).json({ mensaje: 'Fecha no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la fecha' });
    }
});

// Crear una nueva fecha
router.post('/', auth, async (req, res) => {
    try {
        const id = await Fecha.create(req.body);
        res.status(201).json({ mensaje: 'Fecha creada', id });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la fecha' });
    }
});

// Actualizar una fecha
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
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