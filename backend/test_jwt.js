const jwt = require('jsonwebtoken');

const YOUR_JWT = 'b2beb307b02131a080c4ab090d48d3c6c1774caca71fea041fc37296a0484c92'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'yandex-practicum'; // вставьте сюда секретный ключ для разработки из кода студента
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log('\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются');
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
  }
}
