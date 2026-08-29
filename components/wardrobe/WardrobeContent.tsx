"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Menu, Plus, Search, Shirt } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardLayout } from "@/components/dashboard/DashboardShell";
import { WardrobeItemCard } from "@/components/wardrobe/WardrobeItemCard";
import { cn } from "@/lib/utils";
import type { WardrobeCategory, WardrobePageData } from "@/types/wardrobe";

interface WardrobeContentProps {
  data: WardrobePageData;
}

export function WardrobeContent({ data }: WardrobeContentProps) {
  const { openMobileMenu } = useDashboardLayout();
  const [activeCategory, setActiveCategory] =
    useState<WardrobeCategory>("all");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return data.items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.color.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, data.items, search]);

  return (
    <div className="space-y-8">
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
              className="mb-3 inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-white lg:hidden"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4C4A8]/10 ring-1 ring-[#D4C4A8]/20">
                <Shirt className="h-5 w-5 text-[#D4C4A8]" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  My Wardrobe
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {data.stats.totalItems} items in your digital closet
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() =>
            toast.message("Add item coming soon", {
              description: "Wardrobe uploads will connect to the backend later.",
            })
          }
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {data.categories.slice(1).map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl border border-[#222222] bg-[#111111] p-4 text-center"
          >
            <p className="text-2xl font-light text-white">{cat.count}</p>
            <p className="mt-1 text-xs text-gray-500">{cat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === cat.id
                  ? "bg-white text-[#090909]"
                  : "border border-[#222222] bg-[#111111] text-gray-400 hover:border-[#333] hover:text-white"
              )}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="pl-11"
          />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-dashed border-[#222222] bg-[#111111] py-16 text-center"
        >
          <Shirt className="mx-auto h-10 w-10 text-gray-600" />
          <p className="mt-4 text-sm text-gray-400">No items match your search.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item, index) => (
            <WardrobeItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
