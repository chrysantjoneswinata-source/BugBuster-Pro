"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function TextField({
  label,
  icon,
  error,
  className,
  ...props
}: {
  label?: string;
  icon?: ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className="field-label">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--faint)]">
            {icon}
          </span>
        )}
        <input
          className={cn("input", icon && "input-icon", error && "input-error")}
          {...props}
        />
      </div>
      {error && (
        <p className="hint-error">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  error,
  className,
  ...props
}: {
  label?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className="field-label">
          {label}
        </label>
      )}
      <textarea
        className={cn("input resize-none", error && "input-error")}
        rows={4}
        {...props}
      />
      {error && (
        <p className="hint-error">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  error,
  className,
  children,
  ...props
}: {
  label?: string;
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className="field-label">
          {label}
        </label>
      )}
      <select
        className={cn("input appearance-none pr-10", error && "input-error")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235c6f77' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.85rem center",
        }}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="hint-error">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}
