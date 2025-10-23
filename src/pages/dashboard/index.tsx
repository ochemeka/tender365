// src/pages/dashboard/index.tsx
import dynamic from "next/dynamic";
import DashboardLayout from "@/layouts/DashboardLayout";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Today's Sales</h3>
              <p className="text-2xl font-semibold">₦ 0.00</p>
            </div>
            <div className="text-blue-500">
              <BarChart3 size={28} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">Inventory Items</h3>
          <p className="text-2xl font-semibold">0</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">Debtors</h3>
          <p className="text-2xl font-semibold">0</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">Staff On Duty</h3>
          <p className="text-2xl font-semibold">0</p>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">Sales Trend</h3>
          <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">Chart placeholder</div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">Recent Sales</h3>
          <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">Table placeholder</div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
