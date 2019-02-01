const fs = require('fs');
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize('testDb', 'root', 'root', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './test.sqlite'
  //   pool: {
  //     max: 10,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
})

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

 db.sequelize = sequelize
 db.Sequelize = Sequelize

module.exports = db
