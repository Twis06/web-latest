---
name: Ben Li
description: An engineering CV set as a lab ledger, the ruled sibling of the Capture Volume photography archive.
colors:
  link: "#434e78"
  link-rule: "rgba(67, 78, 120, 0.32)"
  ground: "#f3f3f1"
  ground-deep: "#e9e9e6"
  ink: "#121212"
  mute: "#6f6f6c"
  rule: "rgba(18, 18, 18, 0.1)"
  rule-strong: "rgba(18, 18, 18, 0.22)"
  link-night: "#9aa4dc"
  link-rule-night: "rgba(154, 164, 220, 0.4)"
  ground-night: "#0d0d0d"
  ground-deep-night: "#151515"
  ink-night: "#ededea"
  mute-night: "#8f8f8b"
  rule-night: "rgba(237, 237, 234, 0.1)"
  rule-strong-night: "rgba(237, 237, 234, 0.22)"
typography:
  display:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 52px)"
    fontWeight: 500
    fontStretch: "125%"
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(16px, 1.25vw, 18px)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(21px, 1.8vw, 26px)"
    fontWeight: 500
    fontStretch: "112.5%"
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  bar-name:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    fontStretch: "112.5%"
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  link-row:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Mona Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  readout:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "10.5px"
    fontWeight: 400
    fontStretch: "87.5%"
    lineHeight: 1
    letterSpacing: "0.03em"
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  hairline: "1px"
  gutter: "clamp(16px, 2.2vw, 32px)"
  bar: "64px"
  row: "14px"
  entry: "clamp(24px, 3.4vh, 36px)"
  section: "clamp(80px, 12vh, 144px)"
  ledger-max: "1600px"
components:
  bar:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.bar-name}"
    height: "{spacing.bar}"
    padding: "0 {spacing.gutter}"
    rounded: "{rounded.none}"
  bar-link:
    textColor: "{colors.mute}"
    typography: "{typography.body}"
  bar-link-hover:
    textColor: "{colors.ink}"
  readout:
    textColor: "{colors.mute}"
    typography: "{typography.readout}"
  row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "14px 0"
  opener:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "14px 0 clamp(12px, 2vh, 20px)"
  entry:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "{spacing.entry} 0"
  entry-when:
    textColor: "{colors.mute}"
    typography: "{typography.readout}"
  entry-when-current:
    textColor: "{colors.ink}"
  link-out:
    textColor: "{colors.link}"
    typography: "{typography.link-row}"
  figure-media:
    backgroundColor: "{colors.ground-deep}"
    rounded: "{rounded.none}"
  figure-tag:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.readout}"
    padding: "8px 10px"
    rounded: "{rounded.none}"
  figure-caption:
    textColor: "{colors.mute}"
    typography: "{typography.caption}"
---

# Design System: Ben Li

## Overview

**Creative North Star: "The Lab Ledger"**

The CV is a bound lab record. Every entry is one ruled line: when on the left, what in the middle, the evidence pinned on the right. The material is the photography archive's (fog ground, ink, 10% hairlines, a 64px bar, square corners), so moving between the two sites never jars. The details are the ledger's own: its type (Mona Sans, with its wide cut for the name and openers, and Martian Mono), section openers ruled in full ink, a fixed mono date column, numbered figures with captions, and one indigo kept for links that leave the page.

Density is moderate and the voice is factual. The page shows a name at display scale, three contact rows, then three ruled sections of entries with bullet points, outbound links and moving proof beside them. Depth is absent; separation is a hairline or an ink rule. Scroll is the only clock: it names the entry being read in the bar and turns that entry's dates from mute to ink.

The ledger turns down the stacked card timeline with a coloured left border and the autoplaying wall of video. There is no WebGL, no full-bleed media, no shadow and no rounded corner.

**Key Characteristics:**
- Fog ground (night: near-black), ink text, 10% and 22% ink hairlines, shared token for token with the photography site.
- Section openers and the foot are ruled in full ink; every other line is a 10% hairline.
- Mona Sans for names, titles and prose; its wide cut (125%) sets the name and section openers. Martian Mono 10.5px condensed uppercase readouts for dates, counts, figure numbers, field labels and media controls.
- One indigo for outbound links inside entries. The rest of the page is achromatic; demo media carries any other colour.
- Figures are numbered down the whole page (FIG. 01–NN), captioned, capped to the figure column (or, for footage with small detail, the text-plus-figure columns), and never full-bleed.
- One ease-out curve, cubic-bezier(0.16, 1, 0.3, 1), for every spatial move.

### Shared with the photography site, and different on purpose

**Shared (do not fork):** the ground, ground-deep, ink, mute, rule and rule-strong tokens in both themes; the readout grammar (small mono, uppercase, tabular, label in mute and value in ink); the fixed 64px bar on a ground fill with a hairline bottom, name left and nav right on an `auto minmax(0, 1fr) auto` grid; the half-disc theme toggle (28px hit area, 15px glyph, rotates 180° at night over 600ms) storing under the same `portfolio-theme` key, set before paint; square corners; hairline rows that indent 10px on hover; the 1.015 image scale on hover over 900ms; the one ease-out curve; clips that load and play only while 25% visible.

**Different on purpose:** the typefaces (Mona Sans and Martian Mono here; Geist and Geist Mono on the photo site), chosen in October 2026 after a survey of current tech and AI-lab sites; section openers ruled in full ink, not 10%; a mono date column whose in-view row turns ink; a scroll-driven position readout in the bar (`EXPERIENCE 02 / 03`) that rolls only when the entry changes; numbered FIG. NN captions with Play / Pause / YouTube controls; one indigo (link / link-night) reserved for links that leave the page; no WebGL and no full-bleed media; clips start paused under reduced motion; YouTube loads only on click. Cross-link labels: "Photography" here, "Engineering" on the photo site.

## Colors

Achromatic ink on fog with ink-alpha hairlines, inverted at night, plus one annotation indigo.

### Primary
- **Annotation Indigo** (`link` light, `link-night` dark): outbound links inside entries only. The organisation link, demo / paper / code links, press links, and inline links in bullet points. Its underline uses **Indigo Rule** (`link-rule` / `link-rule-night`). Contrast is about 7.3:1 on light ground and 8:1 on dark.

### Neutral
- **Ink** (`ink` / `ink-night`): text, the full-ink opener and foot rules, the value inside a readout, the in-view entry's dates, the focus outline, the selection fill, the skip link fill.
- **Fog Ground** (`ground` / `ground-night`): the page, the bar, the figure tag, the 1px gaps of a clip grid, and the browser theme colour.
- **Deep Fog** (`ground-deep` / `ground-deep-night`): behind figure media until it paints.
- **Mute** (`mute` / `mute-night`): readout labels, the date column at rest, the lede, bar links, meta text, captions, bullet dashes. Mute on light ground is about 4.5:1, the floor; do not lighten it.
- **Rule** (`rule` / `rule-night`, 10%): every hairline. Bar bottom, contact rows, entry dividers, the line under an opener's title.
- **Rule Strong** (`rule-strong` / `rule-strong-night`, 22%): the scrollbar thumb.

### Named Rules
**The Outbound Indigo Rule.** Indigo means "this leaves the page" and appears nowhere else: never on headings, fills, rules, readouts or hover states of in-page controls. The bar's Photography link and the contact rows stay in the neutral palette; they are navigation and contact, not entry evidence.

**The Shared Ground Rule.** Ground, deep fog, ink, mute and both rules are the photography site's values exactly. Change them in both systems or neither.

## Typography

**Display Font:** Mona Sans, wide cut (GitHub's typeface, variable width 75–125%; with Helvetica Neue, Helvetica, Arial)
**Body Font:** Mona Sans, normal width
**Label/Mono Font:** Martian Mono, condensed 87.5% (with ui-monospace, SFMono-Regular, Menlo)

**Character:** an engineered grotesk whose width axis does the display work: wide and medium for the name and openers, normal width for reading. Martian Mono measures. The two never swap roles. Both load through `next/font` with their `wdth` axis; Geist belongs to the photo site, not here.

### Hierarchy
- **Display** (500, 125% wide, clamp(30px, 3.6vw, 52px), 0.96, -0.035em, balanced): the one `h1`, the name. Kept modest on purpose: Ben found 80px too loud (2026-10-14).
- **Lede** (400, clamp(16px, 1.25vw, 18px), 1.35, mute): the line under the name.
- **Headline** (500, 112.5% wide, clamp(21px, 1.8vw, 26px), 1.05, -0.025em): section opener titles.
- **Title** (600, 16px, 1.35, -0.01em, balanced): entry titles.
- **Body** (400, 15px, 1.5): organisation lines, nav, contact rows. Bullet points run at line-height 1.6 and cap at 68ch.
- **Link row** (400, 14px): rows of outbound links and press links.
- **Caption** (400, 13px, 1.4, mute): figure captions.
- **Readout** (Martian Mono 400, 10.5px, 87.5% wide, line-height 1, 0.03em, uppercase, tabular, mute; values in ink): dates, entry counts, FIG. numbers, the bar position, contact and press labels, media controls, the foot tally.

### Named Rules
**The Measurement Not Costume Rule.** Mono carries data the page actually has (dates, counts, indices, figure numbers) and short field labels and controls sitting on the same line as their value. Never a slogan, never a label stacked above a heading.

**The Fixed Cell Rule.** Indices and figure numbers are zero-padded to two digits (`02 / 03`, `FIG. 05`), and numerals are tabular so a readout changes value without changing width.

## Layout

- **The ledger** is a 12-column sheet, max 1600px, gutter padding and gutter column gaps (clamp(16px, 2.2vw, 32px)).
- **The head** sits under the bar plus clamp(48px, 10vh, 128px). From 1100px the name and lede take columns 1–8 and the contact rows columns 9–12, bottom-aligned; below that the contact rows stack under the lede at max 560px.
- **Entries** stack under 768px: title, then dates, then body, then figure. From 768px the dates take columns 1–3 and everything else 4–12, figure capped at 600px. From 1100px the dates take 1–2, title and body 3–7, and the figure 9–12 spanning both rows.
- **Rhythm:** entries pad clamp(24px, 3.4vh, 36px) top and bottom; sections are clamp(80px, 12vh, 144px) apart; the foot sits clamp(96px, 14vh, 176px) below the last entry. Sections offset anchor scroll by the bar height.
- **The bar** is fixed at 64px: name, position readout, then Experience · Projects · Photography · theme (gap clamp(16px, 2vw, 28px)). Under 760px the readout and in-page anchors hide, leaving name, Photography and the toggle.

### Named Rules
**The Three Columns Rule.** When on the left, what in the middle, evidence on the right. A new entry type fits this grid through `content/cv.tsx`; adding one is a data edit, not a component edit.

## Elevation & Depth

Flat. No shadows, no blur, no gradients, no tinted panels. The bar separates from the page with an opaque ground fill and a hairline. Emphasis is carried by rule weight (ink against 10%) and by the date column turning ink, never by elevation.

### Named Rules
**The No Shadow Rule.** Nothing casts a shadow. A surface separates by a hairline, an ink rule or an opaque ground fill.

## Shapes

Every corner is square (0px): bar, figures, figure tag, skip link. Structure is 1px: hairlines at 10%, opener and foot rules in ink, 1px ground gaps inside a clip grid. Bullet marks are 8px × 1px mute dashes. The outbound arrow is a 9px stroked diagonal. The only round shape is the theme glyph, a circle with its right half filled.

### Named Rules
**The Ink Opener Rule.** A section opens on a full-ink 1px rule with its title and a count readout on one baseline, closed below by a 10% hairline. The ledger closes on the same ink rule at the foot. No other line is ink.

## Components

### Navigation (the bar)
Quiet and fixed. Name in Mona Sans 600 15px at 112.5% width, ink. Links in Mona Sans 15px mute, ink on hover over 200ms. The Photography link carries the outbound arrow but stays mute. The theme toggle matches the photography site exactly.

### Position readout (signature)
A mono readout in the bar's middle cell naming the entry under a reading line at 38% of the viewport: section, padded index in ink, padded count (`EXPERIENCE 02 / 03`). Between entries the last one read stays named; at the page end the last entry is named. It rolls up from 55% with a fade over 260ms on the ease-out curve only when the entry changes, never on first appearance. It is `aria-hidden`; reduced motion collapses the roll.

### Date column
The entry's dates as a mute readout, start over end (`— JAN 2026`). The entry under the reading line gets `data-current`, and its dates turn ink over 200ms. Leave `when` out rather than guess a date.

### Rows (contact)
Hairline-ruled rows, 14px vertical padding, readout label left, value right with the arrow when it leaves the site. Indent 10px on hover over 400ms ease-out.

### Section opener
Headline title left, an entry-count readout right, on the Ink Opener Rule.

### Outbound links
Standalone links (demo, paper, code, press) are indigo with the arrow, underline transparent at rest and Indigo Rule on hover. Inline links in prose and the organisation link are indigo underlined at Indigo Rule, deepening to full indigo on hover.

### Figure (signature)
Numbered down the whole page in reading order. Media sits on deep fog at its own aspect ratio, square, never wider than the figure column; a portrait clip caps at 320px wide while its caption runs the full column. A grid figure is a 2 × 2 of clips on 1px ground gaps. **Wide figures** (`figure.wide` in content/cv.tsx) are for footage whose detail is small (the drone grid, the 12-task Wheg simulation grid): from 1100px they drop under the entry and span columns 3–12, still inside the page gutter, never full-bleed. Footage is cropped to the action before it is enlarged (the drone clips are 2× crops around the frame).
- **Caption:** `FIG. NN` readout (number in ink), the caption in 13px mute, and a control readout pushed right: Play / Pause for clips, YouTube (opens out) for video.
- **Clips:** the poster image paints first; the muted, looping video loads its source and plays only while at least 25% of the figure is visible, and pauses otherwise. Under reduced motion clips start paused until the visitor presses Play.
- **YouTube:** a poster button with a ground-filled readout tag pinned top-left (play triangle plus "Play", 8px 10px). The privacy-enhanced embed loads only on click and takes focus. Poster images scale to 1.015 on hover over 900ms; the focus outline insets -3px in the ground colour.

### Motion grammar
One curve, `cubic-bezier(0.16, 1, 0.3, 1)`, for spatial moves (roll, row indent, image scale, theme glyph turn). Plain `ease` for 200ms colour changes. Scroll is the only clock; nothing runs on a timer. Under `prefers-reduced-motion`, smooth scrolling is off, transitions and animations collapse to 1ms, and clips start paused.

## Do's and Don'ts

### Do:
- **Do** take every surface colour from ground, deep fog, ink, mute or the ink-alpha rules, with both light and night values identical to the photography site.
- **Do** reserve indigo for outbound links inside entries, with the arrow on standalone links.
- **Do** open every section on a full-ink rule and keep every other line a 10% hairline.
- **Do** put dates, counts and figure numbers in Martian Mono readouts: 10.5px, 87.5% wide, uppercase, 0.03em, tabular, zero-padded to two digits, label mute and value ink.
- **Do** number every figure in reading order and caption it, with a Play / Pause or YouTube control.
- **Do** load and play clips only while 25% visible, start them paused under reduced motion, and load YouTube only on click.
- **Do** add entries in `content/cv.tsx`, not in components.

### Don't:
- **Don't** use box-shadows, blur, gradient fills, tinted panels or rounded corners.
- **Don't** wrap entries in cards or mark them with a coloured left border.
- **Don't** use indigo, or any other hue, for headings, fills, rules, hover states or in-page navigation.
- **Don't** run media full-bleed, autoplay it off screen, or add WebGL.
- **Don't** set display, titles or prose in Martian Mono, or readouts in Mona Sans. Don't bring Geist back here; it is the photo site's voice.
- **Don't** add timers, carousels, or a second easing curve for spatial motion.
