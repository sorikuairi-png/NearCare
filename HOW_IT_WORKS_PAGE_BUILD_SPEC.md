# Build Spec — "How It Works" Page (NearCare)

**Status**: Locked · **Date**: 2026-08-14 · **Product Spec**: `HOW_IT_WORKS_PAGE_SPEC.md` (locked)

---

## 1. Summary

Build a second static HTML page, `how-it-works.html`, sibling to the existing `index.html`, sharing its exact design system (Tailwind CDN config, custom CSS, fonts, header/footer markup, scroll-reveal and mobile-menu JS). The page renders the four-step family journey as static content, an FAQ built with native `<details>/<summary>` elements (no custom JS), a repeated trust strip, and a closing search CTA that intentionally matches the homepage's current non-functional placeholder search field. Both `index.html`'s nav instances get their "How It Works" link pointed at the new page instead of `#`.

No backend, no build step, no new dependencies — this is a content page on top of the same static architecture the site already uses.

## 2. Technical context

- **Language/stack**: HTML5, Tailwind CSS via CDN (JIT-compiled in-browser, same `tailwind.config` block as `index.html`), vanilla JS (two small existing snippets: mobile-menu toggle, reveal-on-load) — no framework, no bundler.
- **Dependencies**: none added. `puppeteer` (already in `package.json`) remains a local dev tool for screenshot QA only, not a runtime dependency of the page.
- **Storage**: none — fully static content, nothing persisted.
- **Testing**: manual visual QA via the project's existing `screenshot.mjs` workflow; no automated test framework exists in this repo and none is introduced here.
- **Target platform**: modern desktop + mobile browsers, mobile-first responsive — same target as `index.html`.
- **Serving**: local dev via `node serve.mjs` (existing static file server) at `http://localhost:3000/how-it-works.html`.
- **Constraint**: no build/bundle step — must stay consistent with the rest of the repo (CLAUDE.md's "single self-contained HTML file" default).

## 3. Architecture

Two independent, self-contained static HTML documents (`index.html`, `how-it-works.html`), each carrying its own inline `<style>`, inline Tailwind theme config, and inline `<script>` — no shared includes, templating engine, or server-side rendering exists in this repo. They're linked by ordinary `<a href>` nav entries and served flat by `serve.mjs`.

```
Browser
  ├─ GET /              → index.html   (self-contained: CSS + Tailwind config + JS inline)
  └─ GET /how-it-works.html → how-it-works.html (same, duplicated design system)
serve.mjs — static file server, no routing logic, no templating
```

System of record: none — there is no data layer. Both pages are the entire "system."

## 4. Project structure

```
app_idea/
├── index.html                        (edit: 2 nav links updated, see §7)
├── how-it-works.html                 (new)
├── serve.mjs                         (unchanged — already serves any static file in root)
├── screenshot.mjs                    (unchanged — used for QA, see §12)
└── temporary screenshots/            (unchanged — QA screenshots land here)
```

No new folders, no shared asset files (see §10 for why not).

## 5. Data model

Not applicable. No entities, no database, no dynamic data — every piece of content on the page (step copy, FAQ questions, trust-strip labels) is static text written directly into the HTML.

## 6. Interfaces / APIs / contracts

None. The page's search field submits nothing (`onsubmit="return false;"`, identical to the homepage's current inert search form) — this intentionally matches the homepage's non-functional placeholder state, per the locked Product Spec's resolved Open Question on search behaviour. No form posts anywhere, no fetch calls, no third-party APIs beyond the existing Google Fonts + Tailwind CDN `<script>`/`<link>` tags already used on the homepage.

## 7. Technical flows

**Journey 1 — A family reads the full process and starts a search (P1) 🎯 MVP**

- **Page `<head>`**: its own `<title>` ("How It Works — NearCare") and `<meta name="description">` distinct from the homepage's, since this page is architected as a fully independent document (§3) with no shared includes — copying the homepage's title/description verbatim would be a real tab-identity/SEO bug, not a cosmetic one.
- **Header/intro block**: a dedicated section at the top of the page carrying the page's actual `<h1>` (e.g. "How It Works") and a one-line framing sentence, styled consistently with the homepage's section-intro pattern (`font-display` heading, eyebrow label + icon like the homepage's "HOW IT WORKS" eyebrow at index.html:331–334). This is what §8's heading-hierarchy claim (`h1` → per-section `h2` → per-step `h3`) actually rests on — it was missing from the first draft of this flow and is now made explicit.
- Page then renders as a single scrolling document. Four `<section>` blocks — "Tell us what you need," "Browse a ranked, verified shortlist," "Message safely, on your terms," "Express interest, connect, and loop in your Support Coordinator" — each reusing the homepage's existing step-card visual pattern (icon chip: `w-11 h-11 rounded-xl bg-mist-100` + inline SVG, `font-display` heading, `text-ink-400` body copy) and the exact same load-triggered entrance-animation snippet already in `index.html` (see the note on `.reveal` below).
- The "what if there's no one near me yet" answer is written directly into Step 1's copy (plain prose, not a separate interactive element) — this satisfies the Product Spec requirement that Journey 1 not depend on the FAQ (Journey 2) to be complete.
- **Step 4 gets a distinct internal structure**, not one undifferentiated paragraph, because the Product Spec (§5) specifically requires the LAC/Support Coordinator recommendation to be "a clearly-separated recommendation" within the step: the "Express Interest" / connect explanation renders as the step's normal body copy, then the recommendation renders as its own visually distinct callout card directly beneath it (e.g. `bg-mist-100 rounded-2xl` sub-card with its own small icon, echoing the homepage's tile-card treatment) carrying copy to the effect of "Once you've found the right fit: it's recommended you contact your own LAC or Support Coordinator yourself — NearCare doesn't hold that contact information or do this automatically." The visual separation is the mechanism that makes the non-automation framing legible at a glance, not just present in the text.
- **Trust strip needs its own background decision**, because on the homepage it only works visually inside the dark hero section (`text-white/40`/`text-white/50` over `bg-green-950/40`, index.html:313–323) — a literal copy onto this page's white sections would be illegible. On this page the trust strip renders inside its own solid dark band (`bg-green-900`, full-bleed section, same text colours/opacities as the homepage version), placed directly under the Step 4 section so the page gets a visual break before the FAQ/CTA, mirroring how the homepage uses a dark strip as a section divider.
- Closing CTA section reuses the homepage's `.search-field` component (rounded pill, postcode input, `Search Workers` button) with the same inert `onsubmit="return false;"`.
- Nav fix: in **both** `index.html` and the new `how-it-works.html`, the two "How It Works" `<a>` tags (desktop nav `li`, mobile nav `li`) change from `href="#"` to `href="how-it-works.html"`.

**Note on `.reveal`**: `index.html`'s own code comment is explicit that this is *load-triggered, not scroll-gated* — a plain `requestAnimationFrame` call on page load that adds the `.in` class to every `.reveal` element, with no `IntersectionObserver` or scroll listener involved. The new page must copy this exact snippet verbatim (CSS + the `requestAnimationFrame` block), not implement an actual scroll-triggered reveal — a real scroll-driven version would be new JS, a new bug surface, and a silent divergence from the homepage's real behaviour.

**Journey 2 — A family checks a specific worry before continuing (P2)**

- FAQ implemented as a stack of native `<details><summary>...</summary>...</details>` elements — zero custom JS. This is deliberately chosen over a hand-rolled JS accordion (see §9): it's fully keyboard- and screen-reader-accessible out of the box, works with JS disabled, and adds no bug surface.
- Visual styling: each `<details>` styled as a card (`bg-white shadow-card rounded-2xl`), `<summary>` shows the question + a chevron icon; the chevron's open/closed rotation is done in pure CSS (`details[open] svg { transform: rotate(180deg) }`, transitioning `transform` only — consistent with the project's "animate only transform/opacity, never `transition-all`" rule).
- Content: the five default questions from the Product Spec (§11), each answer written in the same general/safe wording as Step 2 of the main flow (no overclaiming on verification detail, consistent with the locked Product Spec).

## 8. Edge cases, failure modes & security

- **JavaScript disabled**: FAQ still fully functions (native `<details>`/`<summary>` needs no JS). The existing `.reveal` load-triggered entrance animation already has a `<noscript>` fallback in `index.html` (`.reveal{opacity:1!important}`) — the same `<noscript>` block is duplicated in the new page. Mobile menu toggle becomes inert without JS, same known limitation the homepage already has — not a new gap introduced by this page.
- **Placeholder images fail to load** (`placehold.co` unreachable): `alt` text already covers this, same pattern as the homepage.
- **No workers found nearby**: purely static prose in Step 1 — no dynamic empty-state logic is needed since search isn't wired to real results yet (per §6).
- **Security**: fully static page, no user input is transmitted or persisted anywhere (search form is inert), no new third-party scripts beyond the ones the homepage already loads (Tailwind CDN, Google Fonts). No secrets, no auth, no XSS surface beyond what `index.html` already carries.
- **Accessibility**: reuses the homepage's existing `focus-visible` outline patterns on every interactive element (nav links, CTA button, FAQ summaries automatically get native focus handling); heading hierarchy is sequential (page `h1` in the header/intro block → per-section `h2` → per-step `h3`), matching the homepage's pattern; decorative icons get `aria-hidden="true"` as they already do on the homepage.

## 9. Dependencies & justification

- **No new dependencies.** Continues using the Tailwind CDN script and Google Fonts (Sora/Inter) already loaded by `index.html` — justified by consistency and zero build-step overhead, matching CLAUDE.md's stated defaults.
- **Native `<details>/<summary>` for the FAQ**, instead of a hand-rolled JS accordion or a component library — the simplest option available, accessible by default, and adds no maintenance surface. Directly follows the "stability over cleverness" rule: every hand-rolled interactive widget is a bug surface, and this one is avoidable entirely.

## 10. Complexity tracking

- **Considered and rejected: extracting shared CSS/JS into a common `styles.css`/`site.js` file** to avoid duplicating the ~140-line custom `<style>` block and the two JS snippets across two HTML files. Rejected for now because: (a) the project has been built as single self-contained files from the start (CLAUDE.md's stated default), (b) only two pages exist today, so the duplication cost is small, and (c) introducing a shared-asset file would be the first architectural departure from that pattern and deserves its own decision, not a side effect of this page. **Flag for later**: if a third page is added, revisit extracting shared assets — the duplication cost stops being trivial at that point.
- No other complexity added. This is a static content page built entirely from patterns the homepage already establishes.

## 11. Slicing / milestones

- **v1 (MVP = Journey 1, P1)**: four-step page content, trust strip, closing CTA, both nav links fixed (homepage + new page). This alone satisfies the Product Spec's "Done when I can…" bar for the core read-through-and-search flow.
- **Fast-follow (Journey 2, P2)**: FAQ section (`<details>` list, five default questions).
- **Later (P3)**: none defined in the Product Spec for this page.

## 12. Testing & validation gates

- `node serve.mjs` running locally; page reachable at `http://localhost:3000/how-it-works.html` with no console errors.
- `node screenshot.mjs http://localhost:3000/how-it-works.html` captured and visually reviewed at the default viewport, per CLAUDE.md's screenshot workflow (at least one comparison/fix pass before calling it done).
- Manual click-through: clicking "How It Works" in both the desktop and mobile nav from `index.html` lands on the new page (not a `#` no-op); the closing CTA is visibly present and matches the homepage's search field styling; each FAQ item opens/closes via mouse click and via keyboard (Tab to focus, Enter/Space to toggle) with no JS errors.
- **Content-rules check** (separate from the mechanical checks above): before calling this page done, the final copy is read back against the locked Product Spec's §7 Rules specifically — confirms the LAC/Support Coordinator wording never implies automation, no fabricated statistics were introduced beyond what the homepage already shows, the person being supported is never named/shown, and no worker pricing/subscription content crept in. This is a deliberate, explicit gate — not assumed to fall out of the mechanical checks — because the Product Spec calls the LAC framing legally motivated and warns against implying automation "even in passing copy."
- No automated test suite exists in this repo; none is introduced for this page, consistent with the rest of the project.

## 13. Traceability table

| Product Spec item | Where it's built |
|---|---|
| §4 Journey 1 — read full process, reach search (P1) | §7 Journey 1 flow — four `<section>` step blocks + closing CTA in `how-it-works.html` |
| §4 Journey 1 acceptance — nav link lands on real page | §7 Journey 1 flow — nav `href` fix in both `index.html` and `how-it-works.html` |
| §4 Journey 1 acceptance — "what if no one nearby" answered inline, not FAQ-gated | §7 Journey 1 flow — written into Step 1 copy directly |
| §4 Journey 1 acceptance — LAC/SC recommendation (not automatic) explained at connect stage | §7 Journey 1 flow — Step 4's separated callout card |
| §4 Journey 1 acceptance — search action matches homepage's placeholder state | §6 Interfaces — inert `onsubmit="return false;"`, same as homepage |
| §4 Journey 2 acceptance — visitor finds a direct answer to a question not covered by the 4 steps | §7 Journey 2 flow — `<details>/<summary>` FAQ list |
| §4 Journey 2 acceptance — FAQ wording stays consistent with Step 2's general framing, doesn't overpromise | §7 Journey 2 flow — "same general/safe wording as Step 2" |
| §5 Header/intro | §7 Journey 1 flow — dedicated header/intro block with the page's `<h1>` + one-line framing (added on review; see note under Journey 1 flow) |
| §5 Step 1 — Tell us what you need (+ no-one-nearby) | §7 Journey 1 flow |
| §5 Step 2 — Browse ranked, verified shortlist (general "verified" wording) | §7 Journey 1 flow — Step 2 section, safe wording per locked Product Spec |
| §5 Step 3 — Message safely | §7 Journey 1 flow — Step 3 section |
| §5 Step 4 — Express interest, connect, loop in Support Coordinator | §7 Journey 1 flow — Step 4 section |
| §5 Reassurance/trust strip | §7 Journey 1 flow — trust strip section on its own solid dark band (`bg-green-900`), content copied from homepage, background/contrast decision made explicit on review |
| §10 Open Question #6 — no-LAC-at-all guidance (not yet decided, defaults to "nothing extra") | §7 Journey 2 flow / §11 default FAQ list — the default question "What if I don't have a Support Coordinator or LAC?" covers this; no additional dedicated section built beyond that, consistent with the Product Spec's stated default |
| §5 Expandable question list | §7 Journey 2 flow — FAQ `<details>` list |
| §5 Closing call to action | §7 Journey 1 flow — closing CTA section |
| §6 Step-by-step process explanation | §7 Journey 1 flow |
| §6 Post-connection guidance | §7 Journey 1 flow — Step 4 |
| §6 Expandable question list | §7 Journey 2 flow |
| §6 Repeated trust strip | §7 Journey 1 flow |
| §6 Search entry point | §6 Interfaces + §7 Journey 1 flow |
| §6 Nav link fix | §7 Journey 1 flow |
| §7 Rule — no claims beyond what's decided | §7 flows — Step 2/4 wording sourced directly from locked Product Spec §2/§5 |
| §7 Rule — NearCare doesn't hold/contact LAC/SC | §7 Journey 1 flow — Step 4 copy |
| §7 Rule — person being supported never named/shown | §7 Journey 1 flow — no such content exists on this page |
| §7 Rule — no fabricated stats/testimonials | §7 Journey 1 flow — trust strip numbers copied verbatim from homepage, no new figures introduced |
| §7 Rule — no worker pricing on this page | §7 Journey 1 flow — Step 4 stays family-facing only, no subscription mention |
| §8 Non-goals — no For Support Workers duplication | Out of scope — not built |
| §8 Non-goals — no worker pricing | Out of scope — not built |
| §8 Non-goals — no automatic LAC/SC notification implied | §7 Journey 1 flow — Step 4 copy uses recommend-yourself framing only, in its own separated callout so the framing is visually unambiguous |
| §8 Non-goals — PRODUCT_SPEC.md not updated | Confirmed — no edits made to that file (per user instruction; it's a fixed reference) |
| §8 Non-goals — no new product feature, purely explains what exists/was decided | §1 Summary + §5 Data model — confirmed no new functionality, entities, or endpoints are introduced anywhere in this spec |
| §8 Non-goals — no interactive demo/simulated results | Out of scope — not built |
| §8 Non-goals — no fabricated testimonials/photos | §7 Journey 1 flow — only placeholder imagery in the existing site's style, no invented testimonials |
| §9 Done when — nav link works | §7 Journey 1 flow |
| §9 Done when — full process readable in order incl. no-one-nearby | §7 Journey 1 flow |
| §9 Done when — "verified" understood in general terms | §7 Journey 1 flow — Step 2 |
| §9 Done when — LAC/SC recommendation understood | §7 Journey 1 flow — Step 4 |
| §9 Done when — FAQ answers available | §7 Journey 2 flow |
| §9 Done when — reach Search Workers action from this page | §7 Journey 1 flow — closing CTA |
| §11 Assumption — family-facing only | §1 Summary — scope confirmed |
| §11 Assumption — single scrolling page | §3 Architecture |
| §11 Assumption — reuses existing visual language | §2 Technical context, §9 Dependencies |
| §11 Assumption — own URL, not homepage anchor | §4 Project structure — `how-it-works.html` as its own file |
| §11 Assumption — steps don't map 1:1 to teaser icons | §7 Journey 1 flow — four sections as newly structured, not lifted verbatim |
| §11 Assumption — search field once, at bottom only | §7 Journey 1 flow — closing CTA only, no header search field |
| §11 Assumption — placeholder-image visual treatment | §7 Journey 1 flow — placehold.co images per section, same as homepage |
| §11 Default FAQ content | §7 Journey 2 flow — five questions listed verbatim |
