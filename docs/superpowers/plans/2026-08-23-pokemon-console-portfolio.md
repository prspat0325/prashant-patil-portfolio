# Pokemon-Console Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React + Vite personal portfolio for Prashant Patil, styled and animated as a Game Boy Color / Pokemon-style start-menu console, populated with his real resume content, deployable to Vercel.

**Architecture:** A single-page app with no routing library — one `App.jsx` owns a `screen` state machine (`boot` → `menu` → one of five content screens) and a shared sound/mute controller, passed down as props. Content is data-driven from one `src/data/profile.js` module so copy changes never touch component code. Navigation, typing text, sound, and reduced-motion behavior are each isolated into small reusable hooks.

**Tech Stack:** React 18, Vite, Framer Motion (transitions), Web Audio API (synthesized blips, no audio files), Google Fonts (`Press Start 2P` + a readable monospace body font), no backend, no test framework — verification is manual via the Vite dev server, per the spec.

**Spec:** `docs/superpowers/specs/2026-08-23-pokemon-console-portfolio-design.md`

## Global Constraints

- No backend, no database — fully static, deployed as a Vite build to Vercel.
- No automated test framework — every task ends in a manual dev-server verification step, not an automated test run.
- All animation (typing reveal, screen transitions, creature idle loops) MUST respect `prefers-reduced-motion` — freeze/instant fallback, not just "reduced."
- Sound is muted by default; never plays before a user interaction; mute state persists via `localStorage`.
- Every menu/list is navigable by both keyboard (arrows/Enter/Escape) and mouse/touch (click) — neither is optional.
- Underlying markup must be real semantic HTML (`button`, `a`, headings) — no canvas/game-engine rendering of text or links.
- Creature mascots are original designs "inspired by" Mewtwo/Rayquaza/Kyogre (palette/silhouette only) — never a reproduction of the actual copyrighted character art.
- All portfolio copy comes from `Prashant_Patil_Resume_DevOpsEngineer` (see spec's Content Source section for the exact values) — no invented achievements, dates, or links. The two resume projects link generically to `github.com/oneupon2`; only Anurup Collections gets a specific (real, verified) link.

---

## File Structure

```
Portfolio/
  index.html
  package.json
  vite.config.js
  public/
    resume-prashant-patil.pdf
  src/
    main.jsx
    App.jsx
    index.css
    data/
      profile.js
    hooks/
      usePrefersReducedMotion.js
      useTypewriter.js
      useSound.js
      useMenuNavigation.js
      useBackNavigation.js
    components/
      BootScreen.jsx
      MainMenu.jsx
      DialogueBox.jsx
      MuteToggle.jsx
      TrainerCardScreen.jsx
      PokedexScreen.jsx
      MovesScreen.jsx
      BadgesScreen.jsx
      ContactScreen.jsx
      creatures/
        PsychicCreature.jsx
        DragonCreature.jsx
        LeviathanCreature.jsx
```

- `data/profile.js` — the only place resume content lives.
- `hooks/` — pure, screen-agnostic interaction logic (navigation, typing, sound, motion preference). No JSX.
- `components/` — one file per screen plus small shared pieces (`DialogueBox`, `MuteToggle`) and the three creature mascots.
- `App.jsx` — owns the screen state machine and the single shared `useSound()` instance; everything else is a prop-driven child.

---

### Task 1: Project scaffold, theme, and resume asset

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`
- Create: `src/main.jsx`, `src/App.jsx`, `src/index.css`
- Create: `public/resume-prashant-patil.pdf` (copy of the real resume)

**Interfaces:**
- Produces: CSS custom properties on `:root` (`--gbc-navy`, `--gbc-navy-light`, `--gbc-gold`, `--gbc-white`, `--gbc-text`, `--gbc-red`) that every later component's CSS uses. Font classes `.font-pixel` (`Press Start 2P`) and `.font-body` (monospace body font) available globally.

- [ ] **Step 1: Author `package.json` and `vite.config.js` directly**

The directory already has `.git`, `.gitignore`, and `docs/` in it, so the interactive `npm create vite@latest .` scaffolder would prompt about a non-empty directory. Write the two config files by hand instead — everything else in this task writes its own files explicitly anyway.

`package.json`:

```json
{
  "name": "prashant-patil-portfolio",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

```bash
cd "C:\Users\Satyam\IdeaProjects\Portfolio"
npm install
```

- [ ] **Step 2: Set the page shell and font imports**

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prashant Patil — DevOps Engineer</title>
    <meta name="description" content="Prashant Patil, DevOps Engineer — portfolio" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

(`VT323` is the readable pixel-styled monospace body font used for paragraph-length dialogue text — `Press Start 2P` stays reserved for short headings/menu labels, since it's unreadable at paragraph length.)

- [ ] **Step 3: Write the theme stylesheet**

`src/index.css`:

```css
:root {
  --gbc-navy: #1d2b53;
  --gbc-navy-light: #2b3a6b;
  --gbc-gold: #f8d34a;
  --gbc-white: #ffffff;
  --gbc-text: #1d2b53;
  --gbc-red: #7b1030;
}

* { box-sizing: border-box; }

html, body, #root {
  height: 100%;
  margin: 0;
}

body {
  background: linear-gradient(180deg, var(--gbc-navy), var(--gbc-navy-light));
  color: var(--gbc-white);
  font-family: 'VT323', monospace;
  font-size: 20px;
}

.font-pixel { font-family: 'Press Start 2P', monospace; }
.font-body { font-family: 'VT323', monospace; }

button {
  font-family: inherit;
  cursor: pointer;
}

.console-frame {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.dialogue-box {
  background: var(--gbc-white);
  color: var(--gbc-text);
  border: 4px solid var(--gbc-navy);
  border-radius: 6px;
  padding: 14px 16px;
  font-size: 22px;
  line-height: 1.5;
  max-width: 560px;
  width: 100%;
  cursor: pointer;
}

.type-cursor {
  animation: blink 0.8s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .type-cursor { animation: none; }
}
```

- [ ] **Step 4: Wire the app entry point with a placeholder screen**

`src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

`src/App.jsx`:

```jsx
export default function App() {
  return (
    <div className="console-frame">
      <h1 className="font-pixel" style={{ fontSize: '14px' }}>PRASHANT PATIL</h1>
    </div>
  )
}
```

- [ ] **Step 5: Copy the resume PDF into the public folder**

```bash
mkdir -p "C:\Users\Satyam\IdeaProjects\Portfolio\public"
cp "C:\Users\Satyam\Desktop\resume\Prashant_Patil_Resume_DevOpsEngineer.pdf" "C:\Users\Satyam\IdeaProjects\Portfolio\public\resume-prashant-patil.pdf"
```

- [ ] **Step 6: Verify**

Run: `npm run dev` (from `Portfolio/`)
Open the printed local URL in a browser. Expected: a navy-to-slate gradient background with "PRASHANT PATIL" centered in the pixel font. Confirm `http://localhost:5173/resume-prashant-patil.pdf` opens the real resume PDF.

- [ ] **Step 7: Commit**

```bash
cd "C:\Users\Satyam\IdeaProjects\Portfolio"
git add -A
git commit -m "Scaffold Vite/React project with Game Boy Color theme"
```

---

### Task 2: Resume content data module

**Files:**
- Create: `src/data/profile.js`

**Interfaces:**
- Produces: `export default profile` — an object with shape:
  ```
  {
    identity: { name, title, location, phone, email, linkedin, github },
    summary: string,
    stats: [{ label, value }],
    skillGroups: [{ category, skills: [string] }],
    experience: [{ company, role, dates, bullets: [string] }],
    certifications: [string],
    education: [{ degree, school, date, percentage }],
    projects: [{ id, number, name, description, tech: [string], link: { label, url } }],
  }
  ```
  Every later screen component imports `profile` from this file and reads these exact fields.

- [ ] **Step 1: Write the content module**

`src/data/profile.js`:

```js
const profile = {
  identity: {
    name: 'Prashant Patil',
    title: 'DevOps Engineer | CI/CD | AWS | Kubernetes',
    location: 'Pune, Maharashtra, India',
    phone: '+91 93730 34327',
    email: 'prashant.patil25@outlook.com',
    linkedin: 'https://linkedin.com/in/prashant-patil',
    github: 'https://github.com/oneupon2',
  },
  summary:
    'DevOps Engineer with 3.2+ years of experience building CI/CD pipelines, ' +
    'automating infrastructure provisioning, and managing containerized, ' +
    'cloud-native applications on AWS. Skilled in Docker, Kubernetes, ' +
    'Terraform, and Infrastructure as Code, with hands-on experience ' +
    'administering cloud infrastructure and leading large-scale environment ' +
    'migrations (OCI-Exadata to AWS@Exadata).',
  stats: [
    { label: 'YEARS OF EXPERIENCE', value: '3.2+' },
    { label: 'SPECIALTY', value: 'AWS / Kubernetes / Terraform' },
    { label: 'BASE', value: 'Pune, India' },
  ],
  skillGroups: [
    {
      category: 'Cloud & Infra',
      skills: ['AWS (EC2, S3, RDS, DynamoDB, IAM, CloudWatch)', 'Terraform', 'Infrastructure as Code', 'Kubernetes', 'Docker', 'Linux', 'Cloud Computing'],
    },
    {
      category: 'CI/CD & Automation',
      skills: ['Jenkins', 'GitLab CI/CD', 'DevOps'],
    },
    {
      category: 'Languages',
      skills: ['Python', 'Core Java'],
    },
    {
      category: 'Monitoring & Tools',
      skills: ['Datadog', 'Splunk', 'Grafana', 'Jira', 'Salesforce', 'ServiceNow'],
    },
    {
      category: 'Other',
      skills: ['Machine Learning', 'Angular'],
    },
  ],
  experience: [
    {
      company: 'NASDAQ',
      role: 'DevOps Engineer',
      dates: 'Aug 2023 - Present',
      bullets: [
        'Applied Terraform for Infrastructure as Code automation, streamlining cloud resource provisioning and configuration management.',
        'Delivered infrastructure upgrades using IaC methodologies, improving platform stability, maintainability, and release velocity.',
        'Designed and managed containerized applications using Docker, improving build consistency and deployment efficiency.',
        'Deployed and orchestrated cloud-native applications using Kubernetes, enhancing availability and fault tolerance.',
        'Administered AWS cloud infrastructure (EC2, DynamoDB, S3, RDS, IAM, CloudWatch) supporting CI/CD and production monitoring.',
        'Contributed to AWS@Exadata, migrating environments from OCI-Exadata to AWS, coordinating cutover activities to minimize downtime.',
        'Maintained Confluence documentation, keeping CI/CD runbooks and operational procedures current.',
      ],
    },
    {
      company: 'Adenza',
      role: 'Cloud Intern',
      dates: 'Jan 2023 - Aug 2023',
      bullets: [
        'Automated deployment and environment provisioning using Jenkins, streamlining CI/CD build and release processes.',
        'Monitored system performance and infrastructure health using Datadog, Splunk, and Grafana.',
        'Managed and optimized relational databases, including PostgreSQL and Oracle.',
        'Provided technical support and resolved customer issues through Jira, Salesforce, and ServiceNow.',
      ],
    },
  ],
  certifications: [
    'edX Verified Certificate — Introduction to Linux',
    'edX Verified Certificate — AWS Cloud Practitioner Essentials',
    'Nasdaq AxiomSL v10 Associate Technical Certification',
  ],
  education: [
    { degree: 'M.Sc. in Computer Science', school: 'MIT World Peace University, Pune', date: 'July 2023', percentage: '92%' },
    { degree: 'B.Sc. in Computer Science', school: 'MIT World Peace University, Pune', date: 'June 2021', percentage: '87%' },
  ],
  projects: [
    {
      id: 'anurup-collections',
      number: '001',
      name: 'Anurup Collections',
      description:
        'A full-stack e-commerce site built with Spring Boot and React: Google Sign-In for customers, ' +
        'Razorpay payment integration, and an admin panel for order and catalog management. Deployed and live.',
      tech: ['Spring Boot', 'React', 'PostgreSQL/H2', 'Razorpay', 'Google OAuth'],
      link: { label: 'View live site', url: 'https://anurup-collections-2026.vercel.app' },
    },
    {
      id: 'sasta-olx',
      number: '002',
      name: 'Sasta OLX',
      description:
        'An OLX-style marketplace academic project built with Angular: product browsing, posting, and purchase ' +
        'flows, Firebase authentication, and a custom carousel built with Angular directives.',
      tech: ['Angular', 'Firebase'],
      link: { label: 'View GitHub profile', url: 'https://github.com/oneupon2' },
    },
    {
      id: 'medical-image-classification',
      number: '003',
      name: 'Medical Image Classification (CNN)',
      description:
        'A research project on pneumonia detection from chest X-ray images using a ResNet V2-based ' +
        'convolutional neural network. Authored an accompanying research paper (Feb-May 2023).',
      tech: ['Python', 'Machine Learning', 'ResNet V2'],
      link: { label: 'View GitHub profile', url: 'https://github.com/oneupon2' },
    },
  ],
}

export default profile
```

- [ ] **Step 2: Verify the module loads correctly**

Run:

```bash
cd "C:\Users\Satyam\IdeaProjects\Portfolio"
node --input-type=module -e "import p from './src/data/profile.js'; console.log('skillGroups:', p.skillGroups.length, 'experience:', p.experience.length, 'projects:', p.projects.length, 'certifications:', p.certifications.length)"
```

Expected output: `skillGroups: 5 experience: 2 projects: 3 certifications: 3`

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.js
git commit -m "Add resume content data module"
```

---

### Task 3: Interaction hooks (motion, typing, sound, navigation)

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Create: `src/hooks/useTypewriter.js`
- Create: `src/hooks/useSound.js`
- Create: `src/hooks/useMenuNavigation.js`
- Create: `src/hooks/useBackNavigation.js`
- Modify: `src/App.jsx` (temporary smoke-test wiring, replaced in Task 5)

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean`
- Produces: `useTypewriter(text: string, { speedMs?, prefersReducedMotion? }): { displayed: string, done: boolean, skip: () => void }`
- Produces: `useSound(): { playBlip: (type: 'move'|'select'|'type') => void, muted: boolean, toggleMute: () => void }`
- Produces: `useMenuNavigation({ itemCount, onSelect, onBack, onMove, enabled? }): { cursorIndex: number, setCursorIndex }`
- Produces: `useBackNavigation(onBack: () => void, enabled?: boolean): void`

- [ ] **Step 1: `usePrefersReducedMotion`**

`src/hooks/usePrefersReducedMotion.js`:

```js
import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

- [ ] **Step 2: `useTypewriter`**

`src/hooks/useTypewriter.js`:

```js
import { useEffect, useState } from 'react'

export function useTypewriter(text, { speedMs = 22, prefersReducedMotion = false } = {}) {
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? text : '')
  const [done, setDone] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text)
      setDone(true)
      return
    }
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        clearInterval(id)
      }
    }, speedMs)
    return () => clearInterval(id)
  }, [text, speedMs, prefersReducedMotion])

  function skip() {
    setDisplayed(text)
    setDone(true)
  }

  return { displayed, done, skip }
}
```

- [ ] **Step 3: `useSound`**

`src/hooks/useSound.js`:

```js
import { useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-muted'

export function useSound() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'false'
    } catch {
      return true
    }
  })
  const ctxRef = useRef(null)

  function getContext() {
    if (!ctxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      ctxRef.current = new AudioContextClass()
    }
    return ctxRef.current
  }

  function playBlip(type) {
    if (muted) return
    const ctx = getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const freq = type === 'select' ? 880 : type === 'type' ? 1200 : 660
    const duration = type === 'type' ? 0.02 : 0.06
    osc.type = 'square'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  }

  function toggleMute() {
    setMuted((current) => {
      const next = !current
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // localStorage unavailable (private mode) — mute state just won't persist
      }
      return next
    })
  }

  return { playBlip, muted, toggleMute }
}
```

- [ ] **Step 4: `useMenuNavigation` and `useBackNavigation`**

`src/hooks/useMenuNavigation.js`:

```js
import { useEffect, useState } from 'react'

export function useMenuNavigation({ itemCount, onSelect, onBack, onMove, enabled = true }) {
  const [cursorIndex, setCursorIndex] = useState(0)

  useEffect(() => {
    if (!enabled || itemCount <= 0) return

    function handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursorIndex((i) => {
          const next = (i + 1) % itemCount
          onMove?.(next)
          return next
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursorIndex((i) => {
          const next = (i - 1 + itemCount) % itemCount
          onMove?.(next)
          return next
        })
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(cursorIndex)
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        onBack?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, itemCount, cursorIndex, onSelect, onBack, onMove])

  return { cursorIndex, setCursorIndex }
}
```

`src/hooks/useBackNavigation.js`:

```js
import { useEffect } from 'react'

export function useBackNavigation(onBack, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    function handleKeyDown(e) {
      if (e.key === 'Escape' || e.key === 'Backspace') onBack()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onBack])
}
```

- [ ] **Step 5: Wire a temporary smoke-test screen into `App.jsx`**

This proves all four hooks work together before any real screens exist. Task 5 replaces this content entirely.

`src/App.jsx`:

```jsx
import { useState } from 'react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useTypewriter } from './hooks/useTypewriter'
import { useSound } from './hooks/useSound'
import { useMenuNavigation } from './hooks/useMenuNavigation'

const DEMO_ITEMS = ['ALPHA', 'BRAVO', 'CHARLIE']

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()
  const { displayed, done, skip } = useTypewriter(
    'Hooks smoke test: typing, sound, and cursor navigation.',
    { prefersReducedMotion }
  )
  const [selected, setSelected] = useState(null)
  const { cursorIndex } = useMenuNavigation({
    itemCount: DEMO_ITEMS.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); setSelected(DEMO_ITEMS[i]) },
  })

  return (
    <div className="console-frame">
      <button className="font-pixel" style={{ fontSize: '10px', marginBottom: 16 }} onClick={toggleMute}>
        {muted ? 'UNMUTE' : 'MUTE'}
      </button>
      <div className="dialogue-box" onClick={done ? undefined : skip}>
        <p>{displayed}{!done && <span className="type-cursor">▍</span>}</p>
      </div>
      <ul className="font-body" style={{ marginTop: 16 }}>
        {DEMO_ITEMS.map((item, i) => (
          <li key={item}>{i === cursorIndex ? '▶ ' : '  '}{item}</li>
        ))}
      </ul>
      {selected && <p className="font-body">Selected: {selected}</p>}
    </div>
  )
}
```

- [ ] **Step 6: Verify**

Run: `npm run dev`. In the browser:
1. Confirm the dialogue text types itself out letter by letter, then click it before it finishes — expect it to jump to the full text instantly.
2. Click "UNMUTE", then use Up/Down arrows — expect a short blip sound on each move and a different blip on Enter.
3. Reload the page — expect the mute button to still say "MUTE" (state persisted).
4. In DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" (Rendering tab), reload — expect the dialogue text to appear instantly with no typing animation.

- [ ] **Step 7: Commit**

```bash
git add src/hooks src/App.jsx
git commit -m "Add interaction hooks: motion, typewriter, sound, menu navigation"
```

---

### Task 4: `DialogueBox` and `MuteToggle` components

**Files:**
- Create: `src/components/DialogueBox.jsx`
- Create: `src/components/MuteToggle.jsx`
- Modify: `src/index.css` (mute toggle styles)

**Interfaces:**
- Consumes: `useTypewriter` (Task 3), `usePrefersReducedMotion` (Task 3)
- Produces: `<DialogueBox text playBlip prefersReducedMotion className? />` — every screen component uses this for body copy.
- Produces: `<MuteToggle muted toggleMute />` — rendered once, fixed-position, in `App.jsx` (Task 5).

- [ ] **Step 1: `DialogueBox`**

`src/components/DialogueBox.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

export default function DialogueBox({ text, playBlip, prefersReducedMotion, className = '' }) {
  const { displayed, done, skip } = useTypewriter(text, { prefersReducedMotion })
  const lastLengthRef = useRef(0)

  useEffect(() => {
    if (displayed.length > lastLengthRef.current && !done) {
      playBlip?.('type')
    }
    lastLengthRef.current = displayed.length
  }, [displayed, done, playBlip])

  return (
    <div className={`dialogue-box font-body ${className}`} onClick={done ? undefined : skip}>
      <p style={{ margin: 0 }}>
        {displayed}
        {!done && <span className="type-cursor">▍</span>}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: `MuteToggle`**

`src/components/MuteToggle.jsx`:

```jsx
export default function MuteToggle({ muted, toggleMute }) {
  return (
    <button
      type="button"
      className="font-pixel mute-toggle"
      onClick={toggleMute}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
```

Add to `src/index.css`:

```css
.mute-toggle {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: var(--gbc-white);
  border: 3px solid var(--gbc-navy);
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
}
```

- [ ] **Step 3: Verify**

Temporarily render both in `App.jsx` in place of the Task 3 smoke test (`<MuteToggle muted={muted} toggleMute={toggleMute} />` and `<DialogueBox text="..." playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />`), run `npm run dev`, and confirm: the mute icon sits fixed in the top-right corner and toggles on click; the dialogue box still types and is click-to-skip.

- [ ] **Step 4: Commit**

```bash
git add src/components/DialogueBox.jsx src/components/MuteToggle.jsx src/index.css
git commit -m "Add DialogueBox and MuteToggle components"
```

---

### Task 5: `BootScreen`, `MainMenu`, and the App screen-router

**Files:**
- Create: `src/components/BootScreen.jsx`
- Create: `src/components/MainMenu.jsx`
- Modify: `src/App.jsx` (replace smoke-test content with the real screen state machine)
- Modify: `src/index.css` (boot/menu styles)

**Interfaces:**
- Consumes: `useMenuNavigation`, `useSound`, `MuteToggle`, `profile.identity.name` (Task 2)
- Produces: `<BootScreen onStart={() => void} />`
- Produces: `<MainMenu onNavigate={(screenKey: string) => void} playBlip />` — screen keys: `'trainer' | 'pokedex' | 'moves' | 'badges' | 'contact'`
- Produces (in `App.jsx`): the `screen` state values `'boot' | 'menu' | 'trainer' | 'pokedex' | 'moves' | 'badges' | 'contact'` that Tasks 6-9 plug into.

- [ ] **Step 1: `BootScreen`**

`src/components/BootScreen.jsx`:

```jsx
import { useEffect } from 'react'
import profile from '../data/profile'

export default function BootScreen({ onStart }) {
  useEffect(() => {
    function handleKeyDown() { onStart() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onStart])

  return (
    <div className="boot-screen" onClick={onStart}>
      <h1 className="font-pixel boot-title">{profile.identity.name.toUpperCase()}</h1>
      <p className="font-pixel boot-prompt">PRESS START</p>
    </div>
  )
}
```

- [ ] **Step 2: `MainMenu`**

`src/components/MainMenu.jsx`:

```jsx
import { useMenuNavigation } from '../hooks/useMenuNavigation'
import profile from '../data/profile'

const MENU_ITEMS = [
  { key: 'trainer', label: 'TRAINER CARD' },
  { key: 'pokedex', label: 'POKEDEX' },
  { key: 'moves', label: 'MOVES' },
  { key: 'badges', label: 'BADGES' },
  { key: 'contact', label: 'CONTACT' },
]

export default function MainMenu({ onNavigate, playBlip }) {
  const { cursorIndex } = useMenuNavigation({
    itemCount: MENU_ITEMS.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); onNavigate(MENU_ITEMS[i].key) },
  })

  return (
    <div className="menu-screen">
      <h1 className="font-pixel menu-title">{profile.identity.name.toUpperCase()}</h1>
      <ul className="menu-list font-pixel">
        {MENU_ITEMS.map((item, i) => (
          <li key={item.key} className={i === cursorIndex ? 'active' : ''}>
            <button
              type="button"
              onClick={() => { playBlip('select'); onNavigate(item.key) }}
            >
              <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 3: Style boot and menu screens**

Add to `src/index.css`:

```css
.boot-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  cursor: pointer;
}

.boot-title { font-size: clamp(16px, 4vw, 28px); text-shadow: 3px 3px var(--gbc-red); }
.boot-prompt { font-size: 12px; animation: blink 1s steps(1) infinite; }

.menu-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px;
}

.menu-title { font-size: clamp(14px, 3vw, 20px); text-shadow: 2px 2px var(--gbc-red); }

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--gbc-white);
  border: 4px solid var(--gbc-navy);
  border-radius: 6px;
  width: 100%;
  max-width: 340px;
}

.menu-list li button {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--gbc-text);
  font-size: 11px;
  padding: 14px 12px;
}

.menu-list li.active button { background: #b8dfff; }

@media (prefers-reduced-motion: reduce) {
  .boot-prompt { animation: none; }
}
```

- [ ] **Step 4: Wire the screen state machine in `App.jsx`**

Replace `src/App.jsx` entirely:

```jsx
import { useState } from 'react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSound } from './hooks/useSound'
import BootScreen from './components/BootScreen'
import MainMenu from './components/MainMenu'
import MuteToggle from './components/MuteToggle'

export default function App() {
  const [screen, setScreen] = useState('boot')
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()

  function goToMenu() { setScreen('menu') }

  return (
    <>
      {screen !== 'boot' && <MuteToggle muted={muted} toggleMute={toggleMute} />}
      {screen === 'boot' && <BootScreen onStart={goToMenu} />}
      {screen === 'menu' && <MainMenu onNavigate={setScreen} playBlip={playBlip} />}
      {screen !== 'boot' && screen !== 'menu' && (
        <div className="console-frame">
          <p className="font-body">Screen "{screen}" not built yet — press Escape to go back.</p>
        </div>
      )}
    </>
  )
}
```

(The placeholder branch and its "not built yet" message get replaced screen-by-screen in Tasks 6-9; `prefersReducedMotion` and `playBlip` are threaded through as each real screen is added.)

- [ ] **Step 5: Verify**

Run `npm run dev`. Confirm: boot screen shows "PRASHANT PATIL" and a blinking "PRESS START"; clicking or pressing any key advances to the main menu; arrow keys move the `▶` cursor through the 5 items with a blip sound; Enter/click on an item shows the "not built yet" placeholder for that screen key.

- [ ] **Step 6: Commit**

```bash
git add src/components/BootScreen.jsx src/components/MainMenu.jsx src/App.jsx src/index.css
git commit -m "Add boot screen, main menu, and screen state machine"
```

---

### Task 6: `TrainerCardScreen` and `PsychicCreature`

**Files:**
- Create: `src/components/TrainerCardScreen.jsx`
- Create: `src/components/creatures/PsychicCreature.jsx`
- Modify: `src/App.jsx` (route `screen === 'trainer'` to the real component)
- Modify: `src/index.css` (screen layout + creature animation styles)

**Interfaces:**
- Consumes: `DialogueBox`, `useBackNavigation`, `profile.identity` / `profile.summary` / `profile.stats` (Task 2)
- Produces: `<TrainerCardScreen onBack playBlip prefersReducedMotion />`
- Produces: `<PsychicCreature prefersReducedMotion />`

- [ ] **Step 1: `PsychicCreature`**

`src/components/creatures/PsychicCreature.jsx`:

```jsx
export default function PsychicCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature psychic-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="64" height="64" viewBox="0 0 16 16" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="6" y="2" width="4" height="4" fill="#b98ce8" />
      <rect x="5" y="6" width="6" height="5" fill="#9a5fd1" />
      <rect x="4" y="11" width="2" height="3" fill="#7a3fb0" />
      <rect x="10" y="11" width="2" height="3" fill="#7a3fb0" />
      <rect x="7" y="3" width="1" height="1" fill="#1d2b53" />
      <rect x="9" y="3" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
```

- [ ] **Step 2: `TrainerCardScreen`**

`src/components/TrainerCardScreen.jsx`:

```jsx
import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import PsychicCreature from './creatures/PsychicCreature'
import profile from '../data/profile'

export default function TrainerCardScreen({ onBack, playBlip, prefersReducedMotion }) {
  useBackNavigation(onBack)
  const { identity, summary, stats } = profile

  return (
    <div className="console-frame screen-content">
      <PsychicCreature prefersReducedMotion={prefersReducedMotion} />
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>TRAINER CARD</h2>
      <p className="font-body" style={{ marginBottom: 4 }}>{identity.name} — {identity.title}</p>
      <p className="font-body" style={{ marginTop: 0, opacity: 0.85 }}>{identity.location}</p>

      <DialogueBox text={summary} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />

      <ul className="font-body stat-list">
        {stats.map((s) => (
          <li key={s.label}><strong>{s.label}:</strong> {s.value}</li>
        ))}
      </ul>

      <a
        className="font-pixel resume-link"
        href="/resume-prashant-patil.pdf"
        download
      >
        DOWNLOAD RESUME
      </a>

      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Styles**

Add to `src/index.css`:

```css
.screen-content {
  gap: 12px;
  text-align: center;
}

.stat-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
  text-align: left;
}

.resume-link, .back-button {
  font-size: 10px;
  background: var(--gbc-gold);
  color: var(--gbc-navy);
  border: 3px solid var(--gbc-navy);
  border-radius: 6px;
  padding: 10px 14px;
  text-decoration: none;
  margin-top: 8px;
}

.back-button { background: var(--gbc-white); }

.creature { image-rendering: pixelated; }

.psychic-creature {
  animation: float 2.4s ease-in-out infinite;
}
.psychic-creature.is-static { animation: none; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

- [ ] **Step 4: Route it in `App.jsx`**

In `src/App.jsx`, add the import and replace the placeholder branch for `'trainer'`:

```jsx
import TrainerCardScreen from './components/TrainerCardScreen'
// ...
{screen === 'trainer' && (
  <TrainerCardScreen onBack={goToMenu} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
)}
{screen !== 'boot' && screen !== 'menu' && screen !== 'trainer' && (
  <div className="console-frame">
    <p className="font-body">Screen "{screen}" not built yet — press Escape to go back.</p>
  </div>
)}
```

- [ ] **Step 5: Verify**

Run `npm run dev`. From the main menu, select TRAINER CARD: confirm the bio/summary/stats render with the typed dialogue box, the floating creature animates (and freezes under emulated `prefers-reduced-motion: reduce`), the resume link downloads the real PDF, and Escape/Backspace/the BACK button returns to the main menu.

- [ ] **Step 6: Commit**

```bash
git add src/components/TrainerCardScreen.jsx src/components/creatures/PsychicCreature.jsx src/App.jsx src/index.css
git commit -m "Add Trainer Card screen with psychic creature mascot"
```

---

### Task 7: `PokedexScreen` and `LeviathanCreature`

**Files:**
- Create: `src/components/PokedexScreen.jsx`
- Create: `src/components/creatures/LeviathanCreature.jsx`
- Modify: `src/App.jsx` (route `screen === 'pokedex'`)
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `useMenuNavigation`, `DialogueBox`, `profile.projects` (Task 2)
- Produces: `<PokedexScreen onBack playBlip prefersReducedMotion />`
- Produces: `<LeviathanCreature prefersReducedMotion />`

- [ ] **Step 1: `LeviathanCreature`**

`src/components/creatures/LeviathanCreature.jsx`:

```jsx
export default function LeviathanCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature leviathan-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="72" height="48" viewBox="0 0 18 12" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="10" height="4" fill="#3a7bd5" />
      <rect x="11" y="2" width="4" height="3" fill="#3a7bd5" />
      <rect x="0" y="5" width="2" height="2" fill="#2a5aa5" />
      <rect x="12" y="3" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
```

- [ ] **Step 2: `PokedexScreen`**

`src/components/PokedexScreen.jsx`:

```jsx
import { useState } from 'react'
import { useMenuNavigation } from '../hooks/useMenuNavigation'
import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import LeviathanCreature from './creatures/LeviathanCreature'
import profile from '../data/profile'

export default function PokedexScreen({ onBack, playBlip, prefersReducedMotion }) {
  const [openId, setOpenId] = useState(null)
  const { projects } = profile

  const { cursorIndex } = useMenuNavigation({
    itemCount: projects.length,
    enabled: openId === null,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); setOpenId(projects[i].id) },
    onBack,
  })
  useBackNavigation(() => (openId ? setOpenId(null) : onBack()), true)

  const openProject = projects.find((p) => p.id === openId)

  return (
    <div className="console-frame screen-content">
      <LeviathanCreature prefersReducedMotion={prefersReducedMotion} />
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>POKEDEX</h2>

      {!openProject && (
        <ul className="menu-list font-pixel" style={{ maxWidth: 420 }}>
          {projects.map((p, i) => (
            <li key={p.id} className={i === cursorIndex ? 'active' : ''}>
              <button type="button" onClick={() => { playBlip('select'); setOpenId(p.id) }}>
                <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> No. {p.number} {p.name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}

      {openProject && (
        <>
          <p className="font-pixel" style={{ fontSize: '11px' }}>No. {openProject.number} {openProject.name.toUpperCase()}</p>
          <DialogueBox text={openProject.description} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
          <p className="font-body">Tech: {openProject.tech.join(', ')}</p>
          <a className="font-pixel resume-link" href={openProject.link.url} target="_blank" rel="noreferrer">
            {openProject.link.label.toUpperCase()}
          </a>
          <button type="button" className="font-pixel back-button" onClick={() => setOpenId(null)}>
            ◀ BACK TO LIST
          </button>
        </>
      )}

      {!openProject && (
        <button type="button" className="font-pixel back-button" onClick={onBack}>
          ◀ BACK TO MENU
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Styles**

Add to `src/index.css`:

```css
.leviathan-creature {
  animation: bob 3.2s ease-in-out infinite;
  opacity: 0.85;
}
.leviathan-creature.is-static { animation: none; }

@keyframes bob {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(4px) translateX(-3px); }
}
```

- [ ] **Step 4: Route it in `App.jsx`**

```jsx
import PokedexScreen from './components/PokedexScreen'
// ...
{screen === 'pokedex' && (
  <PokedexScreen onBack={goToMenu} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
)}
{screen !== 'boot' && screen !== 'menu' && screen !== 'trainer' && screen !== 'pokedex' && (
  <div className="console-frame">
    <p className="font-body">Screen "{screen}" not built yet — press Escape to go back.</p>
  </div>
)}
```

- [ ] **Step 5: Verify**

From the main menu, select POKEDEX: confirm all 3 projects list with cursor navigation and blips; selecting one (via Enter or click) shows its typed description, tech list, and working link (Anurup Collections opens the live site; the other two open the GitHub profile); Escape from the detail view returns to the project list, and Escape from the list returns to the main menu.

- [ ] **Step 6: Commit**

```bash
git add src/components/PokedexScreen.jsx src/components/creatures/LeviathanCreature.jsx src/App.jsx src/index.css
git commit -m "Add Pokedex screen with leviathan creature mascot"
```

---

### Task 8: `MovesScreen`

**Files:**
- Create: `src/components/MovesScreen.jsx`
- Modify: `src/App.jsx` (route `screen === 'moves'`)
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `useBackNavigation`, `profile.skillGroups` (Task 2)
- Produces: `<MovesScreen onBack playBlip prefersReducedMotion />`

- [ ] **Step 1: `MovesScreen`**

`src/components/MovesScreen.jsx`:

```jsx
import { useBackNavigation } from '../hooks/useBackNavigation'
import profile from '../data/profile'

export default function MovesScreen({ onBack }) {
  useBackNavigation(onBack)
  const { skillGroups } = profile

  return (
    <div className="console-frame screen-content">
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>MOVES</h2>
      <div className="moves-list">
        {skillGroups.map((group) => (
          <div key={group.category} className="move-group">
            <p className="font-pixel move-group-title">{group.category.toUpperCase()}</p>
            <ul className="font-body">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Styles**

Add to `src/index.css`:

```css
.moves-list {
  width: 100%;
  max-width: 480px;
  max-height: 60vh;
  overflow-y: auto;
  text-align: left;
}

.move-group { margin-bottom: 16px; }
.move-group-title { font-size: 10px; color: var(--gbc-gold); margin-bottom: 6px; }
.move-group ul { margin: 0; padding-left: 18px; }
```

- [ ] **Step 3: Route it in `App.jsx`**

```jsx
import MovesScreen from './components/MovesScreen'
// ...
{screen === 'moves' && <MovesScreen onBack={goToMenu} />}
{screen !== 'boot' && screen !== 'menu' && screen !== 'trainer' && screen !== 'pokedex' && screen !== 'moves' && (
  <div className="console-frame">
    <p className="font-body">Screen "{screen}" not built yet — press Escape to go back.</p>
  </div>
)}
```

- [ ] **Step 4: Verify**

From the main menu, select MOVES: confirm all 5 skill categories render with their exact skills from `profile.js`, the list scrolls if it overflows the viewport, and Escape/BACK returns to the main menu.

- [ ] **Step 5: Commit**

```bash
git add src/components/MovesScreen.jsx src/App.jsx src/index.css
git commit -m "Add Moves (skills) screen"
```

---

### Task 9: `BadgesScreen` and `DragonCreature`

**Files:**
- Create: `src/components/BadgesScreen.jsx`
- Create: `src/components/creatures/DragonCreature.jsx`
- Modify: `src/App.jsx` (route `screen === 'badges'`)
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `useBackNavigation`, `profile.experience` / `profile.certifications` (Task 2)
- Produces: `<BadgesScreen onBack playBlip prefersReducedMotion />`
- Produces: `<DragonCreature prefersReducedMotion />`

- [ ] **Step 1: `DragonCreature`**

`src/components/creatures/DragonCreature.jsx`:

```jsx
export default function DragonCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dragon-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="80" height="40" viewBox="0 0 20 10" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="0" y="6" width="4" height="2" fill="#2f8f5b" />
      <rect x="4" y="4" width="4" height="2" fill="#2f8f5b" />
      <rect x="8" y="2" width="4" height="2" fill="#2f8f5b" />
      <rect x="12" y="1" width="4" height="2" fill="#1e6b41" />
      <rect x="16" y="0" width="2" height="2" fill="#1e6b41" />
      <rect x="17" y="0" width="1" height="1" fill="#f8d34a" />
    </svg>
  )
}
```

- [ ] **Step 2: `BadgesScreen`**

`src/components/BadgesScreen.jsx`:

```jsx
import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import DragonCreature from './creatures/DragonCreature'
import profile from '../data/profile'

export default function BadgesScreen({ onBack, playBlip, prefersReducedMotion }) {
  useBackNavigation(onBack)
  const { experience, certifications } = profile

  return (
    <div className="console-frame screen-content">
      <DragonCreature prefersReducedMotion={prefersReducedMotion} />
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>BADGES</h2>

      <div className="badges-list">
        {experience.map((job) => (
          <div key={job.company} className="badge-card">
            <p className="font-pixel badge-title">{job.company} — {job.role}</p>
            <p className="font-body badge-dates">{job.dates}</p>
            <DialogueBox
              text={job.bullets.join(' ')}
              playBlip={playBlip}
              prefersReducedMotion={prefersReducedMotion}
              className="badge-dialogue"
            />
          </div>
        ))}

        <p className="font-pixel badge-title" style={{ marginTop: 16 }}>CERTIFICATIONS</p>
        <ul className="font-body ribbon-list">
          {certifications.map((cert) => (
            <li key={cert}>🎖 {cert}</li>
          ))}
        </ul>
      </div>

      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Styles**

Add to `src/index.css`:

```css
.badges-list {
  width: 100%;
  max-width: 520px;
  max-height: 60vh;
  overflow-y: auto;
  text-align: left;
}

.badge-card { margin-bottom: 18px; }
.badge-title { font-size: 11px; color: var(--gbc-gold); margin-bottom: 4px; }
.badge-dates { margin: 0 0 8px 0; opacity: 0.8; }
.badge-dialogue { max-width: none; }

.ribbon-list { list-style: none; padding: 0; }

.dragon-creature { animation: streak-in 1.2s ease-out forwards; }
.dragon-creature.is-static { animation: none; }

@keyframes streak-in {
  0% { transform: translateX(-40px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
```

- [ ] **Step 4: Route it in `App.jsx`**

```jsx
import BadgesScreen from './components/BadgesScreen'
// ...
{screen === 'badges' && (
  <BadgesScreen onBack={goToMenu} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
)}
{screen !== 'boot' && screen !== 'menu' && screen !== 'trainer' && screen !== 'pokedex' && screen !== 'moves' && screen !== 'badges' && (
  <div className="console-frame">
    <p className="font-body">Screen "{screen}" not built yet — press Escape to go back.</p>
  </div>
)}
```

- [ ] **Step 5: Verify**

From the main menu, select BADGES: confirm both jobs (NASDAQ, Adenza) render with their typed achievement text, all 3 certifications list below, the dragon creature streaks in once on entering the screen (and appears instantly with no streak under emulated reduced motion), and Escape/BACK returns to the main menu.

- [ ] **Step 6: Commit**

```bash
git add src/components/BadgesScreen.jsx src/components/creatures/DragonCreature.jsx src/App.jsx src/index.css
git commit -m "Add Badges (experience/certifications) screen with dragon creature mascot"
```

---

### Task 10: `ContactScreen`, screen-wipe transitions, and final polish pass

**Files:**
- Create: `src/components/ContactScreen.jsx`
- Modify: `src/App.jsx` (route `screen === 'contact'`, wrap screens in Framer Motion transitions)
- Modify: `src/index.css` (final responsive pass)

**Interfaces:**
- Consumes: `useMenuNavigation`, `profile.identity` (Task 2), `framer-motion`
- Produces: `<ContactScreen onBack playBlip />` — the last screen; after this task every menu item routes to a real component and no placeholder branch remains.

- [ ] **Step 1: `ContactScreen`**

`src/components/ContactScreen.jsx`:

```jsx
import { useMenuNavigation } from '../hooks/useMenuNavigation'
import profile from '../data/profile'

export default function ContactScreen({ onBack, playBlip }) {
  const { identity } = profile
  const items = [
    { label: `EMAIL: ${identity.email}`, href: `mailto:${identity.email}` },
    { label: `PHONE: ${identity.phone}`, href: `tel:${identity.phone.replace(/\s+/g, '')}` },
    { label: 'LINKEDIN', href: identity.linkedin },
    { label: 'GITHUB', href: identity.github },
  ]

  const { cursorIndex } = useMenuNavigation({
    itemCount: items.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); window.open(items[i].href, '_blank') },
    onBack,
  })

  return (
    <div className="console-frame screen-content">
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>CONTACT</h2>
      <ul className="menu-list font-pixel" style={{ maxWidth: 420 }}>
        {items.map((item, i) => (
          <li key={item.label} className={i === cursorIndex ? 'active' : ''}>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              onClick={() => playBlip('select')}
              style={{ display: 'block', padding: '14px 12px', color: 'inherit', textDecoration: 'none', fontSize: '11px' }}
            >
              <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Add screen-wipe transitions in `App.jsx`**

Replace `src/App.jsx` entirely:

```jsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSound } from './hooks/useSound'
import BootScreen from './components/BootScreen'
import MainMenu from './components/MainMenu'
import MuteToggle from './components/MuteToggle'
import TrainerCardScreen from './components/TrainerCardScreen'
import PokedexScreen from './components/PokedexScreen'
import MovesScreen from './components/MovesScreen'
import BadgesScreen from './components/BadgesScreen'
import ContactScreen from './components/ContactScreen'

const SCREEN_COMPONENTS = {
  trainer: TrainerCardScreen,
  pokedex: PokedexScreen,
  moves: MovesScreen,
  badges: BadgesScreen,
  contact: ContactScreen,
}

export default function App() {
  const [screen, setScreen] = useState('boot')
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()

  function goToMenu() { setScreen('menu') }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: 'easeInOut' }

  const ActiveScreen = SCREEN_COMPONENTS[screen]

  return (
    <>
      {screen !== 'boot' && <MuteToggle muted={muted} toggleMute={toggleMute} />}
      <AnimatePresence mode="wait">
        {screen === 'boot' && (
          <motion.div key="boot" exit={{ opacity: 0 }} transition={transition}>
            <BootScreen onStart={goToMenu} />
          </motion.div>
        )}
        {screen === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
            <MainMenu onNavigate={setScreen} playBlip={playBlip} />
          </motion.div>
        )}
        {ActiveScreen && (
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={transition}
          >
            <ActiveScreen onBack={goToMenu} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 3: Responsive pass**

Add to `src/index.css`:

```css
@media (max-width: 480px) {
  body { font-size: 17px; }
  .menu-list li button { font-size: 10px; padding: 12px 10px; }
  .dialogue-box { font-size: 18px; padding: 10px 12px; }
}
```

- [ ] **Step 4: Full manual verification pass**

Run `npm run build` — expect it to complete with no errors.

Run `npm run dev` and, in the browser:
1. Walk boot → menu → each of the 5 screens → back to menu, using **only the keyboard** (arrows, Enter, Escape/Backspace).
2. Repeat the same walk using **only the mouse/touch** (click every control).
3. Resize the browser to a mobile width (e.g. 375px) and confirm every screen stays usable with no horizontal scrolling.
4. Emulate `prefers-reduced-motion: reduce` in DevTools and confirm: dialogue text appears instantly, the boot prompt stops blinking, the dragon no longer streaks in, and screen transitions have no motion.
5. Confirm the mute toggle persists across a reload and that no sound plays before the first user interaction.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactScreen.jsx src/App.jsx src/index.css
git commit -m "Add Contact screen, screen-wipe transitions, and responsive pass"
```

---

## Deployment (after the plan, with explicit confirmation)

Not automated as part of this plan — do this only after the user confirms the finished site locally:

1. Confirm the GitHub repo name/visibility with the user, create it, and push `Portfolio/` (`git remote add origin ...`, `git push -u origin master`).
2. Create a new Vercel project pointed at that repo (or run `vercel` from `Portfolio/` if the CLI is authenticated), confirming the production domain with the user before sharing it.
