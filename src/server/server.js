// import modules
const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

// import controllers
const bookController = require('./controllers/bookController');

// create instance of express app
const app = express();

// parse incoming requests
app.use(express.json());

// allows for parsing of requests with Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// serve bundle
app.use(express.static(path.join(__dirname, '../../dist')));

// check for required environment variables
if (!process.env.MONGODB_URI || !process.env.PORT) {
  throw new Error('Environment variables MONGODB_URI and PORT must be set');
}

// establish db connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database!'))
  .catch((err) => console.log('Database connection error:', err));

// handle finding books
app.get('/api/book/findAll', bookController.findBooks, (req, res, next) => {
  return res.status(200).json({
    message: 'Books successfully found',
    data: res.locals.books,
  });
});

app.put('/api/book/findOne', bookController.findBook, (req, res, next) => {
  return res.status(200).json({
    message: 'Book successfully found',
    data: res.locals.book,
  });
});

// handle adding book
app.post('/api/book/add', bookController.addBook, (req, res, next) => {
  return res.status(201).json({
    message: 'Book successfully added',
  });
});

// handle updating notes for book
app.patch('/api/book/update', bookController.updateBook, (req, res, next) => {
  return res.status(200).json({
    message: 'Book successfully updated',
  });
});

// handle deleting book
app.post('/api/book/delete', bookController.deleteBook, (req, res, next) => {
  return res.status(200).json({
    message: 'Book successfully deleted',
  });
});

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
