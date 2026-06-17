import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher({
  current,
  basePath,
}: {
  current: Locale;
  basePath: string;
}) {
  return (
    <nav
      aria-label="language"
      className="flex gap-3 font-mono text-[11px] uppercase tracking-widest"
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${basePath}`}
          className={
            l === current
              ? "text-bone"
              : "text-ash hover:text-bone transition-colors"
          }
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
