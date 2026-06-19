// ─────────────────────────────────────────────────────────────
// BugBuster Pro — Data dummy untuk area Teknisi (Fase 3)
// Tugas yang ditugaskan kepada teknisi yang sedang login.
// ─────────────────────────────────────────────────────────────
import type { Booking, Technician } from "./types";
import { CUSTOMERS } from "./admin-data";

/** Teknisi yang sedang login (prototipe) */
export const CURRENT_TECH: Technician = {
  id: "t-01",
  name: "Vey Anggara",
  specialty: "termites",
  rating: 4.9,
  reviews: 100,
  jobsCompleted: 347,
  onTimeRate: 98,
  status: "active",
};

/** "Hari ini" untuk keperluan demo (data contoh memakai era Des 2024). */
export const TECH_TODAY = "2024-12-19";

const C = (id: string) => CUSTOMERS.find((c) => c.id === id)!;

// ── Tugas teknisi (terjadwal, dikerjakan, selesai) ─────────────
export const TECH_JOBS: Booking[] = [
  // ── Sedang dikerjakan ──
  {
    id: "tj-04",
    code: "BB-2024-2043",
    customer: C("c-001"),
    pestType: "termites",
    serviceType: "one-time",
    severity: "high",
    address: C("c-001").address,
    scheduledAt: "2024-12-19T10:00:00",
    notes: "Serangan rayap pada kusen kayu lantai dasar.",
    status: "in_progress",
    technicianId: "t-01",
    createdAt: "2024-12-13T09:12:00",
  },

  // ── Terjadwal (akan dikerjakan) ──
  {
    id: "tj-01",
    code: "BB-2024-2060",
    customer: C("c-002"),
    pestType: "termites",
    serviceType: "fumigation",
    severity: "high",
    address: C("c-002").address,
    scheduledAt: "2024-12-19T13:30:00",
    notes: "Fumigasi gudang, rayap pada rak kayu.",
    status: "scheduled",
    technicianId: "t-01",
    createdAt: "2024-12-15T08:30:00",
  },
  {
    id: "tj-02",
    code: "BB-2024-2061",
    customer: C("c-004"),
    pestType: "termites",
    serviceType: "inspection",
    severity: "medium",
    address: C("c-004").address,
    scheduledAt: "2024-12-19T16:00:00",
    status: "scheduled",
    technicianId: "t-01",
    createdAt: "2024-12-15T10:00:00",
  },
  {
    id: "tj-03",
    code: "BB-2024-2062",
    customer: C("c-007"),
    pestType: "ants",
    serviceType: "one-time",
    severity: "low",
    address: C("c-007").address,
    scheduledAt: "2024-12-20T09:00:00",
    notes: "Semut di area dapur.",
    status: "scheduled",
    technicianId: "t-01",
    createdAt: "2024-12-16T11:05:00",
  },

  // ── Selesai (riwayat + laporan) ──
  {
    id: "tj-05",
    code: "BB-2024-2030",
    customer: C("c-003"),
    pestType: "termites",
    serviceType: "one-time",
    severity: "high",
    address: C("c-003").address,
    scheduledAt: "2024-12-15T11:00:00",
    status: "completed",
    technicianId: "t-01",
    createdAt: "2024-12-10T09:00:00",
    report: {
      completionStatus: "completed",
      serviceDate: "2024-12-15T11:00:00",
      findings:
        "Koloni rayap aktif pada struktur kayu di area fondasi. Tingkat serangan tinggi namun terlokalisir di sisi belakang.",
      actions: [
        "Inspeksi menyeluruh untuk memetakan area terdampak.",
        "Injeksi termitisida pada fondasi dan struktur kayu.",
        "Pemasangan 6 titik monitoring di sekeliling bangunan.",
      ],
      materials: ["Termitisida (fipronil) 2.5 L", "6 titik monitoring umpan"],
      photos: 4,
      notes: "Disarankan inspeksi lanjutan dalam 3 bulan.",
    },
    feedback: {
      rating: 5,
      comment: "Teknisi sangat teliti dan menjelaskan prosesnya dengan baik.",
      createdAt: "2024-12-16T08:00:00",
    },
  },
  {
    id: "tj-06",
    code: "BB-2024-2024",
    customer: C("c-006"),
    pestType: "termites",
    serviceType: "inspection",
    severity: "medium",
    address: C("c-006").address,
    scheduledAt: "2024-12-12T15:00:00",
    status: "completed",
    technicianId: "t-01",
    createdAt: "2024-12-07T11:00:00",
    report: {
      completionStatus: "completed",
      serviceDate: "2024-12-12T15:00:00",
      findings: "Aktivitas rayap ringan pada pagar kayu samping rumah.",
      actions: [
        "Inspeksi area kayu eksterior.",
        "Pemasangan 4 titik monitoring.",
      ],
      materials: ["4 titik monitoring umpan"],
      photos: 2,
    },
    feedback: {
      rating: 4,
      comment: "Pengerjaan rapi, hanya datang sedikit terlambat.",
      createdAt: "2024-12-13T10:00:00",
    },
  },
  {
    id: "tj-07",
    code: "BB-2024-2018",
    customer: C("c-008"),
    pestType: "spiders",
    serviceType: "one-time",
    severity: "low",
    address: C("c-008").address,
    scheduledAt: "2024-12-08T11:00:00",
    status: "completed",
    technicianId: "t-01",
    createdAt: "2024-12-03T09:30:00",
    report: {
      completionStatus: "completed",
      serviceDate: "2024-12-08T11:00:00",
      findings: "Sarang laba-laba di plafon garasi dan teras belakang.",
      actions: [
        "Pembersihan sarang secara menyeluruh.",
        "Penyemprotan pencegahan pada sudut plafon.",
      ],
      materials: ["Insektisida aerosol 600ml"],
      photos: 3,
    },
  },
];

export const getTechJob = (id: string) =>
  TECH_JOBS.find((b) => b.id === id);

/** Hitung jumlah tugas per status. */
export const techCountByStatus = () =>
  TECH_JOBS.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});
