const { Router } = require('express');
const passport = require('passport');
//Service
const { MessageService } = require('../services/message.service');
//Create Router
const messageRouter = Router();

messageRouter.use(passport.authenticate('jwt', { session: false }));

//@route POST api/messages/room
//@desc Create room users
//@access Private
messageRouter.post('/room', (req, res) => {
    MessageService.createRoom(req.user.id, req.body.id)
        .then(room => res.send({ success: true, data: room }))
        .catch(res.onError);
});

//@route GET api/messages/room
//@desc Get room users
//@access Private
messageRouter.get('/room', (req, res) => {
    MessageService.getAllRoom(req.user.id)
        .then(room => res.send({ success: true, data: room }))
        .catch(res.onError);
});

//@route GET api/messages/room/:id
//@desc Get room users
//@access Private
messageRouter.get('/room/:id', (req, res) => {
    MessageService.joinRoom(req.params.id)
        .then(room => res.send({ success: true, data: room }))
        .catch(res.onError);
});

//@route Post api/messages
//@desc Post messages
//@access Private
messageRouter.post('/', (req, res) => {
    MessageService.postMessage(req.body.idRoom, req.body.message, req.user.id)
        .then(room => res.send({ success: true, data: room }))
        .catch(res.onError);
});

module.exports = { messageRouter };