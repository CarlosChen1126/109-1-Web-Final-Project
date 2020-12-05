const loginRoute = require('./login');

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  app.post('/api/login', wrap(loginRoute.Login))
}

module.exports = main;