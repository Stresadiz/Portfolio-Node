require('dotenv').config();
const express = require('express')
const projectController = require('./controllers/projectController');

const app = express();

app.use(express.json());

app.get('/projects', projectController.getAll)
app.post('/projects', projectController.create)
app.delete('/projects/:id', projectController.delete);
module.exports = app