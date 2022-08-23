const corsOrigin = [

  'https://praktikumkristina.kristina.nomoredomains.sbs',
  'http://praktikumkristina.kristina.nomoredomains.sbs/cards',
  'https://praktikumkristina.kristina.nomoredomains.sbs/users/me',
  'https://praktikumkristina.kristina.nomoredomains.sbs/cards',
  'http://praktikumkristina.kristina.nomoredomains.sbs',
  'http://praktikumkristina.kristina.nomoredomains.sbs/users/me',
  'http://localhost:3000',
  'https://locahost:3000',
  'https://locahost:3001',
  'https://api.praktikumkristina.kristina.nomoredomains.sbs',
  'https://api.praktikumkristina.kristina.nomoredomains.sbs/cards',
  'https://api.praktikumkristina.kristina.nomoredomains.sbs/users/me',
  'http://api.praktikumkristina.kristina.nomoredomains.sbs/users/me',
  'http://api.praktikumkristina.kristina.nomoredomains.sbs/cards',

];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];
  if (corsOrigin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
