import { defaultLocale, locales } from "@/i18n/config";

export default function Root() {
  const script = `(function(){var l=(navigator.language||"${defaultLocale}").slice(0,2).toLowerCase();var s=${JSON.stringify(locales)};var f=s.indexOf(l)>=0?l:"${defaultLocale}";location.replace("./"+f+"/");})();`;

  return (
    <main className="min-h-svh grid place-items-center p-6 text-center">
      <noscript>
        <p className="font-mono text-[11px] uppercase tracking-widest text-bone/60">
          <a className="hover:text-bone" href="./pt/">pt</a>
          {" · "}
          <a className="hover:text-bone" href="./en/">en</a>
          {" · "}
          <a className="hover:text-bone" href="./fr/">fr</a>
        </p>
      </noscript>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </main>
  );
}
