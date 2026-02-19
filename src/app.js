require('dotenv').config();
const express = require('express');
const path = require('path');

const viewRoutes = require('./routes/viewRoutes');
const projectApiRoutes = require('./routes/projectRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middlewares ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// --- Conexión de Rutas ---
app.use('/', viewRoutes);
app.use('/api/projects', projectApiRoutes);

module.exports = app;