/**
 * Structured Data for SEO
 * JSON-LD schemas for rich snippets and search engine optimization
 */

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ARISE OSC",
    url: "https://arise-osc.vercel.app",
    description: "A conscious, immersive open-source community where projects, ideas, and people evolve together",
    sameAs: [
      // Add social media URLs here
    ],
    logo: "https://arise-osc.vercel.app/logo.png",
    mainEntity: {
      "@type": "WebSite",
      name: "ARISE OSC",
      url: "https://arise-osc.vercel.app",
    },
  };
}

export function generateWebPageSchema(title: string, description: string, pathname: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: `https://arise-osc.vercel.app${pathname}`,
    isPartOf: {
      "@type": "WebSite",
      name: "ARISE OSC",
      url: "https://arise-osc.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "ARISE OSC",
      url: "https://arise-osc.vercel.app",
    },
    dateModified: new Date().toISOString(),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; pathname: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://arise-osc.vercel.app${item.pathname}`,
    })),
  };
}
