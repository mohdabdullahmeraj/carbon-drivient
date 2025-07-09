const Sequelize = require('sequelize')
const db = require('../config/db_config')

const Vehicle = db.define('Vehicle', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING, // car, bike, bus, etc.
    allowNull: false
  },
  duration: {
    type: Sequelize.FLOAT, // in hours or minutes
    allowNull: false
  },
  carbonEmitted: {
    type: Sequelize.FLOAT // in kg
  }
})

module.exports = Vehicle
