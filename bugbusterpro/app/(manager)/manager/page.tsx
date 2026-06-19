"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ClipboardList,
  Wallet,
  Percent,
  Star,
  TrendingUp,
  TrendingDown,
  HardHat,
  UserPlus,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import {
  KPI,
  CHART,
  formatRupiah,
  monthlyTrend,
  statusDistribution,
  pestDistribution,
  MONTH_NAMES,
  STATUS_YEARS,
} from "@/lib/manager-data";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e6eded",
  fontSize: 13,
  boxShadow: "0 6px 20px rgba(10,26,35,0.08)",
} as const;

export default function ManagerDashboard() {
  // Periode terpisah per grafik
  const [ordersYear, setOrdersYear] = useState(2024);
  const [revenueYear, setRevenueYear] = useState(2024);
  const [statusSel, setStatusSel] = useState({ year: 2024, month: 12 });
  const [pestSel, setPestSel] = useState({ year: 2024, month: 12 });

  const ordersData = monthlyTrend(ordersYear);
  const revenueData = monthlyTrend(revenueYear);
  const statusData = statusDistribution(statusSel.year, statusSel.month);
  const pestData = pestDistribution(pestSel.year, pestSel.month);
  const statusTotal = statusData.reduce((s, d) => s + d.value, 0);
  const pestTotal = pestData.reduce((s, d) => s + d.value, 0);

  const kpis = [
    { icon: ClipboardList, label: "Total Pesanan", value: KPI.totalBookings.toString(), growth: KPI.bookingGrowth, tone: CHART.teal },
    { icon: Wallet, label: "Pendapatan", value: formatRupiah(KPI.totalRevenue), growth: KPI.revenueGrowth, tone: CHART.done },
    { icon: Percent, label: "Tingkat Penyelesaian", value: `${KPI.completionRate}%`, tone: CHART.scheduled },
    { icon: Star, label: "Rating Rata-rata", value: KPI.avgRating.toFixed(1), tone: CHART.pending },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Ringkasan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Pantau kinerja layanan per bulan dan per tahun.
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="card card-pad">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[11px]"
                  style={{ background: `color-mix(in srgb, ${k.tone} 14%, transparent)`, color: k.tone }}
                >
                  <Icon size={20} />
                </span>
                {typeof k.growth === "number" && (
                  <span
                    className="inline-flex items-center gap-0.5 text-xs font-bold"
                    style={{ color: k.growth >= 0 ? CHART.done : CHART.cancelled }}
                  >
                    {k.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(k.growth)}%
                  </span>
                )}
              </div>
              <p className="num mt-3 text-xl font-extrabold sm:text-2xl">{k.value}</p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Sekunder */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        <MiniStat icon={HardHat} label="Teknisi aktif" value={KPI.activeTechnicians} />
        <MiniStat icon={UserPlus} label="Pelanggan baru" value={KPI.newCustomers} />
        <MiniStat icon={ClipboardList} label="Pesanan selesai" value={KPI.totalCompleted} />
        <MiniStat icon={Star} label="Total ulasan" value={269} />
      </div>

      {/* Grafik baris 1 — tren (pemilih tahun) */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Tren pesanan & penyelesaian"
          subtitle={`Tahun ${ordersYear}`}
          action={<YearToggle year={ordersYear} onChange={setOrdersYear} />}
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ordersData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="gBook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART.teal} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={CHART.teal} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART.aqua} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={CHART.aqua} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.line} vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: CHART.muted }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: CHART.muted }} width={36} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Area type="monotone" dataKey="bookings" name="Pesanan" stroke={CHART.teal} strokeWidth={2.5} fill="url(#gBook)" />
              <Area type="monotone" dataKey="completed" name="Selesai" stroke={CHART.aqua} strokeWidth={2.5} fill="url(#gDone)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Pendapatan bulanan"
          subtitle={`Tahun ${revenueYear}`}
          action={<YearToggle year={revenueYear} onChange={setRevenueYear} />}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData} margin={{ top: 6, right: 6, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.line} vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: CHART.muted }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: CHART.muted }}
                width={44}
                tickFormatter={(v: number) => `${Math.round(v / 1_000_000)}jt`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: any) => [formatRupiah(Number(v)), "Pendapatan"]}
              />
              <Bar dataKey="revenue" fill={CHART.teal} radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Grafik baris 2 — komposisi (pemilih bulan + tahun) */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Distribusi status"
          subtitle={`Total ${statusTotal} pesanan · ${MONTH_NAMES[statusSel.month - 1]} ${statusSel.year}`}
          action={
            <MonthYearPicker
              year={statusSel.year}
              month={statusSel.month}
              onChange={(year, month) => setStatusSel({ year, month })}
            />
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="label" innerRadius={58} outerRadius={88} paddingAngle={2} stroke="none">
                {statusData.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Pesanan per jenis hama"
          subtitle={`Total ${pestTotal} pesanan · ${MONTH_NAMES[pestSel.month - 1]} ${pestSel.year}`}
          action={
            <MonthYearPicker
              year={pestSel.year}
              month={pestSel.month}
              onChange={(year, month) => setPestSel({ year, month })}
            />
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={pestData} layout="vertical" margin={{ top: 6, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.line} horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: CHART.muted }} />
              <YAxis type="category" dataKey="label" tickLine={false} axisLine={false} width={72} tick={{ fontSize: 12, fill: CHART.muted }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(14,148,136,0.06)" }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={26}>
                {pestData.map((p, i) => (
                  <Cell key={i} fill={p.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ── Pemilih tahun (segmented) — untuk grafik tren ── */
function YearToggle({ year, onChange }: { year: number; onChange: (y: number) => void }) {
  return (
    <div className="inline-flex rounded-[var(--r)] border border-[var(--line-strong)] bg-[var(--paper)] p-0.5">
      {STATUS_YEARS.map((y) => (
        <button
          key={y}
          type="button"
          onClick={() => onChange(y)}
          className={cn(
            "num rounded-[7px] px-2.5 py-1 text-xs font-bold transition",
            y === year
              ? "bg-[var(--ink)] text-white shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          )}
        >
          {y}
        </button>
      ))}
    </div>
  );
}

/* ── Pemilih bulan & tahun (tombol kalender) — untuk grafik komposisi ── */
function MonthYearPicker({
  year,
  month,
  onChange,
}: {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-[var(--r)] border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold transition hover:border-[var(--teal)]"
      >
        <CalendarDays size={15} className="text-[var(--teal)]" />
        <span className="hidden sm:inline">{MONTH_NAMES[month - 1]}</span>
        <span className="sm:hidden">{MONTH_NAMES[month - 1].slice(0, 3)}</span> {year}
        <ChevronDown size={15} className="text-[var(--faint)]" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-60 rounded-[var(--r)] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl">
            <div className="mb-2 flex gap-1">
              {STATUS_YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => onChange(y, month)}
                  className={cn(
                    "num flex-1 rounded-md py-1.5 text-sm font-bold transition",
                    y === year ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:bg-[var(--paper)]"
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1">
              {MONTH_NAMES.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    onChange(year, i + 1);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-md py-1.5 text-xs font-semibold transition",
                    i + 1 === month ? "bg-[var(--teal)] text-white" : "text-[var(--muted)] hover:bg-[var(--paper)]"
                  )}
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="card card-pad sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-[var(--muted)]">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="card card-pad flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[var(--teal-soft)] text-[var(--teal)]">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="num text-lg font-extrabold leading-none">{value}</p>
        <p className="mt-1 truncate text-xs text-[var(--muted)]">{label}</p>
      </div>
    </div>
  );
}
