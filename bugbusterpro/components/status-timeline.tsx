import { Check, X } from "lucide-react";
import type { BookingStatus } from "@/lib/types";
import { STATUS, STATUS_FLOW, cn } from "@/lib/utils";

/**
 * Timeline status layanan (signature component).
 * Menampilkan alur lifecycle: pending → confirmed → scheduled → in_progress → completed.
 * Status "cancelled" ditampilkan sebagai cabang terminal.
 */
export function StatusTimeline({
  status,
  annotations = {},
}: {
  status: BookingStatus;
  /** catatan kecil per status, mis. tanggal/teknisi */
  annotations?: Partial<Record<BookingStatus, string>>;
}) {
  if (status === "cancelled") {
    return (
      <ol className="space-y-0">
        <Step
          state="done"
          label={STATUS.pending.label}
          meta={STATUS.pending.actor}
          note={annotations.pending}
          isLast={false}
        />
        <Step
          state="cancelled"
          label={STATUS.cancelled.label}
          meta={STATUS.cancelled.actor}
          note={annotations.cancelled}
          isLast
        />
      </ol>
    );
  }

  const currentIdx = STATUS_FLOW.indexOf(status);

  return (
    <ol className="space-y-0">
      {STATUS_FLOW.map((s, i) => {
        const state: StepState =
          i < currentIdx ? "done" : i === currentIdx ? "current" : "upcoming";
        return (
          <Step
            key={s}
            state={state}
            label={STATUS[s].label}
            meta={STATUS[s].actor}
            note={annotations[s]}
            isLast={i === STATUS_FLOW.length - 1}
            connectorDone={i < currentIdx}
          />
        );
      })}
    </ol>
  );
}

type StepState = "done" | "current" | "upcoming" | "cancelled";

function Step({
  state,
  label,
  meta,
  note,
  isLast,
  connectorDone,
}: {
  state: StepState;
  label: string;
  meta: string;
  note?: string;
  isLast: boolean;
  connectorDone?: boolean;
}) {
  return (
    <li className="relative flex gap-4 pb-7 last:pb-0">
      {/* connector */}
      {!isLast && (
        <span
          className="absolute left-[15px] top-8 bottom-1 w-0.5 rounded"
          style={{ background: connectorDone ? "var(--teal)" : "var(--line)" }}
          aria-hidden
        />
      )}

      {/* node */}
      <span className="relative z-10 mt-0.5 grid h-8 w-8 shrink-0 place-items-center">
        {state === "current" && (
          <span
            className="absolute inset-0 animate-ping rounded-full opacity-60"
            style={{ background: "var(--teal-soft)" }}
            aria-hidden
          />
        )}
        <span
          className="relative grid h-8 w-8 place-items-center rounded-full"
          style={
            state === "done"
              ? { background: "var(--teal)", color: "#fff" }
              : state === "current"
                ? { background: "var(--teal)", color: "#fff", boxShadow: "0 0 0 4px var(--teal-soft)" }
                : state === "cancelled"
                  ? { background: "var(--st-cancelled)", color: "#fff" }
                  : { background: "var(--surface)", border: "2px solid var(--line-strong)", color: "var(--faint)" }
          }
        >
          {state === "done" ? (
            <Check size={16} strokeWidth={3} />
          ) : state === "cancelled" ? (
            <X size={16} strokeWidth={3} />
          ) : state === "current" ? (
            <span className="h-2 w-2 rounded-full bg-white" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--faint)" }} />
          )}
        </span>
      </span>

      {/* content */}
      <div className="min-w-0 pt-1">
        <p
          className={cn(
            "font-display text-[15px] font-bold leading-tight",
            state === "upcoming" && "text-[var(--faint)]",
            state === "cancelled" && "text-[var(--st-cancelled)]"
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-xs text-[var(--muted)]">
          {note ?? `Oleh: ${meta}`}
        </p>
      </div>
    </li>
  );
}
