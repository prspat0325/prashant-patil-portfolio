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
   START" prompt. Click or any keypress advances to the main hub.
2. **Main hub — walkable town** (revised from a vertical menu list, per
   user feedback; see "Hub Screen Revision History" below). Selecting a
   section still maps to the same five keys/screens, each with a subtitle
   for clarity (added after initial feedback that the game terminology
   alone was unclear):
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
3. Entering a section (walking into its building in the town, or selecting
   it in a sub-screen's own list) triggers a screen-wipe transition. A
   `B`-equivalent control (on-screen button, plus Escape/Backspace) returns
   to the town from any section; within POKEDEX/CONTACT, the same keys
   step back through that screen's own list first.
4. Dialogue-box body text types itself out letter-by-letter.

### Interaction model

- **Town hub**: Arrow keys walk the character continuously (held-key,
  frame-driven movement, not single-step); walking into a building's door
  radius enters that section. Every building is also a real `<button>`,
  directly clickable/tappable, so mouse/touch users reach every section
  without needing the keyboard — walking is additive flavor, not a
  requirement.
- **Sub-screen lists** (POKEDEX, CONTACT): Up/Down moves a `▶` cursor,
  Enter/Space selects, Escape/Backspace goes back. Every item is also
  directly clickable/tappable.
- Underlying markup is real semantic HTML (headings, links, buttons) styled
  to look like a game UI — not a canvas/game-engine reimplementation — so
  links are copyable, text is selectable, and the site remains usable by
  assistive tech and search crawlers.

### Sound

- A single confirm blip, played when a section is entered (walking into a
  building, or clicking a building/list item) — nothing plays on cursor
  movement or during dialogue typing (both were tried and cut: movement/
  typing blips read as noisy rather than "clean" on real content, per user
  feedback).
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
- A fourth original mascot (`BoyCharacter`) is the player-controlled
  character in the walkable town hub (superseding an earlier static
  `MenuCompanion` blob that stood next to the old menu list — see
  "Hub Screen Revision History" below) — walks via arrow keys, flips to
  face its direction of travel, and bobs while moving.

All four are decorative, sized to have real presence without overwhelming
the resume content, and all freeze under `prefers-reduced-motion`.

## Hub Screen Revision History

The main hub was originally a vertical list menu (`MainMenu.jsx`, built in
the initial plan). After using the deployed site, the user asked for two
follow-up changes to the hub specifically:

1. Subtitles under each menu label, since the game terminology alone
   ("POKEDEX", "BADGES") didn't make clear what content was behind it —
   implemented as a second line per item (see Navigation & Screens above).
2. A walkable overworld: "guide him to house/park/museum ... where my
   skills are located" — replacing the list entirely with a small town the
   `BoyCharacter` walks around, each building mapped to one of the same
   five sections:

   | Building | Section |
   |---|---|
   | House | TRAINER CARD (About) |
   | Pokemon Center | CONTACT |
   | Museum | POKEDEX (Projects) |
   | Gym | BADGES (Experience) |
   | Library | MOVES (Skills) |

   `MainMenu.jsx` and its `MenuCompanion` mascot were deleted (fully
   superseded, not kept as an alternate mode) in favor of `TownScreen.jsx`.
   Walking is arrow-key driven (continuous, held-key movement via
   `requestAnimationFrame`, not single-step); every building remains a
   real, directly clickable `<button>` so the mouse/touch parity
   requirement in Global Constraints still holds without needing an
   on-screen d-pad.

Separately, sound was simplified twice based on direct feedback: first the
per-character typing blip was throttled (skip spaces, every other
character) because it became a "machine gun" on Badges' long joined bullet
text; then, after further feedback that it was still annoying, both the
typing blip and the menu-cursor-move blip were removed entirely, leaving
only a single confirm blip on selecting/entering a section (see Sound
above for the current, final behavior).

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
