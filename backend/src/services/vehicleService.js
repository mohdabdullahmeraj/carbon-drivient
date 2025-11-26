const axios = require("axios");
const { vehicleRepository } = require("../repositories");

const CARBON_API_KEY = process.env.CARBON_API_KEY;

class VehicleService {
  async getVehicleCarbonEstimate({ distance, distanceUnit, vehicleModelId }) {
    try {
      const response = await axios.post(
        "https://www.carboninterface.com/api/v1/estimates",
        {
          type: "vehicle",
          distance_unit: distanceUnit,
          distance_value: distance,
          vehicle_model_id: vehicleModelId,
        },
        {
          headers: {
            Authorization: `Bearer ${CARBON_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data.attributes;
    } catch (error) {
      console.error(
        "Carbon API Error:",
        error?.response?.data || error.message
      );
      throw new Error("Failed to estimate carbon emissions");
    }
  }

  async addVehicleEntry(data) {
    const {
      distance,
      distanceUnit,
      duration,
      vehicleModelId,
      userId,
      vehicleCategory,
    } = data;

    const estimate = await this.getVehicleCarbonEstimate({
      distance,
      distanceUnit,
      vehicleModelId,
    });

    return await vehicleRepository.createVehicle({
      userId,
      type: vehicleModelId,
      vehicleModel: estimate.vehicle_model,
      make: estimate.vehicle_make,
      distance: distance,
      duration: duration,
      carbonEmitted: estimate.carbon_kg,
      vehicleCategory: vehicleCategory,
    });
  }

  async getUserVehicles(userId) {
    return await vehicleRepository.getVehiclesByUser(userId);
  }

  async updateVehicle(id, data) {
    return await vehicleRepository.updateVehicle(id, data);
  }

  async deleteVehicle(id) {
    return await vehicleRepository.deleteVehicle(id);
  }

  async getVehicleSummary(userId) {
    const allVehicles = await vehicleRepository.getVehiclesByUser(userId);

    if (!allVehicles || allVehicles.length === 0) {
      return {
        totalEmissionKg: 0,
        averageEmissionPerTripKg: 0,
        highestEmissionTrip: null,
        lowestEmissionTrip: null,
      };
    }

    const totalEmission = allVehicles.reduce(
      (sum, v) => sum + v.carbonEmitted,
      0
    );
    const averageEmission = totalEmission / allVehicles.length;

    const sortedByEmission = [...allVehicles].sort(
      (a, b) => a.carbonEmitted - b.carbonEmitted
    );
    const lowestEmissionTrip = sortedByEmission[0];
    const highestEmissionTrip = sortedByEmission[sortedByEmission.length - 1];

    return {
      totalEmissionKg: totalEmission,
      averageEmissionPerTripKg: averageEmission,
      highestEmissionTrip,
      lowestEmissionTrip,
    };
  }
}

module.exports = VehicleService;
