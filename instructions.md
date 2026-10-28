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
- [ ] 6.1: Test all view transitions, sorting, and playback locally.
- [ ] 6.2: Commit and push changes to `origin` and `vercel-repo` (`main` and `master`).
- [ ] 6.3: Verify on live Vercel endpoint `https://aryplus-drm.vercel.app/` using CDP and capture verification screenshots.
