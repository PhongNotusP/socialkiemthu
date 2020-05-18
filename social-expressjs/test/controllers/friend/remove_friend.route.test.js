const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../app');
const { User } = require('../../../models/user.model');
const { UserService } = require('../../../api/services/user.service');
const { FriendService } = require('../../../api/services/friend.service');

describe('Test DELETE /api/friends/:idFriend', () => {
    let token1, idUser1, token2, idUser2, idUser3;

    beforeEach('Create new users for test', async () => {
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
        await FriendService.acceptFriendRequest(idUser2, idUser1);
    });

    it('Can remove friend', async () => {
        const response = await request(app).
            delete('/api/friends/' + idUser2)
            .set({ Authorization: 'Bearer ' + token1 })
        const { status, body } = response;
        const { success, data } = body;
        equal(status, 200);
        equal(success, true);
        equal(data._id, idUser2);
        equal(data.name, 'Kori Nguyễn');
        const user1 = await User.findById(idUser1).populate('friends');
        equal(user1.friends.length, 0);
        const user2 = await User.findById(idUser2).populate('friends');
        equal(user2.friends.length, 0);
    });

    it('Cannot remove friend with invalid user id', async () => {
        const response = await request(app).
            delete('/api/friends/' + 123)
            .set({ Authorization: 'Bearer ' + token1 })
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 400);
        equal(success, false);
        equal(data, null);
        equal(message, 'Invalid Id');
        const user1 = await User.findById(idUser1).populate('friends');
        equal(user1.friends[0].name, 'Kori Nguyễn');
        const user2 = await User.findById(idUser2).populate('friends');
        equal(user2.friends[0].name, 'Quân Nguyễn');
    });

    it('Cannot delete friend without token', async () => {
        const response = await request(app).
            delete('/api/friends/' + idUser1);
        const { status } = response;
        equal(status, 401);
        const user1 = await User.findById(idUser1).populate('friends');
        equal(user1.friends[0].name, 'Kori Nguyễn');
        const user2 = await User.findById(idUser2).populate('friends');
        equal(user2.friends[0].name, 'Quân Nguyễn');
    });

    it('Cannot delete friend twice', async () => {
        await FriendService.removeFriend(idUser1, idUser2);
        const response = await request(app)
            .delete('/api/friends/' + idUser1)
            .set({ Authorization: 'Bearer ' + token2 })
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, null);
        equal(message, 'User not found');
        const user1 = await User.findById(idUser1).populate('friends');
        equal(user1.friends.length, 0);
        const user2 = await User.findById(idUser2).populate('friends');
        equal(user2.friends.length, 0);
    });

    it('Cannot remove friend request with user3', async () => {
        const response = await request(app)
            .delete('/api/friends/' + idUser3)
            .set({ Authorization: 'Bearer ' + token1 });
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
    });

    it('Cannot decline youself', async () => {
        const response = await request(app)
            .delete('/api/friends/' + idUser1)
            .set({ Authorization: 'Bearer ' + token1 })
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
    });

    it('Cannot delete friend with removed user', async () => {
        await User.findByIdAndRemove(idUser2);
        const response = await request(app)
            .delete('/api/friends/' + idUser2)
            .set({ Authorization: 'Bearer ' + token1 })
        const { status, body } = response;
        const { success, data, message } = body;
        equal(status, 404);
        equal(success, false);
        equal(data, undefined);
        equal(message, 'User not found');
    });
});