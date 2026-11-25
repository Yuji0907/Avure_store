# Figma mobile spec (auto-extracted from the Figma SVG export)

Source: Figma "Website - Mobile Version" exported as SVG (frames are 768 px wide = 2x a phone).
Each file = one Figma frame. Columns: kind (T=text, R=rectangle/box), layer path, text, font, size, weight, letter-spacing, color, x, y, lines|w, line-height|h.

## HOW TO USE (rule)
- Every value here is in FIGMA px (768 frame). On phones (max-width: 767px) render it as: calc(VALUE * var(--fu)) where --fu = calc(100vw / 768).
  -> on a 384px phone that is exactly VALUE / 2. Example: font-size 48 -> calc(48 * var(--fu)).
- Use the exact font family, size, letter-spacing, line-height (from the "line-height" column when lines > 1), colors.
- Box sizes (R rows, w/h) give section heights, card widths/heights, button sizes, image sizes. x/y give spacing (paddings = x of first element; gaps = difference between y's).
- Acumin Variable Concept weights are not in the export (variable font). Known from Figma: section titles 400, banner titles 600, banner body 500, CTA/button text 600, "View all" 500, body 400.
- Do not scale: tap targets (min 44px), form input font (min 16px).
