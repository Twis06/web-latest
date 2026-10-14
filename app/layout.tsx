import type { Metadata, Viewport } from "next";
import { Martian_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { profile } from "@/content/cv";

// Mona Sans with its width axis, so the name and openers can use the wide cut.
const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-mona", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian", display: "swap" });

export const metadata: Metadata = {
  title: profile.name,
  description:
    "CV of Peiyang (Ben) Li: robotics, reinforcement learning and embedded systems at Northwestern University.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e9" },
    { media: "(prefers-color-scheme: dark)", color: "#13110e" },
  ],
};

// Runs before paint so the stored or system theme never flashes. Same key as the photography site.
const themeScript = `try{var t=localStorage.getItem("portfolio-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mona.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SiteHeader name={profile.short} photography={profile.photography} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
