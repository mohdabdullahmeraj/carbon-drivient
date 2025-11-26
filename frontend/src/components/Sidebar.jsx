import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Car,
  Route,
  BarChart3,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: Home },
  // we’ll add these pages later
  { label: 'Vehicles', to: '/vehicles', icon: Car },
  { label: 'Trips', to: '/trips', icon: Route },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Profile', to: '/profile', icon: User },
];

export default function Sidebar({ onLogout }) {
  return (
    <div className="flex h-full flex-col justify-between p-4 gap-4 w-full">
      {/* Logo */}
      <div>
        <div className="text-2xl font-extrabold tracking-tight text-[#2a5214] mb-6">
          Drivient
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#2a5214] text-white'
                      : 'text-slate-700 hover:bg-[#e0f6c9]'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={onLogout}
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </span>
        </Button>
      </div>
    </div>
  );
}
