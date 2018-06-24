let fs = require('fs');
let path = require('path');
let bcrypt = require('bcrypt-nodejs');
let Post = require('../models/Post');
let jwt = require('../services/jwt');
let {Client, Pool} = require('pg');


function getPosts(req, res) {
  console.log('Reading all posts \'GET\'');
  let query = {
      text: 'Select * from posts'
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
}

function getPost(req, res) {
  let query = {
    text: 'Select * from posts where post_id = $1',
    values: [req.params.id]
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
}

function addPost(req, res) {
  let params = req.body;

  let query = {
    text: 'insert into posts(votes, title, link, user_id) values ($1, $2, $3, $4) returning *',
    values: [params.votes, params.title, params.link, params.user_id]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, posts) => {
    if (err) {
      res.status(500).send({error: err.message});
    } else {
      res.status(200).send({posts: posts.rows[0]});
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
  getPosts,
  getPost,
  addPost
};
