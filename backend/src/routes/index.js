const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes')
const vehicleRoutes = require('./vehicleRoutes');
const carbonRoutes = require('./carbonRoutes');


router.use('/auth', authRoutes)
router.use('/vehicle', vehicleRoutes);
router.use('/carbon', carbonRoutes);

module.exports = router
