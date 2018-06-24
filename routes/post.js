'use strict';

var express = require('express');
var PostController = require('../controllers/post');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/posts', PostController.getPosts);
api.get('/posts/:id', PostController.getPost);
api.post('/posts', PostController.addPost);
//api.put('/cuentas', CuentaController.updateCuenta);
//api.delete('/cuentas/:id', CuentaController.deleteCuenta);

module.exports = api;
