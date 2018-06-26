let fs = require('fs');
let path = require('path');
let bcrypt = require('bcrypt-nodejs');
let Comment = require('../models/Comment');
let jwt = require('../services/jwt');
let {Client, Pool} = require('pg');


function getComments(req, res) {
  let params = req.params.id;
  console.log('Reading comments \'GET\' from');
  console.log(params);
  let query = {
      text: 'Select * from comments where post_id = $1',
      values: [params]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, comments) => {
    if (err) {
      res.status(500).send({message: '¡Oops, something went wrong!'});
    } else {
      res.status(200).send({comments: comments.rows});
    }
  });
}

function addComment(req, res) {
  let params = req.body;

  let query = {
    text: 'insert into comments(votes, post_id, body, user_id) values ($1, $2, $3, $4) returning *',
    values: [params.votes, params.post_id, params.body, params.user_id]
  };

  let client = new Client({user: 'postgres', host: 'localhost', database: 'lagg', password: 'hola123', port: 5432});
  client.connect();
  client.query(query, (err, comments) => {
    if (err) {
      res.status(500).send({error: err.message});
    } else {
      res.status(200).send({comments: comments.rows[0]});
    }
  });
}


module.exports = {
  getComments,
  addComment
};
