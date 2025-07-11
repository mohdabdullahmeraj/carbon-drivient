const { authService } = require('../services')
const { register, login } = authService

const handleRegister = async (req, res) => {
  try {
    const { user, token } = await register(req.body)

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({ message: 'User registered successfully', token, safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 
      })
      .status(200).json({ message: 'Login successful', token, safeUser })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

const getCurrentUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ user });
};

const handleLogout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  getCurrentUser
}
