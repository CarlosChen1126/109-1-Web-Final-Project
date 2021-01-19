const loginRoute = require('./login');
const registerRoute = require('./register');
const verifyRoute = require('./verify');
const accessRoute = require('./access');
const onlineRoute = require('./online');
const administratorRoute = require('./administrator');
const emailRoute = require('./email');
const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  app.post('/api/checkAccountIsExist', wrap(loginRoute.CheckAccountIsExist));
  app.get('/api/getManagerAccount', wrap(loginRoute.GetManagerAccount));
  app.post('/api/updateManagerAccount', wrap(loginRoute.UpdateManagerAccount))
  app.post('/api/addManagerAccount', wrap(loginRoute.AddManagerAccount));
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
  app.post('/api/checkEmailIsExist', wrap(emailRoute.CheckEmailIsExist));
  app.get('/api/getEmailAccount', wrap(emailRoute.GetEmailAccount));
  app.post('/api/updateEmailAccount', wrap(emailRoute.UpdateEmailAccount))
}

module.exports = main;