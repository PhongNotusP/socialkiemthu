const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test POST /api/stories/dislike/:_id', () => {
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
        await StoryService.likeStory(idUser2, story._id);
        idStory = story._id;
    });

    it('Can dislike a story', async () => {
        const response = await request(app)
            .post('/api/stories/dislike/' + idStory)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success } = body;
        equal(success, true);
        equal(status, 200);
        equal(data.fans.length, 0);
        const story2 = await Story.findById(idStory).populate('fans');
        equal(story2.fans.length, 0);
    });

    it('Cannot dislike a story with invalid idStory', async () => {
        const response = await request(app)
            .post('/api/stories/dislike/' + 123)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Invalid Id');
        equal(status, 400);
        const story2 = await Story.findById(idStory).populate('fans');
        equal(story2.fans.length, 1);
    });

    it('Cannot dislike a story without token', async () => {
        const response = await request(app)
            .post('/api/stories/like/' + idStory)
            .set({ token: '' })
            .send({});
        const { status } = response;
        equal(status, 401);
        const story2 = await Story.findById(idStory).populate('fans');
        equal(story2.fans.length, 1);
    });

    it('Can like a story twice', async () => {
        await request(app).post('/api/stories/dislike/' + idStory).set({ Authorization: 'Bearer ' + token2 }).send({});
        const response = await request(app)
            .post('/api/stories/dislike/' + idStory)
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