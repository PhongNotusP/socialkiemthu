const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Comment } = require('../../../models/comment.model');
const { CommentService } = require('../../../api/services/comment.service');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test POST /api/comments/dislike/:_id', () => {
    let token1, idUser1, token2, idUser2, idStory, idComment;

    beforeEach('Create new comment for test', async () => {
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
        await CommentService.likeComment(idUser1, idComment);
    });

    it('Can dislike a comment', async () => {
        const response = await request(app)
            .post('/api/comments/dislike/' + idComment)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { body } = response;
        const { data, success } = body;
        equal(success, true);
        equal(data.fans.length, 0);
        const commentDb = await Comment.findById(idComment).populate('fans');
        equal(commentDb.fans.length, 0);
    });

    it('Cannot dislike a comment with invalid idStory', async () => {
        const response = await request(app)
            .post('/api/comments/dislike/' + 123)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Invalid Id');
        equal(status, 400);
        const commentDb = await Comment.findById(idComment).populate('fans');
        equal(commentDb.fans.length, 1);
    });

    it('Cannot dislike a comment without token', async () => {
        const response = await request(app)
            .post('/api/comments/like/' + idComment)
            .send({});
        const { status } = response;
        equal(status, 401);
        const commentDb = await Comment.findById(idComment).populate('fans');
        equal(commentDb.fans.length, 1);
    });

    it('Cannot dislike a removed comment', async () => {
        await CommentService.removeComment(idUser2, idComment);
        const response = await request(app)
            .post('/api/comments/dislike/' + idComment)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Comment not found');
        equal(status, 404);
        const commentDb = await Comment.findById(idComment).populate('fans');
        equal(commentDb, null);
    });

    it('Cannot dislike a comment twice', async () => {
        await request(app).post('/api/comments/dislike/' + idComment).set({ Authorization: 'Bearer ' + token1 }).send({});
        const response = await request(app)
            .post('/api/comments/dislike/' + idComment)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(status, 404);
        equal(data, undefined);
        equal(message, 'Comment not found');
    });

    it('Cannot dislike a comment of a removed story', async () => {
        await StoryService.removeStory(idUser1, idStory);
        const response = await request(app)
            .post('/api/comments/dislike/' + idComment)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { data, success, message } = body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Comment not found');
        equal(status, 404);
        const commentDb = await Comment.findById(idComment).populate('fans');
        equal(commentDb, null);
    });
});