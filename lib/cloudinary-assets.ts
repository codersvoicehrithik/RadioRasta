/**
 * Public delivery metadata only. API credentials stay in lib/cloudinary.ts and
 * are never imported by client components.
 */
export const worldHeroFiles = {
  "bus-wala": { filename: "bus-wala-hero.png", publicId: "bus-wala-hero_vrsffk" },
  "truck-driver": { filename: "truck-driver-hero.png", publicId: "truck-driver-hero_z4qxkz" },
  "chai-tapri": { filename: "chai-tapri-hero.png", publicId: "chai-tapri-hero_cgpgqk" },
  "deluxe-saloon": { filename: "deluxe-saloon-hero.png", publicId: "deluxe-saloon-hero_zsizgr" },
  "train-radio": { filename: "train-radio-hero.png", publicId: "train-radio-hero_a5rubr" },
  "dhaba-radio": { filename: "dhaba-radio-hero.png", publicId: "dhaba-radio-hero_d908i3" },
  "baarish-wali-khidki": { filename: "baarish-wali-khidki-hero.png", publicId: "baarish-wali-khidki-hero_p4b6ex" },
  "2am-rooftop": { filename: "2am-rooftop-hero.png", publicId: "2am-rooftop-hero_fubblm" },
  "mohalle-wala-pyaar": { filename: "mohalle-wala-pyaar-hero.png", publicId: "mohalle-wala-pyaar-hero_sqpdgq" },
} as const;

export type WorldHeroSlug = keyof typeof worldHeroFiles;

function publicCloudName() {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
}

export function getWorldHeroUrl(slug: string) {
  const asset = worldHeroFiles[slug as WorldHeroSlug];
  const cloudName = publicCloudName();

  if (!asset || !cloudName) return undefined;

  // Cloudinary's configured upload behavior stores the files in its
  // RadioRasta asset folder but generates a suffixed delivery public ID.
  // These IDs were verified with the Cloudinary Admin API.
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/image/upload/f_auto,q_auto/${asset.publicId}.png`;
}

export function getWorldHeroAssetMap() {
  return Object.fromEntries(
    Object.entries(worldHeroFiles).map(([slug, asset]) => [slug, {
      filename: asset.filename,
      url: getWorldHeroUrl(slug),
    }]),
  );
}
