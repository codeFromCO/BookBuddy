// import modules
const express = require('express');
const path = require('path');
require('dotenv').config();

// import modules relating to db

// import controllers
const bookController = require('./controllers/bookController');

// import model

// create instance of express app
const app = express();

// parse incoming requests
app.use(express.json());

// allows for parsing of requests with Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// serve bundle
app.use(express.static(path.join(__dirname, '../../dist')));

// establish db connection

// handle finding book
app.post('/api/book/search', bookController.findBook, (req, res, next) => {
  return res.status(200).json({
    message: 'book successfully found',
  });
});

// handle adding book
// handle updating notes for book
// handle deleting book

// error
app.use((err, req, res, next) => {
  const defaultErr = {
    message: {
      err: 'A global error has occured',
    },
    status: 500,
    log: 'Express handle caught unknown middleware error',
  };
  const errObj = Object.assign({}, defaultErr, err);
  return res.status(errObj.status).json(errObj.message);
});

// catch all
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// initialise server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});

module.exports = app;
