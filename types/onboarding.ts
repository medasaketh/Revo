export type AgeRange =
  | "under-18"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55+";

export type GenderPreference =
  | "menswear"
  | "womenswear"
  | "both"
  | "prefer-not-to-say";

export type Occupation =
  | "student"
  | "professional"
  | "business"
  | "creative"
  | "other";

export type BodyTypeKnowledge = "yes" | "help-me";

export type BodyType =
  | "rectangle"
  | "triangle"
  | "inverted-triangle"
  | "hourglass"
  | "oval";

export type SkinTone =
  | "very-fair"
  | "fair"
  | "medium"
  | "tan"
  | "deep"
  | "not-sure";

export type HairColor =
  | "black"
  | "brown"
  | "blonde"
  | "red"
  | "grey"
  | "other";

export type StylePreference =
  | "minimal"
  | "streetwear"
  | "smart-casual"
  | "classic"
  | "luxury"
  | "athleisure"
  | "traditional"
  | "vintage"
  | "bohemian"
  | "formal";

export type FavoriteColor =
  | "black"
  | "white"
  | "blue"
  | "brown"
  | "green"
  | "pastels"
  | "earth-tones"
  | "bright-colors";

export type DressUpFrequency =
  | "daily"
  | "weekly"
  | "occasions"
  | "rarely";

export type Occasion =
  | "office"
  | "college"
  | "travel"
  | "date"
  | "wedding"
  | "party"
  | "festival"
  | "gym";

export type ShoppingPlatform =
  | "myntra"
  | "ajio"
  | "amazon"
  | "zara"
  | "hm"
  | "uniqlo"
  | "local-stores"
  | "brand-websites";

export type PainPoint =
  | "choosing-outfits"
  | "matching-colors"
  | "finding-size"
  | "shopping-time"
  | "what-suits-me"
  | "too-many-clothes"
  | "nothing-to-wear"
  | "budget"
  | "weather";

export type RevoFeature =
  | "digital-wardrobe"
  | "ai-stylist"
  | "outfit-rating"
  | "shopping-suggestions"
  | "packing-lists"
  | "weather-recommendations"
  | "capsule-wardrobe";

export interface OnboardingData {
  name: string;
  ageRange: AgeRange | "";
  genderPreference: GenderPreference | "";
  occupation: Occupation | "";
  city: string;
  country: string;
  height: string;
  weight: string;
  bodyTypeKnowledge: BodyTypeKnowledge | "";
  bodyType: BodyType | "";
  bodyImageUploaded: boolean;
  skinTone: SkinTone | "";
  selfieUploaded: boolean;
  hairColor: HairColor | "";
  stylePreferences: StylePreference[];
  fashionConfidence: number;
  favoriteColors: FavoriteColor[];
  dressUpFrequency: DressUpFrequency | "";
  occasions: Occasion[];
  budget: number;
  shoppingPlatforms: ShoppingPlatform[];
  painPoints: PainPoint[];
  revoFeatures: RevoFeature[];
  aiSelfieUploaded: boolean;
  aiFullBodyUploaded: boolean;
  aiWardrobeUploaded: boolean;
}

export type OnboardingStepId =
  | "welcome"
  | "basic-profile"
  | "location"
  | "body-info"
  | "appearance"
  | "style-preferences"
  | "lifestyle"
  | "shopping"
  | "pain-points"
  | "ai-boost"
  | "loading";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface OnboardingStepMeta {
  id: OnboardingStepId;
  stepNumber: number | null;
  title: string;
  description: string;
}
