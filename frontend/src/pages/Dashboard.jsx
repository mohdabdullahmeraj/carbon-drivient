import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import AddVehicleModal from "../components/AddVehicleModal";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="bg-[#FFF5E4] min-h-screen font-sans">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#FFF5E4] shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-[#FF9494] text-3xl font-extrabold tracking-tight">
          Drivient
        </div>
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <button
                className="logout-button hover:text-[#FF9494] transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div
        className="bg-[#FFF5E4] max-w-5xl mx-auto p-6 mt-10"
        style={{ fontFamily: "Poppins, Inter, Nunito, sans-serif" }}
      >
        <h1 className="text-4xl font-bold mt-13 mb-6 text-[#FF9494]">
          Welcome to Your Dashboard
        </h1>

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8  ">
            <div className="bg-[#ffffff] rounded-lg p-4 text-center shadow">
              <h2 className="text-lg font-semibold">Total Emissions</h2>
              <p className="text-2xl font-bold">
                {summary?.totalEmissionKg ?? 0} kg CO₂
              </p>
            </div>
            <div className="bg-[#ffffff] rounded-lg p-4 text-center shadow">
              <h2 className="text-lg font-semibold">Average Emissions</h2>
              <p className="text-2xl font-bold">
                {summary?.averageEmissionPerTripKg ?? 0} kg CO₂
              </p>
            </div>
          </div>
        )}

        {summary && (
          <div className="text-center mb-6">
            <span className="text-lg font-semibold text-green-700">
              To neutralize your impact,{" "}
              <span className="text-2xl font-bold">
                {Math.floor(((summary?.totalEmissionKg ?? 0) / 21) * 100) / 100}
              </span>{" "}
              trees would be needed 🌳
            </span>
          </div>
        )}

        {summary?.highestEmissionTrip && (
          <div className="bg-white p-4 rounded shadow text-sm text-center">
            <p>
              🚗 <strong>Highest Emission Trip:</strong>{" "}
              {summary.highestEmissionTrip.carbonEmitted} kg CO₂ | Duration:{" "}
              {summary.highestEmissionTrip.duration}min | Distance:{" "}
              {summary.highestEmissionTrip.distance}km
            </p>
          </div>
        )}

        {summary?.lowestEmissionTrip && (
          <div className="bg-white p-4 rounded shadow text-sm mt-2 text-center">
            <p>
              🌿 <strong>Lowest Emission Trip:</strong>{" "}
              {summary.lowestEmissionTrip.carbonEmitted} kg CO₂ | Duration:{" "}
              {summary.lowestEmissionTrip.duration}min | Distance:{" "}
              {summary.highestEmissionTrip.distance}km
            </p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-8 mt-8">
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
                vehicleCategory={vehicle.vehicleCategory}
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
    </div>
  );
}
