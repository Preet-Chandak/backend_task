const { check } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'registerUser': {
            return [
                check('name', 'Name is required').not().isEmpty(),
                check('email', 'Please provide a valid email').isEmail(),
                check('mobile', 'Mobile number must be 10 digits').isLength({ min: 10, max: 10 }),
                check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
            ];
        }
        case 'loginUser': {
            return [
                check('email', 'Please provide a valid email').isEmail(),
                check('password', 'Password is required').not().isEmpty()
            ];
        }
    }
};