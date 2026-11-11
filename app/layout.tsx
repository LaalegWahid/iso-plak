import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import Preloader from "@/components/Preloader";

const title = `${site.name} | ${site.title}${site.city ? ` à ${site.city}` : ""}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "placo", "plaquiste", "plaque de plâtre", "isolation", "isolation des murs", "isolation intérieure",
    "aménagement de combles", "isolation des combles", "cloisons", "faux plafonds", "rénovation",
    ...(site.city ? [`plaquiste ${site.city}`, `isolation ${site.city}`] : []),
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#1F1F1F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
        />
        {/* Without JavaScript the loading page could never close, so hide it. */}
        <noscript><style>{"#preloader{display:none}"}</style></noscript>
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
