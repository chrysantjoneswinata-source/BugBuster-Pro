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
      style={{ background: "var(--ink)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--aqua) 1px, transparent 1px), linear-gradient(90deg, var(--aqua) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

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

      <p className="relative text-xs text-white/40">
        © 2024 BugBuster Pro · Service Management Module
      </p>
    </aside>
  );
}
