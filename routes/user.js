'use strict';

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/test', md_auth.ensureAuth, UserController.test);
api.get('/users', UserController.getUsers);
api.post('/login', UserController.getUser);
api.post('/register', UserController.saveUser);

module.exports = api;
