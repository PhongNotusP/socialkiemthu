const Validator = require('validator');
const isEmpty = require('../utils/is_empty');
module.exports = function validateStoryInput(data) {
    let errors = {};

    data.content = !isEmpty(data.content) ? data.content : '';
    
    if (Validator.isEmpty(data.content)) {
        errors.content = 'Content field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}