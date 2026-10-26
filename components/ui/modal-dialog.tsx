"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that titles the dialog. */
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/**
 * Thin wrapper over the native <dialog>: `showModal()` gives focus trapping, Escape to
 * close, an inert page behind it and focus restoration, with no extra library. Clicking
 * the backdrop closes it (the dialog itself has no padding, so a click whose target is
 * the dialog element can only have landed on the backdrop).
 */
export function ModalDialog({ open, onClose, labelledBy, className, children }: ModalDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "max-h-[100dvh] w-full max-w-lg overflow-visible bg-transparent p-0 backdrop:bg-[#0a0714]/70 backdrop:backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </dialog>
  );
}
