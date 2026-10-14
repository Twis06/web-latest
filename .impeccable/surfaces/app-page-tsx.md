---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["content/cv.tsx","app/globals.css"]
---

# Surface: CV home (`/`)

Mode: Read. Code-led (Read surface; no image generation).

Audience and job: recruiters and engineers skimming in under a minute; labs and professors checking research. They need role, place, dates and the proof (clips, papers, code) fast, then one click out.

Constraints: content and wording come from the existing CV unchanged ("Student" stays under the name). `/cv` redirects here because the LaTeX resume links to it. Cross-link to the photography site is labelled "Photography"; the photo site links back as "Engineering". The world is pinned by Ben's brief: a sibling of the photography site's Capture Volume system, matching broadly with different details. Ben chose the Ledger composition from three options on 2026-10-14.

Unresolved: PDF download; index, papers and notes routes.

## Direction contract

THESIS: The CV as a lab ledger. Every entry is one ruled line in a bound record: when on the left, what in the middle, the evidence pinned on the right. It refuses the stacked card timeline with a coloured left border and an autoplaying wall of video.

OWN-WORLD: The photo site's fog ground (#f3f3f1 / #0d0d0d), ink, 10% hairlines, square corners, small mono readouts, 64px bar and half-disc theme glyph. Differences: its own type, Mona Sans with its wide cut for the name and openers and Martian Mono for readouts (chosen 2026-10-14 over Source Serif and Google Sans Flex, after a survey of current tech sites; the photo site keeps Geist); section openers ruled in full ink, not 10%; a fixed mono date column; figures numbered FIG. 01–NN with captions; one annotation indigo (#434E78 / #9aa4dc) reserved for outbound links; no WebGL and no full-bleed media.

STORY: The visitor reads the name, then scans the date column down the page and sees three years of robotics work with moving proof beside each entry. They open a demo, a paper or GitHub, or jump to Photography.

FIRST VIEWPORT: The bar with Ben Li, a live position readout and Experience · Projects · Photography · theme. Below it, on the left, "Peiyang (Ben) Li" at display scale with "Student" under it. On the right, Email, GitHub and Photography as hairline rows. Then the Education opener, ruled in ink, with its first row starting above the fold.

FORM: Ledger, option 1 of 3 (Ledger, Index rail, Plates), chosen by Ben. The world is pinned by the brief, so concept-seed was not run and there is no seed key. Signature interaction: a scroll-driven position readout in the bar (`EXPERIENCE 02 / 03`) that rolls on change, and the in-view row's dates turning from mute to ink. Motion grammar: one ease-out curve, cubic-bezier(0.16, 1, 0.3, 1); scroll is the only clock; clips play only while on screen; reduced motion stops autoplay and the roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
