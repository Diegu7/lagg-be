let fs = require('fs');
let path = require('path');
let bcrypt = require('bcrypt-nodejs');
let Comment = require('../models/Comment');
let jwt = require('../services/jwt');
let {Client, Pool} = require('pg');


function getComments(req, res) {
  let params = req.body;
  console.log('Reading all posts \'GET\'');
  let query = {
      text: 'Select * from comments where post_id = $1',
      values: [params.id]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, comments) => {
    if (err) {
      res.status(500).send({message: '¡Oops, something went wrong!'});
    } else {
      if (comments.rows <= 0) {
        res.status(404).send({message: 'No se encontraron registros'});
      } else {
        res.status(200).send({comments: comments.rows});
      }
    }
  });
}
/*
function getPost(req, res) {
  let query = {
    text: 'Select * from posts where post_id = $1',
    values: [req.params.post_id]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, posts) => {
    if (err) {
      res.status(500).send({message: '¡Oops, something went wrong!'});
    } else {
      if (posts.rows <= 0) {
        res.status(404).send({message: 'No se encontraron registros'});
      } else {
        res.status(200).send({posts: posts.rows});
      }
    }
  });
}*/

function addComment(req, res) {
  let params = req.body;

  let query = {
    text: 'insert into posts(votes, post_id, body, link, user_id) values ($1, $2, $3, $4, $5)',
    values: [params.votes, params.id, params.body, params.link, params.user_id]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, comments) => {
    if (err) {
      res.status(500).send({error: err.message});
    } else {
      res.status(200).send({message: 'Guardado Exitosamente!'});
    }
  });
}
/*
function updateCuenta(req, res) {
  let params = req.body;

  let query = {
    text: 'Select fn_cuentas_update($1, $2, $3, $4)',
    values: [params.numero_cuenta, params.apertura, params.saldo, params.antiguedad]
  };

  let client = new Client({user: 'david', host: 'localhost', database: 'cooperativa', password: 'asd', port: 5432})
  client.connect();
  client.query(query, (err, cuentas) => {
    if (err) {
      res.status(500).send({error: err.message});
    } else {
      res.status(200).send({message: 'Actualizado Exitosamente!'});
    }
  });
}*/
/*
function deleteCuenta(req, res) {
  let params = req.params;

  let query = {
    text: 'Select fn_cuentas_delete($1)',
    values: [params.id]
  };

  let client = new Client({user: 'david', host: 'localhost', database: 'cooperativa', password: 'asd', port: 5432})
  client.connect();
  client.query(query, (err, cuentas) => {
    if (err) {
      res.status(500).send({error: err.message});
    } else {
      res.status(200).send({message: 'Eliminado Exitosamente!'});
    }
  });
}*/

module.exports = {
  getComments,
  addComment
};
