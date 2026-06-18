import type { BookingStatus } from "@/lib/types";
import { STATUS, cn } from "@/lib/utils";

export function StatusBadge({
  status,
  short = false,
  className,
}: {
  status: BookingStatus;
  short?: boolean;
  className?: string;
}) {
  const s = STATUS[status];
  return (
    <span className={cn(s.badge, className)}>{short ? s.short : s.label}</span>
  );
}
