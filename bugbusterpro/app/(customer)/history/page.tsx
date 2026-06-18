import Link from "next/link";
import {
  Star,
  FileText,
  ChevronRight,
  ShieldCheck,
  Clock,
  XCircle,
} from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { StatusBadge } from "@/components/ui/status-badge";
import { BOOKINGS } from "@/lib/mock-data";
import {
  PEST,
  SERVICE_TYPE,
  formatDate,
} from "@/lib/utils";

export default function HistoryPage() {
  const completed = BOOKINGS.filter((b) => b.status === "completed");
  const cancelled = BOOKINGS.filter((b) => b.status === "cancelled");

  const rated = completed.filter((b) => b.feedback);
  const avgRating =
    rated.length > 0
      ? (
          rated.reduce((sum, b) => sum + (b.feedback?.rating ?? 0), 0) /
          rated.length
        ).toFixed(1)
      : "–";

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Arsip layanan</p>
        <h1 className="mt-1 text-3xl font-extrabold">Riwayat layanan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Catatan lengkap layanan yang telah selesai dan laporannya.
        </p>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          icon={<ShieldCheck size={20} />}
          value={String(completed.length)}
          label="Layanan selesai"
        />
        <StatCard
          icon={<Star size={20} />}
          value={avgRating}
          label="Rata-rata rating"
        />
        <StatCard
          icon={<Clock size={20} />}
          value={String(BOOKINGS.length)}
          label="Total pesanan"
        />
      </div>

      {/* Selesai */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Layanan selesai</h2>
        {completed.length > 0 ? (
          <div className="space-y-3">
            {completed.map((b) => {
              const pest = PEST[b.pestType];
              return (
                <div key={b.id} className="card card-pad">
                  <div className="flex items-start gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px]"
                      style={{ background: "var(--paper)", color: pest.tone }}
                    >
                      <PestIcon type={b.pestType} size={24} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-[15px] font-bold">
                          {pest.label} · {SERVICE_TYPE[b.serviceType].label}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">
                        {b.code} · {formatDate(b.scheduledAt)}
                      </p>
                      {b.feedback && (
                        <span className="mt-1.5 inline-flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < b.feedback!.rating
                                  ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                                  : "text-[var(--line-strong)]"
                              }
                            />
                          ))}
                        </span>
                      )}
                    </div>
                    <StatusBadge status={b.status} short />
                  </div>

                  <div className="mt-4 flex flex-col gap-2.5 border-t border-[var(--line)] pt-4 sm:flex-row">
                    <Link
                      href={`/bookings/${b.id}/report`}
                      className="btn btn-secondary btn-sm btn-block"
                    >
                      <FileText size={15} /> Lihat laporan
                    </Link>
                    <Link
                      href={`/bookings/${b.id}`}
                      className="btn btn-ghost btn-sm btn-block"
                    >
                      Detail pesanan <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyHistory />
        )}
      </section>

      {/* Dibatalkan */}
      {cancelled.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold">Dibatalkan</h2>
          <div className="space-y-3">
            {cancelled.map((b) => {
              const pest = PEST[b.pestType];
              return (
                <Link
                  key={b.id}
                  href={`/bookings/${b.id}`}
                  className="card card-hover card-pad flex items-center gap-4 opacity-90"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] text-[var(--faint)]"
                    style={{ background: "var(--paper)" }}
                  >
                    <XCircle size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[15px] font-bold">
                      {pest.label} · {SERVICE_TYPE[b.serviceType].label}
                    </p>
                    <p className="truncate text-sm text-[var(--muted)]">
                      {b.code} · {b.cancelReason ?? "Dibatalkan"}
                    </p>
                  </div>
                  <StatusBadge status={b.status} short />
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="card card-pad">
      <span
        className="grid h-10 w-10 place-items-center rounded-[11px]"
        style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
      >
        {icon}
      </span>
      <p className="num mt-3 text-3xl font-extrabold">{value}</p>
      <p className="mt-0.5 text-xs text-[var(--muted)] sm:text-sm">{label}</p>
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="card card-pad flex flex-col items-center py-14 text-center">
      <span
        className="grid h-14 w-14 place-items-center rounded-full"
        style={{ background: "var(--paper)", color: "var(--faint)" }}
      >
        <Clock size={26} />
      </span>
      <p className="mt-4 font-bold">Belum ada riwayat</p>
      <p className="mt-1 max-w-xs text-sm text-[var(--muted)]">
        Layanan yang sudah selesai akan muncul di sini beserta laporannya.
      </p>
    </div>
  );
}
