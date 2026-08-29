"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WardrobeHeader } from "@/components/wardrobe/WardrobeHeader";
import { WardrobeStatsCards } from "@/components/wardrobe/WardrobeStatsCards";
import { WardrobeSearchBar } from "@/components/wardrobe/WardrobeSearchBar";
import { WardrobeFilterBar } from "@/components/wardrobe/WardrobeFilterBar";
import {
  WardrobeViewToggle,
  getGridClassName,
} from "@/components/wardrobe/WardrobeViewToggle";
import { WardrobeItemCard } from "@/components/wardrobe/WardrobeItemCard";
import { ItemDrawer } from "@/components/wardrobe/ItemDrawer";
import { AddItemModal } from "@/components/wardrobe/AddItemModal";
import { WardrobeEmptyState } from "@/components/wardrobe/WardrobeEmptyState";
import {
  WardrobeAiPlaceholders,
  WardrobeInsightsCards,
} from "@/components/wardrobe/WardrobeInsights";
import { FloatingActionButton } from "@/components/wardrobe/FloatingActionButton";
import type {
  WardrobeCategory,
  WardrobeItem,
  WardrobePageData,
  WardrobeSort,
  WardrobeViewMode,
} from "@/types/wardrobe";

interface WardrobeContentProps {
  data: WardrobePageData;
}

export function WardrobeContent({ data: initialData }: WardrobeContentProps) {
  const [items, setItems] = useState(initialData.items);
  const [activeCategory, setActiveCategory] = useState<WardrobeCategory>("all");
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [activeOccasion, setActiveOccasion] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<WardrobeSort>("recent");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<WardrobeViewMode>("grid");
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== "all") count++;
    if (activeSeason) count++;
    if (activeOccasion) count++;
    if (activeColor) count++;
    if (favoritesOnly) count++;
    if (activeSort !== "recent") count++;
    return count;
  }, [
    activeCategory,
    activeSeason,
    activeOccasion,
    activeColor,
    favoritesOnly,
    activeSort,
  ]);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSeason =
        !activeSeason || item.season.includes(activeSeason as never);
      const matchesOccasion =
        !activeOccasion || item.occasions.includes(activeOccasion as never);
      const colorFilter = initialData.colors.find((c) => c.id === activeColor);
      const matchesColor =
        !colorFilter ||
        item.color.toLowerCase() === colorFilter.label.toLowerCase();
      const matchesFavorites = !favoritesOnly || item.isFavorite;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.color.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return (
        matchesCategory &&
        matchesSeason &&
        matchesOccasion &&
        matchesColor &&
        matchesFavorites &&
        matchesSearch
      );
    });

    switch (activeSort) {
      case "most-worn":
        result = [...result].sort((a, b) => b.timesWorn - a.timesWorn);
        break;
      case "favorites":
        result = [...result].sort(
          (a, b) => Number(b.isFavorite) - Number(a.isFavorite)
        );
        break;
      case "never-worn":
        result = result.filter((i) => i.timesWorn === 0);
        break;
      default:
        result = [...result].sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        );
    }

    return result;
  }, [
    items,
    activeCategory,
    activeSeason,
    activeOccasion,
    activeColor,
    favoritesOnly,
    search,
    activeSort,
    initialData.colors,
  ]);

  const toggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    setSelectedItem((prev) =>
      prev?.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev
    );
  };

  const openAddModal = () => setAddModalOpen(true);

  return (
    <>
      <div className="space-y-8 pb-24 lg:pb-8">
        <WardrobeHeader header={initialData.header} onAddItem={openAddModal} />
        <WardrobeStatsCards stats={initialData.overviewStats} />
        <WardrobeSearchBar value={search} onChange={setSearch} />

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setFiltersOpen((open) => !open)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {filtersOpen ? "Hide Filters" : "Show Filters"}
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-[#D4C4A8]/20 px-1.5 py-0.5 text-[10px] font-medium text-[#D4C4A8]">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                filtersOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <WardrobeFilterBar
                categories={initialData.categories}
                seasons={initialData.seasons}
                occasions={initialData.occasions}
                colors={initialData.colors}
                sortOptions={initialData.sortOptions}
                activeCategory={activeCategory}
                activeSeason={activeSeason}
                activeOccasion={activeOccasion}
                activeColor={activeColor}
                activeSort={activeSort}
                favoritesOnly={favoritesOnly}
                onCategoryChange={setActiveCategory}
                onSeasonChange={setActiveSeason}
                onOccasionChange={setActiveOccasion}
                onColorChange={setActiveColor}
                onSortChange={setActiveSort}
                onFavoritesToggle={() => setFavoritesOnly((f) => !f)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
          </p>
          <WardrobeViewToggle value={view} onChange={setView} />
        </div>

        {items.length === 0 ? (
          <WardrobeEmptyState onAddItem={openAddModal} />
        ) : filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#202020] bg-[#111111] py-16 text-center text-sm text-gray-400">
            No items match your filters.
          </div>
        ) : (
          <div className={getGridClassName(view)}>
            {filteredItems.map((item, index) => (
              <WardrobeItemCard
                key={item.id}
                item={item}
                index={index}
                view={view}
                onSelect={setSelectedItem}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <WardrobeInsightsCards insights={initialData.insights} />
        <WardrobeAiPlaceholders features={initialData.aiFeatures} />
      </div>

      <ItemDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleFavorite={toggleFavorite}
      />

      <AddItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        steps={initialData.addItemSteps}
        seasons={initialData.seasons}
        occasions={initialData.occasions}
        categories={initialData.categories}
      />

      <FloatingActionButton onAddItem={openAddModal} />
    </>
  );
}
