import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { toast } from "sonner";

export default function Trips() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

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

  // Fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const vehiclesRes = await axios.get(
          "http://localhost:3000/api/vehicle/my",
          { withCredentials: true }
        );

        // Enrich model data
        const enriched = await Promise.all(
          vehiclesRes.data.data.map(async (v) => {
            if (!v.vehicleModelId) return v;

            try {
              const modelRes = await axios.get(
                `http://localhost:3000/carbon/vehicle_models/${v.vehicleModelId}`
              );

              const model = modelRes.data.data;

              return {
                ...v,
                make: model?.data?.attributes?.vehicle_make,
                modelName: model?.data?.attributes?.name,
              };
            } catch (e) {
              console.error("Error model fetch:", e);
              return v;
            }
          })
        );

        setVehicles(enriched);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }

      setLoading(false);
    };

    fetchTrips();
  }, []);

  // Filter based on tag
  const filteredVehicles =
    selectedTag === "All"
      ? vehicles
      : vehicles.filter((v) => v.tripPurpose === selectedTag);

  // Compute last 7 days count
  const now = new Date();

  const isInLast7Days = (dateString) => {
    const d = new Date(dateString);
    const diffMs = now - d;
    return diffMs / (1000 * 60 * 60 * 24) < 7;
  };

  const last7 = vehicles.filter((v) => isInLast7Days(v.createdAt));
  const last7Count = last7.length;

  // Export CSV function (same as Dashboard)
  const downloadCSV = () => {
    if (!vehicles || vehicles.length === 0) {
      toast.error("No data available to export.");
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

    let csvContent = headers.join(",") + "\n";
    rows.forEach((r) => (csvContent += r.join(",") + "\n"));

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "drivient_trips.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exported successfully!");
  };

  const handleDeleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast.success("Trip deleted");
  };

  const handleVehicleAdded = (newVehicle) => {
    setVehicles((prev) => [...prev, newVehicle]);
    setShowDialog(false);
    toast.success("Trip added!");
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2a5214]">Trips</h1>
        <p className="text-slate-600 mt-1">
          Track and manage all your travel logs.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Last 7 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">
            📅 {last7Count > 0
              ? `You logged ${last7Count} ${last7Count > 1 ? "trips" : "trip"}`
              : "No trips logged in the last 7 days."}
          </p>
        </CardContent>
      </Card>

      {/* Filters + Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Tag Filter */}
        <div>
          <label className="text-sm font-medium">Filter by Tag:</label>
          <select
            className="border rounded p-2 ml-2"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="All">All</option>
            {tags.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Export CSV */}
        <Button variant="outline" onClick={downloadCSV}>
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>

        {/* Add Trip */}
        <Button
          className="bg-green-600 text-white"
          onClick={() => setShowDialog(true)}
        >
          <Plus size={16} className="mr-1" />
          Add Trip
        </Button>
      </div>

      {/* Trip List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Trips</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading trips...</p>
          ) : filteredVehicles.length === 0 ? (
            <p>No trips found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  {...vehicle}
                  onDelete={handleDeleteVehicle}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Trip Dialog */}
      <AddVehicleDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onVehicleAdded={handleVehicleAdded}
      />
    </div>
  );
}
