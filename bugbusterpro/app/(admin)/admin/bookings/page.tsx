"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Inbox } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PestIcon } from "@/components/ui/pest";
import { ADMIN_BOOKINGS, getTechnician } from "@/lib/admin-data";
import { PEST, SERVICE_TYPE, formatDateShort, cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

const TABS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "pending", label: "Menunggu" },
  { id: "confirmed", label: "Dikonfirmasi" },
  { id: "scheduled", label: "Terjadwal" },
  { id: "in_progress", label: "Dikerjakan" },
  { id: "completed", label: "Selesai" },
  { id: "cancelled", label: "Dibatalkan" },
];

export default function AdminBookingsPage() {
  const [tab, setTab] = useState<BookingStatus | "all">("all");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: ADMIN_BOOKINGS.length };
    for (const b of ADMIN_BOOKINGS) c[b.status] = (c[b.status] ?? 0) + 1;
    return c;
  }, []);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ADMIN_BOOKINGS.filter((b) => tab === "all" || b.status === tab).filter(
      (b) =>
        !query ||
        b.code.toLowerCase().includes(query) ||
        b.customer.name.toLowerCase().includes(query) ||
        PEST[b.pestType].label.toLowerCase().includes(query)
    );
  }, [tab, q]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">Pesanan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Kelola, verifikasi, dan pantau seluruh permintaan layanan.
        </p>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--faint)]"
        />
        <input
          className="input input-icon"
          placeholder="Cari kode, nama pelanggan, atau jenis hama…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition",
              tab === t.id
                ? "bg-[var(--ink)] text-white"
                : "border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--faint)]"
            )}
          >
            {t.label}
            <span
              className={cn(
                "rounded-full px-1.5 text-[11px] font-bold",
                tab === t.id ? "bg-white/15" : "bg-[var(--paper)] text-[var(--faint)]"
              )}
            >
              {counts[t.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="card card-pad flex flex-col items-center py-14 text-center">
          <Inbox size={26} className="text-[var(--faint)]" />
          <p className="mt-3 font-bold">Tidak ada pesanan</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Tidak ada pesanan yang cocok dengan filter atau pencarian.
          </p>
        </div>
      ) : (
        <>
          {/* Tabel desktop */}
          <div className="card hidden overflow-hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-left text-xs uppercase tracking-wide text-[var(--faint)]">
                  <th className="px-4 py-3 font-semibold">Kode</th>
                  <th className="px-4 py-3 font-semibold">Pelanggan</th>
                  <th className="px-4 py-3 font-semibold">Layanan</th>
                  <th className="px-4 py-3 font-semibold">Jadwal</th>
                  <th className="px-4 py-3 font-semibold">Teknisi</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {rows.map((b) => {
                  const tech = getTechnician(b.technicianId);
                  return (
                    <tr key={b.id} className="transition hover:bg-[var(--paper)]">
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="num font-semibold text-[var(--teal)] hover:underline"
                        >
                          {b.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium">{b.customer.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2">
                          <span style={{ color: PEST[b.pestType].tone }}>
                            <PestIcon type={b.pestType} size={18} />
                          </span>
                          {PEST[b.pestType].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {formatDateShort(b.scheduledAt)}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {tech ? tech.name : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.status} short />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="text-[var(--faint)] hover:text-[var(--teal)]"
                        >
                          <ChevronRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Kartu mobile */}
          <div className="space-y-2.5 md:hidden">
            {rows.map((b) => {
              const tech = getTechnician(b.technicianId);
              return (
                <Link
                  key={b.id}
                  href={`/admin/bookings/${b.id}`}
                  className="card card-pad block"
                >
                  <div className="flex items-center justify-between">
                    <span className="num text-sm font-bold text-[var(--teal)]">
                      {b.code}
                    </span>
                    <StatusBadge status={b.status} short />
                  </div>
                  <p className="mt-1 font-semibold">{b.customer.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    {PEST[b.pestType].label} · {SERVICE_TYPE[b.serviceType].label} ·{" "}
                    {formatDateShort(b.scheduledAt)}
                  </p>
                  {tech && (
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      Teknisi: {tech.name}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
