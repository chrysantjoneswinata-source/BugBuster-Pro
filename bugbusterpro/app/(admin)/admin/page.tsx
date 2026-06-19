import Link from "next/link";
import {
  ClipboardList,
  Clock,
  Loader,
  CheckCircle2,
  ArrowRight,
  HardHat,
  ChevronRight,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PestIcon } from "@/components/ui/pest";
import {
  ADMIN_BOOKINGS,
  CUSTOMERS,
  TECHNICIANS,
  getTechnician,
  countByStatus,
} from "@/lib/admin-data";
import { PEST, SERVICE_TYPE, STATUS, formatDateShort } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

export default function AdminDashboard() {
  const counts = countByStatus();
  const total = ADMIN_BOOKINGS.length;
  const pending = ADMIN_BOOKINGS.filter((b) => b.status === "pending");
  const running = (counts.scheduled ?? 0) + (counts.in_progress ?? 0);
  const activeTechs = TECHNICIANS.filter((t) => t.status === "active").length;

  const stats = [
    { label: "Total Pesanan", value: total, icon: ClipboardList, tone: "var(--teal)" },
    { label: "Menunggu Konfirmasi", value: counts.pending ?? 0, icon: Clock, tone: "var(--st-pending)" },
    { label: "Sedang Berjalan", value: running, icon: Loader, tone: "var(--st-progress)" },
    { label: "Selesai", value: counts.completed ?? 0, icon: CheckCircle2, tone: "var(--st-done)" },
  ];

  const recent = [...ADMIN_BOOKINGS]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 6);

  const FLOW: BookingStatus[] = [
    "pending",
    "confirmed",
    "scheduled",
    "in_progress",
    "completed",
    "cancelled",
  ];

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-[var(--muted)]">
          Ringkasan operasional layanan hari ini.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-pad">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[11px]"
                  style={{ background: `color-mix(in srgb, ${s.tone} 14%, transparent)`, color: s.tone }}
                >
                  <Icon size={20} />
                </span>
              </div>
              <p className="num mt-3 text-3xl font-extrabold">{s.value}</p>
              <p className="mt-0.5 text-xs text-[var(--muted)] sm:text-sm">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Perlu tindakan */}
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Perlu tindakan{" "}
              {pending.length > 0 && (
                <span className="ml-1 rounded-full bg-[var(--st-pending-bg)] px-2 py-0.5 text-xs font-bold text-[var(--st-pending)]">
                  {pending.length}
                </span>
              )}
            </h2>
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] hover:underline"
            >
              Semua pesanan <ArrowRight size={15} />
            </Link>
          </div>

          {pending.length > 0 ? (
            <div className="space-y-2.5">
              {pending.map((b) => (
                <Link
                  key={b.id}
                  href={`/admin/bookings/${b.id}`}
                  className="card card-hover flex items-center gap-3 p-3.5"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
                    style={{ background: "var(--paper)", color: PEST[b.pestType].tone }}
                  >
                    <PestIcon type={b.pestType} size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {b.customer.name}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      {b.code} · {PEST[b.pestType].label} ·{" "}
                      {formatDateShort(b.scheduledAt)}
                    </p>
                  </div>
                  <span className="hidden sm:block">
                    <StatusBadge status={b.status} short />
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-[var(--faint)]" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="card card-pad text-center text-sm text-[var(--muted)]">
              Tidak ada pesanan yang menunggu konfirmasi. 🎉
            </div>
          )}
        </section>

        {/* Ringkasan kanan */}
        <section className="space-y-6">
          {/* Distribusi status */}
          <div className="card card-pad">
            <h2 className="mb-4 text-lg font-bold">Distribusi status</h2>
            <div className="space-y-3">
              {FLOW.map((st) => {
                const v = counts[st] ?? 0;
                const pct = total ? Math.round((v / total) * 100) : 0;
                return (
                  <div key={st}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-semibold">{STATUS[st].label}</span>
                      <span className="num text-[var(--muted)]">{v}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: STATUS[st].dot }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teknisi & pelanggan */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/technicians" className="card card-hover card-pad">
              <HardHat size={20} className="text-[var(--teal)]" />
              <p className="num mt-2 text-2xl font-extrabold">{activeTechs}</p>
              <p className="text-xs text-[var(--muted)]">Teknisi aktif</p>
            </Link>
            <Link href="/admin/customers" className="card card-hover card-pad">
              <ClipboardList size={20} className="text-[var(--teal)]" />
              <p className="num mt-2 text-2xl font-extrabold">{CUSTOMERS.length}</p>
              <p className="text-xs text-[var(--muted)]">Pelanggan</p>
            </Link>
          </div>
        </section>
      </div>

      {/* Aktivitas terbaru */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Aktivitas terbaru</h2>
        <div className="card overflow-hidden">
          <div className="divide-y divide-[var(--line)]">
            {recent.map((b) => {
              const tech = getTechnician(b.technicianId);
              return (
                <Link
                  key={b.id}
                  href={`/admin/bookings/${b.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-[var(--paper)]"
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px]"
                    style={{ background: "var(--paper)", color: PEST[b.pestType].tone }}
                  >
                    <PestIcon type={b.pestType} size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {b.code} · {b.customer.name}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      {PEST[b.pestType].label} · {SERVICE_TYPE[b.serviceType].label}
                      {tech && ` · ${tech.name}`}
                    </p>
                  </div>
                  <StatusBadge status={b.status} short />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
