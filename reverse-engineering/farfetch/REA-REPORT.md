# REA Report — FARFETCH Nigeria (farfetch.com/ng)

**Target:** https://www.farfetch.com/ng/
**Method:** REA (Reverse Engineer Anything) workflow — morluto/rea v6.7.0
**Date:** 2026-10-20
**Goal:** Understand FARFETCH NG's information architecture, component inventory, design tokens and interaction patterns closely enough to reconstruct a matching UI/UX on the AkpakaNG storefront.

## Method & tooling

- `rea-agents@6.7.0` installed globally from npm (`npx rea-agents` → `rea` CLI, v6.7.0 confirmed via `rea --help`).
- `rea doctor` / `rea capabilities` audited: the sandbox has no Chromium, no Ghidra/Hopper/JADX engines, and — critically — **no outbound network access to farfetch.com** (only github.com, npmjs, pypi are reachable). REA's live browser-capture commands (`inspect-web-page`, `capture-web-screenshot`, `capture-browser-scenario`, `analyze-web-bundle`) therefore cannot run against the live target from this environment.
- Page evidence was instead captured by passive retrieval of the rendered pages (homepage, womenswear PLP, menswear PLP, Gucci PDP) and archived verbatim under `evidence/`. All conclusions below cite that evidence.
- Static JS/bundle analysis (`export-web-scripts`, `analyze-javascript-application`) was not possible for the same network reason; front-end behavior was inferred from rendered structure and established FARFETCH patterns.

**Limitation (recorded, per REA's evidence discipline):** no live DOM/network capture was possible. Findings describe the rendered page structure, not internal API contracts. FARFETCH's private JSON/GraphQL endpoints are intentionally not probed.

## 1. Information architecture

```
farfetch.com/ng/
├── Promo bar (app download / seasonal offer)
├── Header: [☰] FARFETCH · New In Women Men Kids Accessories Beauty Home Sale · 🔍 👤 🛍
├── Mega menu (per department): category columns + image tiles
├── Homepage
│   ├── Hero carousel (campaign imagery, auto-rotating)
│   ├── Choose a department — 3 tiles (Womenswear / Menswear / Kidswear)
│   ├── Per-department category grids (4 × 3:4 tiles)
│   ├── Editorial carousel (campaign: image + headline + copy + Shop Now)
│   ├── "New in" product carousel (badges: New Season)
│   ├── Sale carousel (badges: Special Offer, Pre-Owned; original/final price, -15%)
│   ├── Trending now — chip row
│   ├── Editorial section (theme + 4 products + Shop Now)
│   ├── Brands of the moment — text links
│   ├── Newsletter — "Never miss a thing"
│   └── Footer help strip (How to shop / FAQs / Need help? + phones)
├── PLP (/shopping/{department}/items.aspx)
│   ├── Breadcrumbs, title, result count
│   ├── Filter rail (category, brand, price, size, color) + Sort dropdown
│   └── 4-col product grid → pagination
└── PDP (/shopping/{dept}/{brand}-{name}-item-{id}.aspx)
    ├── Gallery (counter "Image n of m", thumbnails)
    ├── Badge → Brand link + lowercase name → price
    ├── App-only code strip · variant line · Add To Bag · estimated delivery
    ├── "Also available in" cross-sell
    ├── The Details accordion (highlights, measurements, composition, origin, IDs)
    ├── Delivery, Returns & Seller
    ├── Why FARFETCH? trust block
    └── Newsletter
```

## 2. Component inventory

| Component | Evidence | Notes |
|---|---|---|
| PromoBar | homepage, PLP, PDP | single rotating message, slim |
| Header | all pages | wordmark left, department nav center, icon actions right; sticky |
| MegaMenu | header hover | full-width panel, category columns + tiles |
| HeroCarousel | homepage | full-bleed campaign slides |
| DepartmentTiles | homepage | "Choose a department", 3 × 16:9 |
| CategoryTiles | homepage | 4 × 3:4 per department |
| EditorialCarousel | homepage/PLP/PDP-adjacent | side-image format "3x4_messaging-side" |
| ProductCarousel | "New in", sale, editorial | arrows, 4-5 visible, "Shop Now" footer |
| ProductCard | everywhere | 3:4 image, badge stack, brand (uppercase), name (lowercase), price; hover quick-add |
| SalePriceBlock | sale carousel | Original price (strike) → Final price → Promo discount -N% |
| TrendingChips | homepage/PLP | horizontal scroll chips |
| BrandStrip | homepage/PLP | "Brands of the moment" text links |
| Newsletter | homepage/PLP/PDP | "Never miss a thing", email + Sign Up, consent copy |
| FooterHelpStrip | all pages | How to shop / FAQs / Need help? + phone grid |
| FilterRail | PLP | checkbox groups with counts |
| SortDropdown | PLP | Featured/Newest/Price/Discount |
| GalleryPDP | PDP | main + thumbs + counter |
| DetailsAccordion | PDP | Highlights / measurements / composition / origin / IDs |
| TrustBlock | PDP | "Why FARFETCH?" 4-column |

## 3. Design tokens (observed)

- **Color:** pure white background; near-black text (#000/#111); secondary text gray (~#666); hairline borders #e5e5e5; fill #f5f5f5. Monochrome only — no accent hue on the storefront chrome.
- **Typography:** single grotesque sans; headlines tight-tracked (-0.03em…-0.05em), heavy weight; micro-labels uppercase, 10–11px, tracking ~0.18em; product names lowercase sentence case.
- **Radii:** fully-rounded pills for CTAs; near-zero radius on tiles/cards.
- **Imagery:** product 3:4 (480/936px), editorial 16:9 and 3:4 messaging-side, suggestions 180px, thumbs 300px, heroes 1000px.
- **Spacing:** generous whitespace, hairline dividers, max content width ~1680px.

## 4. Interaction patterns

1. Sticky slim header; department hover opens mega menu.
2. Carousels: edge arrows, snap scroll, count-agnostic.
3. Product card hover: image swap/zoom + quick-add (+) and save (♥) appear.
4. PDP: size grid must be selected before Add To Bag enables; delivery estimate adjacent to CTA.
5. Drawers: bag slides from right; search opens full overlay with popular-search chips.
6. Newsletter inline on every major page (homepage, PLP, PDP).

## 5. Data model (product card)

```
{ badge: "New Season" | "Special Offer" | "Pre-Owned" | "Runway",
  brand: string (uppercase, links to brand landing),
  name: string (lowercase),
  price: number,            // display currency-prefixed
  originalPrice?: number,   // sale only, strikethrough
  discount?: "-15%",        // sale only
  image: url(3:4) }
```

## 6. Promo mechanics

- App install: "10% off your first app order", app-only code **NC10FF** shown on PDP.
- Pre-owned programme: 15% off, original→final price display.
- Category-targeted promo bar ("Enjoy 15% off selected pre-owned styles" on PLPs).
- Estimated delivery window on PDP ("Oct 26 - Oct 29").

## 7. Reconstruction plan (AkpakaNG)

Map FARFETCH patterns onto Akpaka's existing Next.js + Zustand storefront:

| FARFETCH | AkpakaNG adaptation |
|---|---|
| Departments Women/Men/Kids | Women / Men / Bespoke atelier tiles |
| Brand landing pages | Collections (Oxford, Loafer, Boot, Wedding) |
| New in carousel | "New in: fresh from the bench" — featured products, NEW SEASON badge |
| Pre-owned sale carousel | "Atelier samples — 15% off" — original→final price, SPECIAL OFFER badge |
| Why FARFETCH? | "Why Akpaka" — authenticity, lifetime resoling, 14-day returns, WhatsApp fitting |
| FARFETCH ID | Akpaka ID (product id) |
| Made in Italy | Made in Port Harcourt, Nigeria |
| $ pricing | ₦ pricing |

Files rebuilt: `Navbar` (promo bar + mega menu), `ProductCard`, `ProductCarousel`, `MegaMenu`, `HomePage`, `CollectionsPage` (PLP), `ProductDetailPage`, `CartDrawer` (bag), `Footer`, `globals.css` tokens, store additions (department filter, wishlist).

## 8. Evidence index

- `evidence/homepage-ng.md` — homepage structure, department/category taxonomy, CDN patterns
- `evidence/womenswear-listing.md` — PLP structure, card anatomy, sale pricing display
- `evidence/menswear-listing.md` — badge vocabulary (New Season / Special Offer / Pre-Owned / Runway)
- `evidence/product-detail.md` — PDP anatomy, The Details accordion, Why FARFETCH block, app-code strip
