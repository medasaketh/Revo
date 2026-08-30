"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DEFAULT_WARDROBE_IMAGE } from "@/lib/wardrobe/mappers";
import { WardrobeImagePicker } from "@/components/wardrobe/WardrobeImagePicker";
import { WardrobeItemImage } from "@/components/wardrobe/WardrobeItemImage";
import type { WardrobeItemInput } from "@/schemas/wardrobe";
import type { WardrobeFilterOption, WardrobeItem, WardrobePageData } from "@/types/wardrobe";

export interface ItemFormValues {
  name: string;
  category: string;
  brand: string;
  color: string;
  colorHex: string;
  imageUrl: string;
  fabric: string;
  price: string;
  purchaseDate: string;
  fitNotes: string;
  selectedSeasons: string[];
  selectedOccasions: string[];
}

const emptyForm: ItemFormValues = {
  name: "",
  category: "tops",
  brand: "",
  color: "",
  colorHex: "#888888",
  imageUrl: "",
  fabric: "",
  price: "",
  purchaseDate: "",
  fitNotes: "",
  selectedSeasons: [],
  selectedOccasions: [],
};

function itemToForm(item: WardrobeItem): ItemFormValues {
  return {
    name: item.name,
    category: item.category,
    brand: item.brand,
    color: item.color,
    colorHex: item.colorHex,
    imageUrl: item.imageUrl === DEFAULT_WARDROBE_IMAGE ? "" : item.imageUrl,
    fabric: item.fabric ?? "",
    price: item.price ? String(item.price) : "",
    purchaseDate: item.purchaseDate ?? "",
    fitNotes: item.fitNotes ?? "",
    selectedSeasons: [...item.season],
    selectedOccasions: [...item.occasions],
  };
}

function formToInput(form: ItemFormValues): WardrobeItemInput {
  return {
    name: form.name.trim(),
    category: form.category as WardrobeItemInput["category"],
    brand: form.brand.trim() || null,
    color: form.color.trim() || null,
    colorHex: form.colorHex || "#888888",
    imageUrl: form.imageUrl.trim() || null,
    fabric: form.fabric.trim() || null,
    season: form.selectedSeasons as WardrobeItemInput["season"],
    occasions: form.selectedOccasions as WardrobeItemInput["occasions"],
    price: form.price ? Number(form.price) : null,
    purchaseDate: form.purchaseDate.trim() || null,
    fitNotes: form.fitNotes.trim() || null,
  };
}

interface ItemFormModalProps {
  open: boolean;
  mode: "add" | "edit";
  editItem?: WardrobeItem | null;
  onClose: () => void;
  onSave: (input: WardrobeItemInput) => Promise<void>;
  steps: string[];
  seasons: WardrobeFilterOption[];
  occasions: WardrobeFilterOption[];
  categories: WardrobePageData["categories"];
}

export function ItemFormModal({
  open,
  mode,
  editItem,
  onClose,
  onSave,
  steps,
  seasons,
  occasions,
  categories,
}: ItemFormModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ItemFormValues>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStep(mode === "edit" ? 1 : 0);
      setForm(editItem ? itemToForm(editItem) : emptyForm);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mode, editItem]);

  const toggleArray = (
    key: "selectedSeasons" | "selectedOccasions",
    id: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter((v) => v !== id)
        : [...prev[key], id],
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Item name is required");
      setStep(1);
      return;
    }

    setSaving(true);
    try {
      await onSave(formToInput(form));
      toast.success(mode === "edit" ? "Item updated" : "Item saved");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const title = mode === "edit" ? "Edit Clothing Item" : "Add Clothing Item";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-[#202020] bg-[#111111] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#202020] px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-xs text-gray-500">
                  Step {step + 1} of {steps.length} — {steps[step]}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-gray-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-1 px-6 pt-4">
              {steps.map((label, i) => (
                <div
                  key={label}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= step ? "bg-[#D4C4A8]" : "bg-[#202020]"
                  )}
                />
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {step === 0 && (
                <WardrobeImagePicker
                  value={form.imageUrl}
                  onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
                  disabled={saving}
                />
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-gray-500">
                      Item Name *
                    </label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="White Linen Shirt"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-gray-500">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                      className="w-full rounded-2xl border border-[#202020] bg-[#0a0a0a] px-4 py-3 text-sm text-white"
                    >
                      {categories
                        .filter((c) => c.id !== "all")
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-gray-500">
                      Brand
                    </label>
                    <Input
                      value={form.brand}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, brand: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">
                        Color
                      </label>
                      <Input
                        value={form.color}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, color: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-gray-500">
                        Price (₹)
                      </label>
                      <Input
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, price: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-gray-500">
                      Fabric
                    </label>
                    <Input
                      value={form.fabric}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fabric: e.target.value }))
                      }
                      placeholder="Cotton, Linen, Denim..."
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-gray-500">
                      Purchase Date
                    </label>
                    <Input
                      value={form.purchaseDate}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          purchaseDate: e.target.value,
                        }))
                      }
                      placeholder="Mar 2025"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-gray-500">Season</p>
                    <div className="flex flex-wrap gap-2">
                      {seasons.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleArray("selectedSeasons", s.id)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-xs",
                            form.selectedSeasons.includes(s.id)
                              ? "bg-white text-[#090909]"
                              : "border border-[#202020] text-gray-400"
                          )}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="mb-3 text-xs text-gray-500">Occasions</p>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => toggleArray("selectedOccasions", o.id)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs",
                          form.selectedOccasions.includes(o.id)
                            ? "bg-[#D4C4A8]/20 text-[#D4C4A8]"
                            : "border border-[#202020] text-gray-400"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="rounded-2xl border border-[#202020] bg-[#0a0a0a] p-5 text-center">
                  <div className="relative mx-auto mb-4 h-28 w-24 overflow-hidden rounded-2xl">
                    <WardrobeItemImage
                      src={form.imageUrl || DEFAULT_WARDROBE_IMAGE}
                      alt={form.name || "New item"}
                      sizes="96px"
                    />
                  </div>
                  <p className="font-medium text-white">
                    {form.name || "New Item"}
                  </p>
                  <p className="mt-1 text-sm capitalize text-gray-500">
                    {form.brand || "—"} · {form.category} · {form.color || "—"}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-[#202020] p-4">
              {step > 0 ? (
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={saving}
                >
                  Back
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancel
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button
                  className="flex-1"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={saving}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : mode === "edit" ? "Update Item" : "Save Item"}
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** @deprecated Use ItemFormModal */
export { ItemFormModal as AddItemModal };
