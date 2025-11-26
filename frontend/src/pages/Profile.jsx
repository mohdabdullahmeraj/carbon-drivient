import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
    
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
    
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      toast.error('Logout failed. Please try again.');
      console.error("Logout failed", err);
    }
  };

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

//   // Pick Badge
//   let badge = { label: "Eco Starter", color: "bg-green-600" };
//   if (totalEmission > 500)
//     badge = { label: "Frequent Traveler", color: "bg-red-600" };
//   else if (totalEmission > 100)
//     badge = { label: "Conscious Driver", color: "bg-amber-600" };

  const memberSince = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">

      {/* User Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="text-xl font-semibold">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
              <div className="text-xs text-gray-500 mt-1">
                Member since {memberSince}
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        {/* <CardContent>
          <Badge className={`${badge.color} text-white px-3 py-1`}>
            {badge.label}
          </Badge>
        </CardContent> */}
      </Card>

    
      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>App Info</CardTitle>
        </CardHeader>

        <CardContent className="text-sm space-y-1">
          <p><strong>Name:</strong> Drivient</p>
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Device:</strong> {navigator.userAgent}</p>
        </CardContent>
      </Card>

      {/* Logout */}
      <div className="pt-4">
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );
}
