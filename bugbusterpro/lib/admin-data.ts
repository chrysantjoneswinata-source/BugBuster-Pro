// ─────────────────────────────────────────────────────────────
// BugBuster Pro — Data dummy untuk area Admin (Fase 2)
// Dipisah dari mock-data.ts agar tidak mengganggu data pelanggan.
// ─────────────────────────────────────────────────────────────
import type { Booking, Customer, PestType, ServiceType } from "./types";
import { TECHNICIANS } from "./mock-data";

export { TECHNICIANS };
export const getTechnician = (id?: string) =>
  TECHNICIANS.find((t) => t.id === id);

/** Admin yang sedang login (prototipe) */
export const ADMIN = {
  name: "Ayu Lestari",
  role: "Admin / Dispatcher",
  email: "admin@bugbusterpro.id",
};

// ── Pelanggan ──────────────────────────────────────────────────
export const CUSTOMERS: Customer[] = [
  { id: "c-001", name: "Chrysant Jones Winata", email: "chrysantjonesw@gmail.com", phone: "0812-3456-7890", address: "Pogung Baru No. 21, Sleman, DI Yogyakarta" },
  { id: "c-002", name: "Budi Santoso", email: "budi.santoso@gmail.com", phone: "0813-2233-4455", address: "Jl. Kaliurang Km 5, Sleman, DI Yogyakarta" },
  { id: "c-003", name: "Siti Nurhaliza", email: "siti.nurhaliza@gmail.com", phone: "0856-7788-9900", address: "Jl. Magelang Km 4, Kota Yogyakarta" },
  { id: "c-004", name: "Agus Wijaya", email: "agus.wijaya@gmail.com", phone: "0878-1122-3344", address: "Condongcatur, Depok, Sleman" },
  { id: "c-005", name: "Dewi Lestari", email: "dewi.lestari@gmail.com", phone: "0815-9988-7766", address: "Jl. Parangtritis Km 3, Bantul" },
  { id: "c-006", name: "Rizki Ramadhan", email: "rizki.ramadhan@gmail.com", phone: "0852-3344-5566", address: "Jl. Raya Solo Km 8, Sleman" },
  { id: "c-007", name: "Maya Putri", email: "maya.putri@gmail.com", phone: "0838-6677-8899", address: "Umbulharjo, Kota Yogyakarta" },
  { id: "c-008", name: "Hendra Gunawan", email: "hendra.gunawan@gmail.com", phone: "0819-4455-6677", address: "Gamping, Sleman, DI Yogyakarta" },
];

export const getCustomer = (id: string) => CUSTOMERS.find((c) => c.id === id);

const C = (id: string) => CUSTOMERS.find((c) => c.id === id)!;

// ── Booking lintas pelanggan & status ──────────────────────────
export const ADMIN_BOOKINGS: Booking[] = [
  // ── Menunggu konfirmasi (perlu tindakan admin) ──
  { id: "ab-2051", code: "BB-2024-2051", customer: C("c-002"), pestType: "termites", serviceType: "one-time", severity: "high", address: C("c-002").address, scheduledAt: "2024-12-24T10:00:00", notes: "Rayap pada rangka atap.", status: "pending", createdAt: "2024-12-18T08:30:00" },
  { id: "ab-2050", code: "BB-2024-2050", customer: C("c-005"), pestType: "rodents", serviceType: "recurring", severity: "medium", address: C("c-005").address, scheduledAt: "2024-12-25T13:00:00", notes: "Tikus di gudang belakang toko.", status: "pending", createdAt: "2024-12-18T07:10:00" },
  { id: "ab-2049", code: "BB-2024-2049", customer: C("c-007"), pestType: "ants", serviceType: "one-time", severity: "low", address: C("c-007").address, scheduledAt: "2024-12-26T09:00:00", status: "pending", createdAt: "2024-12-17T16:45:00" },

  // ── Dikonfirmasi (perlu penjadwalan & teknisi) ──
  { id: "ab-2048", code: "BB-2024-2048", customer: C("c-003"), pestType: "bedbugs", serviceType: "one-time", severity: "high", address: C("c-003").address, scheduledAt: "2024-12-23T11:00:00", notes: "Kutu busuk di kamar kos.", status: "confirmed", createdAt: "2024-12-16T10:20:00" },
  { id: "ab-2047", code: "BB-2024-2047", customer: C("c-006"), pestType: "spiders", serviceType: "inspection", severity: "low", address: C("c-006").address, scheduledAt: "2024-12-23T14:00:00", status: "confirmed", createdAt: "2024-12-16T09:00:00" },
  { id: "ab-2046", code: "BB-2024-2046", customer: C("c-001"), pestType: "ants", serviceType: "one-time", severity: "medium", address: C("c-001").address, scheduledAt: "2024-12-22T09:00:00", status: "confirmed", createdAt: "2024-12-15T11:05:00" },

  // ── Terjadwal ──
  { id: "ab-2045", code: "BB-2024-2045", customer: C("c-004"), pestType: "termites", serviceType: "fumigation", severity: "high", address: C("c-004").address, scheduledAt: "2024-12-21T10:00:00", status: "scheduled", technicianId: "t-01", createdAt: "2024-12-14T13:40:00" },
  { id: "ab-2044", code: "BB-2024-2044", customer: C("c-008"), pestType: "rodents", serviceType: "recurring", severity: "medium", address: C("c-008").address, scheduledAt: "2024-12-21T14:00:00", status: "scheduled", technicianId: "t-03", createdAt: "2024-12-14T08:15:00" },

  // ── Sedang dikerjakan ──
  { id: "ab-2043", code: "BB-2024-2043", customer: C("c-001"), pestType: "termites", serviceType: "one-time", severity: "high", address: C("c-001").address, scheduledAt: "2024-12-19T10:00:00", status: "in_progress", technicianId: "t-01", createdAt: "2024-12-13T09:12:00" },
  { id: "ab-2042", code: "BB-2024-2042", customer: C("c-005"), pestType: "bedbugs", serviceType: "one-time", severity: "high", address: C("c-005").address, scheduledAt: "2024-12-19T13:00:00", status: "in_progress", technicianId: "t-04", createdAt: "2024-12-12T15:30:00" },

  // ── Selesai ──
  { id: "ab-2041", code: "BB-2024-2041", customer: C("c-003"), pestType: "ants", serviceType: "one-time", severity: "low", address: C("c-003").address, scheduledAt: "2024-12-10T09:00:00", status: "completed", technicianId: "t-05", createdAt: "2024-12-05T10:00:00",
    report: { completionStatus: "completed", serviceDate: "2024-12-10T09:00:00", findings: "Koloni semut di area dapur dan jalur masuk dekat jendela.", actions: ["Aplikasi umpan gel pada jalur semut.", "Penyemprotan residual pada titik masuk."], materials: ["Umpan gel 30g", "Insektisida residual 0.5 L"], photos: 3 },
    feedback: { rating: 5, comment: "Cepat dan bersih, semut hilang total.", createdAt: "2024-12-11T08:00:00" } },
  { id: "ab-2040", code: "BB-2024-2040", customer: C("c-006"), pestType: "termites", serviceType: "inspection", severity: "medium", address: C("c-006").address, scheduledAt: "2024-12-08T15:00:00", status: "completed", technicianId: "t-02", createdAt: "2024-12-03T11:00:00",
    report: { completionStatus: "completed", serviceDate: "2024-12-08T15:00:00", findings: "Aktivitas rayap ringan pada pagar kayu samping rumah.", actions: ["Inspeksi menyeluruh area kayu.", "Pemasangan 4 titik monitoring."], materials: ["4 titik monitoring umpan"], photos: 2 },
    feedback: { rating: 4, comment: "Penjelasan jelas, hanya datang agak siang.", createdAt: "2024-12-09T10:00:00" } },
  { id: "ab-2039", code: "BB-2024-2039", customer: C("c-008"), pestType: "spiders", serviceType: "one-time", severity: "low", address: C("c-008").address, scheduledAt: "2024-12-05T11:00:00", status: "completed", technicianId: "t-06", createdAt: "2024-12-01T09:30:00",
    report: { completionStatus: "completed", serviceDate: "2024-12-05T11:00:00", findings: "Sarang laba-laba di plafon garasi dan teras.", actions: ["Pembersihan sarang.", "Penyemprotan pencegahan pada sudut plafon."], materials: ["Insektisida aerosol 600ml"], photos: 3 },
    feedback: { rating: 5, comment: "Ramah dan profesional. Rekomendasi!", createdAt: "2024-12-06T19:00:00" } },

  // ── Dibatalkan ──
  { id: "ab-2038", code: "BB-2024-2038", customer: C("c-007"), pestType: "rodents", serviceType: "one-time", severity: "medium", address: C("c-007").address, scheduledAt: "2024-12-02T09:00:00", status: "cancelled", createdAt: "2024-11-28T07:45:00", cancelReason: "Pelanggan menjadwalkan ulang." },
];

export const getAdminBooking = (id: string) =>
  ADMIN_BOOKINGS.find((b) => b.id === id);

/** Hitung jumlah booking per status. */
export const countByStatus = () =>
  ADMIN_BOOKINGS.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});

/** Booking aktif untuk seorang teknisi. */
export const technicianJobs = (techId: string) =>
  ADMIN_BOOKINGS.filter((b) => b.technicianId === techId);

/** Jumlah booking untuk seorang pelanggan. */
export const customerBookingCount = (custId: string) =>
  ADMIN_BOOKINGS.filter((b) => b.customer.id === custId).length;

// ── Katalog layanan ────────────────────────────────────────────
export interface ServiceItem {
  id: string;
  name: string;
  pest?: PestType;
  type: ServiceType;
  price: number; // Rupiah
  durationHr: number;
  active: boolean;
}

export const SERVICES: ServiceItem[] = [
  { id: "s-01", name: "Pengendalian Rayap", pest: "termites", type: "one-time", price: 450000, durationHr: 3, active: true },
  { id: "s-02", name: "Pengendalian Tikus", pest: "rodents", type: "recurring", price: 350000, durationHr: 2, active: true },
  { id: "s-03", name: "Pembasmian Kutu Busuk", pest: "bedbugs", type: "one-time", price: 500000, durationHr: 3, active: true },
  { id: "s-04", name: "Pengendalian Semut", pest: "ants", type: "one-time", price: 250000, durationHr: 1, active: true },
  { id: "s-05", name: "Pembasmian Laba-laba", pest: "spiders", type: "one-time", price: 250000, durationHr: 1, active: true },
  { id: "s-06", name: "Inspeksi & Konsultasi", type: "inspection", price: 150000, durationHr: 1, active: true },
  { id: "s-07", name: "Fumigasi Area Luas", type: "fumigation", price: 1200000, durationHr: 5, active: false },
];

/** Format Rupiah singkat. */
export const formatRupiah = (n: number) =>
  "Rp" + n.toLocaleString("id-ID");
