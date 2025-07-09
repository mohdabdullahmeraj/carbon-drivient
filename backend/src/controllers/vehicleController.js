const VehicleService = require('../services/vehicleService');

class VehicleController {
  constructor() {
    this.vehicleService = new VehicleService();
    this.updateVehicle = this.updateVehicle.bind(this);
    this.deleteVehicle = this.deleteVehicle.bind(this);
    this.getVehicleSummary = this.getVehicleSummary.bind(this);
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

  updateVehicle = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await this.vehicleService.updateVehicle(id, updateData);

      if (result[0] === 0) {
        return res.status(404).json({ message: "Vehicle not found or not updated" });
      }

      res.status(200).json({ message: "Vehicle updated successfully" });
    } catch (error) {
      console.error("UpdateVehicle Error:", error.message);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };

  deleteVehicle = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.vehicleService.deleteVehicle(id);

      if (!deleted) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      console.error("DeleteVehicle Error:", error.message);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };

  getVehicleSummary = async (req, res) => {
    try {
      const userId = req.user.id;
      const summary = await this.vehicleService.getVehicleSummary(userId);

      res.status(200).json({ data: summary });
    } catch (error) {
      console.error("GetVehicleSummary Error:", error.message);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };



}

module.exports = VehicleController;
