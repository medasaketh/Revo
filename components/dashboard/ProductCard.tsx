"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardCard, SectionHeader } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { ProductSuggestion } from "@/types/dashboard";

interface ProductCardProps {
  product: ProductSuggestion;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="w-[220px] shrink-0 snap-start sm:w-[240px]"
    >
      <div className="overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] transition-colors hover:border-[#333]">
        <div className="relative aspect-[4/5]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="240px"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500">{product.brand}</p>
          <p className="mt-1 font-medium text-white">{product.name}</p>
          <p className="mt-1 text-sm text-[#D4C4A8]">
            {product.currency}
            {product.price.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-xs text-gray-500">{product.reason}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full"
            onClick={() =>
              toast.message("Shopping coming soon", { description: product.name })
            }
          >
            View
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface ShoppingSuggestionsProps {
  products: ProductSuggestion[];
}

export function ShoppingSuggestions({ products }: ShoppingSuggestionsProps) {
  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.25 }} id="shopping">
      <DashboardCard>
        <SectionHeader
          title="Shopping Suggestions"
          subtitle="Curated picks that match your wardrobe"
        />
        <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-2 snap-x snap-mandatory scrollbar-thin">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </DashboardCard>
    </motion.div>
  );
}
