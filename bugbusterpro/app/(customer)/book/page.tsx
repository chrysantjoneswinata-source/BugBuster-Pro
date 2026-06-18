"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  Check,
  CalendarClock,
} from "lucide-react";
import { PestChip } from "@/components/ui/pest";
import { TextField, TextArea, SelectField } from "@/components/ui/field";
import { CURRENT_CUSTOMER } from "@/lib/mock-data";
import {
  PEST,
  SERVICE_TYPE,
  SEVERITY,
  cn,
} from "@/lib/utils";
import type { PestType, ServiceType, Severity } from "@/lib/types";

const PEST_TYPES = Object.keys(PEST) as PestType[];
const SERVICE_TYPES = Object.keys(SERVICE_TYPE) as ServiceType[];
const SEVERITIES = Object.keys(SEVERITY) as Severity[];

const ONLY_LETTERS = /^[A-Za-zÀ-ÿ.''\s-]+$/;
const PHONE_RE = /^[0-9+\s-]{8,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 — detail layanan
  const [pest, setPest] = useState<PestType | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>("one-time");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Step 2 — data pelanggan
  const [name, setName] = useState(CURRENT_CUSTOMER.name);
  const [phone, setPhone] = useState(CURRENT_CUSTOMER.phone);
  const [email, setEmail] = useState(CURRENT_CUSTOMER.email);
  const [address, setAddress] = useState(CURRENT_CUSTOMER.address);
  const [notes, setNotes] = useState("");

  const [err1, setErr1] = useState<Record<string, string>>({});
  const [err2, setErr2] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!pest) e.pest = "Pilih salah satu jenis hama.";
    if (!date) e.date = "Tanggal layanan wajib diisi.";
    if (!time) e.time = "Waktu layanan wajib diisi.";
    setErr1(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Nama wajib diisi.";
    else if (!ONLY_LETTERS.test(name.trim()))
      e.name = "Nama tidak boleh mengandung angka atau simbol.";
    if (!phone.trim()) e.phone = "Nomor telepon wajib diisi.";
    else if (!PHONE_RE.test(phone.trim()))
      e.phone = "Nomor telepon hanya berisi angka (8–16 digit).";
    if (!email.trim()) e.email = "Email wajib diisi.";
    else if (!EMAIL_RE.test(email.trim()))
      e.email = "Format email tidak valid.";
    if (!address.trim()) e.address = "Alamat lengkap wajib diisi.";
    setErr2(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      const code = `BB-2024-${Math.floor(1008 + Math.random() * 90)}`;
      router.push(`/book/success?code=${code}`);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Kembali ke beranda
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold">Pesan layanan</h1>
      <p className="mt-1 text-[var(--muted)]">
        Lengkapi detail berikut, tim kami akan segera memverifikasi pesanan Anda.
      </p>

      {/* Stepper */}
      <div className="mt-6 flex items-center gap-3">
        <StepDot n={1} active={step === 1} done={step > 1} label="Detail layanan" />
        <span className="h-0.5 flex-1 rounded bg-[var(--line)]">
          <span
            className="block h-full rounded bg-[var(--teal)] transition-all"
            style={{ width: step > 1 ? "100%" : "0%" }}
          />
        </span>
        <StepDot n={2} active={step === 2} done={false} label="Data & alamat" />
      </div>

      <div className="card card-pad mt-6 sm:p-7">
        {step === 1 ? (
          <div className="space-y-6">
            {/* Jenis hama */}
            <div>
              <p className="field-label">Jenis hama</p>
              <div className="flex flex-wrap gap-2.5">
                {PEST_TYPES.map((t) => (
                  <PestChip
                    key={t}
                    type={t}
                    active={pest === t}
                    onClick={() => {
                      setPest(t);
                      setErr1((e) => ({ ...e, pest: "" }));
                    }}
                  />
                ))}
              </div>
              {err1.pest && (
                <p className="hint-error">{err1.pest}</p>
              )}
            </div>

            {/* Jenis penanganan */}
            <div>
              <p className="field-label">Jenis penanganan</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {SERVICE_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setServiceType(t)}
                    className={cn(
                      "rounded-[var(--r)] border p-3.5 text-left transition",
                      serviceType === t
                        ? "border-[var(--teal)] bg-[var(--teal-soft)]"
                        : "border-[var(--line-strong)] bg-[var(--surface)] hover:border-[var(--faint)]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold">
                        {SERVICE_TYPE[t].label}
                      </span>
                      {serviceType === t && (
                        <span
                          className="grid h-5 w-5 place-items-center rounded-full text-white"
                          style={{ background: "var(--teal)" }}
                        >
                          <Check size={13} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {SERVICE_TYPE[t].desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tingkat keparahan */}
            <div>
              <p className="field-label">Perkiraan tingkat keparahan</p>
              <div className="grid grid-cols-3 gap-2.5">
                {SEVERITIES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={cn(
                      "rounded-[var(--r)] border px-3 py-2.5 text-sm font-semibold transition",
                      severity === s
                        ? "text-white"
                        : "border-[var(--line-strong)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--faint)]"
                    )}
                    style={
                      severity === s
                        ? {
                            background: SEVERITY[s].tone,
                            borderColor: SEVERITY[s].tone,
                          }
                        : undefined
                    }
                  >
                    {SEVERITY[s].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tanggal & waktu */}
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="date"
                type="date"
                label="Tanggal layanan"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErr1((er) => ({ ...er, date: "" }));
                }}
                error={err1.date}
              />
              <SelectField
                id="time"
                label="Waktu kedatangan"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setErr1((er) => ({ ...er, time: "" }));
                }}
                error={err1.time}
              >
                <option value="">Pilih slot waktu</option>
                <option value="08:00">08:00 – 10:00</option>
                <option value="10:00">10:00 – 12:00</option>
                <option value="13:00">13:00 – 15:00</option>
                <option value="15:00">15:00 – 17:00</option>
              </SelectField>
            </div>

            <button
              type="button"
              onClick={next}
              className="btn btn-primary btn-lg btn-block"
            >
              Lanjutkan <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="name"
                label="Nama lengkap"
                icon={<User size={17} />}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErr2((er) => ({ ...er, name: "" }));
                }}
                error={err2.name}
              />
              <TextField
                id="phone"
                type="tel"
                inputMode="numeric"
                label="Nomor telepon"
                icon={<Phone size={17} />}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErr2((er) => ({ ...er, phone: "" }));
                }}
                error={err2.phone}
              />
            </div>
            <TextField
              id="email"
              type="email"
              label="Email"
              icon={<Mail size={17} />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr2((er) => ({ ...er, email: "" }));
              }}
              error={err2.email}
            />
            <TextArea
              id="address"
              label="Alamat lengkap layanan"
              placeholder="Nama jalan, nomor rumah, kelurahan, kota…"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErr2((er) => ({ ...er, address: "" }));
              }}
              error={err2.address}
            />
            <TextArea
              id="notes"
              label="Catatan tambahan (opsional)"
              placeholder="Ceritakan kondisi yang Anda alami, mis. area terdampak…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Ringkasan */}
            <div className="rounded-[var(--r)] bg-[var(--paper)] p-4">
              <p className="eyebrow eyebrow-muted">Ringkasan pesanan</p>
              <dl className="mt-2.5 space-y-1.5 text-sm">
                <Row label="Jenis hama" value={pest ? PEST[pest].label : "-"} />
                <Row
                  label="Penanganan"
                  value={SERVICE_TYPE[serviceType].label}
                />
                <Row label="Keparahan" value={SEVERITY[severity].label} />
                <Row
                  label="Jadwal"
                  value={
                    date && time
                      ? `${date} · ${time}`
                      : "-"
                  }
                  icon={<CalendarClock size={14} />}
                />
              </dl>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-secondary"
              >
                <ArrowLeft size={17} /> Kembali
              </button>
              <button type="submit" className="btn btn-primary btn-block">
                Kirim pesanan <Check size={18} strokeWidth={2.5} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function StepDot({
  n,
  active,
  done,
  label,
}: {
  n: number;
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition",
          active || done
            ? "text-white"
            : "border-2 border-[var(--line-strong)] bg-[var(--surface)] text-[var(--faint)]"
        )}
        style={active || done ? { background: "var(--teal)" } : undefined}
      >
        {done ? <Check size={16} strokeWidth={3} /> : n}
      </span>
      <span
        className={cn(
          "hidden text-sm font-semibold sm:block",
          active ? "text-[var(--text)]" : "text-[var(--faint)]"
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className="inline-flex items-center gap-1.5 font-semibold">
        {icon}
        {value}
      </dd>
    </div>
  );
}
