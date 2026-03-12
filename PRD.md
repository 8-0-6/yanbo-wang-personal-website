# PRD.md

## 1. Product Summary

This project is the personal website for **Yanbo Wang**.

Its main job is to act as a high-signal digital home for:

- personal branding
- startup and investor interest
- media and collaborator discovery
- event and application links where a personal website adds credibility

This is **not** meant to be a full resume on the web. It should present a strong, memorable, high-level narrative about Yanbo as a founder-builder with strategy depth, growth instincts, and strong taste.

Core takeaway:

> Yanbo Wang is a strategy-minded builder who ships products and understands growth.

## 2. What This Site Is

This site is:

- a founder-led personal brand site
- a digital identity layer that feels original, playful, and high taste
- a curated overview of ventures, experience, interests, and thinking
- a site that feels fun to explore and memorable after one visit
- a site that can be linked in applications, media conversations, intros, and investor outreach

This site is not:

- a copy-paste resume website
- an agency-style portfolio
- a corporate personal brand page
- a cyberpunk demo full of effects with no clarity
- a detailed public archive of private information
- a generic “student founder” template

## 3. Primary Audience

Primary audiences:

- media
- potential collaborators
- investors

Secondary audiences:

- event organizers
- startup communities and programs
- curious operators and founders

The site should work even if the visitor knows nothing about Yanbo beforehand.

## 4. Positioning

The homepage should lead with a blended identity in this order:

1. founder-builder
2. consultant turned founder
3. internet-native creative

The site should also surface personal taste and hobbies as proof of range and personality, not as random side notes.

Prominent hobbies/interests:

- vintage and archive clothing
- bodybuilding
- hiphop music composition
- Rubik's cube

Supporting interests:

- basketball
- photography

## 5. Brand Direction

Chosen direction for v1:

- **Editorial minimalism** (Anna Mills–inspired)
- tone: **clean and restrained** first
- secondary tone: sharp/confident
- tertiary tone: gallery-like calm

The site should feel:

- editorial
- gallery-like
- founder-led
- clean without becoming sterile
- premium through restraint, not decoration

The site must avoid:

- cyberpunk neon overload
- anime/gaming aesthetics
- agency-looking portfolio patterns
- over-decorated UI with too many interactions
- busy, chaotic layouts

## 6. Product Principles

1. **Memorable first, generic never**
   The site should feel like Yanbo, not like a polished template.

2. **Interactive but still legible**
   Playfulness must add identity, not bury the information.

3. **High-level over exhaustive**
   The site should tell the story, not dump every detail.

4. **Founder-first**
   Ventures and shipped work matter more than credentials alone.

5. **Taste is part of the signal**
   Fashion, music, physical discipline, and puzzles are part of the brand.

6. **Motion is a product feature**
   The interaction layer is not decoration. It helps differentiate the site.

## 7. Information Architecture

The site uses a **site-wide two-column layout**: left rail fixed, right content area.

**Left rail (fixed):**

- name (Yanbo Wang), uppercase, display font
- one-line tagline
- main navigation: About, Ventures, Experience, Life, Notes, Contact
- portrait / identity visual treatment

**Right content area:**

- Shows the active section based on left nav. Sections: **About**, **Ventures** (FineMe, Jobro), **Experience**, **Life**, **Notes** (writing list), **Contact** (email, social links).
- Home defaults to About.

Navigation for launch:

- About
- Ventures
- Experience
- Life
- Notes
- Contact

Product structure:

- site-wide two-column shell (left rail + right content)
- left rail: identity (name, tagline, portrait) + section navigation
- right content: one active section at a time
- venture detail pages and note article pages use the same layout

## 8. Content Model

### 8.1 Left Rail (replaces hero)

The left rail is the persistent identity strip. It should communicate who Yanbo is, what he builds, why he is interesting, and what kind of energy the site has.

Required left-rail ingredients:

- **Name** (Yanbo Wang / Bob)
- **Portrait / identity visual**: section-reactive portrait treatment (image-based or stylized) that keeps the identity strip strong and recognizable.
- **Combo copy**: one-line positioning (e.g. founder-builder tagline) plus either a short welcome line or 2–3 sentence intro.
- **Main navigation** into About, Ventures, Experience, Life, Notes, Contact.

The rest of the site (custom cursor, playful interactions) supports this layout; there is no centered navigation dock or single-screen scene switching.

### 8.2 Ventures

This is one of the main right-hand sections and the most important content area after the left rail.

Ventures should be framed as:

- flagship venture: **FineMe**
- featured supporting venture: **Jobro**

Ventures must highlight:

- what the venture is
- why it matters
- Yanbo's role
- proof points or traction
- selected screenshots / generated visuals / product artifacts

Priority proof points currently approved:

- 40K downloads
- 8M+ social views
- FineMe as flagship founder project

### 8.3 Experience

Experience is a right-hand section. It can be a dedicated section or embedded inside About; the PRD treats it as a separate section for clarity. It should combine:

- professional experience
- academic experience

It should stay high-level and selective.

It should not read like a full resume.

The job of this section is to reinforce:

- strategic training
- execution ability
- range

It should mention strong signals like Oliver Wyman, TikTok, HKU, Columbia, and Harvard in a concise way without going into private or overly specific detail.

### 8.4 Notes

Notes is a right-hand section. The site should launch with a writing section.

This section is meant to:

- show thinking
- make the brand feel more dimensional
- give media/collaborators/investors more signal

At launch, short pieces are acceptable. The goal is quality of thinking, not volume.

Suggested tone:

- sharp
- personal
- internet-native
- reflective without being overly polished

### 8.5 About

About is a primary right-hand section. It should humanize Yanbo and connect the personal taste layer to the founder layer.

It should cover:

- personal philosophy
- experience summary (high-level)
- hobbies/interests
- selected photos or art-directed generated visuals
- short facts or signals that are memorable

### 8.6 Life

Life is a dedicated right-hand section for taste and personality signals.

It should cover:

- fashion and archive references
- music references
- visual collage-style artifacts
- playful interaction moments that still keep the page legible

### 8.7 Contact

Contact is a right-hand section (not a separate page). Primary CTA:

- "Talk to me"

Primary contact method:

- `businessuseonly12345@gmail.com`

Secondary public links:

- LinkedIn: `www.linkedin.com/in/ybw`
- X: `@BobBuiltThis`

The contact experience should feel intentional and on-brand, not like a generic footer form.

## 9. Interaction Requirements

The site should feel calm and editorial, with restrained, purposeful interaction.

Required interactions for v1:

- custom cursor with a distinct visual identity
- left-nav highlight for the active section
- section snap scrolling (one section at a time on desktop)
- fade/transform transition when switching sections
- hover effects on cards and links (opacity/color changes)
- physical collage feel: venture cards with slight rotation and overlap
- Life section reveal interactions (hover/click trigger to reveal Albums or Fashion boards)

Interaction rules:

- less is more — interactions support the content, not distract from it
- touch devices must get a clean experience
- reduced-motion users must get a stable accessible version

## 10. Visual Requirements

Visual direction for v1:

- editorial minimalism (Anna Mills–inspired)
- high-contrast black and white base
- flat design — no shadows, no gradients
- physical collage aesthetic for cards (slight rotation, overlap)
- mixed typography: serif display font (Playfair Display) + Georgia body + Inter small text
- 39% opacity for muted/secondary elements
- unified 11px border-radius
- pure white background
- restrained accent colors: pink (#EA587D) and blue (#0000EE) only

The site should prefer:

- content over decoration
- restraint over spectacle
- editorial typography over generic UI
- gallery-like breathing room

## 11. Content and Privacy Rules

Do not prominently display:

- GPA
- phone number
- resume-level exhaustive detail

The site should keep facts true but presented at a high level.

This site should reveal:

- direction
- taste
- capability
- momentum

It should not overshare:

- sensitive personal details
- private contact details beyond the approved business email
- exact resume bullet content unless strategically useful

## 12. AI-Generated Visuals

AI-generated visuals are allowed for this project.

Approved uses:

- abstract or stylized portraits
- worldbuilding imagery
- textures, collages, visual motifs, and scene-building
- editorial composites built from real themes or interests

Guideline:

- generated visuals should support the site's art direction
- generated visuals must not imply fake achievements, fake press, or fake real-life events

## 13. Functional Requirements

The site must:

- deploy on Vercel
- work well on desktop and mobile
- feel premium on mobile even if desktop is the primary design target
- load fast enough to feel sharp and intentional
- support future updates to ventures and notes without a heavy CMS

The site does not need at launch:

- login/auth
- dashboard/backend
- full CMS
- press section
- complex forms

## 14. Launch Scope

In scope for v1:

- site-wide two-column layout (left rail fixed, right content)
- left rail: name, portrait visual, combo copy, section navigation (About, Ventures, Experience, Life, Notes, Contact)
- right content: About, Ventures, Experience, Life, Notes, Contact sections
- venture detail pages and note article pages (same layout or simplified)
- custom cursor
- selected playful interactions
- fast deploy on Vercel

Out of scope for v1:

- ecommerce
- private founder portal
- full media archive
- exhaustive case-study system for every role
- fully 3D site-wide experience
- a single-page multi-scene homepage with centered navigation dock as the primary pattern

## 15. Success Criteria

The launch is successful if:

- the site feels distinct within 5 seconds
- a new visitor can understand who Yanbo is within 30 seconds
- the site communicates founder energy, taste, and execution ability
- the site gives media/collaborators/investors enough confidence to reach out
- the site feels genuinely fun to explore
- the site remains clear enough that the interactivity helps rather than hurts

## 16. Non-Goals

This site is not trying to:

- replace LinkedIn
- publish a complete public CV
- impress through complexity alone
- become a generic startup landing page
- optimize for corporate recruiter expectations at the expense of personality

## 17. Source of Truth

For this project:

- `PRD.md` defines product intent and scope
- `ARCHITECTURE.md` defines technical structure
- `AI_RULES.md` defines collaboration rules
- `PLAN.md` defines execution order

If implementation decisions conflict with this document, this document should be updated or the decision should be reconsidered.
