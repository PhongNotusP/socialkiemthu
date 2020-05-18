const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { User } = require('../../../models/user.model');
const { UserService } = require('../../../api/services/user.service');
const { FriendService } = require('../../../api/services/friend.service');

describe('Test POST /api/friends/accept/:idSender', () => {
    let token1, idUser1, token2, idUser2, idUser3, idStory;
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
        dataSignUpUser3 = {
            name: 'Hina Nguyễn',
            email: 'hina@gmail.com',
            password: '123456'
        }
        const user1 = await UserService.signUp(dataSignUpUser1);
        const user2 = await UserService.signUp(dataSignUpUser2);
        const user3 = await UserService.signUp(dataSignUpUser3);
        const userToken1 = await UserService.signIn('minhquan@gmail.com', '123456');
        const userToken2 = await UserService.signIn('kori@gmail.com', '123456');
        token1 = userToken1;
        idUser1 = user1._id;
        token2 = userToken2;
        idUser2 = user2._id;
        idUser3 = user3._id;
        await FriendService.addFriend(idUser1, idUser2);
    });

    it('Can accept friend request', async () => {
        const response = await request(app)
            .post('/api/friends/accept/' + idUser1)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { success, data } = body;
        equal(status, 200);
        equal(success, true);
        equal(data._id, idUser1);
        equal(data.name, 'Quân Nguyễn');
        const user1 = await User.findById(idUser1).populate('sentRequests').populate('friends');
        equal(user1.sentRequests.length, 0);
        equal(user1.friends[0].name, 'Kori Nguyễn');
        const user2 = await User.findById(idUser2).populate('incommingRequests').populate('friends');
        equal(user2.incommingRequests.length, 0);
        equal(user2.friends[0].name, 'Quân Nguyễn');
    });

    it('Cannot accept friend with invalid user id', async () => {
        const response = await request(app).
            post('/api/friends/accept/' + 123)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 400);
        equal(success, false);
        equal(data, null);
        equal(message, 'Invalid Id');
        const user1 = await User.findById(idUser1).populate('sentRequests').populate('friends');
        equal(user1.sentRequests[0].name, 'Kori Nguyễn');
        equal(user1.friends.length, 0);
        const user2 = await User.findById(idUser2).populate('incommingRequests').populate('friends');
        equal(user2.incommingRequests[0].name, 'Quân Nguyễn');
        equal(user2.friends.length, 0);
    });

    it('Cannot accept friend without token', async () => {
        const response = await request(app).
            post('/api/friends/accept/' + idUser1)
            .set({ token: '' })
            .send({});
        const { status } = response;
        equal(status, 401);
        const user1 = await User.findById(idUser1).populate('sentRequests').populate('friends');
        equal(user1.sentRequests[0].name, 'Kori Nguyễn');
        equal(user1.friends.length, 0);
        const user2 = await User.findById(idUser2).populate('incommingRequests').populate('friends');
        equal(user2.incommingRequests[0].name, 'Quân Nguyễn');
        equal(user2.friends.length, 0);
    });

    it('Cannot accept friend twice', async () => {
        await FriendService.acceptFriendRequest(idUser2, idUser1);
        const response = await request(app).
            post('/api/friends/accept/' + idUser1)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, null);
        equal(message, 'User not found');
        const user1 = await User.findById(idUser1).populate('sentRequests').populate('friends');
        equal(user1.sentRequests.length, 0);
        equal(user1.friends[0].name, 'Kori Nguyễn');
        const user2 = await User.findById(idUser2).populate('incommingRequests').populate('friends');
        equal(user2.incommingRequests.length, 0);
        equal(user2.friends[0].name, 'Quân Nguyễn');
    });

    it('Cannot accept friend with user who didnt send request for you', async () => {
        const response = await request(app).
            post('/api/friends/accept/' + idUser3)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
    });

    it('Cannot accept youself', async () => {
        const response = await request(app).
            post('/api/friends/accept/' + idUser2)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
    });

    it('Cannot accept friend with removed user', async () => {
        await User.findByIdAndRemove(idUser1);
        const response = await request(app).
            post('/api/friends/accept/' + idUser1)
            .set({ Authorization: 'Bearer ' + token2 })
            .send({});
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
    });
});