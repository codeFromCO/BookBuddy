// import modules
const express = require('express');
const path = require('path');
require('dotenv').config();

// import modules relating to db

// import controllers

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

// handle adding book
// handle updating notes for book
// handle deleting book 

// catch all 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
  });
  
// initialise server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});

module.exports = app;
