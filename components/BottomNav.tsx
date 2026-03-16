"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlayCircle,
  Radio,
  LineChart,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Início", icon: Home },
  { href: "/aulas", label: "Aulas", icon: PlayCircle },
  { href: "/sinais", label: "Sinais", icon: Radio },
  { href: "/estrategias", label: "Estratégias", icon: LineChart },
  { href: "/perfil", label: "Perfil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto border-t border-slate-800 bg-background/95 backdrop-blur-xl px-4 py-2 pb-safe"
      aria-label="Navegação principal"
    >
      <div className="flex justify-between items-center h-16">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative group transition-colors"
              aria-current={isActive ? "page" : undefined}
            >
              {/* Barra glow no item ativo (idêntico ao stitch-design) */}
              {isActive && (
                <div
                  className="absolute -top-1 w-8 h-1 bg-primary rounded-full nav-glow-bar"
                  aria-hidden
                />
              )}
              <Icon
                size={24}
                className={
                  isActive
                    ? "text-primary"
                    : "text-slate-500 group-hover:text-slate-300"
                }
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium uppercase tracking-wider ${
                  isActive ? "font-bold text-primary" : "text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
