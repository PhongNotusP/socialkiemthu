const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test POST /api/stories/like/:_id', () => {
    let token1, idUser1, token2, idUser2, idStory;
    beforeEach('Create new story for test', async () => {
        dataSignUpUser1 = {
            name: 'Quân Nguyễn',
            email: 'minhquan@gmail.com',
            password: '123456'
        }
        dataSignUpUser2 = {
            name: 'Kori Nguyễn',
            email: 'kori@gmail.com',
            password: '123456'
        }
        const user1 = await UserService.signUp(dataSignUpUser1);
        const user2 = await UserService.signUp(dataSignUpUser2);
        const userToken1 = await UserService.signIn('minhquan@gmail.com', '123456');
        const userToken2 = await UserService.signIn('kori@gmail.com', '123456');
        token1 = userToken1;
        idUser1 = user1._id;
        token2 = userToken2;
        idUser2 = user2._id;
        const story = await StoryService.createStory(idUser1, 'test');
        idStory = story._id;
    });

    it('Can like a story', async () => {
        const response = await request(app)
            .post('/api/stories/like/' + idStory)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success } = body;
        equal(success, true);
        equal(status, 200);
        equal(data.fans[0], idUser2);
        const story2 = await Story.findById(idStory).populate('fans');
        equal(story2.fans[0].name, 'Kori Nguyễn');
    });

    it('Cannot like a story with invalid idStory', async () => {
        const response = await request(app)
            .post('/api/stories/like/' + 123)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Invalid Id');
        equal(status, 400);
        const story2 = await Story.findById(idStory).populate('fans');
        equal(story2.fans.length, 0);
    });

    it('Cannot like a story without token', async () => {
        const response = await request(app)
            .post('/api/stories/like/' + idStory)
            .send({});
        const { status } = response;
        equal(status, 401);
        const story2 = await Story.findById(idStory).populate('fans');
        equal(story2.fans.length, 0);
    });

    it('Cannot like a removed story', async () => {
        StoryService.removeStory(idUser1, idStory);
        const response = await request(app)
            .post('/api/stories/like/' + idStory)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(status, 404);
        equal(message, 'Story not found');
    });

    it('Cannot like a story twice', async () => {
        await request(app).post('/api/stories/like/' + idStory).set({ Authorization: 'Bearer ' + token2 }).send({});
        const response = await request(app)
            .post('/api/stories/like/' + idStory)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(status, 404);
        equal(data, undefined);
        equal(message, 'Story not found');
    });
});