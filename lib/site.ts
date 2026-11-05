// Single place for company details. Replace every placeholder before launch.
export const site = {
  name: "Iso Plak",
  tagline: "Isoler, c’est protéger.",
  title: "Placo, isolation et aménagement de combles",
  phone: "06 00 00 00 00",
  phoneHref: "+33600000000",
  email: "contact@exemple.fr",
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
