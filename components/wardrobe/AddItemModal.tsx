"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ImagePlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { WardrobeFilterOption, WardrobePageData } from "@/types/wardrobe";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  steps: string[];
  seasons: WardrobeFilterOption[];
  occasions: WardrobeFilterOption[];
  categories: WardrobePageData["categories"];
}

export function AddItemModal({
  open,
  onClose,
  steps,
  seasons,
  occasions,
  categories,
}: AddItemModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    category: "tops",
    brand: "",
    color: "",
    fabric: "",
    selectedSeasons: [] as string[],
    selectedOccasions: [] as string[],
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStep(0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSave = () => {
    toast.success("Item saved (preview)", {
      description: "Backend integration coming soon.",
    });
    onClose();
  };

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
                <h2 className="text-lg font-semibold">Add Clothing Item</h2>
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
              {steps.map((_, i) => (
                <div
                  key={steps[i]}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= step ? "bg-[#D4C4A8]" : "bg-[#202020]"
                  )}
                />
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {step === 0 && (
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl border border-dashed border-[#D4C4A8]/30 bg-[#D4C4A8]/5">
                    <ImagePlus className="h-10 w-10 text-[#D4C4A8]" />
                  </div>
                  <p className="text-sm text-gray-400">
                    Drag & drop or upload a photo of your item
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button variant="secondary" size="sm">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Camera className="h-4 w-4" />
                      Camera
                    </Button>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline hover:text-white"
                    onClick={() => setStep(1)}
                  >
                    Skip image for now
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-gray-500">
                      Item Name
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
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#D4C4A8]/10">
                    <ImagePlus className="h-8 w-8 text-[#D4C4A8]" />
                  </div>
                  <p className="font-medium text-white">
                    {form.name || "New Item"}
                  </p>
                  <p className="mt-1 text-sm capitalize text-gray-500">
                    {form.brand} · {form.category} · {form.color || "—"}
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
                >
                  Back
                </Button>
              ) : (
                <Button variant="secondary" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button className="flex-1" onClick={() => setStep((s) => s + 1)}>
                  Continue
                </Button>
              ) : (
                <Button className="flex-1" onClick={handleSave}>
                  Save Item
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
