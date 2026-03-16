import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  noIndex = false,
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

    setMeta("description", description);
    if (noIndex) setMeta("robots", "noindex, nofollow");

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }
  }, [fullTitle, description, canonicalUrl, noIndex]);

  return null;
};

export default SEO;
