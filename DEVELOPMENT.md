# Development Guide

## 🧑‍💻 Developer Setup

### Environment Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (comes with Node.js)
- **TypeScript**: Included in project dependencies
- **Git**: For version control

### Quick Start
```bash
# Clone and setup
git clone [repository-url]
cd etheca.watch2
npm install
npm run dev
```

## 🎨 Design System Implementation

### Typography Scale
```css
/* Covik Sans Font Implementation */
--text-xs: 0.875rem    /* 14px */
--text-sm: 1rem        /* 16px - minimum body text */
--text-base: 1rem      /* 16px */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
--text-4xl: 2.25rem    /* 36px */
--text-5xl: 3rem       /* 48px */
```

### Spacing System (Rule 10)
```css
/* Mathematical Grid - All measurements derive from 4px/8px base */
--spacer-xs: 4px       /* 0.25rem */
--spacer-sm: 8px       /* 0.5rem */
--spacer-md: 16px      /* 1rem */
--spacer-lg: 24px      /* 1.5rem */
--spacer-xl: 32px      /* 2rem */
--spacer-xxl: 48px     /* 3rem */
--spacer-xxxl: 64px    /* 4rem */
--block-gap: 80px      /* 5rem - Between content blocks */
--section-gap: 96px    /* 6rem - Between major sections */
```

### Color Implementation (Rules 1-7)
```css
/* Near-Black and Near-White (Rule 1) */
--color-black-absolute: #0f0f11
--color-white-absolute: #f2f2f4
--color-black: #181820           /* Primary text */
--color-text-black: #1a1a22      /* Slightly lighter for accessibility */

/* Saturated Neutrals (Rules 2-3) */
--color-grey: #787885            /* Warm-tinted gray */
--color-surface-gray: #f4f4f6     /* Background with subtle saturation */

/* High Contrast Elements (Rule 4) */
--color-blue: #0a33ff            /* Primary CTA color */
--color-border-grid: #828294     /* Grid lines - balanced contrast */

/* Alpha Variations for Hierarchy */
--color-text-black-alpha-50: color-mix(in srgb, var(--color-text-black), var(--color-white) 50%)
--color-text-black-alpha-65: color-mix(in srgb, var(--color-text-black), var(--color-white) 35%)
--color-text-black-alpha-70: color-mix(in srgb, var(--color-text-black), var(--color-white) 30%)
```

### Grid System (Rule 12)
```css
/* 12-Column Grid Implementation */
--column-count: 12           /* Desktop */
--layout-max-width: 1920px
--layout-margin: 80px

/* Mobile Responsive (≤900px) */
@media screen and (max-width: 900px) {
  :root {
    --column-count: 6        /* 6-column grid for mobile */
    --layout-margin: 16px    /* Reduced margins */
    --section-gap: 90px      /* Adjusted section spacing */
    --block-gap: 60px        /* Adjusted block spacing */
  }
}
```

## 🏗️ Architecture Patterns

### Component Structure
```
src/components/
├── [ComponentName].tsx      # Main component file
├── ui/                      # Reusable UI primitives
│   ├── button.tsx          # Following rule 23 (padding: 2x horizontal)
│   └── hover-border-gradient.tsx
└── [Feature]Section.tsx     # Feature-specific sections
```

### CSS Organization
```
src/
├── index.css               # Global styles, CSS variables, font loading
├── App.css                 # Component-specific styles, vertical lines
└── components/ui/          # Component-scoped styles (if needed)
```

### State Management
- **Client State**: React useState/useEffect for UI state
- **Global State**: CSS custom properties for theme variables
- **Animation State**: Framer Motion for complex animations

## 🎯 Key Implementation Details

### Vertical Line System
```css
/* Unified vertical lines from header end to footer start */
.content-with-lines {
  position: relative;
  z-index: 1;
}

.content-with-lines::before,
.content-with-lines::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: rgba(130, 130, 148, 0.3); /* Consistent grid color */
  pointer-events: none;
  z-index: 10; /* Above grid backgrounds, below interactive elements */
}

.content-with-lines::before {
  left: calc(var(--layout-margin) + var(--column-count) * 1px);
}

.content-with-lines::after {
  right: calc(var(--layout-margin) + var(--column-count) * 1px);
}
```

### Grid Background Pattern (Rule 22 - Simple on Complex)
```css
/* 20px mathematical grid */
.grid-background {
  background-size: 20px 20px;
  background-image: 
    linear-gradient(to right, rgba(224, 224, 229, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(224, 224, 229, 0.3) 1px, transparent 1px);
}

/* Hero radial gradient overlay for depth */
.grid-overlay {
  background: var(--color-surface-gray);
  -webkit-mask: radial-gradient(ellipse at center, transparent 20%, black);
  mask: radial-gradient(ellipse at center, transparent 20%, black);
}
```

### Z-Index Stack Management
```css
/* Proper stacking context */
.hero-grid-background    { z-index: 1 }   /* Grid pattern */
.hero-gradient-overlay   { z-index: 2 }   /* Radial fade */
.hero-content           { z-index: 3 }   /* Text content */
.vertical-lines         { z-index: 10 }  /* Structural lines */
.scroll-progress        { z-index: 1000 } /* Always on top */
```

## 📱 Responsive Implementation

### Breakpoint Strategy
```css
/* Mobile-first approach */
/* Base styles: Mobile (≤900px) */
/* Desktop styles: >900px */

@media screen and (max-width: 900px) {
  /* 6-column grid, reduced margins, adjusted spacing */
}

@media screen and (min-width: 901px) {
  /* 12-column grid, standard margins, full spacing */
}
```

### Typography Responsive Behavior (Rules 16-17)
```css
/* Large headings - decreased line height and letter spacing */
.heading-1 {
  font-size: var(--text-5xl);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Body text - minimum 16px, increased line height */
.body-text {
  font-size: var(--text-base); /* 16px minimum */
  line-height: 1.6;
  letter-spacing: -0.01em;
}

/* Small text - increased spacing for readability */
.caption-text {
  font-size: var(--text-sm);
  line-height: 1.7;
  letter-spacing: 0.01em;
}
```

## 🚀 Build Process

### Development Commands
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Build Optimization
- **Font Loading**: `font-display: swap` for performance
- **Image Optimization**: Next.js automatic image optimization
- **CSS Optimization**: Tailwind purge + custom CSS minification
- **Bundle Analysis**: Next.js built-in bundle analyzer

### Git Workflow
```bash
# The project excludes build artifacts
/.next/
/out/
*.tsbuildinfo
/node_modules/

# Recommended workflow
git add .
git commit -m "feat: descriptive commit message"
git push origin main
```

## 🧪 Testing & Quality

### Design System Compliance
- **Rule 1-7**: Color contrast and brightness validation
- **Rule 8-15**: Spacing and alignment verification  
- **Rule 16-19**: Typography implementation checks
- **Rule 20-28**: UI element and shadow consistency

### Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

### Accessibility Standards
- **WCAG 2.1 AA**: Minimum contrast ratios (4.5:1 normal, 3:1 large text)
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Reader**: Semantic HTML structure
- **Color Independence**: Information not conveyed by color alone

## 🐛 Troubleshooting

### Common Issues

**Lines not appearing in hero section**
- Check z-index values (grid: 1, gradient: 2, content: 3, lines: 10)
- Verify background colors aren't making lines invisible
- Ensure proper stacking context with `position: relative`

**Font not loading**
- Verify font files exist in `/public/assets/`
- Check `font-display: swap` is set for all `@font-face` declarations
- Confirm font paths are correct in CSS

**Build size too large**
- Check `.gitignore` excludes `/.next/` and `/out/` directories
- Run `npm run build` to see bundle analysis
- Verify no unnecessary dependencies in `package.json`

**Responsive breakpoints not working**
- Confirm CSS custom properties update within `@media` queries
- Test viewport calculations: `--layout-min-max: min(var(--vw), var(--layout-max-width))`
- Verify mobile-first CSS approach

### Performance Debugging
```bash
# Analyze bundle size
npm run build

# Check font loading
# Network tab -> Filter by "Font" -> Verify swap behavior

# Validate responsive design
# DevTools -> Responsive Design Mode -> Test breakpoints
```

---

*This guide follows the established 28-rule design system. Every implementation decision maps back to these foundational principles for consistency and maintainability.*