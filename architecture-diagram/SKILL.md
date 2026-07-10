---
name: architecture-diagram
description: Create professional architecture diagrams as standalone HTML files with SVG graphics, in a light theme by default or a dark theme on request. Use when the user asks for system architecture diagrams, infrastructure diagrams, cloud architecture visualizations, security diagrams, network topology diagrams, or any technical diagram showing system components and their relationships.
license: MIT
metadata:
  version: "1.2"
  author: Cocoon AI (hello@cocoon-ai.com)
---

# Architecture Diagram Skill

Create professional technical architecture diagrams as self-contained HTML files with inline SVG graphics and CSS styling.

## Theme

Default to the `light` theme unless the user explicitly asks for `dark`, "dark mode", or a similar look.

- **Light (default):** `assets/template-compact.html` and `assets/template.html`.
- **Dark:** `assets/template-compact-dark.html` and `assets/template-dark.html`.

Both themes share the same layout, coordinates, node structure, and readability rules — only the color tokens and background differ. Never mix tokens from the two themes in one file. If the user switches their mind mid-conversation, regenerate from the matching theme's template rather than patching colors ad hoc.

## Working Mode

Default to `summary` mode unless the user explicitly asks for a detailed platform map, deep dive, threat model, or production topology.

### Summary Mode (default)

- Optimize for fast comprehension.
- Use `6-10` primary nodes.
- Use `1-2` boundary groups.
- Use at most `12` labeled connections.
- Keep titles and subtitles short.
- Move secondary detail into summary cards instead of the main SVG.

### Detailed Mode

- Use only when the user explicitly asks for more detail or when the system cannot be explained clearly otherwise.
- Use `10-16` nodes.
- Use up to `4` boundary groups.
- Use at most `20` labeled connections.
- Add support systems such as cache, guardrails, observability, async workers, and feedback loops only when they materially improve understanding.

## Codex-Oriented Workflow

1. Distill the input into a small architecture spec before drawing:
   - primary user journey
   - major components
   - stateful systems
   - supporting systems
   - key protocols or flows
2. Choose one layout before writing SVG:
   - left-to-right pipeline
   - two-lane offline/online
   - layered edge/app/data
   - hub-and-spoke
3. Choose the theme, then the template:
   - Theme: `light` unless the user asked for `dark`.
   - Use `assets/template-compact.html` (light) / `assets/template-compact-dark.html` (dark) for default and summary outputs.
   - Use `assets/template.html` (light) / `assets/template-dark.html` (dark) for polished, presentation-ready outputs.
4. Draw the primary path first.
5. Add boundaries and secondary flows only if they clarify the story instead of cluttering it.
6. Put overflow facts in the three summary cards.
7. Write a real `.html` file in the workspace instead of only returning a code snippet.

## Readability Rules

- Favor shorter labels over exhaustive labels.
- Component titles should be at most `3` words when possible.
- Component subtitles should be at most `2` lines.
- Avoid crossing lines if a layout change can remove them.
- Avoid bidirectional arrows unless the round trip itself matters.
- Do not repeat the same fact in both a component and a connection label.
- Remove legends when the color semantics are obvious and the diagram reads better without one.
- If one area needs more than `5` sibling boxes, introduce grouping or move detail to cards.
- Prefer verbs on connections and nouns on components.

## Design System

### Color Palette

Use these semantic colors for component types. A component's category (Frontend, Backend, ...) never changes between themes — only the literal fill/stroke values do. Pick the table matching the active theme (see [Theme](#theme)).

**Light theme (default)**

| Component Type | Fill (rgba) | Stroke |
|---------------|-------------|--------|
| Frontend | `rgba(8, 145, 178, 0.10)` | `#0891b2` |
| Backend | `rgba(5, 150, 105, 0.10)` | `#059669` |
| Database / Index | `rgba(124, 58, 237, 0.10)` | `#7c3aed` |
| Cloud / Model | `rgba(217, 119, 6, 0.12)` | `#d97706` |
| Security / Policy | `rgba(225, 29, 72, 0.08)` | `#e11d48` |
| Queue / Async | `rgba(234, 88, 12, 0.12)` | `#ea580c` |
| External / Generic | `rgba(100, 116, 139, 0.10)` | `#64748b` |

**Dark theme**

| Component Type | Fill (rgba) | Stroke |
|---------------|-------------|--------|
| Frontend | `rgba(8, 51, 68, 0.42)` | `#22d3ee` |
| Backend | `rgba(6, 78, 59, 0.42)` | `#34d399` |
| Database / Index | `rgba(76, 29, 149, 0.42)` | `#a78bfa` |
| Cloud / Model | `rgba(120, 53, 15, 0.32)` | `#fbbf24` |
| Security / Policy | `rgba(136, 19, 55, 0.42)` | `#fb7185` |
| Queue / Async | `rgba(154, 52, 18, 0.34)` | `#fb923c` |
| External / Generic | `rgba(30, 41, 59, 0.56)` | `#94a3b8` |

### Typography

Use JetBrains Mono for all text:

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Font sizes:

- `12px` for component names
- `9px` for subtitles
- `8px` for flow labels and annotations
- `7px` for tiny labels and legends

### Visual Elements

**Background:**
- Light (default): `#f8fafc` with a subtle `#e2e8f0` grid. Keep the page background flat — skip heavy gradients, they read muddier on light than on dark.
- Dark: `#020617` with a subtle grid, plus soft radial gradients in the page background for depth.

**Panel styling:**
- Light: white (`#ffffff`) panel, `1px` `#e2e8f0` border, `16px` radius, and a soft low-opacity shadow (e.g. `0 10px 28px rgba(15, 23, 42, 0.06)`).
- Dark: dark translucent panel, `1px` border, `16px` radius, and a soft shadow so the diagram feels intentional instead of flat.

**Text colors:**
- Light: titles `#0f172a`, subtitles / flow labels `#475569`, footer / soft text `#94a3b8`.
- Dark: titles `white`, subtitles / flow labels `#94a3b8`, footer / soft text `#64748b`.

**Component boxes:** Rounded rectangles with semi-transparent fills and `1.5px` stroke.

**Boundary boxes:** Dashed stroke, light transparent fill, and enough padding so titles do not collide with components.

**Arrows:** Use SVG markers for arrowheads. Draw connections early in the SVG so they sit behind nodes.

**Masking arrows behind transparent fills:** If arrows would show through a component, draw an opaque background rectangle first, using the theme's panel color (`#ffffff` in light, `#0f172a` in dark):

```svg
<!-- light theme -->
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#ffffff"/>
<rect x="X" y="Y" width="W" height="H" rx="8" fill="rgba(124, 58, 237, 0.10)" stroke="#7c3aed" stroke-width="1.5"/>
```

**Queue / async connectors:** Use an orange connector pill when a queue or async stage materially clarifies the architecture.

## Spacing Rules

- Standard service height: `56-72px`
- Larger stateful components: `80-110px`
- Minimum vertical gap between sibling rows: `36px`
- Minimum horizontal gap between sibling nodes: `28px`
- Leave at least `20px` padding inside boundaries

## Template Selection

- `assets/template-compact.html` (light, default) / `assets/template-compact-dark.html` (dark)
  Use for summary mode, Codex-first outputs, and most diagrams where readability matters more than exhaustiveness.
- `assets/template.html` (light, default) / `assets/template-dark.html` (dark)
  Use for presentation-ready diagrams, richer storytelling, and more layered systems.

All four files share identical layout and coordinates within their mode (compact vs. detailed) — only theme tokens differ. Never hand-pick colors from scratch; start from the template matching the requested theme and mode.

## Required Self-Check

Before finishing, verify all of the following:

- The main story is understandable in `3-5` seconds.
- The primary path is visually obvious.
- The heaviest visual emphasis is on the components that matter most.
- No boundary title or legend overlaps the diagram content.
- The requested theme (light unless dark was asked for) is applied consistently, with no leftover tokens from the other theme.
- Cards add context instead of repeating the SVG word-for-word.
- The final file opens directly in a browser with no JavaScript required.

## Output

Always produce a single self-contained `.html` file with:

- Embedded CSS
- Inline SVG
- No external images
- No JavaScript required

The file should render correctly when opened directly in any modern browser.
