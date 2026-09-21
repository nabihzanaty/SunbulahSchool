# Sunbulah School — Design System (MASTER)

> Source of truth for all pages. Page-specific overrides live in `pages/`.
>
> **Provenance note:** the `ui-ux-pro-max` searchable dataset (`scripts/search.py`,
> `references/`) is not present in this machine's skill install — only `SKILL.md` synced.
> These decisions therefore follow the skill's **priority framework and pre-delivery
> checklist** applied by hand, not a database match. Re-run
> `search.py "<query>" --design-system` if the dataset is restored, and reconcile.

---

## 1. Brand foundation

**السنبلة / sunbulah** = an ear of wheat. The entire identity is built on that literal
meaning: a seed that is planted, tended patiently, and yields many-fold. This is the
anti-generic anchor — every visual decision traces back to *cultivation*, not to
stock "edtech".

Secondary anchor: **place**. Al-Kifl, Babil — Mesopotamian river farmland, mud-brick,
clay, and the lapis-and-gold of ancient Babylon. The palette is drawn from the soil
and the sky of the school's actual governorate.

**Voice:** warm, plain, parental. Speaks to a mother deciding where to send a 4-year-old.
Never corporate, never "empowering learners to unlock their potential."

---

## 2. Deliberate anti-patterns (the "not an AI template" contract)

These are banned in this project. They are the tells that make a page read as generated.

| Banned | Used instead |
|---|---|
| Indigo/violet gradient hero + glass blobs | Warm paper ground, flat editorial colour fields |
| `Inter` / `Poppins` / `Cairo` as the whole type system | `Tajawal`, with hierarchy carried by weight (900/800/700/400) |
| Emoji as icons (🎓📚✨) | Hand-built inline SVG, 1.6px stroke, single family |
| Three identical rounded feature cards | Asymmetric pairs, editorial rows, varied card weights |
| Centred hero, two buttons, blurred blob | Full-bleed crossfade slider, copy held to one side behind a directional scrim |
| Pure `#fff` / `#f9fafb` greys | Warm paper `#FAF6EE`, warm ink `#241D14` |
| Uniform `border-radius: 12px` everywhere | Mixed radii, incl. one organic "leaf" radius for imagery |
| Fake metrics ("10,000+ happy students") | Only verifiable facts; unknowns flagged, not invented |
| Plain `<hr>` section breaks | Repeating wheat-glyph rule |

---

## 3. Colour tokens

Warm, earthen, low-chroma ground with two saturated accents. No cool greys anywhere.

```css
--paper:      #FAF6EE;  /* page ground — warm, not white */
--paper-2:    #F3ECDF;  /* alternating band */
--paper-3:    #EDE3D2;  /* inset / input fill */
--ink:        #241D14;  /* headings, body — warm near-black */
--ink-2:      #4A3F32;  /* secondary text */
--muted:      #6E6152;  /* captions, meta */
--line:       #E3D9C7;  /* hairlines */

--field:      #35513A;  /* PRIMARY — deep field green */
--field-2:    #24391F;  /* darkest green, inverted sections */
--field-3:    #3E5F45;  /* lifted card surface on the dark band */
--field-soft: #E4EBDF;  /* green tint surface */

--clay:       #B0542E;  /* SECONDARY — Babil terracotta */
--clay-soft:  #F7E2D6;

--lapis:      #1C3557;  /* Babylon lapis — deep inverted band */

--gold-light: #8A5A12;  /* gold for SMALL TEXT on paper (AA-safe) */
--gold:       #C88A2E;  /* gold for LARGE display text + decoration only */
--gold-dark:  #E9B85F;  /* gold for text on dark grounds (AA-safe) */
--gold-soft:  #F6E7C8;
```

### Contrast rules (priority 1 — CRITICAL)

- `--gold` **never** carries body text on `--paper` (≈2.9:1). Large display or
  decorative strokes only. Small gold text uses `--gold-light`.
- On `--field-2` / `--lapis` grounds, gold text uses `--gold-dark`.
- Body text is `--ink` or `--ink-2`. `--muted` is the floor — never lighter.

---

## 4. Typography

**Tajawal**, for both scripts. *(Client decision, 2026-09-21 — supersedes the earlier
Amiri + IBM Plex Sans Arabic pairing.)* Tajawal carries Arabic and Latin in one family,
so switching language changes no colour or rhythm on the page. Hierarchy comes from
**weight**, not from a second family.

```css
--font-display: 'Tajawal', system-ui, sans-serif;   /* 800 / 900 */
--font-text:    'Tajawal', system-ui, sans-serif;   /* 300-700 */
```

| Role | Weight |
|---|---|
| Hero / slide titles | 900 |
| Section headings, card titles | 800 |
| Buttons, labels, eyebrows, stat numbers | 700 |
| Body | 400 |
| Captions and meta | 500 |

Because the family no longer supplies contrast on its own, character has to come from
colour, shape, spacing and motion instead — see §2, §7 and §8.

**Rules**
- Body base `17px` (Arabic needs slightly more than 16 to read comfortably).
- Arabic line-height `1.85` for body, `1.3` for display. Arabic ascenders, descenders
  and diacritics need more leading than Latin — the most common mistake in Arabic web type.
- `letter-spacing` on Arabic is **always `0`**. Tracking breaks the joined script.
- Fluid display sizing via `clamp()`; no fixed px headings.

### Bidi rules (learned the hard way on this build)

Two separate bugs came from getting this wrong, so it is written down:

1. **A run that is only numerals** (`3-12`, a time, a phone number) must be isolated:
   `direction: ltr; unicode-bidi: isolate`. Otherwise an RTL paragraph reorders it and
   `3-12` renders as `12-3`.
2. **A run that mixes Arabic words with numerals** must *not* be forced LTR — that
   reorders the whole phrase (`3 - 5 سنوات` became `سنوات 5 - 3`). Either isolate only
   the numeric span, or phrase it so each numeral sits between strong RTL words
   (`من 3 إلى 5 سنوات`), which is what the stage pills now do.

Isolated: `.stat-num`, `.tl-time`, `.contact-num`, `.lightbox-count`.
Deliberately **not** isolated: `.tier-age`.

---

## 5. Layout & spacing

Marketing page → **low density / spacious**.

```css
--sp-1:4  --sp-2:8  --sp-3:12 --sp-4:16 --sp-5:24
--sp-6:32 --sp-7:48 --sp-8:64 --sp-9:96 --sp-10:128
```

- Container `min(1180px, 100% - 2×gutter)`; gutter `20px` mobile → `40px` desktop.
- Section vertical rhythm: `clamp(64px, 9vw, 128px)`.
- Mobile-first breakpoints: `640 / 900 / 1180`.
- **RTL is structural, not a patch.** All CSS uses logical properties
  (`margin-inline-start`, `inset-inline-end`, `text-align: start`, `border-inline-start`).
  There is no `[dir="rtl"]` override block and no mirrored stylesheet — one sheet
  serves both directions. Directional *glyphs* (arrows, chevrons) flip via
  `transform: scaleX(-1)` under `[dir="rtl"]`.

### Radii

```css
--r-sm: 8px;  --r-md: 14px;  --r-lg: 22px;  --r-xl: 28px;  --r-pill: 999px;
--r-leaf: 42% 8% 42% 8% / 30% 8% 30% 8%;   /* organic — imagery only, sparingly */
```

---

## 6. Motion (priority 7)

Tier: **subtle**. This is a school — motion should feel like paper settling, not a product demo.

- Scroll reveal: `opacity 0→1`, `translateY 14px→0`, `620ms cubic-bezier(.22,.61,.36,1)`,
  `60ms` stagger, via `IntersectionObserver`, fires **once**.
- Hover/press: `160ms` in, `120ms` out (exit faster than enter).
- Only `transform` + `opacity` are animated. Never `width`/`height`/`top`.
- **Hero slider:** 900ms crossfade + slow Ken Burns; copy enters on a 160/260/360/460ms
  stagger. Crossfade (not translate) is chosen so the component needs no mirrored
  logic in RTL.
- **Counters:** 1400ms `easeOutCubic`, triggered once by `IntersectionObserver`.
- **Edge effects:** button shine sweep, card glow, the animated `::before` rule on
  event cards, and the wave `.curve-edge` between bands.
- `@media (prefers-reduced-motion: reduce)` disables all of it and sets final state —
  content must never depend on animation to become visible. Autoplay never starts
  under reduced motion.

---

## 7. Texture & ornament

- **Grain:** fixed full-viewport `feTurbulence` SVG overlay, `opacity .035`,
  `mix-blend-mode: multiply`, `pointer-events: none`. Kills the flat-vector look.
- **Wheat rule:** repeating SVG wheat glyph as section divider, in `--line` / `--gold`.
- **Wheat mark:** the logo is a drawn ear of wheat, inline SVG, `currentColor`,
  so it inverts on dark bands for free.

---

## 8. Component standards

- **Buttons:** min `44×44px` hit area (priority 2). Solid `--field` primary;
  outlined `--ink` secondary; both `--r-pill`. Visible `:focus-visible` ring
  (`3px` offset `--clay`) — focus rings are never removed.
- **Cards:** `1px solid --line` on `--paper`; lift on hover is `translateY(-3px)` +
  shadow, not a scale.
- **Forms:** visible `<label>` above every field — never placeholder-as-label.
  Inline error beside the field it belongs to, `aria-describedby` wired,
  `aria-invalid` toggled. Helper text under the field.
- **Images:** every `<img>` carries `width`/`height` or `aspect-ratio` to hold space
  (CLS < 0.1), `loading="lazy"` below the fold, and real `alt`. Decorative SVG is
  `aria-hidden="true"` + `focusable="false"`.
- **Icons:** one inline SVG family, `stroke-width: 1.6`, `stroke-linecap: round`,
  24×24 viewBox. No icon fonts, no emoji, no CDN icon packs.

### Components added in the v2 build

- **Hero slider:** crossfade only. `aria-roledescription="carousel"`, each slide a
  `role="group"`; inactive slides get `aria-hidden` **and** `tabindex="-1"` on their
  links so they leave the tab order. Autoplay pauses on hover, on `focusin`, and when
  the tab is hidden, and ships a real pause control (WCAG 2.2.2). Arrow keys move
  between slides and respect the writing direction.
- **Stat cards:** icon chip + counting number + label. Numbers count once on scroll.
  A year carries `data-count-plain` so it renders `2016`, never `2,016`.
- **Tier cards:** four across; the fourth is the filled `--field` "featured" card.
  Age pills follow the bidi rule in §4.
- **Gallery:** a spanning mosaic. The span order must **tile exactly** —
  `tall, wide, normal, normal, normal, tall, wide, normal` fills a 4-column grid's
  12 cells with no holes. `grid-auto-flow: dense` covers the narrower breakpoints.
  Thumbnails are `<button>`s, not links: they open a dialog, they don't navigate.
- **Lightbox:** `role="dialog"` + `aria-modal`, Tab trapped inside, Escape closes,
  arrow keys navigate by writing direction, focus returns to the thumbnail that
  opened it, background scroll locked.
- **Events:** date badge + tag + title + copy, with an animated inline-start edge.
  Every date except World Children's Day (20 Nov) is a placeholder — see the brief.
- **Curve edge:** the element's own background must match the band **above**; the SVG
  path is filled with the colour of the band **below**. Getting this backwards makes
  the curve invisible.

---

## 9. Bilingual (AR default / EN secondary)

- `<html lang="ar" dir="rtl">` is the **shipped default** — Arabic renders with no JS.
- Every translatable node carries `data-ar` / `data-en`. Attributes use
  `data-ar-placeholder`, `data-ar-label`, `data-ar-aria`, and the `en` equivalents.
- Toggling swaps `lang` + `dir` on `<html>`, rewrites text nodes, and persists to
  `localStorage`. The toggle is a real `<button>` with `aria-pressed`.
- Numerals stay Western (`2016`, `07700097426`) — phone numbers and years must be
  copy-pasteable and dialable.
- Latin text inside an Arabic sentence is wrapped so bidi doesn't scramble it.

---

## 10. Pre-delivery checklist

- [ ] Contrast ≥ 4.5:1 for all text (≥ 3:1 large) in **both** directions
- [ ] Every interactive target ≥ 44×44px with ≥ 8px separation
- [ ] `:focus-visible` present and visible on every focusable element
- [ ] Skip-to-content link, landmark regions, one `<h1>`
- [ ] Keyboard-only pass: nav, lang toggle, accordion, form, mobile menu
- [ ] No horizontal scroll at 320px; zoom not disabled
- [ ] `prefers-reduced-motion` honoured
- [ ] All imagery has dimensions reserved + meaningful `alt`
- [ ] No invented facts — every unverified claim flagged in `CONTENT-BRIEF.md`
