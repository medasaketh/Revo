import type { OnboardingStepMeta, SelectOption } from "@/types/onboarding";

export const ONBOARDING_STEPS: OnboardingStepMeta[] = [
  {
    id: "welcome",
    stepNumber: null,
    title: "Stop Guessing.\nStart Knowing.",
    description:
      "We'll understand your style and build your personal fashion profile in under 2 minutes.",
  },
  {
    id: "basic-profile",
    stepNumber: 1,
    title: "Let's get to know you",
    description: "A few basics so your stylist can personalize everything for you.",
  },
  {
    id: "location",
    stepNumber: 2,
    title: "Where are you based?",
    description:
      "Weather-aware recommendations get smarter when we know your location.",
  },
  {
    id: "body-info",
    stepNumber: 3,
    title: "Your body, your fit",
    description: "Great style starts with understanding proportions and fit.",
  },
  {
    id: "appearance",
    stepNumber: 4,
    title: "Your natural palette",
    description: "Skin tone and hair color help us recommend colors that truly flatter you.",
  },
  {
    id: "style-preferences",
    stepNumber: 5,
    title: "What's your vibe?",
    description: "Select the styles that resonate with you — pick as many as you like.",
  },
  {
    id: "lifestyle",
    stepNumber: 6,
    title: "Your everyday life",
    description: "Tell us how you dress so recommendations match your real routine.",
  },
  {
    id: "shopping",
    stepNumber: 7,
    title: "How you shop",
    description: "Budget and favorite stores help us suggest pieces you'll actually buy.",
  },
  {
    id: "pain-points",
    stepNumber: 8,
    title: "What holds you back?",
    description: "We'll focus on solving the frustrations that matter most to you.",
  },
  {
    id: "ai-boost",
    stepNumber: 9,
    title: "Make your recommendations even smarter.",
    description: "Optional uploads help our AI understand you on a deeper level.",
  },
  {
    id: "loading",
    stepNumber: 10,
    title: "Building your personal fashion profile...",
    description: "Our AI stylist is crafting something uniquely yours.",
  },
];

export const AGE_RANGE_OPTIONS: SelectOption[] = [
  { value: "under-18", label: "Under 18" },
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-44", label: "35–44" },
  { value: "45-54", label: "45–54" },
  { value: "55+", label: "55+" },
];

export const GENDER_OPTIONS: SelectOption[] = [
  { value: "menswear", label: "Menswear" },
  { value: "womenswear", label: "Womenswear" },
  { value: "both", label: "Both" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const OCCUPATION_OPTIONS: SelectOption[] = [
  { value: "student", label: "Student" },
  { value: "professional", label: "Professional" },
  { value: "business", label: "Business" },
  { value: "creative", label: "Creative" },
  { value: "other", label: "Other" },
];

export const BODY_TYPE_KNOWLEDGE_OPTIONS: SelectOption[] = [
  {
    value: "yes",
    label: "Yes",
    description: "I already know my body type",
  },
  {
    value: "help-me",
    label: "Help me identify it",
    description: "Upload a photo and we'll guide you",
  },
];

export const BODY_TYPE_OPTIONS: SelectOption[] = [
  { value: "rectangle", label: "Rectangle", description: "Shoulders, waist, and hips are similar" },
  { value: "triangle", label: "Triangle", description: "Hips wider than shoulders" },
  { value: "inverted-triangle", label: "Inverted Triangle", description: "Shoulders wider than hips" },
  { value: "hourglass", label: "Hourglass", description: "Defined waist, balanced proportions" },
  { value: "oval", label: "Oval", description: "Fuller midsection, narrower shoulders" },
];

export const SKIN_TONE_OPTIONS: SelectOption[] = [
  { value: "very-fair", label: "Very Fair" },
  { value: "fair", label: "Fair" },
  { value: "medium", label: "Medium" },
  { value: "tan", label: "Tan" },
  { value: "deep", label: "Deep" },
  { value: "not-sure", label: "Not Sure" },
];

export const HAIR_COLOR_OPTIONS: SelectOption[] = [
  { value: "black", label: "Black" },
  { value: "brown", label: "Brown" },
  { value: "blonde", label: "Blonde" },
  { value: "red", label: "Red" },
  { value: "grey", label: "Grey" },
  { value: "other", label: "Other" },
];

export const STYLE_OPTIONS: SelectOption[] = [
  { value: "minimal", label: "Minimal" },
  { value: "streetwear", label: "Streetwear" },
  { value: "smart-casual", label: "Smart Casual" },
  { value: "classic", label: "Classic" },
  { value: "luxury", label: "Luxury" },
  { value: "athleisure", label: "Athleisure" },
  { value: "traditional", label: "Traditional" },
  { value: "vintage", label: "Vintage" },
  { value: "bohemian", label: "Bohemian" },
  { value: "formal", label: "Formal" },
];

export const FAVORITE_COLOR_OPTIONS: SelectOption[] = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "blue", label: "Blue" },
  { value: "brown", label: "Brown" },
  { value: "green", label: "Green" },
  { value: "pastels", label: "Pastels" },
  { value: "earth-tones", label: "Earth Tones" },
  { value: "bright-colors", label: "Bright Colors" },
];

export const COLOR_CHIP_HEX: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f5f5f0",
  blue: "#3b5998",
  brown: "#8b6914",
  green: "#2d5016",
  pastels: "#e8d5e0",
  "earth-tones": "#a0826d",
  "bright-colors": "#e63946",
};

export const DRESS_UP_OPTIONS: SelectOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "occasions", label: "Only for occasions" },
  { value: "rarely", label: "Rarely" },
];

export const OCCASION_OPTIONS: SelectOption[] = [
  { value: "office", label: "Office" },
  { value: "college", label: "College" },
  { value: "travel", label: "Travel" },
  { value: "date", label: "Date" },
  { value: "wedding", label: "Wedding" },
  { value: "party", label: "Party" },
  { value: "festival", label: "Festival" },
  { value: "gym", label: "Gym" },
];

export const BUDGET_LABELS = [
  "Under ₹1000",
  "₹1000–3000",
  "₹3000–5000",
  "₹5000+",
];

export const SHOPPING_PLATFORM_OPTIONS: SelectOption[] = [
  { value: "myntra", label: "Myntra" },
  { value: "ajio", label: "Ajio" },
  { value: "amazon", label: "Amazon" },
  { value: "zara", label: "Zara" },
  { value: "hm", label: "H&M" },
  { value: "uniqlo", label: "Uniqlo" },
  { value: "local-stores", label: "Local Stores" },
  { value: "brand-websites", label: "Brand Websites" },
];

export const PAIN_POINT_OPTIONS: SelectOption[] = [
  { value: "choosing-outfits", label: "Choosing outfits" },
  { value: "matching-colors", label: "Matching colors" },
  { value: "finding-size", label: "Finding my size" },
  { value: "shopping-time", label: "Shopping takes too long" },
  { value: "what-suits-me", label: "I don't know what suits me" },
  { value: "too-many-clothes", label: "Too many clothes" },
  { value: "nothing-to-wear", label: "Nothing to wear" },
  { value: "budget", label: "Budget" },
  { value: "weather", label: "Weather" },
];

export const REVO_FEATURE_OPTIONS: SelectOption[] = [
  { value: "digital-wardrobe", label: "Digital Wardrobe", description: "Organize everything you own" },
  { value: "ai-stylist", label: "AI Stylist", description: "Personal recommendations daily" },
  { value: "outfit-rating", label: "Outfit Rating", description: "Get instant feedback on looks" },
  { value: "shopping-suggestions", label: "Shopping Suggestions", description: "Curated picks within budget" },
  { value: "packing-lists", label: "Packing Lists", description: "Smart travel outfit planning" },
  { value: "weather-recommendations", label: "Weather Recommendations", description: "Dress right for any forecast" },
  { value: "capsule-wardrobe", label: "Capsule Wardrobe", description: "Build a versatile core wardrobe" },
];

export const AI_UPLOAD_OPTIONS: SelectOption[] = [
  {
    value: "selfie",
    label: "Upload Selfie",
    description: "Helps us analyze skin tone and facial features for color matching.",
  },
  {
    value: "full-body",
    label: "Upload Full Body Photo",
    description: "Enables accurate body type detection and fit recommendations.",
  },
  {
    value: "wardrobe",
    label: "Upload Wardrobe Photos",
    description: "Lets us build your digital closet and suggest new combinations.",
  },
];

export const LOADING_CHECKLIST = [
  "Understanding your style",
  "Building your color palette",
  "Learning your preferences",
  "Preparing AI recommendations",
];

export const FASHION_CONFIDENCE_LABELS = [
  "Still exploring",
  "Getting there",
  "Confident",
  "Very confident",
  "Style expert",
];
