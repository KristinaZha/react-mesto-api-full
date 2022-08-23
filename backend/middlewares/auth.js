const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

console.log('NODE_ENV, JWT_SECRET ==>', NODE_ENV, JWT_SECRET);
const Error401 = require('../errors/Error401');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error401('Пройдите авторизацию');
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'yandex-practicum');
  } catch (err) {
    return next(new Error401('Пройдите авторизацию'));
  }
  req.user = payload;

  return next();
};
