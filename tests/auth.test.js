const request = require('supertest');
const app = require('../src/app');
const db = require('../database/db');
const apiPath = '/api/auth';

describe('API de auth (Flujo Admin)', () => {
    
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
            .post(`${apiPath}/login`)
            .send(user);

        expect(res.body).toHaveProperty('bearer_token')

        token = res.body.bearer_token
    })

    it('Deberia ingresar a dashboard',async () => {
        const res = await request(app)
            .get(`${apiPath}/dashboard`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', expect.stringContaining('Bienvenido'))
    })
});

