const axios = require('axios');

const CARBON_API_KEY = process.env.CARBON_API_KEY;

const getVehicleMakes = async (req, res) => {
  try {
    const response = await axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', {
      headers: {
        Authorization: `Bearer ${CARBON_API_KEY}`
      }
    });

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("CarbonAPI getMakes Error:", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch vehicle makes" });
  }
};

const getVehicleModelsByMake = async (req, res) => {
  const { makeId } = req.params;

  try {
    const response = await axios.get(`https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`, {
      headers: {
        Authorization: `Bearer ${CARBON_API_KEY}`
      }
    });

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("CarbonAPI getModels Error:", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch vehicle models" });
  }
};

module.exports = {
  getVehicleMakes,
  getVehicleModelsByMake
};
