import { notFound } from "next/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dict";
import { BReader } from "@/components/BReader";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = await getDictionary(locale);

  const sections = [
    { id: "intro",   kicker: "00", body: d.site.name, emphasis: true },
    { id: "tagline", kicker: "01 · " + d.sections.bio,        body: d.site.tagline, italic: true },
    { id: "bio",     kicker: "02 · " + d.sections.bio,        body: d.bio.short },
    { id: "long",    kicker: "03 · " + d.sections.research,   body: d.bio.long },
    { id: "works",   kicker: "04 · " + d.sections.works,      body: "Eyes at my back and a smile at the corner of my lips · 2015 / 2023" },
    { id: "menelick",kicker: "05 · " + d.sections.menelick,   body: "O Menelick 2º Ato" },
    { id: "contact", kicker: "06 · " + d.sections.contact,    body: "luciane2@unicamp.br" },
  ];

  return (
    <main className="relative min-h-svh bg-ink">
      <header className="fixed top-0 left-0 right-0 z-30 flex items-baseline justify-between p-6 md:p-8 mix-blend-difference">
        <span className="font-mono text-[11px] uppercase tracking-widest text-bone">
          {d.site.role}
        </span>
        <LocaleSwitcher current={locale} basePath="" />
      </header>

      <BReader
        sections={sections}
        labels={{
          scrollHint: d.b.scrollHint,
          soundOn: d.b.soundOn,
          soundOff: d.b.soundOff,
        }}
      />
    </main>
  );
}
