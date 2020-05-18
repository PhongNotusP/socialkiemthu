const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { Comment } = require('../../../models/comment.model');
const { CommentService } = require('../../../api/services/comment.service');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test PUT /api/comments/:_id', () => {
    let token1, idUser1, token2, idUser2, idStory, idComment;

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
        const story = await StoryService.createStory(idUser1, 'xyz');
        idStory = story._id
        const comment = await CommentService.createComment(idUser2, idStory, 'abc');
        idComment = comment.comments[0]._id;
    });

    it('Can update comment', async () => {
        const response = await request(app)
            .put('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'ghi' });
        const { body } = response;
        const { data, success } = body;
        equal(success, true);
        equal(data.content, 'ghi');
        const comment2 = await Comment.findById(idComment);
        equal(comment2.content, 'ghi');
    });

    it('Cannot update comment with invalid token', async () => {
        await Story.findByIdAndRemove(idStory);
        const response = await request(app)
            .put('/api/comments/' + idComment)
            .send({ content: 'x' });
        const { status } = response;
        equal(status, 401);
        const comment2 = await Comment.findOne();
        equal(comment2.content, 'abc');
    });

    it('Cannot update comment with token 1', async () => {
        await Story.findByIdAndRemove(idStory);
        const response = await request(app)
            .put('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({ content: 'x' });
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(status, 404);
        equal(message, 'Comment not found');
        const comment2 = await Comment.findOne();
        equal(comment2.content, 'abc');
    });

    it('Cannot update comment with invalid comment id', async () => {
        await Story.findByIdAndRemove(idStory);
        const response = await request(app)
            .put('/api/comments/123')
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'x' });
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(status, 400);
        equal(message, 'Invalid Id');
        const comment2 = await Comment.findOne();
        equal(comment2.content, 'abc');
    });

    it('Cannot update comment with invalid comment id', async () => {
        await Comment.findByIdAndRemove(idComment);
        const response = await request(app)
            .put('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({ content: 'x' });
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(status, 404);
        equal(message, 'Comment not found');
        const comment2 = await Comment.findOne();
        equal(comment2, null);
    });
});