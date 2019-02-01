const {
  User
} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// function jwtSignUser(user) {
//   const ONE_WEEK = 60 * 60 * 24 * 7
//   return jwt.sign(user, config.authentication.jwtSecret, {
//     expiresIn: ONE_WEEK
//   })
// }

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).send({
        a: user.toJSON(),
        b: req.body
      })
    } catch (err) {
      res.status(400).send({
        error: 'this is already registered'
      })
    }


  },
  async login(req, res) {

    try {
      console.log("user login")
      const {
        email,
        password
      } = req.body;
      console.log(email, password)
      const user = await User.findOne({
        Where: {
          email: email
        }
      });
      console.log(user.toJSON());

      if (!user) {
        res.status(403).send({
          error: 'thie email is not found in registered'
        })
      }

      const isPasswordValid = password === user.password

      if (!isPasswordValid) {
        res.status(403).send({
          error: 'thie password  is wrong'
        })
      }
      const userJson = user.toJSON();
      res.status(200).send({
        user: userJson,
        token: jwtSignUser(userJson)

      })
    } catch (err) {
      res.status(500).send({
        error: 'Error has occured try to login'
      })
    }
  }
}
