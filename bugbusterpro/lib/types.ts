// ─────────────────────────────────────────────────────────────
// BugBuster Pro — Domain types
// Mengacu pada entitas ERD Blueprint (Bab 11):
// Pengguna, Pelanggan, Teknisi, Layanan, Booking, Penugasan,
// Laporan Layanan, Feedback.
// ─────────────────────────────────────────────────────────────

export type Role = "customer" | "admin" | "technician" | "manager";

/** Jenis hama (katalog layanan inti) */
export type PestType = "termites" | "rodents" | "bedbugs" | "ants" | "spiders";

/** Jenis penanganan */
export type ServiceType = "one-time" | "recurring" | "inspection" | "fumigation";

/** Tingkat keparahan */
export type Severity = "low" | "medium" | "high";

/**
 * Status layanan (Lifecycle — Bab 5).
 * Urutan: pending → confirmed → scheduled → in_progress → completed
 * (cancelled adalah cabang terminal).
 */
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Technician {
  id: string;
  name: string;
  specialty: PestType;
  rating: number; // 0–5
  reviews: number;
  jobsCompleted: number;
  onTimeRate: number; // 0–100
  status: "active" | "leave";
}

export interface ServiceReport {
  completionStatus: "completed";
  serviceDate: string; // ISO
  findings: string;
  actions: string[];
  materials: string[];
  photos: number; // jumlah foto (placeholder prototipe)
  notes?: string;
}

export interface Feedback {
  rating: number; // 1–5
  comment: string;
  createdAt: string; // ISO
}

export interface Booking {
  id: string;
  code: string; // mis. BB-2024-0007
  customer: Customer;
  pestType: PestType;
  serviceType: ServiceType;
  severity: Severity;
  address: string;
  scheduledAt: string; // ISO — tanggal & waktu preferensi/terjadwal
  notes?: string;
  status: BookingStatus;
  technicianId?: string;
  createdAt: string; // ISO
  cancelReason?: string;
  report?: ServiceReport;
  feedback?: Feedback;
}
