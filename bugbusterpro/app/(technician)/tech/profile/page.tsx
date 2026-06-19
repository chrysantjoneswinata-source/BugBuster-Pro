import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Clock,
  Award,
  Phone,
  Mail,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { CURRENT_TECH, techCountByStatus } from "@/lib/tech-data";
import { PEST } from "@/lib/utils";

export default function TechProfilePage() {
  const counts = techCountByStatus();

  const stats = [
    { icon: CheckCircle2, value: CURRENT_TECH.jobsCompleted, label: "Tugas selesai" },
    { icon: Clock, value: `${CURRENT_TECH.onTimeRate}%`, label: "Tepat waktu" },
    { icon: Star, value: CURRENT_TECH.rating.toFixed(1), label: "Rating" },
    { icon: Award, value: CURRENT_TECH.reviews, label: "Ulasan" },
  ];

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="font-display text-2xl font-extrabold">Profil</h1>

      {/* Kartu profil */}
      <div className="card card-pad sm:p-6">
        <div className="flex items-center gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full font-display text-xl font-extrabold text-white"
            style={{ background: "var(--ink)" }}
          >
            {CURRENT_TECH.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-extrabold">
              {CURRENT_TECH.name}
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <span style={{ color: PEST[CURRENT_TECH.specialty].tone }}>
                <PestIcon type={CURRENT_TECH.specialty} size={15} />
              </span>
              Spesialis {PEST[CURRENT_TECH.specialty].label}
            </p>
            <span className="mt-1.5 inline-block rounded-full bg-[var(--st-done-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--st-done)]">
              Aktif bertugas
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">
          <p className="flex items-center gap-2">
            <Phone size={15} className="text-[var(--teal)]" /> 0812-1111-2222
          </p>
          <p className="flex items-center gap-2 truncate">
            <Mail size={15} className="text-[var(--teal)]" /> vey@bugbusterpro.id
          </p>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-pad text-center sm:text-left">
              <Icon size={18} className="mx-auto text-[var(--teal)] sm:mx-0" />
              <p className="num mt-2 text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs text-[var(--muted)]">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Ringkasan tugas */}
      <div className="card card-pad sm:p-6">
        <h3 className="mb-3 font-bold">Ringkasan tugas</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Summary value={counts.scheduled ?? 0} label="Terjadwal" tone="var(--st-scheduled)" />
          <Summary value={counts.in_progress ?? 0} label="Dikerjakan" tone="var(--st-progress)" />
          <Summary value={counts.completed ?? 0} label="Selesai" tone="var(--st-done)" />
        </div>
        <Link
          href="/tech/jobs"
          className="mt-4 flex items-center justify-between rounded-[var(--r)] bg-[var(--paper)] px-4 py-3 text-sm font-semibold transition hover:bg-[var(--teal-soft)]"
        >
          Lihat semua tugas
          <ChevronRight size={17} />
        </Link>
      </div>

      <Link
        href="/login"
        className="btn btn-secondary btn-block text-[var(--st-cancelled)]"
      >
        <LogOut size={17} /> Keluar
      </Link>
    </div>
  );
}

function Summary({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: string;
}) {
  return (
    <div className="rounded-[var(--r)] bg-[var(--paper)] py-3">
      <p className="num text-2xl font-extrabold" style={{ color: tone }}>
        {value}
      </p>
      <p className="text-[11px] text-[var(--muted)]">{label}</p>
    </div>
  );
}
