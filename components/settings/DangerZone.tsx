"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DangerZoneProps {
  title: string;
  description: string;
  buttonLabel: string;
  onAction: () => void;
}

export function DangerZone({
  title,
  description,
  buttonLabel,
  onAction,
}: DangerZoneProps) {
  return (
    <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-300">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-red-400/70">
            {description}
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 border-red-900/50 text-red-400 hover:border-red-700 hover:bg-red-950/40 hover:text-red-300"
            onClick={onAction}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
