const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { UserService } = require('../../../api/services/user.service');
describe('Test POST /api/auth/login', () => {

    beforeEach('Sign up user for test', async () => {
        await UserService.signUp({
            email: 'minhquan.k0r1@gmail.com',
            password: '123456',
            password2: '123456',
            name: 'Quân Nguyễn'
        });
    });

    it('Can sign in', async () => {
        const body = {
            email: 'minhquan.k0r1@gmail.com',
            password: '123456'
        }
        const response = await request(app).post('/api/auth/login').send(body);
        equal(response.body.success, true);
        equal(response.status, 200);
    });

    it('Cannot sign in wrong email', async () => {
        const body = {
            email: 'minhquank0r1@gmail.com',
            password: '123456'
        }
        const response = await request(app).post('/api/auth/login').send(body);
        equal(response.body.message, 'Email or password incorrect');
        equal(response.body.success, false);
        equal(response.status, 404);
    });

    it('Cannot sign in wrong password', async () => {
        const body = {
            email: 'minhquan.k0r1@gmail.com',
            password: '123457'
        }
        const response = await request(app).post('/api/auth/login').send(body);
        equal(response.body.message, 'Email or password incorrect');
        equal(response.body.success, false);
        equal(response.status, 404);
    });

    it('Cannot sign in without username or password', async () => {
        const body = {
            email: '',
            password: ''
        }
        const response = await request(app).post('/api/auth/login').send(body);
        equal(response.body.email, 'Email field is required');
        equal(response.body.password, 'Password field is required');
        equal(response.status, 400);
    });
});