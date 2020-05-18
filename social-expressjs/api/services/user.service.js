//Model
const { User } = require('../../models/user.model');
const { Profile } = require('../../models/profile.model');
//Config
const { MyError } = require('../../utils/my_error');
const { hash, compare } = require('bcryptjs');
const { sign } = require('../../config/jwt');

class UserService {

    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new MyError('Email or password incorrect', 404);
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new MyError('Email or password incorrect', 404);
        const payload = { id: user.id, name: user.name, avatar: user.avatar }
        const token = await sign(payload);
        return token;
    }

    static async signUp(data) {
        const { name, email, password } = data;
        const findUser = await User.findOne({ email: email });
        if (findUser) throw new MyError('Email already exists', 400);
        const hashPassword = await hash(password, 8);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        const userInfo = user.toObject();
        delete userInfo.password;
        //Profile
        const profile = new Profile({ user: userInfo._id });
        await profile.save();
        return userInfo;
    }
}

module.exports = { UserService }