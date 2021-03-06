const Validator = require('validator');
const isEmpty = require('../utils/is_empty');
module.exports = function validateSocialInput(data) {
    let errors = {};

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}