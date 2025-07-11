const Sequelize = require('sequelize')
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = require('./server_config')

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    timezone: '+05:30',
})

module.exports = sequelize