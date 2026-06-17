import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Luciane Ramos-Silva",
  description:
    "Bailarina, coreógrafa, antropóloga · dancer, choreographer, anthropologist",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
