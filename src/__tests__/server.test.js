const app = require('../server/index.js')
const supertest = require('supertest')
const request = supertest(app)

describe('Post to the endpoint', () => {
    it('/', async done => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
        done()
    })
})