import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';
import AddVehicleModal from '../components/AddVehicleModal';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, vehiclesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/vehicle/summary', {
            withCredentials: true,
          }),
          axios.get('http://localhost:3000/api/vehicle/my', {
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
              console.error('Error fetching model:', err);
              return vehicle;
            }
          })
        );

        setVehicles(enrichedVehicles);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
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
    await axios.post(
      'http://localhost:3000/api/auth/logout',
      {},
      { withCredentials: true }
    );
    navigate('/');
  } catch (err) {
    console.error('Logout failed', err);
  }
};

  const categoryData = vehicles.reduce((acc, v) => {
    const cat = v.vehicleCategory || 'Unknown';
    if (!acc[cat]) {
      acc[cat] = { emission: 0, distance: 0 };
    }
    acc[cat].emission += v.carbonEmitted || 0;
    acc[cat].distance += v.distance || 0;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([category, values]) => ({
    name: category,
    value: values.emission,
  }));

  const barChartData = Object.entries(categoryData).map(([category, values]) => ({
    name: category,
    Emissions: values.emission,
    Distance: values.distance,
  }));

  const scatterChartData = vehicles.map((v) => ({
    duration: v.duration || 0,
    emission: v.carbonEmitted || 0,
  }));

  return (
    <div
      className="bg-[#f1ffe4] min-h-screen font-sans"
      style={{ fontFamily: 'Poppins, Inter, Nunito, sans-serif' }}
    >
      <header className="fixed top-0 left-0 w-full z-50 bg-[#2a5214] shadow-md py-4 px-8 flex justify-between items-center">
  <div className="text-[#ffffff] text-3xl font-extrabold tracking-tight">
    Drivient
  </div>
  <nav>
    <ul className="flex space-x-6 text-[#ffffff] font-medium">
      <li>
        <button
          onClick={handleLogout}
          className="hover:text-[#c2ff94] transition"
        >
          Logout
        </button>
      </li>
    </ul>
  </nav>
</header>


      <div className="max-w-6xl mx-auto px-6 pt-32 pb-10">
        <h1 className="text-4xl font-extrabold text-[#286109] mb-8 text-center">
          Welcome to Your Dashboard
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#d8ffbe] mb-10">
          <h4 className="text-lg font-semibold mb-4 text-[#286109]">
            Trip Duration vs Emissions
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="duration" name="Duration (min)" unit=" min" />
              <YAxis dataKey="emission" name="Emissions" unit=" kg CO₂" />
              <Tooltip />
              <Legend />
              <Scatter name="Trips" data={scatterChartData} fill="#7ED957" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#d8ffbe]">
            <h4 className="text-lg font-semibold mb-4 text-[#286109]">
              Emissions by Vehicle Category
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#7ED957"
                  label
                >
                  {pieChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ['#7ED957', '#a2d685', '#4CAF50', '#C8E6C9', '#81C784'][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#d8ffbe]">
            <h4 className="text-lg font-semibold mb-4 text-[#286109]">
              Emissions & Distance by Category
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Emissions" fill="#468723" />
                <Bar dataKey="Distance" fill="#a2d685" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#d8ffbe] text-center">
              <h2 className="text-lg font-semibold text-[#286109]">Total Emissions</h2>
              <p className="text-2xl font-bold">{summary.totalEmissionKg ?? 0} kg CO₂</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#d8ffbe] text-center">
              <h2 className="text-lg font-semibold text-[#286109]">Average Emissions</h2>
              <p className="text-2xl font-bold">
                {summary.averageEmissionPerTripKg ?? 0} kg CO₂
              </p>
            </div>
          </div>
        )}

        {summary && (
          <div className="text-center mb-10">
            <span className="text-lg font-semibold text-[#286109]">
              To neutralize your impact,{' '}
              <span className="text-2xl font-bold">
                {Math.floor(((summary?.totalEmissionKg ?? 0) / 21) * 100) / 100}
              </span>{' '}
              trees would be needed 🌳
            </span>
          </div>
        )}

        {summary?.highestEmissionTrip && (
          <div className="bg-white p-4 rounded-2xl shadow border border-[#d8ffbe] text-center text-sm mb-2">
            🚗 <strong>Highest Emission Trip:</strong>{' '}
            {summary.highestEmissionTrip.carbonEmitted} kg CO₂ | Duration:{' '}
            {summary.highestEmissionTrip.duration}min | Distance:{' '}
            {summary.highestEmissionTrip.distance}km
          </div>
        )}
        {summary?.lowestEmissionTrip && (
          <div className="bg-white p-4 rounded-2xl shadow border border-[#d8ffbe] text-center text-sm mb-8">
            🌿 <strong>Lowest Emission Trip:</strong>{' '}
            {summary.lowestEmissionTrip.carbonEmitted} kg CO₂ | Duration:{' '}
            {summary.lowestEmissionTrip.duration}min | Distance:{' '}
            {summary.lowestEmissionTrip.distance}km
          </div>
        )}

        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#286109]">Your Vehicles</h3>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#468723] text-white rounded-xl hover:bg-[#3b6226] transition-all duration-200"
            >
              + Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
