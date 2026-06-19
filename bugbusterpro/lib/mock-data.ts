import type { Booking, Customer, Technician } from "./types";

// Pengguna pelanggan yang sedang login (prototipe)
export const CURRENT_CUSTOMER: Customer = {
  id: "c-001",
  name: "Chrysant Jones Winata",
  email: "chrysantjonesw@gmail.com",
  phone: "0812-3456-7890",
  address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
};

export const TECHNICIANS: Technician[] = [
  { id: "t-01", name: "Vey Anggara", specialty: "termites", rating: 4.9, reviews: 100, jobsCompleted: 347, onTimeRate: 98, status: "active" },
  { id: "t-02", name: "Grey Hartono", specialty: "termites", rating: 4.8, reviews: 82, jobsCompleted: 312, onTimeRate: 95, status: "active" },
  { id: "t-03", name: "Neo Pratama", specialty: "rodents", rating: 4.7, reviews: 76, jobsCompleted: 289, onTimeRate: 92, status: "active" },
  { id: "t-04", name: "Rara Wulandari", specialty: "bedbugs", rating: 4.9, reviews: 64, jobsCompleted: 198, onTimeRate: 97, status: "active" },
  { id: "t-05", name: "Dimas Saputra", specialty: "ants", rating: 4.6, reviews: 51, jobsCompleted: 176, onTimeRate: 90, status: "leave" },
  { id: "t-06", name: "Kirana Dewi", specialty: "spiders", rating: 4.8, reviews: 43, jobsCompleted: 154, onTimeRate: 94, status: "active" },
];

export const getTechnician = (id?: string) =>
  TECHNICIANS.find((t) => t.id === id);

// ── Bookings (mencakup seluruh status lifecycle) ───────────────
export const BOOKINGS: Booking[] = [
  {
    id: "bk-1007",
    code: "BB-2024-1007",
    customer: CURRENT_CUSTOMER,
    pestType: "termites",
    serviceType: "one-time",
    severity: "high",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    scheduledAt: "2024-12-15T10:00:00",
    notes: "Serangan rayap pada kusen kayu lantai dasar.",
    status: "in_progress",
    technicianId: "t-01",
    createdAt: "2024-12-10T09:12:00",
  },
  {
    id: "bk-1006",
    code: "BB-2024-1006",
    customer: CURRENT_CUSTOMER,
    pestType: "rodents",
    serviceType: "recurring",
    severity: "medium",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    scheduledAt: "2024-12-20T14:00:00",
    notes: "Tikus di area dapur dan gudang.",
    status: "scheduled",
    technicianId: "t-03",
    createdAt: "2024-12-09T16:40:00",
  },
  {
    id: "bk-1005",
    code: "BB-2024-1005",
    customer: CURRENT_CUSTOMER,
    pestType: "ants",
    serviceType: "one-time",
    severity: "low",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    status: "confirmed",
    technicianId: undefined,
    scheduledAt: "2024-12-22T09:00:00",
    createdAt: "2024-12-08T11:05:00",
  },
  {
    id: "bk-1004",
    code: "BB-2024-1004",
    customer: CURRENT_CUSTOMER,
    pestType: "spiders",
    serviceType: "inspection",
    severity: "low",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    notes: "Sarang laba-laba di plafon teras belakang.",
    status: "pending",
    scheduledAt: "2024-12-28T13:00:00",
    createdAt: "2024-12-07T08:20:00",
  },
  {
    id: "bk-0998",
    code: "BB-2024-0998",
    customer: CURRENT_CUSTOMER,
    pestType: "termites",
    serviceType: "inspection",
    severity: "medium",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    status: "completed",
    technicianId: "t-01",
    scheduledAt: "2024-10-27T15:00:00",
    createdAt: "2024-10-22T10:00:00",
    report: {
      completionStatus: "completed",
      serviceDate: "2024-10-27T15:00:00",
      findings:
        "Ditemukan aktivitas koloni rayap pada struktur kayu di area fondasi sisi timur. Tingkat serangan menengah, belum menyebar ke lantai dua.",
      actions: [
        "Melakukan inspeksi untuk menemukan seluruh area terdampak.",
        "Menyuntikkan termitisida ke fondasi dan struktur kayu untuk menghentikan koloni aktif.",
        "Memasang titik pemantauan (monitoring) di sekeliling bangunan.",
      ],
      materials: ["Termitisida (fipronil) 2.5 L", "6 titik monitoring umpan"],
      photos: 4,
      notes: "Disarankan inspeksi lanjutan dalam 3 bulan.",
    },
    feedback: {
      rating: 5,
      comment: "Teknisi datang tepat waktu dan menjelaskan prosesnya dengan rinci. Sangat puas!",
      createdAt: "2024-10-28T09:30:00",
    },
  },
  {
    id: "bk-0990",
    code: "BB-2024-0990",
    customer: CURRENT_CUSTOMER,
    pestType: "bedbugs",
    serviceType: "one-time",
    severity: "high",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    status: "completed",
    technicianId: "t-04",
    scheduledAt: "2024-09-14T11:00:00",
    createdAt: "2024-09-10T13:15:00",
    report: {
      completionStatus: "completed",
      serviceDate: "2024-09-14T11:00:00",
      findings:
        "Kutu busuk terkonsentrasi pada kamar tidur utama, terutama jahitan kasur dan celah rangka tempat tidur.",
      actions: [
        "Perlakuan panas (heat treatment) pada kasur dan furnitur.",
        "Penyemprotan residual pada celah dan retakan.",
      ],
      materials: ["Insektisida residual 1 L", "Perlakuan uap panas"],
      photos: 3,
    },
    
  },
  {
    id: "bk-0975",
    code: "BB-2024-0975",
    customer: CURRENT_CUSTOMER,
    pestType: "ants",
    serviceType: "one-time",
    severity: "low",
    address: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    status: "cancelled",
    scheduledAt: "2024-08-30T09:00:00",
    createdAt: "2024-08-26T07:45:00",
    cancelReason: "Pelanggan menjadwalkan ulang di lain waktu.",
  },
];

export const getBooking = (id: string) => BOOKINGS.find((b) => b.id === id);

export const activeBookings = () =>
  BOOKINGS.filter((b) =>
    ["pending", "confirmed", "scheduled", "in_progress"].includes(b.status)
  );

export const completedBookings = () =>
  BOOKINGS.filter((b) => b.status === "completed");
