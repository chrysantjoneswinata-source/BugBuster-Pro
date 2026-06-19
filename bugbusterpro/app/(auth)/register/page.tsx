"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { TextField } from "@/components/ui/field";
import { GoogleMark, AppleMark } from "@/components/ui/brand-marks";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const ONLY_LETTERS = /^[A-Za-zÀ-ÿ.''\s-]+$/;
const PHONE_RE = /^[0-9+\s-]{8,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState<string>();

  const set =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Nama lengkap wajib diisi.";
    else if (!ONLY_LETTERS.test(form.name.trim()))
      next.name = "Nama tidak boleh mengandung angka atau simbol.";

    if (!form.email.trim()) next.email = "Email wajib diisi.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Format email tidak valid.";

    if (!form.phone.trim()) next.phone = "Nomor telepon wajib diisi.";
    else if (!PHONE_RE.test(form.phone.trim()))
      next.phone = "Nomor telepon hanya berisi angka (8–16 digit).";

    if (!form.password) next.password = "Kata sandi wajib diisi.";
    else if (form.password.length < 6)
      next.password = "Minimal 6 karakter.";

    if (!form.confirm) next.confirm = "Konfirmasi kata sandi wajib diisi.";
    else if (form.confirm !== form.password)
      next.confirm = "Konfirmasi tidak cocok dengan kata sandi.";

    setErrors(next);

    setAgreeError(
      agree
        ? undefined
        : "Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi terlebih dahulu."
    );

    return Object.keys(next).length === 0 && agree;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) router.push("/dashboard");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthPanel />

      <main className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold">Buat akun baru</h1>
          <p className="mt-2 text-[var(--muted)]">
            Daftar untuk memesan dan melacak layanan pembasmian hama Anda.
          </p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-4">
            <TextField
              id="name"
              label="Nama lengkap"
              placeholder="Contoh: Chrysant Jones Winata"
              icon={<User size={17} />}
              value={form.name}
              onChange={set("name")}
              error={errors.name}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              placeholder="contoh@gmail.com"
              icon={<Mail size={17} />}
              value={form.email}
              onChange={set("email")}
              error={errors.email}
            />
            <TextField
              id="phone"
              type="tel"
              inputMode="numeric"
              label="Nomor telepon"
              placeholder="08xx-xxxx-xxxx"
              icon={<Phone size={17} />}
              value={form.phone}
              onChange={set("phone")}
              error={errors.phone}
            />
            <div>
              <TextField
                id="password"
                type={show ? "text" : "password"}
                label="Kata sandi"
                placeholder="Minimal 6 karakter"
                icon={<Lock size={17} />}
                value={form.password}
                onChange={set("password")}
                error={errors.password}
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
            <TextField
              id="confirm"
              type={show ? "text" : "password"}
              label="Konfirmasi kata sandi"
              placeholder="Konfirmasi kata sandi"
              icon={<Lock size={17} />}
              value={form.confirm}
              onChange={set("confirm")}
              error={errors.confirm}
            />

            <label className="flex items-start gap-2.5 pt-1 text-sm text-[var(--muted)]">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setAgreeError(undefined);
                }}
                className="mt-0.5 h-4 w-4 rounded accent-[var(--teal)]"
              />
              <span>
                Saya menyetujui{" "}
                <span className="font-semibold text-[var(--teal)]">
                  Syarat &amp; Ketentuan
                </span>{" "}
                dan{" "}
                <span className="font-semibold text-[var(--teal)]">
                  Kebijakan Privasi
                </span>{" "}
                BugBuster Pro.
              </span>
            </label>

            {agreeError && <p className="hint-error">{agreeError}</p>}

            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Daftar sekarang
            </button>
          </form>

          <div className="or-divider my-6">atau daftar dengan</div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-secondary">
              <GoogleMark /> Google
            </button>
            <button type="button" className="btn btn-secondary">
              <AppleMark /> Apple
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-[var(--muted)]">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--teal)] hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
