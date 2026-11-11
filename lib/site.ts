// Single place for company details. Replace every placeholder before launch.
export const site = {
  name: "Iso Plak",
  tagline: "Isoler, c’est protéger.",
  title: "Placo, isolation et aménagement de combles",
  description:
    "Iso Plak : pose de placo, isolation des murs, cloisons, faux plafonds et aménagement de combles, en neuf comme en rénovation. Devis gratuit.",
  // Public address of the site, used for canonical URLs, the sitemap and social previews.
  // Set NEXT_PUBLIC_SITE_URL in the hosting environment (no trailing slash).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.isoplak.fr").replace(/\/$/, ""),
  phone: "06 00 00 00 00",
  phoneHref: "+33600000000",
  email: "contact@exemple.fr",
  city: "", // e.g. "Lyon": added to the page title and business data when set
  area: "Votre ville et ses environs",
  siret: "SIRET à renseigner",
};

// Choices in the quote form. The /api/devis endpoint only accepts these values.
export const projectTypes = [
  "Aménagement de combles",
  "Isolation des murs",
  "Cloisons séparatives",
  "Faux plafonds",
  "Autre",
] as const;
