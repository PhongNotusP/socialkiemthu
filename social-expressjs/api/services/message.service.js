//Model
const { User } = require('../../models/user.model');
const { Room } = require('../../models/room.model');
const { Message } = require('../../models/message.model');
//Config
const { MyError } = require('../../utils/my_error');
const { checkObjectId } = require('../../utils/check_object_id');

class MessageService {

    static async createRoom(idUser, idFriend) {
        checkObjectId(idUser, idFriend);
        const user = await User.findById(idUser).populate('rooms', ['_id']);
        const friend = await User.findById(idFriend).populate('rooms', ['_id']);
        const room = this.getMatch(user.rooms, friend.rooms);
        if (room.length !== 0) {
            return Room.findById(room[0]._id);
        } else {
            const room = new Room({ users: [idUser, idFriend] });
            await User.findByIdAndUpdate(idUser, { $push: { rooms: room._id } });
            await User.findByIdAndUpdate(idFriend, { $push: { rooms: room._id } });
            return room.save();
        }
    }

    static getMatch(a, b) {
        var matches = [];
        for (var i = 0; i < a.length; i++) {
            for (var e = 0; e < b.length; e++) {
                if (a[i]._id.toString() === b[e]._id.toString()) matches.push(a[i]);
            }
        }
        return matches;
    }

    static async joinRoom(idRoom) {
        const room = await Room.findById(idRoom)
            .populate({
                path: 'messages',
                populate: {
                    path: 'user',
                    select: 'avatar name'
                }
            });
        if (!room) throw new MyError('Room not found', 404);
        return room;
    }

    static async getAllRoom(idUser) {
        const room = await User.findById(idUser)
            .select('rooms')
            .populate({
                path: 'rooms',
                select: 'users',
                populate: {
                    path: 'users',
                    select: 'avatar name',
                    match: { _id: { $ne: idUser } },
                }
            });
        if (!room) throw new MyError('User not found', 404);
        return room;
    }

    static async postMessage(idRoom, message, idUser) {
        if (!message) throw new MyError('Content must be provided', 400);
        const newMessage = new Message({ message, user: idUser, room: idRoom });
        await Room.findByIdAndUpdate(idRoom, { $push: { messages: newMessage._id } });
        const data = await newMessage.save();
        const user = await User.findById(data.user)
            .select('name avatar');
        return { user: user, message, idRoom, _id: data._id };
    }
}
module.exports = { MessageService };