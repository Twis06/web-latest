import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import RootLayoutClient from "./RootLayoutClient";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Lipeiyang",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-roboto antialiased bg-white dark:bg-black text-black dark:text-white transition-colors`}
      >
        <RootLayoutClient>
          <Navigation />
          <main>{children}</main>
        </RootLayoutClient>
      </body>
    </html>
  );
}
