"use client";

import { useEffect } from "react";
import { getWorldHeroAssetMap } from "@/lib/cloudinary-assets";
import { worlds } from "@/lib/worlds";

/** Development-only public URL inventory; no Cloudinary credential is exposed. */
export function RadioRastaAssetDiagnostics() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const assets = getWorldHeroAssetMap();
    console.info("[RadioRasta Assets]", worlds.map((world) => ({
      world: world.name,
      filename: assets[world.slug as keyof typeof assets]?.filename,
      url: assets[world.slug as keyof typeof assets]?.url ?? "UNRESOLVED: Cloudinary cloud name is not configured",
    })));
  }, []);

  return null;
}
