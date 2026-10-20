import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Turbopack requires plugins as strings, not functions
    remarkPlugins: ["remark-frontmatter", "remark-gfm", "remark-math"],
    rehypePlugins: [
      // Left-align display math to share the prose's left edge
      ["rehype-katex", { fleqn: true }],
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
          // Untagged fences would otherwise be rendered as inline code
          defaultLang: { block: "plaintext" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
