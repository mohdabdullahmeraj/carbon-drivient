const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonController');

// Public routes
router.get('/vehicle_makes', carbonController.getVehicleMakes);
router.get('/vehicle_makes/:makeId/models', carbonController.getVehicleModelsByMake);

module.exports = router;
