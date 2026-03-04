# Responsive Section Navigation

Navigation pattern for multi-section pages (reviews, recaps, dashboards). Provides a frosted-glass sticky sidebar TOC on desktop and a polished horizontal pill bar on mobile. Scroll-spy highlights the active section with smooth animated indicators.

## Layout Structure

The page uses a two-column CSS Grid: sidebar (TOC) + main content. On mobile it collapses to single-column with the TOC becoming a horizontal bar.

```html
<body>
<div class="wrap">

  <nav class="toc" id="toc" aria-label="Table of contents">
    <div class="toc-title">Contents</div>
    <a href="#s1">1. First Section</a>
    <a href="#s2">2. Second Section</a>
    <!-- one link per section -->
  </nav>

  <div class="main">
    <h1>Page Title</h1>
    <p class="subtitle">Subtitle text</p>

    <div id="s1" class="sec-head ...">1 — First Section</div>
    <!-- section content -->

    <div id="s2" class="sec-head ...">2 — Second Section</div>
    <!-- section content -->
  </div><!-- /main -->

</div><!-- /wrap -->
</body>
```

Key structural rules:
- `<nav class="toc">` is the **first child** of `.wrap` — add `aria-label` for accessibility
- All page content goes inside `<div class="main">`
- Every section heading gets an `id="s1"`, `id="s2"`, etc.
- TOC links use `href="#s1"` matching those IDs
- Keep TOC link text short (truncate long section names)

## CSS

### Wrap (grid layout)

```css
.wrap {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0 40px;
}
.main { min-width: 0; }
```

### TOC — Desktop (sticky sidebar)

```css
.toc {
  position: sticky;
  top: 24px;
  align-self: start;
  padding: 16px 0;
  grid-row: 1 / -1;
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s;
}
.toc:hover {
  scrollbar-color: var(--surface-elevated) transparent;
}
.toc::-webkit-scrollbar { width: 3px; }
.toc::-webkit-scrollbar-track { background: transparent; }
.toc::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
  transition: background 0.3s;
}
.toc:hover::-webkit-scrollbar-thumb { background: var(--surface-elevated); }

.toc-title {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--text-dim);
  padding: 0 8px 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.toc a {
  display: block;
  font-size: 11px;
  color: var(--text-dim);
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 6px;
  transition:
    color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  line-height: 1.45;
  margin-bottom: 1px;
}
.toc a:hover {
  color: var(--text);
  background: var(--surface2);
  transform: translateX(2px);
}
.toc a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
.toc a.active {
  color: var(--text);
  background: var(--accent-dim, rgba(var(--accent-rgb, 100, 100, 255), 0.1));
  font-weight: 600;
}
```

Replace `var(--accent)` with your page's primary accent color variable (e.g., `var(--orange)`, `var(--blue)`). If your palette defines `--accent-dim`, the active pill background will use it; otherwise it falls back to the `rgba()` default.

### TOC — Mobile (frosted horizontal bar)

```css
@media (max-width: 1000px) {
  .wrap { grid-template-columns: 1fr; padding-top: 0; }
  body { padding-top: 0; }

  .toc {
    position: sticky;
    top: 0;
    z-index: 200;
    max-height: none;
    display: flex;
    gap: 4px;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    background: color-mix(in srgb, var(--bg) 80%, transparent);
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
    border-bottom: 1px solid var(--border);
    padding: 8px 0;
    margin: 0 -40px;
    padding-left: 40px;
    padding-right: 40px;
    grid-row: auto;
    /* Scroll shadow masks at edges */
    mask-image: linear-gradient(
      to right,
      transparent, black 40px,
      black calc(100% - 40px), transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent, black 40px,
      black calc(100% - 40px), transparent
    );
    scrollbar-width: none;
  }
  .toc::-webkit-scrollbar { display: none; }
  .toc-title { display: none; }

  .toc a {
    white-space: nowrap;
    flex-shrink: 0;
    border-radius: 100px;
    padding: 5px 12px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3px;
    transform: none;
  }
  .toc a:hover {
    transform: none;
  }
  .toc a.active {
    background: var(--accent-dim, rgba(var(--accent-rgb, 100, 100, 255), 0.12));
    color: var(--accent, var(--text));
    font-weight: 600;
  }

  .main { padding-top: 20px; }

  /* Offset scroll target so headings clear the sticky bar */
  .sec-head { scroll-margin-top: 52px; }
}
```

Adjust `margin: 0 -40px` and `padding-left/right: 40px` to match your `body` padding so the bar bleeds edge-to-edge. The `mask-image` gradient fades links at the scroll edges so overflow is communicated visually instead of hard-clipping.

## JavaScript — Scroll Spy

Place before `</body>`, after any Mermaid init:

```html
<script>
(function() {
  var toc = document.getElementById('toc');
  var links = toc.querySelectorAll('a');
  var sections = [];
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollBehavior = prefersReduced ? 'auto' : 'smooth';

  links.forEach(function(link) {
    var id = link.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        links.forEach(function(l) { l.classList.remove('active'); });
        var match = sections.find(function(s) { return s.el === entry.target; });
        if (match) {
          match.link.classList.add('active');
          // On mobile, auto-scroll the active tab into view
          if (window.innerWidth <= 1000) {
            match.link.scrollIntoView({
              behavior: scrollBehavior, block: 'nearest', inline: 'center'
            });
          }
        }
      }
    });
  }, { rootMargin: '-5% 0px -75% 0px', threshold: 0 });

  sections.forEach(function(s) { observer.observe(s.el); });

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        history.replaceState(null, '', '#' + id);
      }
    });
  });

  // Activate section from URL hash on load
  if (window.location.hash) {
    var hashId = window.location.hash.slice(1);
    var hashMatch = sections.find(function(s) { return s.id === hashId; });
    if (hashMatch) {
      links.forEach(function(l) { l.classList.remove('active'); });
      hashMatch.link.classList.add('active');
    }
  }
})();
</script>
```

## Adaptation Notes

- The `.toc-title` text, link labels, accent color, and section IDs change per page. Everything else is copy-paste.
- For pages with fewer than 4 sections, skip the TOC entirely — it adds clutter without value.
- The `grid-template-columns: 180px 1fr` width works for most TOCs. If section names are longer, go up to `200px`.
- The `rootMargin: '-5% 0px -75% 0px'` means a section is "active" when its heading enters the top 5–25% of the viewport. This gives earlier, more natural activation than the previous `-10% 0px -80%` setting.
- On mobile, the horizontal bar uses `overflow-x: auto` with hidden scrollbar and edge fade masks. The active tab auto-scrolls into the center of the bar as the user scrolls the page.
- The scroll spy respects `prefers-reduced-motion` — all smooth scrolling falls back to instant jumps for users who prefer reduced motion.
- The URL hash is read on page load to activate the correct TOC link when navigating to a deep-linked section.
- The `backdrop-filter: blur(12px) saturate(1.4)` on the mobile bar creates a frosted-glass effect. For browsers that don't support it, the `color-mix` background provides a solid fallback.
