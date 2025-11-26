import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Route, BarChart2 } from "lucide-react";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { toast } from "sonner";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch summary + vehicles
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
        setVehicles(vehiclesRes.data.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // ───────────────────────────────────────────────
  // AI Insight Calculations
  // ───────────────────────────────────────────────

  const now = new Date();

  const isInLastNDays = (dateString, days) => {
    const d = new Date(dateString);
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays < days;
  };

  // Trips last 7 days
  const last7Trips = vehicles.filter((v) => isInLastNDays(v.createdAt, 7));

  // Weekly trends
  const prev7Trips = vehicles.filter((v) => {
    const d = new Date(v.createdAt);
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays >= 7 && diffDays < 14;
  });

  const sumEm = (list) =>
    list.reduce((sum, t) => sum + (t.carbonEmitted || 0), 0);

  const last7Emission = sumEm(last7Trips);
  const prev7Emission = sumEm(prev7Trips);

  let weeklyTrend = "Not enough data to compare weeks yet.";
  if (last7Emission > 0 && prev7Emission > 0) {
    const diff = last7Emission - prev7Emission;
    const percent = Math.round((Math.abs(diff) / prev7Emission) * 100);
    if (diff > 0) weeklyTrend = `Your emissions increased by ${percent}% this week.`;
    else if (diff < 0)
      weeklyTrend = `Nice! Your emissions decreased by ${percent}% this week.`;
    else weeklyTrend = "Your emissions stayed the same as last week.";
  } else if (last7Emission > 0) {
    weeklyTrend = "You started logging trips this week — great start!";
  }

  // Category insight
  const categoryTotals = vehicles.reduce((acc, v) => {
    const cat = v.vehicleCategory || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + (v.carbonEmitted || 0);
    return acc;
  }, {});

  const topCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    null;

  const categoryText = topCategory
    ? `Most of your emissions come from ${topCategory} trips.`
    : "No category insights yet — add some trips.";

  // Tag insight
  const tagTotals = vehicles.reduce((acc, v) => {
    if (!v.tripPurpose) return acc;
    acc[v.tripPurpose] = (acc[v.tripPurpose] || 0) + (v.carbonEmitted || 0);
    return acc;
  }, {});

  const topTag =
    Object.entries(tagTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const tagText = topTag
    ? `You emit the most CO₂ on “${topTag}” trips.`
    : "Tag your trips to discover which purpose emits the most.";

  // Streak insight
  const streakText =
    last7Trips.length > 0
      ? `You logged ${last7Trips.length} trip${
          last7Trips.length > 1 ? "s" : ""
        } this week.`
      : "You haven't logged trips in the last 7 days.";

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#286109] mb-2">
        Welcome back 👋
      </h1>
      <p className="text-slate-600 mb-10">
        Here’s your sustainability overview.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

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

        <Card>
          <CardHeader>
            <CardTitle>Trees Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.floor(((summary?.totalEmissionKg ?? 0) / 21) * 100) / 100}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trips This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{last7Trips.length}</p>
          </CardContent>
        </Card>

      </div>

      {/* AI Insights */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700 text-[15px] leading-relaxed">
          <p>📈 {weeklyTrend}</p>
          <p>🚗 {categoryText}</p>
          <p>🏷️ {tagText}</p>
          <p>📅 {streakText}</p>
        </CardContent>
      </Card>

      {/* Quick Actions Section */}
      <h2 className="text-2xl font-semibold text-[#286109] mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Trips */}
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => (window.location.href = "/trips")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route size={20} /> View Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            See and manage all your logged trips.
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => (window.location.href = "/analytics")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 size={20} /> Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            Explore trends and your emission breakdown.
          </CardContent>
        </Card>

        {/* Add Trip */}
        <Card
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => setShowModal(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus size={20} /> Add Trip
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            Log a new trip and calculate emissions.
          </CardContent>
        </Card>

      </div>

      {/* Dialog */}
      {showModal && (
        <AddVehicleDialog
          open={showModal}
          onOpenChange={setShowModal}
          onVehicleAdded={(v) => {
            setVehicles((prev) => [...prev, v]);
            toast.success("Trip added successfully!");
          }}
        />
      )}
    </div>
  );
}
