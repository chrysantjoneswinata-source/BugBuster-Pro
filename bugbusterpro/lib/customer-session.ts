"use client";

import { useEffect, useState } from "react";
import { CURRENT_CUSTOMER } from "./mock-data";
import type { Customer } from "./types";

const KEY = "bb_newCustomer";

export interface NewCustomerInfo {
  name: string;
  email: string;
}

/** Tandai sesi ini sebagai pelanggan baru (dipanggil saat mendaftar). */
export function markNewCustomer(info: NewCustomerInfo) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(info));
  } catch {
    /* abaikan bila storage tidak tersedia */
  }
}

/** Hapus penanda pelanggan baru (dipanggil saat login pelanggan lama). */
export function clearNewCustomer() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* abaikan */
  }
}

export interface CustomerSession {
  customer: Customer;
  isNew: boolean;
  ready: boolean;
}

/**
 * Mengembalikan pelanggan aktif untuk sesi ini.
 * - Baru mendaftar  → data minimal (nama dari form), isNew = true.
 * - Selain itu      → pelanggan demo (CURRENT_CUSTOMER) yang punya riwayat.
 * `ready` menandai penanda sesi sudah dibaca, agar tampilan tidak berkedip.
 */
export function useCustomerSession(): CustomerSession {
  const [session, setSession] = useState<{ customer: Customer; isNew: boolean }>({
    customer: CURRENT_CUSTOMER,
    isNew: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let info: NewCustomerInfo | null = null;
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) info = JSON.parse(raw) as NewCustomerInfo;
    } catch {
      info = null;
    }
    if (info && info.name) {
      setSession({
        customer: {
          id: "new",
          name: info.name,
          email: info.email,
          phone: "",
          address: "",
        },
        isNew: true,
      });
    }
    setReady(true);
  }, []);

  return { customer: session.customer, isNew: session.isNew, ready };
}
