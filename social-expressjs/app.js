const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const app = express();
const router = express.Router();
const { userRouter } = require('./api/controllers/user.route');
const { commentRouter } = require('./api/controllers/comment.route');
const { friendRouter } = require('./api/controllers/friend.route');
const { profileRouter } = require('./api/controllers/profile.route');
const { storyRouter } = require('./api/controllers/story.route');
const { messageRouter } = require('./api/controllers/message.route');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
require('./config/passport')(passport);
app.use((req, res, next) => {
    res.onError = function (error) {
        const body = { message: error.message, success: false };
        if (!error.statusCode) console.log(error);
        res.status(error.statusCode || 500).json(body);
    };
    next();
});
app.use('/api/auth', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/friends', friendRouter);
app.use('/api/profile', profileRouter);
app.use('/api/stories', storyRouter);
app.use('/api/messages', messageRouter);
app.use(router);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
module.exports = { app };

