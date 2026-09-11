export const siteConfig = {
  brand: {
    companyName: "Codersvoice",
    companyUrl: process.env.NEXT_PUBLIC_CODERSVOICE_URL || undefined,
    companyLogo: undefined,
    productName: "RadioRasta",
    productTagline: "Music for every road, mood & memory.",
  },
  companyName: "Codersvoice",
  productName: "RadioRasta",
  productTagline: "Music for every road, mood & memory.",
  productDescription: "Interactive music worlds built around places, memories, and journeys.",
  adminConsoleTitle: "RadioRasta Admin Console",
  applicationName: "RadioRasta",
  cloudinaryRootFolder: "RadioRasta",
  social: { ogTitle: "RadioRasta — Music for every road, mood & memory" },
} as const;

export const productByline = `${siteConfig.productName} — An experience by ${siteConfig.companyName}`;
