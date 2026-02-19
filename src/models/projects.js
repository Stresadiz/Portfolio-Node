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

function createProject(data) {
    const keys = Object.keys(data);
    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);

    const sql = `
        INSERT INTO projects (${columns})
        VALUES (${placeholders})
    `;

    const stmt = db.prepare(sql);
    const info = stmt.run(...values); // Usamos el spread operator para pasar el array de valores

    return {
        id: info.lastInsertRowid,
        ...data
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