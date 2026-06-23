"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CtaButton } from "@/components/CtaButton";
import { PhoneIcon, CloseIcon } from "@/components/Icons";
import { primaryNav, serviceNav, branschNav } from "@/components/nav";
import { site } from "@/lib/config";

export const NAV_OPEN_EVENT = "byggmedia:open-nav";

export function SiteHeader() {
  const [drawer, setDrawer] = useState(false);

  // Opened from the mobile bottom-bar "Meny" button via a window event.
  useEffect(() => {
    const onOpen = () => setDrawer(true);
    window.addEventListener(NAV_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(NAV_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Huvudmeny">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneTel}
            className="hidden items-center gap-2 text-sm font-semibold text-ink lg:inline-flex"
          >
            <PhoneIcon className="h-4 w-4 text-accent" />
            {site.phone}
          </a>
          {/* Persistent primary conversion action — always one tap away. */}
          <CtaButton className="!px-4 !py-2 text-sm">Få analys</CtaButton>
        </div>
      </div>

      {/* Mobile / tablet nav drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <div className="animate-fade-up absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-canvas p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Stäng meny"
                onClick={() => setDrawer(false)}
                className="rounded-full p-2 text-muted hover:bg-soft hover:text-ink"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Mobilmeny">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawer(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-soft"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Tjänster
            </p>
            <div className="mt-1 flex flex-col">
              {serviceNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawer(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-soft"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
              För din bransch
            </p>
            <div className="mt-1 flex flex-col">
              {branschNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawer(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-soft"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5">
              <a href={site.phoneTel} className="btn-outline w-full">
                <PhoneIcon className="h-4 w-4 text-accent" />
                {site.phone}
              </a>
              <span onClick={() => setDrawer(false)}>
                <CtaButton className="w-full">Få kostnadsfri analys</CtaButton>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
