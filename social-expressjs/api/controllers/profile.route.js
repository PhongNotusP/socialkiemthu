const { Router } = require('express');
const passport = require('passport');
//Service
const { ProfileService } = require('../services/profile.service');
//Input Validation
const validateProfileInput = require('../../validation/profile.validation');
const validateExperienceInput = require('../..//validation/experience.validation');
const validateEducationInput = require('../../validation/education.validation');
const validateSocialInput = require('../../validation/social.validation');
//Create Router
const profileRouter = Router();
//@route GET api/profile
//@desc Get Current users profile
//@access Private
profileRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    ProfileService.getCurrentUser(req.user.id)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route GET api/profile/handle/:handle
//@desc Get profile by handle
//@access Public
profileRouter.get('/handle', passport.authenticate('jwt', { session: false }), (req, res) => {
    ProfileService.getHandleUser(req.user.id)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route GET api/profile/user/:user_id
//@desc Get profile by user ID
//@access Public
profileRouter.get('/:user_id', (req, res) => {
    ProfileService.getCurrentUser(req.params.user_id)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route POST api/profile/information
//@desc Edit users profile
//@access Private
profileRouter.post('/information', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    ProfileService.updateProfile(req.user.id, req.body)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route POST api/social
//@desc Edit users social
//@access Private
profileRouter.post('/social', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateSocialInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    ProfileService.updateSocial(req.user.id, req.body)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route POST api/profile/experience
//@desc Add experience to profile
//@access Private
profileRouter.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    ProfileService.createExperience(req.user.id, req.body)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route POST api/profile/education
//@desc Add education to profile
//@access Private
profileRouter.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    ProfileService.createEducation(req.user.id, req.body)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route DELETE api/profile/experience/:exp_id
//@desc Delete experience from profile
//@access Private
profileRouter.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    ProfileService.deleteExperience(req.user.id, req.params.exp_id)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

//@route DELETE api/profile/education/:exp_id
//@desc Delete education from profile
//@access Private
profileRouter.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    ProfileService.deleteEducation(req.user.id, req.params.edu_id)
        .then(profile => res.send({ success: true, data: profile }))
        .catch(res.onError);
});

module.exports = { profileRouter };