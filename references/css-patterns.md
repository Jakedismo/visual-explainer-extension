# CSS Patterns for Diagrams: Next-Level Edition

Reusable patterns for layout, connectors, theming, and visual effects.

## 1. Orchestration: CSS Layers

Use `@layer` to manage specificity. This allows you to define a "Design System" in lower layers that can be safely overridden in higher layers.

```css
@layer reset, theme, layout, components, animation;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; overflow-x: hidden; }
}
```

## 2. The Design System: Tokens

Always define tokens in `@layer theme`.

```css
@layer theme {
  :root {
    /* Blueprint Palette */
    --blueprint-bg: #0f172a;
    --blueprint-grid: rgba(34, 211, 238, 0.05);
    --blueprint-accent: #22d3ee;
    --blueprint-text: #f8fafc;
    
    /* Editorial Palette */
    --editorial-bg: #fafaf9;
    --editorial-accent: #c2410c;
    --editorial-text: #1c1917;

    /* Paper/Ink Palette */
    --paper-bg: #fcfaf7;
    --paper-accent: #65a30d;
    --paper-ink: #1c1917;

    /* Default tokens */
    --radius: 12px;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  }
}
```

## 3. Aesthetic Recipes

### A. The Blueprint (Technical/Precise)
Characterized by deep blues, cyan accents, and technical grid backgrounds.

```css
@layer theme {
  [data-aesthetic="blueprint"] {
    --bg: var(--blueprint-bg);
    --surface: #1e293b;
    --border: rgba(34, 211, 238, 0.2);
    --text: var(--blueprint-text);
    --accent: var(--blueprint-accent);
    --font-body: 'IBM Plex Sans', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;
  }
  
  [data-aesthetic="blueprint"] body {
    background-image: 
      linear-gradient(var(--blueprint-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--blueprint-grid) 1px, transparent 1px);
    background-size: 20px 20px;
  }
}
```

### B. The Editorial (Sophisticated/Clean)
Characterized by generous whitespace, serif headlines, and muted tones.

```css
@layer theme {
  [data-aesthetic="editorial"] {
    --bg: var(--editorial-bg);
    --surface: #ffffff;
    --border: rgba(0, 0, 0, 0.08);
    --text: var(--editorial-text);
    --accent: var(--editorial-accent);
    --font-body: 'Instrument Serif', serif;
    --font-sans: 'Inter', sans-serif; /* Use Inter only as a sub-font */
  }
}
```

### C. The Paper/Ink (Organic/Warm)
Characterized by imperfect borders, warm backgrounds, and charcoal ink.

```css
@layer theme {
  [data-aesthetic="paper-ink"] {
    --bg: var(--paper-bg);
    --surface: #ffffff;
    --border: #e7e5e4;
    --text: var(--paper-ink);
    --accent: var(--paper-accent);
    --font-body: 'Crimson Pro', serif;
  }
  
  [data-aesthetic="paper-ink"] .ve-card {
    border-radius: 2px 5px 2px 8px / 5px 2px 8px 2px; /* Imperfect radius */
    box-shadow: 2px 3px 0 rgba(0,0,0,0.05);
  }
}
```

## 4. Layout Orchestration: Container Queries

Cards should adapt to their container's size, not the screen.

```css
@layer layout {
  .ve-card-container {
    container-type: inline-size;
    container-name: card;
  }

  @container card (min-width: 400px) {
    .ve-card__body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
  }
}
```

## 5. Components

### The Intent Bridge (Code Explanation)
Connects user intent to code implementation.

```css
@layer components {
  .intent-bridge {
    display: grid;
    grid-template-columns: 1fr 40px 1.5fr;
    align-items: center;
    gap: 24px;
    margin: 32px 0;
  }
  
  .intent-bridge__intent {
    padding: 20px;
    background: var(--accent-dim);
    border-left: 4px solid var(--accent);
    font-style: italic;
  }
  
  .intent-bridge__arrow svg {
    width: 100%;
    stroke: var(--border-bright);
    stroke-width: 2;
  }
}
```

### Enhanced Code Blocks
```css
@layer components {
  .code-window {
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  
  .code-window__tab {
    background: #2d2d2d;
    padding: 8px 16px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: #999;
    border-bottom: 1px solid #3d3d3d;
  }
  
  .code-window pre {
    padding: 20px;
    margin: 0;
    overflow-x: auto;
    color: #d4d4d4;
    line-height: 1.6;
  }
}
```

## 6. Proactive Imagery

Design slots for generated images.

```css
@layer components {
  .hero-banner {
    width: 100%;
    aspect-ratio: 21 / 9;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 40px;
    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  }
}
```
