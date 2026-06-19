"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  FileText,
  Plus,
  X,
  Camera,
  ClipboardCheck,
  Star,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatusTimeline } from "@/components/status-timeline";
import { PestIcon } from "@/components/ui/pest";
import { TextArea } from "@/components/ui/field";
import { getTechJob } from "@/lib/tech-data";
import {
  PEST,
  SERVICE_TYPE,
  SEVERITY,
  STATUS,
  formatDateTime,
  cn,
} from "@/lib/utils";
import type { BookingStatus, ServiceReport } from "@/lib/types";

export default function TechJobDetail() {
  const { id } = useParams<{ id: string }>();
  const job = getTechJob(id);

  const [status, setStatus] = useState<BookingStatus>(job?.status ?? "scheduled");
  const [report, setReport] = useState<ServiceReport | undefined>(job?.report);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<string>();

  // Form laporan
  const [findings, setFindings] = useState("");
  const [actions, setActions] = useState<string[]>([""]);
  const [materials, setMaterials] = useState<string[]>([""]);
  const [photos, setPhotos] = useState(0);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState<string>();

  if (!job) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-lg font-bold">Tugas tidak ditemukan</p>
        <Link href="/tech/jobs" className="btn btn-primary mt-6">
          Kembali ke daftar tugas
        </Link>
      </div>
    );
  }

  const pest = PEST[job.pestType];

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(undefined), 3000);
  };

  const start = () => {
    setStatus("in_progress");
    flash("Pengerjaan dimulai.");
  };

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanActions = actions.map((s) => s.trim()).filter(Boolean);
    if (!findings.trim()) {
      setErr("Temuan di lapangan wajib diisi.");
      return;
    }
    if (cleanActions.length === 0) {
      setErr("Isi minimal satu tindakan penanganan.");
      return;
    }
    setErr(undefined);
    setReport({
      completionStatus: "completed",
      serviceDate: job.scheduledAt,
      findings: findings.trim(),
      actions: cleanActions,
      materials: materials.map((s) => s.trim()).filter(Boolean),
      photos,
      notes: notes.trim() || undefined,
    });
    setStatus("completed");
    setShowForm(false);
    flash("Laporan tersimpan — tugas selesai! 🎉");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href="/tech/jobs"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--teal)]"
      >
        <ArrowLeft size={15} /> Daftar tugas
      </Link>

      {toast && (
        <div
          className="flex items-center gap-2 rounded-[var(--r)] p-3 text-sm font-semibold"
          style={{ background: "var(--st-done-bg)", color: "var(--st-done)" }}
        >
          <CheckCircle2 size={17} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="card card-pad sm:p-6">
        <div className="flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px]"
            style={{ background: "var(--paper)", color: pest.tone }}
          >
            <PestIcon type={job.pestType} size={30} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="num eyebrow eyebrow-muted">{job.code}</p>
              <StatusBadge status={status} />
            </div>
            <h1 className="mt-1 font-display text-xl font-extrabold">
              {pest.label} · {SERVICE_TYPE[job.serviceType].label}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <Clock size={14} /> {formatDateTime(job.scheduledAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Pelanggan & lokasi */}
      <div className="card card-pad sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="field-label">Pelanggan</p>
            <p className="font-bold">{job.customer.name}</p>
          </div>
          <a href={`tel:${job.customer.phone}`} className="btn btn-secondary btn-sm">
            <Phone size={15} /> Telepon
          </a>
        </div>
        <div className="mt-4 flex items-start gap-2 border-t border-[var(--line)] pt-4 text-sm">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" />
          <span className="text-[var(--muted)]">{job.address}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="card card-pad sm:p-6">
        <h2 className="mb-5 text-lg font-bold">Status</h2>
        <StatusTimeline status={status} />
      </div>

      {/* Detail */}
      <div className="card card-pad sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Detail tugas</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Jenis hama" value={pest.label} />
          <Field label="Penanganan" value={SERVICE_TYPE[job.serviceType].label} />
          <Field
            label="Keparahan"
            value={
              <span style={{ color: SEVERITY[job.severity].tone }}>
                {SEVERITY[job.severity].label}
              </span>
            }
          />
          <Field label="Status" value={STATUS[status].label} />
        </dl>
        {job.notes && (
          <div className="mt-4 border-t border-[var(--line)] pt-4">
            <p className="field-label">Catatan pelanggan</p>
            <p className="text-sm text-[var(--muted)]">{job.notes}</p>
          </div>
        )}
      </div>

      {/* Aksi / Laporan */}
      {status === "scheduled" && (
        <div className="card card-pad sm:p-6">
          <p className="text-sm text-[var(--muted)]">
            Sudah tiba di lokasi? Mulai pengerjaan untuk memperbarui status.
          </p>
          <button onClick={start} className="btn btn-primary btn-lg btn-block mt-3">
            <PlayCircle size={18} /> Mulai pengerjaan
          </button>
        </div>
      )}

      {status === "in_progress" && !showForm && (
        <div className="card card-pad sm:p-6">
          <p className="text-sm text-[var(--muted)]">
            Setelah pekerjaan rampung, isi laporan layanan untuk menyelesaikan
            tugas.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary btn-lg btn-block mt-3"
          >
            <ClipboardCheck size={18} /> Selesaikan & isi laporan
          </button>
        </div>
      )}

      {/* Form laporan */}
      {status === "in_progress" && showForm && (
        <form onSubmit={submitReport} className="card card-pad space-y-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <FileText size={18} className="text-[var(--teal)]" /> Laporan layanan
          </h2>

          <TextArea
            id="findings"
            label="Temuan di lapangan *"
            placeholder="Jelaskan kondisi & temuan saat pengerjaan…"
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            error={err && !findings.trim() ? err : undefined}
          />

          <ListInput
            label="Tindakan penanganan *"
            placeholder="mis. Injeksi termitisida pada fondasi"
            items={actions}
            setItems={setActions}
            addLabel="Tambah tindakan"
          />

          <ListInput
            label="Material yang digunakan"
            placeholder="mis. Termitisida (fipronil) 2.5 L"
            items={materials}
            setItems={setMaterials}
            addLabel="Tambah material"
          />

          {/* Foto dokumentasi */}
          <div>
            <p className="field-label">Foto dokumentasi</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: photos }).map((_, i) => (
                <div
                  key={i}
                  className="relative grid h-20 w-20 place-items-center rounded-[var(--r)] bg-[var(--paper)] text-[var(--faint)]"
                >
                  <Camera size={20} />
                  <button
                    type="button"
                    onClick={() => setPhotos((p) => Math.max(0, p - 1))}
                    className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--st-cancelled)] text-white"
                    aria-label="Hapus foto"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPhotos((p) => p + 1)}
                className="grid h-20 w-20 place-items-center rounded-[var(--r)] border-2 border-dashed border-[var(--line-strong)] text-[var(--muted)] transition hover:border-[var(--teal)] hover:text-[var(--teal)]"
              >
                <Plus size={22} />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-[var(--faint)]">
              {photos} foto ditambahkan (placeholder prototipe).
            </p>
          </div>

          <TextArea
            id="notes"
            label="Catatan tambahan (opsional)"
            placeholder="mis. Disarankan inspeksi lanjutan dalam 3 bulan."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />

          {err && (findings.trim() || actions.some((a) => a.trim())) && (
            <p className="hint-error">{err}</p>
          )}

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn btn-secondary flex-1"
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary flex-1">
              <CheckCircle2 size={17} /> Selesaikan tugas
            </button>
          </div>
        </form>
      )}

      {/* Laporan tersimpan */}
      {status === "completed" && report && (
        <div className="card card-pad space-y-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <FileText size={18} className="text-[var(--teal)]" /> Laporan layanan
          </h2>

          <div>
            <p className="field-label">Temuan</p>
            <p className="text-sm text-[var(--muted)]">{report.findings}</p>
          </div>

          <div>
            <p className="field-label">Tindakan</p>
            <ul className="space-y-1.5">
              {report.actions.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--st-done)]"
                  />
                  <span className="text-[var(--muted)]">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {report.materials.length > 0 && (
            <div>
              <p className="field-label">Material</p>
              <div className="flex flex-wrap gap-2">
                {report.materials.map((m, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--muted)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Camera size={15} className="text-[var(--teal)]" /> {report.photos} foto
            dokumentasi
          </div>

          {report.notes && (
            <div className="rounded-[var(--r)] bg-[var(--paper)] p-3">
              <p className="text-sm text-[var(--muted)]">{report.notes}</p>
            </div>
          )}

          {/* Feedback pelanggan bila ada */}
          {job.feedback && (
            <div className="border-t border-[var(--line)] pt-4">
              <p className="field-label flex items-center gap-1.5">
                Penilaian pelanggan
                <span className="inline-flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < job.feedback!.rating
                          ? "fill-[var(--st-pending)] text-[var(--st-pending)]"
                          : "text-[var(--line-strong)]"
                      )}
                    />
                  ))}
                </span>
              </p>
              <p className="text-sm text-[var(--muted)]">“{job.feedback.comment}”</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="field-label">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function ListInput({
  label,
  placeholder,
  items,
  setItems,
  addLabel,
}: {
  label: string;
  placeholder: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  addLabel: string;
}) {
  const update = (i: number, v: string) =>
    setItems((arr) => arr.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) =>
    setItems((arr) => (arr.length === 1 ? [""] : arr.filter((_, idx) => idx !== i)));

  return (
    <div>
      <p className="field-label">{label}</p>
      <div className="space-y-2">
        {items.map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className="input"
              placeholder={placeholder}
              value={val}
              onChange={(e) => update(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--r)] text-[var(--faint)] transition hover:bg-[var(--paper)] hover:text-[var(--st-cancelled)]"
              aria-label="Hapus"
            >
              <X size={17} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((arr) => [...arr, ""])}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)] hover:underline"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}
