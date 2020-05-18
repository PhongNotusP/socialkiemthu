const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test PUT /stories/:_id', () => {
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

    it('Can update a story', async () => {
        const response = await request(app)
            .put('/api/stories/' + idStory)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({ content: 'AAA' });
        equal(response.body.success, true);
        equal(response.body.data.content, 'AAA');
        const story = await Story.findOne({});
        equal(story.content, 'AAA');
    });

    it('Cannot update story with invalid id', async () => {
        const response = await request(app)
            .put('/api/stories/xyz')
            .set({ Authorization: 'Bearer ' + token1 })
            .send({ content: 'AAA' });
        equal(response.body.success, false);
        equal(response.body.message, 'Invalid Id');
        equal(response.status, 400);
        const story = await Story.findOne({});
        equal(story.content, 'test');
    });

    it('Cannot update a removed story', async () => {
        await Story.findByIdAndRemove(idStory);
        const response = await request(app)
            .put('/api/stories/' + idStory)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({ content: 'AAA' });
        equal(response.body.success, false);
        equal(response.body.message, 'Story not found');
        equal(response.status, 404);
        const story = await Story.findOne({});
        equal(story, null);
    });

    it('Cannot update a story with token2', async () => {
        const response = await request(app)
            .put('/api/stories/' + idStory)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'AAA' });
        equal(response.body.success, false);
        equal(response.body.data, undefined);
        equal(response.body.message, 'Story not found');
        equal(response.status, 404);
        const story = await Story.findOne({});
        equal(story.content, 'test');
    });

    it('Cannot update a story without token', async () => {
        const response = await request(app)
            .put('/api/stories/' + idStory)
            .send({ content: 'AAA' });
        equal(response.status, 401);
        const story = await Story.findOne({});
        equal(story.content, 'test');
    });
});