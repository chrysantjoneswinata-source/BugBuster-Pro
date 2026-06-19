import { ClipboardList, CheckCircle2, Percent, Wallet, Star } from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import {
  ADMIN_BOOKINGS,
  TECHNICIANS,
  SERVICES,
  technicianJobs,
  formatRupiah,
} from "@/lib/admin-data";
import { PEST } from "@/lib/utils";
import type { PestType } from "@/lib/types";

export default function ReportsPage() {
  const total = ADMIN_BOOKINGS.length;
  const completed = ADMIN_BOOKINGS.filter((b) => b.status === "completed");
  const completionRate = total
    ? Math.round((completed.length / total) * 100)
    : 0;

  // Estimasi pendapatan dari layanan yang selesai (harga per jenis hama)
  const priceFor = (pest: PestType) =>
    SERVICES.find((s) => s.pest === pest)?.price ?? 0;
  const revenue = completed.reduce((sum, b) => sum + priceFor(b.pestType), 0);

  // Booking per jenis hama
  const pestTypes = Object.keys(PEST) as PestType[];
  const perPest = pestTypes
    .map((p) => ({
      pest: p,
      count: ADMIN_BOOKINGS.filter((b) => b.pestType === p).length,
    }))
    .sort((a, b) => b.count - a.count);
  const maxPest = Math.max(1, ...perPest.map((p) => p.count));

  // Performa teknisi
  const techPerf = TECHNICIANS.map((t) => ({
    ...t,
    jobs: technicianJobs(t.id).length,
  })).sort((a, b) => b.jobsCompleted - a.jobsCompleted);

  const metrics = [
    { icon: ClipboardList, value: String(total), label: "Total pesanan", tone: "var(--teal)" },
    { icon: CheckCircle2, value: String(completed.length), label: "Selesai", tone: "var(--st-done)" },
    { icon: Percent, value: `${completionRate}%`, label: "Tingkat penyelesaian", tone: "var(--st-scheduled)" },
    { icon: Wallet, value: formatRupiah(revenue), label: "Estimasi pendapatan", tone: "var(--st-pending)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Laporan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Ringkasan kinerja operasional layanan.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="card card-pad">
              <span
                className="grid h-10 w-10 place-items-center rounded-[11px]"
                style={{ background: `color-mix(in srgb, ${m.tone} 14%, transparent)`, color: m.tone }}
              >
                <Icon size={20} />
              </span>
              <p className="num mt-3 text-2xl font-extrabold">{m.value}</p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Per jenis hama */}
        <section className="card card-pad sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Pesanan per jenis hama</h2>
          <div className="space-y-4">
            {perPest.map((p) => (
              <div key={p.pest}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <span style={{ color: PEST[p.pest].tone }}>
                      <PestIcon type={p.pest} size={16} />
                    </span>
                    {PEST[p.pest].label}
                  </span>
                  <span className="num text-[var(--muted)]">{p.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(p.count / maxPest) * 100}%`,
                      background: "var(--teal)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performa teknisi */}
        <section className="card card-pad sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Performa teknisi</h2>
          <div className="space-y-1">
            {techPerf.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-[var(--r)] px-2 py-2 hover:bg-[var(--paper)]"
              >
                <span className="num w-5 text-center text-sm font-bold text-[var(--faint)]">
                  {i + 1}
                </span>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white"
                  style={{ background: "var(--ink)" }}
                >
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {t.jobsCompleted} tugas selesai
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Star size={13} className="fill-[var(--st-pending)] text-[var(--st-pending)]" />
                  {t.rating.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
