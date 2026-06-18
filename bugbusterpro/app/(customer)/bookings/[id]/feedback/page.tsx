"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import { TextArea } from "@/components/ui/field";
import { PestIcon } from "@/components/ui/pest";
import { getBooking, getTechnician } from "@/lib/mock-data";
import { PEST, SERVICE_TYPE, cn } from "@/lib/utils";

const RATING_LABEL = [
  "",
  "Sangat kurang",
  "Kurang",
  "Cukup",
  "Memuaskan",
  "Sangat memuaskan",
];

const QUICK_TAGS = [
  "Tepat waktu",
  "Ramah & sopan",
  "Hasil bersih",
  "Penjelasan jelas",
  "Profesional",
  "Harga sepadan",
];

export default function FeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const booking = getBooking(id);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string>();

  if (!booking || booking.status !== "completed") {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-lg font-bold">Penilaian belum tersedia</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Anda dapat memberi penilaian setelah layanan selesai dikerjakan.
        </p>
        <Link href={`/bookings/${id}`} className="btn btn-primary mt-6">
          Kembali ke detail pesanan
        </Link>
      </div>
    );
  }

  const pest = PEST[booking.pestType];
  const tech = getTechnician(booking.technicianId);

  const toggleTag = (t: string) =>
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Pilih jumlah bintang terlebih dahulu.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <span
          className="mx-auto grid h-20 w-20 place-items-center rounded-full"
          style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
        >
          <PartyPopper size={40} />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">Terima kasih! 🙌</h1>
        <p className="mt-2 text-[var(--muted)]">
          Penilaian Anda membantu kami menjaga kualitas layanan dan teknisi
          terbaik.
        </p>
        <div className="card card-pad mt-7 text-left">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Penilaian Anda</p>
            <span className="inline-flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < rating
                      ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                      : "text-[var(--line-strong)]"
                  }
                />
              ))}
            </span>
          </div>
          {comment && (
            <p className="mt-2 text-sm text-[var(--muted)]">“{comment}”</p>
          )}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--teal-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--teal-strong)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/bookings" className="btn btn-primary btn-block">
            Ke daftar pesanan
          </Link>
          <Link
            href={`/bookings/${booking.id}`}
            className="btn btn-secondary btn-block"
          >
            Lihat detail pesanan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href={`/bookings/${booking.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Kembali ke detail
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold">Beri penilaian</h1>
        <p className="mt-1 text-[var(--muted)]">
          Bagaimana pengalaman Anda dengan layanan ini?
        </p>
      </div>

      {/* Ringkas pesanan */}
      <div className="card card-pad flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
          style={{ background: "var(--paper)", color: pest.tone }}
        >
          <PestIcon type={booking.pestType} size={22} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold">
            {pest.label} · {SERVICE_TYPE[booking.serviceType].label}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {booking.code}
            {tech && ` · ${tech.name}`}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="card card-pad space-y-6 sm:p-6">
        {/* Bintang */}
        <div className="text-center">
          <p className="field-label">Penilaian keseluruhan</p>
          <div
            className="flex justify-center gap-1.5"
            onMouseLeave={() => setHover(0)}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const val = i + 1;
              const filled = (hover || rating) >= val;
              return (
                <button
                  key={val}
                  type="button"
                  onMouseEnter={() => setHover(val)}
                  onClick={() => {
                    setRating(val);
                    setError(undefined);
                  }}
                  className="p-1 transition-transform hover:scale-110"
                  aria-label={`${val} bintang`}
                >
                  <Star
                    size={38}
                    className={cn(
                      "transition-colors",
                      filled
                        ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                        : "text-[var(--line-strong)]"
                    )}
                  />
                </button>
              );
            })}
          </div>
          <p className="mt-2 h-5 text-sm font-semibold text-[var(--teal)]">
            {RATING_LABEL[hover || rating]}
          </p>
          {error && (
            <p className="hint-error justify-center">{error}</p>
          )}
        </div>

        {/* Tag cepat */}
        <div>
          <p className="field-label">Apa yang berkesan? (opsional)</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={cn("chip", tags.includes(t) && "chip-active")}
                aria-pressed={tags.includes(t)}
              >
                {tags.includes(t) && <CheckCircle2 size={15} />}
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Komentar */}
        <TextArea
          id="comment"
          label="Tulis ulasan (opsional)"
          placeholder="Ceritakan pengalaman Anda secara lebih rinci…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Kirim penilaian
        </button>
      </form>
    </div>
  );
}
