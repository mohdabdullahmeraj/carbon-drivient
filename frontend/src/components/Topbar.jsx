import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

export default function Topbar({ onLogout }) {
  const location = useLocation();
  const labels = {
    "/dashboard": "Dashboard",
    "/trips": "Trips",
    "/analytics": "Analytics",
    "/profile": "Profile",
  };

  const title = labels[location.pathname] || "Drivient";
  return (
    <header className="flex items-center justify-between border-b bg-white/80 px-4 py-3 md:px-6">
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-2">
        {/* Mobile sidebar trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar onLogout={onLogout} />
            </SheetContent>
          </Sheet>
        </div>

        <span className="text-lg font-semibold text-[#2a5214]">{title}</span>
      </div>

      {/* Right: avatar + dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline text-sm font-medium">User</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
