"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  UserCheck,
  HardHat,
  Users,
  Bug,
  BarChart3,
  Star,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { ADMIN } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Pesanan", href: "/admin/bookings", icon: ClipboardList },
  { label: "Penjadwalan", href: "/admin/schedule", icon: CalendarDays },
  { label: "Penugasan", href: "/admin/assignment", icon: UserCheck },
  { label: "Teknisi", href: "/admin/technicians", icon: HardHat },
  { label: "Pelanggan", href: "/admin/customers", icon: Users },
  { label: "Layanan", href: "/admin/services", icon: Bug },
  { label: "Laporan", href: "/admin/reports", icon: BarChart3 },
  { label: "Feedback", href: "/admin/feedback", icon: Star },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const initials = ADMIN.name.split(" ").map((w) => w[0]).join("");

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/admin" onClick={() => setOpen(false)}>
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

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
      {/* Sidebar desktop */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block"
        style={{ background: "var(--ink)" }}
      >
        {SidebarContent}
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside
            className="absolute inset-y-0 left-0 w-64"
            style={{ background: "var(--ink)" }}
          >
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Area kanan */}
      <div className="lg:pl-64">
        {/* Topbar */}
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
              <div className="relative hidden sm:block">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--faint)]"
                />
                <input
                  placeholder="Cari pesanan, pelanggan…"
                  className="h-10 w-64 rounded-[var(--r)] border border-[var(--line-strong)] bg-[var(--paper)] pl-9 pr-3 text-sm outline-none focus:border-[var(--teal)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label="Notifikasi"
                className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--muted)] hover:bg-[var(--paper)]"
              >
                <Bell size={19} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--st-cancelled)] ring-2 ring-[var(--surface)]" />
              </button>
              <div className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 hover:bg-[var(--paper)]">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold text-white"
                  style={{ background: "var(--teal)" }}
                >
                  {initials}
                </span>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-bold leading-tight">{ADMIN.name}</p>
                  <p className="text-[11px] text-[var(--muted)]">{ADMIN.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
