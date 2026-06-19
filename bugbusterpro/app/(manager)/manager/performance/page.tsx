"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Star, Clock, CheckCircle2, Users } from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { TECH_PERF, CHART } from "@/lib/manager-data";
import { PEST, cn } from "@/lib/utils";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e6eded",
  fontSize: 13,
  boxShadow: "0 6px 20px rgba(10,26,35,0.08)",
} as const;

export default function ManagerPerformance() {
  const teamJobs = TECH_PERF.reduce((s, t) => s + t.jobsCompleted, 0);
  const avgRating =
    TECH_PERF.reduce((s, t) => s + t.rating, 0) / TECH_PERF.length;
  const avgOnTime = Math.round(
    TECH_PERF.reduce((s, t) => s + t.onTimeRate, 0) / TECH_PERF.length
  );

  const stats = [
    { icon: CheckCircle2, label: "Total tugas tim", value: teamJobs.toString(), tone: CHART.teal },
    { icon: Star, label: "Rating rata-rata", value: avgRating.toFixed(2), tone: CHART.pending },
    { icon: Clock, label: "Tepat waktu rata-rata", value: `${avgOnTime}%`, tone: CHART.done },
    { icon: Users, label: "Jumlah teknisi", value: TECH_PERF.length.toString(), tone: CHART.scheduled },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Kinerja Tim</h1>
        <p className="mt-1 text-[var(--muted)]">
          Performa teknisi dan kontribusinya.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-pad">
              <span
                className="grid h-10 w-10 place-items-center rounded-[11px]"
                style={{ background: `color-mix(in srgb, ${s.tone} 14%, transparent)`, color: s.tone }}
              >
                <Icon size={20} />
              </span>
              <p className="num mt-3 text-2xl font-extrabold">{s.value}</p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Grafik tugas selesai */}
      <div className="card card-pad sm:p-6">
        <h2 className="mb-4 text-base font-bold">Tugas selesai per teknisi</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={TECH_PERF}
            layout="vertical"
            margin={{ top: 6, right: 16, left: 8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={CHART.line} horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: CHART.muted }} />
            <YAxis
              type="category"
              dataKey="shortName"
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{ fontSize: 12, fill: CHART.muted }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(14,148,136,0.06)" }}
              formatter={(v: any) => [v, "Tugas selesai"]}
            />
            <Bar dataKey="jobsCompleted" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {TECH_PERF.map((_, i) => (
                <Cell key={i} fill={i === 0 ? CHART.teal : CHART.aqua} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabel leaderboard */}
      <div className="card overflow-hidden">
        <div className="border-b border-[var(--line)] px-4 py-3 sm:px-6">
          <h2 className="text-base font-bold">Papan peringkat</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left text-xs uppercase tracking-wide text-[var(--faint)]">
                <th className="px-4 py-3 font-semibold sm:px-6">#</th>
                <th className="px-4 py-3 font-semibold">Teknisi</th>
                <th className="px-4 py-3 font-semibold">Spesialis</th>
                <th className="px-4 py-3 font-semibold">Selesai</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Tepat waktu</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {TECH_PERF.map((t, i) => (
                <tr key={t.id} className="hover:bg-[var(--paper)]">
                  <td className="num px-4 py-3 font-bold text-[var(--faint)] sm:px-6">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2.5">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[11px] font-bold text-white"
                        style={{ background: "var(--ink)" }}
                      >
                        {t.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                      <span className="font-semibold">{t.name}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                      <span style={{ color: PEST[t.specialty].tone }}>
                        <PestIcon type={t.specialty} size={15} />
                      </span>
                      {PEST[t.specialty].label}
                    </span>
                  </td>
                  <td className="num px-4 py-3 font-semibold">{t.jobsCompleted}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Star size={13} className="fill-[var(--st-pending)] text-[var(--st-pending)]" />
                      {t.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="num px-4 py-3 text-[var(--muted)]">{t.onTimeRate}%</td>
                  <td className="px-4 py-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
