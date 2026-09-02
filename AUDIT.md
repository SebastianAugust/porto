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
- **Verify (already present, not missing):** profile photo `public/photo.JPG`, CV `public/cv/Sebastian Augustino Lie_CV.pdf`, `app/favicon.ico`. The OG image (`app/opengraph-image.tsx`) and icon (`app/icon.tsx`) are generated dynamically — eyeball that they render correctly.

## 3. Accounts / services I need to set up

- ~~**Resend API key**~~ — DONE locally: `.env.local` has `RESEND_API_KEY` + `CONTACT_TO_EMAIL`; form tested, mail arrives. **Still needed:** add the same 3 vars in Vercel → Project Settings → Environment Variables, or the form breaks in production (`.env.local` is git-ignored and not deployed).
- **Sender domain** — `CONTACT_FROM_EMAIL` uses Resend's shared `onboarding@resend.dev` test sender. Fine as-is since the form only ever emails your own inbox; for a branded "from" address, verify `sebastianaugust.dev` in Resend (Domains → add DNS records) and set `CONTACT_FROM_EMAIL="Sebastian August <hi@sebastianaugust.dev>"`. — `.env.example` / `.env.local`
- ~~**Production domain**~~ — DONE: `site.url` set to `https://sebastianaugust.dev`. Drives canonical URLs, OG absolute paths, sitemap, robots, and JSON-LD.
- ~~**LinkedIn profile**~~ — DONE: `site.linkedin` set to `https://www.linkedin.com/in/sebastianaugust`.

## 4. Code-level TODOs (file:line — note)

- ~~`app/layout.tsx:23`, `lib/site.ts:5,15,18,20`~~ — DONE: real domain (`sebastianaugust.dev`) and LinkedIn/Instagram/email now set in `lib/site.ts`; stale TODOs removed.
- `data/projects.ts:8,10` — doc note: empty fields marked with TODO; search file for TODO.
- `data/projects.ts:82,109,136,162,189` — TODO: add screenshots (per project).
- `data/projects.ts:83,84,110,138,163,164,191` — PLACEHOLDER: `liveUrl`/`sourceUrl` left `undefined`.
- `data/projects.ts:98,125,151,177,182` — REVIEW: hardProblem text / language confirmation.
- `data/projects.ts:137` — REVIEW: demo-video link, confirm public.
- `components/Achievements.tsx:14` — "Placeholders — edit as real ones land."

_(~26 marker comments total; the `placeholder=` attributes in `Contact.tsx` and the `ImagePlaceholder`/gradient-cover code in `ProjectDetail.tsx`/`Projects.tsx` are intentional design, not TODOs.)_

## 5. Broken or placeholder links

- ~~**Contact LinkedIn — broken (missing protocol)**~~ — DONE: now reads `site.linkedin`.
- ~~**Navbar socials — placeholders**~~ — DONE: LinkedIn/Instagram/Email now read from `lib/site.ts`.
- ~~**Footer socials — placeholders**~~ — DONE: same, reads from `lib/site.ts`.
- ~~**JSON-LD LinkedIn — empty**~~ — DONE: real handle set; Instagram added to `sameAs`.
- **Project live/source links missing:** most `liveUrl`/`sourceUrl` are `undefined` (only AI-ORBIT has a source repo, GOR has a bit.ly demo). — `data/projects.ts` (lines per §4)
- **GitHub handle to confirm:** `SebastianAugust` used in Navbar/Footer/Contact/site.ts — verify it's correct (projects reference a different org, `web-shooter-3-6`).

## 6. Other issues noticed during the scan

- ~~**Contact form is effectively stubbed**~~ — DONE locally (keys in `.env.local`, tested). Production needs the env vars set in Vercel (see §3).
- ~~**Email inconsistency**~~ — DONE: `site.email` (`sebastianagustinolie@gmail.com`) is now the single source for Navbar/Footer/Contact.
- ~~**LinkedIn handle inconsistency**~~ — DONE: `site.linkedin` is the single source.
- ~~**Social links hardcoded in 3 places**~~ — DONE: Navbar, Footer, Contact all read `github`/`linkedin`/`instagram`/`email` from `lib/site.ts`.
- ~~**Placeholder domain propagates everywhere**~~ — DONE: `site.url` now `https://sebastianaugust.dev`.
- **Sections without nav links:** Skills and Achievements render on the page but aren't in the Navbar (About / Projects / Experience / Contact). Intentional? 
- **Asset casing:** photo is referenced as `/photo.JPG` (uppercase ext) and the file matches — fine, but case-sensitive on Vercel/Linux, so keep the casing exact if renamed.

## Accessibility (scanned, not fixed) — no gaps found

- All `<Image>` elements have `alt` text (`Hero.tsx:118`, `ProjectDetail.tsx:143,237`).
- All icon-only buttons/links have `aria-label` (Navbar, Footer, Hero scroll cue, Projects card, ThemeToggle).
- Contact form inputs have `<label>`s (`sr-only`); honeypot is correctly `aria-hidden` and out of tab order.
- Nothing to fix here — listed for completeness.
