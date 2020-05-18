const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { Story } = require('../../../models/story.model');
const { Comment } = require('../../../models/comment.model');
const { CommentService } = require('../../../api/services/comment.service');
const { UserService } = require('../../../api/services/user.service');
const { StoryService } = require('../../../api/services/story.service');

describe('Test DELETE /api/comments/:_id', () => {
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
    });

    it('Can remove a comment', async () => {
        const response = await request(app)
            .delete('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token2 })
        const { data, success } = response.body;
        equal(success, true);
        equal(data._id, idComment);
        const commentDb = await Comment.findById(idComment);
        equal(commentDb, null);
        const story = await Story.findById(idStory);
        equal(story.comments.length, 0);
    });

    it('Cannot remove comment with invalid id', async () => {
        const response = await request(app)
            .delete('/api/comments/' + 123)
            .set({ Authorization: 'Bearer ' + token2 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Invalid Id');
        equal(response.status, 400);
        const commentDb = await Comment.findById(idComment);
        equal(commentDb.content, 'abc');
    });

    it('Cannot remove a removed comment', async () => {
        await CommentService.removeComment(idUser2, idComment);
        const response = await request(app)
            .delete('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token2 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Comment not found');
        equal(response.status, 404);
    });

    it('Cannot remove comment without token', async () => {
        const response = await request(app)
            .delete('/api/comments/' + idComment);
        equal(response.status, 401);
    });

    it('Cannot remove comment with token 1', async () => {
        const response = await request(app)
            .delete('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token1 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Comment not found');
        equal(response.status, 404);
    });

    it('Cannot remove of removed story', async () => {
        await StoryService.removeStory(idUser1, idStory);
        const response = await request(app)
            .delete('/api/comments/' + idComment)
            .set({ Authorization: 'Bearer ' + token2 })
        const { data, success, message } = response.body;
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Comment not found');
        equal(response.status, 404);
    });
});