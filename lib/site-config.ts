const url = "https://mjoaovictor.dev";

export const siteConfig = {
  url,
  domain: "mjoaovictor.dev",
  name: "mjoaovictor",
  description: "My personal website built with Next.js and TypeScript.",
  author: {
    name: "João Victor",
    fullName: "João Victor Menino E Silva",
  },
  // Schema.org Person node referenced by JSON-LD across pages
  personId: `${url}/#person`,
} as const;
