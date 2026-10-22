import type { Metadata, Viewport } from "next";
import { Geist, Hanken_Grotesk, Source_Serif_4 } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getShot } from "@/lib/screenshots";
import { site } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", display: "swap", axes: ["opsz"] });
const label = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const ogShot = getShot("hero");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Colder — Cold call tracking. A clear next move.", template: "%s | Colder" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, url: site.url, images: ogShot ? [ogShot.src] : undefined },
  twitter: { card: ogShot ? "summary_large_image" : "summary" },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#e8e6e1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${label.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        {/* overflow-clip (not hidden) so position: sticky still works inside */}
        <main id="main" className="overflow-clip bg-paper md:mx-3 md:rounded-2xl lg:mx-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
