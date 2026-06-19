"use client";

import { useMemo, useState } from "react";
import { Search, Phone, Mail, MapPin, ClipboardList } from "lucide-react";
import { CUSTOMERS, customerBookingCount } from "@/lib/admin-data";

export default function CustomersPage() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CUSTOMERS.filter(
      (c) =>
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">Pelanggan</h1>
        <p className="mt-1 text-[var(--muted)]">
          Daftar pelanggan terdaftar beserta riwayat pesanannya.
        </p>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--faint)]"
        />
        <input
          className="input input-icon"
          placeholder="Cari nama, email, atau nomor telepon…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((c) => (
          <div key={c.id} className="card card-pad">
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
                style={{ background: "var(--ink)" }}
              >
                {c.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{c.name}</p>
                <p className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                  <ClipboardList size={12} /> {customerBookingCount(c.id)} pesanan
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 border-t border-[var(--line)] pt-3 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--teal)]" /> {c.phone}
              </p>
              <p className="flex items-center gap-2 truncate">
                <Mail size={14} className="text-[var(--teal)]" /> {c.email}
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--teal)]" />{" "}
                {c.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
