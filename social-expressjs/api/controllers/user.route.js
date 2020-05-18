const { Router } = require('express');
const { UserService } = require('../services/user.service');
//Input Validation
const validateRegisterInput = require('../../validation/register.validation');
const validateLoginInput = require('../../validation/login.validation');
//Create Router
const userRouter = Router();

//@route POST api/users/register
//@desc Register User
//@access Public
userRouter.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    UserService.signUp(req.body)
        .then(user => res.send({ success: true, data: user }))
        .catch(res.onError);
});

//@route POST api/users/login
//@desc Login User / Returning JWT Token
//@access Public
userRouter.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    UserService.signIn(req.body.email, req.body.password)
        .then(user => res.send({ success: true, token: 'Bearer ' + user }))
        .catch(res.onError);
});

module.exports = { userRouter };