const jwt = require('jsonwebtoken');

const Error401 = require('../errors/Error401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error401('Пройдите авторизацию');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'yandex-practicum');
  } catch (err) {
    return next(new Error401('Пройдите авторизацию'));
  }
  req.user = payload;

  return next();
};
