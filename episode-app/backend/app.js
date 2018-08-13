const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const moviesRoutes = require('./routes/movies');

const app = express();

const connectionString = "mongodb+srv://steve:EMDrKmbPBRrXZdoa@cluster0-nmedl.mongodb.net/node-angular?retryWrites=true";

mongoose.connect(connectionString, { useNewUrlParser: true})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(() => {
    console.log('Connection to database failed.');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/movies', moviesRoutes);

module.exports = app;
