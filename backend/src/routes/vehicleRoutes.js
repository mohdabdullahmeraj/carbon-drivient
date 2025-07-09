const express = require('express');
const VehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const vehicleController = new VehicleController();

// Protected route
router.post('/add', authMiddleware, vehicleController.addVehicle);

module.exports = router;
