import Link from "next/link";
import { notFound } from "next/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dict";

export default async function Landing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <main className="relative min-h-svh flex flex-col">
      <header className="flex items-start justify-between p-6 md:p-10">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ash">
          {d.site.role}
        </div>
        <LocaleSwitcher current={locale} basePath="" />
      </header>

      <section className="flex-1 grid place-items-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="font-serif font-light text-balance leading-[0.95] text-[clamp(2.75rem,9vw,7rem)] tracking-tightest">
            {d.site.name}
          </h1>
          <p className="mt-6 font-serif italic text-bone/70 text-xl md:text-2xl">
            {d.site.tagline}
          </p>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-widest text-ash">
            {d.landing.preamble}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-ash/20">
        <Door
          href={`/${locale}/a`}
          label="A"
          title={d.landing.doors.a.title}
          hint={d.landing.doors.a.hint}
          accent="ocre"
        />
        <Door
          href={`/${locale}/b`}
          label="B"
          title={d.landing.doors.b.title}
          hint={d.landing.doors.b.hint}
          accent="bone"
          border
        />
      </section>

      <footer className="flex items-center justify-between p-6 md:p-10 font-mono text-[11px] uppercase tracking-widest text-ash">
        <span>{d.landing.footnote}</span>
        <span>{d.ui.year}</span>
      </footer>
    </main>
  );
}

function Door({
  href,
  label,
  title,
  hint,
  accent,
  border,
}: {
  href: string;
  label: string;
  title: string;
  hint: string;
  accent: "ocre" | "bone";
  border?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group block px-8 py-16 md:px-12 md:py-24 relative transition-colors hover:bg-bone/[0.02] ${border ? "md:border-l border-ash/20" : ""}`}
    >
      <div className="font-mono text-[11px] uppercase tracking-widest text-ash">
        {label}
      </div>
      <h2
        className={`mt-4 font-serif text-5xl md:text-6xl tracking-tight ${accent === "ocre" ? "text-ocre" : "text-bone"}`}
      >
        {title}
      </h2>
      <p className="mt-4 text-bone/60 max-w-sm">{hint}</p>
      <span className="absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-widest text-ash group-hover:text-bone transition-colors">
        →
      </span>
    </Link>
  );
}
