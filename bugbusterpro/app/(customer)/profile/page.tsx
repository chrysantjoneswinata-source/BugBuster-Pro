"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Lock,
  LogOut,
  Star,
  ShieldCheck,
  Pencil,
  Check,
  Plus,
  Home,
  Briefcase,
} from "lucide-react";
import { TextField } from "@/components/ui/field";
import { CURRENT_CUSTOMER, BOOKINGS } from "@/lib/mock-data";

const ADDRESSES = [
  {
    id: "a1",
    label: "Rumah",
    icon: Home,
    value: "Pogung Baru No. 21, Sleman, DI Yogyakarta 55284",
    primary: true,
  },
  {
    id: "a2",
    label: "Kantor",
    icon: Briefcase,
    value: "Jl. Malioboro No. 52, Gedongtengen, Kota Yogyakarta 55271",
    primary: false,
  },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: CURRENT_CUSTOMER.name,
    email: CURRENT_CUSTOMER.email,
    phone: CURRENT_CUSTOMER.phone,
  });

  const completed = BOOKINGS.filter((b) => b.status === "completed").length;
  const initials = CURRENT_CUSTOMER.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="eyebrow">Akun saya</p>
        <h1 className="mt-1 text-3xl font-extrabold">Profil</h1>
        <p className="mt-1 text-[var(--muted)]">
          Kelola informasi pribadi dan preferensi akun Anda.
        </p>
      </div>

      {/* Kartu identitas */}
      <div
        className="relative overflow-hidden rounded-[var(--r-lg)] p-6 text-white"
        style={{ background: "var(--ink)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
        />
        <div className="relative flex items-center gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full font-display text-xl font-extrabold"
            style={{ background: "var(--teal)" }}
          >
            {initials}
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-display text-xl font-extrabold">
              {form.name}
            </h2>
            <p className="truncate text-sm text-white/70">{form.email}</p>
          </div>
        </div>
        <div className="relative mt-5 flex gap-6">
          <div>
            <p className="num text-2xl font-extrabold">{completed}</p>
            <p className="text-xs text-white/60">Layanan selesai</p>
          </div>
          <div className="border-l border-white/15 pl-6">
            <p className="num flex items-center gap-1 text-2xl font-extrabold">
              <Star size={18} className="fill-[var(--aqua)] text-[var(--aqua)]" />
              4.9
            </p>
            <p className="text-xs text-white/60">Pelanggan setia</p>
          </div>
        </div>
      </div>

      {saved && (
        <div
          className="flex items-center gap-2 rounded-[var(--r)] p-3 text-sm font-semibold"
          style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
        >
          <Check size={17} /> Perubahan profil berhasil disimpan.
        </div>
      )}

      {/* Informasi pribadi */}
      <section className="card card-pad sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Informasi pribadi</h2>
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="btn btn-ghost btn-sm"
            >
              <Pencil size={15} /> Ubah
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={save} className="space-y-4">
            <TextField
              id="name"
              label="Nama lengkap"
              icon={<User size={17} />}
              value={form.name}
              onChange={set("name")}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              icon={<Mail size={17} />}
              value={form.email}
              onChange={set("email")}
            />
            <TextField
              id="phone"
              type="tel"
              inputMode="numeric"
              label="Nomor telepon"
              icon={<Phone size={17} />}
              value={form.phone}
              onChange={set("phone")}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setForm({
                    name: CURRENT_CUSTOMER.name,
                    email: CURRENT_CUSTOMER.email,
                    phone: CURRENT_CUSTOMER.phone,
                  });
                }}
                className="btn btn-secondary"
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary btn-block">
                <Check size={17} /> Simpan perubahan
              </button>
            </div>
          </form>
        ) : (
          <dl className="space-y-4">
            <InfoRow icon={<User size={17} />} label="Nama lengkap" value={form.name} />
            <InfoRow icon={<Mail size={17} />} label="Email" value={form.email} />
            <InfoRow icon={<Phone size={17} />} label="Nomor telepon" value={form.phone} />
          </dl>
        )}
      </section>

      {/* Alamat tersimpan */}
      <section className="card card-pad sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Alamat tersimpan</h2>
          <button type="button" className="btn btn-ghost btn-sm">
            <Plus size={15} /> Tambah
          </button>
        </div>
        <div className="space-y-3">
          {ADDRESSES.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-[var(--r)] border border-[var(--line)] p-3.5"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px]"
                  style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
                >
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-bold">
                    {a.label}
                    {a.primary && (
                      <span className="rounded-full bg-[var(--teal-soft)] px-2 py-0.5 text-[11px] font-bold text-[var(--teal-strong)]">
                        Utama
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{a.value}</p>
                </div>
                <button
                  type="button"
                  aria-label="Ubah alamat"
                  className="grid h-8 w-8 place-items-center rounded-full text-[var(--faint)] transition hover:bg-[var(--paper)] hover:text-[var(--teal)]"
                >
                  <Pencil size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Keamanan */}
      <section className="card card-pad sm:p-6">
        <h2 className="mb-1 text-lg font-bold">Keamanan</h2>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Perbarui kata sandi secara berkala untuk menjaga keamanan akun.
        </p>
        <div className="space-y-4">
          <TextField
            id="current"
            type="password"
            label="Kata sandi saat ini"
            icon={<Lock size={17} />}
            placeholder="••••••••"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="new"
              type="password"
              label="Kata sandi baru"
              icon={<Lock size={17} />}
              placeholder="Minimal 6 karakter"
            />
            <TextField
              id="confirm"
              type="password"
              label="Ulangi kata sandi baru"
              icon={<Lock size={17} />}
              placeholder="Masukkan ulang"
            />
          </div>
          <button type="button" className="btn btn-secondary">
            <ShieldCheck size={17} /> Perbarui kata sandi
          </button>
        </div>
      </section>

      {/* Keluar */}
      <Link
        href="/login"
        className="btn btn-block !justify-start gap-3 !border !border-[var(--line)] !bg-[var(--surface)] !text-[var(--st-cancelled)] hover:!bg-[var(--st-cancelled-bg)]"
      >
        <LogOut size={18} /> Keluar dari akun
      </Link>

      <p className="pb-2 text-center text-xs text-[var(--faint)]">
        BugBuster Pro · Service Management Module v2.0
      </p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px]"
        style={{ background: "var(--paper)", color: "var(--muted)" }}
      >
        {icon}
      </span>
      <div>
        <dt className="text-xs text-[var(--muted)]">{label}</dt>
        <dd className="font-semibold">{value}</dd>
      </div>
    </div>
  );
}
