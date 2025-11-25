import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "next-themes";
import { Footer } from "./components/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// JSON-LD for SEO authority (E-E-A-T)
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
    default: "mjoaovictor | Telecommunications Engineer",
    template: "%s | mjoaovictor",
  },
  description: "Exploring telecommunications and software engineering.",
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
  },
  openGraph: {
    title: "mjoaovictor | Telecommunications Engineer",
    description: "Exploring telecommunications and software engineering.",
    url: "https://mjoaovictor.dev",
    siteName: "mjoaovictor.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mjoaovictor | Telecommunications Engineer",
    description: "Exploring telecommunications and software engineering.",
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
          "bg-background min-h-screen font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
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
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-4">
            <Navbar />
            <main className="min-w-0 flex-1 py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Vercel Analytics (Traffic) */}
        <Analytics />

        {/* Speed Insights (Performance/Core Web Vitals) */}
        <SpeedInsights />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
      </body>
    </html>
  );
}
