# OG Saigon Custom Trip - Final Asset Map

This map is for `/custom-trip/` only. The page keeps one primary image per destination card. Supporting Tay Ninh and Vung Tau images stay out of the main grid so the five destinations keep equal visual weight.

| Asset file | Destination / role | Exact placement | Desktop priority | Mobile priority | Dimensions | Crop / object-position |
|---|---|---|---|---|---|---|
| `/assets/images/mekong-meal.webp` | Custom experience / hero | Hero, right side | High | High | `1600x1484` | `object-fit: cover`, centered. Keep the guest interaction central. |
| `/assets/images/duy-og-saigon-guests-central-post-office.webp` | Founder / Saigon | `Rooted in Saigon` section | High | High | `1200x1181` | Desktop height 520px, `object-position: center 45%`; mobile height 330px. Preserve Duy and guests. |
| `/assets/images/hidden-alley.webp` | Saigon primary | Saigon destination card | High | High | `1600x1577` | `object-position: center 48%`. Keeps the Saigon card distinct from the founder block and emphasizes local street life. |
| `/assets/images/cu-chi-trapdoor.webp` | Cu Chi primary | Cu Chi destination card | High | High | `1448x1086` | Center crop. Preserve the guest / tunnel interaction. |
| `/assets/images/custom-trip/tay-ninh-cao-dai-holy-see.webp` | Tay Ninh primary | Tay Ninh destination card | High | High | `1000x562` | Desktop `center 50%`, mobile `center 48%`. Keep the twin towers and main facade visible. |
| `/assets/images/custom-trip/tay-ninh-ba-den-mountain.webp` | Tay Ninh supporting | Reserved for future story / detail page | Reserve | Reserve | Source asset | Keep the statue on the right and landscape on the left. Avoid aggressive crop. |
| `/assets/images/custom-trip/vung-tau-coast.webp` | Vung Tau primary | Vung Tau destination card | High | High | `1600x1200` | Desktop `center 62%`, mobile `center 64%`. Keep the red / blue stair, flowers, sea and coastline. |
| `/assets/images/custom-trip/vung-tau-christ-statue-guests.webp` | Vung Tau supporting | Reserved for future story / detail page | Reserve | Reserve | Source asset | Portrait. Keep statue and guests together. |
| `/assets/images/custom-trip/vung-tau-sea-stairs.webp` | Vung Tau supporting | Reserved for future gallery / story | Reserve | Reserve | Source asset | Portrait. Keep both guests and sea horizon. |
| `/assets/images/custom-trip/vung-tau-white-columns-guests.webp` | Vung Tau supporting | Reserved for future story / social gallery | Reserve | Reserve | Source asset | Portrait. Preserve the group and architectural columns. |
| `/assets/images/mekong-boat.webp` | Mekong primary | Mekong destination card | High | High | `1200x1600` | `object-position: center 52%`. Preserve people, boat and river context. |

## Visual rule

Use exactly one primary image for each destination card: Saigon, Cu Chi, Tay Ninh, Vung Tau and Mekong. Do not create mini-galleries inside the cards.

## Source status

- Existing OG Saigon assets used by this page: hero, founder, Saigon, Cu Chi and Mekong.
- `hidden-alley.webp` is included in this patch so the Saigon card no longer depends on the same Central Post Office image used in the founder block.
- Added from user-supplied photography: Tay Ninh and Vung Tau assets.
- Tay Ninh and Vung Tau images are optimized WebP files.
