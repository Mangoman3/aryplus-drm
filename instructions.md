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
