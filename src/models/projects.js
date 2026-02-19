//Abir conexion a archivo SqLite
const db = require('../../database/db');

function getProjects() {
    const stmt = db.prepare('SELECT * FROM projects');
    
    const projects = stmt.all(); 
    
    return projects;
}

function getProjectById(id) {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    return stmt.get(id); // .get() devuelve el objeto si existe, o undefined si no
}

function createProject(title, description, repo_url) {
    const stmt = db.prepare(`
        INSERT INTO projects (title, description, repo_url)
        VALUES (?, ?, ?)
    `);
    
    // .run() se usa para INSERT, UPDATE, DELETE
    const info = stmt.run(title, description, repo_url);
    
    return {
        id: info.lastInsertRowid,
        title,
        description,
        repo_url
    };
}

function deleteProject(id) {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
}
//Ejecutar Query

module.exports = { getProjects, createProject, getProjectById, deleteProject }
//Devovlerresultado