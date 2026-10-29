# ARY Plus Portal UI Redesign - Implementation Plan (v1.0)

## Problem Statement
The user requested a multi-view redesign of the ARY Plus streaming portal (`aryplus-drm.vercel.app`) based on two reference screenshots:
1. **Top Navigation & Dramas Tab (Browse View):** Top navigation matching ARY Plus with tabs (`Dramas` active, `DRM Protected Content`, `Exclusive`, etc.) and a cell grid of dramas featuring *Dar-E-Nijaat*.
2. **Series Detail View:** Tapping *Dar-E-Nijaat* transitions into a cinematic Netflix/ARY-style series view with a full-width hero backdrop, golden title logo, synopsis, cast, "Watch Now", "+ Add to List", "Share", sub-tabs (`Episodes (25)`, `More Info`, `Related`), sort order dropdown (`Newest to Oldest` / `Oldest to Newest`), and 16:9 episode cards with circular play icons and duration timestamps.
3. **Dedicated Player Page:** Tapping any episode navigates to a dedicated player page/view with Shaka Player and live pipeline diagnostics.
4. **DRM Protected Content Tab:** A separate top tab showcasing DRM-encrypted movies (e.g., *Love Guru*) with Widevine CENC / FairPlay license exchange.

---

## Versioned Task List

### Task 1: Navigation & State Routing Architecture (v1.0)
- [x] 1.1: Define client-side view router supporting four primary views: `dramas` (catalog), `series-detail` (Dar-E-Nijaat detail), `player` (dedicated watch page), and `drm` (DRM catalog).
- [x] 1.2: Support URL hash state (`#/dramas`, `#/series/dar-e-nijaat`, `#/watch/:epNum`, `#/drm`) with browser back/forward button support.
- [x] 1.3: Recreate ARY Plus top navigation bar with green ARY Plus logo, category tabs (`Dramas`, `DRM Protected`, `Exclusive`, `Telefilms`, `Shows`, `Streams`), and active green underline indicator.

### Task 2: Dramas Browse Tab (Image 1 Match) (v1.0)
- [x] 2.1: Render section heading "Dramas" in bold white.
- [x] 2.2: Build poster card grid containing *Dar-E-Nijaat* (using `poster/280X400_1784120968010.webp`), *Rutba*, *Hey Fam*, and *Lagan Lagi*.
- [x] 2.3: Wire click interaction on *Dar-E-Nijaat* card to smoothly navigate to the Series Detail View.

### Task 3: Series Detail View for Dar-E-Nijaat (Image 2 Match) (v1.0)
- [x] 3.1: Hero banner with high-resolution desktop cover image (`desktop/1920X1080_1784120969405.webp`) and dark gradient overlay.
- [x] 3.2: Gold serif typography for "DAR-E-NIJAAT", metadata tag ("Romance, Drama, Family | 25 Episodes"), full synopsis, and starring cast list.
- [x] 3.3: Action button row:
  - Neon green circular play button with "Watch Now" (starts playing Episode 1 in player page).
  - Translucent circular "+ Add to List" button.
  - Translucent circular "Share" button.
  - Mute/ambient audio toggle button on bottom right of hero.
- [x] 3.4: Sub-tabs navigation bar (`Episodes (25)` with neon green underline, `More Info`, `Related`).
- [x] 3.5: Sort selector dropdown: `Newest to Oldest` (Episode 25 down to 1) and `Oldest to Newest` (Episode 1 to 25).
- [x] 3.6: Render all 25 episodes from `episodes.json` with 16:9 thumbnails, circular play overlay, episode titles, and formatted duration (`mm:ss`).

### Task 4: Dedicated Player Page ("Play in New Page") (v1.0)
- [x] 4.1: Create dedicated full-viewport player page view with "← Back to Dar-E-Nijaat" navigation.
- [x] 4.2: Embed Shaka Player with automatic stream loading, playback controls, and next episode trigger.
- [x] 4.3: Include collapsible technical inspector below the video showing the 5-step EME/DRM pipeline, token inspection, and live network logs.

### Task 5: DRM Protected Content Tab (v1.0)
- [x] 5.1: Create top navigation tab for "DRM Protected".
- [x] 5.2: Display DRM-encrypted titles (including *Love Guru* with Widevine CENC and FairPlay).
- [x] 5.3: Include Custom ID Inspector for querying and testing any ARY Plus content ID.

### Task 6: Testing, Build & Live Vercel Deployment (v1.0)
- [x] 6.1: Test all view transitions, sorting, and playback locally.
- [x] 6.2: Commit and push changes to `origin` and `vercel-repo` (`main` and `master`).
- [x] 6.3: Verify on live Vercel endpoint `https://aryplus-drm.vercel.app/` using CDP and capture verification screenshots.

---

# FOOLFLIX Portal - Implementation Plan (v2.0: Billing Segment & 90% Discount Annual Subscription Flow)

## Problem Statement
The user requested adding a **Billing segment** and a dedicated **Payment page for billing** where users can purchase an **Annual Subscription at a 90% discount** (e.g. $11.99/year instead of regular $119.99/year).
The feature must maintain the FOOLFLIX Netflix-style dark theme, integrate seamlessly into the top navigation, provide a plan comparison and billing overview, offer a secure 2-column checkout page with discount calculations, support card/wallet inputs with test filling, and persist the active subscription state.

---

## Versioned Task List

### Task 7: Top Navigation & Routing Expansion (v2.0)
- [x] 7.1: Add `Billing` navigation tab with glowing `90% OFF` discount pill to top header.
- [x] 7.2: Add top-right promotional CTA button (`Claim 90% Off`) and user membership status badge (`Guest` / `VIP ⭐`).
- [x] 7.3: Extend `navigateTo(viewName)` router to handle `billing` (`#/billing`) and `checkout` (`#/billing/checkout`) with scroll-to-top and hash history.

### Task 8: Billing Segment View (`#view-billing`) (v2.0)
- [x] 8.1: Design Member Account Status card displaying current plan tier, status (Active/Guest), renewal date, and member ID.
- [x] 8.2: Build Promotional Spotlight banner highlighting the 90% Off Annual Flash Sale.
- [x] 8.3: Build Plan Comparison Grid:
  - **Annual VIP Plan (Featured):** Regular ~~$119.99/yr~~ -> **$11.99/yr (90% OFF)**, $0.99/mo breakdown, 4K UHD, Dolby Atmos, all originals & DRM blockbusters, zero ads, 4 devices.
  - **Monthly Plan:** $9.99/mo ($119.88/yr), 1080p HD, 1 device.
- [x] 8.4: Add Billing History & Invoice table with status badges and simulated receipt viewing.
- [x] 8.5: Provide Subscription Management controls (Upgrade, Manage Payment, Cancel/Reset subscription for testing).

### Task 9: Dedicated Payment Checkout Page (`#view-checkout`) (v2.0)
- [x] 9.1: Build 2-column Netflix-style checkout layout with breadcrumb navigation back to Billing.
- [x] 9.2: Left Column - Payment details form:
  - Payment method selector: Credit/Debit Card, Apple/Google Pay, PayPal.
  - Interactive credit card inputs: Cardholder Name, Card Number (with live formatting & brand detection), Expiry (`MM/YY`), CVC (`CVV`), and Postal Code.
  - Quick "Fill Demo Card" helper button for instant testing (uses Stripe test card 4242...).
  - Security badges: 256-Bit SSL Encryption, PCI-DSS Verified, 30-Day Money-Back Guarantee.
- [x] 9.3: Right Column - Transparent Order Summary:
  - Itemized receipt: Annual VIP Plan ($119.99), Promo Discount `ANNUAL90` (-$108.00 / 90% OFF), Total Today: **$11.99**.
  - Terms of service acknowledgment and auto-renewal disclaimer.
- [x] 9.4: Primary checkout button: "Pay $11.99 & Start VIP Membership".

### Task 10: Payment Processing Simulation & Subscription State Persistence (v2.0)
- [x] 10.1: Multi-stage realistic processing modal:
  - Step 1: "Contacting payment gateway..."
  - Step 2: "Verifying 3D Secure & card authorization..."
  - Step 3: "Activating Annual VIP subscription..."
- [x] 10.2: Success Confirmation Screen:
  - Animated green success badge.
  - Generated Transaction ID (`TXN-FF90-XXXXXXXX`), date, amount ($11.99), and payment method summary.
  - "Start Streaming Now" button routing directly to VIP catalog.
- [x] 10.3: State persistence in `localStorage` (`foolflix_subscription`):
  - Automatically updates navigation badge to `VIP ANNUAL (Active)`.
  - Unlocks VIP badge on video player and DRM catalog.
  - Preserves subscription state across page refreshes.

### Task 11: Testing, Build & Live Vercel Deployment (v2.0)
- [x] 11.1: Test complete checkout flow, input validation, payment simulation, and plan cancellation/reset locally.
- [x] 11.2: Commit and push changes to GitHub remotes (`origin` and `vercel-repo`).
- [x] 11.3: Verify on live Vercel endpoint `https://aryplus-drm.vercel.app/` using Chrome CDP and capture screenshots.

---

# FOOLFLIX Portal - Implementation Plan (v3.0: Unified Single-Page Billing & Payment Checkout)

## Problem Statement
The user requested consolidating the billing and payment experience into **one single page** (`#/billing`) so users can be redirected directly to this single page without needing a separate checkout step:
- Show the **90% discount offer** ($11.99/year instead of regular $119.99/year) and **collect payment/card details on the exact same page**.
- Remove the separate second page (`#view-checkout`) and eliminate multi-step page redirects.
- Seamlessly display the order discount breakdown, payment form (Card, Wallets, PayPal, demo fill), and one-click purchase button side-by-side with plan benefits.
- Display account status and invoice history on the same page, updating immediately upon payment completion.

---

## Versioned Task List

### Task 12: Unified Single-Page Billing & Payment Architecture (v3.0)
- [x] 12.1: Consolidate `#view-checkout` and `#view-billing` into a single, cohesive view (`#view-billing` at route `#/billing`).
- [x] 12.2: Build a unified 2-column layout:
  - **Left Column (Offer & Plan Spotlight):** 90% Off Annual VIP banner, pricing breakdown (~~$119.99~~ -> $11.99/yr, $0.99/mo), full feature list (4K UHD, Dar-E-Nijaat all 25 eps, DRM blockbusters, no ads, 4 screens), and money-back guarantee.
  - **Right Column (Instant Payment & Checkout):** Order summary box with 90% discount calculation, payment method selector, credit card inputs with live formatting/brand detection, "⚡ Fill Demo Card (Stripe 4242)" button, and "Pay $11.99 & Start VIP Membership" button.
- [x] 12.3: Integrate Account Status and Invoice History section at the bottom of the page (with active plan badge, next renewal date, and test reset toggle).
- [x] 12.4: Update routing and header triggers:
  - Top navigation `Billing 90% OFF` tab and `Claim Annual VIP` button both open `#/billing` directly.
  - Remove `#view-checkout` and redirect any `#/checkout` or `#/billing/checkout` hash URLs to `#/billing`.
- [x] 12.5: In-place payment processing & instant state update:
  - Run the payment authorization simulation modal directly on the same page.
  - Once paid, instantly update the account card to "VIP Active • 90% OFF", show invoice receipt row, and update header badge to "⭐ VIP Member".
- [x] 12.6: Test locally with automated Chrome CDP script, push to GitHub remotes (`master` and `main`), and verify live on `https://aryplus-drm.vercel.app/#/billing`.

---

# FOOLFLIX Portal - Implementation Plan (v4.0: Main Homepage Redesign)

## Problem Statement
The user requested updating the main FOOLFLIX homepage (`#view-dramas` / `#/dramas`) to match their reference screenshot:
1. **Hero Banner:**
   - Cinematic background with viewer on couch facing red-lit drama poster collage.
   - Large bold typography:
     - `Powered by Politics.` (white)
     - `Secured by Hope.` (Netflix red `#E50914`)
     - Subtitle: `Enterprise-grade mismanagement. Production-grade vulnerabilities.`
   - 4 Feature Badges in horizontal row:
     - 👑 **Premium Incompetence** (Now Streaming in 4K)
     - 🛡️ **No Security** (Just Hope)
     - 👥 **Zero Ownership** (Unlimited Excuses)
     - 💼 **Corporate Resources** (Personal Profits)
2. **Dramas Row:**
   - Section header "Dramas" with "See All →".
   - Only show *Dar-E-Nijaat* card (per user instruction: *"in daram just show dare nijat for now"*).
   - 16:9 landscape card with red `FOOLFLIX Series • 25 Eps` badge, Dar-E-Nijaat title, and subtitle, navigating to Series Detail on click.
3. **Trending on FoolFlix Row:**
   - Section header "Trending on FoolFlix" with "See All →".
   - 6 horizontal parody drama cards: *Meeting Baaz*, *Deadline? Kya Deadline?*, *Idea Chori*, *Email Forwarded*, *Budget Khatam*, *Server Down*.
   - Carousel navigation chevron.
4. **Footer:**
   - FOOLFLIX brand, About, Help, Terms, Privacy links, and social icons (YouTube, X, Instagram).

---

## Versioned Task List

### Task 13: Main Homepage Redesign (v4.0)
- [x] 13.1: Build cinematic Hero Banner in `#view-dramas` with dual-color headline, subtitle, and 4 feature badge cards.
- [x] 13.2: Reconfigure "Dramas" catalog row to display only *Dar-E-Nijaat* in 16:9 landscape format with red badge and smooth navigation to series detail.
- [x] 13.3: Build "Trending on FoolFlix" row featuring all 6 parody titles (*Meeting Baaz*, *Deadline? Kya Deadline?*, *Idea Chori*, *Email Forwarded*, *Budget Khatam*, *Server Down*) with carousel navigation.
- [x] 13.4: Add matching dark FOOLFLIX footer with navigation links and social icons.
- [x] 13.5: Add responsive styling for mobile, tablet, and desktop viewports.
- [x] 13.6: Test with automated Chrome CDP script, push to GitHub remotes (`origin` and `vercel-repo`), and verify live on `https://aryplus-drm.vercel.app/`.

---

# FOOLFLIX Portal - Implementation Plan (v5.0: Exclusive Tab & Animated Flying Rocket Plus Hero)

## Problem Statement
The user requested two key upgrades to FOOLFLIX:
1. **Exclusive Tab ("Coming Soon"):** Add an `Exclusive` navigation tab placed immediately before `Billing [90% OFF]`. When clicked, it displays an exclusive series catalog view marked "Coming Soon" with teaser cards, early access notices, and VIP triggers.
2. **Animated Flying Rocket Plus Hero:** Replace the couch viewer background image in the main hero banner with the newly provided 3D flying red plus sign craft with rocket engine thrusters (`media_1793312832100_8d483406.jpg`). Remove the couch viewer image, and add animated rocket flame effects with the craft hovering and moving up and down dynamically.

---

## Versioned Task List

### Task 14: Exclusive Tab & Animated Flying Rocket Plus Hero (v5.0)
- [x] 14.1: Top Navigation Update:
  - Insert `Exclusive` nav button between `DRM Protected` and `Billing 90% OFF`.
  - Update route handling in `navigateTo()` and `hashchange` to support `#/exclusive`.
- [x] 14.2: Exclusive Catalog View (`#view-exclusive`):
  - Build modern "Coming Soon" showcase for upcoming exclusive FOOLFLIX series (*Filey: The Leak Files*, *Kursi Ki Jung*, *Sifarish Uncensored*).
  - Add "VIP Early Access" promo banner linking to `#/billing` and "Notify Me" interactive alerts.
- [x] 14.3: Animated Flying Rocket Plus Hero:
  - Remove the couch viewer background image (`images/foolflix-hero-clean.jpg`) from the hero banner.
  - Implement `.home-hero-rocket-stage` containing the flying red plus rocket craft (`images/foolflix-flying-plus.jpg`).
  - Add continuous floating hover animation (`@keyframes rocketHover`) moving smoothly up and down with realistic inertia.
  - Add dynamic rocket flame thruster animations (`@keyframes flamePulse`, `@keyframes flameFlicker`) with pulsating cyan/orange exhaust flames, thruster light flares, and ambient red reflections.
  - Apply smooth gradient blending on the left and edges so it seamlessly merges with the dark `#0a0a0a` background and text.
- [x] 14.4: Responsive Layout & Mobile Tuning:
  - Ensure headlines, badges, and the animated rocket craft adjust smoothly across mobile, tablet, and widescreen.
- [x] 14.5: Local Testing & Verification:
  - Run automated Chrome CDP script to verify navigation to `#/exclusive`, the "Coming Soon" content, and the animated rocket hover and flame effects.
- [x] 14.6: Push to Remotes & Vercel Verification:
  - Commit and push to `origin` and `vercel-repo` on `master` and `main`.
  - Verify live deployment on `https://aryplus-drm.vercel.app/` and capture screenshots.

---

# FOOLFLIX Portal - Implementation Plan (v5.1: Scale Rocket Plus Animation 20% Smaller)

## Problem Statement
The user requested reducing the width of the flying rocket plus sign animation by 20% to achieve more balanced proportions with the hero text and catalog rows.

---

## Versioned Task List

### Task 15: Scale Rocket Plus Animation 20% Smaller (v5.1)
- [x] 15.1: Reduce `.home-hero-rocket-stage` max-width from 720px down to 576px (20% reduction) and adjust flex-basis.
- [x] 15.2: Adjust `.home-rocket-craft-wrap` max-width and scale flame jet dimensions proportionally.
- [x] 15.3: Update responsive mobile breakpoint to scale the stage from 460px to 368px.
- [x] 15.4: Test with automated Chrome CDP script, capture screenshot, commit and push to remotes, and verify on live Vercel.
