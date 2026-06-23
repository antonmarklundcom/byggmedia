"use client";

import Link from "next/link";
import { site } from "@/lib/config";
import { NAV_OPEN_EVENT } from "@/components/SiteHeader";
import { MenuIcon, PhoneIcon, MailIcon, ChatIcon } from "@/components/Icons";

/**
 * Fast bottenpanel — mobile only. 4 utility actions.
 * Respects safe-area-inset-bottom. The persistent header "Få analys" button
 * remains the primary conversion action; this bar is utility.
 */
export function BottomBar() {
  const openNav = () => window.dispatchEvent(new Event(NAV_OPEN_EVENT));

  // Chatt → the single chat entry point. The GHL chat widget will later be
  // injected and override window.openByggmediaChat to open the real widget.
  const openChat = () => {
    if (typeof window.openByggmediaChat === "function") {
      window.openByggmediaChat();
    }
  };

  const item =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium text-ink/80 active:text-accent";

  return (
    <nav
      aria-label="Snabbåtgärder"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch">
        <button type="button" onClick={openNav} className={item} aria-label="Meny">
          <MenuIcon className="h-5 w-5" />
          Meny
        </button>
        <a href={site.phoneTel} className={item} aria-label="Ring oss">
          <PhoneIcon className="h-5 w-5" />
          Ring
        </a>
        <Link href="/kontakt" className={item} aria-label="E-post">
          <MailIcon className="h-5 w-5" />
          E-post
        </Link>
        <button type="button" onClick={openChat} className={item} aria-label="Chatt">
          <ChatIcon className="h-5 w-5" />
          Chatt
        </button>
      </div>
    </nav>
  );
}
