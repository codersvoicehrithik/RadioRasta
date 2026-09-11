import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorld } from "@/lib/worlds";
import { WorldExperience } from "@/components/world/world-experience";

export function generateStaticParams() { return ["bus-wala", "truck-driver", "chai-tapri", "deluxe-saloon", "train-radio", "dhaba-radio", "baarish-wali-khidki", "2am-rooftop", "mohalle-wala-pyaar"].map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const world = getWorld((await params).slug); return world ? { title: world.name, description: world.description } : {}; }
export default async function WorldPage({ params }: { params: Promise<{ slug: string }> }) { const world = getWorld((await params).slug); if (!world) notFound(); return <WorldExperience world={world} />; }
