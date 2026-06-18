"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  Image as ImageIcon,
  CalendarClock,
  StickyNote,
  MessageSquarePlus,
} from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { getBooking, getTechnician } from "@/lib/mock-data";
import { PEST, SERVICE_TYPE, formatDateTime, canGiveFeedback } from "@/lib/utils";

export default function ReportPage() {
  const { id } = useParams<{ id: string }>();
  const booking = getBooking(id);

  if (!booking || !booking.report) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-lg font-bold">Laporan belum tersedia</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Laporan layanan hanya tersedia untuk pesanan yang sudah selesai.
        </p>
        <Link href={`/bookings/${id}`} className="btn btn-primary mt-6">
          Kembali ke detail pesanan
        </Link>
      </div>
    );
  }

  const report = booking.report;
  const pest = PEST[booking.pestType];
  const tech = getTechnician(booking.technicianId);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={`/bookings/${booking.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Kembali ke detail
      </Link>

      {/* Header laporan */}
      <div
        className="relative overflow-hidden rounded-[var(--r-lg)] p-6 text-white"
        style={{ background: "var(--ink)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--aqua)]">Laporan Layanan</p>
            <h1 className="mt-1 font-display text-2xl font-extrabold">
              {pest.label}
            </h1>
            <p className="mt-0.5 text-sm text-white/70">
              {booking.code} · {SERVICE_TYPE[booking.serviceType].label}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: "var(--st-done)", color: "#fff" }}
          >
            <CheckCircle2 size={14} /> Selesai
          </span>
        </div>
        <p className="relative mt-4 flex items-center gap-1.5 text-sm text-white/70">
          <CalendarClock size={15} />
          {formatDateTime(report.serviceDate)}
        </p>
      </div>

      {/* Temuan */}
      <Section icon={<ClipboardCheck size={18} />} title="Temuan di lapangan">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {report.findings}
        </p>
      </Section>

      {/* Tindakan */}
      <Section icon={<CheckCircle2 size={18} />} title="Tindakan yang dilakukan">
        <ul className="space-y-2.5">
          {report.actions.map((a, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                style={{ background: "var(--teal)" }}
              >
                <CheckCircle2 size={13} />
              </span>
              <span className="text-[var(--muted)]">{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Material */}
      <Section icon={<FlaskConical size={18} />} title="Material & metode">
        <div className="flex flex-wrap gap-2">
          {report.materials.map((m, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-[var(--line-strong)] bg-[var(--paper)] px-3 py-1.5 text-sm font-medium text-[var(--text)]"
            >
              {m}
            </span>
          ))}
        </div>
      </Section>

      {/* Dokumentasi foto (placeholder prototipe) */}
      <Section icon={<ImageIcon size={18} />} title="Dokumentasi foto">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: report.photos }).map((_, i) => (
            <div
              key={i}
              className="grid aspect-square place-items-center rounded-[var(--r)] border border-dashed border-[var(--line-strong)] bg-[var(--paper)] text-[var(--faint)]"
            >
              <div className="flex flex-col items-center gap-1">
                <ImageIcon size={22} />
                <span className="text-[11px] font-semibold">Foto {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Catatan tambahan */}
      {report.notes && (
        <Section icon={<StickyNote size={18} />} title="Catatan & rekomendasi">
          <p className="rounded-[var(--r)] bg-[var(--st-pending-bg)] p-3 text-sm text-[var(--st-pending)]">
            {report.notes}
          </p>
        </Section>
      )}

      {/* Teknisi pelaksana */}
      {tech && (
        <div className="card card-pad flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
            style={{ background: "var(--ink)" }}
          >
            {tech.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div>
            <p className="text-xs text-[var(--muted)]">Dikerjakan oleh</p>
            <p className="font-bold">{tech.name}</p>
          </div>
          <span
            className="ml-auto grid h-9 w-9 place-items-center rounded-[11px]"
            style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
          >
            <PestIcon type={booking.pestType} size={20} />
          </span>
        </div>
      )}

      {/* Aksi */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="btn btn-primary btn-block">
          <Download size={18} /> Unduh laporan (PDF)
        </button>
        {canGiveFeedback(booking.status) && !booking.feedback && (
          <Link
            href={`/bookings/${booking.id}/feedback`}
            className="btn btn-secondary btn-block"
          >
            <MessageSquarePlus size={18} /> Beri penilaian
          </Link>
        )}
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card card-pad sm:p-6">
      <h2 className="mb-3 flex items-center gap-2 text-base font-bold">
        <span className="text-[var(--teal)]">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
