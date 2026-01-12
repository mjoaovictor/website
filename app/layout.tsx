import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const _geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const _geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// JSON-LD: Semantic SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "João Victor Victor Menino E Silva",
  alternateName: ["João Victor", "mjoaovictor"],
  url: "https://mjoaovictor.dev",
  image: "https://mjoaovictor.dev/opengraph-image",
  jobTitle: "Telecommunications Engineer",
  knowsAbout: [
    "Software Engineering",
    "Telecommunications",
    "5G"
  ],
  sameAs: [
    "https://github.com/mjoaovictor",
    "https://linkedin.com/in/mjoaovictor",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#262626" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mjoaovictor.dev"),
  title: {
    default: "mjoaovictor",
    template: "%s | mjoaovictor",
  },
  description: "My personal website built with Next.js and TypeScript.",
  keywords: [
    "software engineer",
    "telecommunications",
    "5g",
    "developer",
    "blog",
  ],
  authors: [{ name: "João Victor", url: "https://mjoaovictor.dev" }],
  creator: "João Victor",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "RSS" }],
    },
  },
  openGraph: {
    title: "mjoaovictor",
    description: "My personal website built with Next.js and TypeScript.",
    url: "https://mjoaovictor.dev",
    siteName: "mjoaovictor.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mjoaovictor",
    description: "My personal website built with Next.js and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          ibmSans.variable,
          ibmMono.variable,
          "bg-background font-sans tracking-tight antialiased",
        )}
      >
        {/* Semantic Data Injection */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: true
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col p-4">
            <Navbar />
            <main className="min-w-0 flex-1 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Vercel Analytics */}
        <Analytics />
        {/* Speed Insights (Performance/Core Web Vitals) */}
        <SpeedInsights />
      </body>
    </html>
  );
}
