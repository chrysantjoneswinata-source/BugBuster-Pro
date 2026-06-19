import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "./ui/logo";

const POINTS = [
  "Pesan layanan dalam hitungan menit",
  "Lacak setiap tahap secara real-time",
  "Laporan kerja transparan & terdokumentasi",
];

export function AuthPanel() {
  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
      style={{
        backgroundColor: "var(--ink)",
        backgroundImage:
          "linear-gradient(160deg, rgba(13,42,74,0.82) 0%, rgba(15,66,68,0.84) 52%, rgba(19,78,58,0.88) 100%), url('/auth.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="relative flex items-center justify-between">
        <Logo variant="light" />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={15} /> Beranda
        </Link>
      </div>

      <div className="relative">
        <h2 className="max-w-xs text-3xl font-extrabold leading-tight text-white">
          Kendali penuh atas setiap layanan.
        </h2>
        <ul className="mt-7 space-y-3.5">
          {POINTS.map((p) => (
            <li key={p} className="flex items-center gap-3 text-white/80">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                style={{ background: "var(--teal)" }}
              >
                <Check size={13} strokeWidth={3} className="text-white" />
              </span>
              <span className="text-sm">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs text-white/60">
        © 2024 BugBuster Pro · Service Management Module
      </p>
    </aside>
  );
}
