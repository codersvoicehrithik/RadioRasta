# RadioRasta asset contract

The current world heroes live in Cloudinary's `RadioRasta` asset folder. The interface is HTML and CSS; these images are atmospheric artwork, never baked UI.

## Verified world heroes

| World | Uploaded filename | Verified Cloudinary delivery public ID |
| --- | --- | --- |
| Bus Wala | `bus-wala-hero.png` | `bus-wala-hero_vrsffk` |
| Truck Driver | `truck-driver-hero.png` | `truck-driver-hero_z4qxkz` |
| Chai Tapri | `chai-tapri-hero.png` | `chai-tapri-hero_cgpgqk` |
| Deluxe Saloon | `deluxe-saloon-hero.png` | `deluxe-saloon-hero_zsizgr` |
| Train Radio | `train-radio-hero.png` | `train-radio-hero_a5rubr` |
| Dhaba Radio | `dhaba-radio-hero.png` | `dhaba-radio-hero_d908i3` |
| Baarish Wali Khidki | `baarish-wali-khidki-hero.png` | `baarish-wali-khidki-hero_p4b6ex` |
| 2AM Rooftop | `2am-rooftop-hero.png` | `2am-rooftop-hero_fubblm` |
| Mohalle Wala Pyaar | `mohalle-wala-pyaar-hero.png` | `mohalle-wala-pyaar-hero_sqpdgq` |

Cloudinary generated these suffixed delivery public IDs even though the uploaded files retain the listed filenames in the `RadioRasta` asset folder. `lib/cloudinary-assets.ts` is the sole client-safe resolver. It maps the filenames to the verified IDs and constructs delivery URLs with `CLOUDINARY_CLOUD_NAME`; API credentials are never exposed to the browser.

When replacing an image, keep its filename. Confirm the resulting public ID through Cloudinary before changing the mapping. In development, the browser console logs `[RadioRasta Assets]` with every resolved delivery URL and reports failed image loads.
