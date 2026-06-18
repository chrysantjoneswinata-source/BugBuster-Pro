import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  ClipboardCheck,
  Star,
  Users,
  Headset,
  Wrench,
  BarChart3,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { PestIcon } from "@/components/ui/pest";
import { PEST } from "@/lib/utils";
import type { PestType } from "@/lib/types";

const PESTS: PestType[] = ["termites", "rodents", "bedbugs", "ants", "spiders"];

const STEPS = [
  { t: "Pesan layanan", d: "Pilih jenis hama, lokasi, dan jadwal preferensi Anda." },
  { t: "Verifikasi admin", d: "Tim kami mengonfirmasi booking dan ketersediaan." },
  { t: "Teknisi bertugas", d: "Teknisi ahli ditugaskan dan menangani di lapangan." },
  { t: "Laporan & feedback", d: "Terima laporan hasil, lalu beri penilaian Anda." },
];

const ROLES = [
  { icon: Headset, t: "Pelanggan", d: "Memesan, melacak status, dan menilai layanan." },
  { icon: Users, t: "Admin", d: "Verifikasi, menjadwalkan, dan menugaskan teknisi." },
  { icon: Wrench, t: "Teknisi", d: "Mengerjakan tugas dan mengisi laporan lapangan." },
  { icon: BarChart3, t: "Manager", d: "Memantau KPI, performa, dan kualitas layanan." },
];

export default function LandingPage() {
  return (
    <main>
      {/* ───── Hero (gelap) ───── */}
      <section style={{ background: "var(--ink)" }} className="relative overflow-hidden">
        {/* ornamen latar */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--aqua) 1px, transparent 1px), linear-gradient(90deg, var(--aqua) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <header className="container-app relative flex items-center justify-between py-5">
          <Logo variant="light" />
          <nav className="flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost !text-white/80 hover:!bg-white/10">
              Masuk
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm sm:btn-sm">
              Daftar
            </Link>
          </nav>
        </header>

        <div className="container-app relative grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-16">
          <div>
            <span className="eyebrow">Manajemen Layanan Pengendalian Hama</span>
            <h1 className="mt-4 text-[2.5rem] font-extrabold leading-[1.05] text-white sm:text-[3.25rem]">
              Hama tuntas,
              <br />
              <span style={{ color: "var(--aqua)" }}>tenang berkelanjutan.</span>
            </h1>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/70">
              Pesan layanan pengendalian hama, lacak setiap tahap secara
              real-time, dan terima laporan kerja yang transparan — semua dalam
              satu platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/book" className="btn btn-primary btn-lg">
                Pesan Sekarang <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="btn btn-secondary btn-lg !border-white/20 !bg-white/5 !text-white hover:!bg-white/10">
                Masuk ke Akun
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-6 text-white/60">
              <Stat n="4.9" l="Rata-rata rating" star />
              <span className="h-8 w-px bg-white/15" />
              <Stat n="1.800+" l="Layanan selesai" />
              <span className="hidden h-8 w-px bg-white/15 sm:block" />
              <Stat n="98%" l="Tepat waktu" className="hidden sm:block" />
            </div>
          </div>

          {/* preview pelacakan — menautkan ke komponen signature */}
          <TrackingPreview />
        </div>
      </section>

      {/* ───── Layanan ───── */}
      <section className="container-app py-16 sm:py-20">
        <div className="max-w-xl">
          <span className="eyebrow">Layanan kami</span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Spesialis untuk setiap hama
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Teknisi tersertifikasi untuk lima jenis serangan hama yang paling
            umum di hunian dan bisnis Anda.
          </p>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PESTS.map((p) => (
            <div key={p} className="card card-hover card-pad text-center">
              <span
                className="mx-auto grid h-14 w-14 place-items-center rounded-[14px]"
                style={{ background: "var(--paper)", color: PEST[p].tone }}
              >
                <PestIcon type={p} size={30} />
              </span>
              <p className="mt-3 font-display font-bold">{PEST[p].label}</p>
              <p className="text-xs text-[var(--faint)]">{PEST[p].en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Cara kerja ───── */}
      <section style={{ background: "var(--surface)" }} className="border-y border-[var(--line)]">
        <div className="container-app py-16 sm:py-20">
          <div className="max-w-xl">
            <span className="eyebrow">Cara kerja</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Dari pesan hingga tuntas
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.t} className="relative">
                <span
                  className="num text-[2.5rem] font-extrabold"
                  style={{ color: "var(--teal-soft)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="-mt-2 font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Peran pengguna ───── */}
      <section className="container-app py-16 sm:py-20">
        <div className="max-w-xl">
          <span className="eyebrow">Satu platform, empat peran</span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Dirancang untuk seluruh alur kerja
          </h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r) => (
            <div key={r.t} className="card card-pad">
              <span
                className="grid h-11 w-11 place-items-center rounded-[12px]"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                <r.icon size={20} />
              </span>
              <h3 className="mt-3.5 font-display font-bold">{r.t}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="container-app pb-20">
        <div
          className="relative overflow-hidden rounded-[var(--r-2xl)] px-8 py-12 text-center sm:py-16"
          style={{ background: "var(--ink)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
          />
          <h2 className="relative text-3xl font-extrabold text-white sm:text-4xl">
            Siap mengusir hama hari ini?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-white/70">
            Buat pesanan pertama Anda dalam hitungan menit.
          </p>
          <Link href="/book" className="btn btn-primary btn-lg relative mt-7">
            Pesan Layanan <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-[var(--line)]">
        <div className="container-app flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-[var(--faint)]">
            © 2024 BugBuster Pro · Service Management Module
          </p>
          <div className="flex gap-5 text-sm text-[var(--muted)]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({
  n,
  l,
  star,
  className,
}: {
  n: string;
  l: string;
  star?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="num flex items-center gap-1 text-xl font-extrabold text-white">
        {n}
        {star && <Star size={15} className="fill-[var(--aqua)] text-[var(--aqua)]" />}
      </p>
      <p className="text-xs">{l}</p>
    </div>
  );
}

function TrackingPreview() {
  const rows = [
    { icon: ShieldCheck, t: "Dikonfirmasi", done: true },
    { icon: CalendarCheck, t: "Terjadwal", done: true },
    { icon: Wrench, t: "Sedang Dikerjakan", done: false, current: true },
    { icon: ClipboardCheck, t: "Selesai", done: false },
  ];
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="rounded-[var(--r-2xl)] border border-white/10 p-5 shadow-2xl backdrop-blur"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <span
            className="grid h-11 w-11 place-items-center rounded-[12px]"
            style={{ background: "rgba(255,255,255,0.07)", color: "var(--aqua)" }}
          >
            <PestIcon type="termites" size={24} />
          </span>
          <div className="flex-1">
            <p className="font-display text-sm font-bold text-white">
              One-Time Treatment
            </p>
            <p className="text-xs text-white/50">Rayap · BB-2024-1007</p>
          </div>
          <span className="badge badge-progress">Dikerjakan</span>
        </div>
        <ul className="mt-4 space-y-3.5">
          {rows.map((r) => (
            <li key={r.t} className="flex items-center gap-3">
              <span
                className="grid h-7 w-7 place-items-center rounded-full"
                style={
                  r.done
                    ? { background: "var(--teal)", color: "#fff" }
                    : r.current
                      ? { background: "var(--aqua)", color: "var(--ink)" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }
                }
              >
                <r.icon size={14} strokeWidth={2.5} />
              </span>
              <span
                className="text-sm"
                style={{ color: r.done || r.current ? "#fff" : "rgba(255,255,255,0.45)" }}
              >
                {r.t}
              </span>
              {r.current && (
                <span className="ml-auto text-xs font-semibold" style={{ color: "var(--aqua)" }}>
                  Sekarang
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
