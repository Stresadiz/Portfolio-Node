//Configuracion y conexion a base de datos}
const DataBase = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

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
    technologies TEXT,
    image_url TEXT,
    repo_url TEXT,
    live_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  --Tabla de Usuarios
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );

  -- Tabla de Mensajes (para el formulario de contacto)
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    content TEXT NOT NULL,
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const adminUser = db.prepare("SELECT * FROM users WHERE username = ?").get(process.env.ADMIN_USER);

if (!adminUser) {
    console.log("No se encontró usuario admin. Creando uno por defecto...");
    
    const saltRounds = 10;
    const defaultPass = process.env.ADMIN_PASS; 
    const hash = bcrypt.hashSync(defaultPass, saltRounds);

    const insert = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    insert.run(process.env.ADMIN_USER, hash);
    
    console.log(`DB: El usuario ${process.env.ADMIN_USER} fue creado exitosamente`);
} else {
    console.log(`DB: El usuario ${process.env.ADMIN_USER} ya existe. Omitiendo seed`);
}

console.log(`Base de datos conectada en: ${isTest ? 'MEMORIA (Test)' : dbPath}`);

module.exports = db;