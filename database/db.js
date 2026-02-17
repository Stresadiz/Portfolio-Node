//Configuracion y conexion a base de datos}
const DataBase = require('better-sqlite3');
const path = require('path');

// Prioridad: 
// 1. Si es test, usamos memoria.
// 2. Si hay una ruta en .env, usamos esa.
// 3. Si no, usamos una ruta por defecto.
const isTest = process.env.NODE_ENV === "test"
const dbPath = isTest ?
                ':memory:' :
                (process.env.DB_PATH || path.join(__dirname, 'portfolio.sqlite'))
const db = new DataBase(dbPath);

db.exec(`
    -- Tabla de Proyectos
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT, -- Aquí puedes guardar "Node, React, SQLite" como string
    image_url TEXT,
    repo_url TEXT,
    live_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabla de Mensajes (para el formulario de contacto de tu portafolio)
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    content TEXT NOT NULL,
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log(`Base de datos conectada en: ${isTest ? 'MEMORIA (Test)' : dbPath}`);

module.exports = db;