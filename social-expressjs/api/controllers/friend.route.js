const { Router } = require('express');
const passport = require('passport');
//Services
const { FriendService } = require('../services/friend.service');
//Create Router
const friendRouter = Router();

friendRouter.use(passport.authenticate('jwt', { session: false }));

//@route POST api/friends/
//@desc Show friend this user
//@access Private
friendRouter.get('/', (req, res) => {
    FriendService.getAllUsers(req.user.id)
        .then(data => res.send({ success: true, data }));
});

//@route POST api/friends/add/:id
//@desc Send request add friend this user
//@access Private
friendRouter.post('/add/:idReceiver', (req, res) => {
    FriendService.addFriend(req.user.id, req.params.idReceiver)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route POST api/friends/accept/:id
//@desc Accept friend this user
//@access Private
friendRouter.post('/accept/:idSender', (req, res) => {
    FriendService.acceptFriendRequest(req.user.id, req.params.idSender)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route POST api/friends/decline/:id
//@desc Decline friend this user
//@access Private
friendRouter.post('/decline/:idSender', (req, res) => {
    FriendService.declineFriendRequest(req.user.id, req.params.idSender)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route DELETE api/friends/request/:id
//@desc Delete request add friend this user
//@access Private
friendRouter.delete('/request/:idReceiver', (req, res) => {
    FriendService.removeFriendRequest(req.user.id, req.params.idReceiver)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route DELETE api/friends/:id
//@desc Remove friend in list friend
//@access Private
friendRouter.delete('/:idFriend', (req, res) => {
    FriendService.removeFriend(req.user.id, req.params.idFriend)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

module.exports = { friendRouter };