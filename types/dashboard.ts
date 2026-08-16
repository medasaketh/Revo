export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
}

export interface DashboardWeather {
  city: string;
  temperature: number;
  unit: "C" | "F";
  condition: string;
  humidity: number;
  windSpeed: number;
  windUnit: string;
  icon: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
}

export interface StyleBrief {
  headline: string;
  summary: string;
  recommendation: string;
  ctaLabel: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: string;
  accent: string;
}

export interface ChatPrompt {
  id: string;
  label: string;
}

export interface OutfitItem {
  id: string;
  emoji: string;
  name: string;
  category: string;
}

export interface OutfitRecommendation {
  id: string;
  title: string;
  items: OutfitItem[];
  reason: string;
  imageUrl: string;
}

export interface WardrobeStats {
  totalItems: number;
  tops: number;
  bottoms: number;
  shoes: number;
  accessories: number;
  isEmpty: boolean;
}

export interface FashionInsight {
  id: string;
  label: string;
  value: string;
  type: "text" | "progress";
  progress?: number;
}

export interface ProductSuggestion {
  id: string;
  brand: string;
  name: string;
  price: number;
  currency: string;
  reason: string;
  imageUrl: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
  icon: string;
}

export interface DailyTip {
  title: string;
  content: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface DashboardData {
  user: DashboardUser;
  greeting: {
    period: "morning" | "afternoon" | "evening";
    subtitle: string;
  };
  weather: DashboardWeather;
  styleBrief: StyleBrief;
  quickActions: QuickAction[];
  chatPrompts: ChatPrompt[];
  chatPlaceholder: string;
  chatSuggestions: string[];
  recommendation: OutfitRecommendation;
  wardrobe: WardrobeStats;
  insights: FashionInsight[];
  products: ProductSuggestion[];
  activity: ActivityItem[];
  dailyTip: DailyTip;
  navigation: NavItem[];
}
