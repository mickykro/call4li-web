import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  image?: string;
  type?: string;
  schema?: Record<string, any>;
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  noIndex = false,
  image = "https://call4li.com/og-image.png", // Provide a default or actual OG image URL
  type = "website",
  schema,
}: SEOProps) => {
  const fullTitle = title.includes("Call4li") ? title : `${title} | Call4li`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard Meta
    setMeta("description", description);
    if (noIndex) setMeta("robots", "noindex, nofollow");

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    if (image) setMeta("og:image", image, "property");
    if (canonicalUrl) setMeta("og:url", canonicalUrl, "property");

    // Twitter Cards
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);

    // Canonical
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // JSON-LD Schema
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
      // Remove schema if it exists but shouldn't be here (e.g. navigating away from a schema page)
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.remove();
      }
    }
  }, [fullTitle, description, canonicalUrl, noIndex, image, type, schema]);

  return null;
};

export default SEO;

