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
  vehicleModel: {
    type: Sequelize.STRING, // e.g., Honda Activa, Swift Dzire
    allowNull: true
  },
  duration: {
    type: Sequelize.FLOAT, // in minutes or hours
    allowNull: true
  },
  distance: {
    type: Sequelize.FLOAT, // in kilometers
    allowNull: true
  },
  tripPurpose: {
    type: Sequelize.STRING, // Work, Leisure, etc.
    allowNull: true
  },
  carbonEmitted: {
    type: Sequelize.FLOAT // in kg
  }
})

module.exports = Vehicle