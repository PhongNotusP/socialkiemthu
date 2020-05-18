const { Router } = require('express');
const passport = require('passport');
//Services
const { StoryService } = require('../services/story.service');
//Input Validation
const validateStoryInput = require('../../validation/story.validation');
//Create Router
const storyRouter = Router();

//@route GET api/stories
//@desc Show all stories
//@access Public
storyRouter.get('/', (req, res) => {
    StoryService.getAll()
        .then(data => res.send({ success: true, data }));
});

//@route POST api/stories
//@desc Add new Story
//@access Private
storyRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateStoryInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const { content } = req.body;
    StoryService.createStory(req.user.id, content)
        .then(storyInfo => res.send({ success: true, data: { storyInfo, author: req.user } }))
        .catch(res.onError);
});

//@route DELETE api/stories/:id
//@desc Remove Story
//@access Private
storyRouter.delete('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    StoryService.removeStory(req.user.id, req.params._id)
        .then(data => res.send({ success: true, data }))
        .catch(res.onError);
});

//@route POST api/stories/like/:id
//@desc Like story
//@access Private
storyRouter.post('/like/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.params;
    StoryService.likeStory(req.user.id, _id)
        .then(storyInfo => res.send({ success: true, data: storyInfo }))
        .catch(res.onError);
});

//@route POST api/stories/dislike/:id
//@desc Remove like
//@access Private
storyRouter.post('/dislike/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.params;
    StoryService.dislikeStory(req.user.id, _id)
        .then(storyInfo => res.send({ success: true, data: storyInfo }))
        .catch(res.onError);
});

module.exports = { storyRouter };