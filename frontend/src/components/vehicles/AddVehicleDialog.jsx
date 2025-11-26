import { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function AddVehicleDialog({
  open,
  onOpenChange,
  onVehicleAdded,
}) {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [tag, setTag] = useState("");

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
  const categories = [
    "Sedan",
    "Hatchback",
    "SUV",
    "Crossover",
    "Coupe",
    "Convertible",
    "Pickup Truck",
    "Minivan",
    "Van",
    "Motorbike",
    "Electric Car",
    "Hybrid Car",
    "Luxury Car",
    "Sports Car",
    "Commercial Truck",
    "Bus",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/carbon/vehicle_makes")
      .then((res) => {
        const formatted = res.data.data.map((item) => ({
          id: item.data.id,
          name: item.data.attributes.name,
        }));
        setMakes(formatted);
      })
      .catch((err) => console.error("Error fetching makes:", err));
  }, []);

  useEffect(() => {
    if (!selectedMake) return;

    axios
      .get(`http://localhost:3000/carbon/vehicle_makes/${selectedMake}/models`)
      .then((res) => {
        const formatted = res.data.data.map((item) => ({
          id: item.data.id,
          name: item.data.attributes.name,
        }));
        setModels(formatted);
      })
      .catch((err) => console.error("Error fetching models:", err));
  }, [selectedMake]);

  const handleSubmit = async () => {
    const payload = {
      vehicleModelId: selectedModel,
      vehicleCategory,
      distance: parseFloat(distance),
      distanceUnit: "km",
      duration: parseFloat(duration),
      tripPurpose: tag,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/vehicle/add",
        payload,
        { withCredentials: true }
      );

      const makeObj = makes.find((m) => m.id === selectedMake);
      const modelObj = models.find((m) => m.id === selectedModel);

      onVehicleAdded({
        ...res.data.data,
        make: makeObj?.name,
        modelName: modelObj?.name,
        vehicleCategory,
      });

      onOpenChange(false);
    } catch (err) {
      console.error("Failed to add vehicle:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-6 bg-white shadow-xl border border-[#d8ffbe]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#286109]">
            Add New Trip
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-5">
          {/* Vehicle Section */}
          <div className="p-4 bg-[#f1ffe4] rounded-2xl border border-[#d8ffbe] shadow-sm space-y-4">
            <h3 className="font-semibold text-[#286109] text-sm">
              Vehicle Details
            </h3>

            {/* Vehicle Make */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-[#286109]">
                Vehicle Make
              </Label>
              <Select onValueChange={setSelectedMake}>
                <SelectTrigger className="h-11 rounded-xl border border-[#d8ffbe] bg-white">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make.id} value={make.id}>
                      {make.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Model */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-[#286109]">
                Vehicle Model
              </Label>
              <Select onValueChange={setSelectedModel}>
                <SelectTrigger className="h-11 rounded-xl border border-[#d8ffbe] bg-white">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Category */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-[#286109]">
                Vehicle Category
              </Label>
              <Select onValueChange={setVehicleCategory}>
                <SelectTrigger className="h-11 rounded-xl border border-[#d8ffbe] bg-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trip Section */}
          <div className="p-4 bg-[#f1ffe4] rounded-2xl border border-[#d8ffbe] shadow-sm space-y-4">
            <h3 className="font-semibold text-[#286109] text-sm">
              Trip Details
            </h3>

            {/* Trip Tag */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-[#286109]">
                Trip Tag
              </Label>

              <Select value={tag} onValueChange={setTag} required>
                <SelectTrigger className="h-11 rounded-xl border border-[#d8ffbe] bg-white">
                  <SelectValue placeholder="Select Tag" />
                </SelectTrigger>

                <SelectContent>
                  {tags.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Distance */}
              <div className="space-y-1">
                <Label className="text-sm font-medium text-[#286109]">
                  Distance (km)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 12"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="h-11 rounded-xl border border-[#d8ffbe] bg-white"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <Label className="text-sm font-medium text-[#286109]">
                  Duration (min)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 20"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-11 rounded-xl border border-[#d8ffbe] bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border-[#286109] text-[#286109] hover:bg-[#e4ffd3]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-xl bg-[#286109] hover:bg-[#1f4d0b]"
          >
            Add Trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
