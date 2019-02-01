const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    console.log("Authentication policy")
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9!@#$&()`.+,/"-]{8,32}$')
      )
    }
    console.log("policy check");

    const {
      error,
      value
    } = Joi.validate(req.body, schema);
    if (error) {
      res.status(400).send({
        error: "error in the login",
        data : req.body.email,
        data1: req.body.password
      })
    } else {

      next()
    }

  }
}
