const request = require('supertest');
const app = require('../src/app');
const db = require('../database/db');
const apiPath = '/api/users';

describe('API de usuarios (Flujo Admin)', () => {
    
    let idNewUser;
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

    it('Deberia retornar una lista que contenga todos los usuarios', async () => {
        const res = await request(app)
            .get(apiPath)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deberia crear un nuevo usuario y retornar su id', async () => {
        const newUser = {
            username : 'admin',
            password : 'Password1.'
        }

        const res = await request(app)
            .post(apiPath)
            .send(newUser);
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id')

        idNewUser = res.body.id
    });

    it('Deberia retornar una lista que contenga el usuario creado', async () => {
        const res = await request(app)
        .get(apiPath)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        
        const userExists = res.body.some(p => p.id === idNewUser);
        expect(userExists).toBe(true);
    });

    it('debería poderse editar el usuario recuperado', async () => {
        const editedUser = {
            username : 'admin',
            password : 'Password2.'
        };
        
        const res = await request(app)
            .put(`${apiPath}/${idNewUser}`)
            .set('Authorization', `Bearer ${token}`)
            .send(editedUser);

        expect(res.statusCode).toEqual(200);

        expect(res.body).toHaveProperty('id');
    });

    it('debería eliminar el usuario usando el ID dinámico', async () => {
        const res = await request(app)
        .delete(`${apiPath}/${idNewUser}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toMatch(/eliminado/i);
    });

    it('debería fallar al intentar borrar el mismo usuario otra vez', async () => {
        const res = await request(app)
        .delete(`${apiPath}/${idNewUser}`)
        .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
    });
})