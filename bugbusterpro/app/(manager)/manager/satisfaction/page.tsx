"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import {
  RATING_DIST,
  REVIEWS,
  totalReviews,
  KPI,
  CHART,
} from "@/lib/manager-data";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e6eded",
  fontSize: 13,
  boxShadow: "0 6px 20px rgba(10,26,35,0.08)",
} as const;

export default function ManagerSatisfaction() {
  const positive = Math.round(
    ((RATING_DIST[0].count + RATING_DIST[1].count) / totalReviews) * 100
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Kepuasan Pelanggan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Penilaian dan umpan balik dari pelanggan.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Skor rata-rata */}
        <div className="card card-pad flex flex-col items-center justify-center text-center">
          <p className="num text-5xl font-extrabold">{KPI.avgRating.toFixed(1)}</p>
          <span className="mt-2 inline-flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(KPI.avgRating)
                    ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                    : "text-[var(--line-strong)]"
                }
              />
            ))}
          </span>
          <p className="mt-2 text-sm text-[var(--muted)]">
            dari {totalReviews} ulasan
          </p>
          <div className="mt-4 flex items-center gap-1.5 rounded-full bg-[var(--st-done-bg)] px-3 py-1 text-xs font-bold text-[var(--st-done)]">
            <ThumbsUp size={13} /> {positive}% ulasan positif
          </div>
        </div>

        {/* Distribusi rating */}
        <div className="card card-pad sm:p-6 lg:col-span-2">
          <h2 className="mb-4 text-base font-bold">Distribusi rating</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={RATING_DIST}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={CHART.line} horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: CHART.muted }} />
              <YAxis
                type="category"
                dataKey="star"
                tickLine={false}
                axisLine={false}
                width={36}
                tick={{ fontSize: 13, fill: CHART.muted }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(14,148,136,0.06)" }}
                formatter={(v: any) => [v, "Ulasan"]}
              />
              <Bar dataKey="count" fill={CHART.pending} radius={[0, 6, 6, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ulasan terbaru */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <MessageSquare size={18} className="text-[var(--teal)]" /> Ulasan terbaru
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <div key={i} className="card card-pad">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white"
                    style={{ background: "var(--ink)" }}
                  >
                    {r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div>
                    <p className="font-bold leading-tight">{r.name}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {r.pest} · {r.date}
                    </p>
                  </div>
                </div>
                <span className="inline-flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className={cn(
                        j < r.rating
                          ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                          : "text-[var(--line-strong)]"
                      )}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">“{r.comment}”</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
