import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Noto_Sans_Bengali } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { env } from "@/lib/env";
import "./globals.css";
import "./catalog.css";
import "./workspace.css";
import "./resources.css";
import {cookies} from "next/headers";
import {currentUser} from "@/server/guards";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional", preload: false });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "optional", preload: false });
const bangla = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-noto-bengali", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: { default: "FUTERA — Build the future of your desk", template: "%s | FUTERA" },
  description: "Meet FUTERA: a new era of PC hardware and compatibility-first custom builds for Bangladesh. Research components with linked manufacturer sources.",
  icons: { icon: "/futera-mark.svg", apple: "/futera-mark.svg" },
};
export const viewport: Viewport = { themeColor: "#192a3a" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme=(await cookies()).get("futera-theme")?.value==="light"?"light":"dark";
  const user=env.COMMERCE_ENABLED==="true"?await currentUser():null;
  return <html lang="en" data-theme={theme}><body className={`${inter.variable} ${display.variable} ${bangla.variable} antialiased`}><a href="#main-content" className="fixed left-5 top-4 z-50 -translate-y-24 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground focus:translate-y-0">Skip to content</a><Navbar commerceEnabled={env.COMMERCE_ENABLED==="true"} user={user} theme={theme}/>{children}<Footer /></body></html>;
}
