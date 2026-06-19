"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PestIcon } from "@/components/ui/pest";
import { TECHNICIANS, technicianJobs } from "@/lib/admin-data";
import { PEST, SERVICE_TYPE, formatDateShort, cn } from "@/lib/utils";

export default function TechnicianDetail() {
  const { id } = useParams<{ id: string }>();
  const tech = TECHNICIANS.find((t) => t.id === id);

  if (!tech) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-lg font-bold">Teknisi tidak ditemukan</p>
        <Link href="/admin/technicians" className="btn btn-primary mt-6">
          Kembali ke daftar teknisi
        </Link>
      </div>
    );
  }

  const jobs = technicianJobs(tech.id).sort(
    (a, b) => +new Date(b.scheduledAt) - +new Date(a.scheduledAt)
  );
  const active = jobs.filter((b) =>
    ["scheduled", "in_progress"].includes(b.status)
  );

  const stats = [
    { icon: CheckCircle2, value: tech.jobsCompleted, label: "Tugas selesai" },
    { icon: Clock, value: `${tech.onTimeRate}%`, label: "Tepat waktu" },
    { icon: TrendingUp, value: active.length, label: "Tugas aktif" },
    { icon: Star, value: tech.reviews, label: "Ulasan" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/technicians"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Semua teknisi
      </Link>

      {/* Header */}
      <div className="card card-pad sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full font-display text-xl font-extrabold text-white"
            style={{ background: "var(--ink)" }}
          >
            {tech.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-extrabold">{tech.name}</h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <span style={{ color: PEST[tech.specialty].tone }}>
                <PestIcon type={tech.specialty} size={15} />
              </span>
              Spesialis {PEST[tech.specialty].label}
              <span
                className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                  tech.status === "active"
                    ? "bg-[var(--st-done-bg)] text-[var(--st-done)]"
                    : "bg-[var(--st-pending-bg)] text-[var(--st-pending)]"
                )}
              >
                {tech.status === "active" ? "Aktif" : "Cuti"}
              </span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold">
              <Star size={15} className="fill-[var(--st-pending)] text-[var(--st-pending)]" />
              {tech.rating.toFixed(1)}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm">
              <Phone size={15} /> Telepon
            </button>
            <button className="btn btn-secondary btn-sm">
              <Mail size={15} /> Email
            </button>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-pad">
              <Icon size={18} className="text-[var(--teal)]" />
              <p className="num mt-2 text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs text-[var(--muted)]">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tugas */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Riwayat penugasan</h2>
        {jobs.length === 0 ? (
          <div className="card card-pad text-center text-sm text-[var(--muted)]">
            Belum ada penugasan.
          </div>
        ) : (
          <div className="card divide-y divide-[var(--line)]">
            {jobs.map((b) => (
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
                    {SERVICE_TYPE[b.serviceType].label} ·{" "}
                    {formatDateShort(b.scheduledAt)}
                  </p>
                </div>
                <StatusBadge status={b.status} short />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
