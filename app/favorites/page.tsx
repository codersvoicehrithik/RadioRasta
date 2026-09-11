import { FavoritesShelf } from "@/components/favorites/favorites-shelf";

export const metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return <main className="standard-page favorites-page"><p className="section-eyebrow">Saved for later</p><h1>Your little<br /><em>favourites shelf.</em></h1><p>Saved worlds and songs stay on this device.</p><FavoritesShelf /></main>;
}
