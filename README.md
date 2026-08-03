# Springfield Christian Academy — Website Concept

A modern website concept for **Springfield Christian Academy** (SCA Eagles) — a Christ-centered,
Pre-K through 12th grade Christian school on a 40-acre campus in Clarkston, Michigan, established
in 1972. Built by Pastor Eli (https://www.elijahdesent.com).

This is a **redesign concept**, not the school's live site. The real site is
https://www.scaeagles.org. This concept is set to `noindex` so it never competes with it in search.

This README is the one place that explains how to edit the site. **If you are ChatGPT or Claude
helping with a change, read this first.**

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** — there is no `tailwind.config.ts`. Brand colors are written inline as
  arbitrary values (e.g. `bg-[#27183b]`, `text-[#fdc10e]`), not theme tokens.
- **TypeScript**
- **lucide-react** for icons
- Deploys automatically to **Vercel** on every push to `main` → https://sca.elijahdesent.com

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage — hero, quick links, academics, story, student life, admissions, staff preview, contact |
| `/calendar` | School-year calendar and events |
| `/staff` | Full faculty & staff directory, grouped by department |

Each page is otherwise a single self-contained file — its own sections and footer live at the
bottom of that file. Only the header and the staff carousel are shared:

| File | What it is |
|---|---|
| `src/components/SiteHeader.tsx` | The header on all three pages — desktop nav **and the mobile hamburger menu**. `NAV` lives here, so changing the nav changes it everywhere. |
| `src/components/HeroHeadline.tsx` | The hero headline. It rotates through the sayings in `HEADLINES` (each with its own type size) every `HOLD_MS`. All the sayings are stacked in one grid cell so the hero never shifts height when the text changes. |
| `src/components/StaffMarquee.tsx` | The panning row of staff photos on the homepage. |
| `src/lib/staff.ts` | The faculty & staff roster, shared by `/staff` and the homepage carousel. |

The header's gold button differs per page — pass a `cta` prop:

```tsx
<SiteHeader cta={{ href: "https://www.scaeagles.org/staff", label: "Original" }} />
```

Section links in `NAV` are written `/#academics` (not `#academics`) so they also work from the
subpages.

---

## Where the content lives (edit these)

Content sits in `const` arrays at the **top** of each page file, above the components. Edit the
array, not the JSX.

**`src/app/page.tsx`**

- `QUICK_LINKS` — the three cards under the hero (Parent Portal / Inquire / Apply)
- `DISTINCTIVES` — the "what makes SCA SCA" bullet list
- `ACADEMICS` — the four program cards (Elementary, Middle School, High School, Chapel), each with
  its image and bullet points
- `STATS` — the four numbers in the hero card (founded, acreage, ages served, tuition support)
- `LIFE` — the student-life activity list
- `EVENTS` — the few dates shown on the homepage (the full list is on `/calendar`)
- `PRINCIPAL` — the "Message from the Principal" video section: name, role, headline, paragraph, and
  `videoId` (the part of a YouTube link after `v=`)

**`src/lib/staff.ts` — the one place staff are listed**

Used by both the `/staff` directory and the homepage carousel, so **add a person once here and they
appear in both.** Each person has a `group` (department); `GROUPS` is derived from those values, so
a new `group` string creates a new directory section. Anyone without an `image` still appears in the
directory (with the SCA crest in place of a photo) but is skipped by the carousel.

To add someone, import their photo at the top of the file and add an entry:

```ts
import janeDoe from "../../public/sca-redesign/staff/jane-doe.jpg";
// ...
{ name: "Mrs. Jane Doe", role: "5th Grade Teacher", group: "Elementary", image: janeDoe },
```

**`src/app/calendar/page.tsx`**

- `CALENDAR_FEED` — link out to the school's real RenWeb calendar
- The event lists are defined in this file

## Brand

| | |
|---|---|
| Deep purple | `#27183b` — header, dark sections, footer, body text |
| Eagles gold | `#fdc10e` — buttons, accents, eyebrows, hover states |
| Page background | `#f7f8fa` |
| Display font | **Graduate** (`DISPLAY` const) — headings, stat numbers, card titles |
| Script font | **Caveat** (`SCRIPT` const) — "SCA Eagles" flourishes only |
| Body font | **Open Sans** |

Fonts are loaded with `next/font/google` **in each page file** and applied via the CSS variables
`--font-sca-display`, `--font-sca-script`, `--font-sca-sans`. Use the `DISPLAY` / `SCRIPT`
constants rather than writing the font-family by hand.

Corners are square-ish on purpose (`rounded-sm`) — it reads institutional rather than startup.

## The staff carousel

The homepage row of staff photos pans continuously. It pauses when you hover or tab into it, and it
doesn't pan at all for visitors whose device asks for reduced motion — they get a normal
side-scroller instead.

To change the speed, edit one number in `src/app/globals.css`:

```css
.sca-marquee {
  --sca-pan: 70s;   /* higher = slower */
}
```

The roster is deliberately rendered **twice** so the loop is seamless, and each card uses `pr-4`
rather than a flex `gap`. Don't switch it to `gap` — the animation slides the track exactly `-50%`,
and a gap makes that land a few pixels short of a whole card, which makes the loop visibly jump.

## Images

All images live in `public/sca-redesign/` (staff headshots in `public/sca-redesign/staff/`) and are
**imported** (not referenced by string path) so Next.js can size and optimize them:

```tsx
import logo from "../../public/sca-redesign/logo.png";
```

Note the depth: `../../` from `src/app/page.tsx`, `../../../` from a subpage like
`src/app/staff/page.tsx`.

`src/app/icon.png` and `src/app/apple-icon.png` are the favicon and iOS icon — Next.js picks these
up by filename, don't rename them.

## Real-school details wired in

- Address: 8585 Dixie Highway, Clarkston, MI 48348
- Phone: 248-625-9760
- RenWeb parent portal, inquiry form, and application links (in `QUICK_LINKS`)

## Analytics

`src/app/layout.tsx` renders `<Analytics />` from `@vercel/analytics` — page views and visitor
counts, no cookie banner needed. Numbers show up under **Analytics** in the Vercel project once
Web Analytics is switched on for the project in the Vercel dashboard.

## Live chat

`src/app/layout.tsx` loads the WBC Chat widget (`slackwebsitechat.vercel.app`), which routes
messages to Slack. The greeting text, subtitle, agent photo, and accent color are all `data-*`
attributes on that `<Script>` tag.

---

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # always run before pushing
```
