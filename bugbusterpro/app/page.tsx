import Link from "next/link";
import {
  ArrowRight,
  Check,
  Star,
  Search,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Home,
  Target,
  Rocket,
  CalendarCheck,
  Sparkles,
  UserCheck,
  Image as ImageIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { PestIcon } from "@/components/ui/pest";

const NAV = [
  { label: "Beranda", href: "#top" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Kontak", href: "#kontak" },
];

const STATS = [
  { icon: <Clock size={20} />, value: "10+", label: "Tahun pengalaman" },
  { icon: <Home size={20} />, value: "5.000+", label: "Rumah ditangani" },
  { icon: <ShieldCheck size={20} />, value: "98%", label: "Tingkat kepuasan" },
  { icon: <Star size={20} />, value: "4,9", label: "Rating pelanggan" },
];

const VISI_MISI = [
  {
    icon: <Target size={20} />,
    title: "Visi",
    desc: "Menjadi penyedia pengendalian hama paling tepercaya dan ramah lingkungan di Indonesia.",
  },
  {
    icon: <Rocket size={20} />,
    title: "Misi",
    desc: "Memberikan solusi efektif dengan standar keamanan, kualitas, dan pelayanan terbaik.",
  },
];

const ABOUT_POINTS = [
  "Penanganan aman & ramah lingkungan",
  "Teknisi bersertifikat & berpengalaman",
  "Solusi sesuai kebutuhan Anda",
  "Garansi layanan & pemantauan berkala",
];

const PROGRESS = [
  { label: "Kepuasan pelanggan", value: 98 },
  { label: "Penyelesaian tepat waktu", value: 96 },
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

const STEPS = [
  {
    n: "01",
    icon: <CalendarCheck size={22} />,
    title: "Pesan online",
    desc: "Pilih jenis hama dan jadwal yang Anda inginkan lewat beberapa langkah mudah.",
  },
  {
    n: "02",
    icon: <Check size={22} />,
    title: "Jadwal dikonfirmasi",
    desc: "Tim kami mengonfirmasi pesanan dan menugaskan teknisi yang paling tepat.",
  },
  {
    n: "03",
    icon: <ShieldCheck size={22} />,
    title: "Teknisi datang",
    desc: "Teknisi bersertifikat menangani hama dengan metode aman & ramah lingkungan.",
  },
  {
    n: "04",
    icon: <Sparkles size={22} />,
    title: "Selesai & garansi",
    desc: "Laporan layanan diberikan, lengkap dengan garansi dan pemantauan berkala.",
  },
];

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-[var(--paper)]">
      {/* ───────────── Hero (navy — aksen gelap) ───────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(130deg, #0e2c4a 0%, #0f4748 48%, #135040 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-[0.22] blur-3xl"
          style={{ background: "radial-gradient(circle, #28a890 0%, transparent 70%)" }}
        />

        {/* Navbar */}
        <header className="relative">
          <div className="container-app flex h-20 items-center justify-between gap-4">
            <Logo variant="light" />
            <nav className="hidden items-center gap-7 lg:flex">
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

        {/* Konten hero — split: teks kiri, visual kanan */}
        <div className="container-app relative grid items-center gap-12 pb-16 pt-8 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-12">
          {/* Kiri */}
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: "rgba(116,194,68,0.16)", color: "var(--aqua)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--aqua)" }} />
              Layanan Pengendalian Hama Tepercaya
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] md:text-5xl xl:text-6xl">
              Lindungi rumah &amp; bisnis Anda dari serangan hama
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg lg:mx-0">
              Layanan pengendalian hama profesional dengan metode ramah
              lingkungan dan aman. Teknisi bersertifikat kami memastikan
              perlindungan jangka panjang untuk hunian Anda.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/login"
                className="btn btn-lg"
                style={{ background: "var(--aqua)", color: "var(--ink)" }}
              >
                Pesan Sekarang <ArrowRight size={18} />
              </Link>
              <a
                href="#layanan"
                className="btn btn-lg btn-secondary !border-white/20 !bg-transparent !text-white hover:!bg-white/10"
              >
                Lihat Layanan
              </a>
            </div>

            {/* Baris kepercayaan */}
            <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-2.5">
                {["#74c244", "#4f9c2f", "#41842a", "#1f3a63"].map((c) => (
                  <span
                    key={c}
                    className="grid h-9 w-9 place-items-center rounded-full ring-2 ring-[var(--ink)]"
                    style={{ background: c }}
                  >
                    <UserCheck size={15} className="text-white/90" />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="num text-sm font-bold">4,9</span>
                  <span className="inline-flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="fill-[var(--st-pending)] text-[var(--st-pending)]"
                      />
                    ))}
                  </span>
                </div>
                <p className="text-xs text-white/60">2.000+ ulasan pelanggan</p>
              </div>
            </div>
          </div>

          {/* Kanan — visual + kartu melayang */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <PhotoCard className="h-[340px] md:h-[440px]" src="/hero.jpg" />

            {/* Kartu rating melayang */}
            <div
              className="absolute -left-3 top-6 hidden rounded-[var(--r-lg)] bg-white p-3.5 shadow-lg sm:block"
              style={{ color: "var(--text)" }}
            >
              <div className="flex items-center gap-1">
                <span className="num text-xl font-extrabold">4,9</span>
                <span className="inline-flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-[var(--st-pending)] text-[var(--st-pending)]"
                    />
                  ))}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] font-semibold text-[var(--muted)]">
                Ulasan pelanggan
              </p>
            </div>

            {/* Kartu sertifikasi melayang */}
            <div
              className="absolute -bottom-4 -right-2 hidden items-center gap-2.5 rounded-[var(--r-lg)] bg-white p-3.5 shadow-lg sm:flex md:right-4"
              style={{ color: "var(--text)" }}
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                <ShieldCheck size={18} />
              </span>
              <div>
                <p className="text-xs font-bold leading-tight">Teknisi bersertifikat</p>
                <p className="text-[11px] text-[var(--muted)]">Aman &amp; ramah lingkungan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Strip statistik ───────────── */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="container-app grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3.5 px-2">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px]"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                {s.icon}
              </span>
              <div>
                <p className="num text-xl font-extrabold leading-none text-[var(--teal)]">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Visi & Misi (band gradien biru→hijau) ───────────── */}
      <section className="container-app py-16 md:py-20">
        <div
          className="relative overflow-hidden rounded-[var(--r-2xl)] px-6 py-12 md:px-12 md:py-14"
          style={{
            background:
              "linear-gradient(100deg, #2160c4 0%, #1f8f73 52%, #62ab33 100%)",
          }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                Visi &amp; Misi
              </p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                Komitmen kami melindungi setiap ruang Anda
              </h2>
              <p className="mt-3 max-w-md text-sm text-white/85 md:text-base">
                Menghadirkan lingkungan yang sehat dan bebas hama melalui layanan
                profesional, aman, dan ramah lingkungan.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {VISI_MISI.map((v) => (
                <div key={v.title} className="rounded-[var(--r-lg)] bg-white p-5">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-[12px]"
                    style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
                  >
                    {v.icon}
                  </span>
                  <h3
                    className="mt-3 font-display text-base font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Tentang ───────────── */}
      <section id="tentang" className="container-app py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative">
            <PhotoCard className="h-[380px] md:h-[460px]" src="/tim.jpg" rounded="2xl" />
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
            <p className="eyebrow">Tentang Kami</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Ahli pengendalian hama untuk rumah &amp; bisnis
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              BugBuster Pro adalah penyedia layanan pengendalian hama tepercaya
              yang berkomitmen menjaga rumah dan tempat usaha Anda tetap nyaman
              dan bebas hama — menggunakan teknik modern serta bahan yang ramah
              lingkungan.
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
              <p className="eyebrow">Layanan Kami</p>
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
        </div>
      </section>

      {/* ───────────── Cara Kerja ───────────── */}
      <section id="cara-kerja" className="container-app py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Cara Kerja</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Empat langkah mudah menuju rumah bebas hama
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Proses yang sederhana dan transparan, dari pemesanan hingga garansi
            layanan.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="card card-pad relative">
              <span
                className="num absolute right-5 top-4 text-3xl font-extrabold text-[var(--teal-soft)]"
                aria-hidden
              >
                {s.n}
              </span>
              <span
                className="grid h-12 w-12 place-items-center rounded-[14px]"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                {s.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
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
      </section>

      {/* ───────────── Ajakan ───────────── */}
      <section className="container-app pb-20">
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
              Hama tuntas, tenang berkelanjutan. Layanan pengendalian hama
              profesional untuk rumah dan bisnis Anda.
            </p>
          </div>
          <div>
            <p className="font-display font-bold">Layanan</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <li>Pengendalian Rayap</li>
              <li>Pengendalian Tikus</li>
              <li>Pembasmian Kutu Busuk</li>
              <li>Pengendalian Semut</li>
              <li>Pembasmian Laba-laba</li>
              <li>Inspeksi &amp; Konsultasi</li>
            </ul>
          </div>
          <div>
            <p className="font-display font-bold">Kontak</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-[var(--teal)]" /> 0800-1234-5678
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
function PhotoCard({
  className,
  src,
  rounded = "xl",
}: {
  className?: string;
  src?: string;
  rounded?: "xl" | "2xl";
}) {
  const radius = rounded === "2xl" ? "var(--r-2xl)" : "var(--r-xl)";
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        borderRadius: radius,
        background: "linear-gradient(160deg, var(--ink-2), var(--teal-strong))",
      }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-white/35">
          <div className="flex flex-col items-center gap-1">
            <ImageIcon size={24} />
            <span className="text-[11px] font-semibold">Foto</span>
          </div>
        </div>
      )}
    </div>
  );
}
