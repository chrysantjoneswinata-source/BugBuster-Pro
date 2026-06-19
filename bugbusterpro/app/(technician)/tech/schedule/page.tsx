import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PestIcon } from "@/components/ui/pest";
import { TECH_JOBS } from "@/lib/tech-data";
import { PEST, SERVICE_TYPE, formatDate, formatDay, formatTime } from "@/lib/utils";
import type { Booking } from "@/lib/types";

export default function TechSchedulePage() {
  const upcoming = TECH_JOBS.filter(
    (b) => b.status === "scheduled" || b.status === "in_progress"
  ).sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));

  const groups = upcoming.reduce<Record<string, Booking[]>>((acc, b) => {
    const key = b.scheduledAt.slice(0, 10);
    (acc[key] ??= []).push(b);
    return acc;
  }, {});
  const days = Object.keys(groups).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Jadwal saya</h1>
        <p className="mt-1 text-[var(--muted)]">
          Kunjungan yang akan datang.
        </p>
      </div>

      {days.length === 0 ? (
        <div className="card card-pad flex flex-col items-center py-14 text-center">
          <CalendarDays size={26} className="text-[var(--faint)]" />
          <p className="mt-3 font-bold">Belum ada jadwal</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Tugas yang dijadwalkan akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-7">
          {days.map((day) => {
            const iso = groups[day][0].scheduledAt;
            return (
              <div key={day}>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-[12px] text-white"
                    style={{ background: "var(--ink)" }}
                  >
                    <span className="num text-lg font-extrabold">
                      {new Date(iso).getDate()}
                    </span>
                  </span>
                  <div>
                    <p className="font-display font-bold">{formatDay(iso)}</p>
                    <p className="text-sm text-[var(--muted)]">{formatDate(iso)}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-[var(--paper)] px-2.5 py-1 text-xs font-bold text-[var(--muted)]">
                    {groups[day].length} kunjungan
                  </span>
                </div>

                <div className="space-y-2.5 border-l-2 border-[var(--line)] pl-4">
                  {groups[day].map((b) => (
                    <Link
                      key={b.id}
                      href={`/tech/jobs/${b.id}`}
                      className="card card-hover card-pad block"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex w-12 shrink-0 items-center gap-1 text-sm font-bold text-[var(--teal)]">
                          <Clock size={14} /> {formatTime(b.scheduledAt)}
                        </span>
                        <span
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px]"
                          style={{ background: "var(--paper)", color: PEST[b.pestType].tone }}
                        >
                          <PestIcon type={b.pestType} size={20} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{b.customer.name}</p>
                          <p className="truncate text-xs text-[var(--muted)]">
                            {PEST[b.pestType].label} ·{" "}
                            {SERVICE_TYPE[b.serviceType].label}
                          </p>
                          <p className="mt-1 flex items-center gap-1 truncate text-xs text-[var(--faint)]">
                            <MapPin size={12} /> {b.address}
                          </p>
                        </div>
                        <StatusBadge status={b.status} short />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
