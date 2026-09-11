# Tasks — "How It Works" Page (NearCare)

**Input**: `HOW_IT_WORKS_PAGE_SPEC.md` (locked) + `HOW_IT_WORKS_PAGE_BUILD_SPEC.md` (locked). **Format**: `[ID] [P?] [Journey] Description` — `[P]` = parallelisable (different files, no dependency). Real file paths.

---

## Phase 1 — Setup (shared)

- **T1** `[Setup]` Create `how-it-works.html` in the project root as an empty HTML5 document (`<!DOCTYPE html>`, `<html lang="en">`, empty `<head>`/`<body>`) — no shared build tooling to install, no linting/CI in this project (per Build Spec §2).

## Phase 2 — Foundational (blocking) ⚠️

*The page shell every journey renders inside. Kept to shell-only — no step/FAQ content lives here.*

- **T2** `[Foundational]` `how-it-works.html` — add page `<head>`: Tailwind CDN `<script>` + the exact `tailwind.config` block from `index.html`, Google Fonts preconnect/link (Sora + Inter), the full custom `<style>` block copied verbatim from `index.html` (grain texture, hero gradient, clip-paths, shadow-float/shadow-card, button/nav/tile/blog interactive states, `.reveal` + its `<noscript>` fallback, badge/float animations), and its **own** `<title>` ("How It Works — NearCare") + `<meta name="description">` distinct from the homepage's (Build Spec §7).
- **T3** `[Foundational]` `how-it-works.html` — add the `<svg>` clip-path defs (`blobClip`, `cloverClip`) copied from `index.html`, needed if any step reuses the blob/clover image mask.
- **T4** `[Foundational]` `how-it-works.html` — add header/nav markup copied from `index.html` (logo, desktop nav `<ul>`, mobile menu button + `<ul>`, both CTA buttons), with the "How It Works" nav `<a>` (desktop **and** mobile) pointing at `href="how-it-works.html"` instead of `#` — self-referential on this page, matching how "Home" would point at `index.html`.
- **T5** `[P]` `[Foundational]` `how-it-works.html` — add footer markup copied verbatim from `index.html`.
- **T6** `[P]` `[Foundational]` `how-it-works.html` — add the closing `<script>` block copied verbatim from `index.html` (load-triggered `.reveal` activation via `requestAnimationFrame`, mobile-menu toggle handler) — copied exactly, not reimplemented as scroll-triggered (Build Spec §7 note on `.reveal`).
- **T7** `[Foundational]` `index.html` — update the "How It Works" nav `<a>` in **both** the desktop `<ul>` and the mobile `<ul>` from `href="#"` to `href="how-it-works.html"`.

**Checkpoint**: `node serve.mjs` running, `http://localhost:3000/how-it-works.html` loads the shared shell (header, empty body, footer) with no console errors; clicking "How It Works" from `index.html`'s nav (desktop and mobile) lands on it.

## Phase 3 — Journey 1 (P1) 🎯 MVP

*A family reads the full process and starts a search.*

- **T8** `[Journey 1]` `how-it-works.html` — build the header/intro block: page `<h1>` ("How It Works"), eyebrow label + icon, one-line framing sentence, styled per the homepage's section-intro pattern (Build Spec §7).
- **T9** `[Journey 1]` `how-it-works.html` — build **Step 1 — Tell us what you need**: needs/area/funding-type description, plain-prose answer to "what if there's no one near me yet" written directly into this step's copy (not FAQ-gated, per Product Spec Journey 1 acceptance).
- **T10** `[P]` `[Journey 1]` `how-it-works.html` — build **Step 2 — Browse a ranked, verified shortlist**: fit-indicator explanation + "verified" explained in general, safe wording only ("every credential is checked, not self-reported") — no specific review-process claims (Product Spec §5, resolved Open Question).
- **T11** `[P]` `[Journey 1]` `how-it-works.html` — build **Step 3 — Message safely, on your terms**: in-app messaging explanation, personal contact details not shared automatically.
- **T12** `[Journey 1]` `how-it-works.html` — build **Step 4 — Express interest, connect, and loop in your Support Coordinator**: normal body copy for the Express Interest/connect action, **plus** a visually separated callout sub-card directly beneath it (`bg-mist-100 rounded-2xl` + icon) carrying the recommend-yourself LAC/Support Coordinator framing — explicit that NearCare doesn't hold that contact data or notify automatically (Build Spec §7, the "clearly-separated recommendation" requirement).
- **T13** `[Journey 1]` `how-it-works.html` — build the trust-strip section on its own solid dark band (`bg-green-900`), compliance-check labels copied verbatim from `index.html` (WWCC / NDIS Worker Screening / Police Check / Public Liability Insurance), placed directly after Step 4.
- **T14** `[Journey 1]` `how-it-works.html` — build the closing CTA section: "Free for families, always" restated, `.search-field` component (postcode input + "Search Workers" button) with `onsubmit="return false;"`, matching the homepage's current non-functional state exactly.

**Checkpoint — MVP demoable on its own**: from `index.html`, click "How It Works" → land on `how-it-works.html` → read all four steps top to bottom (including the no-one-nearby answer and the separated LAC/Support Coordinator callout) → reach the closing "Search Workers" CTA. Run `node screenshot.mjs http://localhost:3000/how-it-works.html` and do at least one visual comparison/fix pass per CLAUDE.md's screenshot workflow, checking both desktop and a mobile viewport.

## Phase 4 — Journey 2 (P2)

*A family checks a specific worry before continuing.*

- **T15** `[Journey 2]` `how-it-works.html` — add the FAQ section using native `<details><summary>` elements (no JS), styled as cards (`bg-white shadow-card rounded-2xl`), chevron icon rotation done in pure CSS (`details[open] svg { transform: rotate(180deg) }`, transitioning `transform` only).
- **T16** `[Journey 2]` `how-it-works.html` — populate the FAQ with the five default questions from Product Spec §11 ("What if there's no support worker near me yet?", "What exactly gets checked before a worker's profile goes live?", "Do I have to give out my phone number?", "What if I don't have a Support Coordinator or LAC?", "Is this really free for families?"), each answer using the same general/safe wording as Step 2 — no overpromising on verification detail.

**Checkpoint**: each FAQ item opens/closes via mouse click and via keyboard (Tab to focus, Enter/Space to toggle) with no JS errors; content still holds up with JS disabled (native `<details>` requires none).

## Phase 5 — Polish

- **T17** `[Polish]` Read the full final page copy back against the locked Product Spec's §7 Rules: LAC/Support Coordinator wording never implies automation anywhere (including the callout in T12), no fabricated statistics beyond what the homepage already shows, the person being supported is never named/shown, no worker pricing/subscription content anywhere on the page (Build Spec §12 content-rules gate).
- **T18** `[P]` `[Polish]` Full responsive pass — screenshot `how-it-works.html` at a mobile viewport width via `screenshot.mjs`, confirm the mobile nav menu, step sections, callout card, trust strip, and FAQ all reflow correctly; fix and re-screenshot per CLAUDE.md's "at least 2 comparison rounds" rule.
- **T19** `[P]` `[Polish]` Confirm no `transition-all` usage, every interactive element (FAQ summaries, CTA button, nav links) has visible hover/focus-visible/active states, and heading hierarchy is sequential (`h1` → `h2` per section → `h3` per step) across the finished page.

**Final checkpoint**: both `index.html` and `how-it-works.html` served locally with no console errors, no dead `#` nav links between them, T17's content-rules check passed, and the page holds up at both desktop and mobile widths.
