const request = require('supertest');
const { equal } = require('assert');
const { compareSync } = require('bcryptjs');
const { app } = require('../../../app');
const { User } = require('../../../models/user.model');

describe('Test POST /api/auth/register', () => {
    it('Can sign up', async () => {
        const body = {
            email: 'minhquan.k0r1@gmail.com',
            password: '123456',
            password2: '123456',
            name: 'Quân Nguyễn'
        }
        const response = await request(app).post('/api/auth/register').send(body);
        equal(response.body.success, true);
        equal(response.body.data.name, 'Quân Nguyễn');
        equal(response.body.data.email, 'minhquan.k0r1@gmail.com');
        equal(response.body.data.password, undefined);
        const user = await User.findOne({});
        equal(user.name, 'Quân Nguyễn');
        equal(user.email, 'minhquan.k0r1@gmail.com');
        const same = compareSync('123456', user.password);
        equal(same, true);
    });

    it('Can sign without password', async () => {
        const reqBody = {
            email: 'teo@gmail.com',
            name: 'Teo Nguyen'
        }
        const response = await request(app).post('/api/auth/register').send(reqBody);
        const { status, body } = response;
        const { data, password, password2 } = body;
        equal(status, 400);
        equal(data, undefined);
        equal(password, 'Password must be between 6 and 30 characters');
        equal(password2, 'Confirm Password field is required');
    });

    it('Cannot sign up without email', async () => {
        const reqBody = {
            email: '',
            password: '123456',
            password2: '123456',
            name: 'Quân Nguyễn'
        }
        const response = await request(app).post('/api/auth/register').send(reqBody);
        const { status, body } = response;
        const { data, email } = body;
        equal(status, 400);
        equal(data, undefined);
        equal(email, 'Email is invalid');
    });

    it('Cannot sign up without name', async () => {
        const reqBody = {
            email: 'minhquan.k0r1@gmail.com',
            password: '123456',
            password2: '123456',
            name: ''
        }
        const response = await request(app).post('/api/auth/register').send(reqBody);
        const { status, body } = response;
        const { data,  name } = body;
        equal(status, 400);
        equal(data, undefined);
        equal(name, 'Name field is required');
    });

    it('Cannot sign up twice with 1 email', async () => {
        const reqBody = {
            email: 'minhquan.k0r1@gmail.com',
            password: '123456',
            password2: '123456',
            name: 'Quân Nguyễn'
        }
        await request(app).post('/api/auth/register').send(reqBody);
        const response = await request(app).post('/api/auth/register').send(reqBody);
        const { status, body } = response;
        const { data, message } = body;
        equal(status, 400);
        equal(data, undefined);
        equal(message, 'Email already exists');
    });
});