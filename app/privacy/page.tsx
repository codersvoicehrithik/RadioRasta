import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <main className="standard-page legal-page"><p className="eyebrow">Privacy</p><h1>Your listening stays yours.</h1><p>{siteConfig.productName} stores only the account, library, and journey data needed to provide the experience. Exact location is never required or shared.</p><h2>Local experience data</h2><p>Anonymous favourites and optional journey-ticket details are stored in your browser on the device you use. Clearing browser storage removes that local data.</p><h2>Third-party playback</h2><p>When you choose a configured third-party music source, that provider may collect information under its own privacy policy. RadioRasta does not proxy or download the audio; its player uses the provider’s permitted embedded playback path.</p><h2>Account data</h2><p>If you create an account, the service stores only the data required to authenticate you and provide account features. Do not enter sensitive personal information into an entertainment ticket or ritual.</p></main>;
}
