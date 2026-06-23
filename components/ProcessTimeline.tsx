import { Reveal } from "@/components/Reveal";

export type Step = { title: string; body: string };

const defaultSteps: Step[] = [
  {
    title: "Kostnadsfri analys",
    body: "Vi tittar på var du står idag och vad dina kunder söker efter. Du får ärliga råd — utan kostnad och utan att binda dig.",
  },
  {
    title: "Fast offert innan start",
    body: "Du får ett tydligt förslag och ett fast pris innan något arbete börjar. Inga överraskningar, ingen lång bindningstid.",
  },
  {
    title: "Vi bygger och sköter det",
    body: "Vi sätter igång och håller dig uppdaterad. Du ägnar tiden åt hantverket — vi ser till att kunderna hittar dig.",
  },
];

/** Vertical left-border numbered timeline. Numbered circles in --accent. */
export function ProcessTimeline({ steps = defaultSteps }: { steps?: Step[] }) {
  return (
    <ol className="relative ml-4 border-l border-line">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i} className="mb-8 ml-8 last:mb-0">
          <span className="absolute -left-[18px] flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-white">
            {i + 1}
          </span>
          <h3 className="text-lg">{step.title}</h3>
          <p className="mt-1.5 max-w-prose text-muted">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
