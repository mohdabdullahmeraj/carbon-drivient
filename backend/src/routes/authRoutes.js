const express = require('express')
const { handleRegister, handleLogin, getCurrentUser, handleLogout } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', handleLogout);

module.exports = router
