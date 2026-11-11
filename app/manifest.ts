import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} : ${site.title}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    lang: "fr",
    background_color: "#F5F4F0",
    theme_color: "#1F1F1F",
    icons: [{ src: "/favicon.png", sizes: "any", type: "image/png" }],
  };
}
