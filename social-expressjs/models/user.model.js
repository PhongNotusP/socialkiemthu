const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        trim: true
    },
    avatar: {
        type: String, 
        required: true, 
        trim: true, 
        default: 'https://res.cloudinary.com/kori/image/upload/v1545012923/no_avatar.png'
    },
    cover : {
        type: String, 
        required: true, 
        trim: true, 
        default: 'https://res.cloudinary.com/kori/image/upload/v1557202998/cover.jpg'
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true, 
        trim: true 
    },
    stories: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Story' 
        }
    ],
    friends: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    sentRequests: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    incommingRequests: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    rooms: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Room' 
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };