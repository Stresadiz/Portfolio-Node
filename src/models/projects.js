//Abir conexion a archivo SqLite
const db = require('../../database/db');

function getProjects() {
    const stmt = db.prepare('SELECT * FROM projects');
    
    const projects = stmt.all(); 
    
    return projects;
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
//Ejecutar Query

module.exports = { getProjects, createProject }
//Devovlerresultado