const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { Comment } = require('../../../models/comment.model');
const { User } = require('../../../models/user.model');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test DELETE /api/stories/:_id', () => {
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

    it('Can remove a story', async () => {
        const response = await request(app)
            .delete('/api/stories/' + idStory)
            .set({ Authorization: 'Bearer ' + token1 })
        const { data, success } = response.body;
        equal(success, true);
        equal(data._id, idStory);
        equal(data.content, 'test');
        const storyDb = await Story.findById(idStory);
        equal(storyDb, null);
        const user = await User.findById(idUser1);
        equal(user.stories.length, 0);
        const comment = await Comment.findOne({});
        equal(comment, null);
    });

    it('Cannot remove story with invalid id', async () => {
        const response = await request(app)
            .delete('/api/stories/' + 123)
            .set({ Authorization: 'Bearer ' + token1 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Invalid Id');
        equal(response.status, 400);
        const storyDb = await Story.findById(idStory);
        equal(storyDb._id.toString(), idStory);
    });

    it('Cannot remove a removed story', async () => {
        await StoryService.removeStory(idUser1, idStory);
        const response = await request(app)
            .delete('/api/stories/' + idStory)
            .set({ Authorization: 'Bearer ' + token1 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Story not found');
        equal(response.status, 404);
    });

    it('Cannot remove story without token', async () => {
        const response = await request(app)
            .delete('/api/stories/' + idStory)
        equal(response.status, 401);
    });

    it('Cannot remove story with token 2', async () => {
        const response = await request(app)
            .delete('/api/stories/' + idStory)
            .set({ Authorization: 'Bearer ' + token2 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Story not found');
        equal(response.status, 404);
    });
});