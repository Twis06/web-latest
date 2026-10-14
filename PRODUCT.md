# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

From Ben's build brief (Claude Docs, "Build brief: Ben Li — tech & academic site in the Capture Volume style", 2026-10-14):

- Recruiters and engineers skimming in under a minute.
- Professors, labs and collaborators reading about research.
- Peers following the work.

## Product Purpose

Ben Li's engineering site. The CV is the home page: education, experience and projects in robotics, reinforcement learning and embedded systems, each with its demo media and outbound links. A visitor should see the body of work at a glance, open one project, and reach code, a demo, a paper or contact in one click.

## Positioning

The engineering sibling of Ben's photography archive, [mediaportfolio.vercel.app](https://mediaportfolio.vercel.app) (repo `../mediaportfolio`). The two sites share one visual world so moving between them never jars, but the details differ so neither reads as a copy of the other (Ben, 2026-10-14).

## Operating Context

- Ben's LaTeX resume (`Resume/cv.tex`) links to `twis.onl/cv`. That domain did not resolve on 2026-10-14; the live deployment is `web-latest-kohl.vercel.app`. `/cv` must keep working and lands on the home page.
- The two sites link to each other in the top bar: "Photography" here, "Engineering" on the photo site.
- Deployed on Vercel from `Twis06/web-latest`.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind 4.
- One page. The scroll-photo home page and the unused `/projects` route were removed on 2026-10-14.
- CV content lives in `content/cv.tsx`; adding an entry is a data edit, not a component edit.
- Open decisions: a PDF download (`Resume/cv.pdf` has different content from the web CV), and the index, papers and notes routes the brief describes.

## Brand Commitments

- Bar name "Ben Li"; page title and `h1` "Peiyang (Ben) Li".
- The line under the name stays "Student" (confirmed 2026-10-14).
- Visual world: a sibling of the photography site's Capture Volume system. It matches broadly but the details differ (confirmed 2026-10-14).
- Cross-link labels: "Photography" on this site, "Engineering" on the photo site.

## Evidence on Hand

- Demo media in `public/cv/`: drone traversal loops, LEAP hand, ME 433 joystick, HaptE warehouse clip; YouTube videos for Xenobot and Zombies VS Plants.
- Press for the Xenobot work: Reuters, BBC, Northwestern, WGN.
- Paper links (Science Robotics, ICRA) for the drone project. Ben deployed those models; he is not credited as an author, and the site must not say he is.
- Demo sites: framevisualize.vercel.app, bbox-translator-demo.vercel.app.
- No testimonials or metrics beyond those already in the CV text. Don't invent any.

## Product Principles

1. The work is the proof: demo clips, numbers and links, not adjectives.
2. Readable in under a minute: dates, roles and outcomes scan at a glance.
3. One world with the photography site, with different details.
4. Media never dominates the load: previews in the page, full files only on request.

## Accessibility & Inclusion

Text contrast of at least 4.5:1, a visible focus ring, `prefers-reduced-motion` respected, alt text or captions on every figure, one `h1` (from the brief).
