"use client";

import { useState } from "react";
import { Check, Building2, Bell, ShieldCheck } from "lucide-react";
import { TextField } from "@/components/ui/field";
import { ADMIN } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({
    newBooking: true,
    assignment: true,
    completion: false,
    weeklyReport: true,
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (k: keyof typeof notif) =>
    setNotif((n) => ({ ...n, [k]: !n[k] }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Pengaturan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Kelola informasi perusahaan dan preferensi sistem.
        </p>
      </div>

      {saved && (
        <div
          className="flex items-center gap-2 rounded-[var(--r)] p-3 text-sm font-semibold"
          style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
        >
          <Check size={17} /> Pengaturan berhasil disimpan.
        </div>
      )}

      {/* Info perusahaan */}
      <form onSubmit={save} className="card card-pad sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Building2 size={18} className="text-[var(--teal)]" /> Informasi
          perusahaan
        </h2>
        <div className="space-y-4">
          <TextField id="company" label="Nama perusahaan" defaultValue="BugBuster Pro" />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="email" type="email" label="Email" defaultValue="halo@bugbusterpro.id" />
            <TextField id="phone" label="Telepon" defaultValue="0800-1234-5678" />
          </div>
          <TextField id="addr" label="Alamat" defaultValue="Yogyakarta, Indonesia" />
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          <Check size={17} /> Simpan perubahan
        </button>
      </form>

      {/* Notifikasi */}
      <section className="card card-pad sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Bell size={18} className="text-[var(--teal)]" /> Notifikasi
        </h2>
        <div className="divide-y divide-[var(--line)]">
          {[
            { k: "newBooking" as const, label: "Pesanan baru masuk", desc: "Beri tahu saat ada permintaan layanan baru." },
            { k: "assignment" as const, label: "Penugasan teknisi", desc: "Beri tahu saat teknisi ditugaskan." },
            { k: "completion" as const, label: "Layanan selesai", desc: "Beri tahu saat layanan rampung dikerjakan." },
            { k: "weeklyReport" as const, label: "Laporan mingguan", desc: "Kirim ringkasan kinerja tiap minggu." },
          ].map((row) => (
            <div key={row.k} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm font-bold">{row.label}</p>
                <p className="text-xs text-[var(--muted)]">{row.desc}</p>
              </div>
              <button
                onClick={() => toggle(row.k)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition",
                  notif[row.k] ? "bg-[var(--teal)]" : "bg-[var(--line-strong)]"
                )}
                aria-pressed={notif[row.k]}
              >
                <span
                  className={cn(
                    "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
                    notif[row.k] ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Akun */}
      <section className="card card-pad sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <ShieldCheck size={18} className="text-[var(--teal)]" /> Akun admin
        </h2>
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-full font-display text-base font-bold text-white"
            style={{ background: "var(--ink)" }}
          >
            {ADMIN.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div>
            <p className="font-bold">{ADMIN.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {ADMIN.role} · {ADMIN.email}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
