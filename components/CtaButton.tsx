"use client";

import { useLeadDialog } from "@/components/LeadDialog";
import { ArrowIcon } from "@/components/Icons";
import type { ServiceTag } from "@/lib/lead";

/** Opens the qualify-form dialog. The primary conversion action site-wide. */
export function CtaButton({
  children = "Få kostnadsfri analys",
  service,
  variant = "accent",
  withArrow = false,
  className = "",
}: {
  children?: React.ReactNode;
  service?: ServiceTag;
  variant?: "accent" | "outline" | "ghost";
  withArrow?: boolean;
  className?: string;
}) {
  const { open } = useLeadDialog();
  const cls =
    variant === "accent" ? "btn-accent" : variant === "outline" ? "btn-outline" : "btn-ghost";
  return (
    <button type="button" onClick={() => open({ service })} className={`${cls} ${className}`}>
      {children}
      {withArrow && <ArrowIcon className="h-4 w-4" />}
    </button>
  );
}
