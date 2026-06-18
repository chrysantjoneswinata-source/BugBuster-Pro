"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  MapPin,
  Phone,
  Star,
  FileText,
  MessageSquarePlus,
  XCircle,
  Navigation,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatusTimeline } from "@/components/status-timeline";
import { PestIcon } from "@/components/ui/pest";
import { getBooking, getTechnician } from "@/lib/mock-data";
import {
  PEST,
  SERVICE_TYPE,
  SEVERITY,
  STATUS,
  canCancel,
  canGiveFeedback,
  formatDateTime,
  formatDate,
} from "@/lib/utils";

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const booking = getBooking(id);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  if (!booking) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-lg font-bold">Pesanan tidak ditemukan</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Kode pesanan mungkin salah atau sudah dihapus.
        </p>
        <Link href="/bookings" className="btn btn-primary mt-6">
          Kembali ke daftar pesanan
        </Link>
      </div>
    );
  }

  const pest = PEST[booking.pestType];
  const tech = getTechnician(booking.technicianId);
  const status = cancelled ? "cancelled" : booking.status;
  const showCancel = !cancelled && canCancel(status);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/bookings"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Semua pesanan
      </Link>

      {/* Header */}
      <div className="card card-pad sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-[16px]"
            style={{ background: "var(--paper)", color: pest.tone }}
          >
            <PestIcon type={booking.pestType} size={34} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow eyebrow-muted">{booking.code}</p>
              <StatusBadge status={status} />
            </div>
            <h1 className="mt-1 font-display text-2xl font-extrabold">
              {pest.label}
            </h1>
            <p className="mt-0.5 text-[var(--muted)]">
              {SERVICE_TYPE[booking.serviceType].label}
            </p>
          </div>
        </div>

        {cancelled && (
          <div
            className="mt-4 flex items-start gap-2.5 rounded-[var(--r)] p-3 text-sm"
            style={{ background: "var(--st-cancelled-bg)", color: "var(--st-cancelled)" }}
          >
            <AlertTriangle size={17} className="mt-0.5 shrink-0" />
            <span>Pesanan ini telah dibatalkan sesuai permintaan Anda.</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Kiri — timeline + detail */}
        <div className="space-y-6 lg:col-span-3">
          {/* Timeline */}
          <section className="card card-pad sm:p-6">
            <h2 className="mb-5 text-lg font-bold">Status layanan</h2>
            <StatusTimeline
              status={status}
              annotations={{
                pending: `Dibuat · ${formatDate(booking.createdAt)}`,
                scheduled: tech
                  ? `Teknisi: ${tech.name}`
                  : undefined,
                cancelled: booking.cancelReason,
              }}
            />
            <p className="mt-5 rounded-[var(--r)] bg-[var(--paper)] p-3 text-xs text-[var(--muted)]">
              {STATUS[status].desc}
            </p>
          </section>

          {/* Detail layanan */}
          <section className="card card-pad sm:p-6">
            <h2 className="mb-4 text-lg font-bold">Detail layanan</h2>
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <Detail label="Jenis hama" value={pest.label} />
              <Detail
                label="Jenis penanganan"
                value={SERVICE_TYPE[booking.serviceType].label}
              />
              <Detail
                label="Tingkat keparahan"
                value={
                  <span
                    className="inline-flex items-center gap-1.5 font-semibold"
                    style={{ color: SEVERITY[booking.severity].tone }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: SEVERITY[booking.severity].tone }}
                    />
                    {SEVERITY[booking.severity].label}
                  </span>
                }
              />
              <Detail
                label="Jadwal kunjungan"
                value={formatDateTime(booking.scheduledAt)}
                icon={<CalendarClock size={15} />}
              />
            </dl>

            {booking.notes && (
              <div className="mt-4 border-t border-[var(--line)] pt-4">
                <p className="field-label">Catatan Anda</p>
                <p className="text-sm text-[var(--muted)]">{booking.notes}</p>
              </div>
            )}
          </section>

          {/* Alamat + peta placeholder */}
          <section className="card overflow-hidden">
            <div className="card-pad sm:p-6">
              <h2 className="mb-3 text-lg font-bold">Lokasi layanan</h2>
              <p className="flex items-start gap-2 text-sm text-[var(--muted)]">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--teal)]" />
                {booking.address}
              </p>
            </div>
            {/* Peta placeholder (prototipe — tanpa API peta) */}
            <div
              className="relative h-44 border-t border-[var(--line)]"
              style={{
                background:
                  "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px), var(--paper)",
                backgroundSize: "26px 26px, 26px 26px, 100% 100%",
              }}
              aria-label="Pratinjau peta lokasi"
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative grid place-items-center">
                  <span
                    className="absolute h-10 w-10 animate-ping rounded-full opacity-40"
                    style={{ background: "var(--teal)" }}
                  />
                  <span
                    className="relative grid h-9 w-9 place-items-center rounded-full text-white shadow-lg"
                    style={{ background: "var(--teal)" }}
                  >
                    <MapPin size={18} />
                  </span>
                </span>
              </span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] shadow-sm">
                <Navigation size={13} className="text-[var(--teal)]" />
                Pratinjau lokasi
              </span>
            </div>
          </section>
        </div>

        {/* Kanan — teknisi + aksi */}
        <div className="space-y-6 lg:col-span-2">
          {/* Teknisi */}
          <section className="card card-pad sm:p-6">
            <h2 className="mb-3 text-lg font-bold">Teknisi ditugaskan</h2>
            {tech ? (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-base font-bold text-white"
                    style={{ background: "var(--ink)" }}
                  >
                    {tech.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{tech.name}</p>
                    <p className="flex items-center gap-1 text-sm text-[var(--muted)]">
                      <Star
                        size={14}
                        className="fill-[var(--st-pending)] text-[var(--st-pending)]"
                      />
                      {tech.rating.toFixed(1)} · Spesialis{" "}
                      {PEST[tech.specialty].label}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2.5 text-center">
                  <div className="rounded-[var(--r)] bg-[var(--paper)] p-3">
                    <p className="num text-xl font-extrabold">
                      {tech.jobsCompleted}
                    </p>
                    <p className="text-[11px] text-[var(--muted)]">
                      Tugas selesai
                    </p>
                  </div>
                  <div className="rounded-[var(--r)] bg-[var(--paper)] p-3">
                    <p className="num text-xl font-extrabold">
                      {tech.onTimeRate}%
                    </p>
                    <p className="text-[11px] text-[var(--muted)]">
                      Tepat waktu
                    </p>
                  </div>
                </div>
                <button className="btn btn-secondary btn-block mt-3">
                  <Phone size={16} /> Hubungi teknisi
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center py-4 text-center">
                <span
                  className="grid h-12 w-12 place-items-center rounded-full"
                  style={{ background: "var(--paper)", color: "var(--faint)" }}
                >
                  <ShieldCheck size={22} />
                </span>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  Teknisi akan ditugaskan setelah pesanan dijadwalkan.
                </p>
              </div>
            )}
          </section>

          {/* Aksi */}
          <section className="card card-pad sm:p-6">
            <h2 className="mb-3 text-lg font-bold">Tindakan</h2>
            <div className="space-y-2.5">
              {status === "completed" && (
                <>
                  <Link
                    href={`/bookings/${booking.id}/report`}
                    className="btn btn-primary btn-block"
                  >
                    <FileText size={17} /> Lihat laporan layanan
                  </Link>
                  {canGiveFeedback(status) && !booking.feedback && (
                    <Link
                      href={`/bookings/${booking.id}/feedback`}
                      className="btn btn-secondary btn-block"
                    >
                      <MessageSquarePlus size={17} /> Beri penilaian
                    </Link>
                  )}
                  {booking.feedback && (
                    <div className="rounded-[var(--r)] bg-[var(--paper)] p-3">
                      <p className="flex items-center gap-1.5 text-sm font-bold">
                        Penilaian Anda
                        <span className="inline-flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < booking.feedback!.rating
                                  ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                                  : "text-[var(--line-strong)]"
                              }
                            />
                          ))}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        “{booking.feedback.comment}”
                      </p>
                    </div>
                  )}
                </>
              )}

              {showCancel && (
                <button
                  type="button"
                  onClick={() => setCancelOpen(true)}
                  className="btn btn-danger btn-block"
                >
                  <XCircle size={17} /> Batalkan pesanan
                </button>
              )}

              {!showCancel && status !== "completed" && (
                <p className="text-center text-sm text-[var(--muted)]">
                  {status === "in_progress"
                    ? "Layanan sedang berjalan dan tidak dapat dibatalkan."
                    : "Tidak ada tindakan yang tersedia saat ini."}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Dialog konfirmasi pembatalan */}
      {cancelOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div
            className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm"
            onClick={() => setCancelOpen(false)}
          />
          <div className="card relative w-full max-w-sm p-6">
            <span
              className="grid h-12 w-12 place-items-center rounded-full"
              style={{ background: "var(--st-cancelled-bg)", color: "var(--st-cancelled)" }}
            >
              <AlertTriangle size={24} />
            </span>
            <h3 className="mt-4 text-lg font-bold">Batalkan pesanan ini?</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Pesanan{" "}
              <span className="font-semibold text-[var(--text)]">
                {booking.code}
              </span>{" "}
              akan dibatalkan. Tindakan ini tidak dapat diurungkan.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setCancelOpen(false)}
                className="btn btn-secondary btn-block"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => {
                  setCancelled(true);
                  setCancelOpen(false);
                }}
                className="btn btn-danger btn-block"
              >
                Ya, batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="field-label">{label}</dt>
      <dd className="inline-flex items-center gap-1.5 font-semibold">
        {icon && <span className="text-[var(--teal)]">{icon}</span>}
        {value}
      </dd>
    </div>
  );
}
