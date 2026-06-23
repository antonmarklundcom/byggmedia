import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";

/** MDX → editorial prose mapping. Internal links via next/link. */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-2xl sm:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl" {...props} />,
  p: (props) => <p className="mt-4 max-w-prose leading-relaxed text-ink/85" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/85 marker:text-accent" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink/85 marker:text-accent" {...props} />,
  li: (props) => <li className="max-w-prose leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 rounded-card bg-accsoft p-5 font-display text-lg italic text-ink" {...props} />
  ),
  a: ({ href = "", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return <Link href={href} className="font-medium text-accent underline" {...rest} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline"
        {...rest}
      />
    );
  },
};
