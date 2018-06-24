let fs = require('fs');
let path = require('path');
let bcrypt = require('bcrypt-nodejs');
let User = require('../models/user');
let jwt = require('../services/jwt');
let {Client, Pool} = require('pg');

function test(req, res) {
  res.status(200).send({message: 'Probando Controlador User'});
}

function getUsers(req, res) {
  let params = req.body;
  let username = req.username;
  let password = req.password;

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();

  client.query('SELECT * FROM users;', (err, users) => {
    if (err) {
      res.status(500).send({message: '¡Oops, something went wrong!'});
    } else {
      if (users.rows <= 0) {
        res.status(404).send({message: 'No existen registros'});
      } else {
        res.status(200).send({users: users.rows});
      }
    }

    client.end();
  });
}

function saveUser(req, res) {
  let params = req.body;

  let passw = bcrypt.hashSync(params.password);

  console.log('ENCRYPTED PASSWORD = ' + passw);

  let query = {
    text: 'INSERT INTO users(username, password) VALUES ($1, $2)',
    values: [params.username, passw]
  };

  console.log(query);
  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, user) => {
    if (err) {
      res.status(400).send({message: err.stack});
    } else {
      if (params.password) {
        res.status(200).send({message: 'Guardado exitosamente'});
      } else {
        res.status(500).send({message: 'Rellene todos los campos'});
      }
    }
    client.end();
  });

}

function getUser(req, res) {
  let params = req.body;

  let query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [params.username]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, user) => {
    if (err) {
      res.status(500).send({message: 'Error'});
    } else {
      if (params.password) {
        bcrypt.compare(params.password, user.rows[0].password, (err, result) => {
          if (err) {
            res.status(400).send({message: err.stack});
          } else {

            if (result) {
              if (params.gethash) {
                res.status(200).send({token: jwt.createToken(user)});
              } else {
                res.status(200).send({message: 'Logueado correctamente', user: user.rows[0]});
              }
            } else {
              res.status(500).send({message: 'Revise sus datos'});
            }
          }
        })
      }
    }
    client.end();
  });
}

module.exports = {
  test,
  getUsers,
  saveUser,
  getUser
}
