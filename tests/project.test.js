const request = require('supertest');
const app = require('../src/app');

describe('GET /projects', () => {
    it('should return a list of projects', async () => {
        const res = await request(app).get('/projects');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});