# Tanay Sinha — Netflix-style Portfolio

A "Who's watching?" portfolio. Each visitor picks a profile (Recruiter, Investor, Collaborator, Curious Visitor) and gets rows of content tailored to them.

**Stack:** React 19 · Vite · Tailwind v4 · framer-motion · react-router · lucide-react · EmailJS (optional)

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

## Editing content

Everything shown on the site lives in **`src/data/content.js`**:

| Export | What it controls |
| --- | --- |
| `links` | GitHub, LinkedIn, email, resume URL |
| `profiles` | The four profiles on the "Who's watching?" screen |
| `projects`, `experience`, `achievements`, `leadership`, `education`, `skills` | Card content |
| `featuredByProfile` | The big billboard hero for Investor / Collaborator / Curious |
| `rowsByProfile` | Which rows each profile sees, and in what order (`variant: "top10"` = big-number row) |

Card artwork:
- `poster` — an image in `public/images/` (screenshots use `object-cover`; add `fit: "contain"` + `posterBg` for logos).
- No `poster`? A Netflix-style title card is generated from `art: { from, to }` colours.

To update the CV, replace `public/resumes/Tanay_Sinha_CV.pdf` (keep the file name).

## Photos, songs & video (per profile)

Every profile has its own photo + song, set in `heroByProfile` in `content.js`. Just drop files in with these names:

| Profile | Photo | Song |
| --- | --- | --- |
| Recruiter | `public/images/recruiter-hero-wide.jpg` (desktop) + `recruiter-hero.jpg` (phones) | `public/audio/recruiter-clip.mp3` |
| Investor | `public/images/hero-investor.jpg` | `public/audio/investor.mp3` |
| Collaborator | `public/images/hero-collaborator.jpg` | `public/audio/collaborator.mp3` |
| Curious Visitor | `public/images/hero-curious.jpg` | `public/audio/curious.mp3` |

Then fill in the song `title` / `artist` for the "Now Playing" player. Missing photo → styled backdrop; missing song → player hides.
Tall portrait photos work best (the hero feathers them into black on desktop). Keep songs short (a 60–90s clip, 128 kbps ≈ 1–1.5 MB) so pages load fast.

Off-duty videos (guitar, dance) live in `public/videos/`, with thumbnails in `public/images/offduty/`. Edit titles and captions in `offDuty`.
Phone videos: run them through `ffmpeg -i in.mp4 -c copy -movflags +faststart out.mp4` so they start playing instantly on the web.
Socials: fill in `url` (and the `@handle` subtitle) in `socials` — cards stay hidden until a URL is set.

## Contact form

Works out of the box: without EmailJS keys it opens the visitor's mail app with the message pre-filled.
To send directly from the site, copy `.env.example` to `.env`, fill in your EmailJS IDs, and add the same three
variables in your Vercel project settings.

## Deploying (Vercel)

`vercel.json` rewrites all routes to `index.html`, so deep links like `/browse/recruiter` work on refresh.
