import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import type { Booking } from "@/lib/types";
import { PEST, SERVICE_TYPE, formatDateShort, formatTime } from "@/lib/utils";
import { PestIcon } from "./ui/pest";
import { StatusBadge } from "./ui/status-badge";

export function BookingCard({ booking }: { booking: Booking }) {
  const pest = PEST[booking.pestType];
  // Tombol penilaian hanya untuk pesanan "Selesai" yang BELUM dinilai.
  const needsReview = booking.status === "completed" && !booking.feedback;

  const inner = (
    <>
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px]"
        style={{ background: "var(--paper)", color: pest.tone }}
      >
        <PestIcon type={booking.pestType} size={24} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="eyebrow eyebrow-muted">
          {formatDateShort(booking.scheduledAt)} • {formatTime(booking.scheduledAt)}
        </p>
        <p className="mt-0.5 truncate font-display text-[15px] font-bold">
          {SERVICE_TYPE[booking.serviceType].label}
        </p>
        <p className="truncate text-sm text-[var(--muted)]">
          {pest.label} • {booking.code}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <StatusBadge status={booking.status} short />
        <ChevronRight size={18} className="text-[var(--faint)]" />
      </div>
    </>
  );

  // Pesanan biasa: seluruh kartu adalah link ke detail (perilaku lama).
  if (!needsReview) {
    return (
      <Link
        href={`/bookings/${booking.id}`}
        className="card card-hover card-pad flex items-center gap-4"
      >
        {inner}
      </Link>
    );
  }

  // Pesanan "Selesai" yang belum dinilai: tampilkan tombol "Beri penilaian".
  return (
    <div className="card card-pad">
      <Link href={`/bookings/${booking.id}`} className="flex items-center gap-4">
        {inner}
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3">
        <p className="text-sm text-[var(--muted)]">
          Layanan selesai — bagikan penilaian Anda.
        </p>
        <Link
          href={`/bookings/${booking.id}/feedback`}
          className="btn btn-primary btn-sm shrink-0"
        >
          <Star size={15} /> Beri penilaian
        </Link>
      </div>
    </div>
  );
}
