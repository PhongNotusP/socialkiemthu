//Model
const { Profile } = require('../../models/profile.model');
//Config
const { MyError } = require('../../utils/my_error');

class ProfileService {

    static async getCurrentUser(idUser) {
        const profile = await Profile.findOne({ user: idUser })
            .populate('user', ['name', 'avatar', 'incommingRequests', 'cover', 'friends', 'sentRequests']);
        if (!profile) throw new MyError('Profile not found', 404);
        return profile;
    }

    static async getHandleUser(idUser) {
        const profile = await Profile.findOne({ user: idUser })
            .select('status')
            .populate('user', ['name', 'avatar'])
        if (!profile) throw new MyError('Profile not found', 404);
        return profile;
    }

    static async updateProfile(idUser, data) {
        //Get fields
        const profileFields = {};
        profileFields.user = idUser;
        if (data.bio) profileFields.bio = data.bio;
        if (data.status) profileFields.status = data.status;
        if (data.githubusername) profileFields.githubusername = data.githubusername;
        //Skills - Spilt into array
        if (typeof data.skills !== 'undefined') {
            profileFields.skills = data.skills.split(',');
        }
        const profile = await Profile.findOne({ user: idUser });
        if (!profile) throw new MyError('Profile not found', 404);
        const profileUpdate = await Profile.findOneAndUpdate(
            { user: idUser },
            { $set: profileFields },
            { new: true }
        );
        return profileUpdate;
    }

    static async updateSocial(idUser, data) {
        //Get fields
        const profileFields = {};
        profileFields.user = idUser;
        //Social
        profileFields.social = {};
        if (data.youtube) profileFields.social.youtube = data.youtube;
        if (data.twitter) profileFields.social.twitter = data.twitter;
        if (data.facebook) profileFields.social.facebook = data.facebook;
        if (data.linkedin) profileFields.social.linkedin = data.linkedin;
        if (data.instagram) profileFields.social.instagram = data.instagram;
        if (data.global) profileFields.social.global = data.global;
        const profile = await Profile.findOne({ user: idUser });
        if (!profile) throw new MyError('Profile not found', 404);
        const profileUpdate = await Profile.findOneAndUpdate(
            { user: idUser },
            { $set: profileFields },
            { new: true }
        );
        return profileUpdate;
    }

    static async createExperience(idUser, data) {
        const profile = await Profile.findOne({ user: idUser });
        if (!profile) throw new MyError('Profile not found', 404);
        const newExp = {
            title: data.title,
            company: data.company,
            from: data.from,
            to: data.to,
            current: data.current,
            description: data.description
        }
        //Add Experience to array
        profile.experience.unshift(newExp);
        profile.save();
        return newExp;
    }

    static async createEducation(idUser, data) {
        const profile = await Profile.findOne({ user: idUser });
        if (!profile) throw new MyError('Profile not found', 404);
        const newEdu = {
            school: data.school,
            degree: data.degree,
            from: data.from,
            to: data.to,
            current: data.current,
            description: data.description
        }
        //Add Education to array
        profile.education.unshift(newEdu);
        profile.save();
        return newEdu;
    }

    static async deleteExperience(idUser, idExp) {
        const profile = await Profile.findOne({ user: idUser });
        if (!profile) throw new MyError('Profile not found', 404);
        //Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(idExp);
        //Splice out of array
        profile.experience.splice(removeIndex, 1);
        //Save
        profile.save();
        return profile;
    }

    static async deleteEducation(idUser, idEdu) {
        const profile = await Profile.findOne({ user: idUser });
        if (!profile) throw new MyError('Profile not found', 404);
        //Get remove index
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(idEdu);
        //Splice out of array
        profile.education.splice(removeIndex, 1);
        //Save
        profile.save();
        return profile;
    }
}

module.exports = { ProfileService }