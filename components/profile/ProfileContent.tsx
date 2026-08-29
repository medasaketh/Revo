"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ToggleRow } from "@/components/shared/ToggleRow";
import { EditDrawer } from "@/components/shared/EditDrawer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { CompletionCard } from "@/components/profile/CompletionCard";
import { EditableCard } from "@/components/profile/EditableCard";
import { UploadCard } from "@/components/profile/UploadCard";
import { TagGroup, ColorChip } from "@/components/profile/TagGroup";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { useDashboardLayout } from "@/components/dashboard/DashboardShell";
import { Menu } from "lucide-react";
import type { ProfileData, ProfileSectionId } from "@/types/profile";

interface ProfileContentProps {
  data: ProfileData;
}

export function ProfileContent({ data: initialData }: ProfileContentProps) {
  const { openMobileMenu } = useDashboardLayout();
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [editSection, setEditSection] = useState<ProfileSectionId | null>(
    null
  );
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openEdit = (section: ProfileSectionId, fields: { label: string; value: string }[]) => {
    setEditSection(section);
    setEditFields(
      Object.fromEntries(fields.map((f) => [f.label, f.value]))
    );
  };

  const handleSave = () => {
    if (!editSection) return;
    setSaving(true);
    setTimeout(() => {
      setData((prev) => {
        const updated = { ...prev };
        const newFields = Object.entries(editFields).map(([label, value]) => ({
          label,
          value,
        }));
        if (editSection === "personal") updated.personal.fields = newFields;
        if (editSection === "body") updated.body.fields = newFields;
        if (editSection === "appearance") updated.appearance.fields = newFields;
        if (editSection === "lifestyle") updated.lifestyle.fields = newFields;
        if (editSection === "shopping") updated.shopping.fields = newFields;
        return updated;
      });
      setSaving(false);
      setEditSection(null);
      toast.success("Profile updated");
    }, 600);
  };

  const toggleAiFeature = (id: string) => {
    setData((prev) => ({
      ...prev,
      aiFeatures: prev.aiFeatures.map((f) =>
        f.id === id ? { ...f, enabled: !f.enabled } : f
      ),
    }));
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={openMobileMenu}
          className="rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="text-sm text-gray-500">Profile</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-6">
          <ProfileHeader
            header={data.header}
            completion={data.completion.percentage}
            onEditProfile={() =>
              openEdit("personal", data.personal.fields)
            }
          />

          <ProfileTabs
            tabs={data.tabs}
            activeTab={activeTab}
            onTabChange={scrollToSection}
          />

          <div className="space-y-6 pt-2">
            <EditableCard
              id="personal"
              title="Personal Information"
              subtitle="Your basic profile details"
              fields={data.personal.fields}
              onEdit={() => openEdit("personal", data.personal.fields)}
            />

            <EditableCard
              id="body"
              title="Body Information"
              subtitle="Fit and proportions"
              fields={data.body.fields}
              onEdit={() => openEdit("body", data.body.fields)}
            >
              <UploadCard upload={data.body.bodyScan} />
            </EditableCard>

            <EditableCard
              id="appearance"
              title="Appearance"
              subtitle="Your natural palette"
              fields={data.appearance.fields}
              onEdit={() =>
                openEdit("appearance", data.appearance.fields)
              }
            >
              <UploadCard upload={data.appearance.selfie} />
            </EditableCard>

            <EditableCard
              id="lifestyle"
              title="Lifestyle"
              subtitle="How you dress day to day"
              fields={data.lifestyle.fields}
              onEdit={() => openEdit("lifestyle", data.lifestyle.fields)}
            />

            <EditableCard
              id="style"
              title="Style Preferences"
              subtitle="Your fashion identity"
              onEdit={() => toast.message("Style editor coming soon")}
            >
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs text-gray-500">Style Tags</p>
                  <TagGroup tags={data.style.styleTags} />
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Favorite Colors</p>
                  <ColorChip tags={data.style.favoriteColors} />
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Avoided Colors</p>
                  <ColorChip
                    tags={data.style.avoidedColors}
                    variant="outline"
                  />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-gray-500">Fashion Confidence</span>
                    <span className="text-[#D4C4A8]">
                      {data.style.fashionConfidence}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#222222]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D4C4A8]/50 to-[#D4C4A8]"
                      style={{ width: `${data.style.fashionConfidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </EditableCard>

            <EditableCard
              id="shopping"
              title="Shopping Preferences"
              subtitle="Budget and brand preferences"
              fields={data.shopping.fields}
              onEdit={() => openEdit("shopping", data.shopping.fields)}
            />

            <EditableCard
              id="preferences"
              title="AI Fashion Preferences"
              subtitle="Features powered by Revo AI"
            >
              <div className="divide-y divide-[#222222]">
                {data.aiFeatures.map((feature) => (
                  <ToggleRow
                    key={feature.id}
                    label={feature.label}
                    description={feature.description}
                    enabled={feature.enabled}
                    onChange={() => toggleAiFeature(feature.id)}
                  />
                ))}
              </div>
            </EditableCard>

            <EditableCard
              title="Connected Data"
              subtitle="Your activity on Revo"
            >
              <ProfileStats stats={data.connectedData} />
            </EditableCard>
          </div>
        </div>

        <aside className="hidden xl:block">
          <CompletionCard completion={data.completion} />
        </aside>
      </div>

      <div className="mt-6 xl:hidden">
        <CompletionCard completion={data.completion} />
      </div>

      <EditDrawer
        open={editSection !== null}
        onClose={() => setEditSection(null)}
        onSave={handleSave}
        title={`Edit ${editSection ?? ""}`}
        saving={saving}
      >
        <div className="space-y-4">
          {Object.entries(editFields).map(([label, value]) => (
            <div key={label}>
              <label className="mb-1.5 block text-xs text-gray-500">
                {label}
              </label>
              <Input
                value={value}
                onChange={(e) =>
                  setEditFields((prev) => ({
                    ...prev,
                    [label]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </EditDrawer>
    </>
  );
}
