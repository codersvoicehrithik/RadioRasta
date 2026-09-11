"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { WorldHeroImage } from "@/components/assets/world-hero-image";
import type { World } from "@/lib/types";

export function WorldCard({ world, featured = false }: { world: World; featured?: boolean }) {
  const reduceMotion = useReducedMotion();

  return <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0 : 0.55 }} className={`world-card world-card-${world.visual.scene} ${featured ? "world-card-featured" : ""}`} style={{ "--world-primary": world.theme.primary, "--world-sky": world.theme.sky, "--world-accent": world.theme.accent } as React.CSSProperties}>
    <Link href={`/world/${world.slug}`} className="world-card-link" aria-label={`Enter ${world.name}`}>
      <div className="world-card-scene" data-atmosphere={world.theme.atmosphere}>
        <WorldHeroImage world={world} priority={featured} className="world-card-hero-image" />
        <span className="scene-orb" /><span className="scene-silhouette" /><span className="scene-prop" /><span className="scene-sweep" />
      </div>
      <div className="world-card-copy"><p className="world-card-kicker">{world.category} · {world.music.playlistLabel}</p><span className="world-card-hindi">{world.hindiName}</span><h3>{world.name}</h3><p>{world.shortDescription}</p><span className="world-card-enter"><Play size={13} fill="currentColor" /> Enter the memory <ArrowUpRight size={15} /></span></div>
    </Link>
  </motion.article>;
}
