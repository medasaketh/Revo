"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import type { SliderSetting } from "@/types/settings";

interface SliderPreferenceProps {
  setting: SliderSetting;
  onChange: (value: number) => void;
}

export function SliderPreference({ setting, onChange }: SliderPreferenceProps) {
  const max = setting.options.length - 1;

  return (
    <div className="py-5">
      <div className="mb-1 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{setting.label}</p>
          <p className="mt-1 text-xs text-gray-500">{setting.description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#D4C4A8]/10 px-2.5 py-1 text-xs font-medium text-[#D4C4A8]">
          {setting.options[setting.value]?.label}
        </span>
      </div>

      <div className="mt-4 px-1">
        <Slider
          value={[setting.value]}
          min={0}
          max={max}
          step={1}
          onValueChange={([v]) => onChange(v)}
        />
        <div className="mt-2 flex justify-between">
          {setting.options.map((opt, i) => (
            <span
              key={opt.value}
              className={cn(
                "text-[10px] text-gray-600",
                i === setting.value && "font-medium text-gray-400"
              )}
            >
              {opt.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
