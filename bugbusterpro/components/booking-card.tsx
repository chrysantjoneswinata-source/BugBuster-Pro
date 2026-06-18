import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Booking } from "@/lib/types";
import { PEST, SERVICE_TYPE, formatDateShort, formatTime } from "@/lib/utils";
import { PestIcon } from "./ui/pest";
import { StatusBadge } from "./ui/status-badge";

export function BookingCard({ booking }: { booking: Booking }) {
  const pest = PEST[booking.pestType];
  return (
    <Link
      href={`/bookings/${booking.id}`}
      className="card card-hover card-pad flex items-center gap-4"
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px]"
        style={{ background: "var(--paper)", color: pest.tone }}
      >
        <PestIcon type={booking.pestType} size={24} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="eyebrow eyebrow-muted">
            {formatDateShort(booking.scheduledAt)} • {formatTime(booking.scheduledAt)}
          </p>
        </div>
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
    </Link>
  );
}
