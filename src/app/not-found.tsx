import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  return (
    <main className="min-h-svh grid place-items-center p-6 text-center">
      <div>
        <p className="font-serif text-5xl text-bone/80">404</p>
        <Link
          href={`/${defaultLocale}/`}
          className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-ash hover:text-bone transition-colors"
        >
          ← luciane ramos-silva
        </Link>
      </div>
    </main>
  );
}
