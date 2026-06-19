"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Mail,
  HardHat,
  Star,
  FileText,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatusTimeline } from "@/components/status-timeline";
import { PestIcon } from "@/components/ui/pest";
import { SelectField } from "@/components/ui/field";
import { getAdminBooking, TECHNICIANS, getTechnician } from "@/lib/admin-data";
import {
  PEST,
  SERVICE_TYPE,
  SEVERITY,
  STATUS,
  formatDateTime,
  formatDate,
} from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

export default function AdminBookingDetail() {
  const { id } = useParams<{ id: string }>();
  const booking = getAdminBooking(id);

  const [status, setStatus] = useState<BookingStatus>(
    booking?.status ?? "pending"
  );
  const [techId, setTechId] = useState<string | undefined>(
    booking?.technicianId
  );
  const [pick, setPick] = useState("");
  const [toast, setToast] = useState<string>();

  if (!booking) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-lg font-bold">Pesanan tidak ditemukan</p>
        <Link href="/admin/bookings" className="btn btn-primary mt-6">
          Kembali ke daftar pesanan
        </Link>
      </div>
    );
  }

  const pest = PEST[booking.pestType];
  const tech = getTechnician(techId);
  const activeTechs = TECHNICIANS.filter((t) => t.status === "active");

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(undefined), 3000);
  };

  const confirm = () => {
    setStatus("confirmed");
    flash("Pesanan dikonfirmasi.");
  };
  const reject = () => {
    setStatus("cancelled");
    flash("Pesanan dibatalkan.");
  };
  const assign = () => {
    if (!pick) return;
    setTechId(pick);
    setStatus("scheduled");
    flash("Teknisi ditugaskan & pesanan dijadwalkan.");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Semua pesanan
      </Link>

      {toast && (
        <div
          className="flex items-center gap-2 rounded-[var(--r)] p-3 text-sm font-semibold"
          style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
        >
          <CheckCircle2 size={17} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="card card-pad sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px]"
            style={{ background: "var(--paper)", color: pest.tone }}
          >
            <PestIcon type={booking.pestType} size={30} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="num eyebrow eyebrow-muted">{booking.code}</p>
              <StatusBadge status={status} />
            </div>
            <h1 className="mt-1 font-display text-xl font-extrabold">
              {pest.label} · {SERVICE_TYPE[booking.serviceType].label}
            </h1>
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              Dibuat {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Kiri */}
        <div className="space-y-6 lg:col-span-3">
          <section className="card card-pad sm:p-6">
            <h2 className="mb-5 text-lg font-bold">Status</h2>
            <StatusTimeline status={status} />
            <p className="mt-5 rounded-[var(--r)] bg-[var(--paper)] p-3 text-xs text-[var(--muted)]">
              {STATUS[status].desc}
            </p>
          </section>

          <section className="card card-pad sm:p-6">
            <h2 className="mb-4 text-lg font-bold">Detail layanan</h2>
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <Field label="Jenis hama" value={pest.label} />
              <Field
                label="Penanganan"
                value={SERVICE_TYPE[booking.serviceType].label}
              />
              <Field
                label="Keparahan"
                value={
                  <span
                    className="font-semibold"
                    style={{ color: SEVERITY[booking.severity].tone }}
                  >
                    {SEVERITY[booking.severity].label}
                  </span>
                }
              />
              <Field
                label="Jadwal"
                value={formatDateTime(booking.scheduledAt)}
              />
            </dl>
            {booking.notes && (
              <div className="mt-4 border-t border-[var(--line)] pt-4">
                <p className="field-label">Catatan pelanggan</p>
                <p className="text-sm text-[var(--muted)]">{booking.notes}</p>
              </div>
            )}
            <div className="mt-4 flex items-start gap-2 border-t border-[var(--line)] pt-4 text-sm">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" />
              <span className="text-[var(--muted)]">{booking.address}</span>
            </div>
          </section>

          {/* Laporan bila selesai */}
          {booking.report && (
            <section className="card card-pad sm:p-6">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
                <FileText size={18} className="text-[var(--teal)]" /> Laporan
                layanan
              </h2>
              <p className="text-sm text-[var(--muted)]">
                {booking.report.findings}
              </p>
              {booking.feedback && (
                <div className="mt-4 rounded-[var(--r)] bg-[var(--paper)] p-3">
                  <p className="flex items-center gap-1.5 text-sm font-bold">
                    Penilaian pelanggan
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
            </section>
          )}
        </div>

        {/* Kanan */}
        <div className="space-y-6 lg:col-span-2">
          {/* Pelanggan */}
          <section className="card card-pad sm:p-6">
            <h2 className="mb-3 text-lg font-bold">Pelanggan</h2>
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
                style={{ background: "var(--ink)" }}
              >
                {booking.customer.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold">{booking.customer.name}</p>
                <p className="text-xs text-[var(--muted)]">Pelanggan</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-[var(--teal)]" />
                {booking.customer.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-[var(--teal)]" />
                {booking.customer.email}
              </p>
            </div>
          </section>

          {/* Panel tindakan sesuai status */}
          <section className="card card-pad sm:p-6">
            <h2 className="mb-3 text-lg font-bold">Tindakan admin</h2>

            {status === "pending" && (
              <div className="space-y-2.5">
                <p className="text-sm text-[var(--muted)]">
                  Verifikasi pesanan ini sebelum dijadwalkan.
                </p>
                <button onClick={confirm} className="btn btn-primary btn-block">
                  <CheckCircle2 size={17} /> Konfirmasi pesanan
                </button>
                <button onClick={reject} className="btn btn-danger btn-block">
                  <XCircle size={17} /> Tolak / batalkan
                </button>
              </div>
            )}

            {status === "confirmed" && (
              <div className="space-y-3">
                <p className="text-sm text-[var(--muted)]">
                  Pilih teknisi untuk menjadwalkan layanan.
                </p>
                <SelectField
                  id="tech"
                  label="Tugaskan teknisi"
                  value={pick}
                  onChange={(e) => setPick(e.target.value)}
                >
                  <option value="">Pilih teknisi…</option>
                  {activeTechs.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — spesialis {PEST[t.specialty].label} (★{" "}
                      {t.rating.toFixed(1)})
                    </option>
                  ))}
                </SelectField>
                <button
                  onClick={assign}
                  disabled={!pick}
                  className="btn btn-primary btn-block disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UserCheck size={17} /> Jadwalkan & tugaskan
                </button>
              </div>
            )}

            {(status === "scheduled" || status === "in_progress") && (
              <div className="space-y-3">
                {tech ? (
                  <div className="flex items-center gap-3 rounded-[var(--r)] bg-[var(--paper)] p-3">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white"
                      style={{ background: "var(--teal)" }}
                    >
                      {tech.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{tech.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        Teknisi ditugaskan · ★ {tech.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                ) : null}
                <p className="text-sm text-[var(--muted)]">
                  {status === "scheduled"
                    ? "Menunggu teknisi memulai pekerjaan di lapangan."
                    : "Teknisi sedang mengerjakan layanan ini."}
                </p>
              </div>
            )}

            {status === "completed" && (
              <div className="flex items-start gap-2.5 rounded-[var(--r)] p-3 text-sm" style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}>
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                Layanan selesai dan laporan telah tersedia.
              </div>
            )}

            {status === "cancelled" && (
              <div className="flex items-start gap-2.5 rounded-[var(--r)] p-3 text-sm" style={{ background: "var(--st-cancelled-bg)", color: "var(--st-cancelled)" }}>
                <AlertTriangle size={17} className="mt-0.5 shrink-0" />
                {booking.cancelReason ?? "Pesanan ini telah dibatalkan."}
              </div>
            )}
          </section>

          {/* Teknisi (ringkas) bila ada */}
          {tech && status !== "scheduled" && status !== "in_progress" && (
            <section className="card card-pad sm:p-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <HardHat size={18} className="text-[var(--teal)]" /> Teknisi
              </h2>
              <p className="font-bold">{tech.name}</p>
              <p className="text-sm text-[var(--muted)]">
                Spesialis {PEST[tech.specialty].label} · ★ {tech.rating.toFixed(1)}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="field-label">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
