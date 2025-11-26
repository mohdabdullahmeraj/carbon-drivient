import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { getWeeklyTrend } from "@/utils/groupByWeek";
import EmissionAreaChart from "@/components/analytics/EmissionAreaChart";

export default function Analytics() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const vehiclesRes = await axios.get(
          "http://localhost:3000/api/vehicle/my",
          { withCredentials: true }
        );

        // Enrich with make/model (same as before)
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
            } catch (err) {
              console.error("Error fetching model:", err);
              return v;
            }
          })
        );

        setVehicles(enriched);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // --- Derived data for charts ---

  const weeklyTrend = getWeeklyTrend(vehicles);

  const categoryData = vehicles.reduce((acc, v) => {
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

  const scatterChartData = vehicles.map((v) => ({
    duration: v.duration || 0,
    emission: v.carbonEmitted || 0,
  }));

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2a5214]">Analytics</h1>
        <p className="text-slate-600 mt-1">
          Dive deep into your driving emissions and activity trends.
        </p>
      </div>

      {loading ? (
        <p>Loading analytics...</p>
      ) : vehicles.length === 0 ? (
        <p>No trip data available yet. Add some trips to see analytics.</p>
      ) : (
        <>
          {/* Weekly Trend */}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Weekly Emission Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <EmissionAreaChart data={weeklyTrend} />
            </CardContent>
          </Card>

          {/* Scatter: Duration vs Emissions */}
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
                  <Scatter
                    name="Trips"
                    data={scatterChartData}
                    fill="#7ED957"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category charts */}
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
        </>
      )}
    </div>
  );
}
