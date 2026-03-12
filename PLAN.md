# PLAN.md

## 1. Goal

Build a personal website for Yanbo Wang that is:

- founder-first
- visually clean and editorial (Anna Mills–inspired)
- useful for media, collaborators, and investors
- clear enough to work as a personal brand destination and application link
- **site-wide two-column layout**: left rail (name, tagline, portrait, nav) and right content (About, Ventures, Experience, Life, Notes, Contact)

## 2. Current Assumptions

Assumptions captured from discovery:

- primary purpose is personal branding, then startup/investor interest
- audience priority is media, collaborators, then investors
- the site should feel clean and editorial (Anna Mills–inspired minimalism)
- **the site uses a two-column layout site-wide**: left rail fixed (name, tagline, portrait, nav), right content shows one section at a time (About, Ventures, Experience, Life, Notes, Contact)
- Ventures should come before Notes in content hierarchy
- the site should include Notes at launch
- the site should stay high-level and avoid public CV overexposure
- interaction is restrained: custom cursor, section transitions, hover effects only
- Vercel deployment is required

## 3. Recommended Execution Strategy

This project should be built in controlled phases.

Reason:

- the visual bar is high
- the interaction layer can easily get out of hand
- content, art direction, and engineering all need to stay aligned

## 4. Phase Plan

### Phase 0: Repo Normalization

Goal:

- turn the current workspace into a clean home for the website project

Tasks:

- decide whether the existing X research helper stays in this repo
- if yes, move it into `tools/x-research/`
- prepare the repo root for the website app

Output:

- clear repository structure
- no confusion between legacy scripts and the new site

Approval gate:

- confirm repo layout before scaffolding the app

### Phase 1: Content Spine

Goal:

- create the narrative spine before design implementation

Tasks:

- finalize **left-rail copy**: one-line tagline + short welcome or 2–3 sentence intro
- define **left-rail portrait direction**: section-reactive image set and placement behavior
- define venture summaries for FineMe and Jobro
- define high-level experience entries
- define About copy and interest blurbs
- define initial Notes list and working titles
- gather approved links, screenshots, logos, and selected real photos

Output:

- structured content inventory
- approved core copy for the first build

Approval gate:

- confirm the story and section hierarchy before visual exploration

### Phase 2: Art Direction

Goal:

- lock the visual language before building too many components

Tasks:

- create 2 to 3 style directions inside the agreed retro-futurist lane
- choose typography pairing
- choose color system
- define texture/motion references
- define cursor concept
- define how hobbies map into visuals and interactions
- define **Life section visual interaction spec**: trigger labels, reveal style, and media layering for albums/fashion

Output:

- visual direction shortlist
- one approved design direction

Approval gate:

- confirm the chosen art direction before coding complex UI

### Phase 3: UX and Information Architecture

Goal:

- define what the user sees and in what order

Tasks:

- **wireframe the two-column layout**: left rail (name, headshot, copy, nav) and right content area
- define **section order and switching**: which section is default (e.g. About), how left nav maps to right content, deep-link behavior (e.g. `/#about`)
- define subpages (venture detail, note article) and how they use the same layout
- define CTA placement (Contact section and/or left rail)
- decide where each toy-like interaction lives within the two-column layout

Output:

- wireframe-level page structure
- interaction placement plan

Approval gate:

- confirm structure before engineering the layout system

### Phase 4: Project Scaffold

Goal:

- create the technical foundation

Tasks:

- scaffold Next.js app with **two-column layout shell** in mind
- install baseline dependencies
- set up TypeScript, linting, formatting
- set up global tokens and CSS architecture
- configure content structure for Notes and venture data
- set up Vercel-friendly project conventions

Output:

- running app
- stable project foundation

Approval gate:

- confirm the scaffold before building sections

### Phase 5: Design System and Layout Foundation

Goal:

- build the reusable visual language first

Tasks:

- implement typography system
- implement color and texture tokens
- **build the two-column layout shell**: LeftRail (fixed) + RightContent (main area)
- **style left rail** (name, headshot placeholder, copy, nav) and **right section container**
- **implement nav highlighting and section switching** (state or hash)
- implement baseline responsive behavior (stack or drawer on small screens)

Output:

- site shell
- reusable styling foundation

Approval gate:

- confirm the static visual direction before motion work

### Phase 6: Full-Site Content and Sections

Goal:

- build the main content experience without the heavy interaction layer yet

Tasks:

- **populate left rail**: name, combo copy, nav; integrate section-reactive portrait assets
- **build right-hand sections**: About, Ventures, Experience, Life, Notes, Contact
- ensure section content is readable and hierarchy is clear

Output:

- complete two-column site with all sections
- content-first version of the site

Approval gate:

- confirm clarity and hierarchy before adding advanced interactivity

### Phase 7: Detail Pages

Goal:

- support deeper exploration without overcomplicating the main view

Tasks:

- build venture detail pages (same two-column layout; right side shows venture detail)
- build Notes index and Note article page template (same layout; right shows list or article)

Output:

- working subpages
- complete content architecture

Approval gate:

- confirm route structure and reading experience

### Phase 8: Interaction Layer

Goal:

- add the playful signature systems

Tasks:

- implement custom cursor
- **animate section switching** (e.g. fade/slide when changing About / Ventures / Experience / Notes / Contact)
- implement desktop section snap behavior and smooth settling
- implement hover/click reveal system in Life section (Albums/Fashion)
- tune transitions to keep interaction playful but readable

Output:

- interactive signature layer
- site now feels like a toy without losing readability

Approval gate:

- confirm that interactivity improves the experience rather than distracting from it

### Phase 9: Asset and Visual Worldbuilding

Goal:

- make the site feel fully art-directed

Tasks:

- process real photos
- generate supporting visuals where needed
- integrate textures, collages, background systems, and motion accents
- ensure real and generated assets feel visually coherent

Output:

- final visual identity layer

Approval gate:

- confirm that the site now feels distinct and premium

### Phase 10: Polish, QA, and Performance

Goal:

- make the experience launch-ready

Tasks:

- test desktop and mobile
- test reduced-motion behavior
- polish transitions and edge cases
- optimize assets
- remove unnecessary payload
- validate contact CTA and route behavior

Output:

- stable launch candidate

Approval gate:

- confirm launch readiness

### Phase 11: Deployment

Goal:

- ship the site

Tasks:

- configure Vercel
- set production metadata
- confirm domain plan
- deploy preview
- deploy production

Output:

- live personal website

## 5. Working Method

Execution should follow this loop:

1. plan the next smallest meaningful chunk
2. build that chunk
3. summarize what changed
4. test it
5. get confirmation
6. move to the next chunk

## 6. Suggested First Build Slice

The first real implementation slice should be:

1. normalize the repo
2. scaffold the Next.js app and **two-column layout** (LeftRail + RightContent)
3. add **left rail static content**: name, placeholder headshot, combo copy, nav
4. add **right-side placeholder sections** (About, Ventures, Experience, Life, Notes, Contact) with simple switching
5. then iterate on portrait system and real content

Reason:

- it creates a stable canvas quickly
- it lets the art direction evolve on real screens
- it avoids starting with isolated effects

## 7. Definition of Done for v1

v1 is done when:

- **site-wide two-column layout is consistent**: left rail (name, tagline, portrait, nav) and right content (About, Ventures, Experience, Life, Notes, Contact)
- **all sections are reachable via left nav** and content is clear
- **About, Experience, and Life each have clear roles** (identity, credibility, and taste)
- the site clearly communicates Yanbo's identity in a clean, editorial way
- Ventures leads the story
- Notes exists at launch
- the site feels calm, gallery-like, and premium through restraint
- desktop and mobile both feel intentional
- the site is fast enough to feel premium
- the site is deployed on Vercel

## 8. If Tradeoffs Are Needed

If time or complexity forces tradeoffs, keep these first:

- clean editorial art direction
- clear founder narrative
- Ventures section quality
- reliable performance
- custom cursor

Cut or delay these first:

- optional animations beyond section transitions
- decorative elements
- additional interactive components
