# Product Spec — Support Worker Connection App

**Status**: Draft · **Created**: 2026-08-11 · **Updated**: 2026-09-11 (LAC/Support Coordinator notification synced to the decision made in `HOW_IT_WORKS_PAGE_SPEC.md` §2 — see Open Question #2) · **Brief**: `PLANNING.md` (Support Worker Connection App — Project Plan)

---

## 1. Purpose & who it's for

This app helps families, guardians, and carers of people on the NDIS find independent support workers near them — and helps independent support workers find local families who need their help. It is a **discovery** service: it introduces the two sides to each other and gets out of the way. It does not employ anyone, does not handle any payment for care, and does not manage or supervise the working relationship once it starts. **It is free for families** — parents, guardians, and carers never pay to use it; support workers pay a small monthly subscription instead (see [Feature list](#6-feature-list)).

## 2. The problem / why now

Families looking for independent support workers currently have no dedicated, trustworthy way to find them locally — and independent support workers have no dedicated way to find local families who need them. Families need confidence that anyone they find has genuine, checked, up-to-date credentials. Workers need a simple, affordable way to be found.

## 3. Who uses it

- **Family / Guardian / Carer** — creates a profile describing the support needed, searches for and reviews workers, and expresses interest in the ones who look right.
- **Support Worker (Independent Support Worker / ISW)** — creates a verified profile, becomes visible to searching families, and gets notified when someone is interested.
- **LAC or Support Coordinator** — not contacted by the app directly. Once a family has connected with a worker, they're recommended to loop their own LAC or Support Coordinator in themselves so the arrangement can be formalised in the NDIS plan. NearCare doesn't hold LAC/Support Coordinator contact details and doesn't notify them on a family's behalf (decided in `HOW_IT_WORKS_PAGE_SPEC.md` §2). Whether they ever log into the app themselves directly is unsettled — see [Open Questions](#10-open-questions-for-the-user).

## 4. User journeys

### Journey 1 — Support Worker builds a verified profile (P1) 🎯 MVP

You sign up as a support worker. You enter your details, your employment structure (independent with an ABN, subcontractor, or employed by a provider company), your work preferences, and your years of experience, and upload your resume. You upload your compliance checks — Working With Children Check, NDIS Worker Screening, and police check — each with its expiry date, plus your personal liability insurance details and proof of driver's licence. You provide an emergency contact. Your documents are reviewed, and you set up your ~$5/month subscription at some point in this process (exact order — before or after review — is unsettled, see [Open Questions](#10-open-questions-for-the-user)). Once approved and subscribed, your profile goes live and you become visible to searching families.

**Why this priority**: without verified workers, there is nothing for families to find — this is the foundation the whole marketplace depends on.

**Done when**: a worker can complete sign-up, submit every mandatory document, subscribe, and see their own profile move from "pending review" to "live."

**Acceptance**:
- *Given* a worker has filled in all mandatory fields and uploaded all required documents, *when* they submit their profile, *then* it enters a "pending review" state and is not yet visible in family search results.
- *Given* a worker's profile has been approved, *when* a family searches in their area, *then* the worker's profile can appear in the results.
- *Given* a worker has not provided a mandatory document or field, *when* they try to submit, *then* they are told exactly what's missing.

### Journey 2 — Family searches for and reviews support workers (P1) 🎯 MVP

You sign up as a family, guardian, or carer. You describe the support needed, the hours required, your funding type (self-managed, plan-managed, or NDIA-managed), and your postcode/area. You can optionally add diagnoses/conditions, preferences, and notes. You select "search for support workers in my area" and get a ranked list — best matches first, but other nearby workers still show further down. Each result shows the worker's name, years of experience, work preferences, resume, ratings (if any), and a fit indicator explaining why they're ranked where they are. You open a worker's profile to see the full picture before deciding.

**Why this priority**: this is the core value a family comes to the app for — finding and evaluating workers.

**Done when**: a family can complete their profile, run a search, and open at least one worker's full profile from the results.

**Acceptance**:
- *Given* a family has completed their profile and run a search, *when* results are returned, *then* they are ranked, not hard-filtered, and each carries a visible fit indicator.
- *Given* no workers are available nearby, *when* a family searches, *then* they are told clearly rather than shown an empty, unexplained list.
- *Given* a family opens a worker's profile, *when* they view it, *then* they see the same detail fields listed in the [screen inventory](#5-screen--page-inventory) — never a photo or identifying detail of the person being supported, because the app never asks for or shows that.

### Journey 3 — Family expresses interest and connects (P1) 🎯 MVP

Having found a worker who looks right, you select "Express Interest" — there's no open-ended cold messaging. The worker is notified that a family is interested. From here, a limited in-app chat opens so you can sort out details; personal phone numbers or emails aren't exchanged up front. Once you've connected, if you have a LAC or Support Coordinator on record, you're reminded to loop them in yourself so the arrangement can be formalised in your NDIS plan — NearCare doesn't hold their contact details or notify them automatically. If you don't have one, you're shown an alternative pathway (a template you can send, and information on managing the process yourself). If either of you chooses to move the conversation off the app (e.g. to phone or WhatsApp), that's your own choice and at your own risk.

**Why this priority**: expressing interest and connecting is the entire point of a successful search — without it, the app is a directory, not a marketplace.

**Done when**: a family can express interest in a worker, the worker is notified, both sides can exchange at least one in-app message, and the correct next step (a reminder to loop in their own LAC/Support Coordinator, or the no-LAC alternative) is shown.

**Acceptance**:
- *Given* a family selects "Express Interest," *when* the action completes, *then* the worker receives a notification and the family sees confirmation.
- *Given* a family has a LAC/Support Coordinator on record, *when* they connect with a worker, *then* they're shown a reminder to loop that person in themselves — NearCare does not contact the LAC/Support Coordinator on the family's behalf.
- *Given* a family without a LAC/Support Coordinator expresses interest, *when* the action completes, *then* they are shown the alternative self-managing pathway.
- *Given* an interest has been expressed, *when* either party opens the conversation, *then* they can send and receive in-app messages without having shared personal contact details.

### Journey 4 — Worker receives search alerts (P2)

As a subscribed worker, when a family runs a search that matches your profile, you're notified — even before they've looked at your specific profile — so you know there's local demand and can decide whether to update anything.

**Why this priority proposed as P2**: this is part of what the $5/month subscription pays for ("keep a profile live **and** receive alerts") — so deferring it means early paying workers get less than advertised for a while. See [Open Questions](#10-open-questions-for-the-user).

**Done when**: a subscribed worker receives a notification when a matching family search occurs in their area.

**Acceptance**:
- *Given* a subscribed worker's profile matches a family's search criteria, *when* the family runs that search, *then* the worker receives a notification.
- *Given* a worker's subscription has lapsed, *when* a matching search occurs, *then* they do not receive an alert.

### Journey 5 — Both sides leave structured feedback (P2)

After you've genuinely engaged with someone through the app, you can leave feedback — not a single star rating, but structured feedback across things like reliability, communication, and punctuality. Cancellations and no-shows are tracked separately from quality feedback, since a pattern of no-shows is a different problem to poor quality of care.

**Why this priority**: valuable for trust over time, but not required for the first successful match to happen.

**Done when**: a user who has genuinely engaged with the other party can submit structured feedback, and it's visible on that person's profile to future searchers. A pattern of poor feedback or repeated no-shows/cancellations feeds into whether a worker is removed from the platform.

**Acceptance**:
- *Given* two parties have genuinely engaged (see [Open Questions](#10-open-questions-for-the-user) for what counts), *when* either submits feedback, *then* it's recorded under separate categories, not a single star score.
- *Given* a user has not genuinely engaged with someone, *when* they try to leave feedback, *then* they're not able to.
- *Given* a worker has multiple recorded no-shows/cancellations, *when* this is reviewed, *then* it's visible as a separate pattern from their quality feedback.

### Journey 6 — Either side reports or blocks the other (P2)

If you feel unsafe or unhappy with how someone is behaving, you can report or block them directly from the app. Workers can flag families as unsafe or difficult, just as families can flag workers. A report can lead to a profile being suspended.

**Why this priority proposed as P2**: reporting/blocking is essential to trust and safety, and there's a real question whether a marketplace connecting families (including those supporting children) with in-home carers should launch without it — see [Open Questions](#10-open-questions-for-the-user).

**Done when**: either a family or a worker can report or block the other party, and a report can result in the reported profile being suspended.

**Acceptance**:
- *Given* a user wants to report another user, *when* they submit a report, *then* it's recorded and the reported profile can be actioned (e.g. suspended) as a result.
- *Given* a user blocks another user, *when* the block is active, *then* the blocked user can no longer contact them or appear in their results.

### Journey 7 — Featured/promoted placement (P3)

A worker can pay extra to appear closer to the top of relevant search results. Any promoted result is clearly labelled "Promoted" so families always know the difference between a strong match and a paid placement.

**Why this priority**: a future revenue idea, explicitly backlog — not needed for the marketplace to work.

**Done when**: a worker can opt into promoted placement, and every promoted result is visibly labelled as such.

**Acceptance**:
- *Given* a worker has promoted placement active, *when* they appear in a relevant search, *then* their result is labelled "Promoted."
- *Given* a worker without promoted placement ranks higher on genuine fit, *when* results are shown, *then* they still appear above a lower-fit promoted worker (promotion boosts visibility, it doesn't override the fit ranking).

### Journey 8 — Affiliate recommendations to workers (P3)

Support workers are shown relevant third-party services (e.g. an accounting/tax service suited to independent contractors) as optional recommendations.

**Why this priority**: a future revenue idea, explicitly backlog.

**Done when**: a worker can see and click through to a recommended third-party service from within the app.

**Acceptance**:
- *Given* a worker is logged in, *when* they view the recommendations area, *then* they see clearly-labelled third-party service recommendations, not something that reads as part of the app's own core function.

---

## 5. Screen / page inventory

### Family / Guardian / Carer
- **Sign up / Login**
- **Family Profile** (create/edit): needs, hours required, funding type, postcode/area, optional diagnoses/preferences/notes
- **Search**: "Search for support workers in my area" action
- **Search Results**: ranked list — name, years of experience, work preferences, resume link, ratings (if any), fit indicator
- **Worker Profile (detail view)**: full profile as visible to families
- **Express Interest confirmation**
- **Messages / In-app Chat**
- **Loop-in-your-coordinator reminder** (shown after connecting, when the family has a LAC/Support Coordinator on record), or **no-LAC alternative pathway** (template + self-managing resources)
- **Notifications inbox**
- **Feedback form** (after genuine engagement)
- **Report / Block a worker**
- **Account settings** (including data deletion request)
- **Safety resources** (links to DCJ mandatory reporting guides, NDIS reporting)

### Support Worker (ISW)
- **Sign up / Login**
- **Worker Profile** (create/edit): mandatory + optional fields
- **Compliance Documents**: upload and status for the three compliance checks with tracked expiry dates — Working With Children Check (WWCC), NDIS Worker Screening, and police check — plus supporting documents without stated expiry tracking: personal liability insurance details, proof of driver's licence, and resume (exact expiry-tracking scope is unsettled, see [Open Questions](#10-open-questions-for-the-user))
- **Subscription / Billing**: ~$5/month, manage or cancel
- **Search Alerts / Notifications inbox**
- **Messages / In-app Chat**
- **Interest Received**: families who've expressed interest
- **Feedback Received / Ratings view**
- **Report / Block a family**
- **Account settings** (including data deletion request)
- **Promoted placement** (P3) and **Recommendations** (P3)

---

## 6. Feature list

**Profiles & onboarding** — family profile creation; worker profile creation; mandatory vs optional field capture for both roles; document upload for compliance credentials and resume.

**Verification & trust** — document upload plus review (not free-text self-report); credential expiry tracking; automatic profile hiding when a credential lapses; subcontractor arrangement verification; prevention of banned users re-registering under a new identity.

**Search & matching** — search-and-suggest by local area; ranked (not hard-filtered) results; fit indicator shown per result.

**Connection** — "Express Interest" action; in-app messaging; a post-connection reminder for families to loop in their own LAC/Support Coordinator (not an automatic notification — NearCare doesn't hold that contact information); alternative self-managing pathway for families without one.

**Safety** — reporting; blocking; profile suspension; two-way flagging (workers can flag families too); links out to DCJ/NDIS authorities for serious incidents.

**Feedback** — structured, multi-category feedback gated behind genuine engagement; separate tracking of cancellations/no-shows.

**Subscription** — worker subscription (~$5/month) to stay visible and receive search alerts.

**Future (P3 / backlog)** — promoted placement; affiliate recommendations to workers.

---

## 7. Rules & behaviour

- **The person being supported has no dedicated field anywhere in the app.** There is no photo upload and no "name of the person receiving care" field — only the family/guardian/carer's own details and a description of the support needed. Free-text fields (support needs, notes, in-app messages) can't be stopped from mentioning that person incidentally; anything that looks like it does is flagged (a narrow, best-effort check — not a guarantee) and held for human review before it's shown to another user. This is the honest limit of what save-time screening can promise; it isn't a substitute for keeping the field itself out of the product.
- **Resumes must never identify past clients.** A worker's resume may describe the *type* of work and experience, never a past family's identifying details.
- **Credentials are reviewed, not self-declared.** Every mandatory compliance document is uploaded and reviewed before a profile goes live. (The exact wording used to describe this to families — "we verify" vs "you decide who to engage at your own risk" — is a legal decision still pending; see [Open Questions](#10-open-questions-for-the-user).)
- **Expiry auto-hides a profile for the three compliance checks.** When the WWCC, NDIS Worker Screening, or police check's expiry date passes, that worker's profile is automatically hidden from search until it's renewed and re-verified. Workers are not relied upon to self-report a lapse. Whether this same auto-hide also applies to insurance or driver's licence is unsettled — see [Open Questions](#10-open-questions-for-the-user).
- **Search is ranked, never hard-filtered.** The best matches appear first, but other nearby workers still appear further down the list rather than being excluded outright, since a less-than-perfect match may still want the work.
- **No swipe interface.** Matching is presented as a reviewable, ranked list — never a swipe-to-like mechanic.
- **No single star rating.** Feedback is structured across specific categories (e.g. reliability, communication, punctuality), and only unlockable after genuine engagement — never a drive-by rating.
- **Cancellations/no-shows are tracked separately** from quality feedback, since it's a different kind of pattern.
- **Personal contact details are not exchanged automatically.** Conversation happens through in-app messaging first; moving to phone/email/WhatsApp is each party's own choice and risk.
- **The app is not an incident-management system.** Serious concerns are pointed to the correct external authority (DCJ mandatory reporting guides, NDIS links) rather than handled inside the app.
- **Banned users cannot simply come back.** Re-registration under a new identity by someone previously removed is actively prevented.
- **Funding type affects who a family can legally engage.** The app makes this visible to families based on their stated funding type (see [Open Questions](#10-open-questions-for-the-user) for exactly how this shows up in search).

---

## 8. Won't do / Non-goals

- Does **not** employ support workers, or act as their employer in any way.
- Does **not** process payments or invoicing for the actual care/support work between families and workers.
- Does **not** supervise, manage, or mediate the caregiving relationship or any dispute that arises from it.
- Does **not** use a swipe-style matching interface.
- Does **not** use a single star "popularity contest" rating.
- Does **not** provide a photo upload or a dedicated field for the identity of the person being supported, anywhere — that door simply isn't opened. Does not guarantee free text can never incidentally mention them; see §7 for the screening/review approach that mitigates (not eliminates) that risk.
- Is **not** an incident-management or mandatory-reporting system.
- Does **not** handle in-app payments/invoicing for support services in this version (explicitly deferred).
- Does **not** offer a multilingual interface in this version (backlog).
- Does **not** include dedicated accessibility work (e.g. screen-reader support) in this version — deferred to backlog, though it will be revisited given the audience.
- Does **not** offer promoted placement or affiliate recommendations until P3.

---

## 9. Done when I can…

- As a family, create a profile describing the support we need and search for workers in my area.
- As a family, see a ranked list of workers and understand why each one is ranked where it is.
- As a family, view a worker's experience, preferences, and resume before deciding anything.
- As a family, express interest in a worker without giving out my phone number first.
- As a family with a LAC or Support Coordinator, be reminded to loop them in myself once I've connected with a worker — NearCare doesn't contact them automatically.
- As a family without a LAC or Support Coordinator, be given a clear way to sort that out myself.
- As a support worker, build a profile, upload my compliance documents, and know exactly what's verified and what's expiring.
- As a support worker, know my profile will automatically disappear from search if one of my checks lapses — and understand why.
- As a support worker, subscribe for about $5/month to stay visible and get notified when local families are searching.
- As either a family or a worker, report or block someone I feel unsafe with.
- As either a family or a worker, leave structured feedback after we've actually engaged — not a drive-by star rating.

---

## 10. Open Questions for the User

1. **"Local area" definition** — is a search based on a radius (and if so, what default/adjustable distance?) or postcode matching? How should the experience differ in regional/remote areas where very few or zero workers may be available nearby?
2. ~~LAC/Support Coordinator notification — ready for v1?~~ → **Resolved** (see `HOW_IT_WORKS_PAGE_SPEC.md` §2): dropped the automatic-notification concept for now — kept in the background as a possible future feature, not built. Families are instead shown a reminder to loop in their own LAC/Support Coordinator themselves once they've connected with a worker. NearCare doesn't hold LAC/Support Coordinator contact details and doesn't act on a family's behalf, which sidesteps the original legal-confirmation concern (regulated NDIS provider territory) for this version.
3. **The no-LAC alternative pathway** — what exactly should a family without a LAC/Support Coordinator see? A template email they send themselves, a fully drafted resource page, both — and is anything auto-sent on their behalf, or is it always handed to them to action?
4. **Funding type enforcement** — when a family's funding type (self-managed / plan-managed / NDIA-managed) restricts who they can legally engage, should the app filter out ineligible workers from their search entirely, just warn/flag them, or simply display the information and leave the decision to the family?
5. **Minimum worker age** — is there a minimum age to register as a support worker, given some compliance checks (e.g. Working With Children) may have age-related nuances for under-18s?
6. **What counts as "genuine engagement"** to unlock feedback — after Express Interest is sent? After a certain number of in-app messages? After a set amount of time has passed?
7. **Document review process** — who reviews uploaded compliance documents (platform staff via an internal review screen, or an outside process not built into the app for v1)? What happens if a document is rejected — can the worker resubmit, and are they told why?
8. **Duplicate/fake profile prevention** — how strictly should this be enforced for v1 (e.g. email verification only, phone verification, ID matching)?
9. **Platform — website or app?** Should this be a website you open in a browser, or a downloadable app for iOS/Android (or both)? This significantly changes what the experience feels like, so it needs a decision rather than a default. (Note: journeys in this spec use platform-neutral language like "select" rather than "tap"/"click" until this is settled.)
10. **Worker onboarding-to-paid flow** — does a new worker get any kind of free period before the $5/month subscription is required, is payment required before submitting a profile for review at all, or does review happen first and payment only unlocks going live? The order genuinely isn't settled.
11. **Expiry-tracking scope** — does the "auto-hide on lapse" safety rule apply only to the three compliance checks (WWCC, NDIS Worker Screening, police check), or also to personal liability insurance and driver's licence?
12. **Verification wording** — the exact language used on worker profiles and in the T&Cs to describe what's been verified (e.g. "we verify" vs "you decide who to engage at your own risk") needs legal sign-off before it can be shown to users. Should the spec hold a placeholder here until that's back, or does a preferred wording already exist to check with the lawyer?
13. **Subcontractor verification depth** — is a resume upload sufficient evidence of a claimed subcontracting arrangement for v1, or should the app also verify directly with the claimed employer (stronger, but adds a step for the worker and a process for the platform)?
14. **Safety features in v1** — this draft proposes reporting/blocking (Journey 6) and search alerts (Journey 4) as P2. Given the audience (some families are arranging in-home carer access for children), should reporting/blocking move into the P1 MVP? And since search alerts are described in the brief as part of what the subscription pays for, should that also move to P1 so early paying workers get the full advertised value from day one?
15. **Data retention** — how long is a user's data (family or worker) kept after they close their account or after inactivity? This affects what the account settings / data deletion screen actually promises the user.
16. **Editing compliance documents** — when a worker updates an already-verified compliance document, does that trigger re-review before the profile is visible again, or does the old verification stand until its own expiry? This affects how "safe" the platform can claim to be at any given moment.

---

## 11. Assumptions

*(Reasonable defaults taken where the brief was silent — flag any of these you want to change.)*

- **Login** is standard email + password (or similar) account creation for both roles — no third-party social login assumed.
- **Notifications** (interest received, credential expiring, message received, search alert) are delivered both in-app and by email.
- **Chat** is text-only in this version — no voice or video calling inside the app.
- **The fit indicator** is shown as a simple label (e.g. "Strong match" / "Possible match") rather than a numeric percentage score.
- **English-only** interface for this version (multilingual support is explicitly backlog).
- **One account holder per family profile** — a single parent/guardian/carer login, not a shared multi-user account, for this version.
- **Worker subscription** is a standard recurring monthly payment, cancellable at any time (exact point in onboarding it's collected is Open Question #10, not assumed here).
- **The rest of a worker's profile** (outside compliance documents — see Open Question #16) can be edited freely without triggering re-review.
