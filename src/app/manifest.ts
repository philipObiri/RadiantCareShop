import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RadianceCare",
    short_name: "RadianceCare",
    description: "Premium wellness products, coaching sessions, and personalized health plans.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#B07A2F",
    orientation: "portrait-primary",
    categories: ["health", "lifestyle", "shopping"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Shop Products",
        url: "/shop",
        description: "Browse wellness products",
      },
      {
        name: "Book a Session",
        url: "/book",
        description: "Schedule a coaching session",
      },
    ],
  };
}
