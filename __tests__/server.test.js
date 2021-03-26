const request = require('supertest');
const app = require('/src/server/index');
const GEONAMES_USER_KEY = process.env.GEONAMES_USER_KEY;

describe('Post Endpoints', () => {
    it('get geo name locations', async () => {
        const res = await request(app)
            .post('/trip')
            .send({
                BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=miami&username=${GEONAMES_USER_KEY}`,
            });
        expect(res.statusCode).toEqual(200);
    });
});