"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import type { NavItem } from "@/types/dashboard";

interface DashboardLayoutContextValue {
  openMobileMenu: () => void;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextValue | null>(
  null
);

export function useDashboardLayout() {
  const ctx = useContext(DashboardLayoutContext);
  if (!ctx) {
    throw new Error("useDashboardLayout must be used within DashboardShell");
  }
  return ctx;
}

interface DashboardShellProps {
  children: React.ReactNode;
  navigation: NavItem[];
}

export function DashboardShell({ children, navigation }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DashboardLayoutContext.Provider
      value={{ openMobileMenu: () => setMobileOpen(true) }}
    >
      <div className="min-h-screen bg-[#090909] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#D4C4A8]/5 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <Sidebar
          navigation={navigation}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <main
          className={cn(
            "relative min-h-screen transition-[padding] duration-300",
            collapsed ? "lg:pl-20" : "lg:pl-[260px]"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </DashboardLayoutContext.Provider>
  );
}
