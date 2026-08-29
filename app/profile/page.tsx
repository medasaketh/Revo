import { mockProfileData } from "@/constants/mockProfile";
import { ProfileContent } from "@/components/profile/ProfileContent";

export default function ProfilePage() {
  return <ProfileContent data={mockProfileData} />;
}
