process.env.NODE_ENV = 'test';
require('../config/connect_database');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');
const { Profile } = require('../models/profile.model');
const { Story } = require('../models/story.model');
beforeEach('Remove database for test', async () => {
    await User.deleteMany({});
    await Comment.deleteMany({});
    await Profile.deleteMany({});
    await Story.deleteMany({});
});