import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/lib/site-config";
import { geistSans } from "@/lib/fonts";

// JSON-LD: Semantic SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": siteConfig.personId,
  name: siteConfig.author.fullName,
  alternateName: [
    "João Victor",
    "mjoaovictor"
  ],
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software engineer",
    "telecommunications",
    "5g",
    "developer",
    "blog",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "RSS" }],
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.domain,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          "bg-background font-sans tracking-tight antialiased",
        )}
      >
        {/* Semantic Data Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col max-w-2xl min-h-screen p-4 mx-auto">
            <Navbar />
            <main className="flex-1 min-w-0 py-6">
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
