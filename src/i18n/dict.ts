import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
} as const;

export type Dict = Awaited<ReturnType<(typeof dictionaries)["pt"]>>;

export async function getDictionary(locale: Locale): Promise<Dict> {
  return dictionaries[locale]();
}
