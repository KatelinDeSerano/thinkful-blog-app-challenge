const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = rquire('mongoose');

const {DATABASE_URL, PORT} = require('./config');
const {BlogPost} = require('./models');
const app = express();


app.use(morgan('common'));
app.use(bodyParser.json());

mongoos.Promise = global.Promise;


let server;

app.get('/posts', (req, res) => {
    BlogPost
      .find()
      .then(posts => {
        res.json(posts.map(post => post.apiRepr()));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went terribly wrong'});
      });
  });

  app.get('/posts/:id', (req, res) => {
    BlogPost
      .findById(req.params.id)
      .then(post => res.json(post.apiRepr()))
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went horribly awry'});
      });
  });
  

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve,reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err)
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
  
  
  if (require.main === module) {
    runServer().catch(err => console.error(err));
  };
  
  module.exports = {app, runServer, closeServer};