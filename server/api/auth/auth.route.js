const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const authValidation = require('./auth.validation');
const authCtrl = require('./auth.controller');
const config = require('../../../config/config');
const { master } = require('../../middleware/master');
const { isAuthenticated } = require('../../middleware/authentication');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(master, validate(authValidation.login), authCtrl.login);
router.route('/signup').post(master, validate(authValidation.signup), authCtrl.signup);
router.route('/check').get(isAuthenticated(['user', 'admin', 'judge', 'receptionist']), authCtrl.check);
router.route('/logout').get(isAuthenticated(['user', 'admin', 'judge', 'receptionist']), authCtrl.logout);

module.exports = router;
