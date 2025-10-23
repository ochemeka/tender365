// src/components/global/AppSidebar.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  FileText,
  CreditCard,
  Users,
  UserCog,
  BarChart3,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MENU = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "POS", path: "/dashboard/pos", icon: ShoppingCart },
  { label: "Inventory", path: "/dashboard/inventory", icon: Boxes },
  { label: "Accounting", path: "/dashboard/accounting", icon: FileText },
  { label: "Credit System", path: "/dashboard/credit", icon: CreditCard },
  { label: "Customers", path: "/dashboard/customers", icon: Users },
  { label: "Staff & Payroll", path: "/dashboard/staff", icon: UserCog },
  { label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const v = localStorage.getItem("tender365:sidebar-collapsed");
    setCollapsed(v === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem("tender365:sidebar-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <aside
      className={`flex flex-col h-screen transition-all duration-200 border-r bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
            T
          </div>
          {!collapsed && <span className="font-semibold text-lg">Tender365</span>}
        </Link>

        <Button
          size="sm"
          variant="ghost"
          className="p-1"
          onClick={() => setCollapsed((s) => !s)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <Separator />

      <nav className="flex-1 overflow-auto pt-4">
        <ul className="flex flex-col gap-1 px-1">
          {MENU.map((m) => {
            const Icon = m.icon;
            const active = pathname === m.path || pathname?.startsWith(m.path + "/");
            return (
              <li key={m.path}>
                <Link
                  href={m.path}
                  className={`flex items-center gap-3 py-2 px-3 rounded-md mx-2 transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <span className="flex-none">
                    <Icon size={18} />
                  </span>
                  {!collapsed && <span className="truncate">{m.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4">
        <Separator />
        <div className="mt-3 flex items-center justify-between gap-2">
          {!collapsed && <span className="text-xs text-muted-foreground">v0.1.0</span>}
          <div className="ml-auto">
            <Button size="sm" variant="ghost" onClick={() => setCollapsed((s) => !s)}>
              <Menu size={16} />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
