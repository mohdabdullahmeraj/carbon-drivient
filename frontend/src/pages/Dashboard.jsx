import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
  LineChart,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { toast } from "sonner";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { getWeeklyTrend } from "@/utils/groupByWeek";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const weeklyTrend = getWeeklyTrend(vehicles);
  const [selectedTag, setSelectedTag] = useState("All");
  const tags = [
    "Work",
    "Commute",
    "Personal",
    "Shopping",
    "Travel",
    "Family",
    "Medical",
    "Gym",
    "Leisure",
  ];
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

      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredVehicles =
    selectedTag === "All"
      ? vehicles
      : vehicles.filter((v) => v.tripPurpose === selectedTag);

  const refreshSummary = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/vehicle/summary", {
        withCredentials: true,
      });
      setSummary(res.data.data);
    } catch (err) {
      console.error("Error refreshing summary:", err);
    }
  };

  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prev) => [...prev, newVehicle]);
    refreshSummary(); // ⬅️ FIXES CHARTS
    setShowModal(false);
  };

  const handleDeleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    refreshSummary(); // <-- FIXES CHARTS
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Time helpers
  const now = new Date();

  const isInLastNDays = (dateString, days) => {
    const d = new Date(dateString);
    const diffMs = now - d;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays < days;
  };

  const isBetweenDaysAgo = (dateString, fromDays, toDays) => {
    const d = new Date(dateString);
    const diffMs = now - d;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= fromDays && diffDays < toDays;
  };

  // Split trips by time windows
  const last7DaysTrips = vehicles.filter((v) => isInLastNDays(v.createdAt, 7));

  const prev7DaysTrips = vehicles.filter((v) =>
    isBetweenDaysAgo(v.createdAt, 7, 14)
  );

  // Sum emissions
  const sumEmission = (trips) =>
    trips.reduce((sum, t) => sum + (t.carbonEmitted || 0), 0);

  const last7Emission = sumEmission(last7DaysTrips);
  const prev7Emission = sumEmission(prev7DaysTrips);

  // Compute % change
  let trendText = "Not enough data to compare weeks yet.";
  if (last7Emission > 0 && prev7Emission > 0) {
    const diff = last7Emission - prev7Emission;
    const percent = Math.round((Math.abs(diff) / prev7Emission) * 100);
    if (diff > 0) {
      trendText = `Your emissions increased by ${percent}% compared to the previous week.`;
    } else if (diff < 0) {
      trendText = `Nice! Your emissions decreased by ${percent}% compared to the previous week.`;
    } else {
      trendText =
        "Your emissions stayed the same compared to the previous week.";
    }
  } else if (last7Emission > 0 && prev7Emission === 0) {
    trendText = "You started tracking trips this week. Keep going!";
  }

  // Category with highest emissions
  const categoryTotals = vehicles.reduce((acc, v) => {
    const cat = v.vehicleCategory || "Unknown";
    acc[cat] = (acc[cat] || 0) + (v.carbonEmitted || 0);
    return acc;
  }, {});

  let topCategory = null;
  let topCategoryEmission = 0;
  Object.entries(categoryTotals).forEach(([cat, total]) => {
    if (total > topCategoryEmission) {
      topCategoryEmission = total;
      topCategory = cat;
    }
  });

  const categoryText = topCategory
    ? `Most of your emissions come from ${topCategory} trips.`
    : "No category insights yet — add some trips.";

  // Tag with highest emissions
  const tagTotals = vehicles.reduce((acc, v) => {
    if (!v.tripPurpose) return acc;
    acc[v.tripPurpose] = (acc[v.tripPurpose] || 0) + (v.carbonEmitted || 0);
    return acc;
  }, {});

  let topTag = null;
  let topTagEmission = 0;
  Object.entries(tagTotals).forEach(([tag, total]) => {
    if (total > topTagEmission) {
      topTagEmission = total;
      topTag = tag;
    }
  });

  const tagText = topTag
    ? `You emit the most CO₂ on "${topTag}" trips.`
    : "Tag your trips to see where most of your emissions come from.";

  // Last 7 days trip count
  const last7TripCount = last7DaysTrips.length;
  const streakText =
    last7TripCount > 0
      ? `You logged ${last7TripCount} trip${
          last7TripCount > 1 ? "s" : ""
        } in the last 7 days.`
      : "You haven't logged any trips in the last 7 days.";

  const categoryData = filteredVehicles.reduce((acc, v) => {
    const cat = v.vehicleCategory || "Unknown";
    if (!acc[cat]) {
      acc[cat] = { emission: 0, distance: 0 };
    }
    acc[cat].emission += v.carbonEmitted || 0;
    acc[cat].distance += v.distance || 0;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(
    ([category, values]) => ({
      name: category,
      value: values.emission,
    })
  );

  const barChartData = Object.entries(categoryData).map(
    ([category, values]) => ({
      name: category,
      Emissions: values.emission,
      Distance: values.distance,
    })
  );

  const scatterChartData = filteredVehicles.map((v) => ({
    duration: v.duration || 0,
    emission: v.carbonEmitted || 0,
  }));

  const downloadCSV = () => {
    if (!vehicles || vehicles.length === 0) {
      alert("No vehicle data to export");
      return;
    }

    const headers = [
      "Make",
      "Model",
      "Category",
      "Tag",
      "Distance (km)",
      "Duration (min)",
      "Carbon Emitted (kg)",
      "Date",
    ];

    const rows = vehicles.map((v) => [
      v.make || "N/A",
      v.modelName || "N/A",
      v.vehicleCategory || "N/A",
      v.tripPurpose || "N/A",
      v.distance || 0,
      v.duration || 0,
      v.carbonEmitted || 0,
      new Date(v.createdAt).toLocaleDateString(),
    ]);

    // Convert to CSV string
    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    // Create blob file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "drivient_trips.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <div
      className="bg-[#f1ffe4] min-h-screen font-sans"
      style={{ fontFamily: "Poppins, Inter, Nunito, sans-serif" }}
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
        <div className="mb-6 flex items-center gap-4">
          <label className="font-medium">Filter by Tag:</label>

          <select
            className="border rounded p-2"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="All">All</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {summary?.totalEmissionKg ?? 0} kg CO₂
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {summary?.averageEmissionPerTripKg ?? 0} kg CO₂
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {summary && (
          <div className="text-center mb-2">
            <span className="text-lg font-semibold text-[#286109]">
              🌳To neutralize your impact,{" "}
              {/* <span className="text-2xl font-bold"> */}
              {Math.floor(((summary?.totalEmissionKg ?? 0) / 21) * 100) / 100}
              {/* </span>{" "} */} trees would be needed
            </span>
          </div>
        )}

        <div className="text-center mb-2">
          <span className="text-lg font-semibold text-[#286109]">
            📈 {trendText}
          </span>
        </div>
        <div className="text-center mb-2">
          <span className="text-lg font-semibold text-[#286109]">
            🚗 {categoryText}
          </span>
        </div>

        <div className="text-center mb-2">
          <span className="text-lg font-semibold text-[#286109]">
            🏷️ {tagText}
          </span>
        </div>

        <div className="text-center mb-10">
          <span className="text-lg font-semibold text-[#286109]">
            📅 {streakText}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {summary?.highestEmissionTrip && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🚗 Highest Emission Trip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <strong>{summary.highestEmissionTrip.carbonEmitted}</strong>{" "}
                  kg CO₂
                </p>
                <p>Duration: {summary.highestEmissionTrip.duration} min</p>
                <p>Distance: {summary.highestEmissionTrip.distance} km</p>
              </CardContent>
            </Card>
          )}

          {summary?.lowestEmissionTrip && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌿 Lowest Emission Trip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <strong>{summary.lowestEmissionTrip.carbonEmitted}</strong> kg
                  CO₂
                </p>
                <p>Duration: {summary.lowestEmissionTrip.duration} min</p>
                <p>Distance: {summary.lowestEmissionTrip.distance} km</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Weekly Emission Trend</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#3b7a1d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trip Duration vs Emissions</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Emissions by Category</CardTitle>
            </CardHeader>
            <CardContent>
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
                          [
                            "#7ED957",
                            "#a2d685",
                            "#4CAF50",
                            "#C8E6C9",
                            "#81C784",
                          ][index % 5]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emissions & Distance by Category</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>

        <Card className="mt-10">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Your Trips</CardTitle>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={downloadCSV}
                className="px-4 py-2 flex items-center gap-2 "
              >
                <Download size={16} />
                Export CSV
              </Button>
              <Button
              variant="outline"
                onClick={() => setShowModal(true)}
                className="px-4 py-2 flex items-center gap-2 bg-green-600 text-white"
              >
                <Plus size={16} />
                Add Vehicle
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, idx) => (
                <VehicleCard
                  key={idx}
                  {...vehicle}
                  onDelete={handleDeleteVehicle}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {showModal && (
          <AddVehicleDialog
            open={showModal}
            onOpenChange={setShowModal}
            onVehicleAdded={handleVehicleAdded}
          />
        )}
      </div>
    </div>
  );
}
