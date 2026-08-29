"use client";

import Link from "next/link";
import { Menu, MoreHorizontal, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardLayout } from "@/components/dashboard/DashboardShell";
import type { WardrobePageData } from "@/types/wardrobe";

interface WardrobeHeaderProps {
  header: WardrobePageData["header"];
  onAddItem: () => void;
}

export function WardrobeHeader({ header, onAddItem }: WardrobeHeaderProps) {
  const { openMobileMenu } = useDashboardLayout();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={openMobileMenu}
          className="mt-1 rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <Link
            href="/dashboard"
            className="mb-3 inline-flex text-xs text-gray-500 transition-colors hover:text-white lg:hidden"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {header.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{header.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" disabled title="Coming soon">
          <Upload className="h-4 w-4" />
          Import Photos
        </Button>
        <Button variant="secondary" size="icon" className="h-10 w-10" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button onClick={onAddItem}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
