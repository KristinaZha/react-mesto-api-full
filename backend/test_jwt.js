const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE2NWMxNjY0ODNmMjJlZGYwNjg0ODMiLCJpYXQiOjE2NjI0MDk3NjEsImV4cCI6MTY2MzAxNDU2MX0.tkF9RNzjU6PpVii3IY9cL5o_LkDm6VREzxd9JkIOyYE'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'some-secret-key'; // вставьте сюда секретный ключ для разработки из кода студента
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
