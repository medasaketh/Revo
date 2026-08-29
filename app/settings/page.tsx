import { mockSettingsData } from "@/constants/mockSettings";
import { SettingsContent } from "@/components/settings/SettingsContent";

export default function SettingsPage() {
  return <SettingsContent data={mockSettingsData} />;
}
