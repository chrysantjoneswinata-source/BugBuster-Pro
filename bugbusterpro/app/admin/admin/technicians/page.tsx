import Link from "next/link";
import { Star, ChevronRight, Plus } from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { TECHNICIANS, technicianJobs } from "@/lib/admin-data";
import { PEST, cn } from "@/lib/utils";

export default function TechniciansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Teknisi</h1>
          <p className="mt-1 text-[var(--muted)]">
            Kelola tim teknisi dan pantau performanya.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={17} /> Tambah teknisi
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNICIANS.map((t) => {
          const jobs = technicianJobs(t.id);
          const active = jobs.filter((b) =>
            ["scheduled", "in_progress"].includes(b.status)
          ).length;
          return (
            <Link
              key={t.id}
              href={`/admin/technicians/${t.id}`}
              className="card card-hover card-pad"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-base font-bold text-white"
                  style={{ background: "var(--ink)" }}
                >
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{t.name}</p>
                  <p className="flex items-center gap-1 text-xs text-[var(--muted)]">
                    <span style={{ color: PEST[t.specialty].tone }}>
                      <PestIcon type={t.specialty} size={13} />
                    </span>
                    Spesialis {PEST[t.specialty].label}
                  </p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-[var(--faint)]" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-bold",
                    t.status === "active"
                      ? "bg-[var(--st-done-bg)] text-[var(--st-done)]"
                      : "bg-[var(--st-pending-bg)] text-[var(--st-pending)]"
                  )}
                >
                  {t.status === "active" ? "Aktif" : "Cuti"}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Star size={14} className="fill-[var(--st-pending)] text-[var(--st-pending)]" />
                  {t.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--line)] pt-4 text-center">
                <Stat value={active} label="Tugas aktif" />
                <Stat value={t.jobsCompleted} label="Selesai" />
                <Stat value={`${t.onTimeRate}%`} label="Tepat waktu" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <p className="num text-lg font-extrabold">{value}</p>
      <p className="text-[11px] text-[var(--muted)]">{label}</p>
    </div>
  );
}
