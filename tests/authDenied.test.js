const request = require('supertest');
const app = require('../src/app');
const db = require('../database/db');
const apiPath = '/api/auth';

describe('API de auth (Flujo usuario externo)', () => {
    
    let token;
    let nameUser = 'test';
    let passwordUser = 'Password3.'

    afterAll(() => {
        db.close();
    });

    it('Deberia crear un nuevo usuario', async () => {
        const newUser = {
            username : nameUser,
            password : passwordUser
        }

        const res = await request(app)
            .post('/api/users')
            .send(newUser);
        
        expect(res.statusCode).toEqual(201);
    });

    it('Deberia recuperar bearer token', async () => {
       const user = {
            username : nameUser,
            password : passwordUser
        }

        const res = await request(app)
            .post(`${apiPath}/login`)
            .send(user);

        expect(res.body).toHaveProperty('bearer_token')

        token = res.body.bearer_token
    })

    it('Deberia no poder ingresar a dashboard, a pesar de token valido',async () => {
        const res = await request(app)
            .get(`${apiPath}/dashboard`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(401);
    })

    it('Deberia no recuperar bearer token con usuario inexistente', async () => {
       const user = {
            username : 'InvalidName',
            password : 'InvalidPass'
        }

        const res = await request(app)
            .post(`${apiPath}/login`)
            .send(user);

        expect(res.statusCode).toEqual(401);
    })
});