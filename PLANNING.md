this md# Support Worker Connection App — Project Plan

> A two-sided marketplace connecting families, carers, and guardians with independent
> support workers (ISWs) for NDIS disability support. The platform is **discovery-only**:
> it facilitates connection, it does not employ workers, handle payments, or mediate the
> working relationship.

---

## Core Positioning

- **What the app does:** helps families find local support workers and helps workers find work.
- **What the app does NOT do:** employ anyone, process payments/invoicing, supervise care, or mediate disputes.
- **The central tension to manage carefully:** the more the platform *promises* to verify (Working With Children, police checks, NDIS screening), the more legal responsibility it assumes for getting that verification right. The wording that separates *"we verify credentials"* from *"you decide who to engage at your own risk"* must be drafted by a lawyer.

---

## Phase 1 — Discovery & Legal Groundwork

Do this **before** building anything.

- Engage a lawyer who knows **disability services / NDIS and platform liability** (not a generic "app lawyer").
- Get advice on the specific legal areas (see [Legal Areas](#legal-areas) below).
- Determine exactly where the platform sits between *"we verify"* and *"you decide at your own risk."*
- Investigate whether the app can integrate with **official credential-checking systems** (Working With Children, NDIS Worker Screening) for live verification — this is central to the safety promise.
- Confirm data must be **hosted on Australian servers** (local data residency) — sensitive health data on children and NDIS data cannot be stored overseas. Decide hosting (e.g. AWS/Azure Australian regions) from day one.
- Set up the right **business structure** with an accountant (sole trader vs company) and understand **tax implications** of subscription income and GST.
- Arrange **platform public liability insurance** for the business itself — the "we merely facilitate" disclaimer does not fully shield you.

---

## Phase 2 — The Two Profiles

### Family / Guardian / Carer profile

**Mandatory**
- Name and contact details
- Client's support needs (what kind of help is required)
- Hours required
- Funding type: **self-managed / plan-managed / NDIA (agency)-managed** — affects who they can legally engage
- Postcode / local area (drives the search)

**Optional (becomes filterable matching criteria)**
- Client's diagnoses or conditions
- Preferences for worker experience or specialisation
- Additional notes on what makes a good fit

**Never captured:** photos or identifying information of the person being supported.

### Support Worker (ISW) profile

**Mandatory**
- Name, date of birth, contact details
- Compliance tier (each with **expiry dates**):
  - Working With Children Check number
  - NDIS Worker Screening number
  - Police check
- Employment structure (one of):
  - Independent — with ABN
  - Subcontractor — with subcontractor details
  - Employed by a provider company — with company details
- Work preferences: client types they prefer, hours available
- **Years of experience in the industry** (used instead of/alongside age groups — a stronger signal of competence)
- Resume upload (also helps substantiate the subcontracting/employment claim)
- Personal liability insurance details
- Proof of driver's licence
- Emergency contact details

**Optional**
- Preferred client age ranges (most ISWs work with 18–65; specialists may differ)

> ⚠️ **Resume privacy note:** T&Cs must forbid resumes from including identifying details of past clients (only the *type* of work/experience). Otherwise the worker breaches a past family's privacy.

---

## Phase 3 — Verification & Safety

- Credentials are **not** self-reported free-text — require **document upload + review**, and integrate with official checking systems where possible.
- **Credential expiry tracking:** store expiry dates, flag automatically, and **auto-hide a profile** when a check lapses until it is renewed. (Workers cannot be relied on to self-report a lapse.)
- **Subcontractor verification:** confirm a claimed subcontracting arrangement is real (resume upload helps; a verification step to the claimed employer is stronger).
- **In-app messaging** rather than swapping personal numbers up front (safety + record-keeping).
- **Reporting and blocking tools**, with profile suspension.
- Prevent **fake / duplicate profiles** (stop a banned user re-registering under a new email).
- **Two-way safety:** consider letting workers flag a family as unsafe/difficult too.

---

## Phase 4 — Matching & Search

- **No swipe mechanic** — avoids the "cheesy dating app" feel and any interface/patent risk. This audience wants to feel it's serious and professional.
- Model is **search-and-suggest**: family clicks "search for support workers in my area" and gets a **ranked** list.
- **Ranked, not hard-filtered:** best matches first, but weaker/keen matches still surface further down (a worker who doesn't perfectly match may still want the work). Show a **fit / match indicator** so families see *why* someone is ranked where they are.
- Each result shows: name, years in industry, work preferences, resume, ratings (if any), and the fit indicator.
- Open questions: how "local area" is defined (radius vs postcode); how the model behaves in regional/remote areas with very few workers.

---

## Phase 5 — Ratings & Feedback

- **No single star "popularity contest."** Use **structured feedback** (e.g. reliability, communication, punctuality).
- **Gated behind genuine engagement** — no drive-by ratings.
- Feeds into decisions about when a worker is removed from the platform.
- Consider tracking **cancellations / no-shows** separately from quality ratings (a pattern issue, not a quality one).

### Incident reporting (kept deliberately light)

- The app is **not** an incident-management system.
- Families needing to report something serious are **directed straight to the proper authorities** — DCJ mandatory reporting guides and relevant NDIS links.
- Optional internal flagging (for the platform's own records) can be figured out **later**, with legal advice on what the platform can hold.

---

## Phase 6 — Business Model

- **Free for families** — parents/carers shouldn't pay, and NDIS won't fund the app.
- **Worker subscription:** ~**$5/month** to keep a profile live and receive alerts when new families are searching.
- **Discovery-only** — no payments or invoicing flow through the app.
- Seeding a two-sided marketplace is the hard part: likely **seed the family side first (free)** before charging workers, and **launch in one town first** (owning a small local market builds trust and critical mass).

### Future revenue options (backlog)
- **Featured / promoted placement:** workers pay extra to appear at the top of search results. Must be clearly labelled "Promoted" for transparency.
- **Affiliate recommendations** to accounting/tax services (e.g. Hnry) for workers — a second revenue stream without touching the financial side.
- **Payments/invoicing in-app** — only much later, once there's traction and proper advice (possibly automated via an agent workflow down the track).

---

## Post-Match Pipeline

- Family uses an **"Express Interest"** button (preferred over open-ended messaging).
- Worker is notified someone is interested.
- Limited in-app chat is allowed to sort details; if they move to WhatsApp/phone/email, that's at their own risk and the platform takes no responsibility.
- **Key value-add:** on expressing interest, the app **notifies the family's LAC or Support Coordinator** with the details, so the arrangement can be formalised properly within the NDIS plan.
- **Alternative pathway** for families *without* a LAC or coordinator — e.g. a template email or a resource/link on how to self-manage the process.

> ⚠️ **Legal flag:** this pipeline moves the app close to *guiding families through NDIS administration*. Confirm with the lawyer that this doesn't push the platform into regulated provider territory.

---

## Legal Areas

The lawyer should cover the interaction of:

- **Privacy Act & Australian Privacy Principles** — handling health info on children (the big one). Includes **data retention & deletion** obligations and account/data deletion flows.
- **Australian Consumer Law** — misleading conduct; the "we verify" vs "you decide" tension.
- **Working With Children Checks & NDIS Worker Screening** — what they certify and the platform's obligations around them.
- **Contract law** — watertight T&Cs and liability disclaimers.
- **Employment law** — confirming workers are genuinely not employees of the platform is defensible.
- **NDIS provider obligations** — whether operating in this space pulls toward registered-provider duties; whether workers employed by registered providers can pick up side work here (grey area).

---

## Liability & Insurance Summary

- **Platform (you):** your own **public liability insurance** — non-negotiable before launch.
- **Workers:** carry their own **personal liability insurance** (standard for support workers).
- **Public indemnity:** likely less critical (that's for professional advice-givers), but let the lawyer confirm.
- **Disclaimers:** T&Cs limiting platform liability help but **do not fully shield** you — you can't contract out of everything under Australian Consumer Law and general duty of care.

---

## Backlog (revisit once the core works)

- Defining "local area" (radius vs postcode) and handling regional/remote low-density areas
- Accessibility (screen-reader friendly etc. — ethical *and* good business for this audience)
- Multilingual support (many migrant families use support services)
- Data retention periods and deletion flows (also a Phase 1 legal item)
- Minimum worker age / whether under-18s can be workers given the checks
- Fake/duplicate profile prevention
- Analytics: profile-to-contact conversion, match rates, active-profile duration — to refine matching over time
- Worker cancellation/reliability tracking
- Choosing and seeding the first launch town

---

## Immediate Priorities

1. **Subcontractor verification** — resume upload as a first step; families can review actual experience/history.
2. **Incident reporting** — keep it light; direct families to DCJ / NDIS external reporting links.
3. **Launch town** — decide and seed later, once the core is built.
4. **Legal groundwork & Australian data hosting** — lock in before building.
