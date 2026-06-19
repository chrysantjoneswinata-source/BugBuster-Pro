"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Star,
  Menu,
  X,
  LogOut,
  Eye,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { MANAGER } from "@/lib/manager-data";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Ringkasan", href: "/manager", icon: LayoutDashboard, exact: true },
  { label: "Kinerja Tim", href: "/manager/performance", icon: BarChart3 },
  { label: "Kepuasan", href: "/manager/satisfaction", icon: Star },
];

export default function ManagerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const initials = MANAGER.name.split(" ").map((w) => w[0]).join("");

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/manager" onClick={() => setOpen(false)}>
          <Logo variant="light" />
        </Link>
        <button
          className="text-white/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
        >
          <X size={22} />
        </button>
      </div>

      <div className="mx-3 mb-2 flex items-center gap-2 rounded-[var(--r)] bg-white/5 px-3 py-2 text-xs font-semibold text-white/55">
        <Eye size={14} /> Mode tampilan saja
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-[var(--r)] px-3.5 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-[var(--teal)] text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-[var(--r)] px-3.5 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} /> Keluar
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block"
        style={{ background: "var(--ink)" }}
      >
        {SidebarContent}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside
            className="absolute inset-y-0 left-0 w-64"
            style={{ background: "var(--ink)" }}
          >
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--surface)]/85 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                className="grid h-10 w-10 place-items-center rounded-[var(--r)] text-[var(--muted)] hover:bg-[var(--paper)] lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Buka menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="font-display text-sm font-bold leading-tight">
                  Panel Manajemen
                </p>
                <p className="text-[11px] text-[var(--muted)]">BugBuster Pro</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold text-white"
                style={{ background: "var(--teal)" }}
              >
                {initials}
              </span>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-bold leading-tight">{MANAGER.name}</p>
                <p className="text-[11px] text-[var(--muted)]">{MANAGER.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
