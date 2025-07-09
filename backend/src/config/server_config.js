const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_ALTER: process.env.DB_ALTER,
    DB_FORCE: process.env.DB_FORCE,
    JWT_SECRET: process.env.JWT_SECRET
}