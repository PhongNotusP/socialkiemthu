//Model
const { Story } = require('../../models/story.model');
const { User } = require('../../models/user.model');
const { Comment } = require('../../models/comment.model');
//Config
const { MyError } = require('../../utils/my_error');
const { checkObjectId } = require('../../utils/check_object_id');

class StoryService {
    static getAll() {
        const populateObject = {
            path: 'comments',
            populate: { path: 'author', select: ['name', 'avatar'] }
        };
        return Story.find({}).sort({ _id: -1 })
            .populate('author', { name: 'name', avatar: 'avtar' })
            .populate(populateObject);
    }

    static async createStory(idUser, content) {
        if (!content) throw new MyError('Content must be provided', 400);
        const story = new Story({ content, author: idUser });
        await User.findByIdAndUpdate(idUser, { $push: { stories: story._id } });
        return story.save();
    }

    static async removeStory(idUser, _id) {
        checkObjectId(_id, idUser);
        const query = { _id, author: idUser };
        const story = await Story.findOneAndRemove(query);
        if (!story) throw new MyError('Story not found', 404);
        await Comment.deleteOne({ _id: { $in: story.comments } });
        await User.findByIdAndUpdate(idUser, { $pull: { stories: _id } });
        return story;
    }

    static async likeStory(idUser, _id) {
        checkObjectId(idUser, _id);
        //$ne: So khớp tất cả giá trị ko bằng với value được chỉ định.
        const queryObject = { _id, fans: { $ne: idUser } };
        const story = await Story.findOneAndUpdate(queryObject, { $addToSet: { fans: idUser } }, { new: true });
        if (!story) throw new MyError('Story not found', 404);
        return story;
    }

    static async dislikeStory(idUser, _id) {
        checkObjectId(idUser, _id);
        //$eq: So sánh bằng với value được chỉ định.
        const queryObject = { _id, fans: { $eq: idUser } };
        const story = await Story.findOneAndUpdate(queryObject, { $pull: { fans: idUser } }, { new: true });
        if (!story) throw new MyError('Story not found', 404);
        return story;
    }
}

module.exports = { StoryService };