import { siteConfig } from "@/lib/site-config";
export const metadata = { title: "Terms" };
export default function TermsPage() { return <main className="standard-page legal-page"><p className="eyebrow">Terms</p><h1>Music worlds, responsibly enjoyed.</h1><p>{siteConfig.productName} only supports licensed, creator-provided, or otherwise permitted audio. Digital journey tickets are experience mementos and are never valid for transport.</p></main>; }
