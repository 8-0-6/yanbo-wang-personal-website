# ARCHITECTURE.md

## 1. Purpose

This document defines the target technical architecture for Yanbo Wang's personal website.

The site is a design-led, motion-heavy, content-driven web experience that must still remain maintainable, fast enough to feel premium, and easy to update without a backend-heavy system.

## 2. Architecture Principles

1. **Custom over template**
   The codebase should support unique layout and motion work, not force generic component patterns.

2. **Fast by default**
   Heavy interactions should be opt-in, lazy-loaded, or scoped to specific moments.

3. **Content should be easy to edit**
   Ventures, notes, and profile data should live in local structured content files.

4. **Interactions are layered**
   The base experience must still work without advanced motion, with enhanced interaction added progressively.

5. **Desktop-first art direction, mobile-safe execution**
   Desktop can carry the boldest interactions, but mobile must still feel intentional and complete.

## 3. Chosen Stack

### Framework

- **Next.js** with App Router
- **React**
- **TypeScript** in strict mode

Rationale:

- first-class Vercel deployment
- good control over performance and routing
- strong support for MDX/content pages
- mature ecosystem for motion-heavy marketing sites

### Styling

- **CSS Modules** for component-scoped styles
- **global CSS variables** for design tokens, layering, colors, spacing, and motion values
- minimal utility helpers only where justified

Rationale:

- avoids template-like Tailwind output
- gives precise control for editorial layouts and unusual compositions
- keeps styling expressive and intentional

### Motion

- **CSS transitions/keyframes** for section transitions and reveal effects
- **native scroll snapping** for section-to-section desktop navigation

Rationale:

- keeps interaction smooth with low complexity
- avoids heavy runtime animation dependencies for v1
- matches the editorial + restrained direction

### Content

- **MDX** for Notes and long-form venture pages if needed
- **typed TypeScript data files** for profile, experience summary, ventures, metrics, interests, and contact info

Rationale:

- writing is easy to maintain in MDX
- structured content stays type-safe and simple

### Media

- `next/image` for optimized image delivery
- self-hosted assets in `public/`
- AI-generated and edited image assets stored alongside other visual assets

### Quality

- **ESLint**
- **Prettier**
- **Playwright** for smoke tests and key interaction flows
- optional unit tests for content helpers and utilities

### Deployment and Observability

- **Vercel**
- **Vercel Analytics**
- **Vercel Speed Insights**

## 4. Explicit Non-Choices

Default exclusions unless a later approved change is made:

- no global CMS at v1
- no full-site WebGL requirement
- no site-wide React Three Fiber layer by default
- no backend database
- no auth
- no heavy contact form stack
- no generic UI kit dependency

Three.js or React Three Fiber may be added later only if a single hero or art moment truly requires it and passes a performance review.

## 5. Repository Direction

This repository currently contains unrelated X research scripts.

Target direction:

- the personal website becomes the primary app in this repository
- any reusable research tooling should be moved into a dedicated `tools/` area if kept

Recommended first cleanup move during implementation:

- relocate existing X helper files into `tools/x-research/`
- reserve the repo root for the website app and source-of-truth docs

## 6. Target Project Structure

Layout is built around a site-wide two-column shell: **SiteLayout** = **LeftRail** (fixed) + **RightContent** (scrollable/switched by section).

```text
/
  app/
    layout.tsx
    page.tsx
    globals.css
    ventures/
      [slug]/
        page.tsx
    notes/
      page.tsx
      [slug]/
        page.tsx
  components/
    layout/
      SiteLayout.tsx    # left rail + right content shell
      LeftRail.tsx      # name, portrait, tagline, section nav
      HomeContent.tsx   # section switcher for right content
    sections/
      AboutSection.tsx
      VenturesSection.tsx
      ExperienceSection.tsx
      LifeSection.tsx
      NotesSection.tsx
      ContactSection.tsx
    cursor/
    ui/
  data/
    site.ts
    profile.ts          # displayName, tagline
    ventures.ts
    experience.ts
    interests.ts
    notes.ts
  lib/
    client/
    utils/
  public/
    images/
  tools/
    x-research/
  PRD.md
  ARCHITECTURE.md
  AI_RULES.md
  PLAN.md
```

## 7. Routing Strategy

### Primary Routes

- `/` — main app: left rail + right content; section selected via nav (or hash/query).
- `/ventures/[slug]` — venture detail (same two-column layout; right shows detail).
- `/notes`, `/notes/[slug]` — notes list and article (same layout; right shows list or article).

### Route Philosophy

- **Single-page + state/hash (recommended)**  
  One route `/`. Left nav switches the active section; right content updates via React state or URL hash (e.g. `/#about`, `/#ventures`). No full-page reload. Deep links work via hash or query.

- **Alternative: multi-route, shared layout**  
  Routes like `/`, `/about`, `/ventures`, `/experience`, `/notes`, `/contact` can share the same `SiteLayout` (LeftRail + RightContent); only the right side content changes per route. Choose one approach and document it here; for v1 the single-page + state/hash approach is recommended to match the “switch section, no reload” feel.

- All main pages use the same two-column layout. Venture and note detail pages use the same shell; left rail stays, right shows the detail.

### Navigation Model

Primary nav labels (in left rail):

- About
- Ventures
- Experience
- Life
- Notes
- Contact

Left nav highlights the active section. Right content shows the corresponding section. Deep linking: support `/#about`, `/#ventures`, `/#experience`, `/#life`, `/#notes`, `/#contact`.
Note detail back navigation should return to Notes directly via `/?section=notes#notes`.

## 8. Content Architecture

### Structured Data

Use typed data files for:

- left-rail copy: tagline, welcome or short intro (e.g. in `profile.ts` or `site.ts`)
- portrait sources and display mode per section (image/stylized variants)
- contact info
- venture summaries
- metrics and proof points
- short experience timeline items
- interests and hobby metadata
- social links

Use this for any content that appears in multiple places or drives interactions.

### MDX Content

Use MDX for:

- Notes entries
- long-form venture pages if the venture story becomes more editorial

### Privacy Guardrails

Do not store or surface:

- phone number in public UI
- GPA in public UI
- unnecessary resume-only data fields

## 9. Component Architecture

### Layout Components

- **SiteLayout**: wraps the app; renders LeftRail (fixed) + RightContent (main area).
- **LeftRail**: name, portrait, combo copy, main nav (About, Ventures, Experience, Life, Notes, Contact). Fixed (or sticky) on desktop.
- **RightContent**: container that renders the active section (AboutSection, VenturesSection, etc.) based on route or nav state. Handles section switching, centered composition, and snap scroll on desktop.

### Section Components

Each section is a right-hand content block:

- **AboutSection**: short statement and identity narrative.
- **VenturesSection**: FineMe, Jobro as minimal cards with collage-style rotation.
- **ExperienceSection**: high-level professional and academic signal list.
- **LifeSection**: dual-trigger reveal board (`Albums that inspired me` / `Fashion that inspired me`) with randomized but evenly distributed artifacts and staggered transitions.
- **NotesSection**: list of notes as simple rows with title and category.
- **ContactSection**: short statement, email, social links.

Venture detail and note article pages render inside the same layout (right side shows the detail/article).

### Identity (Left Rail)

The left rail contains name, portrait, tagline, and section navigation (6 items). Contact details are represented in the Contact section on the right-hand side.

### Interactive Components

- custom cursor (kept, simplified states)
- Life section hover/click reveal layers for albums and fashion

All heavy interactive components (RubikBoard, ExperienceScrubber, complex drag simulations, fashion/basketball mini-games) remain out of scope in favor of the Anna Mills-inspired editorial minimalism direction.

## 10. Motion Architecture

Motion is minimal and purposeful, matching the editorial minimalism direction.

### Layer 1: Baseline motion (CSS only)

- section switching fade transition (280ms ease)
- hover color/opacity transitions (200ms)
- nav active state transitions

### Layer 2: Lightweight pointer interaction

- section-scoped hover/click reveal interaction in Life
- staggered asset reveal for albums/fashion layers
- local component state only; no global animation state store

### Layer 3: Custom cursor

- custom cursor component (kept, simplified states)
- disabled on touch devices and reduced-motion environments

No GSAP or Framer Motion is used in v1. All motion is handled via CSS transitions and keyframe animations.

## 11. Cursor System

The cursor is a branded product feature, not a small UI flourish.

Requirements:

- custom visual design aligned with retro-futurist editorial tone
- multiple states for hover, drag, and focus
- disabled or simplified on touch devices
- must never block clicks or accessibility

Implementation guidance:

- render cursor as a top-level client component
- drive movement with `requestAnimationFrame`
- use CSS transforms, not layout-based positioning
- expose theme/state through a lightweight React context only if needed

## 12. Performance Strategy

Performance goal:

- the site should feel fast and premium, even if it is art-directed and motion-heavy

Rules:

- lazy-load heavy interaction modules
- avoid autoplay video above the fold unless it is critical
- compress and size all images intentionally
- avoid full-page JavaScript for static content sections
- no heavy 3D scene in v1 unless explicitly approved
- keep the first screen visually rich through composition, not payload size alone
- if the Life reveal board carries too many assets, simplify density on mobile and prioritize the most important artifacts

Practical targets:

- main page (left rail + first section) should feel interactive immediately
- mobile should not receive desktop-only interaction bundles when avoidable
- notes pages should be especially lightweight

## 13. Responsive Strategy

Design priority:

- desktop-first

Support requirement:

- mobile must still feel complete, premium, and easy to use

Rules:

- on small screens: stack left rail above right content (e.g. name, headshot, copy, nav on top; section content below full-width), or collapse left rail into a header/drawer with right content full-width. Do not simply squeeze the two columns.
- adapt interactions for touch
- reduce density and drag complexity on smaller screens
- preserve the feeling, not necessarily the exact same composition

## 14. Accessibility Strategy

This site is design-led, but accessibility remains mandatory.

Requirements:

- keyboard navigation for core flows
- visible focus states
- semantic headings and landmarks
- reduced-motion mode
- sufficient text contrast for content areas
- cursor interactions must not be the only way to access information

## 15. Asset Strategy

Asset types expected:

- real portraits
- founder working photos
- event/speaking photos
- app screenshots
- logos
- generated editorial imagery
- textures and visual motifs

Rules:

- real and generated assets should share one art direction
- generated images can be stylized, abstract, or portrait-based
- avoid fake documentary-style images that imply real events that did not happen

## 16. Contact Strategy

V1 contact approach:

- clear CTA
- email-first
- primary action opens mail to `businessuseonly12345@gmail.com`

Reason:

- minimal friction
- no backend complexity
- fits the current goal of outreach and introductions

## 17. State Management

Default approach:

- local component state first
- derive state from props/data whenever possible
- use React context only for truly shared UI concerns such as cursor mode or site theme

Do not introduce:

- Redux
- MobX
- Zustand

unless a real cross-app problem appears and is explicitly approved.

## 18. Testing Strategy

Testing should match the site's risk profile.

Write tests for:

- content loaders/parsers
- route generation helpers
- utility logic
- key smoke flows with Playwright

Do not over-test:

- one-off presentation-only components
- purely cosmetic animation values

Manual QA must cover:

- desktop
- mobile
- touch-device fallbacks
- reduced-motion mode
- contact CTA
- route transitions

## 19. Documentation Rules

If implementation changes any of the following, update docs in the same task:

- page structure
- stack choices
- motion system
- content model
- deployment setup

Documentation source of truth:

- `PRD.md` for product behavior and scope
- `ARCHITECTURE.md` for technical structure
- `AI_RULES.md` for collaboration and implementation behavior
- `PLAN.md` for sequencing

## 20. Build Order Constraints

Implementation should happen in this order:

1. repo cleanup / scaffold decision
2. design tokens and typography foundation
3. two-column layout shell (LeftRail + RightContent) without heavy motion
4. content population (left-rail copy, section content)
5. section switching and nav state
6. cursor and interaction layer
7. detail pages (venture, note) within same layout
8. polish, QA, performance, deploy

This ordering prevents the project from becoming an effects-first demo with weak foundations.
