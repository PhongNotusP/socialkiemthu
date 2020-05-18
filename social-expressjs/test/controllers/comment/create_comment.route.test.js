const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { Comment } = require('../../../models/comment.model');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test POST /api/comments', () => {
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
        idStory = story._id
    });

    it('Can create new comment', async () => {
        const response = await request(app)
            .post('/api/comments/')
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'abcd', idStory });
        const { status, body } = response;
        const { data, success } = body;
        equal(status, 200);
        equal(success, true);
        const comment2 = await Comment.findById(data.comments[0]._id).populate('author');
        equal(comment2.content, 'abcd');
        equal(comment2.author.name, 'Kori Nguyễn');
    });
    it('Cannot create new comment without content', async () => {
        const response = await request(app)
            .post('/api/comments')
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ idStory });
        const { status, body } = response;
        const { content } = body;
        equal(content, 'Content field is required');
        equal(status, 400);
        const comment2 = await Comment.findOne().populate('author');
        equal(comment2, null);
    });

    it('Cannot create new comment with invalid idStory', async () => {
        const response = await request(app)
            .post('/api/comments')
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'x', idStory: '123' });
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(status, 400);
        equal(message, 'Invalid Id');
        const comment2 = await Comment.findOne().populate('author');
        equal(comment2, null);
    });

    it('Cannot create new comment with invalid token', async () => {
        const response = await request(app)
            .post('/api/comments')
            .send({ content: 'x', idStory });
        const { status } = response;
        equal(status, 401);
        const comment2 = await Comment.findOne().populate('author');
        equal(comment2, null);
    });

    it('Cannot create new comment with invalid token', async () => {
        await Story.findByIdAndRemove(idStory);
        const response = await request(app)
            .post('/api/comments')
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'x', idStory });
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(status, 404);
        equal(message, 'Story not found');
        const story = await Story.findOne().populate('author');
        const comment2 = await Comment.findOne().populate('author');
        equal(comment2, null);
        equal(story, null);
    });

});