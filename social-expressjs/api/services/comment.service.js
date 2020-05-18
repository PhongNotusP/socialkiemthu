//Model
const { Story } = require("../../models/story.model");
const { Comment } = require("../../models/comment.model");
//Config
const { MyError } = require("../../utils/my_error");
const { checkObjectId } = require("../../utils/check_object_id");

class CommentService {
  static async createComment(idUser, idStory, content) {
    checkObjectId(idStory, idUser);
    if (!content) throw new MyError("Invalid Comment", 400);
    const comment = new Comment({ author: idUser, content, story: idStory });
    const updateObj = { $push: { comments: comment._id } };
    const story = await Story.findByIdAndUpdate(idStory, updateObj);
    if (!story) throw new MyError("Story not found", 404);
    await comment.save();
    const populateObject = {
      path: "comments",
      populate: { path: "author", select: ["name", "avatar"] },
    };
    return Story.findById(idStory)
      .populate("author", { name: "name", avatar: "avatar" })
      .populate(populateObject);
  }

  static async removeComment(idUser, _id) {
    checkObjectId(_id, idUser);
    const query = { _id, author: idUser };
    const comment = await Comment.findOneAndRemove(query);
    if (!comment) throw new MyError("Comment not found", 404);
    await Story.findByIdAndUpdate(comment.story, { $pull: { comments: _id } });
    return comment;
  }

  static async likeComment(idUser, _id) {
    checkObjectId(idUser, _id);
    const queryObject = { _id, fans: { $ne: idUser } };
    const comment = await Comment.findOneAndUpdate(
      queryObject,
      { $addToSet: { fans: idUser } },
      { new: true }
    );
    if (!comment) throw new MyError("Comment not found", 404);
    return comment;
  }
  static async dislikeComment(idUser, _id) {
    checkObjectId(idUser, _id);
    const queryObject = { _id, fans: { $eq: idUser } };
    const comment = await Comment.findOneAndUpdate(
      queryObject,
      { $pull: { fans: idUser } },
      { new: true }
    );
    if (!comment) throw new MyError("Comment not found", 404);
    return comment;
  }
}

module.exports = { CommentService };
