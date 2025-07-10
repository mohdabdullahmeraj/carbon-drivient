import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import AddVehicleModal from "../components/AddVehicleModal";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, vehiclesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/vehicle/summary", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/vehicle/my", {
            withCredentials: true,
          }),
        ]);

        setSummary(summaryRes.data.data);

        const enrichedVehicles = await Promise.all(
          vehiclesRes.data.data.map(async (vehicle) => {
            if (!vehicle.vehicleModelId) return vehicle;
            try {
              const modelRes = await axios.get(
                `http://localhost:3000/carbon/vehicle_models/${vehicle.vehicleModelId}`
              );
              const model = modelRes.data.data;

              return {
                ...vehicle,
                make: model?.data?.attributes?.vehicle_make,
                modelName: model?.data?.attributes?.name,
              };
            } catch (err) {
              console.error("Error fetching model:", err);
              return vehicle;
            }
          })
        );

        setVehicles(enrichedVehicles);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prev) => [...prev, newVehicle]);
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h1 className="text-4xl font-bold mb-6 text-pastel-accent">
        Welcome to Your Dashboard
      </h1>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-pastel-section rounded-lg p-4 text-center shadow">
            <h2 className="text-lg font-semibold">Total Emissions</h2>
            <p className="text-2xl font-bold">
              {summary?.totalEmissionKg ?? 0} kg CO₂
            </p>
          </div>
          <div className="bg-pastel-section rounded-lg p-4 text-center shadow">
            <h2 className="text-lg font-semibold">Average Emissions</h2>
            <p className="text-2xl font-bold">
              {summary?.averageEmissionPerTripKg ?? 0} kg CO₂
            </p>
          </div>
          <div className="bg-pastel-section rounded-lg p-4 text-center shadow">
            <h2 className="text-lg font-semibold">Trees Saved</h2>
            <p className="text-2xl font-bold">
              {((summary?.totalEmissionKg ?? 0) / 21).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {summary?.highestEmissionTrip && (
        <div className="bg-white p-4 rounded shadow text-sm">
          <p>
            🚗 <strong>Highest Emission Trip:</strong>{" "}
            {summary.highestEmissionTrip.carbonEmitted} kg CO₂ | Duration:{" "}
            {summary.highestEmissionTrip.duration}h
          </p>
        </div>
      )}

      {summary?.lowestEmissionTrip && (
        <div className="bg-white p-4 rounded shadow text-sm mt-2">
          <p>
            🌿 <strong>Lowest Emission Trip:</strong>{" "}
            {summary.lowestEmissionTrip.carbonEmitted} kg CO₂ | Duration:{" "}
            {summary.lowestEmissionTrip.duration}h
          </p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Your Vehicles</h3>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Vehicle
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vehicles.map((vehicle, idx) => (
            <VehicleCard
              key={idx}
              make={vehicle.make}
              modelName={vehicle.modelName}
              carbonEmitted={vehicle.carbonEmitted}
              date={new Date(vehicle.createdAt).toLocaleDateString()}
              distance={vehicle.distance}
              duration={vehicle.duration}
              id={vehicle.id}
              onDelete={(id) =>
                setVehicles((prev) => prev.filter((v) => v.id !== id))
              }
            />
          ))}
        </div>
      </div>

      {showModal && (
        <AddVehicleModal
          onClose={() => setShowModal(false)}
          onVehicleAdded={handleVehicleAdded}
        />
      )}
    </div>
  );
}
