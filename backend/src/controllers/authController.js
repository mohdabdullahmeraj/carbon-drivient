const { authService } = require('../services')
const { register, login } = authService

const handleRegister = async (req, res) => {
  try {
    const user = await register(req.body)

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    res.status(201).json({ message: 'User created successfully', safeUser })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const handleLogin = async (req, res) => {
  try {
    const { user, token } = await login(req.body)

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    res.status(200).json({ message: 'Login successful', token, safeUser })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

module.exports = {
  handleRegister,
  handleLogin
}
