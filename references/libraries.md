# Libraries and Assets: Next-Level Edition

Curated assets for striking technical visualizations. Only include what you actually need.

## 1. Typography Pairings (The Soul of Design)

Never use defaults like Inter or Roboto. Pick a high-character pairing for every page.

| Aesthetic | Heading Font | Body/Mono Font | Character |
|---|---|---|---|
| **Blueprint** | `IBM Plex Sans` (700) | `IBM Plex Mono` | Precise, Technical, Reliable |
| **Editorial** | `Instrument Serif` (400) | `JetBrains Mono` | Sophisticated, Refined, Premium |
| **Modernist** | `Bricolage Grotesque` (800) | `Fragment Mono` | Bold, Opinionated, High-Impact |
| **Organic** | `Crimson Pro` (600i) | `Cormorant Garamond` | Warm, Scholarly, Human |
| **Brutalist** | `Space Grotesk` (700) | `Space Mono` | Raw, Functional, Geometric |

### Master Import
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans:wght@700&family=Instrument+Serif&family=JetBrains+Mono&family=Bricolage+Grotesque:wght@800&family=Fragment+Mono&family=Crimson+Pro:ital,wght@1,600&family=Space+Grotesk:wght@700&family=Space+Mono&family=Cormorant+Garamond:wght@400;600&display=swap" rel="stylesheet">
```

## 2. Diagram Engines

### Mermaid.js (Latest ESM)
Always use the ESM import for the latest features and `layout: 'elk'` support.

```javascript
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
import elkLayouts from 'https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk/dist/mermaid-layout-elk.esm.min.mjs';

mermaid.registerLayoutLoaders(elkLayouts);
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  layout: 'elk',
  themeVariables: {
    /* Example: Blueprint theme variables */
    primaryColor: '#1e293b',
    primaryBorderColor: '#22d3ee',
    primaryTextColor: '#f8fafc',
    lineColor: '#22d3ee',
    fontSize: '16px',
    fontFamily: "'IBM Plex Sans', sans-serif"
  }
});
```

### Chart.js (Data Visualization)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

## 3. Specialized Assets

### Lucide Icons (SVG)
The cleanest icon set for technical diagrams.

```javascript
import { createIcons, ChevronRight, Activity, Database, Shield, Zap } from 'https://cdn.jsdelivr.net/npm/lucide@0.436.0/dist/esm/lucide.js';

createIcons({
  icons: { ChevronRight, Activity, Database, Shield, Zap }
});
```

### Anime.js (Orchestrated Motion)
```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
```

## 4. Anti-Slop Check
If your font stack starts with `Inter`, `system-ui`, or `Arial`, you are producing slop. **Force character** by using the pairings above.
