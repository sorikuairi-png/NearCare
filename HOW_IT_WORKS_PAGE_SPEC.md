# Product Spec — "How It Works" Page (NearCare)

**Status**: Draft, reviewed with user · **Created**: 2026-08-14 · **Brief**: "Plan out the How It Works page" — a dedicated page for the NearCare site, linked from the existing homepage nav item "How It Works" (currently a placeholder `#` link). Parent context: `PRODUCT_SPEC.md` (Support Worker Connection App).

---

## 1. Purpose & who it's for

A dedicated page that walks a family, guardian, or carer through how NearCare works, step by step, before they commit to searching. It exists to turn a curious visitor into someone who trusts the process enough to type in their postcode. It is a content/marketing page, not new app functionality — it describes journeys already defined in `PRODUCT_SPEC.md`, with one deliberate simplification decided during this spec (see §2): NearCare does **not** automatically notify a family's LAC or Support Coordinator. It recommends the family do that themselves once they've found the right fit.

## 2. The problem / why now

Right now "How It Works" on the homepage is a compressed, four-icon teaser sitting inside the homepage — good for a quick scan, but it doesn't answer the real hesitations a family has before trusting a stranger to support their family member: *How exactly are workers checked? What happens after I express interest? Do I have to give out my phone number? What if there's no one near me?* Families who click the dedicated "How It Works" nav link are actively looking for that reassurance, and right now that link goes nowhere.

**A product decision made while writing this spec:** the homepage today (`index.html`) states, unhedged, that expressing interest "automatically notifies your LAC or Support Coordinator." `PRODUCT_SPEC.md` had flagged that feature as pending legal confirmation it doesn't tip NearCare into regulated NDIS-provider territory — and holding/maintaining live LAC/Support Coordinator contact data (who's current, who's been replaced, whose job it is to keep it updated) turned out to be more complexity than this deserves right now. **Decision: drop the automatic-notification concept for now** (keep it in the background as a possible future feature, not built today). Instead, this page tells families: once you've found someone and agreed to move forward, it's recommended you contact your own LAC or Support Coordinator (where you have one) and let them know — they can then facilitate the service agreement and formal setup on their end. NearCare stays out of that process entirely; it doesn't hold LAC/Support Coordinator contact details and doesn't contact them on a family's behalf.

**Note — this decision reaches beyond this one page.** The homepage's teaser copy has now been corrected to match ("we automatically notify..." → recommends the family loop in their own LAC/Support Coordinator instead — done in `index.html`, the "LAC / Support Coordinator Notification" card is now "Loop In Your Support Coordinator"). `PRODUCT_SPEC.md` itself (Journey 3, the screen inventory, the feature list, and Open Question #2) still describes the old automatic version and has **not** been updated as part of this page spec — flagging that as a separate follow-up, since it's the master spec for the whole app, not just this page.

## 3. Who uses it

- **Family / Guardian / Carer (primary)** — arrives from the homepage nav or a search-engine result, wants to understand the process end-to-end before signing up.
- **Support Worker (secondary, incidental)** — may land here too, but their own step-by-step explanation belongs on the separate "For Support Workers" page (out of scope here) — this page can reference that page but doesn't try to explain the worker's side, including worker pricing, in the same depth.

## 4. User journeys

### Journey 1 — A family reads the full process and starts a search (P1) 🎯 MVP

You click "How It Works" from the homepage nav (or land here directly). You see the process broken into clear steps, in order: describe what support you need → browse a ranked, verified list → message safely in-app → express interest, connect, and (where relevant) loop in your own Support Coordinator. Each step has a short plain-English explanation of what happens and why it's safe — including, right in the step itself (not tucked into a separate FAQ), what happens if there's no one near you yet. By the time you reach the bottom, there's a "Search Workers" call to action so you don't have to scroll back up to the homepage to act.

**Why this priority**: this is the entire reason the page exists — a visitor arrives uncertain and leaves ready to search.

**Done when**: a visitor can read the full step-by-step process on one page, including what happens if no workers are nearby, and reach the search action without leaving the page — fully on its own, without the FAQ from Journey 2.

**Acceptance**:
- *Given* a visitor is on the homepage, *when* they click "How It Works" in the nav, *then* they land on this page (not a `#` dead link).
- *Given* a visitor is on the How It Works page, *when* they scroll through it, *then* they see each step of the family journey in order, with a plain-language explanation for each — including a direct answer to "what if there's no one near me."
- *Given* a visitor reads the final step, *when* they get to the connect stage, *then* they understand NearCare doesn't automatically notify their LAC/Support Coordinator — instead they're told it's recommended they loop that person in themselves once they've found the right fit.
- *Given* a visitor has read through the page, *when* they reach the end, *then* there is a "Search Workers" action available, behaving the same way the homepage's own search field currently behaves (placeholder, not wired to real results — see §10, resolved).

### Journey 2 — A family checks a specific worry before continuing (P2)

You have a specific doubt beyond what the four steps already cover, and you want the answer without re-reading the whole page. You find it in a short expandable question list, and either scroll back into the flow or click through to search.

**Why this priority**: strengthens trust for a subset of visitors, but the page still does its job (Journey 1) without it.

**Done when**: a visitor can find an answer to a common doubt not already covered in the four steps, without contacting support.

**Acceptance**:
- *Given* a visitor has a question not already answered by the four main steps, *when* they check the expandable question list, *then* they find a direct answer.
- *Given* the FAQ content touches verification depth (still using general wording — see §10, resolved), *when* a visitor reads it, *then* the wording stays consistent with Step 2's general framing rather than overpromising specifics.

## 5. Screen / page inventory

**How It Works page** (single scrolling page):
- **Header / intro** — short headline + one-line framing ("Here's exactly what happens, from search to support").
- **Step 1 — Tell us what you need** — describe support needs, area, funding type; explanation of what this is used for; includes what happens if very few or no workers are available nearby.
- **Step 2 — Browse a ranked, verified shortlist** — explanation of the fit indicator, and of what "verified" means, in general safe terms ("every credential is checked, not self-reported") rather than exact review-process detail, since that detail isn't settled yet (`PRODUCT_SPEC.md` Open Questions #7/#12).
- **Step 3 — Message safely, on your terms** — explanation of in-app messaging, that personal contact details aren't shared automatically.
- **Step 4 — Express interest, connect, and loop in your Support Coordinator** — explanation of the "Express Interest" action and in-app messaging leading to a direct connection; then a clearly-separated recommendation: once you've agreed to move forward, contact your own LAC or Support Coordinator (if you have one) so they can help formalise things on their end. Makes plain NearCare doesn't hold that contact information or do this automatically.
- **Reassurance / trust strip** — the same compliance-check row already on the homepage (WWCC, NDIS Worker Screening, Police Check, Public Liability Insurance), repeated here for a visitor who lands directly on this page without seeing the homepage.
- **Expandable question list** — a short list of common questions (see Journey 2). Default proposed set in §11 unless you want specific ones.
- **Closing call to action** — restates "Free for families, always" and a "Search Workers" button/postcode field.

## 6. Feature list

- **Step-by-step process explanation** — four steps, plain language, matching the family journeys defined in `PRODUCT_SPEC.md`, updated for the no-automatic-notification decision in §2.
- **Post-connection guidance** — recommends (not automates) that families loop in their own LAC/Support Coordinator once they've agreed to proceed with a worker; content only, not a new app feature.
- **Expandable question list** — a short set of questions a visitor can open one at a time to read the answer, without leaving the page.
- **Repeated trust strip** — same compliance-check content as the homepage, so this page stands alone.
- **Search entry point** — a postcode/suburb search field or button at the bottom of the page, matching the homepage's current (placeholder, non-functional) search field.
- **Nav link fix** — the "How It Works" links in the header and mobile menu (both currently `#`) point here instead.

## 7. Rules & behaviour

- **No new claims beyond what's actually been decided.** This page only describes functionality defined in `PRODUCT_SPEC.md` plus the §2 decision — it doesn't invent confidence (e.g. exact verification process detail) the product hasn't settled yet.
- **NearCare doesn't hold or manage LAC/Support Coordinator contact details, and doesn't contact them on a family's behalf.** This page must not imply otherwise, even in passing copy.
- **The person being supported is never named, shown, or implied to be identifiable** — same rule as the rest of the product, applies to any example/illustrative content on this page too.
- **No fabricated statistics or testimonials.** Any numbers (e.g. "180+ verified support workers") must match what's genuinely shown elsewhere on the live site, not an invented figure specific to this page.
- **This page doesn't explain worker-side pricing or subscription.** Anything about the ~$5/month worker subscription belongs on the "For Support Workers" page, not here.

## 8. Won't do / Non-goals

- Does **not** duplicate the full "For Support Workers" explanation — that's a separate page, only referenced/linked here.
- Does **not** explain worker pricing or the worker subscription — that belongs on the For Support Workers page.
- Does **not** describe or imply an automatic LAC/Support Coordinator notification feature — that's been dropped for now (see §2). The page recommends families notify their own LAC/Support Coordinator directly instead. (The homepage teaser has already been corrected to match — see §2.)
- Does **not** update `PRODUCT_SPEC.md` itself (Journey 3, screen inventory, feature list, Open Question #2 still describe the old automatic version) — that's the master app spec, a separate follow-up outside this page's scope.
- Does **not** introduce any new product feature — purely explains what already exists or has been decided in this spec.
- Does **not** include an interactive demo or simulated search results.
- Does **not** include real customer testimonials/photos (none exist yet) — placeholder-free, uses only what's genuinely available.

## 9. Done when I can…

- Click "How It Works" from the homepage nav and land on a real page, not a dead link.
- Read, in order, exactly what happens from describing my needs to connecting with a worker — including what happens if no one is near me.
- Understand what "verified" means, in plain, general terms.
- Understand that once I've found the right fit, it's recommended I contact my own LAC or Support Coordinator myself — NearCare doesn't do this for me automatically.
- Get answers to a short set of common questions without leaving the page.
- Reach a "Search Workers" action directly from this page, without going back to the homepage.

## 10. Open Questions for the User — resolved this round

1. ~~Verification-detail readiness~~ → **Resolved:** general safe wording now ("every credential is checked, not self-reported"); tighten later once review process/legal wording are settled.
2. ~~LAC auto-notification wording~~ → **Resolved, and rescoped:** drop the automatic-notification concept entirely for now (kept in the background as a possible future feature). This page instead recommends families loop in their own LAC/Support Coordinator themselves post-connection. The homepage's "automatically notifies" copy has been corrected to match (done — see §2). `PRODUCT_SPEC.md` itself still describes the old version and is a separate follow-up.
3. ~~Homepage teaser scope~~ → **Partially resolved:** the LAC/Support Coordinator card's wording is fixed (done). Whether the rest of the teaser section should be trimmed now that the full page exists is still deferred — revisit later.
4. ~~Search action behaviour~~ → **Resolved:** matches the homepage's current placeholder (non-functional) state; real search wiring is separate future work.

**Still open / not yet decided:**

5. **Question-list content** — no specific questions were provided; §11 proposes a default set. Flag if you'd rather write your own.
6. **No-LAC-at-all guidance** — for a family who has no LAC or Support Coordinator at all (not just "hasn't been notified yet"), does this page need to say anything beyond "you don't need to do this step"? (E.g. pointing to the existing "Safety & Verification" nav content, or a resource about service agreements for self-managed funding.) Low-stakes — can default to saying nothing extra unless you want it covered.

## 11. Assumptions

*(Reasonable defaults taken where the brief was silent — flag any of these you want to change.)*

- This page is **family-facing only** — a separate spec would cover the "For Support Workers" page's own how-it-works content.
- The page is a **single scrolling page**, not a multi-step/paginated experience.
- It **reuses the existing site's visual language** (colours, type, component style already established in `index.html`) rather than introducing a new look.
- It sits at its own URL (e.g. `/how-it-works`) rather than as an anchor-jump section back on the homepage, so the nav link can point to a real page as the brief requested.
- The four steps are informed by, but don't map one-for-one onto, the homepage teaser's four icons — Step 1 ("Tell us what you need") has no teaser counterpart today, and Step 2 folds together two teaser items (fit indicator and verified credentials). This page expands the family journey as a whole, not each teaser icon individually.
- The search field appears once, at the bottom of the page, after the explanation — not repeated near the top.
- Visual treatment for each step uses the same illustrative placeholder-image style as the rest of the site (no real product screenshots exist yet to show instead).
- **Default question-list content** (open question #5) — proposed unless you'd rather supply your own:
  - "What if there's no support worker near me yet?"
  - "What exactly gets checked before a worker's profile goes live?"
  - "Do I have to give out my phone number?"
  - "What if I don't have a Support Coordinator or LAC?"
  - "Is this really free for families?"
