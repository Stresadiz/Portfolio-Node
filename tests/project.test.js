const request = require('supertest');
const app = require('../src/app');

describe('API de Proyectos (Flujo Dinámico)', () => {
    let createdProjectId; // Variable para guardar el ID que nos devuelva la DB

    // 1. TEST DE CREACIÓN (POST)
    it('debería crear un nuevo proyecto y retornar su ID', async () => {
        const newProject = {
            title: "Proyecto de Test",
            description: "Creado desde Jest",
            repo_url: "https://github.com/test/repo"
        };

        const res = await request(app)
            .post('/projects')
            .send(newProject);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        
        // GUARDAMOS EL ID DINÁMICO
        createdProjectId = res.body.id; 
    });

    // 2. TEST DE LECTURA (GET)
    it('debería retornar una lista que contenga el proyecto creado', async () => {
        const res = await request(app).get('/projects');
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        
        const projectExists = res.body.some(p => p.id === createdProjectId);
        expect(projectExists).toBe(true);
    });

    // 3. TEST DE ELIMINACIÓN (DELETE) USANDO EL ID GUARDADO
    it('debería eliminar el proyecto usando el ID dinámico', async () => {
        const res = await request(app).delete(`/projects/${createdProjectId}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toMatch(/eliminado/i);
    });

    // 4. TEST DE VALIDACIÓN (CASO NEGATIVO)
    it('debería fallar al intentar borrar el mismo proyecto otra vez', async () => {
        const res = await request(app).delete(`/projects/${createdProjectId}`);
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
    });
});