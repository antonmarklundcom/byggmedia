"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LeadForm } from "@/components/LeadForm";
import { CloseIcon } from "@/components/Icons";
import { captureUtm } from "@/lib/utm";
import type { ServiceTag } from "@/lib/lead";

type OpenOpts = { service?: ServiceTag };

type Ctx = {
  open: (opts?: OpenOpts) => void;
  close: () => void;
};

const LeadDialogContext = createContext<Ctx | null>(null);

export function useLeadDialog(): Ctx {
  const ctx = useContext(LeadDialogContext);
  if (!ctx) throw new Error("useLeadDialog must be used within LeadDialogProvider");
  return ctx;
}

export function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<ServiceTag | undefined>(undefined);

  const open = useCallback((opts?: OpenOpts) => {
    setService(opts?.service);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Capture UTM on first landing (first-touch wins).
  useEffect(() => {
    captureUtm();
  }, []);

  // Expose ONE chat entry point. The GHL chat widget will later override this
  // to open the real widget; for now it opens the lead dialog.
  useEffect(() => {
    window.openByggmediaChat = () => open();
    return () => {
      delete window.openByggmediaChat;
    };
  }, [open]);

  // Lock scroll + ESC to close.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Få en kostnadsfri analys"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="animate-fade-up max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-card p-5 shadow-2xl sm:rounded-2xl sm:p-7">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Kostnadsfri analys</p>
                <h2 className="mt-1 text-2xl">Få fler förfrågningar</h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Stäng"
                className="rounded-full p-2 text-muted hover:bg-soft hover:text-ink"
              >
                <CloseIcon />
              </button>
            </div>
            <LeadForm variant="qualify" defaultService={service} />
          </div>
        </div>
      )}
    </LeadDialogContext.Provider>
  );
}
