# Sunbulah School — bilingual landing page

A single-page site for **مؤسسة السنبلة التعليمية** (Al-Sunbulah Educational Institution),
a private kindergarten and primary school in Al-Kifl, Babil, Iraq.

Arabic is the default language and the default reading direction. English is a toggle.

```
index.html                              the page
assets/css/styles.css                   all styling (one sheet, RTL + LTR)
assets/js/main.js                       language toggle, nav, FAQ, reveal, form
assets/img/placeholder.svg              stand-in for every photo
content/content.json                    all copy, AR + EN, with source confidence flags
design-system/sunbulah-school/MASTER.md design decisions and why
CONTENT-BRIEF.md                        what's verified vs. what needs the client
```

No build step, no dependencies. Open `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

---

## Before launch

Read **[CONTENT-BRIEF.md](CONTENT-BRIEF.md)**. It marks every claim on the page as confirmed,
`[CONFIRM]`, or `[PLACEHOLDER]`. Three things must happen first:

1. Replace every photo (search the HTML for `data-replace`) — **with parental consent**
2. Verify or remove the enrolment document list and the daily timetable
3. Confirm the address: Facebook says الحلة, Instagram says الكفل

---

## How the bilingual system works

Arabic is written directly into the HTML, and `<html lang="ar" dir="rtl">` is the shipped
default — **the Arabic page renders completely with JavaScript disabled.**

Every translatable node carries both languages:

```html
<h3 data-ar="الروضة" data-en="Kindergarten">الروضة</h3>
```

Attributes use a suffix: `data-ar-placeholder`, `data-ar-label`, `data-ar-aria`,
`data-ar-alt`, `data-ar-content`. Toggling swaps `lang` and `dir` on `<html>`, rewrites the
text, and remembers the choice in `localStorage`.

**To add a new element,** give it both attributes and put the Arabic in as the visible text.
Two rules:

- If an element has `data-ar`, it must not contain child elements — the swap overwrites its
  text. Put `data-ar` on an inner `<span>` instead. (The only exception is the `<h1>`, whose
  translation contains escaped markup and is applied with `innerHTML`.)
- Never add `left`/`right` CSS properties. The stylesheet uses logical properties
  (`margin-inline-start`, `inset-inline-end`, `text-align: start`) so one sheet serves both
  directions. A physical property will look correct in English and break in Arabic.

### Arabic typography notes

- Body line-height is `1.9`. Arabic needs more leading than Latin — this is the most common
  mistake in Arabic web type.
- `letter-spacing` on Arabic is always `0`. Tracking breaks the joined script.
- Numeric ranges inside RTL text get reordered by the bidi algorithm — `3–12` renders as
  `12–3`. Isolate them (`direction: ltr; unicode-bidi: isolate`, or the `.ltr` class).
  `.stat b` and `.contact-num` already do this.

---

## Connecting the form

The enquiry form currently **opens a prefilled WhatsApp chat** with the school — which is how
families in this market actually make contact, and needs no backend.

The number lives in one place:

```html
<form id="enquiry-form" data-whatsapp="9647700097426">
```

To send email or hit an API instead, replace the `window.open(...)` call in the submit handler
in [assets/js/main.js](assets/js/main.js). Inline validation is already wired up
(`aria-invalid`, per-field error messages, focus moves to the first bad field) and is
independent of where the data goes.

---

## Accessibility and robustness

Built against the checklist in
[design-system/sunbulah-school/MASTER.md](design-system/sunbulah-school/MASTER.md#10-pre-delivery-checklist):

- Skip link, landmarks, exactly one `<h1>`, visible `:focus-visible` on every control
- All interactive targets ≥ 44×44px
- Text contrast ≥ 4.5:1 — gold is restricted to large display text and decoration; small gold
  text uses the darker `--gold-light`
- Every image has `alt` plus reserved `width`/`height` (no layout shift)
- Icons are inline SVG with `aria-hidden`, never emoji
- `prefers-reduced-motion` disables all animation
- **Scroll-reveal never hides content permanently.** The hidden start state is scoped to a
  `.js` class added by an inline head script, and a 4-second failsafe reveals everything if
  `main.js` fails to load. With JS off, nothing is hidden at all.

An audit script covering the i18n attribute pairing, the `data-ar`-with-children trap, image
attributes, anchor targets and physical-direction CSS was used during the build — worth
re-running if the markup changes substantially.

---

## Design

Full rationale in [design-system/sunbulah-school/MASTER.md](design-system/sunbulah-school/MASTER.md),
including an explicit list of banned generic-template patterns.

The short version: **سنبلة** means *ear of wheat*, so the whole identity is cultivation — a seed
tended patiently into a harvest. Colours come from Babil's soil and sky (field green, wheat
gold, terracotta, lapis) on warm paper, never cool grey. Type is **Amiri** for display and
**IBM Plex Sans Arabic** for text — one superfamily across both scripts, so switching language
doesn't change the page's colour or rhythm.

> **Note on provenance:** the `ui-ux-pro-max` skill's searchable dataset isn't installed on this
> machine (only `SKILL.md` synced — no `scripts/` or `references/`). The design decisions follow
> the skill's priority framework and pre-delivery checklist applied by hand, not database
> lookups. If the dataset is restored, re-run
> `search.py "<query>" --design-system` and reconcile against `MASTER.md`.
