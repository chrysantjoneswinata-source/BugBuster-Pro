"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, ChevronRight, ClipboardCheck } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PestIcon } from "@/components/ui/pest";
import { TECH_JOBS } from "@/lib/tech-data";
import { PEST, SERVICE_TYPE, formatDateShort, formatTime, cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

const TABS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "scheduled", label: "Terjadwal" },
  { id: "in_progress", label: "Dikerjakan" },
  { id: "completed", label: "Selesai" },
];

export default function TechJobsPage() {
  const [tab, setTab] = useState<BookingStatus | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: TECH_JOBS.length };
    for (const b of TECH_JOBS) c[b.status] = (c[b.status] ?? 0) + 1;
    return c;
  }, []);

  const rows = useMemo(
    () =>
      TECH_JOBS.filter((b) => tab === "all" || b.status === tab).sort(
        (a, b) => +new Date(b.scheduledAt) - +new Date(a.scheduledAt)
      ),
    [tab]
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Tugas saya</h1>
        <p className="mt-1 text-[var(--muted)]">
          Semua tugas yang ditugaskan kepada Anda.
        </p>
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
          <ClipboardCheck size={26} className="text-[var(--faint)]" />
          <p className="mt-3 font-bold">Tidak ada tugas</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Belum ada tugas pada kategori ini.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {rows.map((b) => (
            <Link
              key={b.id}
              href={`/tech/jobs/${b.id}`}
              className="card card-hover card-pad block"
            >
              <div className="flex items-start gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
                  style={{ background: "var(--paper)", color: PEST[b.pestType].tone }}
                >
                  <PestIcon type={b.pestType} size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="num text-xs font-semibold text-[var(--muted)]">
                      {b.code}
                    </p>
                    <StatusBadge status={b.status} short />
                  </div>
                  <p className="mt-0.5 font-bold">{b.customer.name}</p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {PEST[b.pestType].label} · {SERVICE_TYPE[b.serviceType].label}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--faint)]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {formatDateShort(b.scheduledAt)} ·{" "}
                      {formatTime(b.scheduledAt)}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={12} /> {b.address}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="shrink-0 self-center text-[var(--faint)]" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
