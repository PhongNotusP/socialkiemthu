const Validator = require('validator');
const isEmpty = require('../utils/is_empty');
module.exports = function validateProfileInput(data) {
    let errors = {};

    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}