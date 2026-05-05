# Source Content Extraction — gogreendrycleaners.net

**Extracted:** 2026-05-05
**Method:** WebFetch against the live site (direct curl/Invoke-WebRequest blocked by 403 — likely Sucuri/Cloudflare bot protection).
**Source CMS:** WordPress + Elementor (with ElementsKit, WP Popups plugins).

---

## Status of this file

**Round 2 update:** User reviewed round 1 and gave answers (see "Decisions locked in" below). I went back and dug deeper. New findings:

- **Hero video URL recovered.**
- **Brand color palette extracted from the live CSS.**
- **Testimonial widget is confirmed present on the homepage** but its text content is NOT retrievable through any WebFetch / WP REST API path I have access to. Same for the founder bio popups. I've documented exactly why below.

Open items I still need from you are at the bottom of this section.

---

## Decisions locked in (from round 1)

| # | Decision | Status |
|---|---|---|
| 1 | Testimonials | User confirmed they exist on home → I need them pasted in (see "Open items" below) |
| 2 | Hero video | Confirmed — URL extracted: `gogreen-video-placeholder-1.mp4` |
| 3 | Pricing | OMIT |
| 4 | Store hours | Per-store, scrape from each Google Maps link — I'll do this in Phase 1 prep |
| 5 | Founder bios | "Read More" buttons open popup modals containing full bios — I cannot extract popup content via REST (see below) → I need them from you |
| 6 | Delray Beach address | **8918** W Atlantic Ave |
| 7 | Norwalk CT | Both locations confirmed real (Glover Ave + Wilson Ave) |
| 8 | Boilerplate copy | Rewrite for SEO-positive premium feel |
| 9 | FAQ | Expand by mining blog content |
| 10 | Blog migration | All 35 posts |
| 11 | Brand color | Use the existing site's palette — extracted below |
| 12 | Brand name | **GoGreen Dry Cleaners™** (one word, with ™ — matches every page on the live site) |

---

## Brand color palette (extracted from `/wp-content/uploads/elementor/css/post-2985.css`)

| Role | Hex | Notes |
|---|---|---|
| **Primary accent (brand green)** | `#48B11A` | Vivid leaf/lime green — the signature "Go Green" color. Use for CTAs, icons, section labels, hover states, underline animations |
| **Accent — light tint** | `#C8E3D0` | Pale mint, used for soft backgrounds and tinted icon badges |
| **Accent — dark variant** | `#3A8E15` (computed from `#48B11A`) | For hover/active states on accent buttons |
| **Dark surface** | `#1E1E1E` | Near-black for the dark sections (stats bar, footer, lead capture) |
| **Text — primary** | `#222222` | Body text on light backgrounds |
| **Text — secondary** | `#7A7A7A` | Muted gray for paragraphs/captions |
| **Text — tertiary** | `#AAAAAA` | Lightest gray, decorative |
| **White** | `#FFFFFF` | Card backgrounds, light surfaces |
| **Hero overlay** | `rgba(0,0,0,0.35)` → `rgba(0,0,0,0.55)` | Existing site uses `rgba(0,0,0,0.35)` — matches the design-system spec exactly |

**Source typography (NOT carrying over).** The live site uses `wavehaus`, `wavehaus-bold`, and `PT Sans`. We're overriding per the brief: Playfair Display (headings), Inter (body), Cormorant Garamond italic (accent flourish).

**Token mapping for the new build:**
```css
--color-bg: #faf9f7;            /* warm off-white per brief */
--color-warm-1: #f3efe9;        /* alternating section bg */
--color-warm-2: #ebe6dd;        /* slightly deeper */
--color-dark: #1E1E1E;          /* matches source */
--color-accent: #48B11A;        /* source primary */
--color-accent-light: #C8E3D0;  /* source pale mint */
--color-accent-dark: #3A8E15;   /* derived */
--color-text: #222222;          /* matches source */
--color-text-secondary: #7A7A7A;/* matches source */
--transition-premium: 0.5s cubic-bezier(0.22, 1, 0.36, 1);
```

---

## Hero video (homepage)

- **URL:** `https://gogreendrycleaners.net/wp-content/uploads/2025/04/gogreen-video-placeholder-1.mp4`
- **Filename suggests it's a placeholder** — worth confirming with the user whether they have a final/branded video to swap in, or to download this one and use it as the hero loop.
- I'll download it during media prep (~1 file, MP4).

---

## Why I can't extract the homepage testimonials or founder popups

I want to be transparent about what's happening:

1. The homepage's WP REST API `content.rendered` field (page ID 2985) contains only 4 Elementor widgets at the data layer: `wpr-advanced-slider` (hero), `heading`, `text-editor`, `icon-list`. That's everything stored on the page itself.

2. **However**, the page's compiled CSS (`post-2985.css`) contains `--ekit_testimonial_left_right_spacing` and `--ekit_testimonial_slidetoshow` variables, plus `--ekit_client_logo_*` variables. These CSS variables only get emitted when the corresponding ElementsKit widget is rendered on the page. **So the testimonials slider AND a client logo carousel ARE definitely on the home page** — they're being injected via either an Elementor "Saved Section" reference or a theme-level template part that's pulled in at render time but not stored in this page's content.

3. The actual quote text is in the database (probably in an `elementor_library` saved-section post), but `/wp-json/wp/v2/elementor_library` returns 401 (auth required) and `/wp-json/wp/v2/wppopups-templates` returns `[]` (empty list — likely auth-gated too).

4. WebFetch's underlying summarizer truncates the live HTML page before reaching the testimonial section, so I can't extract them from the rendered front-end either.

5. **What would unblock me:** any one of these:
   - You paste 3–6 of the testimonials directly (quote + author name + city, maybe star rating)
   - You give me admin/editor credentials so I can hit the Elementor Library REST endpoint (probably overkill)
   - You take a screenshot of the testimonial section and the founder popups, and I'll OCR/transcribe

The same situation applies to the **founder popups** for Michael Koppy and Igor Madrit — the popup content is stored as a WP Popups template that returns empty in the public REST API.

---

## Homepage testimonials (received 2026-05-05, verbatim)

**Section heading:** What Our Clients Are Saying

**Intro:** See what your neighbors are saying about GoGreen Dry Cleaners™. Read testimonials from satisfied customers who trust us with their garment care needs.

*(14 unique testimonials. The user pasted the slider state which repeats — duplicates removed. Star rating not preserved in paste — will display 5 stars for all. Names trailing-space artifacts cleaned.)*

| # | Author | Location | Quote |
|---|---|---|---|
| 1 | Melanie L | — | "I love this place! Best customer service, prices, and cleaning. Can't wait to use their service again." |
| 2 | Doreen L | — | "Very professional and reliable. Family owned business. Great dry cleaning without the toxic odors." |
| 3 | Chris D (Chris DeVaughn) | West Palm Beach, FL | "Visited gogreen dry cleaners for the 1st time as it's just under my building in West Palm Beach and the staff was extremely courteous. They also pick up and deliver for free if you live downtown. High rec, from a service and convenience fee perspective." |
| 4 | Antonio S | — | "We are very happy and satisfied with our first experience at go green dry cleaners. We came Thursday afternoon with a lot of clothes to dry clean and we needed it by Monday for our trip. The lady at the front told us, she can put a rush and but can't promised it will be done by Saturday, but for sure Monday. We got all our stuff Saturday and they look amazing. Thank you go green." |
| 5 | Natalia A | — | "I'm a regular customer of GoGreen Dry Cleaners™ and so far I'm impressed with their service. From the moment I walked in, the Front Clerk Dania, was friendly and attentive. She always takes the time to understand my specific cleaning needs and assured me that my clothes would be well taken care of. I also appreciate their eco-friendly cleaning options, which are a big plus for me." |
| 6 | Neil O | — | "Mike and his staff at GoGreen are great. They helped me replace a zipper on a jacket that I thought wouldn't be able to be replaced. Additionally, I needed a suit cleaned and repaired in a pinch, and they were able to kindly expedite it with my request and I was able to get it back in a very timely manner. I highly recommend this place for all of your Dry Cleaning needs!" |
| 7 | Tyler M | West Palm Beach, FL (implied) | "Can't speak highly enough of the professionalism and outstanding customer service that Mike and team at GoGreen provide. This should certainly be your number one pick when choosing a dry cleaner in the West Palm Beach area. I was in a pinch right before New Year's. To no one's fault but my own, I waited until the last minute to pick up my dry cleaning and they were closed until after the holiday. Mike and team went well out of their way to hand deliver my tux. Thanks again GoGreen!" |
| 8 | Justin D | — | "Professional and timely. Nick was very helpful." |
| 9 | Marlo S | — | "Great experience and super fast!" |
| 10 | Matthew P | — | "I had a great experience at GoGreen. I worked with Mike who went above and beyond. I had a wedding that I traveled for so I needed a 24 hour turnaround to press my clothes and he delivered. They also were able to deliver it right to the hotel we are staying at. Mike was a huge help and even called to let me know I left my bow tie in my jacket. A great and friendly dry cleaner that I recommend." |
| 11 | Luca C | Wellington, FL (implied) | "Awesome experience from start to finish! I found GoGreen Dry Cleaners™ of Wellington when I looked up dry cleaners in Wellington for my duvet and cover. I was offered a new neighbor discount when I called for pricing, which I appreciated! Drop-off was easy and fast, and the team was very friendly. I received status updates on my drop-off via text, including when it was ready for pick-up. I learned that this is a family-owned and operated business and members of the Wellington Chamber of Commerce. I love supporting local small businesses and highly recommend supporting this small biz for your dry cleaning needs!" |
| 12 | Erika G | — | "When my zipper popped the day before my event, Rudy was so gracious to look at my garment and offer his professional advice! Crisis averted! Thank you Rudy!" |
| 13 | Chris G | — | "Very nice place! Customer service is top notch! The pickup and user experience is very streamlined and efficient. 10/10." |
| 14 | Darlene P | — | "Very friendly, great customer service. My clothes always come back fresh and clean. I highly recommend GoGreen Dry Cleaners™" |

### Editorial fixes applied (locked in by user)

- **#10 (Matthew P)** — bow-tie complaint sentence dropped. The rest kept verbatim with light cleanup ("Go Green" → "GoGreen" in body text for brand consistency).
- **#7 (Tyler M)** — "you number one pick" → "your number one pick"; "New Years" → "New Year's".
- **#12 (Erika G)** — "adverted" → "averted".
- **#3 (Chris D)** — trailing self-attribution `-Chris DeVaughn` stripped from quote; byline displays as "Chris D / West Palm Beach, FL".
- **#4 (Antonio S)** kept verbatim — felt borderline for editorial intervention. Tell me if you want a readability pass.
- Intro uses **"GoGreen Dry Cleaners™"** per decision #12.

### Display: 14-card swiping carousel (locked in)

Per user direction: keep all 14 testimonials in a Swiper carousel — 3 visible at a time on desktop, 1 at a time on mobile, auto-advance every 6s with manual nav arrows + dot indicators. Matches the source site's slider behavior.

---

## Open items — all resolved

- [x] **Testimonials** — 14 captured, edits applied, carousel layout locked.
- [x] **Founder bios** — full bios provided (see About page section above).
- [x] **Hero video** — keep `gogreen-video-placeholder-1.mp4`.
- [x] **Logo file** — use `Logo-with-TM-2.svg` (the ™ version).
- [x] **Aggregate review rating** — user supplied per-store data 2026-05-05. Weighted average: **4.3 ★ across 527 Google reviews** (15 of 19 stores; Wellington pending, Brewster has no business profile, Boca/Boynton are van-route only). Per-store breakdown stored in `content/locations.json` during Phase 1. Display copy choice still pending (A/B/C — see chat).

### Per-store Google Maps short-links (captured for Phase 1 use)
| Store | Maps URL |
|---|---|
| Boca Raton | (van route only) |
| Boynton Beach | (van route only) |
| Delray Beach | https://maps.app.goo.gl/uVhgmcJpvgMuiQqS8 |
| Jupiter | https://maps.app.goo.gl/Q8BX94yts6EiEyw26 |
| Miami | https://maps.app.goo.gl/uTZnSHW2kDhnWdpo6 |
| Palm Beach | https://maps.app.goo.gl/vxgPnLDgEZnvyKL57 |
| Palm Beach Gardens | https://maps.app.goo.gl/XrCHktCEfaNnetUr5 |
| Riviera Beach | https://maps.app.goo.gl/B2PnYEBerzAYxZc56 |
| Westlake | https://maps.app.goo.gl/WKvdQ7myPdHa5xYA7 |
| West Palm Beach | https://maps.app.goo.gl/PLFZD6gTYufTcvef7 |
| Wellington | https://maps.app.goo.gl/WKvdQ7myPdHa5xYA7 *(same URL as Westlake — likely a typo on the live site, please confirm)* |
| Brewster | https://maps.app.goo.gl/vfM3p6VS6Jw7BFuR8 *(redirect target is the address only, not a business profile — Brewster may not have a Google Business listing)* |
| Cortlandt Manor | https://maps.app.goo.gl/YsdzvsqCkSLaoLN3A |
| Larchmont | https://maps.app.goo.gl/dvt7F3qTqbdQjN6u5 |
| Pelham | https://maps.app.goo.gl/nVakT9HFR2zpYQcN8 |
| Harbor Point | https://maps.app.goo.gl/8Y3GnUYasMbyyfMx6 |
| Norwalk (Glover) | https://maps.app.goo.gl/kVGibgk5eAPNCwZa8 |
| Norwalk (Wilson) | https://maps.app.goo.gl/RQprQCtanWVWqDhT9 |
| Stamford | https://maps.app.goo.gl/EADesbA2bF7ZHru39 |

---

## Page list (canonical, from sitemap)

| Slug | Purpose | Will rebuild? |
|---|---|---|
| `/` | Home | yes |
| `/about-us/` | About + team + sustainability | yes |
| `/dry-cleaning-restoration/` | Services overview | yes |
| `/wholesale-solutions/` | B2B / wholesale landing | yes |
| `/find-a-location/` | Locations index | yes |
| `/contact-us/` | Contact form + addresses | yes |
| `/request-a-service/` | Pickup-scheduling form | yes — likely fold into Contact |
| `/request-a-quote/` | Quote form (B2B) | yes — likely fold into Wholesale |
| `/resources/` | Empty hub page (just links) | drop, redundant with footer |
| `/resources-faq/` | FAQ | yes |
| `/blog/` | Blog index + 35 posts | yes |
| `/comming-soon/` | "Franchise Opportunity" stub | scaffold as placeholder |
| `/home-temp/`, `/home-1/` | Old staging pages | skip |

---

## Page 1 — Home (`/`)

**Purpose:** Hero landing → push to Contact + service overview.
**Reality check:** Sparse content as noted in flag #1. Use this as the seed; we'll need to repurpose content from inner pages to fill the design-system sections.

### Headings (in order)
- H1: Eco-Friendly Dry Cleaning, Alterations & Delivery Service
- H3: Dry Cleaning Experts
- H2: About Us
- H3: Your Neighborhood Dry Cleaner

### Body copy (verbatim)

> At GoGreen Dry Cleaners™, we're more than just a dry cleaning service—we're a part of your neighborhood. Our locally owned and operated locations are dedicated to providing high-quality garment care with sustainability at the forefront.

### Service tags shown on home
- Eco-Friendly Dry Cleaning
- Garment Restoration
- Dry Cleaning & Restoration
- Wholesale Solutions
- Franchise Opportunity

### CTAs
- **Schedule Complimentary Concierge Pick Up** → `/contact-us/`
- **Contact Us** → `/contact-us/`

### Images on home
- `https://gogreendrycleaners.net/wp-content/uploads/2025/03/Mask-group.svg` — site logo (decorative)

### Testimonials, video, stats
None present.

---

## Page 2 — About (`/about-us/`)

### Headings (in order)
- H1: Your Trusted Eco-Friendly Dry Cleaning & Alteration Shop
- H2: Our Story
- H3: Milestones that Shaped Us
- H2: Our Founders
- H3: Visionaries with a Passion for Craft and Community
- H2: Leadership Team
- H3: The People Behind the Quality and Care
- H2: Strategic Partnerships & Community Support
- H3: Aligned in Purpose. Stronger Together.
- H2: Sustainability Commitment
- H3: Caring for Your Clothes and the Planet

### Body copy (verbatim)

**Story:**

> Backed by over 50 years of combined industry experience, our team delivers luxury garment care with an eco-conscious approach.

> Since its incorporation in New York in 2010, GoGreen Dry Cleaners™ has steadily expanded its footprint while staying true to its mission of sustainable, high-quality garment care. After establishing itself as the largest eco-friendly dry-cleaning group in Lower Westchester and Southern Connecticut, the company expanded into Florida in 2017, launching locations in Jupiter, West Palm Beach, Palm Beach, and Miami. GoGreen further solidified its commitment to sustainability by adopting GreenEarth Cleaning™ technology, a non-toxic, environmentally safe alternative to traditional dry-cleaning solvents. To meet the evolving needs of its upscale clientele, the company introduced complimentary pickup and delivery services, combining convenience with eco-conscious care.

**Founders intro:**

> GoGreen Dry Cleaners™ was founded by two industry leaders who combined decades of experience with a shared mission: to redefine garment care through eco-conscious innovation, elevated service, and local connection.

**Leadership intro:**

> Our leadership team is united by a shared commitment to excellence, sustainability, and delivering a refined experience for every client we serve.

**Partnerships:**

> We proudly collaborate with like-minded organizations and support causes that reflect our values—sustainability, service, and community.

**Sustainability:**

> At GoGreen Dry Cleaners™, sustainability isn't just a buzzword, it's part of who we are.

### Founders (verbatim bios)

**Michael Koppy — Co-Founder & Partner / Florida Market**
> Michael Koppy is a seasoned entrepreneur and business strategist with over 20 years of experience leading growth and operations across multiple industries. Formerly Executive Vice President and Senior Partner at Financial Recovery Strategies, Michael Koppy played a key role in helping Fortune 500 clients recover over $100 million in settlements through data-driven, client-focused solutions.
>
> Now as Co-Founder and CEO of GoGreen Dry Cleaners™, Michael Koppy brings that same strategic vision to the eco-conscious garment care space—elevating the brand as a premium, sustainability-driven service for high-end clientele. His leadership continues to drive GoGreen Dry Cleaners™ expansion while maintaining a strong commitment to quality, community, and innovation.
>
> Michael Koppy also serves on the Executive Board of Directors for Tafer Hospitality & ResortCom.

**Igor Madrit — Co-Founder / Partner / New York and Connecticut Market**
> Igor Madrit is a seasoned industry expert with more than 25 years of experience in high-end garment care and operational leadership. As a founding partner of GoGreen Dry Cleaners™, Igor has played a central role in building the company's reputation for quality, integrity, and sustainable innovation.
>
> In addition to overseeing day-to-day operations, Igor leads GoGreen Dry Cleaners™ restoration division, providing specialized services for garments affected by fire, water, and mold. His commitment to precision, care, and client satisfaction continues to shape the brand's elevated service experience and long-standing customer trust.

### Leadership team (verbatim bios)

**Paige Koppy — Chief Operating Officer**
> Paige Koppy is the Chief Operating Officer of GoGreen Dry Cleaners™, where she leads day-to-day operations, team performance, and service excellence across all locations. With a background as a high-level executive assistant and strategic operations lead, Paige brings a unique blend of precision, foresight, and leadership to the organization. She was instrumental in launching GoGreen's Florida expansion and establishing the operational systems. Her commitment to quality, consistency, and team culture has been key in positioning GoGreen as a trusted, upscale brand in eco-friendly garment care.

**Kevin Van Rensburg — Vice President of Operations**
> Originally from South Africa, Kevin Van Rensburg brings a world-class hospitality background and an unwavering commitment to excellence to his role as Vice President of Operations at GoGreen Dry Cleaners™. With leadership experience in luxury service environments—including Nobu, Cape Town, and prestigious country clubs across Florida—Kevin has a sharp eye for quality and guest experience. Since the launch of GoGreen Dry Cleaners™ in Florida, Kevin has played a pivotal role in shaping the company's operational standards and customer-centric culture. He oversees quality control across all locations, ensuring every service reflects the brand's elevated standards. His influence has been instrumental in GoGreen Dry Cleaners™ success and continued growth.

**Jeff Connors — Director of Technical Operations**
> Jeff Connors brings over 36 years of leadership in operations, equipment management, and multi-site service strategy to his Director of Technical Operations role at GoGreen Dry Cleaners™. Before joining GoGreen, Jeff served as Vice President of Operations at Mr. Sparkle Car Wash, where he helped grow the company from four to fourteen locations and earned a reputation as a hands-on, highly respected leader known for his deep technical expertise and unwavering work ethic. At GoGreen, Jeff oversees the performance and maintenance of all machinery and equipment across locations, leading with a proactive approach to problem-solving and system optimization. His attention to detail, fairness, and commitment to doing the job right continue to elevate GoGreen's operations and set a high standard for quality and reliability.

**Petra Koppy — Chief Puppy Officer / Mascot**
> Petra Koppy may not handle garments, but she's an essential part of the GoGreen family. As our official morale booster, greeter, and four-legged mascot, Petra brings warmth, loyalty, and tail-wagging charm to every team meeting and storefront visit. Whether she's lounging near the front desk or making surprise cameos on delivery days, Petra reminds us that the best service starts with heart.

### Sustainability bullet list (verbatim)
- Eco-friendly cleaning solutions (zero-VOC, biodegradable solvents)
- Water conservation practices

*(That's the full list — flagged short. We'll likely expand from the services + blog content in Phase 1.)*

### Strategic partnership / client logos
Brightline, Loews Hotel ("blt.png"), "loginLogo", Greystar, Greater Palm Beach County (chamber), Hilton Stamford, Hyatt, Lincoln (likely Lincoln Center or Lincoln Property), Marriott, Two unnamed "Unknown.png" / "Unknown-1.png" logos, PB Chamber, Spinnaker, Palm Beach Dramaworks. **Worth confirming each is still an active partner before publishing logos on the new site.**

### Stats / facts on this page
- Founded **2010** in New York
- Florida expansion **2017** (Jupiter, West Palm Beach, Palm Beach, Miami)
- **50+ years** combined industry experience
- Largest eco-friendly dry-cleaning group in Lower Westchester and Southern Connecticut
- Uses **GreenEarth Cleaning™** technology (non-toxic, silicone-based solvent)

### Images on About
| URL | Likely use |
|---|---|
| `/2025/03/Mask-group.svg` | logo |
| `/2025/04/Rectangle-182.png` | hero/decorative |
| `/2025/04/ce511387a3a3c341b168e45464f42bfa-1.png` | decorative |
| `/2025/05/IMG_9071-scaled.jpg` | likely real storefront/team photo |
| `/2025/04/image-25.png` | section image |
| `/2025/04/75.jpeg` | team/storefront photo |
| `/2025/04/710663BE-F4B1-47C5-9D28-104D0BC6E5F8.jpeg` | team/storefront photo |
| `/2025/04/39.jpeg` | team/storefront photo |
| `/2025/04/GG-PICS.png` | likely a photo collage |
| `/2025/05/Brightline_Logo.svg.png` | partner logo |
| `/2025/05/blt.png` | partner logo |
| `/2025/05/loginLogo.png` | partner logo |
| `/2025/05/greystar.png` | partner logo |
| `/2025/05/GreaterPalmBeachCounty.png` | partner logo |
| `/2025/05/hilton-stamford.png` | partner logo |
| `/2025/05/hyatt.png` | partner logo |
| `/2025/05/lincoln.png` | partner logo |
| `/2025/05/marriott.jpg` | partner logo |
| `/2025/05/Unknown-1.png`, `/2025/05/Unknown.png` | unidentified logos — confirm |
| `/2025/05/pbchamber-logo.png` | partner logo |
| `/2025/03/image-18.svg` | decorative |
| `/2025/05/spinnaker.jpg` | partner logo |
| `/2025/12/palm_beach_dramaworks_logo.jpg` | partner logo |
| `/2025/03/image-42.png` | decorative |

(All URLs prefixed with `https://gogreendrycleaners.net/wp-content/uploads`.)

### CTAs
- **Read More...** (Michael Koppy) → broken (`http://Michael-Koppy`)
- **Read More...** (Igor Madrit) → broken (`http://Igor-Madrit-Show-POP-UP`)
- **Contact Us** → `/contact-us/`

---

## Page 3 — Services / Dry Cleaning & Restoration (`/dry-cleaning-restoration/`)

This is the catalog page. Best-sourced page on the site — directly maps to the design-system "Services grid + detail pages".

### Headings (in order)
- H1: Expert Restoration Dry Cleaning & Garment Repair Services
- H2: Eco-Friendly. Convenient. Trusted by Your Community.
- H2: Dry Cleaning Services / H3: Eco-Friendly Dry Cleaning
- H2: Wet Cleaning / H3: Professional Wet Cleaning
- H2: Alterations & Expert Tailoring / H3: Precision Alterations and Tailoring
- H2: Restoration / H3: Comprehensive Garment Restoration
- H2: Household Item Cleaning / H3: Household Fabrics & Specialty Cleaning
- H2: Bridal Gown Preservation / H3: Wedding Gown Care & Preservation
- H2: Free Pickup & Delivery / H3: Convenient Pickup & Delivery
- H2: Our Nearest Location

### Body copy (verbatim, per service)

**Eco-Friendly Dry Cleaning** — "Our non-toxic, zero-VOC process uses liquid silicone for safe, effective cleaning."

**Wet Cleaning** — "Ideal for delicate fabrics, this method uses water and specialized detergents with precise control to protect fabric texture and quality."

**Alterations & Tailoring** — "From simple hems to custom adjustments, our skilled tailors ensure your garments fit perfectly."

**Restoration** — "We specialize in restoring garments and textiles affected by fire, mold, and water damage, bringing them back to life with expert care."

**Household Item Cleaning** — "Beyond clothing, we offer expert cleaning services for a variety of household textiles."

**Bridal Gown Preservation** — "Preserve the beauty of your wedding gown with our meticulous cleaning and long-term preservation services."

**Free Pickup & Delivery** — "Enjoy the convenience of our complimentary pickup and delivery service. Simply schedule a time that works for you, and we'll handle the rest."

### Per-service feature bullets (verbatim)

**Eco-Friendly Dry Cleaning**
- Gentle on Fabrics
- Environmentally Friendly
- Safe for Sensitive Skin

**Wet Cleaning**
- Suitable for Delicate Materials
- Maintains Shape and Color
- Gentle Yet Effective Cleaning

**Alterations**
- Dress Alterations
- Pant Hemming
- Suit Adjustments
- Zipper and Button Repairs

**Restoration**
- Fire and Smoke Damage Restoration
- Mold and Mildew Treatment
- Water Damage Recovery

**Household Items**
- Oriental and Area Rug Cleaning
- Comforters, Duvets, and Linens
- Draperies and Curtains

**Bridal Gown Preservation**
- Gentle Cleaning for Delicate Fabrics
- Stain Removal and Fabric Protection
- Archival-Quality Preservation Packaging

**Pickup & Delivery**
- Easy Online Scheduling
- Contactless Pickup Options
- Reliable and Timely Service

### Pricing
**(none listed)** — see flag #4.

### Images
- `/2025/12/geotagged-1.jpg` through `/2025/12/geotagged-7.jpg` — appear to be real storefront/process photos (good candidates for download)
- Various decorative SVG/PNG ornaments (Group-201-1.png, Group-353-1.png, Group-351-1.png, Group-373.svg)

### CTAs
- **Schedule a Free Pick-Up** → `/contact-us/`
- **Find a Location Near You** → `/find-a-location/`
- **Schedule Your Pickup** → `/contact-us/`

### No videos.

---

## Page 4 — Wholesale Solutions (`/wholesale-solutions/`)

### Headings
- H1: Reliable Wholesale Dry Cleaning for Businesses & Institutions
- H2: Why Partner with GoGreen Dry Cleaners™?
- H2: What Sets Us Apart
- H2: Eco-Friendly, Sustainable Practices
- H2: Fast Turnaround Times
- H2: Quality Assurance with Every Order
- H2: Scalable Solutions for Growing Businesses
- H2: Our Wholesale Services
- H2: White-Label Dry Cleaning
- H2: Bulk Laundry Processing
- H2: Specialty Garment Care / H3: Expert Care for Specialty Items
- H2: Logistics & Delivery Solutions
- H2: Industries We Serve
- H2: Ready to Build a Sustainable Partnership with GoGreen Dry Cleaners™?

### Body copy (verbatim)

> Partner with GoGreen Dry Cleaners™ for eco-friendly, high-volume garment care tailored to your needs.

> At GoGreen Dry Cleaners™, we deliver more than just service—we deliver peace of mind. Your wholesale partners trust us for consistency, professionalism, and environmentally responsible care that aligns with their brand standards.

> Our wholesale dry cleaning services provide high-quality, professional garment care tailored for businesses, retailers, and organizations. We specialize in efficient, large-scale cleaning solutions that ensure impeccable results while maintaining fabric integrity.

> Wholesale Partner — We are white labeling for local cleaners as we speak. Whether it be small jobs that their facility can't handle or every day cleaning. Shirts only with our state of the art Unipress Hurricane shirt pressing machine or handling drycleaning the eco friendly way. We can deliver to their front door or they can pick up.

> We handle large volumes of garments with precision, ensuring fast turnaround without compromising quality.

> From delicate fabrics to industrial uniforms, our team is trained to handle a wide range of specialty items.

> We provide reliable pickup and delivery services tailored to your business schedule, ensuring your operations run smoothly.

> We provide specialized dry cleaning solutions tailored to a wide range of industries, including hospitality, healthcare, retail, and corporate sectors. Our services ensure the highest standards of garment care, offering efficient, large-scale cleaning for uniforms, linens, formalwear, and specialty fabrics.

### Wholesale services list

| Service | Bullets |
|---|---|
| White-Label Dry Cleaning | Custom Branding • Flexible Service Agreements • Quality Control |
| Bulk Laundry Processing | Hotels & Hospitality • Medical Facilities • Fitness Centers & Spas |
| Specialty Garment Care | Uniform Cleaning & Pressing • Linens, Curtains, Drapery • Delicate / High-End Garments |
| Logistics & Delivery | Flexible Scheduling • Route Optimization • Secure Handling |

### Industries served
Hospitality & Hotels • Corporate Offices & Uniforms • Healthcare • Fitness & Wellness • Event & Entertainment

### Images
- `/2025/03/9.png`, `/2025/03/image-17.png`, `/2025/04/7.png` — section illustrations

### CTAs
- **Get a Quote** → `/request-a-quote/`
- **Contact Our Team** → `/contact-us/`
- **Schedule a Consultation** → `/contact-us/`

---

## Page 5 — Find a Location (`/find-a-location/`)

### Headings
- H1: Locate Your Nearest Go Green Dry Cleaning Store
- H2: Our Locations / H3: Serving Communities Across Florida, New York & Connecticut
- H3: Florida Locations
- H3: New York Locations
- H3: Connecticut Locations
- H2: New Locations Coming Soon

### Tagline
> Locate your nearest GoGreen Dry Cleaners™ for eco-friendly, high-quality dry cleaning services.
> Exciting new locations are on the way! Stay tuned for our upcoming openings near you.

### Locations (verbatim — see flags #8 and #9)

#### Florida
| Store | Address | Phone |
|---|---|---|
| Boca Raton | *Van Route Only* | — |
| Boynton Beach | *Van Route Only* | — |
| Delray Beach | 8918 W Atlantic Ave. #250, Delray Beach, FL 33446 | 561-808-2488 |
| Jupiter | 5500 Military Trail #24, Jupiter, FL 33458 | 561.335.5798 |
| Miami | 150 NW 6th St, Miami, FL 33136 | — |
| Palm Beach | 367 S County Rd, Palm Beach, FL 33480 | 561.832.8832 |
| Palm Beach Gardens | 2532 PGA Blvd, Palm Beach Gardens, FL 33410 | — |
| Riviera Beach | 5401 East Ave, Riviera Beach, FL 33407 | 561-557-1495 |
| Westlake | 4951 Seminole Pratt Whitney Rd. #1300, City of Westlake, FL 33470 | 561-216-3535 |
| West Palm Beach | 591 Evernia St., unit 271, West Palm Beach, FL 33401 | 561.225.1952 |
| Wellington | 4360 S State Rd 7, Wellington, FL 33449 | 561-225-1952 |

#### New York
| Store | Address | Phone |
|---|---|---|
| Brewster | 111 Independent Way, Brewster, NY 11509 | 845.279.4116 |
| Cortlandt Manor | 1765 E Main St, Mohegan Lake, NY 10547 | 914.526.7076 |
| Larchmont | 1163 W. Boston Post Rd, Mamaroneck, NY 10543 | 914.341.1313 |
| Pelham | 4366 Boston Post Road, Pelham, NY 10803 | 914.632.1010 |

#### Connecticut
| Store | Address | Phone |
|---|---|---|
| Harbor Point | 80 Washington Blvd, Stamford, CT 06902 | 203.908.3123 |
| Norwalk (Glover) | 150 Glover Ave, Suite A, Norwalk, CT 06850 | 203.295.8509 |
| Norwalk (Wilson) | 306 Wilson Ave, Norwalk, CT 06854 | 914-774-7413 |
| Stamford | 711 Canal St., Stamford, CT 06902 | 203.504.8730 |

**Hours:** Per-store, listed on each location's Google Maps page. **Action for Phase 1 prep:** scrape the Google Maps URL for each of the 19 stores and capture opening hours into `content/locations.json`.
**Email per location:** none listed.
**Map embeds:** Google Maps links per store, not embedded iframes — we'll embed proper Google Maps `<iframe>` per location in the new build.

### Social
- Instagram: https://www.instagram.com/gogreen_drycleaners/
- Facebook: https://www.facebook.com/people/Go-Green-Dry-Cleaners-FL/100067798480666/

---

## Page 6 — Contact Us (`/contact-us/`)

### Headings
- H1: Contact GoGreen Dry Cleaners™ for Professional Dry Cleaning Services
- H2: Contact us today and our team will get back to you promptly with the answers and support you need.
- H2: Request your pick up or get in touch here
- H2: Reach us at
- H2: Where You Can Find Us

### Body copy (verbatim)
> Heads up: This form is intended for customers and service inquiries only. If you're reaching out to sell something or promote a service, please don't use this form—we won't be able to respond.

### Form fields (general contact)
| Field | Type | Required |
|---|---|---|
| First Name | text | yes |
| State | dropdown (FL/NY/CT) | yes |
| City | dropdown (state-dependent) | yes |
| Email | email | yes |
| Phone Number | tel | yes |
| Discount Code | text | no |

Submit button: **Submit Now**.
Submit destination: not visible client-side. We'll wire the new form to `/api/messages` per the brief.

### Images
- Various Mask-group SVG variants (decorative)
- `/2025/03/Group-353-1.png`, `/2025/03/Group-351-1.png` (decorative)
- `elementor/thumbs/2-r4qvyskkug62yzwse1extqswtzo2vamv7tmyyk0olk.png` — generic Elementor thumbnail

---

## Page 7 — Request a Service (`/request-a-service/`)

Pickup-scheduling form. Probably belongs folded into the new Contact page or kept as a dedicated route.

### Headings
- H1: Request a Service
- H2: Need professional dry cleaning made simple? Our Request a Service form lets you easily schedule pickups for your garments without any hassle.
- H2: Schedule Dry Cleaning / H3: Easily schedule your dry cleaning pickup and delivery

### Form fields (verbatim)
| Field | Type | Required |
|---|---|---|
| Name | text | yes |
| Last Name | text | yes |
| Address | text | yes |
| ZIP / Postal Code | text | yes |
| Location | dropdown (~249 countries — overkill, suggest narrowing to FL/NY/CT) | yes |
| Phone Number | tel | yes |
| E-mail | email | yes |
| The laundry will be with doorman | dropdown | yes |
| Pick-Up Date | date | yes |
| Delivery Date | date | yes |
| Preferred Laundry Detergent | dropdown ("All Free & Clear" / "I Will Provide") | yes |
| Laundry Bag Needed? | radio (Yes/No) | yes |
| Special Instructions | textarea (≤1000 chars) | no |

Submit: **Submit Now**.

---

## Page 8 — Request a Quote (`/request-a-quote/`)

B2B quote form. Belongs alongside Wholesale.

### Headings
- H1: Request a Quote for Dry Cleaning, Alterations, or Upholstery Care
- Get a personalized quote for professional dry cleaning services tailored to your specific needs fast, reliable, and affordable
- Request a Dry Cleaning Quote
- Tell us about your needs, and we'll provide a personalized quote

### Form fields (verbatim)
| Field | Type | Required |
|---|---|---|
| Business Address (city, state, zip) | text | yes |
| Your Name | text | yes |
| Email | email | yes |
| Phone Number | tel | yes |
| Tell Us About Your Laundry Needs | text | yes |
| Your message or question | textarea (≤1000 chars) | yes |

Submit: **Submit Now**.

### Images
- `/2025/03/image-51.png` (section illustration)

---

## Page 9 — Resources (`/resources/`)

Empty hub. The page only contains the same nav/footer link lists. **Recommendation: don't rebuild this.** The footer + dropdown menu cover it.

---

## Page 10 — FAQ (`/resources-faq/`)

### Headings
- H1: Frequently Asked Questions About Our Services
- H2: Frequently Asked Questions

### Intro
> Find answers to the most common questions about our services, features, and support.

### FAQs (verbatim — only 4 on the live site, flagged short)

**Q:** What makes GoGreen Dry Cleaners™ eco-friendly?
**A:** We use non-toxic, biodegradable solvents and processes that reduce water and energy consumption—prioritizing your health and the planet.

**Q:** Where are your locations?
**A:** We have multiple locations across Florida, New York, and Connecticut. Visit our 'Find a Location' page to view a full list.

**Q:** Do you offer pickup and delivery?
**A:** Yes! Complimentary pickup and delivery are available in select areas. Schedule your service online or call your local store.

**Q:** How do I contact customer service?
**A:** Visit our 'Contact Us' page to reach the appropriate department based on your needs—whether you're a client, wholesale partner, or franchise inquiry.

> **Note:** Only 4 FAQs is thin for a dedicated page. The blog content covers many more questions (dry-cleaning vs. wet-cleaning, wedding-gown preservation, eco labels, business attire care, etc.) — happy to expand the FAQ in Phase 1 by mining the blog. Tell me yes/no.

---

## Page 11 — Blog index (`/blog/`)

### Headings
- H1: Explore the Latest in Eco-Friendly Dry Cleaning & Garment Care
- Subtitle: Stay updated with our latest blogs featuring expert insights, industry trends, tips, and best practices.

### Cards visible on page 1 (most recent 9)
| # | Title | Slug | Date | Thumbnail |
|---|---|---|---|---|
| 1 | Why Choosing Eco-Friendly Dry Cleaning in Florida Matters for Your Garments and the Environment | /uncategorized/eco-friendly-dry-cleaning-in-florida-garment-care/ | 2025-12-26 | `/2025/12/undefined-2.jpg` |
| 2 | How Our Petrochemical Free Dry Cleaning Process Protects Delicate Fabrics | /blog/how-our-petrochemical-free-…/ | 2025-12-26 | `/2025/12/undefined-5.png` |
| 3 | How to Care for Your Business Attire | /blog/how-to-care-for-your-business-attire-…/ | 2025-12-18 | `/2025/12/ca4bb-dry_cleaners_for_suits.jpg` |
| 4 | Wedding Dress Care: Why Eco-Friendly Cleaning Is the Best Way to Preserve Memories | /blog/wedding-dress-care-…/ | 2025-12-18 | `/2025/12/morning-bride-preparting-ceremony-scaled.jpg` |
| 5 | Why Eco-Friendly Dry Cleaning Is the Future of Fashion Retail Partnerships | /blog/why-eco-friendly-…-fashion-retail-partnerships/ | 2025-12-18 | `/2025/12/personal-shopper-helping-cutomer-1.jpg` |
| 6 | Sustainable Living Starts in Your Closet | /blog/sustainable-living-starts-in-your-closet-…/ | 2025-12-18 | `/2025/12/beautiful-girl-trying-dress-room-1.jpg` |
| 7 | Eco-Friendly Dry Cleaning Myths: Separating Fact from Fiction | /blog/eco-friendly-dry-cleaning-myths-…/ | 2025-12-18 | `/2025/12/front-view-disappointed-…-1.jpg` |
| 8 | The Truth About "Eco-Friendly" Labels in Dry Cleaning | /blog/the-truth-about-eco-friendly-labels-…/ | 2025-12-18 | `/2025/12/medium-shot-questioning-woman-with-clothes-1.jpg` |
| 9 | Behind the Scenes: How GoGreen Dry Cleaners™ Protects Your Clothes and the Planet | /blog/behind-the-scenes-…/ | 2025-12-18 | `/2025/12/medium-shot-woman-repairing-clothes-1.jpg` |

Pagination: "Load More" → page 2.

### Full post inventory (35 posts, from sitemap)
1. /blog/dry-cleaning-myths-what-you-need-to-know-services/
2. /blog/dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning-2/
3. /blog/cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning-2/
4. /blog/how-can-dry-cleaning-save-you-money-and-time-2/
5. /blog/tips-for-choosing-the-right-dry-cleaning-service-choose/
6. /blog/dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning/
7. /blog/cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning/
8. /blog/how-to-get-special-event-clothing-cleaning-done-the-right-way/
9. /blog/why-south-florida-and-tri-state-residents-are-going-green-with-their-dry-cleaning/
10. /blog/eco-friendly-dry-cleaning-in-connecticut-stamford-norwalk-harbour-point/
11. /blog/top-10-items-you-can-take-to-the-dry-cleaners/
12. /blog/dry-cleaning-myths-what-you-need-to-know/
13. /blog/freshen-up-your-style-the-power-of-regular-dry-cleaning/
14. /blog/tips-for-choosing-the-right-dry-cleaning-service/
15. /blog/how-can-dry-cleaning-save-you-money-and-time/
16. /blog/freshen-up-your-style-the-power-of-regular-dry-cleaning-2/
17. /blog/is-dry-cleaning-delivery-the-solution-to-your-busy-life/
18. /blog/how-green-dry-cleaning-extends-life-of-clothes/
19. /blog/5-signs-its-time-to-take-your-clothes-to-the-cleaner/
20. /blog/make-your-clothes-last-longer-with-eco-friendly-dry-cleaning-tips-for-south-florida-and-new-york-lifestyles/
21. /blog/the-future-of-fashion-care-why-eco-friendly-dry-cleaning-matters/
22. /blog/eco-friendly-vs-traditional-dry-cleaning-whats-the-real-difference-going-green-makes/
23. /blog/eco-friendly-dry-cleaning-in-new-york-serving-brewster-cortlandt-manor-larchmont-pelham/
24. /blog/eco-friendly-dry-cleaning-in-miami-sustainable-garment-care-you-can-trust/
25. /blog/eco-friendly-dry-cleaning-in-palm-beach-county/
26. /blog/go-green-dry-cleaners-expands-in-south-florida-new-locations-coming-soon/
27. /blog/how-to-care-for-your-business-attire-professional-clothing-tips-for-the-modern-workforce/
28. /blog/wedding-dress-care-why-eco-friendly-cleaning-is-the-best-way-to-preserve-memories/
29. /blog/why-eco-friendly-dry-cleaning-is-the-future-of-fashion-retail-partnerships/
30. /blog/sustainable-living-starts-in-your-closet-how-small-choices-make-a-big-impact/
31. /blog/eco-friendly-dry-cleaning-myths-separating-fact-from-fiction/
32. /blog/the-truth-about-eco-friendly-labels-in-dry-cleaning-what-to-look-for/
33. /blog/behind-the-scenes-how-go-green-dry-cleaners-protects-your-clothes-and-the-planet/
34. /blog/how-our-petrochemical-free-dry-cleaning-process-protects-delicate-fabrics/
35. /uncategorized/eco-friendly-dry-cleaning-in-florida-garment-care/

I sampled posts #34 and #24 (full bodies on file). Posts are 1000–1800 words, well-structured, no inline ads, no testimonials. **Plan:** scaffold the blog routes during Phase 1 with the 9 most-recent posts as featured, then bulk-migrate the remaining 26 in a follow-up pass. Confirm.

---

## Pages I'm not rebuilding (and why)

- `/home-temp/`, `/home-1/` — Elementor staging duplicates of the homepage. Skip.
- `/comming-soon/` — typo'd "Coming Soon" page used as a stub for the Franchise Opportunity link. I'll create a real `/franchise/` placeholder in the new build.
- `/resources/` — empty hub. Footer covers it.

---

## Mapping plan (preview — to be detailed in Phase 1)

| Design-system section | Source |
|---|---|
| Hero (5-image carousel) | Pull from `/2025/12/geotagged-*.jpg` storefront photos + `IMG_9071-scaled.jpg` |
| Hero headline | **Rewrite** the SEO-y H1 — propose: "Garment care, considered." or "Cleaned the way couture deserves." |
| Trust strip | Partner logos from About page (Brightline, Marriott, Hyatt, Hilton Stamford, Greystar, etc.) |
| Services 3-up grid | 6 services from `/dry-cleaning-restoration/` — pick the top 3 for home + link to detail pages for the rest |
| Stats bar | "Since 2010 • 19 locations • 50+ years combined experience • GreenEarth™ certified" |
| Featured items grid | The 6 services as detail cards |
| Video section | **Skip or replace** — no source video |
| Gallery preview | `geotagged-1..7.jpg` + about-page photos |
| Testimonials | **Skip or wait for input** — no source content |
| Lead capture | Reuse fields from Request-a-Service form |
| Footer | Pull from existing nav/footer; standardize hours TBD |

---

## What's next

Stopping here per Phase 0 step 3. Once you sign off on this file (and answer the open questions in flags #2, #3, #4, #5, #7, #8, #9, #11), I will:

1. Download all real photos to `/public/images/<page-slug>/` (skipping decorative SVG ornaments and unidentified logos).
2. Build out `content/media-map.json` mapping source URL → local path.
3. Begin Phase 1 — Next.js scaffold with the design system.

**Open questions / decisions I need from you:**
- [ ] Testimonials: omit / you'll provide / Google Reviews widget?
- [ ] Video: omit / you'll provide URL?
- [ ] Pricing: omit / you'll provide?
- [ ] Hours: chain-wide block or per-location? I need values.
- [ ] Founder bios (#7): full bios for Michael Koppy and Igor Madrit, or drop the "Read More" buttons?
- [ ] Address fix (#8): Delray Beach is 8918 or 8919 W Atlantic?
- [ ] Norwalk CT (#9): both locations real and active?
- [ ] FAQ expansion (#11): mine the blog for more Q&A?
- [ ] Brand spelling: "GoGreen Dry Cleaners™" (one word) confirmed?
- [ ] Brand accent color: design system specifies one warm accent. For an eco-conscious dry-cleaner I'd suggest a deep forest / sage green (e.g. `#3a5a3a` or `#4a6850`). Approve or pick another?
- [ ] Blog: migrate top 9 first and the rest in a follow-up, OR migrate all 35 up front?
