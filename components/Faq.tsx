import { Reveal } from "@/components/Reveal";

export type FaqItem = { q: string; a: string };

export function Faq({ items, heading = "Vanliga frågor" }: { items: FaqItem[]; heading?: string }) {
  if (!items.length) return null;
  return (
    <section className="py-4">
      <h2 className="text-2xl sm:text-3xl">{heading}</h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {items.map((item, i) => (
          <Reveal as="details" key={item.q} delay={i} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink">
              {item.q}
              <span className="text-accent transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prose text-muted">{item.a}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
