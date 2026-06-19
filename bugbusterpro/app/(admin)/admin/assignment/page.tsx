"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCheck, CheckCircle2, Inbox, Star } from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { SelectField } from "@/components/ui/field";
import { ADMIN_BOOKINGS, TECHNICIANS } from "@/lib/admin-data";
import { PEST, SERVICE_TYPE, formatDateShort } from "@/lib/utils";

export default function AssignmentPage() {
  const confirmed = ADMIN_BOOKINGS.filter((b) => b.status === "confirmed");
  const activeTechs = TECHNICIANS.filter((t) => t.status === "active");

  // bookingId -> assigned technician id
  const [assigned, setAssigned] = useState<Record<string, string>>({});
  // bookingId -> currently selected (before assign)
  const [picks, setPicks] = useState<Record<string, string>>({});

  const assign = (bookingId: string) => {
    const pick = picks[bookingId];
    if (!pick) return;
    setAssigned((a) => ({ ...a, [bookingId]: pick }));
  };

  const remaining = confirmed.filter((b) => !assigned[b.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Penugasan teknisi</h1>
        <p className="mt-1 text-[var(--muted)]">
          Tugaskan teknisi untuk pesanan yang sudah dikonfirmasi.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Daftar penugasan */}
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-bold">
            Menunggu penugasan
            <span className="ml-2 rounded-full bg-[var(--st-confirmed-bg)] px-2 py-0.5 text-xs font-bold text-[var(--st-confirmed)]">
              {remaining.length}
            </span>
          </h2>

          {confirmed.length === 0 ? (
            <div className="card card-pad flex flex-col items-center py-12 text-center">
              <Inbox size={26} className="text-[var(--faint)]" />
              <p className="mt-3 font-bold">Tidak ada pesanan</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Semua pesanan terkonfirmasi sudah memiliki teknisi.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {confirmed.map((b) => {
                const done = assigned[b.id];
                const tech = TECHNICIANS.find((t) => t.id === done);
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
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="num text-sm font-bold text-[var(--teal)] hover:underline"
                        >
                          {b.code}
                        </Link>
                        <p className="font-semibold">{b.customer.name}</p>
                        <p className="text-xs text-[var(--muted)]">
                          {PEST[b.pestType].label} ·{" "}
                          {SERVICE_TYPE[b.serviceType].label} ·{" "}
                          {formatDateShort(b.scheduledAt)}
                        </p>
                      </div>
                    </div>

                    {done ? (
                      <div
                        className="mt-3 flex items-center gap-2 rounded-[var(--r)] p-2.5 text-sm font-semibold"
                        style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
                      >
                        <CheckCircle2 size={16} /> Ditugaskan ke {tech?.name}
                      </div>
                    ) : (
                      <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-end">
                        <div className="flex-1">
                          <SelectField
                            id={`tech-${b.id}`}
                            label="Teknisi"
                            value={picks[b.id] ?? ""}
                            onChange={(e) =>
                              setPicks((p) => ({ ...p, [b.id]: e.target.value }))
                            }
                          >
                            <option value="">Pilih teknisi…</option>
                            {activeTechs.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name} — {PEST[t.specialty].label}
                              </option>
                            ))}
                          </SelectField>
                        </div>
                        <button
                          onClick={() => assign(b.id)}
                          disabled={!picks[b.id]}
                          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <UserCheck size={16} /> Tugaskan
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Teknisi tersedia */}
        <section>
          <h2 className="mb-3 text-lg font-bold">Teknisi tersedia</h2>
          <div className="card divide-y divide-[var(--line)]">
            {activeTechs.map((t) => (
              <div key={t.id} className="flex items-center gap-3 p-3.5">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white"
                  style={{ background: "var(--ink)" }}
                >
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    Spesialis {PEST[t.specialty].label}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--muted)]">
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
