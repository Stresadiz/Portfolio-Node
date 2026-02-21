const request = require('supertest');
const app = require('../src/app');
const db = require('../database/db');

describe('API de Proyectos (Flujo Dinámico)', () => {
    let createdProjectId;
    let token;

    afterAll(() => {
        db.close();
    });

    it('Deberia recuperar bearer token', async () => {
        const user = {
            username : process.env.ADMIN_USER,
            password : process.env.ADMIN_PASS
        }

        const res = await request(app)
            .post('/api/auth/login')
            .send(user);

        expect(res.body).toHaveProperty('bearer_token')

        token = res.body.bearer_token
    })

    it('debería crear un nuevo proyecto y retornar su ID', async () => {
        const newProject = {
            title: "Proyecto de Test",
            description: "Creado desde Jest",
            repo_url: "https://github.com/Stresadiz/Portfolio-Node"
        };

        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send(newProject);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        
        createdProjectId = res.body.id; 
    });

    it('debería retornar una lista que contenga el proyecto creado', async () => {
        const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        
        const projectExists = res.body.some(p => p.id === createdProjectId);
        expect(projectExists).toBe(true);
    });

    it('debería poderse editar el proyecto seleccionado', async () => {
        const editedProject = {
            title: "Nuevo titulo",
            description: "Creado desde Jest - y editado a la vez - Otra vez"
        };
        
        const res = await request(app)
            .put(`/api/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(editedProject);

        expect(res.statusCode).toEqual(200);

        expect(res.body).toHaveProperty('id');
    });

    it('debería eliminar el proyecto usando el ID dinámico', async () => {
        const res = await request(app)
        .delete(`/api/projects/${createdProjectId}`)
        .set('Authorization', `Bearer ${token}`)
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toMatch(/eliminado/i);
    });

    it('debería fallar al intentar borrar el mismo proyecto otra vez', async () => {
        const res = await request(app)
        .delete(`/api/projects/${createdProjectId}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
    });
});