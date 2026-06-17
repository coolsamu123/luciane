import Link from "next/link";
import { notFound } from "next/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dict";
import { Tile, type TileConfig } from "@/components/Tile";

const tiles: TileConfig[] = [
  { key: "bio",          dur: 3.2, href: "#bio",          accent: "warm" },
  { key: "works",        dur: 4.7, href: "#works",        accent: "deep" },
  { key: "performances", dur: 2.1, href: "#performances", accent: "warm" },
  { key: "research",     dur: 5.8, href: "#research",     accent: "deep" },
  { key: "publications", dur: 3.5, href: "#publications", accent: "warm" },
  { key: "menelick",     dur: 6.4, href: "#menelick",     accent: "deep" },
  { key: "teaching",     dur: 2.9, href: "#teaching",     accent: "warm" },
  { key: "agenda",       dur: 4.1, href: "#agenda",       accent: "deep" },
  { key: "contact",      dur: 7.3, href: "#contact",      accent: "warm" },
];

export default async function PageA({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <main className="relative min-h-svh">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-baseline justify-between p-6 md:p-8 mix-blend-difference">
        <Link
          href={`/${locale}`}
          className="font-mono text-[11px] uppercase tracking-widest text-bone hover:text-ocre transition-colors"
        >
          ← {d.ui.back}
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-widest text-bone hidden sm:inline">
          {d.a.kicker}
        </span>
        <LocaleSwitcher current={locale} basePath="/a" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 min-h-svh">
        {tiles.map((t) => (
          <Tile
            key={t.key}
            config={t}
            label={(d.sections as Record<string, string>)[t.key]}
          />
        ))}
      </div>
    </main>
  );
}
