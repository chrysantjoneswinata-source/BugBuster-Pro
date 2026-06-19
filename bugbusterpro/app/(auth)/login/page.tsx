"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { TextField } from "@/components/ui/field";
import { GoogleMark, AppleMark } from "@/components/ui/brand-marks";
import { clearNewCustomer } from "@/lib/customer-session";

const DEMO_ROLES = [
  { label: "Pelanggan", href: "/dashboard", ready: true },
  { label: "Admin", href: "/admin", ready: true },
  { label: "Teknisi", href: "/tech", ready: true },
  { label: "Manager", href: "/manager", ready: true },
];

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clearNewCustomer();
    router.push("/dashboard"); // prototipe: arahkan ke area pelanggan
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthPanel />

      <main className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">{/* logo kecil untuk mobile */}</div>
          <h1 className="text-3xl font-extrabold">Selamat datang 👋</h1>
          <p className="mt-2 text-[var(--muted)]">
            Masuk dan selesaikan masalah hama Anda dengan mudah.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <TextField
              id="email"
              type="email"
              label="Email"
              placeholder="nama@email.com"
              icon={<Mail size={17} />}
              defaultValue="chrysantjonesw@gmail.com"
              required
            />
            <div>
              <TextField
                id="password"
                type={show ? "text" : "password"}
                label="Kata sandi"
                placeholder="Masukkan kata sandi"
                icon={<Lock size={17} />}
                defaultValue="CJW_JSP_090126"
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="float-right mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--teal)]"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
                {show ? "Sembunyikan" : "Tampilkan"} sandi
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded accent-[var(--teal)]"
                  defaultChecked
                />
                Ingat saya
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[var(--teal)] hover:underline"
              >
                Lupa sandi?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Masuk
            </button>
          </form>

          <div className="or-divider my-6">atau</div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-secondary">
              <GoogleMark /> Google
            </button>
            <button className="btn btn-secondary">
              <AppleMark /> Apple
            </button>
          </div>

          {/* Demo cepat — sadar roadmap */}
          <div className="mt-7 rounded-[var(--r)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-2)] p-4">
            <p className="eyebrow eyebrow-muted">Masuk cepat (demo)</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DEMO_ROLES.map((r) =>
                r.ready ? (
                  <Link key={r.label} href={r.href} onClick={clearNewCustomer} className="btn btn-secondary btn-sm">
                    {r.label}
                  </Link>
                ) : (
                  <span
                    key={r.label}
                    className="btn btn-sm cursor-not-allowed !bg-transparent !text-[var(--faint)] !border !border-[var(--line)]"
                    title="Menyusul pada fase berikutnya"
                  >
                    {r.label}
                    <span className="ml-1 rounded bg-[var(--paper)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                      Segera
                    </span>
                  </span>
                )
              )}
            </div>
          </div>

          <p className="mt-7 text-center text-sm text-[var(--muted)]">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-[var(--teal)] hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
