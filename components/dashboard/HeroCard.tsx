"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Droplets, MapPin, Sparkles, Sun, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { DashboardWeather, StyleBrief } from "@/types/dashboard";

interface HeroCardProps {
  weather: DashboardWeather;
  styleBrief: StyleBrief;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Sun,
  rainy: Droplets,
  "partly-cloudy": Sun,
} as const;

export function HeroCard({ weather, styleBrief }: HeroCardProps) {
  const WeatherIcon = weatherIcons[weather.icon] ?? Sun;

  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
      <DashboardCard className="relative overflow-hidden p-0">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#D4C4A8]">
                {styleBrief.headline}
              </p>

              <div className="mt-6 flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4 text-[#D4C4A8]" />
                <span className="text-sm">{weather.city}</span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-light tracking-tight sm:text-6xl">
                  {weather.temperature}°{weather.unit}
                </span>
                <div className="mb-2 flex items-center gap-2 text-gray-400">
                  <WeatherIcon className="h-5 w-5 text-amber-400" />
                  <span>{weather.condition}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Droplets className="h-4 w-4" />
                  {weather.humidity}% humidity
                </span>
                <span className="flex items-center gap-1.5">
                  <Wind className="h-4 w-4" />
                  {weather.windSpeed} {weather.windUnit}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3 border-t border-[#1f1f1f] pt-6">
              <p className="font-medium text-white">{styleBrief.summary}</p>
              <p className="text-sm leading-relaxed text-gray-400">
                {styleBrief.recommendation}
              </p>
            </div>

            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                {styleBrief.ctaLabel}
              </Button>
            </motion.div>
          </div>

          <div className="relative min-h-[280px] lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4C4A8]/10 via-transparent to-violet-500/10" />
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728dc230b?w=800&h=1000&fit=crop"
              alt="Fashion editorial"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#111111] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
}
