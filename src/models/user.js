const db = require('../../database/db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function getUsers() {

    const stmt = db.prepare('SELECT * FROM users');
    
    return stmt.all();
}

function getUserById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');

    return stmt.get(id);
}

function getUserByUsername(username) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');

    return stmt.get(username);
}

function createNewUser(data) {
    
    const userData = { ...data };

    if (userData.password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        userData.password = bcrypt.hashSync(userData.password, salt);
    }

    const keys = Object.keys(userData);
    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(userData);

    const sql = `
        INSERT INTO users (${columns})
        VALUES (${placeholders})
    `;

    const stmt = db.prepare(sql);
    const info = stmt.run(...values); 

    return {
        id: info.lastInsertRowid, 
        username : userData.username
    };
}

function editUserById(id, data) {

    if (Object.keys(data).length === 0) return;

    const userData = { ...data };

    if (userData.password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        userData.password = bcrypt.hashSync(userData.password, salt);
    }

    const keys = Object.keys(userData);
    const values = Object.values(userData);

    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const sql = `
        UPDATE users 
        SET ${setClause}
        WHERE id = ?
    `;

    const stmt = db.prepare(sql);
    const info = stmt.run(...values, id); 

    if (info.changes === 0) {
        return null;
    }

    return {
        id,
        ...userData
    };
}

function deleteUser(id) {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const info = stmt.run(id);

    return info.changes > 0;
}

module.exports = { getUsers, getUserById, getUserByUsername, createNewUser, editUserById, deleteUser }
