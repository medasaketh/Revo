import { mockWardrobeData } from "@/constants/mockWardrobe";
import { WardrobeContent } from "@/components/wardrobe/WardrobeContent";

export default function WardrobePage() {
  return <WardrobeContent data={mockWardrobeData} />;
}
