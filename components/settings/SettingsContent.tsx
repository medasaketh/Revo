"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, Monitor, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleRow } from "@/components/shared/ToggleRow";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { useDashboardLayout } from "@/components/dashboard/DashboardShell";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { SettingsCard, SelectField } from "@/components/settings/SettingsCard";
import { SliderPreference } from "@/components/settings/SliderPreference";
import { DangerZone } from "@/components/settings/DangerZone";
import type { SettingsData } from "@/types/settings";

interface SettingsContentProps {
  data: SettingsData;
}

export function SettingsContent({ data: initialData }: SettingsContentProps) {
  const { openMobileMenu } = useDashboardLayout();
  const [data, setData] = useState(initialData);
  const [activeCategory, setActiveCategory] = useState("general");
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "danger";
  } | null>(null);

  const updateNotification = (id: string, enabled: boolean) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, enabled } : n
      ),
    }));
  };

  const updatePrivacy = (id: string, enabled: boolean) => {
    setData((prev) => ({
      ...prev,
      privacy: prev.privacy.map((p) =>
        p.id === id ? { ...p, enabled } : p
      ),
    }));
  };

  const updateAiPref = (id: string, value: number) => {
    setData((prev) => ({
      ...prev,
      aiPreferences: prev.aiPreferences.map((p) =>
        p.id === id ? { ...p, value } : p
      ),
    }));
  };

  const handleDataAction = (label: string, variant: string) => {
    setConfirmAction({
      title: label,
      description: `Are you sure you want to proceed with "${label}"? This action may be irreversible.`,
      variant: variant === "danger" ? "danger" : "default",
      onConfirm: () => {
        toast.success(`${label} — preview only`);
        setConfirmAction(null);
      },
    });
  };

  const categoryTitles: Record<string, string> = {
    general: "General",
    account: "Account",
    notifications: "Notifications",
    privacy: "Privacy",
    appearance: "Appearance",
    ai: "AI Preferences",
    security: "Security",
    data: "Data & Privacy",
    support: "Support",
    about: "About",
  };

  const renderPanel = () => {
    switch (activeCategory) {
      case "general":
        return (
          <SettingsCard title="General" description="Language, region, and display units">
            <div className="divide-y divide-[#222222]">
              <SelectField
                label="Language"
                value={data.general.language}
                options={data.general.languageOptions}
                onChange={(v) =>
                  setData((p) => ({ ...p, general: { ...p.general, language: v } }))
                }
              />
              <SelectField
                label="Timezone"
                value={data.general.timezone}
                options={data.general.timezoneOptions}
                onChange={(v) =>
                  setData((p) => ({ ...p, general: { ...p.general, timezone: v } }))
                }
              />
              <SelectField
                label="Units"
                value={data.general.units}
                options={data.general.unitsOptions}
                onChange={(v) =>
                  setData((p) => ({ ...p, general: { ...p.general, units: v } }))
                }
              />
              <SelectField
                label="Temperature"
                value={data.general.temperature}
                options={data.general.temperatureOptions}
                onChange={(v) =>
                  setData((p) => ({
                    ...p,
                    general: { ...p.general, temperature: v },
                  }))
                }
              />
              <SelectField
                label="Date Format"
                value={data.general.dateFormat}
                options={data.general.dateFormatOptions}
                onChange={(v) =>
                  setData((p) => ({
                    ...p,
                    general: { ...p.general, dateFormat: v },
                  }))
                }
              />
              <SelectField
                label="Theme"
                value={data.general.theme}
                options={data.general.themeOptions}
                onChange={(v) =>
                  setData((p) => ({ ...p, general: { ...p.general, theme: v } }))
                }
              />
            </div>
          </SettingsCard>
        );

      case "account":
        return (
          <div className="space-y-6">
            <SettingsCard title="Account" description="Manage your account details">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs text-gray-500">
                    Name
                  </label>
                  <Input
                    value={data.account.name}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        account: { ...p.account, name: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-gray-500">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={data.account.email}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        account: { ...p.account, email: e.target.value },
                      }))
                    }
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast.message("Password change", {
                      description: "Connect to auth API when ready.",
                    })
                  }
                >
                  Change Password
                </Button>
              </div>
            </SettingsCard>
            <SettingsCard title="Danger Zone">
              <DangerZone
                title="Delete Account"
                description="Permanently delete your Revo account and all associated data. This cannot be undone."
                buttonLabel="Delete Account"
                onAction={() =>
                  handleDataAction("Delete Account", "danger")
                }
              />
            </SettingsCard>
          </div>
        );

      case "notifications":
        return (
          <SettingsCard
            title="Notifications"
            description="Choose what Revo notifies you about"
          >
            <div className="divide-y divide-[#222222]">
              {data.notifications.map((n) => (
                <ToggleRow
                  key={n.id}
                  label={n.label}
                  description={n.description}
                  enabled={n.enabled}
                  onChange={(v) => updateNotification(n.id, v)}
                />
              ))}
            </div>
          </SettingsCard>
        );

      case "privacy":
        return (
          <SettingsCard
            title="Privacy"
            description="Control how your data is used"
          >
            <div className="divide-y divide-[#222222]">
              {data.privacy.map((p) => (
                <ToggleRow
                  key={p.id}
                  label={p.label}
                  description={p.description}
                  enabled={p.enabled}
                  onChange={(v) => updatePrivacy(p.id, v)}
                />
              ))}
            </div>
          </SettingsCard>
        );

      case "appearance":
        return (
          <div className="grid gap-6 lg:grid-cols-2">
            <SettingsCard
              title="Appearance"
              description="Customize how Revo looks and feels"
            >
              <div className="divide-y divide-[#222222]">
                <SelectField
                  label="Theme"
                  value={data.appearance.theme}
                  options={data.appearance.themeOptions}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      appearance: { ...p.appearance, theme: v },
                    }))
                  }
                />
                <SelectField
                  label="Accent Color"
                  value={data.appearance.accentColor}
                  options={data.appearance.accentOptions}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      appearance: { ...p.appearance, accentColor: v },
                    }))
                  }
                />
                <SelectField
                  label="Card Density"
                  value={data.appearance.cardDensity}
                  options={data.appearance.densityOptions}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      appearance: { ...p.appearance, cardDensity: v },
                    }))
                  }
                />
                <SelectField
                  label="Font Size"
                  value={data.appearance.fontSize}
                  options={data.appearance.fontSizeOptions}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      appearance: { ...p.appearance, fontSize: v },
                    }))
                  }
                />
                <ToggleRow
                  label="Animations"
                  description="Enable smooth transitions and micro-interactions"
                  enabled={data.appearance.animations}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      appearance: { ...p.appearance, animations: v },
                    }))
                  }
                />
                <ToggleRow
                  label="Compact Mode"
                  description="Reduce spacing for a denser layout"
                  enabled={data.appearance.compactMode}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      appearance: { ...p.appearance, compactMode: v },
                    }))
                  }
                />
              </div>
            </SettingsCard>

            <SettingsCard title="Preview" description="Live preview of your settings">
              <div
                className={`rounded-2xl border border-[#222222] bg-[#0a0a0a] p-4 ${
                  data.appearance.compactMode ? "space-y-2" : "space-y-4"
                } ${data.appearance.fontSize === "large" ? "text-base" : data.appearance.fontSize === "small" ? "text-xs" : "text-sm"}`}
              >
                <p className="font-medium text-white">Sample Card</p>
                <p className="text-gray-500">
                  This preview updates as you change appearance settings.
                </p>
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#D4C4A8]/10 px-3 py-1 text-xs text-[#D4C4A8]">
                    Accent
                  </span>
                  <span className="rounded-full border border-[#222222] px-3 py-1 text-xs text-gray-400">
                    Tag
                  </span>
                </div>
              </div>
            </SettingsCard>
          </div>
        );

      case "ai":
        return (
          <SettingsCard
            title="AI Preferences"
            description="Customize how Revo's AI stylist behaves"
          >
            <div className="divide-y divide-[#222222]">
              {data.aiPreferences.map((pref) => (
                <SliderPreference
                  key={pref.id}
                  setting={pref}
                  onChange={(v) => updateAiPref(pref.id, v)}
                />
              ))}
            </div>
          </SettingsCard>
        );

      case "security":
        return (
          <div className="space-y-6">
            <SettingsCard title="Security" description="Password and session management">
              <div className="space-y-4">
                <Button
                  variant="secondary"
                  onClick={() => toast.message("Change password — coming soon")}
                >
                  Change Password
                </Button>
                <ToggleRow
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  enabled={data.security.twoFactorEnabled}
                  onChange={(v) =>
                    setData((p) => ({
                      ...p,
                      security: { ...p.security, twoFactorEnabled: v },
                    }))
                  }
                />
              </div>
            </SettingsCard>

            <SettingsCard title="Active Sessions" description="Devices logged into your account">
              <div className="space-y-3">
                {data.security.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start gap-3 rounded-2xl border border-[#222222] bg-[#0a0a0a] p-4"
                  >
                    {session.device.includes("iPhone") ? (
                      <Smartphone className="mt-0.5 h-5 w-5 text-gray-500" />
                    ) : (
                      <Monitor className="mt-0.5 h-5 w-5 text-gray-500" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">
                          {session.device}
                        </p>
                        {session.current && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {session.location} · {session.lastActive}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SettingsCard>
          </div>
        );

      case "data":
        return (
          <SettingsCard
            title="Data & Privacy"
            description="Export or delete your data"
          >
            <div className="space-y-3">
              {data.dataActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() =>
                    handleDataAction(action.label, action.variant)
                  }
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-colors ${
                    action.variant === "danger"
                      ? "border-red-900/30 bg-red-950/10 hover:border-red-800/50"
                      : "border-[#222222] bg-[#0a0a0a] hover:border-[#333]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        action.variant === "danger"
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {action.label}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" />
                </button>
              ))}
            </div>
          </SettingsCard>
        );

      case "support":
        return (
          <SettingsCard title="Support" description="Get help and send feedback">
            <div className="space-y-1">
              {data.support.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </Link>
              ))}
            </div>
          </SettingsCard>
        );

      case "about":
        return (
          <SettingsCard title="About Revo">
            <p className="text-sm text-gray-400">
              Revo is your AI-powered fashion intelligence platform. Stop
              guessing. Start knowing.
            </p>
            <p className="mt-4 text-xs text-gray-600">{data.support.version}</p>
          </SettingsCard>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={openMobileMenu}
            className="mt-1 rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account, preferences, and AI behavior
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-[#222222] bg-[#111111] p-3">
            <SettingsSidebar
              categories={data.categories}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>
        </aside>

        {/* Mobile category selector */}
        <div className="lg:hidden">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full rounded-2xl border border-[#222222] bg-[#111111] px-4 py-3 text-sm text-white focus:outline-none"
          >
            {data.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#D4C4A8] lg:hidden">
                {categoryTitles[activeCategory]}
              </p>
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ConfirmationDialog
        open={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => confirmAction?.onConfirm()}
        title={confirmAction?.title ?? ""}
        description={confirmAction?.description ?? ""}
        variant={confirmAction?.variant}
        confirmLabel="Confirm"
      />
    </>
  );
}
