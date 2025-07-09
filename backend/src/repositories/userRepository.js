const { User } = require('../models')

const createUser = async (data) => {
  return await User.create(data)
}

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } })
}

module.exports = {
  createUser,
  findByEmail
}
