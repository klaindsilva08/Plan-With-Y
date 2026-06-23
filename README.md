# Plan with Y — Premium Website

The website for **Plan with Y**, the marketing & branding studio of **Yashitha**.
Hand-built, production-ready, zero build step. Open `index.html` or deploy the
folder as-is.

---

## 1. Brand analysis (source of truth)

| | |
|---|---|
| **Name** | Plan with Y (PlanWithY) |
| **Person** | Yashitha — solo marketing & branding consultant |
| **Personality** | Warm, witty, anti-jargon, self-aware, collaborative |
| **Positioning** | "Let's figure it out together" — a creative partner, not an agency |
| **Ideal client** | Founders of small–mid brands who care about getting details right |
| **Industries** | Wellness, food & beverage, fashion, interiors, hospitality, education, B2B |
| **Value prop** | Thoughtful strategy + creative storytelling through genuine collaboration |
| **Pain points** | Generic marketing, jargon, "hand it over and disappear" agencies |
| **Desired outcome** | A brand presence that feels like connection, not marketing |
| **Proof** | 250+ brands · 5+ years · 3 named testimonials |
| **Voice** | "No jargon. No buzzwords. Coffee optional, good ideas mandatory." |

## 2. Colour system (exact palette — nothing invented)

| Token | Hex | Role |
|---|---|---|
| Rich Black | `#000000` | **Dominant canvas** (primary site) |
| Ivory | `#F6F2E9` | Text |
| Citrus Yellow | `#FFC526` | Accents — eyebrows, links, highlights |
| Electric Blue | `#0A4BD8` | Primary CTAs + focal blocks |

The live site is the **black-dominant edition**: Rich Black is the dominant
surface, Ivory is the text, Yellow leads the small accents (best contrast on
black), Blue carries the primary CTAs. Derived tints are generated strictly
from these four hues — see `:root` in `assets/css/styles.css` (base) and
`assets/css/theme-noir.css` (the black-dominant overlay).

### Two editions
- **Black edition = the site itself** (`index.html` etc. at the root). It loads
  `styles.css` then `theme-noir.css`. Built to be easy on the eyes: surfaces
  lift gently off true black, body text is softened to avoid glare, glows are
  subtle, and there's a dark custom scrollbar.
- **Light (ivory) edition** lives in **`light-version/`** — the original warm
  ivory look, fully self-contained, in case you ever want it.

## 3. Typography

- **Display / headings:** Fraunces (variable serif — warm, editorial, premium)
- **Body / UI:** Inter (clean, highly legible modern sans)
- Full fluid `clamp()` scale (`--step--1` → `--step-5`) in the CSS tokens.

## 4. Structure

```
index.html      Homepage   — all 7 copy strips (hero → final CTA)
about.html      About      — editorial story, values, CTA
services.html   Services   — 6 detailed service blocks (anchor-linked)
faq.html        FAQ        — 10-question accordion + FAQPage schema
contact.html    Contact    — high-conversion form, side panel, trust signals
assets/css/styles.css   Design system (tokens, components, responsive, motion)
assets/js/main.js       Header, mobile nav, scroll reveal, accordion, counters, form
robots.txt · sitemap.xml · site.webmanifest   SEO / PWA
```

## 5. Logo note

The supplied logo's "plan with" wordmark is *ivory*, so it disappears on light
backgrounds. To preserve the identity without breaking it, the nav/footer use an
**adaptive CSS wordmark** (`.wordmark`) that re-colours per surface — "plan with"
in the current text colour, a blue/yellow **y** with the confetti accent. The PNG
is kept as favicon / OG image (`assets/img/planwithy-logo.png`).
➜ When you have a portrait of Yashitha, drop it at `assets/img/yashitha.jpg` and
replace the placeholder block in the homepage "Who we are" section.

## 6. Going live — 3 things to wire up

1. **Domain:** all canonical/OG URLs use `https://planwithy.com` — find & replace
   if your domain differs.
2. **Contact form:** `contact.html` is pre-wired for **Formspree**
   (`action="https://formspree.io/f/your-form-id"`). Replace `your-form-id` with
   your real endpoint, or use Netlify Forms (add `netlify` to the `<form>` tag).
   Until then, the form shows a friendly success state client-side.
3. **Real details:** swap the placeholder `hello@planwithy.com`, phone/WhatsApp,
   city, and the Instagram / LinkedIn / Behance links (search those strings).

## 7. Run locally

```bash
npx serve .            # any static server works
# or just double-click index.html
```

## 8. What's built in

- Responsive, mobile-first (tested 375 → 1440px)
- Accessible: skip links, ARIA on nav/accordion/form, focus-visible, reduced-motion
- SEO: per-page titles/descriptions, Open Graph + Twitter cards, canonical,
  JSON-LD (ProfessionalService, Person, OfferCatalog, FAQPage, ContactPage),
  sitemap + robots
- Tasteful motion: scroll reveals, staggered cards, counters, hover micro-interactions
  — all disabled under `prefers-reduced-motion`
- No dependencies, no build, near-instant load
