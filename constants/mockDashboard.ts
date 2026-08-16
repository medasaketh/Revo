import type { DashboardData } from "@/types/dashboard";

export const mockDashboardData: DashboardData = {
  user: {
    id: "user-1",
    name: "Saketh",
    email: "saketh@example.com",
    avatarUrl: null,
    initials: "SM",
  },
  greeting: {
    period: "morning",
    subtitle: "Here's your fashion intelligence for today.",
  },
  weather: {
    city: "Hyderabad",
    temperature: 29,
    unit: "C",
    condition: "Sunny",
    humidity: 62,
    windSpeed: 12,
    windUnit: "km/h",
    icon: "sunny",
  },
  styleBrief: {
    headline: "Today's Style Brief",
    summary: "Warm weather today.",
    recommendation:
      "Lightweight fabrics like linen and cotton will keep you comfortable. Avoid heavy layering.",
    ctaLabel: "Generate Today's Outfit",
  },
  quickActions: [
    {
      id: "ai-stylist",
      title: "AI Stylist",
      description: "Chat with your personal stylist.",
      buttonLabel: "Open Chat",
      href: "#ai-chat",
      icon: "sparkles",
      accent: "from-violet-500/20 to-purple-600/10",
    },
    {
      id: "wardrobe",
      title: "Wardrobe",
      description: "Browse your digital wardrobe.",
      buttonLabel: "Open",
      href: "#wardrobe",
      icon: "shirt",
      accent: "from-blue-500/20 to-cyan-600/10",
    },
    {
      id: "outfit-judge",
      title: "Outfit Judge",
      description: "Upload today's outfit.",
      buttonLabel: "Rate Outfit",
      href: "#outfit-judge",
      icon: "camera",
      accent: "from-amber-500/20 to-orange-600/10",
    },
    {
      id: "shopping",
      title: "Shopping Assistant",
      description: "Find pieces that match your wardrobe.",
      buttonLabel: "Explore",
      href: "#shopping",
      icon: "shopping-bag",
      accent: "from-emerald-500/20 to-teal-600/10",
    },
  ],
  chatPlaceholder: "Ask Revo anything...",
  chatSuggestions: [
    "What should I wear today?",
    "I have an interview tomorrow.",
    "Suggest something under ₹3000.",
  ],
  chatPrompts: [
    { id: "office", label: "Outfit for Office" },
    { id: "weekend", label: "Weekend Casual" },
    { id: "wedding", label: "Wedding Guest" },
    { id: "date", label: "Date Night" },
    { id: "rainy", label: "Rainy Weather" },
  ],
  recommendation: {
    id: "rec-1",
    title: "Today's Pick",
    items: [
      { id: "i1", emoji: "👕", name: "White Linen Shirt", category: "Top" },
      { id: "i2", emoji: "👖", name: "Dark Blue Jeans", category: "Bottom" },
      { id: "i3", emoji: "👟", name: "White Sneakers", category: "Footwear" },
    ],
    reason:
      "Perfect for today's warm weather and your smart casual preference.",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
  },
  wardrobe: {
    totalItems: 128,
    tops: 42,
    bottoms: 25,
    shoes: 18,
    accessories: 43,
    isEmpty: false,
  },
  insights: [
    { id: "color", label: "Most Worn Color", value: "Black", type: "text" },
    { id: "style", label: "Most Worn Style", value: "Minimal", type: "text" },
    {
      id: "completeness",
      label: "Wardrobe Completeness",
      value: "82%",
      type: "progress",
      progress: 82,
    },
  ],
  products: [
    {
      id: "p1",
      brand: "Uniqlo",
      name: "Linen Blend Shirt",
      price: 2490,
      currency: "₹",
      reason: "Matches your wardrobe.",
      imageUrl:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    },
    {
      id: "p2",
      brand: "Zara",
      name: "Slim Fit Chinos",
      price: 3290,
      currency: "₹",
      reason: "Pairs with 12 items you own.",
      imageUrl:
        "https://images.unsplash.com/photo-1473966968600-fa801b068a0a?w=400&h=500&fit=crop",
    },
    {
      id: "p3",
      brand: "Nike",
      name: "Air Force 1",
      price: 7495,
      currency: "₹",
      reason: "Completes your casual looks.",
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    },
    {
      id: "p4",
      brand: "H&M",
      name: "Minimal Watch",
      price: 1999,
      currency: "₹",
      reason: "Elevates smart casual outfits.",
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
    },
  ],
  activity: [
    {
      id: "a1",
      action: "Added White Shirt",
      timestamp: "2 hours ago",
      icon: "plus",
    },
    {
      id: "a2",
      action: "Generated Office Outfit",
      timestamp: "Yesterday",
      icon: "sparkles",
    },
    {
      id: "a3",
      action: "Rated Outfit — 8.5/10",
      timestamp: "2 days ago",
      icon: "star",
    },
    {
      id: "a4",
      action: "Added White Sneakers",
      timestamp: "3 days ago",
      icon: "plus",
    },
  ],
  dailyTip: {
    title: "Today's Tip",
    content:
      "Light neutral colors reflect heat and create a cleaner silhouette during summer.",
  },
  navigation: [
    { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "home" },
    { id: "wardrobe", label: "Wardrobe", href: "#wardrobe", icon: "shirt" },
    { id: "ai-stylist", label: "AI Stylist", href: "#ai-chat", icon: "sparkles" },
    {
      id: "outfit-judge",
      label: "Outfit Judge",
      href: "#outfit-judge",
      icon: "camera",
    },
    {
      id: "recommendations",
      label: "Recommendations",
      href: "#shopping",
      icon: "shopping-bag",
    },
    { id: "saved", label: "Saved Looks", href: "#saved", icon: "heart" },
    { id: "profile", label: "Profile", href: "/profile", icon: "user" },
    { id: "settings", label: "Settings", href: "/settings", icon: "settings" },
  ],
};

export function getGreetingLabel(period: DashboardData["greeting"]["period"]): string {
  const labels = {
    morning: "Good Morning",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
  };
  return labels[period];
}

export function getGreetingPeriod(): DashboardData["greeting"]["period"] {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function mergeDashboardUser(
  data: DashboardData,
  overrides: Partial<DashboardData["user"]>
): DashboardData {
  return {
    ...data,
    user: { ...data.user, ...overrides },
    greeting: {
      ...data.greeting,
      period: getGreetingPeriod(),
    },
  };
}
