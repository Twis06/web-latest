# Personal Website Detailed Plan

## 📋 Project Overview
- **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Deployment**: Vercel + GitHub repository
- **Design Philosophy**: Simplistic, smooth animations, focus on visual storytelling
- **Key Inspiration**: Gabriel Contassot (gabrielcontassot.com) - smooth scroll animations & layout
Apple-smooth screen transitions

---

## 🎯 Core Pages & Navigation

### Main Pages
1. **Landing Page** (`/`)
   - Hero section with name and title and basic information, and fonts with different color that can jump to that page
   - Photo carousel/roll on the right side (continuously rotating images)
   - Scroll-down overlay effect (lower page covers upper images)
   - Loading animation on first load
   - Call-to-action to explore

2. **About** (`/about`)
   - Personal introduction/bio
   - Small pet section/feature
   - Smooth text appearance animation
   - Page transition animation

3. **CV** (`/cv`)
   - Experience, education, skills
   - Clean, minimal design
   - Downloadable CV option (if desired)

4. **Projects** (`/projects`)
   - Project grid/list with descriptions
   - Smooth transitions between projects
   - Links to live demos/repos
   - Project filtering/categories (optional)

5. **Photography** (`/photography`)
   - Masonry/grid layout of photography work
   - Scroll-triggered animations (like Gabriel's style)
   - Smooth lazy-loading of images
   - Modal/lightbox for full-size viewing
   - Auto-scroll and parallax effects

---

## ✨ Animation & Visual Features

### Global Animations
- **Page Transitions**: Smooth fade/slide transitions between routes
- **Loading Animation**: Subtle "mg animation" loading indicator on app start
- **Scroll Animations**: Elements fade/slide in as they come into view

### Specific Components
- **Photo Carousel** (Landing): Continuous rotation with smooth transitions
- **Photography Grid**: Parallax scroll, staggered animations on load
- **Text Appearance**: Smooth character/word reveal for headings/descriptions
- **Hover Effects**: Subtle transforms on interactive elements
- **Scroll Cover Effect**: Lower sections smoothly cover upper content as you scroll

---

## 🖼️ Image Handling Strategy

### Image Requirements
- Support for high-volume photography portfolio
- Responsive image optimization (Next.js Image component)
- Multiple formats/sizes for performance
- Lazy loading on photography page

### Image Structure
- Store images in `/public` directory
- Use Next.js `Image` component for optimization
- Implement responsive srcSet
- Consider image CDN for large portfolios

---

## 🎨 Design System & UI

### Layout
- Minimal, clean navigation (horizontal or hidden nav menu)
- Consistent spacing and typography
- Mobile-first responsive design
- Dark mode 
  

### Components to Build
1. Navigation/Header (sticky or fixed)
2. Photo Carousel (auto-rotating, infinite loop)
3. Smooth Scroll Container
4. Animation Wrapper (reusable for fade/slide)
5. Image Grid (masonry layout for photography)
6. Project Card
7. Footer

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation
- [ ] Set up routing structure (pages)
- [ ] Create global layout and navigation
- [ ] Establish animation library/hooks (Framer Motion recommended)
- [ ] Set up reusable components

### Phase 2: Landing Page
- [ ] Hero section with name/title
- [ ] Photo carousel component
- [ ] Scroll overlay effect
- [ ] Loading animation
- [ ] Page transition setup

### Phase 3: Other Pages
- [ ] About page + small pet feature
- [ ] CV/Resume page
- [ ] Projects page
- [ ] Photography gallery with scrolling animations

### Phase 4: Polish & Optimization
- [ ] Image optimization & lazy loading
- [ ] Performance testing
- [ ] Mobile responsiveness
- [ ] Cross-browser testing
- [ ] SEO optimization

### Phase 5: Deployment
- [ ] Deploy to Vercel
- [ ] Push to GitHub
- [ ] Final testing
- [ ] Domain setup (if applicable)

---

## 📦 Recommended Dependencies

**Already Included:**
- next, react, react-dom
- typescript, tailwindcss

**To Add:**
- `framer-motion` - For smooth animations and transitions
- `next-router-transitions` (optional) - For page transitions
- `zustand` or `jotai` (optional) - For state management
- `react-intersection-observer` (optional) - For scroll animations

---

## 📝 Content To Prepare

Before starting implementation, gather:
- Personal bio and intro text
- CV/Resume information
- Project descriptions and links
- High-quality photography portfolio (images) - **~100 compressed photos**
- Social media/contact links
- Small pet photos/description

---

## 📊 Photography Portfolio Details

- **Total Images**: ~100 (compressed before upload)
- **Storage Strategy**: `/public/photography/` directory
- **Image Optimization**: 
  - Compress with tools like ImageOptim, TinyPNG, or Squoosh before uploading
  - Use Next.js Image component with `quality` optimization
  - Implement responsive image sizes for different breakpoints
  - Consider WebP format for better compression
- **Loading Strategy**: Lazy load in masonry grid, batch load in viewport
- **Backup Plan**: If performance issues, implement pagination or infinite scroll

---

## ✅ Confirmation Checklist

- [x] Approve page structure and navigation
- [x] Confirm animation style preferences (smooth/subtle vs bold)
- [x] Verify photography portfolio size and requirements - **100 compressed photos confirmed**
- [ ] Confirm color scheme/design direction
- [x] Decide on dark mode support - **Enabled**
- [x] Set deployment target (Vercel + GitHub)
- [ ] Confirm small pet section importance/placement
- [ ] Gather all content (bio, CV, projects, photos, pet info)



# homepage code to use
Scrambled Text
The text animation feature is based on GSAP’s ScrambleText plugin, enhanced with additional utilities for better control and stability.

Initially, we attempted to recreate the functionality from scratch to minimize text movement—given the large size of the text—but this proved challenging. We managed to stabilize the scrambling effect somewhat by reusing the original characters of each word exclusively, minimizing variations during each shuffle.

We also refined the interactive elements, such as ensuring that the hover effect does not activate during an ongoing animation. This was particularly important as some unintended combinations generated inappropriate words in French during the scrambles.

For the homepage, we replaced the hover-trigger with an onload activation for the menu/navigation centerpiece. We hardcoded the durations to synchronize perfectly with the desired timing of the visual effects.

Additionally, we integrated CSS animations to manage the visibility of elements, setting {item}.style.animationDelay directly in JavaScript. A Track object was employed to dynamically adjust the scale of elements based on their scroll position, enhancing the interactive visual experience.

// nav.js

this.values = {
  duration: [1.2, 1.5, 0.4, 0.2, 1, 0.6, 0.6],
  del: [0, 0.4, 1.3, 1.4, 1.5, 1.6, 2.1],
  lined: [0, 0.3, 1.1, 1.5],
};

// ...

animateIn() {
    this.el.classList.add("anim");
    gsap.to(this.texts, { autoAlpha: 1, duration: 1 });

    this.texts.forEach((line, i) => {
      line.style.fontKerning = "none"; // probs doesnt do anything
      gsap.to(line, {
        duration: this.values.duration[i],
        delay: this.values.del[i],
        ease: "expo.out",
        scrambleText: {
          text: "{original}",
          chars: [
            "GABRELCONTASO",
            "FRELANCDSGNOR",
            "1824",
            "-_",
            "SELCTDWORK",
            "NFOI",
            "CONTA",
          ][i],
          revealDelay: this.values.duration[i] * 0.5,
          speed: 1,
        },
      });
    });
}
Homepage images effect
This is probably the most interesting piece of it, and I needed a couple of tries to understand how to make it work, before realising that are really just absolute positioned images with a clip-path inset combined with a Track to sync it with the scroll that also controls the scaling of the inner image.

// scrollImage.js

constructor() {
    // ...
    this.image.style.transform = `scale(1)`;
    this.imagWrap.style.clipPath = "inset(100% 0 0 0)";
    // ...
}

 render() {
    if (!this.inView) return;
    this.track?.render();

    this.image.style.transform = `scale(${1.2 + this.track.value*-0.2})`;

    this.imagWrap.style.clipPath = `
      inset(${this.track.value2 * 100}% 
        0 
        ${this.track.value1 * 100}% 
        0)
    `;
  }

  main.js 

  import "./style.css";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

import { ImageTransform } from "./track";

// init
const scroll = new Lenis();
gsap.ticker.lagSmoothing(0);

const track = new ImageTransform({
  element: document.querySelector("[data-track]"),
  config: {
    bounds: [0, 1],
    top: "bottom",
    bottom: "top",
  },
});

// evts & loop
new ResizeObserver(() => {
  track.resize();
}).observe(document.body);

scroll.on("scroll", ({ scroll }) => {
  track.render(scroll);
});

gsap.ticker.add((time) => {
  scroll.raf(time * 1000);
});

style.css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  background-color: black;
  font-size: 12px;
}

.data {
  position: fixed;
  top: 1em;
  right: 1em;
  padding: 1em;
}

.sec {
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
}

.sec > div {
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  clip-path: inset(100% 0 100% 0);
  transform: translateX(-50%) translateY(-50%);
}

.sec img {
  aspect-ratio: 1/1.5;
  max-width: 30vw;
  object-fit: cover;
  max-height: 80vh;
}

[data-track] {
  border-right: 3px solid #5a5a5a;
}

track.js
import { map, clamp } from "./math.js";

/** Base Track Class */
export class Track {
  value = 0;
  value1 = 0;
  value2 = 0;

  scrollY = 0;

  constructor({ element, config }) {
    this.element = element;

    this.config = {
      bounds: [0, 1],
      top: "bottom",
      bottom: "top",
      ...config,
    };

    this.resize();
  }

  resize() {
    this.bounds = computeBounds(this.element, this.config, this.scrollY);
  }

  render(scrollY = 0) {
    this.scrollY = scrollY;

    this.value = clamp(
      0,
      1,
      map(
        scrollY,
        this.bounds.top,
        this.bounds.bottom,
        this.config.bounds[0],
        this.config.bounds[1],
      ),
    );

    this.value1 = clamp(0, 1, map(this.value, 0, 0.5, 1, 0));
    this.value2 = clamp(0, 1, map(this.value, 0.5, 1, 0, 1));

    this.transform();

    return this.value;
  }

  transform() {}
}

/** Actual Image Class */
export class ImageTransform extends Track {
  constructor({ element, config }) {
    super({ element, config });
    this.create();
  }

  create() {
    this.img = this.element.querySelector("img");
    this.imgWrap = this.img.parentElement;
  }

  transform() {
    this.img.style.transform = `scale(${1 + this.value})`;
    this.imgWrap.style.clipPath = `
     inset(${this.value2 * 100}% 0 
      ${this.value1 * 100}% 0
     )`;
  }
}

// --------- utils
function computeBounds(el, config, scrollY = 0) {
  const bounds = clientRect(el, scrollY);
  const adjustPosition = (position, offset) => {
    switch (offset) {
      case "center":
        return position - bounds.wh / 2;
      case "bottom":
        return position - bounds.wh;
      default:
        return position;
    }
  };

  bounds.top = adjustPosition(bounds.top, config.top);
  bounds.bottom = adjustPosition(bounds.bottom, config.bottom);

  return bounds;
}

export const clientRect = (element, scrollY) => {
  const bounds = element.getBoundingClientRect();

  return {
    top: bounds.top + scrollY,
    bottom: bounds.bottom + scrollY,
    wh: window.innerHeight,
    ww: window.innerWidth,
  };
};
