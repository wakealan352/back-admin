const express = require("express");
const router = express.Router();
const Evento = require("../models/Evento");
const auth = require("../middleware/auth");
const cache = require("../config/cache");
const { body, validationResult } = require("express-validator");

// Validaciones
const validateEvento = [
  body("titulo").optional().trim().isLength({ min: 1 }),
  body("descripcion").optional().trim(),
  body("textoBoton").optional().trim(),
  body("linkBoton").optional().trim(),
  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("La imagen debe ser una URL válida"),
];

// Rutas públicas
router.get("/", async (req, res) => {
  try {
    // Intentar obtener datos del caché
    const cachedEventos = cache.get("todos_eventos");
    if (cachedEventos) {
      return res.json(cachedEventos);
    }

    // Si no está en caché, obtener de la base de datos
    const eventos = await Evento.getAll();
    
    // Guardar en caché por 5 minutos
    cache.set("todos_eventos", eventos);
    
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener eventos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const eventoId = req.params.id;
    // Intentar obtener del caché
    const cachedEvento = cache.get(`evento_${eventoId}`);
    if (cachedEvento) {
      return res.json(cachedEvento);
    }

    const evento = await Evento.getById(eventoId);
    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }

    // Guardar en caché
    cache.set(`evento_${eventoId}`, evento);

    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el evento" });
  }
});

// Middleware para limpiar caché cuando se modifica un evento
const clearEventosCache = (req, res, next) => {
  cache.del("todos_eventos");
  if (req.params.id) {
    cache.del(`evento_${req.params.id}`);
  }
  next();
};

// Rutas privadas
router.post("/", auth, validateEvento, clearEventosCache, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = await Evento.create(req.body);
    res.status(201).json({ mensaje: "Evento creado", id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el evento" });
  }
});

router.put("/:id", auth, validateEvento, clearEventosCache, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updated = await Evento.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.json({ mensaje: "Evento actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el evento" });
  }
});

router.delete("/:id", auth, clearEventosCache, async (req, res) => {
  try {
    const deleted = await Evento.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.json({ mensaje: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el evento" });
  }
});

module.exports = router;
