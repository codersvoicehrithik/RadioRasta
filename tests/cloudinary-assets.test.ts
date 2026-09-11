import { afterEach, describe, expect, it } from "vitest";
import { getWorldHeroAssetMap, getWorldHeroUrl } from "@/lib/cloudinary-assets";

const originalCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

afterEach(() => { process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = originalCloudName; });

describe("RadioRasta Cloudinary heroes", () => {
  it("maps the nine exact uploaded filenames", () => {
    const assets = getWorldHeroAssetMap();
    expect(Object.values(assets).map((asset) => asset.filename)).toEqual([
      "bus-wala-hero.png", "truck-driver-hero.png", "chai-tapri-hero.png", "deluxe-saloon-hero.png", "train-radio-hero.png", "dhaba-radio-hero.png", "baarish-wali-khidki-hero.png", "2am-rooftop-hero.png", "mohalle-wala-pyaar-hero.png",
    ]);
  });

  it("constructs a public Cloudinary delivery URL without credentials", () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "demo-cloud";
    expect(getWorldHeroUrl("bus-wala")).toBe("https://res.cloudinary.com/demo-cloud/image/upload/f_auto,q_auto/bus-wala-hero_vrsffk.png");
  });
});
