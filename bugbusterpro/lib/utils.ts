import type {
  BookingStatus,
  PestType,
  ServiceType,
  Severity,
} from "./types";

/** Gabungkan className tanpa dependency tambahan. */
export function cn(
  ...parts: Array<string | number | bigint | boolean | null | undefined>
) {
  return parts
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .join(" ");
}

// ── Format tanggal & waktu (Bahasa Indonesia) ──────────────────
const dateFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const dateShortFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
});
const dayFmt = new Intl.DateTimeFormat("id-ID", { weekday: "long" });

export const formatDate = (iso: string) => dateFmt.format(new Date(iso));
export const formatDateShort = (iso: string) => dateShortFmt.format(new Date(iso));
export const formatTime = (iso: string) => timeFmt.format(new Date(iso));
export const formatDay = (iso: string) => dayFmt.format(new Date(iso));
export const formatDateTime = (iso: string) =>
  `${formatDay(iso)}, ${formatDate(iso)} • ${formatTime(iso)}`;

// ── Status layanan (Lifecycle — Bab 5) ─────────────────────────
/** Urutan happy-path untuk timeline (tanpa cancelled). */
export const STATUS_FLOW: BookingStatus[] = [
  "pending",
  "confirmed",
  "scheduled",
  "in_progress",
  "completed",
];

export interface StatusMeta {
  label: string;
  short: string;
  badge: string; // class badge (lihat globals.css)
  dot: string; // CSS var warna titik
  actor: string;
  desc: string;
}

export const STATUS: Record<BookingStatus, StatusMeta> = {
  pending: {
    label: "Menunggu Konfirmasi",
    short: "Menunggu",
    badge: "badge badge-pending",
    dot: "var(--st-pending)",
    actor: "Pelanggan",
    desc: "Booking baru dibuat, menunggu diverifikasi admin.",
  },
  confirmed: {
    label: "Dikonfirmasi",
    short: "Dikonfirmasi",
    badge: "badge badge-confirmed",
    dot: "var(--st-confirmed)",
    actor: "Admin",
    desc: "Booking disetujui dan valid untuk dijadwalkan.",
  },
  scheduled: {
    label: "Terjadwal",
    short: "Terjadwal",
    badge: "badge badge-scheduled",
    dot: "var(--st-scheduled)",
    actor: "Admin",
    desc: "Tanggal/waktu ditetapkan dan teknisi sudah ditugaskan.",
  },
  in_progress: {
    label: "Sedang Dikerjakan",
    short: "Dikerjakan",
    badge: "badge badge-progress",
    dot: "var(--st-progress)",
    actor: "Teknisi",
    desc: "Teknisi menuju lokasi / sedang melaksanakan layanan.",
  },
  completed: {
    label: "Selesai",
    short: "Selesai",
    badge: "badge badge-done",
    dot: "var(--st-done)",
    actor: "Teknisi",
    desc: "Pekerjaan selesai dan laporan layanan telah diisi.",
  },
  cancelled: {
    label: "Dibatalkan",
    short: "Dibatalkan",
    badge: "badge badge-cancelled",
    dot: "var(--st-cancelled)",
    actor: "Pelanggan / Admin",
    desc: "Booking dibatalkan; alasan pembatalan dicatat.",
  },
};

// ── Katalog jenis hama ─────────────────────────────────────────
export const PEST: Record<PestType, { label: string; en: string; tone: string }> = {
  termites: { label: "Rayap", en: "Termites", tone: "var(--st-pending)" },
  rodents: { label: "Tikus", en: "Rodents", tone: "var(--muted)" },
  bedbugs: { label: "Kutu Busuk", en: "Bed Bugs", tone: "var(--st-cancelled)" },
  ants: { label: "Semut", en: "Ants", tone: "var(--teal)" },
  spiders: { label: "Laba-laba", en: "Spiders", tone: "var(--st-scheduled)" },
};

export const SERVICE_TYPE: Record<ServiceType, { label: string; desc: string }> = {
  "one-time": {
    label: "One-Time Treatment",
    desc: "Penanganan tuntas sekali kunjungan.",
  },
  recurring: {
    label: "Layanan Berkala",
    desc: "Kunjungan rutin terjadwal untuk pencegahan.",
  },
  inspection: {
    label: "Inspeksi",
    desc: "Pemeriksaan & diagnosa tingkat serangan hama.",
  },
  fumigation: {
    label: "Fumigasi",
    desc: "Pengasapan menyeluruh untuk area luas.",
  },
};

export const SEVERITY: Record<Severity, { label: string; tone: string }> = {
  low: { label: "Rendah", tone: "var(--st-done)" },
  medium: { label: "Sedang", tone: "var(--st-pending)" },
  high: { label: "Tinggi", tone: "var(--st-cancelled)" },
};

/** Booking bisa dibatalkan selama belum dikerjakan. */
export const canCancel = (s: BookingStatus) =>
  s === "pending" || s === "confirmed" || s === "scheduled";

/** Feedback hanya aktif setelah selesai. */
export const canGiveFeedback = (s: BookingStatus) => s === "completed";
