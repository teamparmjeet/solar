"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { baseapi } from "@/app/constants/api";
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
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { forceLogout } from "@/app/utils/logout";
import { useState } from "react";
export const navLinks = [
  {
    name: "Dashboard",
    href: "/Emitr",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    icon: FilePlus2,
    children: [
      {
        name: "New Application",
        href: "/Emitr/NewApplication",
      },
      {
        name: "Pending Applications",
        href: "/Emitr/PendingApplication",
      },
      {
        name: "Submitted Applications",
        href: "/Emitr/submitted-applications",
      },
      {
        name: "Feasibility Approved",
        href: "/Emitr/feasibility-approved",
      },
      {
        name: "Vendor Assigned",
        href: "/Emitr/vendor-assigned",
      },
      {
        name: "Installed Systems",
        href: "/Emitr/installed",
      },
      {
        name: "Net Metered",
        href: "/Emitr/net-metered",
      },
      {
        name: "Commissioned Systems",
        href: "/Emitr/commissioned",
      },
      {
        name: "Subsidy Released",
        href: "/Emitr/subsidy-released",
      },
      {
        name: "Rejected Applications",
        href: "/Emitr/rejected-applications",
      },
    ],
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
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<string | null>("");

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
            const Icon = link.icon;

            if (link.children) {
              return (
                <div key={link.name}>
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === link.name ? null : link.name
                      )
                    }
                    className="w-full flex border-b border-slate-200 items-center justify-between gap-3 p-2   text-slate-600 hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{link.name}</span>
                    </div>

                    {openMenu === link.name ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  {openMenu === link.name && (
                    <div className="ml-6 mt-1 space-y-1">
                      {link.children.map((child) => {
                        const isActive =
                          pathname === child.href;

                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center p-2   text-sm transition-all
                      ${isActive
                                ? "bg-amber-50 text-amber-600 border-b border-amber-100"
                                : "text-slate-600 border-b border-slate-200 hover:bg-slate-50   text-sm"
                              }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href!}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 p-2   transition-all
          ${isActive
                    ? "bg-amber-50 text-amber-600 border-b border-amber-100"
                    : "text-slate-600 border-b border-slate-200 hover:bg-slate-50  "
                  }`}
              >
                <Icon size={16} />
                <span>{link.name}</span>
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
          <button
            onClick={forceLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}