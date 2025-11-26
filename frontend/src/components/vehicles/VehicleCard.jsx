import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

export default function VehicleCard({
  id,
  make,
//   modelName,
  carbonEmitted,
  date,
  distance,
  duration,
  vehicleCategory,
  tripPurpose,
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
    <Card className="relative border border-green-100 shadow-md hover:shadow-lg transition">
      <CardHeader className="flex flex-row justify-between items-start space-y-0">
        <div>
          <CardTitle className="text-lg font-semibold">
            {make}
            {/* {modelName && <span className="text-gray-600"> — {modelName}</span>} */}
          </CardTitle>

          {tripPurpose && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit">
              {tripPurpose}
            </span>
          )}
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>

        {/* 3 dot dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert("Feature coming soon!")}>
              Edit Trip
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={handleDelete}
            >
              Delete Trip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <p>
          <strong>{carbonEmitted}</strong> kg CO₂
        </p>
        {distance !== null && <p>Distance: {distance} km</p>}
        {duration !== null && <p>Duration: {duration} min</p>}
        {vehicleCategory && <p>Category: {vehicleCategory}</p>}
      </CardContent>
    </Card>
  );
}
