"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface WardrobeSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function WardrobeSearchBar({
  value,
  onChange,
  placeholder = "Search clothing...",
}: WardrobeSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 pl-11"
      />
      <p className="mt-2 text-xs text-gray-600">
        Search by name, color, brand, or category
      </p>
    </div>
  );
}
