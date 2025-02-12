CREATE DATABASE IF NOT EXISTS eventos_db;
USE eventos_db;

-- Insertar tabla eventos
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  titulo VARCHAR(255),
  descripcion TEXT,
  textoBoton VARCHAR(100),
  linkBoton VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar tabla fechas
CREATE TABLE IF NOT EXISTS fechas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,

  titulo VARCHAR(255) NOT NULL,
  hora VARCHAR(50) NOT NULL,
  lugar VARCHAR(255) NOT NULL,
  descripcion TEXT,
  infoAdiccional BOOLEAN DEFAULT FALSE,
  infoIconoTexto VARCHAR(255),
  banner VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear usuario admin por defecto (password: admin)
INSERT INTO usuarios (username, password) 
VALUES ('admin', '$2a$10$XgNzZ0OzV6RZ5K5Q5K5Q5OvB5K5Q5K5Q5K5Q5K5Q5K5Q5K5Q5K');

-- Insertar datos de ejemplo en la tabla eventos
INSERT INTO eventos (image, titulo, descripcion, textoBoton, linkBoton) VALUES
(
  'https://i.ibb.co/9Td3wVk/ben-white-W8-Qqn1-Pm-QH0-unsplash.jpg',
  'Culto de oración',
  'Únete a nosotros cada miércoles a las 7 PM para un tiempo de oración comunitaria y fortalecimiento espiritual. Juntos, elevaremos nuestras voces al cielo.',
  'Leer más',
  '/pagina1'
),
(
  'https://i.ibb.co/KW60XdT/aaron-burden-9zs-HNt5-Opq-E-unsplash.jpg',
  'Reunión de varones',
  'Caballeros, los invitamos a nuestra reunión mensual este sábado. Compartiremos testimonios, estudiaremos la Palabra y nos apoyaremos mutuamente en nuestro caminar cristiano.',
  'Ver detalles',
  '/pagina2'
),
(
  'https://i.ibb.co/b786r8G/biblia.jpg',
  'Reunión de damas',
  'Queridas hermanas, las esperamos en nuestra reunión especial este viernes. Tendremos un tiempo de alabanza, estudio bíblico y compañerismo diseñado específicamente para mujeres de fe.',
  'Ver detalles',
  '/pagina2'
);

-- Insertar datos de ejemplo en la tabla fechas
INSERT INTO fechas (fecha, titulo, hora, lugar, descripcion, infoAdiccional, infoIconoTexto, banner) VALUES
(
  '2025-03-08',
  'Reunión casera',
  '10:00 am — 12:30 pm',
  'Salón Prueba',
  'Servicio dominical semanal.',
  true,
  'Reunión de damas',
  'https://ejemplo.com/banner1.jpg'
),
(
  '2025-03-15',
  'Culto de Jóvenes',
  '7:00 pm — 9:00 pm',
  'Auditorio Principal',
  'Noche especial para jóvenes con música, predicación y compañerismo.',
  true,
  'Evento Juvenil',
  'https://ejemplo.com/banner2.jpg'
),
(
  '2025-03-22',
  'Escuela Dominical',
  '9:00 am — 10:30 am',
  'Salón de Clases',
  'Clases bíblicas para todas las edades.',
  false,
  NULL,
  'https://ejemplo.com/banner3.jpg'
);

select * from eventos;
select * from usuarios;
select * from fechas;