const { Router } = require('express');
const passport = require('passport');
//Service
const { CommentService } = require('../services/comment.service');
//Input Validation
const validateCommentInput = require('../../validation/comment.validation');
//Create Router
const commentRouter = Router();

commentRouter.use(passport.authenticate('jwt', { session: false }));

//@route POST api/comments
//@desc Post comment
//@access Private
commentRouter.post('/', (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const { content, idStory } = req.body;
    CommentService.createComment(req.user.id, idStory, content)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route DELETE api/comments/:id
//@desc Delete comment
//@access Private
commentRouter.delete('/:_id', (req, res) => {
    CommentService.removeComment(req.user.id, req.params._id)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route POST api/comments/like/:id
//@desc Like comment
//@access Private
commentRouter.post('/like/:_id', (req, res) => {
    const { _id } = req.params;
    CommentService.likeComment(req.user.id, _id)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route POST api/comments/dislike/:id
//@desc Dislike comment
//@access Private
commentRouter.post('/dislike/:_id', (req, res) => {
    const { _id } = req.params;
    CommentService.dislikeComment(req.user.id, _id)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

module.exports = { commentRouter };