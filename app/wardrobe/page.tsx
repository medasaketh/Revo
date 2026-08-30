import { wardrobePageConfig } from "@/constants/mockWardrobe";
import { WardrobeContent } from "@/components/wardrobe/WardrobeContent";

export default function WardrobePage() {
  return <WardrobeContent config={wardrobePageConfig} />;
}
