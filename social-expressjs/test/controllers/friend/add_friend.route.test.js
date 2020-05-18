const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { User } = require('../../../models/user.model');
const { UserService } = require('../../../api/services/user.service');
const { FriendService } = require('../../../api/services/friend.service');

describe('Test POST /api/friends/add/:idReceiver', () => {
    let token1, idUser1, token2, idUser2;
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
    });

    it('Can add friend', async () => {
        const response = await request(app).
            post('/api/friends/add/' + idUser2)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { success, data } = body;
        equal(status, 200);
        equal(success, true);
        equal(data._id, idUser2);
        equal(data.name, 'Kori Nguyễn');
        const user1 = await User.findById(idUser1).populate('sentRequests');
        equal(user1.sentRequests[0]._id.toString(), idUser2);
        equal(user1.sentRequests[0].name, 'Kori Nguyễn');
        const user2 = await User.findById(idUser2).populate('incommingRequests');
        equal(user2.incommingRequests[0]._id.toString(), idUser1);
        equal(user2.incommingRequests[0].name, 'Quân Nguyễn');
    });

    it('Cannot add friend with invalid user id', async () => {
        const response = await request(app).
            post('/api/friends/add/123')
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 400);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'Invalid Id');
        const user1 = await User.findById(idUser1).populate('sentRequests');
        equal(user1.sentRequests.length, 0);
        const user2 = await User.findById(idUser2).populate('incommingRequests');
        equal(user2.incommingRequests.length, 0);
    });

    it('Cannot add friend without token', async () => {
        const response = await request(app).
            post('/api/friends/add/' + idUser2)
            .send({});
        const { status } = response;
        equal(status, 401);
        const user1 = await User.findById(idUser1).populate('sentRequests');
        equal(user1.sentRequests.length, 0);
        const user2 = await User.findById(idUser2).populate('incommingRequests');
        equal(user2.incommingRequests.length, 0);
    });

    it('Cannot add friend twice', async () => {
        await FriendService.addFriend(idUser1, idUser2);
        const response = await request(app).
            post('/api/friends/add/' + idUser2)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
        const user1 = await User.findById(idUser1).populate('sentRequests');
        equal(user1.sentRequests.length, 1);
        const user2 = await User.findById(idUser2).populate('incommingRequests');
        equal(user2.incommingRequests.length, 1);
    });

    it('Cannot add friend with user who sent request for you', async () => {
        await FriendService.addFriend(idUser2, idUser1);
        const response = await request(app).
            post('/api/friends/add/' + idUser2)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
        const user1 = await User.findById(idUser1).populate('incommingRequests');
        equal(user1.incommingRequests.length, 1);
        const user2 = await User.findById(idUser2).populate('sentRequests');
        equal(user2.sentRequests.length, 1);
    });

    it('Cannot add friend youself', async () => {
        const response = await request(app).
            post('/api/friends/add/' + idUser1)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
        const user1 = await User.findById(idUser1);
        equal(user1.sentRequests.length, 0);
        equal(user1.incommingRequests.length, 0);
    });

    it('Cannot add friend with removed user', async () => {
        await User.findByIdAndRemove(idUser2);
        const response = await request(app).
            post('/api/friends/add/' + idUser2)
            .set({ Authorization: 'Bearer ' + token1 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
        const user1 = await User.findById(idUser1).populate('incommingRequests');
        equal(user1.incommingRequests.length, 0);
        const user2 = await User.findById(idUser2).populate('sentRequests');
        equal(user2, null);
    });
});