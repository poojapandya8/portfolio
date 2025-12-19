# Pooja Portfolio - AI Coding Agent Instructions

## Project Overview
**Pooja Pandya - UX/UI Designer Portfolio** is a modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. It showcases UX/UI design case studies and professional background. Zero build tools, zero frameworks—pure semantic web standards.

**Architecture**: Static site with multi-page structure. Each project gets a dedicated case study page (e.g., `project-trapezoid.html`). Shared navigation and styling across all pages.

## Core Patterns & Conventions

### HTML Structure
- **Semantic HTML5**: Use proper sectioning (`<section>`, `<article>`, `<nav>`), headings hierarchy, and ARIA roles
- **Navigation system**: Fixed navbar in all pages references `id="nav-menu"` and `id="hamburger"` for JS hooks
- **Project cards**: Use `.project-card` class with nested `.project-image`, `.project-title`, `.project-link` structure
- **Case study pages**: Include breadcrumb links (`← Back to Work`), hero section with metadata, and section navigation with anchor links

### CSS Architecture
- **CSS Custom Properties**: All colors, shadows, transitions stored in `:root` variables (see [css/styles.css](css/styles.css#L8-L16))
  - `--primary-color`, `--secondary-color`, `--accent-color`, `--background-color`
  - `--shadow`, `--shadow-hover`, `--transition` for consistent effects
- **Responsive breakpoints**: Mobile-first approach; media queries typically at 768px and 1024px
- **Class naming**: BEM-adjacent (`.navbar`, `.nav-container`, `.nav-link`); use modifiers like `.active`, `.disabled`
- **Reusable styles**: [css/styles.css](css/styles.css) has shared components; page-specific overrides in dedicated files ([css/case-study.css](css/case-study.css), [css/about.css](css/about.css))

### JavaScript Patterns
- **DOM Query**: Centralized element selection at module start; use `document.getElementById()` for IDs with JS hooks
- **Event handlers**: Named handler functions (`toggleMobileMenu()`, `handleNavbarScroll()`, `animateOnScroll()`)
- **Accessibility**: Project cards include `tabindex="0"`, `role="button"`, `aria-label` attributes
- **Intersection Observer**: Used in [main.js](js/main.js) for scroll-triggered card animations (replaces scroll listeners)
- **Smooth interactions**: Transitions handled via CSS; JS adds/removes classes, not inline styles (except for animations)

## Developer Workflows
Act as a senioir frontend developer to guide the development and maintenance of the Pooja Pandya portfolio website. Ensure that all code adheres to the specified patterns and conventions, and that the site is accessible, responsive, and performant.

### Local Development
```bash
# Serve locally (Python)
python -m http.server 8000

# Or with Node.js
npx serve .
```
Open `http://localhost:8000/index.html`

### Adding New Project Case Study
1. Create `project-[name].html` following [project-trapezoid.html](project-trapezoid.html) template
2. Link from homepage: add `.project-card` entry in projects grid with `.project-link` pointing to new page
3. Organize images in `images/[project-name]/` with subdirectories: `wireframes/`, `design-system/`, `mobile-tablet/`, etc.
4. Include metadata section with Role, Tools, Process, Timeline
5. Use section navigation with anchor links for deep-linking within case study

### Performance Considerations
- **Images**: Use `loading="lazy"` on project image cards and case study images
- **Fonts**: Pre-connected Google Fonts (Inter); minimal font weights loaded (300, 400, 500, 600, 700)
- **Third-party**: Swiper JS library loaded from CDN for image carousel (see case study pages)

## Integration Points & External Dependencies

### Third-Party Libraries
- **Swiper**: Image carousel in case studies (`cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`)
- **Google Fonts**: Inter font family pre-connected and loaded asynchronously
- **No framework dependencies**: All DOM manipulation is vanilla JS

### Shared Across Pages
- **Navigation behavior**: `main.js` handles hamburger toggle, smooth scrolling, scroll effects for all pages
- **Navigation links**: All pages reference `index.html` (home), `about.html`, `contact.html`
- **Active link styling**: JS manages `.active` class on current page's nav link

## Key File Reference
- **[index.html](index.html)** - Homepage with projects grid
- **[css/styles.css](css/styles.css)** - Global styles, design tokens, shared components
- **[js/main.js](js/main.js)** - Navigation interactivity, scroll animations, accessibility enhancements
- **[project-trapezoid.html](project-trapezoid.html)** - Template for case study pages
- **[css/case-study.css](css/case-study.css)** - Overrides and special styles for case studies

## Accessibility Standards Applied
- ARIA attributes on interactive elements (buttons, cards)
- Keyboard navigation for project cards (Enter/Space triggers link)
- Semantic heading hierarchy (h1 > h2 > h3)
- Color contrast compliance (dark text on light backgrounds)
- Mobile-friendly touch targets (50px+ height/width)

## When Extending the Portfolio
- **New pages**: Follow nav structure; update all `.nav-link` collections to include new page
- **New styling**: Add to page-specific CSS file, not global styles (unless truly shared)
- **New interactions**: Add to [main.js](js/main.js) with JSDoc comments; use Intersection Observer for scroll effects
- **Images**: Optimize for web; maintain project folder organization; lazy-load by default
