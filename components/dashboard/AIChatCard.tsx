"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardCard, SectionHeader } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { ChatPrompt } from "@/types/dashboard";

interface AIChatCardProps {
  placeholder: string;
  suggestions: string[];
  prompts: ChatPrompt[];
}

export function AIChatCard({ placeholder, suggestions, prompts }: AIChatCardProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    toast.message("AI chat coming soon", {
      description: "This is a UI preview — backend integration is next.",
    });
    setQuery("");
  };

  const handlePrompt = (label: string) => {
    setQuery(label);
    toast.message("Prompt selected", { description: label });
  };

  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} id="ai-chat">
      <DashboardCard>
        <SectionHeader
          title="AI Stylist"
          subtitle="Your personal fashion intelligence assistant"
        />

        <div className="space-y-3 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-4">
          {suggestions.map((suggestion, i) => (
            <div
              key={suggestion}
              className={`flex gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  i % 2 === 0
                    ? "bg-[#111111] text-gray-300"
                    : "bg-white/10 text-white"
                }`}
              >
                {suggestion}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handlePrompt(prompt.label)}
              className="rounded-full border border-[#1f1f1f] bg-[#0a0a0a] px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-[#D4C4A8]/30 hover:text-[#D4C4A8]"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4C4A8]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-12 rounded-2xl border-[#1f1f1f] bg-[#0a0a0a] pl-11 pr-4"
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" size="icon" className="h-12 w-12 shrink-0">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        </form>
      </DashboardCard>
    </motion.div>
  );
}
