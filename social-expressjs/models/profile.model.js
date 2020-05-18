const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Chuyên ngành'
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String,
        default: 'Giới thiệu bản thân'
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        global: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile };