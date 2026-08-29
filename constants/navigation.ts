import type { NavItem } from "@/types/dashboard";

export const appNavigation: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "home" },
  { id: "wardrobe", label: "Wardrobe", href: "/dashboard#wardrobe", icon: "shirt" },
  { id: "ai-stylist", label: "AI Stylist", href: "/dashboard#ai-chat", icon: "sparkles" },
  {
    id: "outfit-judge",
    label: "Outfit Judge",
    href: "/dashboard#outfit-judge",
    icon: "camera",
  },
  {
    id: "recommendations",
    label: "Recommendations",
    href: "/dashboard#shopping",
    icon: "shopping-bag",
  },
  { id: "saved", label: "Saved Looks", href: "/dashboard#saved", icon: "heart" },
  { id: "profile", label: "Profile", href: "/profile", icon: "user" },
  { id: "settings", label: "Settings", href: "/settings", icon: "settings" },
];

/** Minimal sidebar shown on the dedicated wardrobe screen. */
export const wardrobeNavigation: NavItem[] = [
  { id: "wardrobe", label: "Wardrobe", href: "/wardrobe", icon: "shirt" },
];

export function isNavItemActive(
  pathname: string,
  href: string,
  hash = ""
): boolean {
  if (href.includes("#")) {
    const [base, fragment] = href.split("#");
    if (pathname !== base && !pathname.startsWith(`${base}/`)) {
      return false;
    }
    return hash === fragment;
  }

  if (href === "/dashboard") {
    return pathname === "/dashboard" && !hash;
  }

  if (!href.startsWith("/")) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
