# Portfolio Audit — Unfinished / Placeholder Items

Generated scan of the codebase for anything left incomplete. **Nothing here has been changed** — this is a checklist to work through one item at a time.

---

## 1. Content I need to write

- **Achievements** — only one entry exists ("Bakti BCA Scholarship, 2026"); comment marks the list as placeholder. Add the rest. — `components/Achievements.tsx:14-18`
- **Project "hardProblem" entries flagged for review** — leftover `// REVIEW:` notes; confirm or rewrite like Lawang Sewu was:
  - AI-ORBIT Solar — `data/projects.ts:98`
  - GOR Badminton — `data/projects.ts:125`
  - Orbit E-Commerce — `data/projects.ts:151`
  - Healthcare Diagnosis — `data/projects.ts:177`
- **Healthcare Diagnosis — confirm language** ("C++?" unconfirmed) — `data/projects.ts:182`
- **GOR Badminton demo-video link** — confirm you want the archived demo public — `data/projects.ts:137`

## 2. Assets I need to provide

- **Project screenshots** — every project has `images: []`, so all detail pages render "screenshot" placeholder boxes and homepage cards show gradient covers. Drop real shots in `/public/projects/<slug>/`:
  - `lawang-sewu-pos` — `data/projects.ts:82`
  - `ai-orbit-solar` — `data/projects.ts:109`
  - `gor-badminton` — `data/projects.ts:136`
  - `orbit-ecommerce` — `data/projects.ts:162`
  - `healthcare-diagnosis` — `data/projects.ts:189`
- **Verify (already present, not missing):** profile photo `public/photo.JPG`, CV `public/cv/Sebastian-Augustino-Lie-CV.pdf`, `app/favicon.ico`. The OG image (`app/opengraph-image.tsx`) and icon (`app/icon.tsx`) are generated dynamically — eyeball that they render correctly.

## 3. Accounts / services I need to set up

- **Resend API key** — `RESEND_API_KEY` is empty in `.env.local`. Until set, the contact form returns "The contact form isn't configured yet" (500). — `.env.local`, used in `app/api/contact/route.ts:60-71`
- **Sender domain** — `CONTACT_FROM_EMAIL` uses Resend's shared `onboarding@resend.dev` test sender (only delivers to your own Resend-account email). Verify your own domain for production. — `.env.example` / `.env.local`
- **Production domain** — `site.url` is the placeholder `https://sebastianaugust.vercel.app`. Drives canonical URLs, OG absolute paths, sitemap, robots, and JSON-LD. Set the real domain. — `lib/site.ts:16`
- **LinkedIn profile** — no real LinkedIn URL anywhere (see links section). — `lib/site.ts:20`

## 4. Code-level TODOs (file:line — note)

- `app/layout.tsx:23` — TODO: `metadataBase` points at the placeholder domain in `lib/site.ts`; update once real domain is live.
- `lib/site.ts:5` — TODO: replace `url` with the real production domain.
- `lib/site.ts:15` — TODO: update to the real domain (no trailing slash).
- `lib/site.ts:18` — TODO: fill in the real LinkedIn URL (JSON-LD `sameAs`).
- `lib/site.ts:20` — TODO: add the LinkedIn handle.
- `data/projects.ts:8,10` — doc note: empty fields marked with TODO; search file for TODO.
- `data/projects.ts:82,109,136,162,189` — TODO: add screenshots (per project).
- `data/projects.ts:83,84,110,138,163,164,191` — PLACEHOLDER: `liveUrl`/`sourceUrl` left `undefined`.
- `data/projects.ts:98,125,151,177,182` — REVIEW: hardProblem text / language confirmation.
- `data/projects.ts:137` — REVIEW: demo-video link, confirm public.
- `components/Achievements.tsx:14` — "Placeholders — edit as real ones land."

_(~26 marker comments total; the `placeholder=` attributes in `Contact.tsx` and the `ImagePlaceholder`/gradient-cover code in `ProjectDetail.tsx`/`Projects.tsx` are intentional design, not TODOs.)_

## 5. Broken or placeholder links

- **Contact LinkedIn — broken (missing protocol):** `href="www.linkedin.com/in/sebastianaugust"` has no `https://`, so it resolves as a relative path and 404s. — `components/Contact.tsx:30`
- **Navbar socials — placeholders:**
  - LinkedIn → `https://linkedin.com/in/placeholder` — `components/Navbar.tsx:25`
  - Instagram → `https://instagram.com/placeholder` — `components/Navbar.tsx:26`
  - Email → `mailto:placeholder@email.com` — `components/Navbar.tsx:27`
- **Footer socials — placeholders:**
  - LinkedIn → `https://linkedin.com/in/placeholder` — `components/Footer.tsx:6`
  - Instagram → `https://instagram.com/placeholder` — `components/Footer.tsx:7`
  - Email → `mailto:placeholder@email.com` — `components/Footer.tsx:8`
- **JSON-LD LinkedIn — empty:** `linkedin: "https://www.linkedin.com/in/"` (no handle) feeds `sameAs`. — `lib/site.ts:20`
- **Project live/source links missing:** most `liveUrl`/`sourceUrl` are `undefined` (only AI-ORBIT has a source repo, GOR has a bit.ly demo). — `data/projects.ts` (lines per §4)
- **GitHub handle to confirm:** `SebastianAugust` used in Navbar/Footer/Contact/site.ts — verify it's correct (projects reference a different org, `web-shooter-3-6`).

## 6. Other issues noticed during the scan

- **Contact form is effectively stubbed** until `RESEND_API_KEY` is set — submitting returns the "isn't configured yet" error. — `app/api/contact/route.ts:64`
- **Email inconsistency:** Navbar/Footer use `placeholder@email.com`, but the Contact section uses the real `sebastianagustinolie@gmail.com`. Unify.
- **LinkedIn handle inconsistency:** `site.ts` empty vs Navbar/Footer `placeholder` vs Contact `sebastianaugust`. Pick one source of truth.
- **Social links hardcoded in 3 places** (Navbar, Footer, Contact) instead of reading from `lib/site.ts` — drift risk; `site.ts` already has `github`/`linkedin` fields meant to be the single source.
- **Placeholder domain propagates everywhere** via `site.url` — metadata, OG, sitemap, robots, JSON-LD all currently point at the Vercel placeholder.
- **Sections without nav links:** Skills and Achievements render on the page but aren't in the Navbar (About / Projects / Experience / Contact). Intentional? 
- **Asset casing:** photo is referenced as `/photo.JPG` (uppercase ext) and the file matches — fine, but case-sensitive on Vercel/Linux, so keep the casing exact if renamed.

## Accessibility (scanned, not fixed) — no gaps found

- All `<Image>` elements have `alt` text (`Hero.tsx:118`, `ProjectDetail.tsx:143,237`).
- All icon-only buttons/links have `aria-label` (Navbar, Footer, Hero scroll cue, Projects card, ThemeToggle).
- Contact form inputs have `<label>`s (`sr-only`); honeypot is correctly `aria-hidden` and out of tab order.
- Nothing to fix here — listed for completeness.
