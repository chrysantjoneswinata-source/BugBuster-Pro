import Link from "next/link";
import { Star, MessageSquare } from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { ADMIN_BOOKINGS, getTechnician } from "@/lib/admin-data";
import { PEST, formatDate } from "@/lib/utils";

export default function FeedbackPage() {
  const withFeedback = ADMIN_BOOKINGS.filter((b) => b.feedback).sort(
    (a, b) =>
      +new Date(b.feedback!.createdAt) - +new Date(a.feedback!.createdAt)
  );

  const avg =
    withFeedback.length > 0
      ? (
          withFeedback.reduce((s, b) => s + (b.feedback?.rating ?? 0), 0) /
          withFeedback.length
        ).toFixed(1)
      : "–";

  // distribusi bintang
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: withFeedback.filter((b) => b.feedback?.rating === star).length,
  }));
  const maxDist = Math.max(1, ...dist.map((d) => d.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Feedback</h1>
        <p className="mt-1 text-[var(--muted)]">
          Penilaian dan ulasan dari pelanggan.
        </p>
      </div>

      {/* Ringkasan */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card card-pad flex flex-col items-center justify-center text-center">
          <p className="num text-5xl font-extrabold">{avg}</p>
          <span className="mt-1 inline-flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(Number(avg) || 0)
                    ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                    : "text-[var(--line-strong)]"
                }
              />
            ))}
          </span>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {withFeedback.length} ulasan
          </p>
        </div>
        <div className="card card-pad sm:col-span-2">
          <div className="space-y-2">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-sm">
                <span className="inline-flex w-8 items-center gap-0.5 font-semibold">
                  {d.star} <Star size={12} className="fill-[var(--st-pending)] text-[var(--st-pending)]" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
                  <div
                    className="h-full rounded-full bg-[var(--st-pending)]"
                    style={{ width: `${(d.count / maxDist) * 100}%` }}
                  />
                </div>
                <span className="num w-5 text-right text-xs text-[var(--muted)]">
                  {d.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daftar ulasan */}
      {withFeedback.length === 0 ? (
        <div className="card card-pad flex flex-col items-center py-14 text-center">
          <MessageSquare size={26} className="text-[var(--faint)]" />
          <p className="mt-3 font-bold">Belum ada ulasan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {withFeedback.map((b) => {
            const tech = getTechnician(b.technicianId);
            return (
              <div key={b.id} className="card card-pad">
                <div className="flex items-start gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
                    style={{ background: "var(--paper)", color: PEST[b.pestType].tone }}
                  >
                    <PestIcon type={b.pestType} size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold">{b.customer.name}</p>
                      <span className="inline-flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < (b.feedback?.rating ?? 0)
                                ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                                : "text-[var(--line-strong)]"
                            }
                          />
                        ))}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      “{b.feedback?.comment}”
                    </p>
                    <p className="mt-2 text-xs text-[var(--faint)]">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="font-semibold text-[var(--teal)] hover:underline"
                      >
                        {b.code}
                      </Link>{" "}
                      · {PEST[b.pestType].label}
                      {tech && ` · ${tech.name}`} ·{" "}
                      {b.feedback && formatDate(b.feedback.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
