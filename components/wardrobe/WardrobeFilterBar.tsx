"use client";

import { cn } from "@/lib/utils";
import type {
  WardrobeCategory,
  WardrobeFilterOption,
  WardrobePageData,
  WardrobeSort,
} from "@/types/wardrobe";

interface WardrobeFilterBarProps {
  categories: WardrobePageData["categories"];
  seasons: WardrobeFilterOption[];
  occasions: WardrobeFilterOption[];
  colors: WardrobePageData["colors"];
  sortOptions: WardrobeFilterOption[];
  activeCategory: WardrobeCategory;
  activeSeason: string | null;
  activeOccasion: string | null;
  activeColor: string | null;
  activeSort: WardrobeSort;
  favoritesOnly: boolean;
  onCategoryChange: (id: WardrobeCategory) => void;
  onSeasonChange: (id: string | null) => void;
  onOccasionChange: (id: string | null) => void;
  onColorChange: (id: string | null) => void;
  onSortChange: (id: WardrobeSort) => void;
  onFavoritesToggle: () => void;
}

function FilterChip({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
        active
          ? "bg-white text-[#090909]"
          : "border border-[#202020] bg-[#111111] text-gray-400 hover:border-[#333] hover:text-white"
      )}
    >
      {label}
      {count !== undefined && (
        <span className="ml-1 opacity-60">({count})</span>
      )}
    </button>
  );
}

export function WardrobeFilterBar({
  categories,
  seasons,
  occasions,
  colors,
  sortOptions,
  activeCategory,
  activeSeason,
  activeOccasion,
  activeColor,
  activeSort,
  favoritesOnly,
  onCategoryChange,
  onSeasonChange,
  onOccasionChange,
  onColorChange,
  onSortChange,
  onFavoritesToggle,
}: WardrobeFilterBarProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#202020] bg-[#111111] p-4">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              label={cat.label}
              count={cat.count}
              active={activeCategory === cat.id}
              onClick={() => onCategoryChange(cat.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
          Season
        </p>
        <div className="flex flex-wrap gap-2">
          {seasons.map((s) => (
            <FilterChip
              key={s.id}
              label={s.label}
              active={activeSeason === s.id}
              onClick={() =>
                onSeasonChange(activeSeason === s.id ? null : s.id)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
          Occasion
        </p>
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <FilterChip
              key={o.id}
              label={o.label}
              active={activeOccasion === o.id}
              onClick={() =>
                onOccasionChange(activeOccasion === o.id ? null : o.id)
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.label}
                onClick={() =>
                  onColorChange(activeColor === c.id ? null : c.id)
                }
                className={cn(
                  "h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-[#111111] transition-all",
                  activeColor === c.id
                    ? "ring-[#D4C4A8]"
                    : "ring-transparent hover:ring-[#333]"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value as WardrobeSort)}
            className="rounded-xl border border-[#202020] bg-[#0a0a0a] px-3 py-2 text-xs text-white focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <FilterChip
            label="Favorites"
            active={favoritesOnly}
            onClick={onFavoritesToggle}
          />
        </div>
      </div>
    </div>
  );
}
