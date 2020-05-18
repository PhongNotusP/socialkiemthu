const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { User } = require('../../../models/user.model');
const { UserService } = require('../../../api/services/user.service');

describe('Test POST /api/stories', () => {
    let token, _id;
    beforeEach('Sign up user for test', async () => {
        dataSignUp = {
            name: 'Quân Nguyễn',
            email: 'minhquan@gmail.com',
            password: '123456'
        }
        const user = await UserService.signUp(dataSignUp);
        const userToken = await UserService.signIn('minhquan@gmail.com', '123456');
        token = userToken;
        _id = user._id;
    });

    it('Can create new story', async () => {
        const response = await request(app)
            .post('/api/stories')
            .set({ Authorization: 'Bearer ' + token })
            .send({ content: 'ABCD' });
        const { success, data } = response.body;
        equal(success, true);
        equal(data.storyInfo.content, 'ABCD');
        const storyDb = await Story.findOne({}).populate('author');
        equal(storyDb.content, 'ABCD');
        equal(storyDb._id, data.storyInfo._id);
        equal(storyDb.author._id.toString(), _id);
        equal(storyDb.author.name, 'Quân Nguyễn');
        const user = await User.findById(_id).populate('stories');
        equal(user.stories[0]._id, data.storyInfo._id);
        equal(user.stories[0].content, 'ABCD');
    });

    it('Cannot create new story with empty content', async () => {
        const response = await request(app)
            .post('/api/stories')
            .set({ Authorization: 'Bearer ' + token })
            .send({ content: '' });
        const { content } = response.body;
        equal(response.status, 400);
        equal(content, 'Content field is required');
        const storyDb = await Story.findOne({});
        equal(storyDb, null);
    });

    it('Cannot create new story without token', async () => {
        const response = await request(app)
            .post('/api/stories')
            .send({ content: 'ABCD' });
        equal(response.status, 401);
        const storyDb = await Story.findOne({});
        equal(storyDb, null);
    });
});