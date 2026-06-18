import Link from "next/link";
import {
  Plus,
  ArrowRight,
  CalendarClock,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatusTimeline } from "@/components/status-timeline";
import { BookingCard } from "@/components/booking-card";
import { PestIcon } from "@/components/ui/pest";
import {
  BOOKINGS,
  CURRENT_CUSTOMER,
  activeBookings,
  completedBookings,
  getTechnician,
} from "@/lib/mock-data";
import {
  PEST,
  SERVICE_TYPE,
  formatDateTime,
  formatDate,
} from "@/lib/utils";

export default function DashboardPage() {
  const firstName = CURRENT_CUSTOMER.name.split(" ")[0];
  const active = activeBookings();
  const completed = completedBookings();
  // booking aktif paling "maju" untuk disorot
  const ORDER = ["in_progress", "scheduled", "confirmed", "pending"];
  const featured =
    [...active].sort(
      (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)
    )[0] ?? null;
  const tech = featured ? getTechnician(featured.technicianId) : undefined;

  const stats = [
    { label: "Layanan aktif", value: active.length, icon: CalendarClock },
    { label: "Total selesai", value: completed.length, icon: ShieldCheck },
    { label: "Total pesanan", value: BOOKINGS.length, icon: Sparkles },
  ];

  const recent = BOOKINGS.slice(0, 4);

  return (
    <div className="space-y-7">
      {/* Sapaan */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Halo, selamat datang</p>
          <h1 className="mt-1 text-3xl font-extrabold">Hai, {firstName} 👋</h1>
          <p className="mt-1 text-[var(--muted)]">
            Berikut ringkasan layanan pembasmian hama Anda.
          </p>
        </div>
        <Link href="/book" className="btn btn-primary btn-lg">
          <Plus size={18} /> Pesan layanan baru
        </Link>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-pad">
              <span
                className="grid h-10 w-10 place-items-center rounded-[11px]"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                <Icon size={20} />
              </span>
              <p className="num mt-3 text-3xl font-extrabold">{s.value}</p>
              <p className="mt-0.5 text-xs text-[var(--muted)] sm:text-sm">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Booking aktif disorot */}
        <section className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Layanan berjalan</h2>
            <Link
              href="/bookings"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] hover:underline"
            >
              Semua pesanan <ArrowRight size={15} />
            </Link>
          </div>

          {featured ? (
            <div className="card overflow-hidden">
              <div className="card-pad border-b border-[var(--line)]">
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px]"
                    style={{
                      background: "var(--paper)",
                      color: PEST[featured.pestType].tone,
                    }}
                  >
                    <PestIcon type={featured.pestType} size={28} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="eyebrow eyebrow-muted">{featured.code}</p>
                      <StatusBadge status={featured.status} />
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold">
                      {PEST[featured.pestType].label} ·{" "}
                      {SERVICE_TYPE[featured.serviceType].label}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--muted)]">
                      <CalendarClock size={15} />
                      {formatDateTime(featured.scheduledAt)}
                    </p>
                  </div>
                </div>

                {tech && (
                  <div className="mt-4 flex items-center gap-3 rounded-[var(--r)] bg-[var(--paper)] p-3">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold text-white"
                      style={{ background: "var(--ink)" }}
                    >
                      {tech.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{tech.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        Teknisi · ★ {tech.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-pad">
                <p className="eyebrow eyebrow-muted mb-4">Status layanan</p>
                <StatusTimeline
                  status={featured.status}
                  annotations={{
                    scheduled: `Terjadwal · ${formatDate(featured.scheduledAt)}`,
                  }}
                />
                <Link
                  href={`/bookings/${featured.id}`}
                  className="btn btn-secondary btn-block mt-5"
                >
                  Lihat detail lengkap <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="card card-pad flex flex-col items-center justify-center py-12 text-center">
              <span
                className="grid h-14 w-14 place-items-center rounded-full"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                <ShieldCheck size={26} />
              </span>
              <p className="mt-4 font-bold">Tidak ada layanan berjalan</p>
              <p className="mt-1 max-w-xs text-sm text-[var(--muted)]">
                Semua aman! Pesan layanan baru bila Anda membutuhkan bantuan.
              </p>
              <Link href="/book" className="btn btn-primary mt-5">
                <Plus size={17} /> Pesan layanan
              </Link>
            </div>
          )}
        </section>

        {/* Aktivitas terbaru */}
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Terbaru</h2>
          </div>
          <div className="space-y-3">
            {recent.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
