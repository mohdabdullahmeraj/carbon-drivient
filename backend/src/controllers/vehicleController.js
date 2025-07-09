const VehicleService = require('../services/vehicleService');

class VehicleController {
  constructor() {
    this.vehicleService = new VehicleService();
  }

  addVehicle = async (req, res) => {
    try {
      const userId = req.user.id; // assuming you have middleware that attaches user to req
      const { vehicleModelId, distance, distanceUnit } = req.body;

      if (!vehicleModelId || !distance || !distanceUnit) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const vehicle = await this.vehicleService.addVehicleEntry({
        userId,
        vehicleModelId,
        distance,
        distanceUnit
      });

      res.status(201).json({ message: "Vehicle entry added", data: vehicle });

    } catch (error) {
      console.error("VehicleController Error:", error.message);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  }
  
  getUserVehicles = async (req, res) => {
    try {
      const userId = req.user.id;
      const vehicles = await this.vehicleService.getUserVehicles(userId);
      res.status(200).json({ data: vehicles });
    } catch (error) {
      console.error("GetUserVehicles Error:", error.message);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };

}

module.exports = VehicleController;
