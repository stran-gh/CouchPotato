const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
  const movie = req.body;
  console.log(movie);
  res.status(201).json({
    message: 'Movie added successfully'
  });
});

app.get('/api/movies', (req, res, next) => {
  const movies = [
    {
      title: "Harry Potter",
      description: "A boy finds out he is a wizard",
      type: "movie"
    },
    {
      title: "Harry Potter 2",
      description: "A boy finds out he is a good wizard",
      type: "movie"
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    movies: movies
  });
});



module.exports = app;
