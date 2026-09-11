import { siteConfig } from "@/lib/site-config";
export const metadata = { title: "Privacy" };
export default function PrivacyPage() { return <main className="standard-page legal-page"><p className="eyebrow">Privacy</p><h1>Your listening stays yours.</h1><p>{siteConfig.productName} stores only the account, library, and journey data needed to provide the experience. Exact location is never required or shared.</p></main>; }
