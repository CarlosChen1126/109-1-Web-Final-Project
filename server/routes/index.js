const loginRoute = require('./login');
const registerRoute = require('./register');

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  app.post('/api/login', wrap(loginRoute.Login));
  app.post('/api/register', wrap(registerRoute.Register));
  app.post('/api/update', wrap(registerRoute.UpdateUserData));
  app.get('/api/checkusers', wrap(registerRoute.CheckUsers));
  app.delete('/api/delete', wrap(registerRoute.DeleteUsers));
}

module.exports = main;