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

Each page is a single self-contained file. There is no shared `src/components/` directory and no
shared Navbar/Footer component — **each page carries its own `Header()` and footer function at the
bottom of its file.** If you change the nav or footer, change it in all three files.

---

## Where the content lives (edit these)

Content sits in `const` arrays at the **top** of each page file, above the components. Edit the
array, not the JSX.

**`src/app/page.tsx`**

- `NAV` — the header nav links
- `QUICK_LINKS` — the three cards under the hero (Parent Portal / Inquire / Apply)
- `DISTINCTIVES` — the "what makes SCA SCA" bullet list
- `ACADEMICS` — the four program cards (Elementary, Middle School, High School, Chapel), each with
  its image and bullet points
- `STATS` — the four numbers in the hero card (founded, acreage, ages served, tuition support)
- `LIFE` — the student-life activity list
- `STAFF` — the short staff preview on the homepage (the full list is on `/staff`)
- `EVENTS` — the few dates shown on the homepage (the full list is on `/calendar`)

**`src/app/staff/page.tsx`**

- `STAFF` — the full directory. Each person has a `group` (department); `GROUPS` is derived
  automatically from those values, so adding a new `group` string creates a new section.

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

## Images

All images live in `public/sca-redesign/` and are **imported** (not referenced by string path) so
Next.js can size and optimize them:

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
