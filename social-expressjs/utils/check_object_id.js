const mongoose = require('mongoose');
const { MyError } = require('../utils/my_error');

function checkObjectId(...ids) {
    try {
        ids.forEach(id => new mongoose.Types.ObjectId(id.toString()));
    } catch (error) {
        throw new MyError('Invalid Id', 400);
    }
}

module.exports = { checkObjectId };