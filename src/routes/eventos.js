const express = require("express");
const router = express.Router();
const Evento = require("../models/Evento");
const auth = require("../middleware/auth");
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
    const eventos = await Evento.getAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener eventos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const evento = await Evento.getById(req.params.id);
    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el evento" });
  }
});

// Rutas privadas
router.post("/", auth, validateEvento, async (req, res) => {
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

router.put("/:id", auth, validateEvento, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
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
