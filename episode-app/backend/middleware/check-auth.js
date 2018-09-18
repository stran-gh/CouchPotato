const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_string_for_token_generation');
    next();
  } catch (error) {
    res.status(400).json({ message: 'Auth failed!' });
  }
};
