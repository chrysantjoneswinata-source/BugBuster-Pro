"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ClipboardList,
  Clock,
  User,
  Plus,
  Bell,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { CURRENT_CUSTOMER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Beranda", icon: Home },
  { href: "/bookings", label: "Pesanan", icon: ClipboardList },
  { href: "/history", label: "Riwayat", icon: Clock },
  { href: "/profile", label: "Profil", icon: User },
];

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const initials = CURRENT_CUSTOMER.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="min-h-screen">
      {/* ── Top bar (desktop) ── */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--surface)]/85 backdrop-blur-md">
        <div className="container-app flex h-16 items-center justify-between gap-4">
          <Link href="/dashboard" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[var(--r)] px-3.5 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-[var(--teal-soft)] text-[var(--teal-strong)]"
                      : "text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--text)]"
                  )}
                >
                  <Icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/book"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              <Plus size={16} /> Pesan layanan
            </Link>
            <button
              type="button"
              aria-label="Notifikasi"
              className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--paper)]"
            >
              <Bell size={19} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--st-cancelled)] ring-2 ring-[var(--surface)]" />
            </button>
            <Link
              href="/profile"
              className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold text-white"
              style={{ background: "var(--ink)" }}
              title={CURRENT_CUSTOMER.name}
            >
              {initials}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Konten ── */}
      <main className="container-app py-7 pb-28 md:pb-12">{children}</main>

      {/* ── Bottom nav (mobile) ── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-5 items-center px-2 py-1.5">
          {NAV.slice(0, 2).map((item) => (
            <BottomLink key={item.href} item={item} active={isActive(item.href)} />
          ))}

          {/* tombol pesan di tengah */}
          <Link
            href="/book"
            className="mx-auto -mt-5 grid h-14 w-14 place-items-center rounded-full text-white shadow-lg"
            style={{ background: "var(--teal)" }}
            aria-label="Pesan layanan"
          >
            <Plus size={26} />
          </Link>

          {NAV.slice(2).map((item) => (
            <BottomLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function BottomLink({
  item,
  active,
}: {
  item: (typeof NAV)[number];
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold transition",
        active ? "text-[var(--teal)]" : "text-[var(--faint)]"
      )}
    >
      <Icon size={21} strokeWidth={active ? 2.4 : 2} />
      {item.label}
    </Link>
  );
}
