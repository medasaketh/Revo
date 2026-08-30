"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWardrobe } from "@/hooks/useWardrobe";
import {
  buildCategoryCounts,
  buildWardrobeInsights,
  buildWardrobeStats,
} from "@/lib/wardrobe/mappers";
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
import { ItemFormModal } from "@/components/wardrobe/ItemFormModal";
import { UseInOutfitModal } from "@/components/wardrobe/UseInOutfitModal";
import { WardrobeEmptyState } from "@/components/wardrobe/WardrobeEmptyState";
import {
  WardrobeAiPlaceholders,
  WardrobeInsightsCards,
} from "@/components/wardrobe/WardrobeInsights";
import { FloatingActionButton } from "@/components/wardrobe/FloatingActionButton";
import type { WardrobeItemInput } from "@/schemas/wardrobe";
import type {
  WardrobeCategory,
  WardrobeItem,
  WardrobePageData,
  WardrobeSort,
  WardrobeViewMode,
} from "@/types/wardrobe";

interface WardrobeContentProps {
  config: Omit<WardrobePageData, "items">;
}

export function WardrobeContent({ config }: WardrobeContentProps) {
  const {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    logOutfit,
  } = useWardrobe();

  const [activeCategory, setActiveCategory] = useState<WardrobeCategory>("all");
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [activeOccasion, setActiveOccasion] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<WardrobeSort>("recent");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<WardrobeViewMode>("grid");
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editItem, setEditItem] = useState<WardrobeItem | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [outfitOpen, setOutfitOpen] = useState(false);
  const [outfitAnchor, setOutfitAnchor] = useState<WardrobeItem | null>(null);

  const categories = useMemo(
    () => buildCategoryCounts(items, config),
    [items, config]
  );
  const overviewStats = useMemo(() => buildWardrobeStats(items, config), [items, config]);
  const insights = useMemo(() => buildWardrobeInsights(items), [items]);

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
      const colorFilter = config.colors.find((c) => c.id === activeColor);
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
    config.colors,
  ]);

  const openAddModal = () => {
    setFormMode("add");
    setEditItem(null);
    setFormOpen(true);
  };

  const openEditModal = (item: WardrobeItem) => {
    setFormMode("edit");
    setEditItem(item);
    setFormOpen(true);
  };

  const handleSave = async (input: WardrobeItemInput) => {
    if (formMode === "edit" && editItem) {
      const updated = await updateItem(editItem.id, input);
      if (selectedItem?.id === editItem.id) {
        setSelectedItem(updated);
      }
    } else {
      await createItem(input);
    }
  };

  const openOutfitModal = (item: WardrobeItem) => {
    setOutfitAnchor(item);
    setOutfitOpen(true);
  };

  const handleLogOutfit = async (input: Parameters<typeof logOutfit>[0]) => {
    const result = await logOutfit(input);
    if (selectedItem) {
      const updated = result.updatedItems.find((i) => i.id === selectedItem.id);
      if (updated) setSelectedItem(updated);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setSelectedItem(null);
      toast.success("Item deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    setSelectedItem((prev) =>
      prev?.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev
    );
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 rounded-3xl bg-[#111111]" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-[#111111]" />
          ))}
        </div>
        <div className="h-12 rounded-2xl bg-[#111111]" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-[#111111]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 pb-24 lg:pb-8">
        <WardrobeHeader header={config.header} onAddItem={openAddModal} />
        <WardrobeStatsCards stats={overviewStats} />
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
                categories={categories}
                seasons={config.seasons}
                occasions={config.occasions}
                colors={config.colors}
                sortOptions={config.sortOptions}
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
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        <WardrobeInsightsCards insights={insights} />
        <WardrobeAiPlaceholders features={config.aiFeatures} />
      </div>

      <ItemDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleFavorite={handleToggleFavorite}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onUseInOutfit={openOutfitModal}
      />

      <UseInOutfitModal
        open={outfitOpen}
        anchorItem={outfitAnchor}
        items={items}
        occasions={config.occasions}
        onClose={() => setOutfitOpen(false)}
        onLog={handleLogOutfit}
      />

      <ItemFormModal
        open={formOpen}
        mode={formMode}
        editItem={editItem}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        steps={config.addItemSteps}
        seasons={config.seasons}
        occasions={config.occasions}
        categories={categories}
      />

      <FloatingActionButton onAddItem={openAddModal} />
    </>
  );
}
