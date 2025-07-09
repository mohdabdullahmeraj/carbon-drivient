const Sequelize = require('sequelize')
const db = require('../config/db_config')

const User = db.define('User', {
  name: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING
})

module.exports = User
