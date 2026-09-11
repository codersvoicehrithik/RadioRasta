import { JourneyArchive } from "@/components/journeys/journey-archive";
export const metadata = { title: "Journeys" };
export default function JourneysPage() { return <main className="journeys-page"><header><p className="section-eyebrow">Your ticket drawer</p><p className="journey-hindi">सफर अभी बाकी है.</p><h1>Every journey leaves<br/><em>a small paper trail.</em></h1><p>Tickets made while you wander stay on this device. Sign in later to keep them across devices.</p></header><JourneyArchive/></main>; }
