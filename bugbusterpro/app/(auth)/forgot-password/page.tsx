"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, MailCheck, RotateCw } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { TextField } from "@/components/ui/field";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setError("Email wajib diisi.");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Format email tidak valid.");
    setError(undefined);
    setSent(true);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthPanel />

      <main className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          {!sent ? (
            <>
              <h1 className="text-3xl font-extrabold">Lupa kata sandi?</h1>
              <p className="mt-2 text-[var(--muted)]">
                Masukkan email akun Anda. Kami akan mengirimkan tautan untuk
                mengatur ulang kata sandi.
              </p>

              <form onSubmit={submit} noValidate className="mt-8 space-y-4">
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="nama@email.com"
                  icon={<Mail size={17} />}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(undefined);
                  }}
                  error={error}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Kirim tautan reset
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <span
                className="mx-auto grid h-16 w-16 place-items-center rounded-full"
                style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
              >
                <MailCheck size={30} />
              </span>
              <h1 className="mt-6 text-3xl font-extrabold">Periksa email Anda</h1>
              <p className="mt-2 text-[var(--muted)]">
                Tautan untuk mengatur ulang kata sandi telah kami kirim ke{" "}
                <span className="font-semibold text-[var(--text)]">{email}</span>.
                Tautan berlaku selama 30 menit.
              </p>

              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn btn-secondary mt-7"
              >
                <RotateCw size={16} /> Kirim ulang tautan
              </button>
            </div>
          )}

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
          >
            <ArrowLeft size={15} /> Kembali ke halaman masuk
          </Link>
        </div>
      </main>
    </div>
  );
}
