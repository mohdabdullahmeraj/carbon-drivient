import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddVehicleModal({ onClose, onVehicleAdded }) {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/carbon/vehicle_makes")
      .then((res) => {
        const formattedMakes = res.data.data.map((item) => ({
          id: item.data.id,
          name: item.data.attributes.name,
        }));
        setMakes(formattedMakes);
      })
      .catch((err) => console.error("Error fetching makes:", err));
  }, []);

  const handleMakeChange = (e) => {
    const makeId = e.target.value;
    setSelectedMake(makeId);
    setSelectedModel("");
    setModels([]);

    axios
      .get(`http://localhost:3000/carbon/vehicle_makes/${makeId}/models`)
      .then((res) => {
        const formattedModels = res.data.data.map((item) => ({
          id: item.data.id,
          name: item.data.attributes.name,
        }));
        setModels(formattedModels);
      })
      .catch((err) => console.error("Error fetching models:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      vehicleModelId: selectedModel,
      distance: parseFloat(distance),
      distanceUnit: "km",
      duration: parseFloat(duration),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/vehicle/add",
        payload,
        { withCredentials: true }
      );

      const selectedMakeObj = makes.find((m) => m.id === selectedMake);
      const selectedModelObj = models.find((m) => m.id === selectedModel);

      onVehicleAdded({
        ...res.data.data,
        make: selectedMakeObj?.name,
        modelName: selectedModelObj?.name,
      });

      onClose();
    } catch (err) {
      console.error("Failed to add vehicle:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Make
            </label>
            <select
              value={selectedMake}
              onChange={handleMakeChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Make</option>
              {makes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Distance (in km)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="Enter distance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (in mins)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="Enter duration"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
