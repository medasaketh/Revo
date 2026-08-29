"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Shirt,
  Sparkles,
  Camera,
  ShoppingBag,
  Heart,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { useHash } from "@/hooks/useHash";
import { isNavItemActive } from "@/constants/navigation";
import { parseNavHref, scrollToDashboardSection } from "@/lib/navigation/scroll";
import type { NavItem } from "@/types/dashboard";

const iconMap = {
  home: Home,
  shirt: Shirt,
  sparkles: Sparkles,
  camera: Camera,
  "shopping-bag": ShoppingBag,
  heart: Heart,
  user: User,
  settings: Settings,
} as const;

interface SidebarProps {
  navigation: NavItem[];
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export function Sidebar({
  navigation,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const hash = useHash();
  const { user, profile, signOut } = useAuth();

  const displayName =
    profile?.full_name?.trim() ??
    user?.user_metadata?.full_name?.trim() ??
    user?.email?.split("@")[0] ??
    "User";
  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? displayName.slice(0, 2).toUpperCase();

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={onCloseMobile}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#090909]">
            R
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold tracking-tight">Revo</span>
          )}
        </Link>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden rounded-xl p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Home;
          const isActive = isNavItemActive(pathname, item.href, hash);

          const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            const { path, hash: sectionHash } = parseNavHref(item.href);
            if (sectionHash && pathname === path) {
              event.preventDefault();
              scrollToDashboardSection(sectionHash);
            }
            onCloseMobile();
          };

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={handleClick}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-revo-champagne" : "text-gray-500 group-hover:text-white"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1f1f1f] p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4C4A8]/30 to-[#D4C4A8]/10 text-sm font-semibold text-[#D4C4A8] ring-1 ring-[#D4C4A8]/20">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{displayName}</p>
              <p className="truncate text-xs text-gray-500">{user?.email}</p>
            </div>
          )}
          {!collapsed && (
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onCloseMobile}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen border-r border-[#1f1f1f] bg-[#090909]/95 backdrop-blur-xl lg:block",
          collapsed ? "w-20" : "w-[260px]"
        )}
      >
        {sidebarContent}
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed left-0 top-0 z-50 h-screen w-[260px] border-r border-[#1f1f1f] bg-[#090909] lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
