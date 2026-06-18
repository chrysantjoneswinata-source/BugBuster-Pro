"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, Inbox } from "lucide-react";
import { BookingCard } from "@/components/booking-card";
import { BOOKINGS } from "@/lib/mock-data";
import { PEST, SERVICE_TYPE, cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

type Tab = "all" | "active" | "done";

const TABS: { id: Tab; label: string; match: (s: BookingStatus) => boolean }[] = [
  { id: "all", label: "Semua", match: () => true },
  {
    id: "active",
    label: "Berlangsung",
    match: (s) =>
      ["pending", "confirmed", "scheduled", "in_progress"].includes(s),
  },
  { id: "done", label: "Selesai", match: (s) => s === "completed" },
];

export default function BookingsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");

  const counts = useMemo(
    () =>
      TABS.reduce<Record<Tab, number>>(
        (acc, t) => {
          acc[t.id] = BOOKINGS.filter((b) => t.match(b.status)).length;
          return acc;
        },
        { all: 0, active: 0, done: 0 }
      ),
    []
  );

  const filtered = useMemo(() => {
    const matcher = TABS.find((t) => t.id === tab)!.match;
    const query = q.trim().toLowerCase();
    return BOOKINGS.filter((b) => matcher(b.status)).filter((b) => {
      if (!query) return true;
      return (
        b.code.toLowerCase().includes(query) ||
        PEST[b.pestType].label.toLowerCase().includes(query) ||
        SERVICE_TYPE[b.serviceType].label.toLowerCase().includes(query)
      );
    });
  }, [tab, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Riwayat pemesanan</p>
          <h1 className="mt-1 text-3xl font-extrabold">Pesanan saya</h1>
          <p className="mt-1 text-[var(--muted)]">
            Pantau seluruh permintaan layanan Anda di satu tempat.
          </p>
        </div>
        <Link href="/book" className="btn btn-primary">
          <Plus size={17} /> Pesan baru
        </Link>
      </div>

      {/* Pencarian */}
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--faint)]"
        />
        <input
          className="input input-icon"
          placeholder="Cari kode, jenis hama, atau layanan…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t.id
                ? "bg-[var(--ink)] text-white"
                : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--line-strong)] hover:border-[var(--faint)]"
            )}
          >
            {t.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-bold",
                tab === t.id
                  ? "bg-white/15 text-white"
                  : "bg-[var(--paper)] text-[var(--faint)]"
              )}
            >
              {counts[t.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Daftar */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>
      ) : (
        <div className="card card-pad flex flex-col items-center py-14 text-center">
          <span
            className="grid h-14 w-14 place-items-center rounded-full"
            style={{ background: "var(--paper)", color: "var(--faint)" }}
          >
            <Inbox size={26} />
          </span>
          <p className="mt-4 font-bold">Tidak ada pesanan</p>
          <p className="mt-1 max-w-xs text-sm text-[var(--muted)]">
            Belum ada pesanan yang cocok dengan filter atau pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
}
