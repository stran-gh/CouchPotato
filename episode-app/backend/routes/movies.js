const express = require('express');
const multer = require('multer');
const Movie = require('../models/movie');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    callback(error, 'backend/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});


router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    imagePath: url + '/images/' + req.file.filename
  });
  movie.save().then((createdMovie) => {
    res.status(201).json({
      message: 'Movie added successfully',
      movie: {
        ...createdMovie,
        id: createdMovie._id
      }
    });
  });
});

router.put('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const movie = new Movie({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    imagePath: imagePath
  });
  Movie.updateOne({_id: req.params.id}, movie).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful"});
  });
});

router.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id).then(movie => {
    if(movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({message: 'Movie not found!'});
    }
  })
})

router.get('', (req, res, next) => {
  Movie.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        movies: documents
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Movie.deleteOne({_id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Movie deleted"});
  })
})

module.exports = router;
