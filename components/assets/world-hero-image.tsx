"use client";

import Image from "next/image";
import { useState } from "react";
import { getWorldHeroUrl } from "@/lib/cloudinary-assets";
import type { World } from "@/lib/types";

export function WorldHeroImage({ world, priority = false, className = "" }: { world: World; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = getWorldHeroUrl(world.slug);

  if (!src || failed) return null;

  return <Image
    className={className}
    src={src}
    alt={`${world.name} world`}
    fill
    priority={priority}
    sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 33vw"
    onError={() => {
      setFailed(true);
      if (process.env.NODE_ENV !== "production") console.error(`[RadioRasta Assets] ${world.name} failed to load: ${src}`);
    }}
  />;
}
