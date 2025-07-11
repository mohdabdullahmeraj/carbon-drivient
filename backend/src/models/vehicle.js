const Sequelize = require('sequelize')
const db = require('../config/db_config')

const Vehicle = db.define('Vehicle', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  vehicleModel: {
    type: Sequelize.STRING, 
    allowNull: true
  },
  duration: {
    type: Sequelize.FLOAT, 
    allowNull: true
  },
  distance: {
    type: Sequelize.FLOAT, 
    allowNull: true
  },
  tripPurpose: {
    type: Sequelize.STRING, 
    allowNull: true
  },
  carbonEmitted: {
    type: Sequelize.FLOAT 
  },
  vehicleCategory: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Vehicle