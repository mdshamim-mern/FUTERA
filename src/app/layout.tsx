import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Noto_Sans_Bengali } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { env } from "@/lib/env";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const bangla = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-noto-bengali", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: { default: "FUTERA — Build the future of your desk", template: "%s | FUTERA" },
  description: "Meet FUTERA: a new era of PC hardware and compatibility-first custom builds for Bangladesh. Explore our clearly labelled sample component catalog.",
  icons: { icon: "/futera-mark.svg", apple: "/futera-mark.svg" },
};
export const viewport: Viewport = { themeColor: "#07090D" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${display.variable} ${bangla.variable} antialiased`}><a href="#main-content" className="fixed left-5 top-4 z-50 -translate-y-24 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground focus:translate-y-0">Skip to content</a><Navbar commerceEnabled={env.COMMERCE_ENABLED==="true"}/>{children}<Footer /></body></html>;
}
