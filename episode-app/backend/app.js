const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Movie = require('./models/movie');

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/movies', (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type
  });
  movie.save().then((createdMovie) => {
    res.status(201).json({
      message: 'Movie added successfully',
      movieId: createdMovie._id
    });
  });
});

app.get('/api/movies', (req, res, next) => {
  Movie.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        movies: documents
      });
    });
});

app.delete('/api/movies/:id', (req, res, next) => {
  Movie.deleteOne({_id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Movie deleted"});
  })
})



module.exports = app;
