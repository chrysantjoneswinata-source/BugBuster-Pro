"use client";

import { useState } from "react";
import { Plus, Clock, Search } from "lucide-react";
import { PestIcon } from "@/components/ui/pest";
import { SERVICES, formatRupiah } from "@/lib/admin-data";
import { SERVICE_TYPE, cn } from "@/lib/utils";

export default function ServicesPage() {
  // status aktif/nonaktif yang bisa di-toggle (prototipe)
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, s.active]))
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Layanan</h1>
          <p className="mt-1 text-[var(--muted)]">
            Kelola katalog layanan, harga, dan ketersediaannya.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={17} /> Tambah layanan
        </button>
      </div>

      <div className="card hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-left text-xs uppercase tracking-wide text-[var(--faint)]">
              <th className="px-4 py-3 font-semibold">Layanan</th>
              <th className="px-4 py-3 font-semibold">Jenis</th>
              <th className="px-4 py-3 font-semibold">Durasi</th>
              <th className="px-4 py-3 font-semibold">Harga</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {SERVICES.map((s) => (
              <tr key={s.id} className="hover:bg-[var(--paper)]">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2.5 font-semibold">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-[10px]"
                      style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
                    >
                      {s.pest ? <PestIcon type={s.pest} size={18} /> : <Search size={16} />}
                    </span>
                    {s.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {SERVICE_TYPE[s.type].label}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} /> {s.durationHr} jam
                  </span>
                </td>
                <td className="num px-4 py-3 font-semibold">
                  {formatRupiah(s.price)}
                </td>
                <td className="px-4 py-3">
                  <Toggle
                    on={active[s.id]}
                    onClick={() =>
                      setActive((a) => ({ ...a, [s.id]: !a[s.id] }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {SERVICES.map((s) => (
          <div key={s.id} className="card card-pad">
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-[11px]"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                {s.pest ? <PestIcon type={s.pest} size={20} /> : <Search size={18} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{s.name}</p>
                <p className="text-xs text-[var(--muted)]">
                  {SERVICE_TYPE[s.type].label} · {s.durationHr} jam
                </p>
              </div>
              <Toggle
                on={active[s.id]}
                onClick={() => setActive((a) => ({ ...a, [s.id]: !a[s.id] }))}
              />
            </div>
            <p className="num mt-3 border-t border-[var(--line)] pt-3 font-bold">
              {formatRupiah(s.price)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        on ? "bg-[var(--teal)]" : "bg-[var(--line-strong)]"
      )}
      aria-pressed={on}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
          on ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
