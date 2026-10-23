# FARFETCH Nigeria — Homepage capture

Source: https://www.farfetch.com/ng/
Captured: 2026-10-20 (passive page retrieval; REA live CDP capture unavailable in sandbox — see REA-REPORT.md §Method)

## Observed structure (top → bottom)

1. **Utility strip** — "Download the app to get 10% off your first app order" (promo bar, topmost)
2. **Skip link** — "Skip to main content" (accessibility)
3. **Department selector** — "Choose a department"
   - WOMENSWEAR / MENSWEAR / KIDSWEAR — three large image tiles (16:9, 480px wide assets from cms-ccloud CDN)
4. **Womenswear category grid** — 4 tiles (3:4): New In, Clothing, Bags, Shoes
5. **Menswear category grid** — 4 tiles (3:4): New In, Clothing, Accessories, Shoes
6. **Kidswear category grid** — 4 tiles (3:4): Boys, Girls, Baby Boys, Baby Girls
7. **Editorial carousel** — e.g. "Ski season" campaign: side image (3:4 messaging-side), headline, supporting copy ("Prepare for the slopes — and the après — with Fusalp, Moon Boot, Goldbergh and more"), "Shop Now" CTA
8. **"New in: handpicked daily from the world's best brands and boutiques"** — product carousel
   - Card anatomy: badge ("New Season") → brand (uppercase) → product name (lowercase sentence case) → price ($392)
   - Footer link: "Shop Now"
9. **"15% off pre-owned"** — sale carousel
   - Card anatomy: badges ("Special Offer", "Pre-Owned") → brand → name → "Original price $521" (strikethrough) → "Final price $443" → "Promo discount -15%"
10. **"Trending now"** — horizontal chip row: "Gifts with personality", "Small luxuries", "Best of boots", "Dolce&Gabbana"
11. **Editorial section** — "Modern folklore" with product cards + "Shop Now"
12. **"Brands of the moment"** — text link row: Maje, Sandro, Golden Goose
13. **Newsletter** — "Never miss a thing" / "Sign up for promotions, tailored new arrivals, stock updates and more – straight to your inbox" / "Get updates by [Email] [Sign Up]" / consent copy linking Privacy Policy, SMS STOP keywords
14. **Footer help strip** — "How to shop" (Your guide to shopping and placing orders), "FAQs" (Your questions answered), "Need help?" (Contact our global Customer Service team) + phone numbers (8690402, 7565616, 5899520, 6264710, 7955326)

## Asset/CDN observations
- Static assets: cdn-static.farfetch-contents.com (cms-ccloud CAAS media service, `caas/v1/media/{id}/data/{hash}/{ratio}_{variant}/{width}/{filename}`)
- Product images: cdn-images.farfetch-contents.com (`/{id segments}/{itemId}_{imageId}_{size}.jpg`, sizes 1000/300/180)

## Taxonomy observed
- Departments: Women, Men, Kids
- Women categories: New In, Clothing, Bags, Shoes
- Men categories: New In, Clothing, Accessories, Shoes
- Kids categories: Boys, Girls, Baby Boys, Baby Girls
- Sets (editorial collections): /ng/sets/women/new-in-this-week-eu-women.aspx, activewear-ski-and-snowboard, modern-folklore, gifts-with-personality, small-gifting, new-season-boots
- Brand landing pages: /shopping/women/designer-maje/items.aspx
