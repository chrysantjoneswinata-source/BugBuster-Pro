"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ClipboardList,
  Home,
  Copy,
  Clock,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

function SuccessContent() {
  const params = useSearchParams();
  const code = params.get("code") ?? "BB-2024-1008";

  const steps = [
    "Pesanan Anda masuk ke antrean verifikasi admin.",
    "Admin mengonfirmasi & menjadwalkan kunjungan teknisi.",
    "Anda dapat memantau perkembangan di halaman pesanan.",
  ];

  return (
    <div className="mx-auto max-w-lg py-6 text-center">
      <span
        className="mx-auto grid h-20 w-20 place-items-center rounded-full"
        style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
      >
        <CheckCircle2 size={42} />
      </span>

      <h1 className="mt-6 text-3xl font-extrabold">Pesanan berhasil dibuat!</h1>
      <p className="mt-2 text-[var(--muted)]">
        Terima kasih. Pesanan Anda telah kami terima dan sedang menunggu
        konfirmasi dari tim kami.
      </p>

      {/* Kartu kode */}
      <div className="card card-pad mt-7 text-left">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow eyebrow-muted">Kode pesanan</p>
            <p className="num mt-1 text-2xl font-extrabold">{code}</p>
          </div>
          <StatusBadge status="pending" />
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm mt-3"
          aria-label="Salin kode pesanan"
        >
          <Copy size={15} /> Salin kode
        </button>

        <div className="mt-5 border-t border-[var(--line)] pt-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Clock size={16} className="text-[var(--teal)]" />
            Langkah selanjutnya
          </p>
          <ol className="space-y-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-[var(--muted)]">
                <span
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full font-display text-[11px] font-bold text-white"
                  style={{ background: "var(--ink)" }}
                >
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/bookings" className="btn btn-primary btn-block">
          <ClipboardList size={18} /> Lihat pesanan saya
        </Link>
        <Link href="/dashboard" className="btn btn-secondary btn-block">
          <Home size={18} /> Ke beranda
        </Link>
      </div>
    </div>
  );
}

export default function BookSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-[var(--muted)]">Memuat…</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
