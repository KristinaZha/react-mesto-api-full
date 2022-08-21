require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const Error404 = require('./errors/Error404');

const corsSet = {
  origin: [
    'http://praktikumkristina.kristina.nomoredomains.sbs',
    'https://praktikumkristina.kristina.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
};

const regEx = /(?:(http|https):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(cors(corsSet));

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// логин
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// регистрация
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// роуты пользователей

app.use('/users', userRouter);

// роуты карточек
app.use('/cards', cardRouter);

// ставим защиту авторизацией
app.use(auth);

app.use(errorLogger); // подключаем логгер ошибок

// обработчик несуществующих роутов
app.use((_, res, next) => next(new Error404('Страница по указанному маршруту не найдена')));

app.use(errors());

app.use((error, _, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  next();
});
app.listen(PORT, () => {
  console.log('Ok!');
});
