import React from "react";
import axios from "axios";

export default function VehicleCard({
  make,
  modelName,
  carbonEmitted,
  date,
  distance,
  duration,
  vehicleCategory,
  id,
  onDelete,
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/vehicle/${id}`, {
        withCredentials: true,
      });
      onDelete(id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-1 border relative">
      <h4 className="font-bold text-lg capitalize">
        {make} {modelName}
      </h4>
      <p className="text-sm text-gray-600">Date: {date}</p>
      <p className="text-sm">
        Emissions: <strong>{carbonEmitted} kg CO₂</strong>
      </p>
      {distance != null && <p className="text-sm">Distance: {distance} km</p>}
      {duration && <p className="text-sm">Duration: {duration} min</p>}
      {vehicleCategory && (
        <p className="text-sm">Vehicle Category: {vehicleCategory}</p>
      )}

      <div className="flex gap-2 mt-2">
        <button
          className="text-sm px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          onClick={() => alert("Edit logic coming soon")}
        >
          Edit
        </button>
        <button
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
