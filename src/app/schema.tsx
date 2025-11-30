// JSON-LD Structured Data Component
export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ouragpt.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OuraGPT",
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    description:
      "Chat with your Oura Ring data using AI. Get personalized insights about your sleep, activity, readiness, and overall health metrics.",
    sameAs: [
      // Add social media links when available
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "OuraGPT",
    url: siteUrl,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Chat with your Oura Ring data using AI. Get personalized insights about your sleep, activity, readiness, heart rate, and overall health metrics through intelligent conversations.",
    featureList: [
      "Sleep analysis and insights",
      "Activity tracking",
      "Readiness score monitoring",
      "Heart rate data analysis",
      "AI-powered health conversations",
      "Personalized health recommendations",
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OuraGPT",
    url: siteUrl,
    description:
      "Chat with your Oura Ring data using AI. Get personalized insights about your health metrics.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

