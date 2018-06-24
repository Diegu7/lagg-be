'use strict';

var express = require('express');
var CommentController = require('../controllers/comment');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/posts/:id', CommentController.getComments);
//api.get('/comments/:id', CommentController.getComment);
api.post('/posts/:id', CommentController.addComment);
//api.put('/cuentas', CuentaController.updateCuenta);
//api.delete('/cuentas/:id', CuentaController.deleteCuenta);

module.exports = api;
