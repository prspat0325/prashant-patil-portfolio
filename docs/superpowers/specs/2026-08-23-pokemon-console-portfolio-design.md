# Pokemon-Console Portfolio Site — Design Spec

Date: 2026-08-23

## Purpose

A personal developer portfolio for Prashant Patil (DevOps Engineer), styled and
animated to feel like a late-1990s Japanese handheld game console — specifically
evoking the Pokemon Game Boy Color titles' start menu and dialogue-box UI. The
goal is a portfolio that's memorable and distinct from a generic template, while
still functioning as a real job-hunting tool: content must be readable,
linkable, and accessible without the theming getting in the way.

## Content Source

All copy is sourced directly from `Prashant_Patil_Resume_DevOpsEngineer`
(the version at `C:\Users\Satyam\Desktop\resume\`), not placeholder text:

- **Identity**: Prashant Patil, DevOps Engineer | CI/CD | AWS | Kubernetes.
  Pune, Maharashtra, India. +91 93730 34327,
  prashant.patil25@outlook.com, linkedin.com/in/prashant-patil,
  github.com/oneupon2.
- **Summary**: 3.2+ years experience building CI/CD pipelines, automating
  infrastructure provisioning, and managing containerized cloud-native
  applications on AWS. Docker, Kubernetes, Terraform, IaC. AWS (EC2, S3, RDS,
  DynamoDB, IAM, CloudWatch). OCI-Exadata → AWS@Exadata migration. Datadog,
  Splunk, Grafana.
- **Skills** (grouped for the MOVES screen):
  - Cloud & Infra: AWS (EC2, S3, RDS, DynamoDB, IAM, CloudWatch), Terraform,
    Infrastructure as Code, Kubernetes, Docker, Linux, Cloud Computing
  - CI/CD & Automation: Jenkins, GitLab CI/CD, DevOps
  - Languages: Python, Core Java
  - Monitoring & Tools: Datadog, Splunk, Grafana, Jira, Salesforce, ServiceNow
  - Other: Machine Learning, Angular
- **Experience** (BADGES):
  - NASDAQ, Pune — DevOps Engineer, Aug 2023–Present (Terraform IaC, Docker,
    Kubernetes, AWS administration, AWS@Exadata migration, Confluence
    documentation, enhancement tickets)
  - Adenza, Pune — Cloud Intern, Jan 2023–Aug 2023 (Jenkins automation,
    Datadog/Splunk/Grafana monitoring, PostgreSQL/Oracle, Jira/Salesforce/
    ServiceNow support)
- **Certifications** (ribbon badges under BADGES): edX – Introduction to
  Linux; edX – AWS Cloud Practitioner Essentials; Nasdaq AxiomSL v10
  Associate Technical Certification.
- **Education**: M.Sc. Computer Science, MIT WPU, July 2023, 92%; B.Sc.
  Computer Science, MIT WPU, June 2021, 87%.
- **Projects** (POKEDEX) — three entries:
  1. **Anurup Collections** — not on the resume (postdates it), added by
     explicit request because it's real, deployed, full-stack production
     work: Spring Boot + React e-commerce site with Google Sign-In, Razorpay
     payments, admin order management. Link: the live site
     (`https://anurup-collections-2026.vercel.app`).
  2. **Sasta OLX** — Angular academic project, OLX-style marketplace with
     Firebase auth and a custom carousel. Link: `github.com/oneupon2`
     (resume gives no per-project repo URL, so link generically — do not
     invent a specific repo name).
  3. **Medical Image Classification (CNN)** — research project, pneumonia
     detection from chest X-rays using a ResNet V2-based CNN, Feb–May 2023.
     Link: `github.com/oneupon2`, same caveat as above.

## Tech Stack

- React + Vite (matches the Anurup Collections frontend stack the user
  already knows).
- Framer Motion for menu-cursor movement and screen-wipe transitions.
- Google Fonts: `Press Start 2P` for headings/menu chrome; a more legible
  pixel-styled font (or plain monospace fallback) for dialogue-box body text
  so paragraph-length resume content stays readable at small sizes.
- Web Audio API for blip sound effects — no audio library dependency.
- No backend. All content lives in plain data files (e.g.
  `src/data/profile.js`) so it can be edited without touching UI code.
- No test framework (matches the Anurup Collections frontend convention);
  verification is manual via the dev server.

## Visual Design

- **Palette**: Game Boy Color / Pokemon-blue — navy-to-slate gradient
  background, gold frame border, white dialogue/menu boxes with navy text,
  a red accent (text-shadow, highlights) for emphasis. Confirmed via visual
  companion mockup (`palette.html`, choice `gbc`).
- **Layout**: full-screen game-menu UI (visual companion mockup
  `console-concepts.html`, choice `b`) — no fixed device-frame chrome around
  the page (rejected option A), so the layout can be fully responsive on
  mobile without a device bezel eating screen space.

## Navigation & Screens

1. **Boot screen** — "PRASHANT PATIL" title card with a blinking "PRESS
   START" prompt. Click or any keypress advances to the main menu.
2. **Main menu** — a vertical list with a `▶` cursor. Each item shows a
   small subtitle under its game-style label (added after initial user
   feedback that the game terminology alone was unclear):
   - **TRAINER CARD** ("About") — bio, title, location, a few stat callouts
     drawn from the resume summary (years of experience, specialty areas),
     and a resume PDF download button.
   - **POKEDEX** ("Projects") — the three projects as numbered entries
     (No. 001, 002, 003); selecting one opens a detail card (description,
     tech stack, link) in the same dialogue-box style.
   - **MOVES** ("Skills") — skills as a grouped move list (see grouping
     above).
   - **BADGES** ("Experience") — work experience as earned badges (company,
     role, dates, achievement bullets), certifications as smaller ribbon
     badges below.
   - **CONTACT** ("Get in touch") — email / phone / LinkedIn / GitHub as a
     selectable list; selecting one opens `mailto:`/`tel:`/the external
     profile link.
3. Selecting a main-menu item triggers a screen-wipe transition into that
   section. A `B`-equivalent control (on-screen button, plus Escape/
   Backspace) returns to the main menu.
4. Dialogue-box body text types itself out letter-by-letter.

### Interaction model

- **Keyboard**: Up/Down moves the cursor, Enter/Space selects, Escape/
  Backspace goes back — a blip sound plays on move and on select.
- **Mouse/touch**: every menu item and control is also directly clickable/
  tappable — keyboard nav is additive, not a requirement to use the site.
- Underlying markup is real semantic HTML (headings, links, buttons) styled
  to look like a game UI — not a canvas/game-engine reimplementation — so
  links are copyable, text is selectable, and the site remains usable by
  assistive tech and search crawlers.

### Sound

- Menu-move blip, menu-select blip, and a soft typing blip during dialogue
  text reveal.
- Muted by default; a visible mute/unmute toggle persists its state via
  `localStorage`. No autoplay before user interaction.

### Motion & accessibility

- All animation (screen-wipes, typing reveal, creature idle loops, cursor
  movement) respects `prefers-reduced-motion`: typing text appears instantly,
  transitions become instant/simple fades, creature idle loops freeze to a
  static pose.

## Original Creature Mascots

Per explicit direction, these are **original designs inspired by** (not
reproductions of) Mewtwo, Rayquaza, and Kyogre, to avoid using Nintendo/
Game Freak's copyrighted character art on a public, real-name-attached site.
(This was revisited once, mid-build, when the user asked for the actual
copyrighted designs instead — that request was explicitly reversed in the
same conversation, back to original-only, after a second confirmation of
the trademark/copyright risk. The mascots below reflect the final,
original-only decision.)

- A psychic-styled biped (`PsychicCreature`), redrawn with a larger,
  more detailed pixel silhouette — ears, big eyes, a distinct body/leg
  shape — idling/floating in a corner of the **TRAINER CARD** screen.
- A serpentine dragon-styled creature (`DragonCreature`), similarly
  enlarged with a clearer head/wing/tail silhouette, that streaks across
  once on entering the **BADGES** screen, then idles.
- A deep-sea leviathan-styled creature (`LeviathanCreature`), redrawn with
  a rounded body, dorsal fin, and tail fluke, with a slow bobbing loop in
  the background of the **POKEDEX** screen.
- A fourth original mascot (`MenuCompanion`) was added on the **main
  menu** screen, which previously had no creature at all and read as
  visually empty — a small original blob-style character with its own
  color palette, floating beside the menu list.

All four are decorative, sized to have real presence without overwhelming
the resume content, and all freeze under `prefers-reduced-motion`.

## Deployment

- New GitHub repo (name/visibility to be confirmed with the user before
  creation), pushed from `C:\Users\Satyam\IdeaProjects\Portfolio`.
- New Vercel project connected to that repo, auto-deploying on push to
  `main` — same pattern as `anurup-collections-2026`.

## Testing

No automated test framework (matches the Anurup Collections frontend
convention). Verification is manual, via the Vite dev server, covering:
keyboard navigation (arrows/Enter/Escape), mouse/touch navigation, mobile
viewport widths, `prefers-reduced-motion` fallback behavior, and the mute
toggle.
