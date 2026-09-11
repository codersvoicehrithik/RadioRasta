import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return <main className="standard-page legal-page"><p className="eyebrow">Terms of use</p><h1>Music worlds, responsibly enjoyed.</h1><p>{siteConfig.productName} is an interactive discovery experience by Codersvoice. It does not claim ownership of songs, recordings, artist names, album artwork, or other third-party music rights.</p><h2>Music and creator rights</h2><p>All music remains the property of its respective creators, performers, labels, publishers, and other rights holders. Where RadioRasta links to or embeds a permitted third-party service, playback is provided by that service under its own terms. RadioRasta does not download, copy, host, redistribute, extract, or sell third-party music.</p><h2>Your use</h2><p>Use the experience for personal, lawful listening and discovery. Do not use it to bypass a provider’s controls, reproduce protected material, or infringe anyone’s rights. If you believe content or a link creates a rights concern, contact the project owner so it can be reviewed promptly.</p><h2>Experience mementos</h2><p>Digital journey tickets, favourites, and rituals are entertainment features only. They are not transport tickets, purchases, licences, or proof of any right to music.</p></main>;
}
