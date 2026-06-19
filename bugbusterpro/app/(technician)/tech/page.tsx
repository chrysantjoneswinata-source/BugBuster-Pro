import Link from "next/link";
import {
  Loader,
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PestIcon } from "@/components/ui/pest";
import {
  TECH_JOBS,
  TECH_TODAY,
  CURRENT_TECH,
  techCountByStatus,
} from "@/lib/tech-data";
import { PEST, SERVICE_TYPE, formatTime, formatDate } from "@/lib/utils";

export default function TechToday() {
  const counts = techCountByStatus();
  const firstName = CURRENT_TECH.name.split(" ")[0];

  const inProgress = TECH_JOBS.filter((b) => b.status === "in_progress");
  const todayScheduled = TECH_JOBS.filter(
    (b) => b.status === "scheduled" && b.scheduledAt.startsWith(TECH_TODAY)
  ).sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));

  const todayCount = inProgress.length + todayScheduled.length;

  const stats = [
    { label: "Tugas hari ini", value: todayCount, icon: CalendarCheck, tone: "var(--teal)" },
    { label: "Sedang dikerjakan", value: counts.in_progress ?? 0, icon: Loader, tone: "var(--st-progress)" },
    { label: "Selesai", value: counts.completed ?? 0, icon: CheckCircle2, tone: "var(--st-done)" },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Hai {firstName} 👋</h1>
        <p className="mt-1 text-[var(--muted)]">{formatDate(TECH_TODAY)}</p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-pad">
              <Icon size={20} style={{ color: s.tone }} />
              <p className="num mt-2 text-2xl font-extrabold">{s.value}</p>
              <p className="text-[11px] text-[var(--muted)] sm:text-xs">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Sedang dikerjakan */}
      {inProgress.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold">Sedang dikerjakan</h2>
          <div className="space-y-3">
            {inProgress.map((b) => (
              <div
                key={b.id}
                className="card card-pad"
                style={{ borderColor: "var(--st-progress)" }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px]"
                    style={{ background: "var(--st-progress-bg)", color: "var(--st-progress)" }}
                  >
                    <PestIcon type={b.pestType} size={24} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="num text-xs font-semibold text-[var(--muted)]">
                        {b.code}
                      </p>
                      <StatusBadge status={b.status} short />
                    </div>
                    <p className="mt-0.5 font-bold">{b.customer.name}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {PEST[b.pestType].label} · {SERVICE_TYPE[b.serviceType].label}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/tech/jobs/${b.id}`}
                  className="btn btn-primary btn-block mt-3"
                >
                  <PlayCircle size={17} /> Lanjutkan pengerjaan
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Jadwal hari ini */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Jadwal hari ini</h2>
          <Link
            href="/tech/jobs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] hover:underline"
          >
            Semua tugas <ArrowRight size={15} />
          </Link>
        </div>

        {todayScheduled.length > 0 ? (
          <div className="space-y-2.5">
            {todayScheduled.map((b) => (
              <Link
                key={b.id}
                href={`/tech/jobs/${b.id}`}
                className="card card-hover card-pad block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex w-14 shrink-0 flex-col items-center">
                    <span className="flex items-center gap-1 text-sm font-bold text-[var(--teal)]">
                      <Clock size={13} /> {formatTime(b.scheduledAt)}
                    </span>
                  </div>
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px]"
                    style={{ background: "var(--paper)", color: PEST[b.pestType].tone }}
                  >
                    <PestIcon type={b.pestType} size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{b.customer.name}</p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      {PEST[b.pestType].label} · {SERVICE_TYPE[b.serviceType].label}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-[var(--faint)]">
                      <MapPin size={12} /> {b.address}
                    </p>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-[var(--faint)]" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card card-pad text-center text-sm text-[var(--muted)]">
            Tidak ada jadwal kunjungan lagi untuk hari ini. 👍
          </div>
        )}
      </section>
    </div>
  );
}
