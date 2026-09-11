import type { Metadata } from "next";
import "./globals.css";
import "./world-mobile-overrides.css";
import { MusicProvider } from "@/components/music/music-provider";
import { SiteNavigation } from "@/components/site-navigation";
import { PersistentPlayer } from "@/components/music/persistent-player";
import { SiteFooter } from "@/components/site-footer";
import { RadioRastaAssetDiagnostics } from "@/components/assets/radiorasta-asset-diagnostics";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { default: `${siteConfig.productName} — ${siteConfig.productTagline}`, template: `%s | ${siteConfig.productName}` },
  applicationName: siteConfig.applicationName,
  description: siteConfig.productDescription,
  openGraph: { title: siteConfig.social.ogTitle, description: siteConfig.productDescription, siteName: siteConfig.productName },
  twitter: { card: "summary_large_image", title: siteConfig.social.ogTitle, description: siteConfig.productDescription },
  metadataBase: new URL(process.env.BETTER_AUTH_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MusicProvider><RadioRastaAssetDiagnostics /><SiteNavigation />{children}<SiteFooter /><PersistentPlayer /></MusicProvider></body></html>;
}
