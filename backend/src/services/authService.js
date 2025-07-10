const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createUser, findByEmail } = require('../repositories/userRepository')
const { JWT_SECRET } = require('../config/server_config')

const register = async ({ name, email, password }) => {

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await createUser({ name, email, password: hashedPassword })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d'
  });
  return {user, token}
}

const login = async ({ email, password }) => {
  const user = await findByEmail(email)
  if (!user) throw new Error('User not found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d'
  })

  return { user, token }
}

module.exports = {
  register,
  login
}
