import type { ProfileData } from "@/types/profile";

export const mockProfileData: ProfileData = {
  header: {
    fullName: "Meda Saketh",
    displayTitle: "Fashion Explorer",
    email: "saketh@revo.app",
    memberSince: "July 2026",
    avatarUrl: null,
    initials: "MS",
  },
  completion: {
    percentage: 92,
    missingItems: ["Upload selfie", "Complete body scan", "Add wardrobe items"],
  },
  tabs: [
    { id: "personal", label: "Personal" },
    { id: "body", label: "Body" },
    { id: "appearance", label: "Appearance" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "style", label: "Style" },
    { id: "shopping", label: "Shopping" },
    { id: "preferences", label: "Preferences" },
  ],
  personal: {
    fields: [
      { label: "Full Name", value: "Meda Saketh" },
      { label: "Email", value: "saketh@revo.app" },
      { label: "Age Range", value: "25–34" },
      { label: "Gender Preference", value: "Male" },
      { label: "City", value: "Hyderabad" },
      { label: "Country", value: "India" },
    ],
  },
  body: {
    fields: [
      { label: "Height", value: "175 cm" },
      { label: "Weight", value: "72 kg" },
      { label: "Body Type", value: "Athletic" },
      { label: "Build", value: "Mesomorph" },
      { label: "Body Scan Status", value: "Not uploaded" },
    ],
    bodyScan: {
      available: false,
      label: "Improve recommendations",
      description:
        "A full-body scan helps Revo recommend better fits and proportions.",
      buttonLabel: "Upload Full Body Scan",
    },
  },
  appearance: {
    fields: [
      { label: "Skin Tone", value: "Medium" },
      { label: "Undertone", value: "Warm" },
      { label: "Hair Color", value: "Black" },
      { label: "Glasses", value: "Yes" },
      { label: "Selfie Status", value: "Not uploaded" },
    ],
    selfie: {
      available: false,
      label: "Upload Selfie",
      description: "Improve color recommendations with a quick selfie upload.",
      buttonLabel: "Upload Selfie",
    },
  },
  lifestyle: {
    fields: [
      { label: "Occupation", value: "Product Designer" },
      { label: "Typical Occasions", value: "Office, Casual Outings, Social Events" },
      { label: "Dress Up Frequency", value: "3–4 times per week" },
      { label: "Climate", value: "Tropical / Humid" },
      { label: "Location", value: "Hyderabad, India" },
    ],
  },
  style: {
    styleTags: [
      { id: "s1", label: "Minimal" },
      { id: "s2", label: "Classic" },
      { id: "s3", label: "Smart Casual" },
      { id: "s4", label: "Streetwear" },
      { id: "s5", label: "Contemporary" },
    ],
    favoriteColors: [
      { id: "c1", label: "Black", color: "#1a1a1a" },
      { id: "c2", label: "Navy", color: "#1e3a5f" },
      { id: "c3", label: "White", color: "#f5f5f5" },
      { id: "c4", label: "Olive", color: "#556b2f" },
      { id: "c5", label: "Beige", color: "#d4c4a8" },
    ],
    avoidedColors: [
      { id: "a1", label: "Neon" },
      { id: "a2", label: "Bright Orange" },
      { id: "a3", label: "Hot Pink" },
    ],
    fashionConfidence: 78,
  },
  shopping: {
    fields: [
      { label: "Budget", value: "₹2,000 – ₹8,000 per item" },
      { label: "Preferred Stores", value: "Uniqlo, Zara, H&M, Nike" },
      { label: "Shopping Frequency", value: "Monthly" },
      { label: "Favorite Brands", value: "Uniqlo, Nike, Levi's" },
      { label: "Preferred Quality", value: "Premium basics, mid-range statement pieces" },
    ],
  },
  aiFeatures: [
    {
      id: "wardrobe",
      label: "Digital Wardrobe",
      description: "Track and organize your clothing digitally.",
      enabled: true,
    },
    {
      id: "stylist",
      label: "AI Stylist",
      description: "Personalized outfit and style advice.",
      enabled: true,
    },
    {
      id: "weather",
      label: "Weather Suggestions",
      description: "Daily recommendations based on local weather.",
      enabled: true,
    },
    {
      id: "judge",
      label: "Outfit Judge",
      description: "Rate and improve your daily outfits.",
      enabled: true,
    },
    {
      id: "shopping",
      label: "Shopping Suggestions",
      description: "Curated product picks that match your wardrobe.",
      enabled: false,
    },
    {
      id: "capsule",
      label: "Capsule Wardrobe",
      description: "Build a minimal, versatile wardrobe plan.",
      enabled: false,
    },
  ],
  connectedData: [
    { id: "wardrobe", label: "Wardrobe", value: "128 Items", icon: "shirt" },
    {
      id: "recommendations",
      label: "Recommendations Generated",
      value: "54",
      icon: "sparkles",
    },
    { id: "chats", label: "AI Chats", value: "132", icon: "message" },
    { id: "rated", label: "Outfits Rated", value: "21", icon: "star" },
  ],
};
