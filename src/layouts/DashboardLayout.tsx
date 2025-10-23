"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">My Dashboard</h2>
        <nav className="space-y-2">
          <a className="block text-sm hover:underline" href="/dashboard">Overview</a>
          <a className="block text-sm hover:underline" href="/dashboard/sales">Sales</a>
          <a className="block text-sm hover:underline" href="/dashboard/inventory">Inventory</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
