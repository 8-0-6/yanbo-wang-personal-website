# AI_RULES.md

> Non-negotiable rules for all AI coding agents working on Yanbo Wang's personal website.
> Read this file at the start of every session.
> Violating these rules is a bug.

---

## 0. First Things First

At the start of every new session, before writing code:

1. Read `AI_RULES.md` in full.
2. Read `ARCHITECTURE.md` in full.
3. Read `PRD.md` in full.
4. Read `PLAN.md` in full.
5. Check the current repo contents before making assumptions.

Priority order:

- `PRD.md` = what the site is supposed to be
- `ARCHITECTURE.md` = how the project is structured
- `AI_RULES.md` = how to work with Yanbo
- `PLAN.md` = the intended order of execution

---

## 1. Who You're Working With

Yanbo is a founder, not a full-time frontend engineer.

That means:

- explain simply first, then do
- keep summaries concise and in plain English
- if a technical term matters, explain it briefly
- do not drown the user in implementation detail unless asked

Communication language:

- English

---

## 2. Product Non-Negotiables

This site must feel:

- editorial
- clean
- gallery-like
- premium through restraint
- founder-led

This site must also remain:

- clear enough for media, collaborators, and investors
- easy to understand within about 30 seconds
- high-level rather than resume-dense
- **site-wide two-column layout**: left rail (name, tagline, nav, contact) and right content (About, Ventures, Notes, Contact)

The site must not turn into:

- a generic personal site
- a corporate portfolio
- an agency-style showcase
- a cyberpunk neon tech demo
- an anime/gaming-inspired experience
- a busy, over-interactive demo

---

## 3. Taste Rules

When making design decisions:

- prioritize editorial clarity over decoration
- prioritize restraint over spectacle
- prioritize expressive typography over generic UI
- prioritize content breathing room over density

Do not default to:

- black-and-purple startup gradients
- generic glassmorphism everywhere
- safe SaaS layout patterns
- heavy interaction gimmicks
- cluttered layouts

The chosen visual direction is:

- editorial minimalism (Anna Mills–inspired)

Interpret that as:

- high-contrast black and white
- flat design, no shadows
- physical collage aesthetic for cards
- mixed serif/sans-serif typography
- 39% opacity for secondary elements

---

## 4. Content Rules

The website is a curated personal brand layer, not a public CV dump.

Always prefer:

- strong narrative
- selective proof
- high-level clarity

Do not prominently surface:

- GPA
- phone number
- overly exact resume bullet details unless strategically useful

Approved public proof points include:

- 40K downloads
- 8M+ social views
- FineMe as the flagship project

Experience should remain selective and high-level.

Ventures should appear before Experience in the content hierarchy.

Writing/Notes is required at launch.

---

## 5. Visual Asset Rules

Real and AI-generated visuals are both allowed.

Approved uses of AI-generated imagery:

- worldbuilding visuals
- stylized portraits
- textures and graphic motifs
- editorial composites based on approved themes

Do not use AI to imply:

- fake achievements
- fake press coverage
- fake events or environments presented as real

If using a generated portrait or composite, keep it clearly art-directed, not deceptive.

---

## 6. Interaction Rules

Interaction is minimal and purposeful.

Required interactions:

- custom cursor (simplified states)
- left-rail navigation with active section highlight
- fade transition when switching sections
- hover effects on cards and links (color/opacity changes)

Rules:

- less is more — interactions support the content, not distract from it
- navigation is the fixed left rail; the right area shows one section at a time (About, Ventures, Notes, Contact)
- interactions must degrade gracefully on mobile
- interactions must respect reduced-motion settings

---

## 7. Technical Rules

Unless explicitly approved otherwise:

- deploy on Vercel
- use Next.js with TypeScript
- keep content local and easy to edit
- avoid backend complexity at v1
- avoid introducing a CMS at v1
- avoid full-site 3D architecture at v1

Prefer:

- CSS Modules and design tokens over template-like styling systems
- Framer Motion for standard motion
- GSAP only where precise control is truly needed

Do not add technology just because it looks impressive.

---

## 8. Work Rhythm

Yanbo prefers baby steps.

Default loop:

`Plan -> small chunk -> summarize -> test -> confirm -> next chunk`

Break work into smaller steps when:

- the task spans many files
- the task mixes product, design, and engineering decisions
- the risk of drifting from the intended aesthetic is high

For small isolated tasks:

- do the work
- summarize clearly at the end

---

## 9. Autonomy and Asking

You can do without asking:

- create files that fit the agreed architecture
- make small nearby fixes
- refactor code you just touched if it improves clarity
- add assets or helpers needed for the current task

You must ask before:

- changing the chosen visual direction in a major way
- making large architectural changes not reflected in `ARCHITECTURE.md`
- replacing major sections of content strategy from `PRD.md`
- removing an interaction system that is explicitly required
- introducing heavy dependencies or a new rendering model

If something is ambiguous:

- make the smallest reasonable assumption
- say what you assumed
- continue unless the risk is genuinely high

---

## 10. Coding Style

Code should be:

- readable
- deliberate
- not over-abstracted
- easy for another agent to pick up

Comments should be:

- sparse
- useful
- not obvious

Do not:

- over-engineer for future scale
- create wrappers around wrappers
- invent elaborate patterns before they are needed

---

## 11. Performance Rules

Looking good is the top priority, but performance still matters.

Interpret that as:

- pursue premium visuals
- avoid wasteful technical choices
- lazy-load heavy interaction layers
- keep notes/content pages light
- do not ship effects that feel expensive but add no real identity

The goal is not to win Lighthouse at the expense of design.
The goal is to feel sharp, responsive, and intentional.

---

## 12. Responsive Rules

This project is not mobile-first in visual ambition, but it must be mobile-safe.

Rules:

- desktop can carry the boldest art direction
- mobile must still feel polished and deliberate
- do not simply collapse complex layouts into awkward stacks
- redesign interactions for touch where needed

---

## 13. Testing Rules

Use judgment.

Write tests for:

- utilities
- content parsing
- routing helpers
- critical smoke flows

Do not waste time writing tests for:

- purely cosmetic layout details
- one-off motion tuning values

Always manually verify:

- desktop behavior
- mobile behavior
- key CTA flows
- reduced-motion fallback when interaction is involved

---

## 14. Documentation Discipline

If your work changes:

- structure
- scope
- stack
- content model
- motion system

then update the relevant docs in the same task.

Do not let implementation drift away from the docs silently.

---

## 15. Collaboration Style

When starting work:

- say what you're about to do in plain English

When finishing work:

- summarize what changed
- say why it changed
- say how you verified it

When you find a small nearby bug:

- fix it
- mention it afterward

When you hit repeated failure:

- stop after a few real attempts
- summarize what you tried
- propose a simpler path

---

## 16. Git Rules

If git workflow is part of the task:

- create focused branches
- use small, readable commits
- keep changes scoped

Preferred branch style:

- `codex/feat-...`
- `codex/fix-...`
- `codex/docs-...`

Do not push to remote without explicit user approval.

---

## 17. Final Reminder

This project is supposed to feel like:

- a founder's world
- a playful object
- a sharp piece of personal branding

If a decision makes the site safer but more generic, that is usually the wrong direction.
