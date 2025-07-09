const axios = require('axios');
const { vehicleRepository } = require('../repositories');

const CARBON_API_KEY = process.env.CARBON_API_KEY;

class VehicleService {
  async getVehicleCarbonEstimate({ distance, distanceUnit, vehicleModelId }) {
    try {
      const response = await axios.post(
        'https://www.carboninterface.com/api/v1/estimates',
        {
          type: 'vehicle',
          distance_unit: distanceUnit,
          distance_value: distance,
          vehicle_model_id: vehicleModelId
        },
        {
          headers: {
            Authorization: `Bearer ${CARBON_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data.attributes.carbon_kg;
    } catch (error) {
      console.error('Carbon API Error:', error?.response?.data || error.message);
      throw new Error('Failed to estimate carbon emissions');
    }
  }

  async addVehicleEntry(data) {
    const { distance, distanceUnit, vehicleModelId, userId } = data;

    const carbonEmitted = await this.getVehicleCarbonEstimate({ distance, distanceUnit, vehicleModelId });

    return await vehicleRepository.createVehicle({
      userId,
      type: vehicleModelId,
      duration: distance,
      carbonEmitted
    });
  }

  async getUserVehicles(userId) {
    return await vehicleRepository.getVehiclesByUser(userId);
  }
}

module.exports = VehicleService;
