import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export default function manifest(): MetadataRoute.Manifest { return { name: `${siteConfig.productName} — ${siteConfig.productTagline}`, short_name: siteConfig.productName, description: siteConfig.productDescription, display: "standalone", background_color: "#f4eee4", theme_color: "#bf4e27", icons: [{ src: "/icon.png", type: "image/png", sizes: "any" }] }; }
