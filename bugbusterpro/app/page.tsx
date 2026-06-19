import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  Star,
  Search,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { PestIcon } from "@/components/ui/pest";

const NAV = [
  { label: "Beranda", href: "#top" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Kontak", href: "#kontak" },
];

const ABOUT_POINTS = [
  "Penanganan aman & ramah lingkungan",
  "Teknisi bersertifikat & berpengalaman",
  "Solusi sesuai kebutuhan Anda",
  "Garansi layanan & pemantauan berkala",
];

const PROGRESS = [
  { label: "Kepuasan pelanggan", value: 98 },
  { label: "Penyelesaian tepat waktu", value: 95 },
];

const SERVICES: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    icon: <PestIcon type="termites" size={26} />,
    title: "Pengendalian Rayap",
    desc: "Penanganan rayap menyeluruh untuk melindungi struktur kayu dan fondasi rumah Anda.",
  },
  {
    icon: <PestIcon type="rodents" size={26} />,
    title: "Pengendalian Tikus",
    desc: "Mengatasi tikus di dapur, gudang, dan saluran dengan metode yang aman dan higienis.",
  },
  {
    icon: <PestIcon type="bedbugs" size={26} />,
    title: "Pembasmian Kutu Busuk",
    desc: "Membasmi kutu busuk pada kasur dan furnitur hingga tuntas ke sarangnya.",
  },
  {
    icon: <PestIcon type="ants" size={26} />,
    title: "Pengendalian Semut",
    desc: "Menghilangkan koloni semut dari dapur dan ruang keluarga secara efektif.",
  },
  {
    icon: <PestIcon type="spiders" size={26} />,
    title: "Pembasmian Laba-laba",
    desc: "Membersihkan sarang laba-laba di plafon, sudut ruangan, dan teras rumah.",
  },
  {
    icon: <Search size={24} />,
    title: "Inspeksi & Konsultasi",
    desc: "Pemeriksaan menyeluruh untuk mendiagnosa tingkat serangan dan menyusun rencana penanganan.",
  },
];

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-[var(--paper)]">
      {/* ───────────── Hero (gelap, teal) ───────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "var(--ink)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--aqua) 1px, transparent 1px), linear-gradient(90deg, var(--aqua) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
        />

        {/* Navbar */}
        <header className="relative">
          <div className="container-app flex h-20 items-center justify-between gap-4">
            <Logo variant="light" />
            <nav className="hidden items-center gap-8 md:flex">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="text-sm font-semibold text-white/75 transition hover:text-white"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <Link
              href="/login"
              className="btn"
              style={{ background: "var(--aqua)", color: "var(--ink)" }}
            >
              Masuk <ArrowRight size={16} />
            </Link>
          </div>
        </header>

        {/* Konten hero */}
        <div className="container-app relative pb-14 pt-10 text-center md:pb-20 md:pt-16">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ background: "rgba(47,212,196,0.12)", color: "var(--aqua)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--aqua)" }} />
            Layanan Pengendalian Hama Tepercaya
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-6xl">
            Solusi Pengendalian Hama Menyeluruh untuk Rumah Anda
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg">
            Kami menyediakan layanan pengendalian hama profesional dengan metode
            ramah lingkungan dan aman. Teknisi bersertifikat kami memastikan
            perlindungan jangka panjang.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="btn btn-lg"
              style={{ background: "var(--aqua)", color: "var(--ink)" }}
            >
              Pesan Sekarang <ArrowRight size={18} />
            </Link>
            <button className="group inline-flex items-center gap-3 text-sm font-semibold text-white">
              <span
                className="grid h-11 w-11 place-items-center rounded-full transition group-hover:scale-105"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <Play size={16} className="fill-white" />
              </span>
              Tonton Video
            </button>
          </div>
        </div>

        {/* Deretan foto — beri prop src untuk menampilkan foto Anda (file di folder /public) */}
        <div className="container-app relative pb-12 md:pb-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            <PhotoCard className="h-40 md:h-52" src="/teknisi 1.jpg" />
            <PhotoCard className="h-40 md:h-64" src="/teknisi 2.jpg" />
            <PhotoCard className="hidden h-40 sm:block md:h-52" src="/teknisi 3.jpg" />
            <PhotoCard className="h-40 md:h-64" src="/teknisi 4.jpg" />
            <PhotoCard className="hidden h-40 md:block md:h-52" src="/teknisi 5.jpg" />
          </div>
        </div>
      </section>

      {/* ───────────── Tentang ───────────── */}
      <section id="tentang" className="container-app py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative">
            <div className="relative h-[380px] overflow-hidden rounded-[var(--r-2xl)] md:h-[460px]">
              <img
                src="/teknisi 6.jpg"
                alt="Tim teknisi BugBuster Pro"
                className="h-full w-full object-cover"
              />
            </div>
            {/* badge melingkar */}
            <div
              className="absolute -bottom-6 -right-2 grid h-28 w-28 place-items-center rounded-full text-center shadow-lg md:right-6"
              style={{ background: "var(--aqua)", color: "var(--ink)" }}
            >
              <div>
                <p className="num text-2xl font-extrabold leading-none">10+</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                  Tahun
                  <br />
                  Pengalaman
                </p>
              </div>
            </div>
          </div>

          {/* Teks */}
          <div>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Ahli pengendalian hama untuk rumah &amp; bisnis
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              BugBuster Pro adalah perusahaan jasa pengendalian hama profesional yang 
              berfokus pada perlindungan hunian dan area komersial dari berbagai gangguan 
              hama. Dengan standar pelayanan yang tinggi, teknologi pengendalian modern, 
              dan pendekatan yang ramah lingkungan, kami memastikan setiap pelanggan 
              mendapatkan solusi yang efektif, aman, dan dapat diandalkan.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ABOUT_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm font-medium">
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-4">
              {PROGRESS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{bar.label}</span>
                    <span className="num text-[var(--teal)]">{bar.value}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--line)]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${bar.value}%`, background: "var(--teal)" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link href="/login" className="btn btn-primary mt-8">
              Pelajari Lebih Lanjut <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Layanan ───────────── */}
      <section
        id="layanan"
        className="border-y border-[var(--line)] py-20 md:py-28"
        style={{ background: "var(--surface)" }}
      >
        <div className="container-app">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mt-2 max-w-md text-3xl font-extrabold md:text-4xl">
                Layanan pengendalian hama profesional yang bisa Anda percaya
              </h2>
            </div>
            <Link href="/login" className="btn btn-secondary">
              Lihat Semua Layanan <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.title} className="card card-hover card-pad">
                <span
                  className="grid h-12 w-12 place-items-center rounded-[14px]"
                  style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
                >
                  {s.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{s.desc}</p>
                <Link
                  href="/login"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)] hover:gap-2.5"
                >
                  Lihat Layanan <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="num text-lg font-extrabold">4,9</span>
            <span className="inline-flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[var(--st-pending)] text-[var(--st-pending)]"
                />
              ))}
            </span>
            <span className="text-[var(--muted)]">· 2.000+ ulasan pelanggan</span>
          </div>
        </div>
      </section>

      {/* ───────────── Ajakan ───────────── */}
      <section className="container-app py-20">
        <div
          className="relative overflow-hidden rounded-[var(--r-2xl)] px-6 py-14 text-center text-white md:py-20"
          style={{ background: "var(--ink)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-xl text-3xl font-extrabold md:text-4xl">
              Siap membuat rumah Anda bebas hama?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/70">
              Pesan layanan sekarang dan rasakan perbedaannya bersama teknisi
              tepercaya kami.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/login"
                className="btn btn-lg"
                style={{ background: "var(--aqua)", color: "var(--ink)" }}
              >
                Pesan Layanan <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="btn btn-lg btn-secondary !border-white/20 !bg-transparent !text-white hover:!bg-white/10"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Footer ───────────── */}
      <footer id="kontak" className="border-t border-[var(--line)]">
        <div className="container-app grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-[var(--muted)]">
              Hama Tuntas, Lingkungan Lebih Aman.
              Layanan pengendalian hama terpercaya untuk menjaga kenyamanan rumah dan kelancaran bisnis Anda.
            </p>
          </div>
          <div>
            <p className="font-display font-bold">Layanan</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <li>Pengendalian Rayap</li>
              <li>Pengendalian Tikus</li>
              <li>Pembasmian Kutu Busuk</li>
              <li>Pengendalian Semut</li>
              <li>Pembasmian Laba-Laba</li>
              <li>Inspeksi &amp; Konsultasi</li>
            </ul>
          </div>
          <div>
            <p className="font-display font-bold">Kontak</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-[var(--teal)]" /> 0812-9034-7578
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[var(--teal)]" /> halo@bugbusterpro.id
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-[var(--teal)]" /> Yogyakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--line)]">
          <div className="container-app flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-[var(--faint)]">
            <span>© 2024 BugBuster Pro · Service Management Module</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[var(--teal)]" /> Tepercaya &amp;
              bersertifikat
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** Kartu foto. Beri prop `src` untuk menampilkan foto; kosongkan untuk placeholder. */
function PhotoCard({ className, src }: { className?: string; src?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--r-xl)] ${className ?? ""}`}
      style={{ background: "linear-gradient(160deg, var(--ink-2), var(--teal-strong))" }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-white/35">
          <div className="flex flex-col items-center gap-1">
            <ImageIcon size={22} />
            <span className="text-[11px] font-semibold">Foto</span>
          </div>
        </div>
      )}
    </div>
  );
}
