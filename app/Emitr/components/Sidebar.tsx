"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus2,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  Sun,
  Bell,
  Wallet,
  Settings,
} from "lucide-react";
// Define your navigation links here for easy management
export const navLinks = [
  {
    name: "Dashboard",
    href: "/Emitr",
    icon: LayoutDashboard,
  },
  {
    name: "New Application",
    href: "/Emitr/NewApplication",
    icon: FilePlus2,
  },
  {
    name: "Pending Applications",
    href: "/Emitr/PendingApplication",
    icon: Clock3,
  },
  {
    name: "Approved Applications",
    href: "/approved-applications",
    icon: CheckCircle2,
  },
  {
    name: "Rejected Applications",
    href: "/rejected-applications",
    icon: XCircle,
  },
  {
    name: "Beneficiary List",
    href: "/beneficiary-list",
    icon: Users,
  },
  {
    name: "Solar Installations",
    href: "/solar-installations",
    icon: Sun,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay with a smooth fade */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100  transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Brand/Logo Area */}
        <div className="flex items-center h-16 px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">

            <span className="text-2xl font-black tracking-tight text-slate-800">
              PORTAL
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 p-2 rounded transition-all duration-200
          ${isActive
                    ? "bg-linear-to-r from-amber-50 to-yellow-50 text-amber-600 text-sm font-semibold  border border-amber-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 text-sm font-semibold border border-transparent"
                  }`}
              >
                <Icon
                  size={16}
                  className={`shrink-0 transition-colors duration-200 ${isActive
                    ? "text-amber-500"
                    : "text-slate-400 group-hover:text-amber-500"
                    }`}
                />

                <span className="truncate">{link.name}</span>

                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Optional: Bottom Footer/User Profile area */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-xs">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800">User</span>
              <span className="text-xs text-slate-500">Emitr Portal</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}