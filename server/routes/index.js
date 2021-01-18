const loginRoute = require('./login');
const registerRoute = require('./register');
const verifyRoute = require('./verify');
const accessRoute = require('./access');
const onlineRoute = require('./online');
const administratorRoute = require('./administrator')
const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  app.post('/api/login', wrap(loginRoute.Login));
  app.post('/api/registerCheck', wrap(registerRoute.RegisterCheck));
  app.post('/api/update', wrap(registerRoute.UpdateUserData));
  app.get('/api/checkusers', wrap(registerRoute.CheckUsers));
  app.delete('/api/delete', wrap(registerRoute.DeleteUsers));
  app.post('/api/generateCode', wrap(verifyRoute.GenerateCode));
  app.post('/api/checkVerifyCode', wrap(verifyRoute.CheckVerifyCode));
  app.post('/api/registerInDatabase', wrap(registerRoute.RegisterInDatabase));
  app.get('/api/accesstime', wrap(accessRoute.getAccess));
  app.get('/api/getOnlinePeople', wrap(onlineRoute.getOnlinePeople));
  app.post('/api/insertAdministrator', wrap(administratorRoute.InsertAdministrator));
  app.get('/api/getAdministrator', wrap(administratorRoute.GetAdministrator));
  app.delete('/api/deleteAdministrator', wrap(administratorRoute.DeleteAdministrator));
}

module.exports = main;