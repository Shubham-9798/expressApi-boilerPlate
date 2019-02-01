const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register,

  )
  //   app.post('/register', (req, res) => {
  //     res.status(200).send({
  //       a: req.body
  //     })
  //   });
  app.post('/login',
    AuthenticationController.login
  )

}
