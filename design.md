---
name: RootPath Desktop
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#bfc7d2'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#89929b'
  outline-variant: '#3f4850'
  surface-tint: '#93ccff'
  primary: '#93ccff'
  on-primary: '#003351'
  primary-container: '#3198dc'
  on-primary-container: '#002c47'
  inverse-primary: '#006398'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#8083ff'
  on-tertiary-container: '#0d0096'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system bridges the intimidating gap between Windows and Linux environments. It blends the approachable, rewarding visual architecture of high-engagement pedagogical platforms with the precision, depth, and focused authority of Kali Linux. 

Rather than relying on noisy hacker tropes (such as intense terminal green phosphor overlays or scanline glitches), this design system articulates an architectural synthesis:
- **Approachability:** Generous touch targets, predictable progress feedback, modular micro-lesson cards, and soft physical elevation that reduces cognitive load.
- **Cyber-Technic Restraint:** Deep slate foundations, electric cyan signifiers, monospaced code blocks, and crisp, translucent keylines that evoke modern operating system tooling.

The aesthetic marries **Tactile Elevation** with **Refined Dark UI**: clean surfaces floating over an obsidian baseline, accented by precision luminescence that highlights progression, mastery, and system states without inducing visual fatigue.

## Colors

The palette is tuned exclusively for high-comfort, low-fatigue dark mode computing. It establishes clear functional lanes across the interface:

- **Primary (`#0284C7` / Electric Kali Cyan):** Serves as the primary operational hue. Used for key action states, active command badges, interactive step selections, and navigation anchors.
- **Secondary (`#10B981` / Emerald Validation):** Anchors pedagogical reward states: completed terminal commands, XP badges, mastery streaks, and successful permission escalations.
- **Tertiary (`#6366F1` / System Indigo):** Represents translation layers, conceptual cross-references (e.g., matching a Windows PowerShell cmdlet to a Bash equivalent), and structural metadata.
- **Neutral Core (`#0B0F19` / Deep Obsidian Slate):**
  - Background Canvas: `#0B0F19`
  - Layer 1 Container (Cards, Panels): `#111827`
  - Layer 2 Sub-containers (Terminal wells, input boxes): `#1E293B`
  - Stroke / Outlines: `#334155` at 60% opacity for low-distraction structural boundaries.
- **Text & Foreground Hierarchy:**
  - High Contrast (Primary text): `#F8FAFC`
  - Medium Contrast (Secondary instructions, hints): `#94A3B8`
  - Low Contrast (Disabled steps, decorative flags): `#475569`

## Typography

Typography establishes an instant contextual shift between human comprehension and machine execution:

- **Display & Headings (Plus Jakarta Sans):** Brings soft geometric curves and human warmth to module headers, milestone victories, and progression tracking. It removes the cold, uninviting nature typical of technical documentation.
- **Body & Instructional Copy (Inter):** High x-height, neutral letterforms, and optimized legibility at standard reading distances. Crucial for digestible explanations comparing Windows concepts (e.g., Registry, System32) to Linux structures (`/etc`, root filesystem).
- **Interactive Technical Elements (JetBrains Mono):** Reserved strictly for terminal lines, inline binary parameters, directory paths, shortcut cues, and script syntaxes. It anchors student focus during command-line execution tasks.

## Layout & Spacing

The layout utilizes a structured desktop-first application shell designed for widescreen horizontal real-estate:

- **Structural Composition:**
  - **Fixed Navigation Spine (80px to 240px collapsable):** Anchors active courses, module maps, and toolkits.
  - **Main Learning Canvas (Fluid):** Centers interactive content within an optimal line-length container (maximum 1140px width) to avoid horizontal eye drift during command exercises.
  - **Contextual Inspector / Terminal Rail (380px fixed width):** Holds active sandbox terminals, command cheatsheets, and live system state monitors.
- **Spacing Rhythm:** Structured on an 8px base rhythm (`0.5rem` steps). Internal component layouts use generous interior padding (`space-lg`) to give exercise cards an airy, uncluttered feel while preserving clear grouping between instructional copy and code snippets.

## Elevation & Depth

Visual hierarchy relies on a layered surface approach accented by diffused luminescence rather than heavy dropped drop shadows:

- **Canvas Level (Ground, `#0B0F19`):** The structural viewport backing.
- **Surface Level 1 (Panels & Lesson Tracks, `#111827`):** Elevated via a subtle 1px border (`rgba(255, 255, 255, 0.07)`).
- **Surface Level 2 (Interactive Cards & Sandboxes, `#1E293B`):** Features a fine highlight along the top border (`rgba(255, 255, 255, 0.12)`) and an ambient, low-spread drop shadow (`0 8px 24px -4px rgba(0, 0, 0, 0.45)`).
- **Active / Focused Interactive Depth:** When elements are engaged (active terminal prompts or selected answers), elevation is denoted by a localized edge glow (`box-shadow: 0 0 0 1px #0284C7, 0 4px 20px -2px rgba(2, 132, 199, 0.35)`).
- **Glass Accents:** Translucent top-bars and modal overlays use `backdrop-filter: blur(12px)` combined with an 85% opacity surface backing to maintain context without obscuring state.

## Shapes

The design system employs a **Rounded** shape model (`roundedness: 2` with standard radii scaling up to 1rem / 16px and 1.5rem / 24px for macro cards).

- **Macro Containers & Cards (`rounded-2xl` / 1.5rem):** Educational modules, quest pods, and sandbox monitors utilize large, comfortable radii to enforce an approachable, game-inspired aesthetic.
- **Interactive UI Elements (`rounded-lg` / 0.5rem to 0.75rem):** Buttons, inputs, terminal chips, and command options utilize controlled curvature to preserve a structured, software-like feel.
- **Terminal Viewports:** Distinctive dual-treatment featuring `rounded-xl` outer casings combined with `rounded-md` internal prompt boxes to mirror modern developer environments.

## Components

### Buttons
- **Primary (Action/Validate):** High-density Electric Cyan base (`#0284C7`), foreground in pure white with bold weight. Micro-interaction includes a subtle 2px simulated 3D base offset that depresses on click, providing tactile gamification feedback.
- **Success / Check Answer:** Emerald (`#10B981`) active state with icon checkmarks; flashes gently upon successful test suite execution.
- **Ghost / Tool Action:** Slate surface background with a 1px border (`#334155`). Hover reveals a cyan edge transition with zero layout shift.

### Cards & Lesson Modules
- Built on `rounded-2xl` geometry with `#111827` backing and a fine `#334155` border.
- Cards feature distinct header tags displaying XP values, estimated completion times, and a dual-os badge (e.g., displaying `CMD -> BASH`).
- Hover states raise the card by 2px with an indigo or cyan ambient glow.

### Terminal & Code Prompt Inputs
- Deep slate-black background (`#070A10`) embedded inside lesson cards.
- Fixed prompt prefix (`user@kali:~$`) rendered in muted emerald.
- Monospaced typography using JetBrains Mono with automatic command suggestion pills rendered in low-opacity slate backgrounds.

### Chips & Badges
- Compact pill-shaped structures (`rounded-full`) with semi-transparent tinted backgrounds:
  - Concept Chips (e.g., "File Permissions", "Sudo Management"): Indigo tint (`rgba(99, 102, 241, 0.12)`) with `#818CF8` text.
  - Difficulty/Progress: Cyan or Emerald tints with 1px border matching the icon color.

### Selection Controls (Multiple Choice & Checklists)
- Large block-style radio and checkbox containers spanning the full width of the card.
- Default state: `#1E293B` background with subtle border.
- Selected state: Electric Cyan perimeter outline with an illuminated selection indicator, avoiding ambiguous micro-checkboxes in favor of large, confidence-inspiring selection surfaces.

### Progress & Streak Tracks
- Thick horizontal track containers (`8px` height) with rounded caps.
- Background track set to `#1E293B`, with the animated progress fill utilizing a vibrant gradient transition from Electric Cyan to Emerald Validation.