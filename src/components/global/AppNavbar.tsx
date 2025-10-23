// src/components/global/AppNavbar.tsx
"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function AppNavbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center border rounded-md px-2 py-1 bg-gray-50 dark:bg-gray-900">
            <Search size={16} className="text-gray-500 dark:text-gray-300" />
            <input
              className="ml-2 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
              placeholder="Search sales, products, customers..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-0">
                <Avatar>
                  <Avatar.Image src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                  <Avatar.Fallback>{(session?.user?.name || "U").slice(0, 1)}</Avatar.Fallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">{session?.user?.name || session?.user?.email}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
