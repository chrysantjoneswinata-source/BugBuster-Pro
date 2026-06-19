// ─────────────────────────────────────────────────────────────
// BugBuster Pro — Data dummy untuk area Manager (Fase 4)
// Dashboard read-only: KPI, tren, dan ringkasan kinerja.
// Data per bulan/tahun dihasilkan deterministik (konsisten) dengan
// variasi yang sengaja dibuat tegas agar perbedaan terlihat jelas.
// ─────────────────────────────────────────────────────────────
import { TECHNICIANS } from "./mock-data";

/** Manager yang sedang login (prototipe) */
export const MANAGER = {
  name: "Surya Wijaya",
  role: "Manager",
  email: "manager@bugbusterpro.id",
};

/** Warna grafik (selaras dengan design system). */
export const CHART = {
  teal: "#0e9488",
  aqua: "#2fd4c4",
  ink: "#0a1a23",
  pending: "#b45309",
  confirmed: "#1d4ed8",
  scheduled: "#4338ca",
  progress: "#0e7490",
  done: "#047857",
  cancelled: "#be123c",
  muted: "#5c6f77",
  line: "#e6eded",
};

export const formatRupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
export const formatJuta = (n: number) =>
  "Rp" + (n / 1_000_000).toFixed(1) + " jt";

/** Tahun yang tersedia pada pemilih. */
export const STATUS_YEARS = [2022, 2023, 2024];

export const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/** Angka acak yang konsisten (deterministik) dari sebuah seed. */
function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

// ── Tren bulanan per tahun (12 bulan) ──────────────────────────
export interface MonthStat {
  month: string;
  bookings: number;
  completed: number;
  revenue: number; // rupiah penuh
}

/**
 * Tren 12 bulan untuk tahun tertentu. Tiap tahun punya level dasar
 * yang berbeda jelas (2022 < 2023 < 2024) sehingga kurva antar-tahun
 * mudah dibedakan.
 */
export function monthlyTrend(year: number): MonthStat[] {
  const yearBase = year === 2022 ? 20 : year === 2023 ? 36 : 52;
  return MONTH_ABBR.map((m, i) => {
    const month = i + 1;
    const wobble = seeded(year * 31 + month * 5); // 0..1
    const bookings = Math.round(yearBase * (0.65 + wobble * 0.8) + i * 0.9);
    const completed = Math.round(
      bookings * (0.76 + seeded(year * 17 + month) * 0.18)
    );
    const revenue =
      completed * (300_000 + Math.round(seeded(year * 7 + month * 3) * 140_000));
    return { month: m, bookings, completed, revenue };
  });
}

/** Data tahun berjalan (untuk KPI ringkasan). */
export const MONTHLY = monthlyTrend(2024);

// ── KPI ringkasan (tahun berjalan) ─────────────────────────────
const totalBookings = MONTHLY.reduce((s, m) => s + m.bookings, 0);
const totalCompleted = MONTHLY.reduce((s, m) => s + m.completed, 0);
const totalRevenue = MONTHLY.reduce((s, m) => s + m.revenue, 0);

export const KPI = {
  totalBookings,
  totalCompleted,
  completionRate: Math.round((totalCompleted / totalBookings) * 100),
  totalRevenue,
  avgRating: 4.8,
  activeTechnicians: TECHNICIANS.filter((t) => t.status === "active").length,
  newCustomers: 37,
  bookingGrowth: Math.round(
    ((MONTHLY[11].bookings - MONTHLY[10].bookings) / MONTHLY[10].bookings) * 100
  ),
  revenueGrowth: Math.round(
    ((MONTHLY[11].revenue - MONTHLY[10].revenue) / MONTHLY[10].revenue) * 100
  ),
};

// ── Komposisi (slice diagram) ──────────────────────────────────
export interface Slice {
  label: string;
  value: number;
  color: string;
}

const STATUS_DEFS = [
  { label: "Selesai", color: CHART.done, base: 5 },
  { label: "Terjadwal", color: CHART.scheduled, base: 2.2 },
  { label: "Menunggu", color: CHART.pending, base: 1.8 },
  { label: "Dikonfirmasi", color: CHART.confirmed, base: 1.5 },
  { label: "Dikerjakan", color: CHART.progress, base: 1.3 },
  { label: "Dibatalkan", color: CHART.cancelled, base: 0.8 },
];

const PEST_DEFS = [
  { label: "Rayap", color: CHART.pending, base: 3 },
  { label: "Semut", color: CHART.teal, base: 2.6 },
  { label: "Tikus", color: CHART.muted, base: 2.4 },
  { label: "Kutu Busuk", color: CHART.cancelled, base: 1.8 },
  { label: "Laba-laba", color: CHART.scheduled, base: 1.5 },
];

/** Bangun komposisi dengan faktor lebar (0.3–2.3×) → variasi tegas. */
function buildComposition(
  defs: { label: string; color: string; base: number }[],
  total: number,
  seed: number
): Slice[] {
  const weights = defs.map(
    (d, k) => d.base * (0.3 + seeded(seed + k * 7) * 2.0)
  );
  const sum = weights.reduce((a, b) => a + b, 0);
  return defs.map((d, k) => ({
    label: d.label,
    color: d.color,
    value: Math.max(1, Math.round((total * weights[k]) / sum)),
  }));
}

/** Distribusi status untuk bulan & tahun tertentu. */
export function statusDistribution(year: number, month: number): Slice[] {
  const total = 40 + Math.round(seeded(year * 12 + month) * 55);
  return buildComposition(STATUS_DEFS, total, year * 40 + month * 9);
}

/** Distribusi pesanan per jenis hama untuk bulan & tahun tertentu. */
export function pestDistribution(year: number, month: number): Slice[] {
  const total = 50 + Math.round(seeded(year * 9 + month * 4) * 65);
  const data = buildComposition(PEST_DEFS, total, year * 50 + month * 11);
  // urutkan dari terbanyak agar peringkatnya terlihat berubah antar-periode
  return [...data].sort((a, b) => b.value - a.value);
}

// ── Kinerja teknisi ────────────────────────────────────────────
export const TECH_PERF = TECHNICIANS.map((t) => ({
  id: t.id,
  name: t.name,
  shortName: t.name.split(" ")[0],
  jobsCompleted: t.jobsCompleted,
  rating: t.rating,
  onTimeRate: t.onTimeRate,
  specialty: t.specialty,
  status: t.status,
})).sort((a, b) => b.jobsCompleted - a.jobsCompleted);

// ── Distribusi rating ──────────────────────────────────────────
export const RATING_DIST = [
  { star: "5★", count: 142 },
  { star: "4★", count: 78 },
  { star: "3★", count: 19 },
  { star: "2★", count: 6 },
  { star: "1★", count: 3 },
];

export const totalReviews = RATING_DIST.reduce((s, r) => s + r.count, 0);

// ── Ulasan pilihan ─────────────────────────────────────────────
export interface Review {
  name: string;
  rating: number;
  comment: string;
  pest: string;
  date: string;
}

export const REVIEWS: Review[] = [
  { name: "Siti Nurhaliza", rating: 5, comment: "Teknisi sangat teliti dan menjelaskan prosesnya dengan baik.", pest: "Rayap", date: "16 Des 2024" },
  { name: "Budi Santoso", rating: 5, comment: "Respon cepat, hama hilang total. Sangat memuaskan!", pest: "Tikus", date: "14 Des 2024" },
  { name: "Rizki Ramadhan", rating: 4, comment: "Pengerjaan rapi, hanya datang sedikit terlambat.", pest: "Rayap", date: "13 Des 2024" },
  { name: "Hendra Gunawan", rating: 5, comment: "Ramah dan profesional. Rekomendasi!", pest: "Laba-laba", date: "6 Des 2024" },
];
