./CLAUDE.md
```
# Project Context: Etheca.Watch Refactor

This document outlines the plan to refactor the "Etheca.Watch" frontend. It serves as the single source of truth for the project's goals, architecture, and migration steps.

## 🎯 Primary Goal
The main objective is to completely rewrite the frontend of Etheca.Watch to adopt the modern architecture, file structure, and design system of the "Taxonomy" project by shadcn. This involves migrating from the Next.js pages router to the app router, replacing the custom component and styling system with shadcn/ui, and using Contentlayer for content management.

## 1. Source Project Analysis: "Etheca.Watch"
Core Concept: An AI-powered automation platform designed to eliminate manual data entry.

### Original Architecture:

- **Framework**: Next.js with the pages router.
- **Styling**: A mix of Tailwind CSS and a comprehensive custom CSS variable system in src/App.css and src/index.css. This includes a unique 28-rule design system with a mathematical grid and vertical line system.
- **Components**: Custom-built React components located in src/components/, such as AutomationHero, InvisibleHandSection, and a custom HoverBorderGradient.
- **Typography**: Uses the custom font family "Covik Sans".
- **Content**: A blog system managed by a custom script (lib/contentService.ts) that parses Markdown files from an _posts directory using gray-matter and remark.

## 2. Target Architecture Analysis: "Taxonomy"
Core Principles: A modern, highly-organized, and scalable application structure. It prioritizes convention, type-safety, and developer experience.

### Key Technologies & Patterns:

- **Next.js App Router**: Uses the app/ directory for routing, layouts, and React Server Components.
- **shadcn/ui**: For UI components. These are not imported from a library but are generated via a CLI into the components/ui directory. They are built with Radix UI and styled with Tailwind CSS.
- **Contentlayer**: For type-safe MDX content management (content/ directory), replacing the manual parsing script.
- **Centralized Configuration**: All site navigation, metadata, and feature configurations are stored in the config/ directory.
- **Styling**: Primarily Tailwind CSS, with theme variables (colors, radius, etc.) defined in styles/globals.css to support light/dark modes seamlessly.

## 3. The Refactoring Plan
This is the step-by-step process for migrating the Etheca.Watch frontend.

### Step 1: Project Setup and Dependencies
- **Initialize New Project**: Start with a fresh Next.js project, ensuring to select options for TypeScript, Tailwind CSS, and the app/ Router.
- **Install shadcn/ui**: Run the shadcn/ui initialization command (`npx shadcn-ui@latest init`). This will set up the components/ui directory and configure tailwind.config.js and globals.css automatically.
- **Install Core Dependencies**: Add other key packages from the "Taxonomy" project's package.json, including contentlayer, next-contentlayer, lucide-react, and next-themes.

### Step 2: Structure, Configuration, and Styles
- **Adopt app/ Directory**: Create the folder structure from "Taxonomy" within the app/ directory (e.g., (marketing)/, (blog)/). The main landing page will move to app/(marketing)/page.tsx.
- **Create Root Layout**: Implement app/layout.tsx. This file replaces _app.tsx and _document.tsx. Copy the base structure, font loading, and ThemeProvider from "Taxonomy".
- **Migrate Fonts & Styles**:
  - Move the "Covik Sans" font files to a new assets/fonts directory and load them in app/layout.tsx.
  - Transfer custom CSS variables from src/App.css to styles/globals.css, adapting them to the :root and .dark structure used by shadcn/ui.
- **Centralize Config**: Create a config/ directory. Add site.ts for metadata and marketing.ts for navigation links.

### Step 3: Rebuild Components with shadcn/ui
- **Generate UI Primitives**: Use the shadcn/ui CLI to add necessary components (e.g., `npx shadcn-ui@latest add button card`).
- **Rewrite Core Components**:
  - Rebuild the Header and Footer as new components (main-nav.tsx, site-footer.tsx), using the generated shadcn/ui components and configuration from config/marketing.ts.
- **Rewrite Page Sections**:
  - Recreate the landing page sections (AutomationHero, InvisibleHandSection, etc.) as new components.
  - Utilize Card for feature showcases and standard Tailwind CSS for layout. The vertical line system and grid background can be recreated using Tailwind classes or targeted global CSS.

### Step 4: Migrate Blog to Contentlayer
- **Configure Contentlayer**: Create contentlayer.config.js and define the schema for blog posts (Post), including fields like title, date, description, and image.
- **Migrate Content**: Move the Markdown file from _posts/ to a new content/blog/ directory. Update the file extension to .mdx and ensure the frontmatter matches the new schema.
- **Create Blog Pages**:
  - Build the blog index at app/(marketing)/blog/page.tsx, fetching data from allPosts provided by Contentlayer.
  - Create the dynamic route for individual posts at app/(marketing)/blog/[...slug]/page.tsx. Use the <Mdx /> component (components/mdx-components.tsx) to render the content.

### Step 5: Finalization and Cleanup
- **Update Tailwind Config**: Ensure tailwind.config.js is configured to scan all new directories (app, components, content).
- **Remove Old Files**: Once migration is verified, delete the legacy pages/ and src/ directories.
- **Code Quality**: Adopt the .eslintrc.json and prettier.config.js from "Taxonomy" to maintain code consistency.

## 4. Key Decisions & Reminders
- **Component-First**: Always prefer using or creating a shadcn/ui component over custom one-off styles.
- **Content is Data**: All MDX content should be managed through Contentlayer to ensure type safety.
- **Structure is Key**: Adhere strictly to the "Taxonomy" project structure for long-term maintainability.
- **Server-Side First**: Leverage React Server Components wherever possible for better performance.
```
./DEVELOPMENT.md
````
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
````
./README.md
````
# Etheca.Watch

**The end of manual data entry.** An AI-powered automation platform that observes your workflow and updates your systems of record automatically.

## 🎯 What is Etheca.Watch?

Etheca.Watch eliminates the tedious task of manual data entry by intelligently observing how you work and automatically updating your CRMs, project management tools, and other systems. Our AI learns your workflow patterns to keep your source of truth perfectly accurate without you lifting a finger.

### Key Value Propositions

- **📊 Workflow Intelligence**: AI maps and understands your complex workflow chaos, turning it into actionable insights
- **🤖 Invisible Automation**: Focus on your work while our AI silently maintains data accuracy across all your tools  
- **🔗 Universal Integration**: Works seamlessly with your existing CRMs, project management boards, and communication apps
- **✅ Human-in-the-Loop**: AI prepares updates for your final approval - you stay in control

## 🏗️ Architecture & Design

### Visual Design System

This project follows a comprehensive 28-rule design system emphasizing:

- **Unified Typography**: Custom Covik Sans font family with 9 weight variations (regular to black, including italics)
- **Mathematical Grid**: 8px-based spacing system with responsive breakpoints
- **Sophisticated Color Palette**: Near-black (#181820) and near-white (#F2F2F4) with saturated neutrals
- **Consistent Visual Language**: Grid backgrounds, unified vertical lines, and cohesive UI elements

### Technical Stack

**Frontend Framework**: Next.js 15.5.0 with React 19.1.1
**Styling**: TailwindCSS 3.4.17 with custom CSS variables and mathematical spacing
**Animations**: Framer Motion 12.23.12 for smooth interactions
**UI Components**: Radix UI primitives with custom shadcn/ui implementation
**Typography**: Class Variance Authority for consistent text styling
**Language**: TypeScript 4.9.5 for type safety

### Component Architecture

```
src/components/
├── AutomationHero.tsx       # Main hero section with grid background
├── WorkflowMappingSection.tsx # "We map the chaos" feature highlight
├── InvisibleHandSection.tsx  # Automation value proposition
├── IntegrationsShowcase.tsx  # Third-party tool compatibility
├── Header.tsx               # Navigation with unified border system
├── Footer.tsx               # Footer with grey vertical lines
├── ScrollProgress.tsx       # Visual scroll indicator
└── ui/                      # Reusable UI primitives
    ├── button.tsx
    └── hover-border-gradient.tsx
```

## 🎨 Design Implementation Details

### Vertical Line System
The site features a sophisticated vertical line system that provides visual structure:
- **Main Content Lines**: Unified vertical lines spanning from header end to footer start
- **Responsive Grid**: 20px background grid with subtle rgba(224, 224, 229, 0.3) pattern
- **Footer Integration**: Grey vertical lines (#666666) in footer section for visual distinction
- **Z-index Management**: Proper stacking context to handle grid overlays and hero radial gradients

### Custom Font Implementation
Complete Covik Sans font family integration:
```css
/* Weight variations: 400, 500, 600, 700, 900 */
/* Style variations: normal, italic */
/* Optimized with font-display: swap for performance */
```

### Color System
- **Primary Background**: `--color-surface-gray` (#f4f4f6)
- **Text Colors**: High contrast near-black (#1a1a22) with alpha variations
- **Grid Lines**: Consistent rgba(130, 130, 148, 0.3) throughout interface
- **Interactive Elements**: Blue accent (#0a33ff) for CTAs

### Responsive Breakpoints
- **Desktop**: 12-column grid, 80px margins, 96px section gaps
- **Mobile** (≤900px): 6-column grid, 16px margins, 90px section gaps
- **Typography**: Minimum 16px body text, optimized line heights per rule 16-17

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/etheca.watch2.git
cd etheca.watch2

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
etheca.watch2/
├── pages/                   # Next.js page components
│   ├── _app.tsx            # App wrapper with global styles
│   ├── _document.tsx       # Custom document for font loading
│   └── index.tsx           # Main landing page
├── src/
│   ├── components/         # React components
│   ├── App.css            # Main stylesheet with design system
│   ├── index.css          # Global styles and CSS variables
│   └── lib/               # Utility functions
├── public/
│   ├── assets/            # Covik Sans font files
│   ├── images/            # Processed PNG assets
│   └── favicon/           # Favicon and manifest files
├── contextfiles/
│   └── design.md          # 28-rule design system documentation
└── tailwind.config.js     # TailwindCSS configuration
```

## 🎯 Features Implemented

### Landing Page Sections

1. **AutomationHero**: Hero section with grid background and radial gradient overlay
2. **WorkflowMappingSection**: AI workflow intelligence explanation  
3. **InvisibleHandSection**: Automation value proposition with visual
4. **IntegrationsShowcase**: Third-party tool compatibility showcase

### UI/UX Enhancements

- **Scroll Progress Indicator**: Visual feedback matching grid line colors
- **Hover Border Gradient**: Interactive CTA button with smooth animations
- **Mobile Responsiveness**: Optimized layouts across all viewport sizes
- **Performance Optimizations**: Font loading, image optimization, CSS variables

### Technical Features

- **Grid Background System**: Mathematical 20px grid with gradient overlays
- **Unified Vertical Lines**: Consistent visual structure from header to footer
- **Custom CSS Properties**: Scalable design token system
- **Type Safety**: Full TypeScript implementation
- **Build Optimization**: Next.js static generation with proper asset handling

## 🔧 Development Notes

### CSS Architecture
- **Design System**: 28 visual design rules (see `contextfiles/design.md`)
- **Spacing System**: Mathematical 4px/8px grid with named variables
- **Color Variables**: Both dark/light theme CSS custom properties
- **Component Styling**: Mix of TailwindCSS utilities and custom CSS

### Performance Considerations
- **Font Loading**: `font-display: swap` for all Covik Sans variants
- **Image Optimization**: Processed PNG assets with proper aspect ratios
- **CSS Variables**: Runtime theme switching capability
- **Bundle Size**: Optimized imports and tree shaking

### Git Configuration
The project includes proper `.gitignore` configuration to exclude:
- Next.js build artifacts (`/.next/`, `/out/`)
- Node.js dependencies (`/node_modules/`)
- TypeScript build cache (`*.tsbuildinfo`)
- Environment files (`.env*`)

## 📧 Contact

Ready to end manual data entry? Get in touch with us:

**Email**: [hello@etheca.watch](mailto:hello@etheca.watch)

## 📄 License

This project is private and proprietary to Etheca.Watch.

---

*Built with precision, designed with purpose. Every pixel and interaction follows our comprehensive 28-rule design system to deliver a professional, accessible, and visually cohesive experience.*

````
./contentlayer.config.ts
```typescript
import { defineDocumentType, makeSource } from "contentlayer/source-files"

const computedFields = {
  slug: {
    type: "string" as const,
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string" as const,
    resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
})
```
./generate-project-files.sh
```bash
#!/bin/bash

# Generate project files for LLM context using files-to-prompt
# This script creates a markdown file with all source code files, excluding build artifacts and dependencies

echo "🚀 Generating project files for LLM context..."

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install files-to-prompt if not already installed
echo "📥 Installing files-to-prompt..."
pip install files-to-prompt > /dev/null 2>&1

# Generate the project files
echo "📝 Generating project_files.md..."
files-to-prompt . \
    --ignore "node_modules" \
    --ignore "out" \
    --ignore "*.log" \
    --ignore "*.lock" \
    --ignore "tsconfig.tsbuildinfo" \
    --ignore "venv" \
    --ignore ".next" \
    --ignore ".git" \
    --ignore "*.png" \
    --ignore "*.jpg" \
    --ignore "*.jpeg" \
    --ignore "*.gif" \
    --ignore "*.svg" \
    --ignore "*.ico" \
    --ignore "*.otf" \
    --ignore "*.ttf" \
    --ignore "*.woff" \
    --ignore "*.woff2" \
    --ignore "*.eot" \
    --ignore "*.pdf" \
    --ignore "*.zip" \
    --ignore "*.tar.gz" \
    --ignore "*.rar" \
    --ignore "*.mp4" \
    --ignore "*.mp3" \
    --ignore "*.wav" \
    --ignore "*.avi" \
    --ignore "*.mov" \
    --ignore "*.webm" \
    --ignore "*.webp" \
    --ignore "*.ico" \
    --ignore "*.bin" \
    --ignore "*.exe" \
    --ignore "*.dmg" \
    --ignore "*.pkg" \
    --ignore "*.deb" \
    --ignore "*.rpm" \
    --ignore "*.msi" \
    --ignore "*.app" \
    --ignore "*.dll" \
    --ignore "*.so" \
    --ignore "*.dylib" \
    --ignore "*.a" \
    --ignore "*.o" \
    --ignore "*.class" \
    --ignore "*.pyc" \
    --ignore "*.pyo" \
    --ignore "*.pyd" \
    --ignore "*.so" \
    --ignore "*.dylib" \
    --ignore "*.dll" \
    --ignore "*.exe" \
    --ignore "*.bin" \
    --ignore "*.dat" \
    --ignore "*.db" \
    --ignore "*.sqlite" \
    --ignore "*.sqlite3" \
    --ignore "*.mdb" \
    --ignore "*.accdb" \
    --ignore "*.xls" \
    --ignore "*.xlsx" \
    --ignore "*.csv" \
    --ignore "*.tsv" \
    --ignore "*.json" \
    --ignore "*.xml" \
    --ignore "*.yaml" \
    --ignore "*.yml" \
    --ignore "*.toml" \
    --ignore "*.ini" \
    --ignore "*.cfg" \
    --ignore "*.conf" \
    --ignore "*.config" \
    --ignore "*.env" \
    --ignore "*.env.local" \
    --ignore "*.env.development" \
    --ignore "*.env.production" \
    --ignore "*.env.test" \
    --ignore "*.env.staging" \
    --ignore "*.env.example" \
    --ignore "*.env.sample" \
    --ignore "*.env.template" \
    --ignore "*.env.backup" \
    --ignore "*.env.old" \
    --ignore "*.env.bak" \
    --ignore "*.env.save" \
    --ignore "*.env.orig" \
    --ignore "*.env.tmp" \
    --ignore "*.env.temp" \
    --ignore "*.env.swp" \
    --ignore "*.env.swo" \
    --ignore "*.env~" \
    --ignore "*.env.bak" \
    --ignore "*.env.old" \
    --ignore "*.env.save" \
    --ignore "*.env.orig" \
    --ignore "*.env.tmp" \
    --ignore "*.env.temp" \
    --ignore "*.env.swp" \
    --ignore "*.env.swo" \
    --ignore "*.env~" \
    --ignore-gitignore \
    --markdown \
    -o project_files.md

# Check if the file was created successfully
if [ -f "project_files.md" ]; then
    file_size=$(ls -lh project_files.md | awk '{print $5}')
    echo "✅ Successfully generated project_files.md (${file_size})"
    echo "📁 File location: $(pwd)/project_files.md"
else
    echo "❌ Failed to generate project_files.md"
    exit 1
fi

echo "🎉 Done! You can now use project_files.md with your LLM tools."

```
./next-env.d.ts
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference path="./.next/types/routes.d.ts" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```
./next.config.js
```javascript
const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  outputFileTracingRoot: __dirname
}

module.exports = withContentlayer(nextConfig)
```
./postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
./project_files.md
`````
./CLAUDE.md
```
# Project Context: Etheca.Watch Refactor

This document outlines the plan to refactor the "Etheca.Watch" frontend. It serves as the single source of truth for the project's goals, architecture, and migration steps.

## 🎯 Primary Goal
The main objective is to completely rewrite the frontend of Etheca.Watch to adopt the modern architecture, file structure, and design system of the "Taxonomy" project by shadcn. This involves migrating from the Next.js pages router to the app router, replacing the custom component and styling system with shadcn/ui, and using Contentlayer for content management.

## 1. Source Project Analysis: "Etheca.Watch"
Core Concept: An AI-powered automation platform designed to eliminate manual data entry.

### Original Architecture:

- **Framework**: Next.js with the pages router.
- **Styling**: A mix of Tailwind CSS and a comprehensive custom CSS variable system in src/App.css and src/index.css. This includes a unique 28-rule design system with a mathematical grid and vertical line system.
- **Components**: Custom-built React components located in src/components/, such as AutomationHero, InvisibleHandSection, and a custom HoverBorderGradient.
- **Typography**: Uses the custom font family "Covik Sans".
- **Content**: A blog system managed by a custom script (lib/contentService.ts) that parses Markdown files from an _posts directory using gray-matter and remark.

## 2. Target Architecture Analysis: "Taxonomy"
Core Principles: A modern, highly-organized, and scalable application structure. It prioritizes convention, type-safety, and developer experience.

### Key Technologies & Patterns:

- **Next.js App Router**: Uses the app/ directory for routing, layouts, and React Server Components.
- **shadcn/ui**: For UI components. These are not imported from a library but are generated via a CLI into the components/ui directory. They are built with Radix UI and styled with Tailwind CSS.
- **Contentlayer**: For type-safe MDX content management (content/ directory), replacing the manual parsing script.
- **Centralized Configuration**: All site navigation, metadata, and feature configurations are stored in the config/ directory.
- **Styling**: Primarily Tailwind CSS, with theme variables (colors, radius, etc.) defined in styles/globals.css to support light/dark modes seamlessly.

## 3. The Refactoring Plan
This is the step-by-step process for migrating the Etheca.Watch frontend.

### Step 1: Project Setup and Dependencies
- **Initialize New Project**: Start with a fresh Next.js project, ensuring to select options for TypeScript, Tailwind CSS, and the app/ Router.
- **Install shadcn/ui**: Run the shadcn/ui initialization command (`npx shadcn-ui@latest init`). This will set up the components/ui directory and configure tailwind.config.js and globals.css automatically.
- **Install Core Dependencies**: Add other key packages from the "Taxonomy" project's package.json, including contentlayer, next-contentlayer, lucide-react, and next-themes.

### Step 2: Structure, Configuration, and Styles
- **Adopt app/ Directory**: Create the folder structure from "Taxonomy" within the app/ directory (e.g., (marketing)/, (blog)/). The main landing page will move to app/(marketing)/page.tsx.
- **Create Root Layout**: Implement app/layout.tsx. This file replaces _app.tsx and _document.tsx. Copy the base structure, font loading, and ThemeProvider from "Taxonomy".
- **Migrate Fonts & Styles**:
  - Move the "Covik Sans" font files to a new assets/fonts directory and load them in app/layout.tsx.
  - Transfer custom CSS variables from src/App.css to styles/globals.css, adapting them to the :root and .dark structure used by shadcn/ui.
- **Centralize Config**: Create a config/ directory. Add site.ts for metadata and marketing.ts for navigation links.

### Step 3: Rebuild Components with shadcn/ui
- **Generate UI Primitives**: Use the shadcn/ui CLI to add necessary components (e.g., `npx shadcn-ui@latest add button card`).
- **Rewrite Core Components**:
  - Rebuild the Header and Footer as new components (main-nav.tsx, site-footer.tsx), using the generated shadcn/ui components and configuration from config/marketing.ts.
- **Rewrite Page Sections**:
  - Recreate the landing page sections (AutomationHero, InvisibleHandSection, etc.) as new components.
  - Utilize Card for feature showcases and standard Tailwind CSS for layout. The vertical line system and grid background can be recreated using Tailwind classes or targeted global CSS.

### Step 4: Migrate Blog to Contentlayer
- **Configure Contentlayer**: Create contentlayer.config.js and define the schema for blog posts (Post), including fields like title, date, description, and image.
- **Migrate Content**: Move the Markdown file from _posts/ to a new content/blog/ directory. Update the file extension to .mdx and ensure the frontmatter matches the new schema.
- **Create Blog Pages**:
  - Build the blog index at app/(marketing)/blog/page.tsx, fetching data from allPosts provided by Contentlayer.
  - Create the dynamic route for individual posts at app/(marketing)/blog/[...slug]/page.tsx. Use the <Mdx /> component (components/mdx-components.tsx) to render the content.

### Step 5: Finalization and Cleanup
- **Update Tailwind Config**: Ensure tailwind.config.js is configured to scan all new directories (app, components, content).
- **Remove Old Files**: Once migration is verified, delete the legacy pages/ and src/ directories.
- **Code Quality**: Adopt the .eslintrc.json and prettier.config.js from "Taxonomy" to maintain code consistency.

## 4. Key Decisions & Reminders
- **Component-First**: Always prefer using or creating a shadcn/ui component over custom one-off styles.
- **Content is Data**: All MDX content should be managed through Contentlayer to ensure type safety.
- **Structure is Key**: Adhere strictly to the "Taxonomy" project structure for long-term maintainability.
- **Server-Side First**: Leverage React Server Components wherever possible for better performance.
```
./DEVELOPMENT.md
````
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
````
./README.md
````
# Etheca.Watch

**The end of manual data entry.** An AI-powered automation platform that observes your workflow and updates your systems of record automatically.

## 🎯 What is Etheca.Watch?

Etheca.Watch eliminates the tedious task of manual data entry by intelligently observing how you work and automatically updating your CRMs, project management tools, and other systems. Our AI learns your workflow patterns to keep your source of truth perfectly accurate without you lifting a finger.

### Key Value Propositions

- **📊 Workflow Intelligence**: AI maps and understands your complex workflow chaos, turning it into actionable insights
- **🤖 Invisible Automation**: Focus on your work while our AI silently maintains data accuracy across all your tools  
- **🔗 Universal Integration**: Works seamlessly with your existing CRMs, project management boards, and communication apps
- **✅ Human-in-the-Loop**: AI prepares updates for your final approval - you stay in control

## 🏗️ Architecture & Design

### Visual Design System

This project follows a comprehensive 28-rule design system emphasizing:

- **Unified Typography**: Custom Covik Sans font family with 9 weight variations (regular to black, including italics)
- **Mathematical Grid**: 8px-based spacing system with responsive breakpoints
- **Sophisticated Color Palette**: Near-black (#181820) and near-white (#F2F2F4) with saturated neutrals
- **Consistent Visual Language**: Grid backgrounds, unified vertical lines, and cohesive UI elements

### Technical Stack

**Frontend Framework**: Next.js 15.5.0 with React 19.1.1
**Styling**: TailwindCSS 3.4.17 with custom CSS variables and mathematical spacing
**Animations**: Framer Motion 12.23.12 for smooth interactions
**UI Components**: Radix UI primitives with custom shadcn/ui implementation
**Typography**: Class Variance Authority for consistent text styling
**Language**: TypeScript 4.9.5 for type safety

### Component Architecture

```
src/components/
├── AutomationHero.tsx       # Main hero section with grid background
├── WorkflowMappingSection.tsx # "We map the chaos" feature highlight
├── InvisibleHandSection.tsx  # Automation value proposition
├── IntegrationsShowcase.tsx  # Third-party tool compatibility
├── Header.tsx               # Navigation with unified border system
├── Footer.tsx               # Footer with grey vertical lines
├── ScrollProgress.tsx       # Visual scroll indicator
└── ui/                      # Reusable UI primitives
    ├── button.tsx
    └── hover-border-gradient.tsx
```

## 🎨 Design Implementation Details

### Vertical Line System
The site features a sophisticated vertical line system that provides visual structure:
- **Main Content Lines**: Unified vertical lines spanning from header end to footer start
- **Responsive Grid**: 20px background grid with subtle rgba(224, 224, 229, 0.3) pattern
- **Footer Integration**: Grey vertical lines (#666666) in footer section for visual distinction
- **Z-index Management**: Proper stacking context to handle grid overlays and hero radial gradients

### Custom Font Implementation
Complete Covik Sans font family integration:
```css
/* Weight variations: 400, 500, 600, 700, 900 */
/* Style variations: normal, italic */
/* Optimized with font-display: swap for performance */
```

### Color System
- **Primary Background**: `--color-surface-gray` (#f4f4f6)
- **Text Colors**: High contrast near-black (#1a1a22) with alpha variations
- **Grid Lines**: Consistent rgba(130, 130, 148, 0.3) throughout interface
- **Interactive Elements**: Blue accent (#0a33ff) for CTAs

### Responsive Breakpoints
- **Desktop**: 12-column grid, 80px margins, 96px section gaps
- **Mobile** (≤900px): 6-column grid, 16px margins, 90px section gaps
- **Typography**: Minimum 16px body text, optimized line heights per rule 16-17

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/etheca.watch2.git
cd etheca.watch2

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
etheca.watch2/
├── pages/                   # Next.js page components
│   ├── _app.tsx            # App wrapper with global styles
│   ├── _document.tsx       # Custom document for font loading
│   └── index.tsx           # Main landing page
├── src/
│   ├── components/         # React components
│   ├── App.css            # Main stylesheet with design system
│   ├── index.css          # Global styles and CSS variables
│   └── lib/               # Utility functions
├── public/
│   ├── assets/            # Covik Sans font files
│   ├── images/            # Processed PNG assets
│   └── favicon/           # Favicon and manifest files
├── contextfiles/
│   └── design.md          # 28-rule design system documentation
└── tailwind.config.js     # TailwindCSS configuration
```

## 🎯 Features Implemented

### Landing Page Sections

1. **AutomationHero**: Hero section with grid background and radial gradient overlay
2. **WorkflowMappingSection**: AI workflow intelligence explanation  
3. **InvisibleHandSection**: Automation value proposition with visual
4. **IntegrationsShowcase**: Third-party tool compatibility showcase

### UI/UX Enhancements

- **Scroll Progress Indicator**: Visual feedback matching grid line colors
- **Hover Border Gradient**: Interactive CTA button with smooth animations
- **Mobile Responsiveness**: Optimized layouts across all viewport sizes
- **Performance Optimizations**: Font loading, image optimization, CSS variables

### Technical Features

- **Grid Background System**: Mathematical 20px grid with gradient overlays
- **Unified Vertical Lines**: Consistent visual structure from header to footer
- **Custom CSS Properties**: Scalable design token system
- **Type Safety**: Full TypeScript implementation
- **Build Optimization**: Next.js static generation with proper asset handling

## 🔧 Development Notes

### CSS Architecture
- **Design System**: 28 visual design rules (see `contextfiles/design.md`)
- **Spacing System**: Mathematical 4px/8px grid with named variables
- **Color Variables**: Both dark/light theme CSS custom properties
- **Component Styling**: Mix of TailwindCSS utilities and custom CSS

### Performance Considerations
- **Font Loading**: `font-display: swap` for all Covik Sans variants
- **Image Optimization**: Processed PNG assets with proper aspect ratios
- **CSS Variables**: Runtime theme switching capability
- **Bundle Size**: Optimized imports and tree shaking

### Git Configuration
The project includes proper `.gitignore` configuration to exclude:
- Next.js build artifacts (`/.next/`, `/out/`)
- Node.js dependencies (`/node_modules/`)
- TypeScript build cache (`*.tsbuildinfo`)
- Environment files (`.env*`)

## 📧 Contact

Ready to end manual data entry? Get in touch with us:

**Email**: [hello@etheca.watch](mailto:hello@etheca.watch)

## 📄 License

This project is private and proprietary to Etheca.Watch.

---

*Built with precision, designed with purpose. Every pixel and interaction follows our comprehensive 28-rule design system to deliver a professional, accessible, and visually cohesive experience.*

````
./contentlayer.config.ts
```typescript
import { defineDocumentType, makeSource } from "contentlayer/source-files"

const computedFields = {
  slug: {
    type: "string" as const,
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string" as const,
    resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
})
`````
./shadcn-ui-taxonomy-8a5edab282632443.txt
`````
Directory structure:
└── shadcn-ui-taxonomy/
    ├── README.md
    ├── contentlayer.config.js
    ├── env.mjs
    ├── LICENSE.md
    ├── middleware.ts
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.js
    ├── prettier.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── .commitlintrc.json
    ├── .editorconfig
    ├── .env.example
    ├── .eslintrc.json
    ├── .nvmrc
    ├── .prettierignore
    ├── app/
    │   ├── layout.tsx
    │   ├── robots.ts
    │   ├── (auth)/
    │   │   ├── layout.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   ├── (dashboard)/
    │   │   └── dashboard/
    │   │       ├── layout.tsx
    │   │       ├── loading.tsx
    │   │       ├── page.tsx
    │   │       ├── billing/
    │   │       │   ├── loading.tsx
    │   │       │   └── page.tsx
    │   │       └── settings/
    │   │           ├── loading.tsx
    │   │           └── page.tsx
    │   ├── (docs)/
    │   │   ├── layout.tsx
    │   │   ├── docs/
    │   │   │   ├── layout.tsx
    │   │   │   └── [[...slug]]/
    │   │   │       └── page.tsx
    │   │   └── guides/
    │   │       ├── layout.tsx
    │   │       ├── page.tsx
    │   │       └── [...slug]/
    │   │           └── page.tsx
    │   ├── (editor)/
    │   │   └── editor/
    │   │       ├── layout.tsx
    │   │       └── [postId]/
    │   │           ├── loading.tsx
    │   │           ├── not-found.tsx
    │   │           └── page.tsx
    │   ├── (marketing)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── [...slug]/
    │   │   │   └── page.tsx
    │   │   ├── blog/
    │   │   │   ├── page.tsx
    │   │   │   └── [...slug]/
    │   │   │       └── page.tsx
    │   │   └── pricing/
    │   │       └── page.tsx
    │   └── api/
    │       ├── auth/
    │       │   └── [...nextauth]/
    │       │       └── _route.ts
    │       ├── og/
    │       │   └── route.tsx
    │       ├── posts/
    │       │   ├── route.ts
    │       │   └── [postId]/
    │       │       └── route.ts
    │       ├── users/
    │       │   ├── [userId]/
    │       │   │   └── route.ts
    │       │   └── stripe/
    │       │       └── route.ts
    │       └── webhooks/
    │           └── stripe/
    │               └── route.ts
    ├── assets/
    │   └── fonts/
    │       └── CalSans-SemiBold.woff2
    ├── components/
    │   ├── analytics.tsx
    │   ├── billing-form.tsx
    │   ├── callout.tsx
    │   ├── card-skeleton.tsx
    │   ├── editor.tsx
    │   ├── empty-placeholder.tsx
    │   ├── header.tsx
    │   ├── icons.tsx
    │   ├── main-nav.tsx
    │   ├── mdx-card.tsx
    │   ├── mdx-components.tsx
    │   ├── mobile-nav.tsx
    │   ├── mode-toggle.tsx
    │   ├── nav.tsx
    │   ├── page-header.tsx
    │   ├── pager.tsx
    │   ├── post-create-button.tsx
    │   ├── post-item.tsx
    │   ├── post-operations.tsx
    │   ├── search.tsx
    │   ├── shell.tsx
    │   ├── sidebar-nav.tsx
    │   ├── site-footer.tsx
    │   ├── tailwind-indicator.tsx
    │   ├── theme-provider.tsx
    │   ├── toc.tsx
    │   ├── user-account-nav.tsx
    │   ├── user-auth-form.tsx
    │   ├── user-avatar.tsx
    │   ├── user-name-form.tsx
    │   └── ui/
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── hover-card.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── switch.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── toggle.tsx
    │       ├── tooltip.tsx
    │       └── use-toast.ts
    ├── config/
    │   ├── dashboard.ts
    │   ├── docs.ts
    │   ├── marketing.ts
    │   ├── site.ts
    │   └── subscriptions.ts
    ├── content/
    │   ├── authors/
    │   │   └── shadcn.mdx
    │   ├── blog/
    │   │   ├── deploying-next-apps.mdx
    │   │   ├── dynamic-routing-static-regeneration.mdx
    │   │   ├── preview-mode-headless-cms.mdx
    │   │   └── server-client-components.mdx
    │   ├── docs/
    │   │   ├── in-progress.mdx
    │   │   ├── index.mdx
    │   │   └── documentation/
    │   │       ├── code-blocks.mdx
    │   │       ├── components.mdx
    │   │       ├── index.mdx
    │   │       └── style-guide.mdx
    │   ├── guides/
    │   │   ├── build-blog-using-contentlayer-mdx.mdx
    │   │   └── using-next-auth-next-13.mdx
    │   └── pages/
    │       ├── privacy.mdx
    │       └── terms.mdx
    ├── hooks/
    │   ├── use-lock-body.ts
    │   └── use-mounted.ts
    ├── lib/
    │   ├── auth.ts
    │   ├── db.ts
    │   ├── exceptions.ts
    │   ├── session.ts
    │   ├── stripe.ts
    │   ├── subscription.ts
    │   ├── toc.ts
    │   ├── utils.ts
    │   └── validations/
    │       ├── auth.ts
    │       ├── og.ts
    │       ├── post.ts
    │       └── user.ts
    ├── pages/
    │   └── api/
    │       └── auth/
    │           └── [...nextauth].ts
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    │       ├── migration_lock.toml
    │       ├── 20221021182747_init/
    │       │   └── migration.sql
    │       └── 20221118173244_add_stripe_columns/
    │           └── migration.sql
    ├── public/
    │   └── site.webmanifest
    ├── styles/
    │   ├── editor.css
    │   ├── globals.css
    │   └── mdx.css
    ├── types/
    │   ├── index.d.ts
    │   └── next-auth.d.ts
    └── .husky/
        ├── commit-msg
        └── pre-commit

================================================
FILE: README.md
================================================
# Taxonomy

An open source application built using the new router, server components and everything new in Next.js 13.

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@shadcn](https://twitter.com/shadcn).
> See the roadmap below.

## About this project

This project as an experiment to see how a modern app (with features like authentication, subscriptions, API routes, static pages for docs ...etc) would work in Next.js 13 and server components.

**This is not a starter template.**

A few people have asked me to turn this into a starter. I think we could do that once the new features are out of beta.

## Note on Performance

> **Warning**
> This app is using the unstable releases for Next.js 13 and React 18. The new router and app dir is still in beta and not production-ready.
> **Expect some performance hits when testing the dashboard**.
> If you see something broken, you can ping me [@shadcn](https://twitter.com/shadcn).

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Route handlers
- Metadata files
- Server and Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- UI Components built using **Radix UI**
- Documentation and blog using **MDX** and **Contentlayer**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Add MDX support for basic pages~
- [x] ~Build marketing pages~
- [x] ~Subscriptions using Stripe~
- [x] ~Responsive styles~
- [x] ~Add OG image for blog using @vercel/og~
- [x] Dark mode

## Known Issues

A list of things not working right now:

1. ~GitHub authentication (use email)~
2. ~[Prisma: Error: ENOENT: no such file or directory, open '/var/task/.next/server/chunks/schema.prisma'](https://github.com/prisma/prisma/issues/16117)~
3. ~[Next.js 13: Client side navigation does not update head](https://github.com/vercel/next.js/issues/42414)~
4. [Cannot use opengraph-image.tsx inside catch-all routes](https://github.com/vercel/next.js/issues/48162)

## Why not tRPC, Turborepo or X?

I might add this later. For now, I want to see how far we can get using Next.js only.

If you have some suggestions, feel free to create an issue.

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```

## License

Licensed under the [MIT license](https://github.com/shadcn/taxonomy/blob/main/LICENSE.md).



================================================
FILE: contentlayer.config.js
================================================
import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}))

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: `guides/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    avatar: {
      type: "string",
      required: true,
    },
    twitter: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}))

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Page, Doc, Guide, Post, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})



================================================
FILE: env.mjs
================================================
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
    POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_FROM: process.env.SMTP_FROM,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})



================================================
FILE: LICENSE.md
================================================
MIT License

Copyright (c) 2022 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: middleware.ts
================================================
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
}



================================================
FILE: next.config.mjs
================================================
import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
}

export default withContentlayer(nextConfig)



================================================
FILE: package.json
================================================
{
  "name": "taxonomy",
  "version": "0.2.0",
  "private": true,
  "author": {
    "name": "shadcn",
    "url": "https://twitter.com/shadcn"
  },
  "scripts": {
    "dev": "concurrently \"contentlayer dev\" \"next dev\"",
    "build": "contentlayer build && next build",
    "turbo": "next dev --turbo",
    "start": "next start",
    "lint": "next lint",
    "preview": "next build && next start",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@editorjs/code": "^2.8.0",
    "@editorjs/editorjs": "^2.26.5",
    "@editorjs/embed": "^2.5.3",
    "@editorjs/header": "^2.7.0",
    "@editorjs/inline-code": "^1.4.0",
    "@editorjs/link": "^2.5.0",
    "@editorjs/list": "^1.8.0",
    "@editorjs/paragraph": "^2.9.0",
    "@editorjs/table": "^2.2.1",
    "@hookform/resolvers": "^3.1.0",
    "@next-auth/prisma-adapter": "^1.0.6",
    "@prisma/client": "^4.13.0",
    "@radix-ui/react-accessible-icon": "^1.0.2",
    "@radix-ui/react-accordion": "^1.1.1",
    "@radix-ui/react-alert-dialog": "^1.0.3",
    "@radix-ui/react-aspect-ratio": "^1.0.2",
    "@radix-ui/react-avatar": "^1.0.2",
    "@radix-ui/react-checkbox": "^1.0.3",
    "@radix-ui/react-collapsible": "^1.0.2",
    "@radix-ui/react-context-menu": "^2.1.3",
    "@radix-ui/react-dialog": "^1.0.3",
    "@radix-ui/react-dropdown-menu": "^2.0.4",
    "@radix-ui/react-hover-card": "^1.0.5",
    "@radix-ui/react-label": "^2.0.1",
    "@radix-ui/react-menubar": "^1.0.2",
    "@radix-ui/react-navigation-menu": "^1.1.2",
    "@radix-ui/react-popover": "^1.0.5",
    "@radix-ui/react-progress": "^1.0.2",
    "@radix-ui/react-radio-group": "^1.1.2",
    "@radix-ui/react-scroll-area": "^1.0.3",
    "@radix-ui/react-select": "^1.2.1",
    "@radix-ui/react-separator": "^1.0.2",
    "@radix-ui/react-slider": "^1.1.1",
    "@radix-ui/react-slot": "^1.0.1",
    "@radix-ui/react-switch": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.3",
    "@radix-ui/react-toast": "^1.1.3",
    "@radix-ui/react-toggle": "^1.0.2",
    "@radix-ui/react-toggle-group": "^1.0.3",
    "@radix-ui/react-tooltip": "^1.0.5",
    "@t3-oss/env-nextjs": "^0.2.2",
    "@typescript-eslint/parser": "^5.59.0",
    "@vercel/analytics": "^1.0.0",
    "@vercel/og": "^0.0.21",
    "class-variance-authority": "^0.4.0",
    "clsx": "^1.2.1",
    "cmdk": "^0.1.22",
    "concurrently": "^8.0.1",
    "contentlayer": "^0.3.1",
    "date-fns": "^2.29.3",
    "lucide-react": "^0.92.0",
    "next": "13.3.2-canary.13",
    "next-auth": "4.22.1",
    "next-contentlayer": "^0.3.1",
    "next-themes": "^0.2.1",
    "nodemailer": "^6.9.1",
    "postmark": "^3.0.15",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-day-picker": "^8.7.1",
    "react-dom": "^18.2.0",
    "react-editor-js": "^2.1.0",
    "react-hook-form": "^7.43.9",
    "react-textarea-autosize": "^8.4.1",
    "sharp": "^0.31.3",
    "shiki": "^0.11.1",
    "stripe": "^11.18.0",
    "tailwind-merge": "^1.12.0",
    "tailwindcss-animate": "^1.0.5",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "@commitlint/cli": "^17.6.1",
    "@commitlint/config-conventional": "^17.6.1",
    "@ianvs/prettier-plugin-sort-imports": "^3.7.2",
    "@tailwindcss/line-clamp": "^0.4.4",
    "@tailwindcss/typography": "^0.5.9",
    "@types/node": "^18.16.0",
    "@types/react": "18.0.15",
    "@types/react-dom": "18.0.6",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.39.0",
    "eslint-config-next": "13.0.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-tailwindcss": "^3.11.0",
    "husky": "^8.0.3",
    "mdast-util-toc": "^6.1.1",
    "postcss": "^8.4.23",
    "prettier": "^2.8.8",
    "prettier-plugin-tailwindcss": "^0.1.13",
    "pretty-quick": "^3.1.3",
    "prisma": "^4.13.0",
    "rehype": "^12.0.1",
    "rehype-autolink-headings": "^6.1.1",
    "rehype-pretty-code": "^0.9.5",
    "rehype-slug": "^5.1.0",
    "remark": "^14.0.2",
    "remark-gfm": "^3.0.1",
    "tailwindcss": "^3.3.1",
    "typescript": "4.7.4",
    "unist-util-visit": "^4.1.2"
  }
}



================================================
FILE: postcss.config.js
================================================
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}



================================================
FILE: prettier.config.js
================================================
/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}



================================================
FILE: tailwind.config.js
================================================
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "contentlayer/generated": ["./.contentlayer/generated"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ],
    "strictNullChecks": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".contentlayer/generated"
  ],
  "exclude": ["node_modules"]
}



================================================
FILE: .commitlintrc.json
================================================
{
  "extends": ["@commitlint/config-conventional"]
}



================================================
FILE: .editorconfig
================================================
# editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true



================================================
FILE: .env.example
================================================
# -----------------------------------------------------------------------------
# App
# -----------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# Authentication (NextAuth.js)
# -----------------------------------------------------------------------------
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_ACCESS_TOKEN=

# -----------------------------------------------------------------------------
# Database (MySQL - PlanetScale)
# -----------------------------------------------------------------------------
DATABASE_URL="mysql://root:root@localhost:3306/taxonomy?schema=public"

# -----------------------------------------------------------------------------
# Email (Postmark)
# -----------------------------------------------------------------------------
SMTP_FROM=
POSTMARK_API_TOKEN=
POSTMARK_SIGN_IN_TEMPLATE=
POSTMARK_ACTIVATION_TEMPLATE=

# -----------------------------------------------------------------------------
# Subscriptions (Stripe)
# -----------------------------------------------------------------------------
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_MONTHLY_PLAN_ID=


================================================
FILE: .eslintrc.json
================================================
{
  "$schema": "https://json.schemastore.org/eslintrc",
  "root": true,
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": ["tailwindcss"],
  "rules": {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error"
  },
  "settings": {
    "tailwindcss": {
      "callees": ["cn"],
      "config": "tailwind.config.js"
    },
    "next": {
      "rootDir": true
    }
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser"
    }
  ]
}



================================================
FILE: .nvmrc
================================================
v16.18.0



================================================
FILE: .prettierignore
================================================
dist
node_modules
.next
build
.contentlayer


================================================
FILE: app/layout.tsx
================================================
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}



================================================
FILE: app/robots.ts
================================================
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  }
}



================================================
FILE: app/(auth)/layout.tsx
================================================
interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen">{children}</div>
}



================================================
FILE: app/(auth)/login/page.tsx
================================================
import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}



================================================
FILE: app/(auth)/register/page.tsx
================================================
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}



================================================
FILE: app/(dashboard)/dashboard/layout.tsx
================================================
import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}



================================================
FILE: app/(dashboard)/dashboard/loading.tsx
================================================
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  )
}



================================================
FILE: app/(dashboard)/dashboard/page.tsx
================================================
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}



================================================
FILE: app/(dashboard)/dashboard/billing/loading.tsx
================================================
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}



================================================
FILE: app/(dashboard)/dashboard/billing/page.tsx
================================================
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BillingForm } from "@/components/billing-form"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </DashboardShell>
  )
}



================================================
FILE: app/(dashboard)/dashboard/settings/loading.tsx
================================================
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}



================================================
FILE: app/(dashboard)/dashboard/settings/page.tsx
================================================
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  )
}



================================================
FILE: app/(docs)/layout.tsx
================================================
import Link from "next/link"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { DocsSearch } from "@/components/search"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/site-footer"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <DocsSearch />
            </div>
            <nav className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}



================================================
FILE: app/(docs)/docs/layout.tsx
================================================
import { docsConfig } from "@/config/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>
      {children}
    </div>
  )
}



================================================
FILE: app/(docs)/docs/[[...slug]]/page.tsx
================================================
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { absoluteUrl } from "@/lib/utils"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams(params) {
  const slug = params.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    null
  }

  return doc
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params)

  if (!doc) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", doc.description ?? doc.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params)

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}



================================================
FILE: app/(docs)/guides/layout.tsx
================================================
interface GuidesLayoutProps {
  children: React.ReactNode
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return <div className="mx-auto max-w-5xl">{children}</div>
}



================================================
FILE: app/(docs)/guides/page.tsx
================================================
import Link from "next/link"
import { allGuides } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { DocsPageHeader } from "@/components/page-header"

export const metadata = {
  title: "Guides",
  description:
    "This section includes end-to-end guides for developing Next.js 13 apps.",
}

export default function GuidesPage() {
  const guides = allGuides
    .filter((guide) => guide.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="py-6 lg:py-10">
      <DocsPageHeader
        heading="Guides"
        text="This section includes end-to-end guides for developing Next.js 13 apps."
      />
      {guides?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {guides.map((guide) => (
            <article
              key={guide._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              {guide.featured && (
                <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
                  Featured
                </span>
              )}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {guide.title}
                  </h2>
                  {guide.description && (
                    <p className="text-muted-foreground">{guide.description}</p>
                  )}
                </div>
                {guide.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(guide.date)}
                  </p>
                )}
              </div>
              <Link href={guide.slug} className="absolute inset-0">
                <span className="sr-only">View</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No guides published.</p>
      )}
    </div>
  )
}



================================================
FILE: app/(docs)/guides/[...slug]/page.tsx
================================================
import Link from "next/link"
import { notFound } from "next/navigation"
import { allGuides } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Icons } from "@/components/icons"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { absoluteUrl, cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface GuidePageProps {
  params: {
    slug: string[]
  }
}

async function getGuideFromParams(params) {
  const slug = params?.slug?.join("/")
  const guide = allGuides.find((guide) => guide.slugAsParams === slug)

  if (!guide) {
    null
  }

  return guide
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const guide = await getGuideFromParams(params)

  if (!guide) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", guide.title)
  ogUrl.searchParams.set("type", "Guide")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: absoluteUrl(guide.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  GuidePageProps["params"][]
> {
  return allGuides.map((guide) => ({
    slug: guide.slugAsParams.split("/"),
  }))
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideFromParams(params)

  if (!guide) {
    notFound()
  }

  const toc = await getTableOfContents(guide.body.raw)

  return (
    <main className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
      <div>
        <DocsPageHeader heading={guide.title} text={guide.description} />
        <Mdx code={guide.body.code} />
        <hr className="my-4" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/guides"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            See all guides
          </Link>
        </div>
      </div>
      <div className="hidden text-sm lg:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}



================================================
FILE: app/(editor)/editor/layout.tsx
================================================
interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  )
}



================================================
FILE: app/(editor)/editor/[postId]/loading.tsx
================================================
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-[38px] w-[90px]" />
        <Skeleton className="h-[38px] w-[80px]" />
      </div>
      <div className="mx-auto w-[800px] space-y-6">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[20px] w-2/3" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>
    </div>
  )
}



================================================
FILE: app/(editor)/editor/[postId]/not-found.tsx
================================================
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        This post cound not be found. Please try again.
      </EmptyPlaceholder.Description>
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        Go to Dashboard
      </Link>
    </EmptyPlaceholder>
  )
}



================================================
FILE: app/(editor)/editor/[postId]/page.tsx
================================================
import { notFound, redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  )
}



================================================
FILE: app/(marketing)/layout.tsx
================================================
import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}



================================================
FILE: app/(marketing)/page.tsx
================================================
import Link from "next/link"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/shadcn/taxonomy",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An example app built using Next.js 13 server components.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Next.js 13</h3>
                <p className="text-sm text-muted-foreground">
                  App dir, Routing, Layouts, Loading UI and API routes.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">React 18</h3>
                <p className="text-sm">
                  Server and Client Components. Use hook.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87a11.981 11.981 0 0 1-1.935-1.099L14.99 12H12l-8.485 8.485A11.962 11.962 0 0 1 0 12Zm12.004 12L24 12.004C23.998 18.628 18.628 23.998 12.004 24Z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Database</h3>
                <p className="text-sm text-muted-foreground">
                  ORM using Prisma and deployed on PlanetScale.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Components</h3>
                <p className="text-sm text-muted-foreground">
                  UI components built using Radix UI and styled with Tailwind
                  CSS.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-12 w-12 fill-current"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Authentication using NextAuth.js and middlewares.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy also includes a blog and a full-featured documentation site
            built using Contentlayer and MDX.
          </p>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
          {stars && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {stars} stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}



================================================
FILE: app/(marketing)/[...slug]/page.tsx
================================================
import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", page.title)
  ogUrl.searchParams.set("type", siteConfig.name)
  ogUrl.searchParams.set("mode", "light")

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx code={page.body.code} />
    </article>
  )
}



================================================
FILE: app/(marketing)/blog/page.tsx
================================================
import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}



================================================
FILE: app/(marketing)/blog/[...slug]/page.tsx
================================================
import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { env } from "@/env.mjs"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  )
}



================================================
FILE: app/(marketing)/pricing/page.tsx
================================================
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features including unlimited posts for your blog.
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the PRO plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Unlimited Posts
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Unlimited Users
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Custom domain
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Dashboard Analytics
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Access to Discord
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Premium Support
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">$19</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          Taxonomy is a demo app.{" "}
          <strong>You can test the upgrade and won&apos;t be charged.</strong>
        </p>
      </div>
    </section>
  )
}



================================================
FILE: app/api/auth/[...nextauth]/_route.ts
================================================
import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



================================================
FILE: app/api/og/route.tsx
================================================
import { ImageResponse } from "@vercel/og"

import { ogImageSchema } from "@/lib/validations/og"

export const runtime = "edge"

const interRegular = fetch(
  new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const interBold = fetch(
  new URL("../../../assets/fonts/CalSans-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    const fontRegular = await interRegular
    const fontBold = await interBold

    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading

    const { mode } = values
    const paint = mode === "dark" ? "#fff" : "#000"

    const fontSize = heading.length > 100 ? "70px" : "100px"

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #000 0%, #111 100%)"
                : "white",
          }}
        >
          <svg width="212" height="50" viewBox="0 0 212 50" fill="none">
            <g clip-path="url(#a)" fill={paint}>
              <path d="M99.715 9.784h26.128v4.823h-10.365v25.37h-5.182v-25.37h-10.58V9.784ZM56.746 9.784v4.823H35.803v7.757h16.842v4.823H35.803v7.967h20.943v4.823H30.62v-25.37h-.002V9.784h26.128ZM69.792 9.797H63.01l24.292 30.192h6.801L81.956 24.903 94.084 9.82l-6.782.01-8.742 10.856-8.768-10.89ZM76.751 31.363l-3.396-4.222L62.99 40.012h6.802l6.96-8.649Z" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.802 39.977 6.478 9.77H0v30.193h5.182V16.225l19.11 23.752h6.51Z"
              />
              <path d="M127.008 39.792c-.38 0-.703-.131-.973-.394a1.267 1.267 0 0 1-.4-.959c-.004-.366.13-.681.4-.944.27-.263.593-.395.973-.395.365 0 .684.132.955.395.274.263.41.578.414.944-.004.25-.067.478-.193.682-.13.208-.295.37-.502.488a1.298 1.298 0 0 1-.674.183ZM135.853 27.073h2.296v8.847c-.003.814-.179 1.51-.523 2.094a3.477 3.477 0 0 1-1.447 1.346c-.614.311-1.334.47-2.152.47-.748 0-1.419-.135-2.016-.398a3.239 3.239 0 0 1-1.418-1.176c-.352-.519-.524-1.166-.524-1.941h2.301c.003.339.08.633.228.879.147.245.351.432.611.564.263.131.565.197.905.197.369 0 .685-.076.942-.232.256-.152.453-.38.59-.685.133-.301.203-.675.207-1.118v-8.847ZM147.598 30.533a1.67 1.67 0 0 0-.73-1.252c-.432-.301-.99-.45-1.675-.45-.481 0-.895.073-1.239.214-.345.146-.611.34-.794.585a1.423 1.423 0 0 0-.281.84c0 .264.063.492.186.683.123.193.288.356.502.487.211.135.446.246.703.336.259.09.519.166.779.228l1.197.294c.481.111.949.26 1.394.45.446.187.85.426 1.205.713.354.287.635.633.842 1.038.208.405.313.879.313 1.426 0 .737-.19 1.384-.573 1.944-.382.557-.933.993-1.657 1.308-.72.312-1.59.47-2.616.47-.99 0-1.854-.151-2.581-.456-.73-.301-1.299-.744-1.71-1.325-.41-.582-.632-1.29-.663-2.125h2.275c.032.436.172.8.411 1.094.242.29.558.505.945.65.389.142.825.215 1.306.215.502 0 .944-.076 1.327-.225.379-.149.678-.357.892-.626.218-.267.327-.582.33-.942-.003-.328-.102-.602-.292-.816-.193-.215-.459-.395-.8-.54a8.25 8.25 0 0 0-1.201-.39l-1.454-.368c-1.05-.266-1.882-.671-2.489-1.214-.611-.543-.913-1.263-.913-2.166 0-.74.203-1.391.615-1.948.407-.557.965-.99 1.671-1.298.709-.311 1.51-.463 2.401-.463.906 0 1.7.152 2.385.463.684.308 1.222.737 1.611 1.284a3.25 3.25 0 0 1 .605 1.882h-2.227Z" />
            </g>
            <path
              d="M181.335 14.636V35h-5.528V19.727h-.119l-4.455 2.665v-4.693l5.011-3.063h5.091Zm12.136 20.642c-1.604 0-3.029-.275-4.276-.825-1.239-.557-2.214-1.322-2.923-2.297-.709-.974-1.067-2.094-1.074-3.36h5.568c.007.39.126.742.358 1.053.239.305.564.544.975.716.411.173.881.259 1.412.259.51 0 .961-.09 1.352-.269.391-.185.696-.44.915-.765.218-.325.325-.696.318-1.114a1.637 1.637 0 0 0-.378-1.094c-.252-.318-.606-.566-1.064-.745-.457-.18-.984-.269-1.581-.269h-2.068V22.75h2.068c.55 0 1.034-.09 1.452-.268.424-.18.752-.428.984-.746.239-.318.355-.683.348-1.094a1.824 1.824 0 0 0-.288-1.054 2.012 2.012 0 0 0-.835-.716c-.352-.172-.759-.258-1.223-.258-.504 0-.955.09-1.353.268a2.25 2.25 0 0 0-.924.746 1.891 1.891 0 0 0-.348 1.094h-5.29c.007-1.247.348-2.347 1.024-3.302.683-.954 1.617-1.703 2.804-2.247 1.187-.543 2.549-.815 4.087-.815 1.504 0 2.833.255 3.987.766 1.16.51 2.065 1.213 2.714 2.107.657.889.981 1.906.975 3.053.013 1.14-.378 2.075-1.174 2.804-.788.73-1.789 1.16-3.002 1.293v.159c1.644.179 2.88.683 3.708 1.511.829.822 1.237 1.856 1.223 3.102.007 1.194-.351 2.25-1.073 3.172-.716.922-1.714 1.644-2.993 2.168-1.273.524-2.741.785-4.405.785Z"
              fill={paint}
            />
            <rect
              x="163"
              y="1"
              width="48"
              height="48"
              rx="9"
              stroke={paint}
              stroke-width="2"
            />
            <defs>
              <clipPath id="a">
                <path fill={paint} d="M0 9.771h150v30.457H0z" />
              </clipPath>
            </defs>
          </svg>
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              {values.type}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{
                fontFamily: "Cal Sans",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              tx.shadcn.com
            </div>
            <div
              tw="flex items-center text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke={paint}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/shadcn/taxonomy</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Cal Sans",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}



================================================
FILE: app/api/posts/route.ts
================================================
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    if (!subscriptionPlan?.isPro) {
      const count = await db.post.count({
        where: {
          authorId: user.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}



================================================
FILE: app/api/posts/[postId]/route.ts
================================================
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { postPatchSchema } from "@/lib/validations/post"

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the post.
    await db.post.delete({
      where: {
        id: params.postId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = postPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}



================================================
FILE: app/api/users/[userId]/route.ts
================================================
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    // Update the user.
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: payload.name,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}



================================================
FILE: app/api/users/stripe/route.ts
================================================
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { proPlan } from "@/config/subscriptions"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"

const billingUrl = absoluteUrl("/dashboard/billing")

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      return new Response(JSON.stringify({ url: stripeSession.url }))
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}



================================================
FILE: app/api/webhooks/stripe/route.ts
================================================
import { headers } from "next/headers"
import Stripe from "stripe"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await db.user.update({
      where: {
        id: session?.metadata?.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the price id and set the new period end.
    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return new Response(null, { status: 200 })
}



================================================
FILE: assets/fonts/CalSans-SemiBold.woff2
================================================
[Binary file]


================================================
FILE: components/analytics.tsx
================================================
"use client"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

export function Analytics() {
  return <VercelAnalytics />
}



================================================
FILE: components/billing-form.tsx
================================================
"use client"

import * as React from "react"

import { UserSubscriptionPlan } from "types"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe")

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
          </button>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  )
}



================================================
FILE: components/callout.tsx
================================================
import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: "default" | "warning" | "danger"
}

export function Callout({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-red-900 bg-red-50": type === "danger",
        "border-yellow-900 bg-yellow-50": type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}



================================================
FILE: components/card-skeleton.tsx
================================================
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="h-10" />
      <CardFooter>
        <Skeleton className="h-8 w-[120px]" />
      </CardFooter>
    </Card>
  )
}



================================================
FILE: components/editor.tsx
================================================
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"
import { cn } from "@/lib/utils"
import { postPatchSchema } from "@/lib/validations/post"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">
}

type FormData = z.infer<typeof postPatchSchema>

export function Editor({ post }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  })
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = postPatchSchema.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const blocks = await ref.current?.save()

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Your post has been saved.",
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {post.published ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  )
}



================================================
FILE: components/empty-placeholder.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({
  className,
  children,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const Icon = Icons[name]

  if (!Icon) {
    return null
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
      <Icon className={cn("h-10 w-10", className)} {...props} />
    </div>
  )
}

interface EmptyPlacholderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlacholderTitleProps) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  )
}

interface EmptyPlacholderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlacholderDescriptionProps) {
  return (
    <p
      className={cn(
        "mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}



================================================
FILE: components/header.tsx
================================================
interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}



================================================
FILE: components/icons.tsx
================================================
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
}



================================================
FILE: components/main-nav.tsx
================================================
"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}



================================================
FILE: components/mdx-card.tsx
================================================
import Link from "next/link"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  disabled?: boolean
}

export function MdxCard({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
          {children}
        </div>
      </div>
      {href && (
        <Link href={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  )
}



================================================
FILE: components/mdx-components.tsx
================================================
import * as React from "react"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

import { cn } from "@/lib/utils"
import { Callout } from "@/components/callout"
import { MdxCard } from "@/components/mdx-card"

const components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card: MdxCard,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}



================================================
FILE: components/mobile-nav.tsx
================================================
import * as React from "react"
import Link from "next/link"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"
import { Icons } from "@/components/icons"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}



================================================
FILE: components/mode-toggle.tsx
================================================
"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



================================================
FILE: components/nav.tsx
================================================
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}



================================================
FILE: components/page-header.tsx
================================================
import { cn } from "@/lib/utils"

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
}

export function DocsPageHeader({
  heading,
  text,
  className,
  ...props
}: DocsPageHeaderProps) {
  return (
    <>
      <div className={cn("space-y-4", className)} {...props}>
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {heading}
        </h1>
        {text && <p className="text-xl text-muted-foreground">{text}</p>}
      </div>
      <hr className="my-4" />
    </>
  )
}



================================================
FILE: components/pager.tsx
================================================
import Link from "next/link"
import { Doc } from "contentlayer/generated"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface DocsPagerProps {
  doc: Doc
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}

export function flatten(links: { items? }[]) {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link)
  }, [])
}



================================================
FILE: components/post-create-button.tsx
================================================
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 posts reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      })
    }

    const post = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/editor/${post.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  )
}



================================================
FILE: components/post-item.tsx
================================================
import Link from "next/link"
import { Post } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: post.id, title: post.title }} />
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}



================================================
FILE: components/post-operations.tsx
================================================
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

async function deletePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your post was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">
}

export function PostOperations({ post }: PostOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deletePost(post.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}



================================================
FILE: components/search.tsx
================================================
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function DocsSearch({ className, ...props }: DocsSearchProps) {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    return toast({
      title: "Not implemented",
      description: "We're still working on the search.",
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...props}
    >
      <Input
        type="search"
        placeholder="Search documentation..."
        className="h-8 w-full sm:w-64 sm:pr-12"
      />
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  )
}



================================================
FILE: components/shell.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}



================================================
FILE: components/sidebar-nav.tsx
================================================
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-8")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
            {item.title}
          </h4>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex w-full items-center rounded-md p-2 hover:underline",
              {
                "bg-muted": pathname === item.href,
              }
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
          </Link>
        ) : (
          <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null
}



================================================
FILE: components/site-footer.tsx
================================================
import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Illustrations by{" "}
            <a
              href="https://popsy.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Popsy
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}



================================================
FILE: components/tailwind-indicator.tsx
================================================
export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}



================================================
FILE: components/theme-provider.tsx
================================================
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}



================================================
FILE: components/toc.tsx
================================================
"use client"

import * as React from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

interface TocProps {
  toc: TableOfContents
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items) {
    return null
  }

  return mounted ? (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (!id) {
        return
      }

      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return
        }

        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline",
                item.url === `#${activeItem}`
                  ? "font-medium text-primary"
                  : "text-sm text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}



================================================
FILE: components/user-account-nav.tsx
================================================
"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



================================================
FILE: components/user-auth-form.tsx
================================================
"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  )
}



================================================
FILE: components/user-avatar.tsx
================================================
import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}



================================================
FILE: components/user-name-form.tsx
================================================
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
}

type FormData = z.infer<typeof userNameSchema>

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your name has been updated.",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}



================================================
FILE: components/ui/accordion.tsx
================================================
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }



================================================
FILE: components/ui/alert-dialog.tsx
================================================
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = ({
  className,
  children,
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {children}
    </div>
  </AlertDialogPrimitive.Portal>
)
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}



================================================
FILE: components/ui/alert.tsx
================================================
import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }



================================================
FILE: components/ui/aspect-ratio.tsx
================================================
"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }



================================================
FILE: components/ui/avatar.tsx
================================================
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }



================================================
FILE: components/ui/badge.tsx
================================================
import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }



================================================
FILE: components/ui/button.tsx
================================================
import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }



================================================
FILE: components/ui/calendar.tsx
================================================
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }



================================================
FILE: components/ui/card.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



================================================
FILE: components/ui/checkbox.tsx
================================================
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-primary")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }



================================================
FILE: components/ui/collapsible.tsx
================================================
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }



================================================
FILE: components/ui/command.tsx
================================================
"use client"

import * as React from "react"
import { DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "placeholder:text-foreground-muted flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}



================================================
FILE: components/ui/context-menu.tsx
================================================
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-left-1",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}



================================================
FILE: components/ui/dialog.tsx
================================================
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}



================================================
FILE: components/ui/dropdown-menu.tsx
================================================
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "text-on-popover z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}



================================================
FILE: components/ui/hover-card.tsx
================================================
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }



================================================
FILE: components/ui/input.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }



================================================
FILE: components/ui/label.tsx
================================================
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }



================================================
FILE: components/ui/menubar.tsx
================================================
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-top-1",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}



================================================
FILE: components/ui/navigation-menu.tsx
================================================
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}



================================================
FILE: components/ui/popover.tsx
================================================
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }



================================================
FILE: components/ui/progress.tsx
================================================
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }



================================================
FILE: components/ui/radio-group.tsx
================================================
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "h-4 w-4 rounded-full border border-input ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }



================================================
FILE: components/ui/scroll-area.tsx
================================================
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }



================================================
FILE: components/ui/select.tsx
================================================
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        position === "popper" && "translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}



================================================
FILE: components/ui/separator.tsx
================================================
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }



================================================
FILE: components/ui/sheet.tsx
================================================
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const portalVariants = cva("fixed inset-0 z-50 flex", {
  variants: {
    position: {
      top: "items-start",
      bottom: "items-end",
      left: "justify-start",
      right: "justify-end",
    },
  },
  defaultVariants: { position: "right" },
})

interface SheetPortalProps
  extends SheetPrimitive.DialogPortalProps,
    VariantProps<typeof portalVariants> {}

const SheetPortal = ({
  position,
  className,
  children,
  ...props
}: SheetPortalProps) => (
  <SheetPrimitive.Portal className={cn(className)} {...props}>
    <div className={portalVariants({ position })}>{children}</div>
  </SheetPrimitive.Portal>
)
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg border",
  {
    variants: {
      position: {
        top: "animate-in slide-in-from-top w-full duration-300",
        bottom: "animate-in slide-in-from-bottom w-full duration-300",
        left: "animate-in slide-in-from-left h-full duration-300",
        right: "animate-in slide-in-from-right h-full duration-300",
      },
      size: {
        content: "",
        default: "",
        sm: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      {
        position: ["top", "bottom"],
        size: "content",
        class: "max-h-screen",
      },
      {
        position: ["top", "bottom"],
        size: "default",
        class: "h-1/3",
      },
      {
        position: ["top", "bottom"],
        size: "sm",
        class: "h-1/4",
      },
      {
        position: ["top", "bottom"],
        size: "lg",
        class: "h-1/2",
      },
      {
        position: ["top", "bottom"],
        size: "xl",
        class: "h-5/6",
      },
      {
        position: ["top", "bottom"],
        size: "full",
        class: "h-screen",
      },
      {
        position: ["right", "left"],
        size: "content",
        class: "max-w-screen",
      },
      {
        position: ["right", "left"],
        size: "default",
        class: "w-1/3",
      },
      {
        position: ["right", "left"],
        size: "sm",
        class: "w-1/4",
      },
      {
        position: ["right", "left"],
        size: "lg",
        class: "w-1/2",
      },
      {
        position: ["right", "left"],
        size: "xl",
        class: "w-5/6",
      },
      {
        position: ["right", "left"],
        size: "full",
        class: "w-screen",
      },
    ],
    defaultVariants: {
      position: "right",
      size: "default",
    },
  }
)

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  DialogContentProps
>(({ position, size, className, children, ...props }, ref) => (
  <SheetPortal position={position}>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ position, size }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}



================================================
FILE: components/ui/skeleton.tsx
================================================
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }



================================================
FILE: components/ui/slider.tsx
================================================
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }



================================================
FILE: components/ui/switch.tsx
================================================
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }



================================================
FILE: components/ui/tabs.tsx
================================================
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }



================================================
FILE: components/ui/textarea.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }



================================================
FILE: components/ui/toast.tsx
================================================
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
  {
    variants: {
      variant: {
        default: "bg-background border",
        destructive:
          "group destructive border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}



================================================
FILE: components/ui/toaster.tsx
================================================
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}



================================================
FILE: components/ui/toggle.tsx
================================================
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-muted hover:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }



================================================
FILE: components/ui/tooltip.tsx
================================================
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }



================================================
FILE: components/ui/use-toast.ts
================================================
// Inspired by react-hot-toast library
import * as React from "react"

import { ToastActionElement, type ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

interface Toast extends Omit<ToasterToast, "id"> {}

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }



================================================
FILE: config/dashboard.ts
================================================
import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}



================================================
FILE: config/docs.ts
================================================
import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
        },
        {
          title: "Contentlayer",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Components",
          href: "/docs/documentation/components",
        },
        {
          title: "Code Blocks",
          href: "/docs/documentation/code-blocks",
        },
        {
          title: "Style Guide",
          href: "/docs/documentation/style-guide",
        },
        {
          title: "Search",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Blog",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Build your own",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Writing Posts",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Layouts",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Server Components",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Authentication",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Database with Prisma",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "API Routes",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Marketing Site",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
}



================================================
FILE: config/marketing.ts
================================================
import { MarketingConfig } from "types"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
}



================================================
FILE: config/site.ts
================================================
import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
  name: "Taxonomy",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: "https://tx.shadcn.com",
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
}



================================================
FILE: config/subscriptions.ts
================================================
import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited posts.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}



================================================
FILE: content/authors/shadcn.mdx
================================================
---
title: shadcn
avatar: /images/avatars/shadcn.png
twitter: shadcn
---



================================================
FILE: content/blog/deploying-next-apps.mdx
================================================
---
title: Deploying Next.js Apps
description: How to deploy your Next.js apps on Vercel.
image: /images/blog/blog-post-3.jpg
date: "2023-01-02"
authors:
  - shadcn
---

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/blog/dynamic-routing-static-regeneration.mdx
================================================
---
title: Dynamic Routing and Static Regeneration
description: How to use incremental static regeneration using dynamic routes.
image: /images/blog/blog-post-2.jpg
date: "2023-03-04"
authors:
  - shadcn
---

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/blog/preview-mode-headless-cms.mdx
================================================
---
title: Preview Mode for Headless CMS
description: How to implement preview mode in your headless CMS.
date: "2023-04-09"
image: /images/blog/blog-post-1.jpg
authors:
  - shadcn
---

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/blog/server-client-components.mdx
================================================
---
title: Server and Client Components
description: React Server Components allow developers to build applications that span the server and client.
image: /images/blog/blog-post-4.jpg
date: "2023-01-08"
authors:
  - shadcn
---

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/docs/in-progress.mdx
================================================
---
title: Not Implemented
description: This page is in progress.
---

<Callout>

This site is a work in progress. If you see dummy text on a page, it means I'm still working on it. You can follow updates on Twitter [@shadcn](https://twitter.com/shadcn).

</Callout>



================================================
FILE: content/docs/index.mdx
================================================
---
title: Documentation
description: Welcome to the Taxonomy documentation.
---

This is the documentation for the Taxonomy site.

This is an example of a doc site built using [ContentLayer](/docs/documentation/contentlayer) and MDX.

<Callout>

This site is a work in progress. If you see dummy text on a page, it means I'm still working on it. You can follow updates on Twitter [@shadcn](https://twitter.com/shadcn).

</Callout>

## Features

Select a feature below to learn more about it.

<div className="grid sm:grid-cols-2 gap-4 mt-6">

<Card href="/docs/documentation">

### Documentation

This documentation site built using Contentlayer.

</Card>

<Card href="/docs/marketing" disabled>

### Marketing

The marketing site with landing pages.

</Card>

<Card href="/docs/app" disabled>

### App

The dashboard with auth and subscriptions.

</Card>

<Card href="/docs/blog" disabled>

### Blog

The blog built using Contentlayer and MDX.

</Card>

</div>



================================================
FILE: content/docs/documentation/code-blocks.mdx
================================================
---
title: Code Blocks
description: Advanced code blocks with highlighting, file names and more.
---

The code blocks on the documentation site and the blog are powered by [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code). The syntax highlighting is done using [shiki](https://github.com/shikijs/shiki).

It has the following features:

1. Beautiful code blocks with syntax highlighting.
2. Support for VS Code themes.
3. Works with hundreds of languages.
4. Line and word highlighting.
5. Support for line numbers.
6. Show code block titles using meta strings.

<Callout>

Thanks to Shiki, highlighting is done at build time. No JavaScript is sent to the client for runtime highlighting.

</Callout>

## Example

```ts showLineNumbers title="next.config.js" {3} /appDir: true/
import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
}

export default withContentlayer(nextConfig)
```

## Title

````mdx
```ts title="path/to/file.ts"
// Code here
```
````

## Line Highlight

````mdx
```ts {1,3-6}
// Highlight line 1 and line 3 to 6
```
````

## Word Highlight

````mdx
```ts /shadcn/
// Highlight the word shadcn.
```
````

## Line Numbers

````mdx
```ts showLineNumbers
// This will show line numbers.
```
````



================================================
FILE: content/docs/documentation/components.mdx
================================================
---
title: Components
description: Use React components in Markdown using MDX.
---

The following components are available out of the box for use in Markdown.

If you'd like to build and add your own custom components, see the [Custom Components](#custom-components) section below.

## Built-in Components

### 1. Callout

```mdx
<Callout type=" default | warning | danger ">

This is a default callout. You can embed **Markdown** inside a `callout`.

</Callout>
```

<Callout>

This is a default callout. You can embed **Markdown** inside a `callout`.

</Callout>

<Callout type="warning">

This is a warning callout. It uses the props `type="warning"`.

</Callout>

<Callout type="danger">

This is a danger callout. It uses the props `type="danger"`.

</Callout>

### 2. Card

```mdx
<Card href="#">

#### Heading

You can use **markdown** inside cards.

</Card>
```

<Card href="#">

#### Heading

You can use **markdown** inside cards.

</Card>

You can also use HTML to embed cards in a grid.

```mdx
<div className="grid grid-cols-2 gap-4">
  <Card href="#">
    #### Card One 
    You can use **markdown** inside cards.
  </Card>

  <Card href="#">
    #### Card Two 
    You can also use `inline code` and code blocks.
  </Card>
</div>
```

<div className="grid grid-cols-2 gap-4">
  <Card href="#">
    #### Card One 
    You can use **markdown** inside cards.
  </Card>

  <Card href="#">
    #### Card Two 
    You can also use `inline code` and code blocks.
  </Card>
</div>

---

## Custom Components

You can add your own custom components using the `components` props from `useMDXComponent`.

```ts title="components/mdx.tsx" {2,6}
import { Callout } from "@/components/callout"
import { CustomComponent } from "@/components/custom"

const components = {
  Callout,
  CustomComponent,
}

export function Mdx({ code }) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
```

Once you've added your custom component, you can use it in MDX as follows:

```js
<CustomComponent propName="value" />
```

---

## HTML Elements

You can overwrite HTML elements using the same technique above.

```ts {4}
const components = {
  Callout,
  CustomComponent,
  hr: ({ ...props }) => <hr className="my-4 border-slate-200 md:my-6" />,
}
```

This will overwrite the `<hr />` tag or `---` in Mardown with the HTML output above.

---

## Styling

Tailwind CSS classes can be used inside MDX for styling.

```mdx
<p className="text-red-600">This text will be red.</p>
```

Make sure you have configured the path to your content in your `tailwind.config.js` file:

```js title="tailwind.config.js" {6}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
}
```



================================================
FILE: content/docs/documentation/index.mdx
================================================
---
title: Documentation
description: Build your documentation site using Contentlayer and MDX.
---

Taxonomy includes a documentation site built using [Contentlayer](https://contentlayer.dev) and [MDX](http://mdxjs.com).

## Features

It comes with the following features out of the box:

1. Write content using MDX.
2. Transform and validate content using Contentlayer.
3. MDX components such as `<Callout />` and `<Card />`.
4. Support for table of contents.
5. Custom navigation with prev and next pager.
6. Beautiful code blocks using `rehype-pretty-code`.
7. Syntax highlighting using `shiki`.
8. Built-in search (_in progress_).
9. Dark mode (_in progress_).

## How is it built

Click on a section below to learn how the documentation site built.

<div className="grid gap-4 mt-6">

<Card href="/docs/documentation">

### Contentlayer

Learn how to use MDX with Contentlayer.

</Card>

<Card href="/docs/documentation/components">

### Components

Using React components in Mardown.

</Card>

<Card href="/docs/documentation/components">

### Code Blocks

Beautiful code blocks with syntax highlighting.

</Card>

<Card href="/docs/documentation/components">

### Style Guide

View a sample page with all the styles.

</Card>

</div>



================================================
FILE: content/docs/documentation/style-guide.mdx
================================================
---
title: Style Guide
description: Testing the MDX style guide with Tailwind Typography
---

<Callout>

- The text below is from the [Tailwind CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it here to test the markdown styles. **Tailwind is awesome. You should use it.**
- The CSS is from MDX sites I've built through the years. I copied this from [Nextra](https://github.com/shuding/nextra) and tweaked it a bit to fit the styles of this site.

</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/guides/build-blog-using-contentlayer-mdx.mdx
================================================
---
title: Build a blog using ContentLayer and MDX.
description: Learn how to use ContentLayer to build a blog with Next.js
date: 2022-11-18
---

<Callout>

This site is a work in progress. If you see dummy text on a page, it means I'm still working on it. You can follow updates on Twitter [@shadcn](https://twitter.com/shadcn).

</Callout>

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/guides/using-next-auth-next-13.mdx
================================================
---
title: Using NextAuth.js with Next.13
description: How to use NextAuth.js in server components.
date: 2022-11-23
---

<Callout>

This site is a work in progress. If you see dummy text on a page, it means I'm still working on it. You can follow updates on Twitter [@shadcn](https://twitter.com/shadcn).

</Callout>

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.



================================================
FILE: content/pages/privacy.mdx
================================================
---
title: Privacy
description: The Privacy Policy for Taxonomy App.
---

Blandit libero volutpat sed cras ornare arcu. Cursus sit amet dictum sit amet. Nunc vel risus commodo viverra maecenas accumsan. Libero id faucibus nisl tincidunt eget nullam non nisi est. Varius quam quisque id diam vel quam. Id donec ultrices tincidunt arcu non.

## Consent

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat sed cras ornare arcu. Nibh ipsum consequat nisl vel pretium lectus quam id leo. A arcu cursus vitae congue. Amet justo donec enim diam. Vel pharetra vel turpis nunc eget lorem. Gravida quis blandit turpis cursus in. Semper auctor neque vitae tempus. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Imperdiet nulla malesuada pellentesque elit eget.

Felis donec et odio pellentesque diam volutpat commodo sed.

Tortor consequat id porta nibh. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Scelerisque fermentum dui faucibus in. Tortor posuere ac ut consequat semper viverra.

## Information we collect

Amet justo donec enim diam. In hendrerit gravida rutrum quisque non. Hac habitasse platea dictumst quisque sagittis purus sit.

## How we use your Information

Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Consectetur adipiscing elit pellentesque habitant. Ut tristique et egestas quis ipsum suspendisse ultrices gravida.



================================================
FILE: content/pages/terms.mdx
================================================
---
title: Terms & Conditions
description: Read our terms and conditions.
---

Lorem ipsumMagna fermentum iaculis eu non diam. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. In nibh mauris cursus mattis molestie a iaculis at. Enim sit amet venenatis urna. Eget sit amet tellus cras adipiscing.

## Legal Notices

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat sed cras ornare arcu. Nibh ipsum consequat nisl vel pretium lectus quam id leo. A arcu cursus vitae congue. Amet justo donec enim diam. Vel pharetra vel turpis nunc eget lorem. Gravida quis blandit turpis cursus in. Semper auctor neque vitae tempus. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Imperdiet nulla malesuada pellentesque elit eget.

Felis donec et odio pellentesque diam volutpat commodo sed.

Tortor consequat id porta nibh. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Scelerisque fermentum dui faucibus in. Tortor posuere ac ut consequat semper viverra.

## Warranty Disclaimer

Tellus in hac habitasse platea dictumst vestibulum. Faucibus in ornare quam viverra. Viverra aliquet eget sit amet tellus cras adipiscing. Erat nam at lectus urna duis convallis convallis tellus. Bibendum est ultricies integer quis auctor elit sed vulputate.

Nisl condimentum id venenatis a condimentum vitae. Ac auctor augue mauris augue neque gravida in fermentum. Arcu felis bibendum ut tristique. Tempor commodo ullamcorper a lacus vestibulum sed arcu non.

## General

Magna fermentum iaculis eu non diam. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. In nibh mauris cursus mattis molestie a iaculis at. Enim sit amet venenatis urna. Eget sit amet tellus cras adipiscing.

Sed lectus vestibulum mattis ullamcorper velit. Id diam vel quam elementum pulvinar. In iaculis nunc sed augue lacus viverra. In hendrerit gravida rutrum quisque non tellus. Nisl purus in mollis nunc.

## Disclaimer

Amet justo donec enim diam. In hendrerit gravida rutrum quisque non. Hac habitasse platea dictumst quisque sagittis purus sit. Faucibus ornare suspendisse sed nisi lacus. Nulla porttitor massa id neque aliquam vestibulum. Ante in nibh mauris cursus mattis molestie a. Mi tempus imperdiet nulla malesuada.



================================================
FILE: hooks/use-lock-body.ts
================================================
import * as React from "react"

// @see https://usehooks.com/useLockBodyScroll.
export function useLockBody() {
  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}



================================================
FILE: hooks/use-mounted.ts
================================================
import * as React from "react"

export function useMounted() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}



================================================
FILE: lib/auth.ts
================================================
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import { Client } from "postmark"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"

const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        const templateId = user?.emailVerified
          ? env.POSTMARK_SIGN_IN_TEMPLATE
          : env.POSTMARK_ACTIVATION_TEMPLATE
        if (!templateId) {
          throw new Error("Missing template id")
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          To: identifier,
          From: provider.from as string,
          TemplateModel: {
            action_url: url,
            product_name: siteConfig.name,
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: "X-Entity-Ref-ID",
              Value: new Date().getTime() + "",
            },
          ],
        })

        if (result.ErrorCode) {
          throw new Error(result.Message)
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}



================================================
FILE: lib/db.ts
================================================
import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma



================================================
FILE: lib/exceptions.ts
================================================
export class RequiresProPlanError extends Error {
  constructor(message = "This action requires a pro plan") {
    super(message)
  }
}



================================================
FILE: lib/session.ts
================================================
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}



================================================
FILE: lib/stripe.ts
================================================
import Stripe from "stripe"

import { env } from "@/env.mjs"

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
})



================================================
FILE: lib/subscription.ts
================================================
// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { UserSubscriptionPlan } from "types"
import { freePlan, proPlan } from "@/config/subscriptions"
import { db } from "@/lib/db"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}



================================================
FILE: lib/toc.ts
================================================
// @ts-nocheck
// TODO: Fix this when we turn strict mode on.

import { toc } from "mdast-util-toc"
import { remark } from "remark"
import { visit } from "unist-util-visit"

const textTypes = ["text", "emphasis", "strong", "inlineCode"]

function flattenNode(node) {
  const p = []
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })
  return p.join(``)
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node, current): Items {
  if (!node) {
    return {}
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === "text") {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}))

    return current
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

const getToc = () => (node, file) => {
  const table = toc(node)
  file.data = getItems(table.map, {})
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content)

  return result.data
}



================================================
FILE: lib/utils.ts
================================================
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}



================================================
FILE: lib/validations/auth.ts
================================================
import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
})



================================================
FILE: lib/validations/og.ts
================================================
import * as z from "zod"

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  mode: z.enum(["light", "dark"]).default("dark"),
})



================================================
FILE: lib/validations/post.ts
================================================
import * as z from "zod"

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})



================================================
FILE: lib/validations/user.ts
================================================
import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})



================================================
FILE: pages/api/auth/[...nextauth].ts
================================================
import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

// @see ./lib/auth
export default NextAuth(authOptions)



================================================
FILE: prisma/schema.prisma
================================================
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Account {
  id                String   @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?  @db.Text
  access_token      String?  @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?  @db.Text
  session_state     String?
  createdAt         DateTime @default(now()) @map(name: "created_at")
  updatedAt         DateTime @default(now()) @map(name: "updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map(name: "accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map(name: "sessions")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @default(now()) @map(name: "updated_at")

  accounts Account[]
  sessions Session[]
  Post     Post[]

  stripeCustomerId       String?   @unique @map(name: "stripe_customer_id")
  stripeSubscriptionId   String?   @unique @map(name: "stripe_subscription_id")
  stripePriceId          String?   @map(name: "stripe_price_id")
  stripeCurrentPeriodEnd DateTime? @map(name: "stripe_current_period_end")

  @@map(name: "users")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map(name: "verification_tokens")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   Json?
  published Boolean  @default(false)
  createdAt DateTime @default(now()) @map(name: "created_at")
  updatedAt DateTime @default(now()) @map(name: "updated_at")
  authorId  String

  author User @relation(fields: [authorId], references: [id])

  @@map(name: "posts")
}



================================================
FILE: prisma/migrations/migration_lock.toml
================================================
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "mysql"


================================================
FILE: prisma/migrations/20221021182747_init/migration.sql
================================================
-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` JSON NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;



================================================
FILE: prisma/migrations/20221118173244_add_stripe_columns/migration.sql
================================================
/*
  Warnings:

  - A unique constraint covering the columns `[stripe_customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `stripe_current_period_end` DATETIME(3) NULL,
    ADD COLUMN `stripe_customer_id` VARCHAR(191) NULL,
    ADD COLUMN `stripe_price_id` VARCHAR(191) NULL,
    ADD COLUMN `stripe_subscription_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_stripe_customer_id_key` ON `users`(`stripe_customer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_stripe_subscription_id_key` ON `users`(`stripe_subscription_id`);



================================================
FILE: public/site.webmanifest
================================================
{
  "name": "Taxonomy",
  "short_name": "Taxonomy",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}



================================================
FILE: styles/editor.css
================================================
.dark .ce-block--selected .ce-block__content,
.dark .ce-inline-toolbar,
.dark .codex-editor--narrow .ce-toolbox,
.dark .ce-conversion-toolbar,
.dark .ce-settings,
.dark .ce-settings__button,
.dark .ce-toolbar__settings-btn,
.dark .cdx-button,
.dark .ce-popover,
.dark .ce-toolbar__plus:hover {
  background: theme('colors.popover.DEFAULT');
  color: inherit;
	border-color: theme('colors.border');
}

.dark .ce-inline-tool,
.dark .ce-conversion-toolbar__label,
.dark .ce-toolbox__button,
.dark .cdx-settings-button,
.dark .ce-toolbar__plus {
  color: inherit;
}

.dark .ce-popover__item-icon,
.dark .ce-conversion-tool__icon {
	background-color: theme('colors.muted.DEFAULT');
	box-shadow: none;
}

.dark .cdx-search-field {
	border-color: theme('colors.border');
	background: theme('colors.input');
	color: inherit;
}

.dark ::selection {
  background: theme('colors.accent.DEFAULT');
}

.dark .cdx-settings-button:hover,
.dark .ce-settings__button:hover,
.dark .ce-toolbox__button--active,
.dark .ce-toolbox__button:hover,
.dark .cdx-button:hover,
.dark .ce-inline-toolbar__dropdown:hover,
.dark .ce-inline-tool:hover,
.dark .ce-popover__item:hover,
.dark .ce-conversion-tool:hover,
.dark .ce-toolbar__settings-btn:hover {
  background-color:theme('colors.accent.DEFAULT');
  color: theme('colors.accent.foreground');;
}

.dark .cdx-notify--error {
  background: theme('colors.destructive.DEFAULT') !important;
}

.dark .cdx-notify__cross::after,
.dark .cdx-notify__cross::before {
  background: white;
}


================================================
FILE: styles/globals.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}



================================================
FILE: styles/mdx.css
================================================
[data-rehype-pretty-code-fragment] code {
  @apply grid min-w-full break-words rounded-none border-0 bg-transparent p-0 text-sm text-black;
  counter-reset: line;
  box-decoration-break: clone;
}
[data-rehype-pretty-code-fragment] .line {
  @apply px-4 py-1;
}
[data-rehype-pretty-code-fragment] [data-line-numbers] > .line::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 1rem;
  margin-right: 1rem;
  text-align: right;
  color: gray;
}
[data-rehype-pretty-code-fragment] .line--highlighted {
  @apply bg-slate-300 bg-opacity-10;
}
[data-rehype-pretty-code-fragment] .line-highlighted span {
  @apply relative;
}
[data-rehype-pretty-code-fragment] .word--highlighted {
  @apply rounded-md bg-slate-300 bg-opacity-10 p-1;
}
[data-rehype-pretty-code-title] {
  @apply mt-4 py-2 px-4 text-sm font-medium;
}
[data-rehype-pretty-code-title] + pre {
  @apply mt-0;
}



================================================
FILE: types/index.d.ts
================================================
import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }



================================================
FILE: types/next-auth.d.ts
================================================
import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}



================================================
FILE: .husky/commit-msg
================================================
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx commitlint --edit $1



================================================
FILE: .husky/pre-commit
================================================
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx pretty-quick --staged



`````
./tailwind.config.js
```javascript
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Covik Sans", ...fontFamily.sans],
        mono: ["Covik Sans", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```
./types/index.ts
```typescript
import { Icons } from "../components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan & {
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }
```
./app/layout.tsx
```
import { Inter } from "next/font/google"
import localFont from "next/font/local"

import { siteConfig } from "../config/site"
import { cn } from "../lib/utils"
import { Analytics } from "../components/analytics"
import { ThemeProvider } from "../components/theme-provider"
import { TailwindIndicator } from "../components/tailwind-indicator"
import { Toaster } from "../components/ui/toaster"

import "../src/index.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const covikSans = localFont({
  src: [
    {
      path: "../public/assets/fonnts.com-Covik_Sans.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-covik-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            covikSans.variable,
            inter.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@etheca",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
}
```
./app/blog/page.tsx
```
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";

// Import existing components to maintain the design system
import { MainNav } from "../../components/main-nav";
import { SiteFooter } from "../../components/site-footer";
import BlogEntry from "../../src/components/BlogEntry";

export const metadata: Metadata = {
  title: "Blog - Etheca.Watch",
  description: "Latest insights and updates from Etheca.Watch on AI automation and workflow optimization."
};


export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto border-l border-r min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
                <p className="text-lg text-muted-foreground">
                  Latest insights and updates from Etheca.Watch on AI automation and workflow optimization.
                </p>
              </div>
              
              <div className="space-y-12">
                {posts.map((post) => (
                  <BlogEntry 
                    key={post._id}
                    id={post.slugAsParams}
                    title={post.title}
                    date={post.date}
                    author={post.authors[0]}
                    description={post.description || ""}
                    thumbnail={post.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
```
./app/blog/[...slug]/page.tsx
```
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import Link from 'next/link';

// Import existing components
import { MainNav } from "../../../components/main-nav";
import { SiteFooter } from "../../../components/site-footer";
import { Mdx } from "../../../src/components/Mdx";

// Helper function to get post from params
async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Etheca.Watch Blog`,
    description: post.description,
  };
}

// Generate static pages for all posts at build time
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

// The main page component
export default async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto border-l border-r min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <article className="space-y-8">
              <nav className="text-sm">
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to Blog
                </Link>
              </nav>

              <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {post.date && (
                    <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                  {post.authors?.length > 0 && (
                    <span>by {post.authors[0]}</span>
                  )}
                </div>
              </header>

              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-a:text-foreground prose-a:underline prose-strong:font-semibold">
                <Mdx code={post.body.code} />
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
```
./app/(marketing)/layout.tsx
```
import { marketingConfig } from "../../config/marketing"
import { MainNav } from "../../components/main-nav"
import { SiteFooter } from "../../components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 w-full z-40 bg-background border-b">
        <div className="flex h-20 items-center justify-between py-6 px-9">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto border-l border-r">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
```
./app/(marketing)/page.tsx
```
import React from 'react';
import AutomationHero from '../../src/components/AutomationHero';
import InvisibleHandSection from '../../src/components/InvisibleHandSection';
import IntegrationsShowcase from '../../src/components/IntegrationsShowcase';
import WorkflowMappingSection from '../../src/components/WorkflowMappingSection';

export const metadata = {
  title: "Etheca - The End of Manual Data Entry",
  description: "We just observe how you work and then update your system of records accordingly. Focus on your work, not data entry.",
}

export default function HomePage() {
  return (
    <>
      <AutomationHero />
      <InvisibleHandSection />
      <IntegrationsShowcase />
      <WorkflowMappingSection />
    </>
  );
}
```
./config/marketing.ts
```typescript
import { MarketingConfig } from "../types"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Blog",
      href: "/blog",
    },
  ],
}
```
./config/site.ts
```typescript
export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    github: string
  }
  ogImage: string
}

export const siteConfig: SiteConfig = {
  name: "Etheca",
  author: "Etheca",
  description: "The End of Manual Data Entry. We observe how you work and update your system of records accordingly. Focus on your work, not data entry.",
  keywords: [
    "automation", 
    "data entry", 
    "AI", 
    "workflow automation", 
    "productivity",
    "business automation",
    "intelligent automation"
  ],
  url: {
    base: "https://etheca.watch",
    author: "https://etheca.watch",
  },
  links: {
    github: "https://github.com/etheca",
  },
  ogImage: "/og.jpg",
}
```
./content/blog/ai-automation-trends-2025.mdx
```
---
title: "AI Automation Trends Shaping 2025"
date: "2025-08-28"
description: "Explore the cutting-edge AI automation trends that are revolutionizing business workflows and productivity in 2025."
image: "/images/Etheca-logo.png"
authors:
  - "Sarah Chen"
published: true
---

# The AI Automation Revolution Continues

As we advance through 2025, artificial intelligence continues to reshape how businesses approach automation and workflow optimization. Here are the key trends we're seeing in the industry.

## 1. Intelligent Process Discovery

Modern AI systems are becoming increasingly sophisticated at automatically discovering and mapping business processes, identifying optimization opportunities without human intervention.

## 2. Conversational Automation

Natural language interfaces are making automation tools more accessible to non-technical users, democratizing the power of workflow automation across organizations.

## 3. Predictive Workflow Optimization

AI systems are now capable of predicting workflow bottlenecks and automatically adjusting processes to maintain optimal performance.

## The Future is Automated

These trends indicate a future where AI doesn't just execute predefined tasks but actively improves and optimizes business processes in real-time.
```
./content/blog/introducing-etheca-watch.mdx
```
---
title: "Introducing Etheca"
date: "2025-08-30"
description: "Discover how Etheca.Watch's AI-powered automation platform transforms workflow management by eliminating tedious manual data entry tasks."
image: "/images/Etheca-blog.png"
authors:
  - "Etheca Team"
published: true
---

# The Future of Workflow Automation is Here

At Etheca.Watch, we believe that your time is too valuable to waste on manual data entry. That's why we've built an AI-powered platform that observes how you work and automatically updates your systems of record.

## The Problem with Manual Data Entry

Every day, knowledge workers spend countless hours copying information between systems:

- Updating CRM records after client calls
- Transferring project status updates across multiple boards  
- Synchronizing data between communication apps and databases
- Manually logging time and activities

This repetitive work doesn't just waste time—it's error-prone and soul-crushing.

## Our Solution: Invisible Automation

Etheca.Watch introduces a new paradigm: **invisible automation**. Our AI learns your workflow patterns and silently maintains data accuracy across all your tools, without you lifting a finger.

### How It Works

1. **Observe**: Our AI watches how you work across your favorite tools
2. **Learn**: We map your complex workflows and understand your patterns  
3. **Automate**: We prepare updates and changes for your approval
4. **Execute**: You give final approval, and we handle the rest

## Key Benefits

**Focus on What Matters**: Spend your time on high-value work, not data entry
**Perfect Accuracy**: AI-powered automation reduces human error
**Universal Integration**: Works with your existing CRMs, project management tools, and communication apps
**Human Control**: You stay in control with our human-in-the-loop approach

## Getting Started

Ready to end manual data entry forever? Contact us at [hello@etheca.watch](mailto:hello@etheca.watch) to learn more about how Etheca.Watch can transform your workflow.

---

*The end of manual data entry starts here.*
```
./content/blog/productivity-hacks-remote-teams.mdx
````
---
title: Dynamic Routing and Static Regeneration
description: How to use incremental static regeneration using dynamic routes.
image: /images/blog/blog-post-2.jpg
date: "2023-03-04"
authors:
  - shadcn
---

<Callout>
  The text below is from the [Tailwind
  CSS](https://play.tailwindcss.com/uj1vGACRJA?layout=preview) docs. I copied it
  here to test the markdown styles. **Tailwind is awesome. You should use it.**
</Callout>

Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1.  We want everything to look good out of the box.
2.  Really just the first reason, that's the whole point of the plugin.
3.  Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

It's probably important that images look okay here by default as well:

<Image
  src="/images/blog/blog-post-4.jpg"
  width="718"
  height="404"
  alt="Image"
/>

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1.  **Nested lists are rarely a good idea.**
    - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
    - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
    - Nesting tons of folders in your source code is also not helpful.
2.  **Since we need to have more items, here's another one.**
    - I'm not sure if we'll bother styling more than two levels deep.
    - Two is already too much, three is guaranteed to be a bad idea.
    - If you nest four levels deep you belong in prison.
3.  **Two items isn't really a list, three is good though.**
    - Again please don't nest lists if you want people to actually read your content.
    - Nobody wants to look at this.
    - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.

  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.

  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.

## GitHub Flavored Markdown

I've also added support for GitHub Flavored Mardown using `remark-gfm`.

With `remark-gfm`, we get a few extra features in our markdown. Example: autolink literals.

A link like www.example.com or https://example.com would automatically be converted into an `a` tag.

This works for email links too: contact@example.com.
````
./components/analytics.tsx
```
"use client"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

export function Analytics() {
  return <VercelAnalytics />
}
```
./components/icons.tsx
```
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: (props: React.ComponentProps<"img">) => (
    <img 
      src="/images/Etheca-logo.png" 
      alt="Etheca"
      {...props}
    />
  ),
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: HelpCircle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  twitter: Twitter,
  check: Check,
  gitHub: (props: React.ComponentProps<"svg">) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
}
```
./components/main-nav.tsx
```
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "../config/site"
import { cn } from "../lib/utils"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import { MainNavItem } from "../types"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Logo - will be positioned on the left */}
      <Link href="/" className="flex items-center space-x-1">
        <Icons.logo className="h-10 w-10" />
        <span className="inline-block text-3xl -tracking-wider font-medium">{siteConfig.name}</span>
      </Link>
      
      {/* Navigation items and Contact Us - will be positioned on the right */}
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80",
                      pathname === item.href && "text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}

        {/* Mobile Navigation */}
        {items?.length ? (
          <nav className="md:hidden">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground mr-4",
                      item.disabled && "cursor-not-allowed opacity-80",
                      pathname === item.href && "text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}

        <Button asChild variant="default" className="hidden sm:inline-flex">
          <Link href="mailto:hello@etheca.watch">
            Get a custom solution
          </Link>
        </Button>
        
        {/* Mobile Contact Button */}
        <Button asChild variant="default" size="sm" className="sm:hidden">
          <Link href="mailto:hello@etheca.watch">
            Contact
          </Link>
        </Button>
      </div>
    </>
  )
}
```
./components/site-footer.tsx
```
"use client"

import Link from "next/link"

import { HoverBorderGradient } from "./ui/hover-border-gradient"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tighter leading-tight max-w-4xl">
            Breakthroughs are born from the freedom to explore, not from busywork.
          </h2>
          
          <HoverBorderGradient
            as="button"
            onClick={() => window.open('mailto:hello@etheca.watch', '_blank')}
            className="bg-background text-foreground flex items-center justify-center"
            containerClassName="rounded-lg"
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Enter the Waitlist
          </HoverBorderGradient>
          
          <div className="flex flex-col items-center space-y-2 text-sm text-background/80">
            <p>© 2025 Etheca</p>
            <p>
              Art by{" "}
              <Link 
                href="https://danallison.info/drawings/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-background transition-colors"
              >
                Dan Allison
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
```
./components/tailwind-indicator.tsx
```
export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
```
./components/theme-provider.tsx
```
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```
./components/ui/button.tsx
```
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```
./components/ui/hover-border-gradient.tsx
```
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 4,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getGradientFromRotation = (deg: number): string => {
    const normalizedDeg = ((deg % 360) + 360) % 360;
    const x = 50 + 50 * Math.cos((normalizedDeg - 90) * Math.PI / 180);
    const y = 50 + 50 * Math.sin((normalizedDeg - 90) * Math.PI / 180);
    return `radial-gradient(20% 40% at ${x}% ${y}%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)`;
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #576c9d 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const startTime = Date.now();
      const startRotation = rotation;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed / (duration * 1000)) % 1;
        const newRotation = startRotation + (clockwise ? 360 : -360) * progress;
        setRotation(newRotation);
        
        intervalRef.current = setTimeout(animate, 16);
      };
      
      intervalRef.current = setTimeout(animate, 16);
      
      return () => {
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-hidden p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn("w-auto z-10 bg-transparent px-4 py-2 rounded-[inherit]", className)}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          overflow: "hidden",
          clipPath: "inherit",
        }}
        animate={{
          background: hovered
            ? highlight
            : getGradientFromRotation(rotation),
        }}
        transition={{ ease: "linear", duration: hovered ? 0.2 : 0 }}
      />
      <div className="bg-background absolute z-1 flex-none inset-[2px] rounded-[inherit]" />
    </Tag>
  );
}
```
./components/ui/toast.tsx
```
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```
./components/ui/toaster.tsx
```
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```
./components/ui/use-toast.ts
```typescript
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "./toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```
./public/favicon/site.webmanifest
```
{
  "name": "Etheca",
  "short_name": "Etheca",
  "description": "The end of manual data entry",
  "icons": [
    {
      "src": "/favicon/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#44547e",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```
./lib/utils.ts
```typescript
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`
}
```
./contextfiles/blogimplentation.md
```
**Objective:**
To design and specify the backend architecture and data-handling logic for a content system within the existing Next.js application. The system will read, parse, and process local Markdown files, making the resulting data available to the front-end for rendering. The front-end implementation will be handled separately.

---

### Step 1: Architectural Design

This outlines the fundamental structure of our content system.

1.  **Content Source Directory:**
    * A new directory named `_posts` will be created at the absolute root of the project.
    * This directory will serve as the **single source of truth** for all Markdown (`.md`) content. It is completely decoupled from the `pages` or `src` directories, establishing a clear separation between content and application code.

2.  **Data Processing Layer:**
    * A new directory named `lib` will be created at the project root. This directory is conventionally used in Next.js for server-side utility modules and helper functions.
    * Inside `lib`, a new file named `contentService.js` will be created. This module will encapsulate all logic related to accessing the file system, reading the Markdown files, and processing their content. It will act as the sole interface between the content in `_posts` and the rest of the application.

---

### Step 2: Backend Dependencies

To enable the data processing, the following Node.js packages must be installed as project dependencies:

* **`gray-matter`**: This library is essential for parsing the Markdown files. Its specific role is to separate the YAML front-matter (the metadata block at the top of the file containing key-value pairs like `title` and `date`) from the main Markdown body.
* **`remark`** and **`remark-html`**: These two libraries work in tandem as a robust Markdown processor. `remark` parses the Markdown syntax into an abstract syntax tree, and `remark-html` converts that tree into a final HTML string. This is a critical step for making the content renderable in a browser.

---

### Step 3: Core API Specification for `lib/contentService.js`

This module should be designed to expose a clean, simple API for the Next.js data-fetching methods (`getStaticProps` and `getStaticPaths`) to consume. It should contain the following three core functions:

1.  **`getSortedContentSummaries()`**
    * **Purpose:** To fetch an array of all content items, containing metadata only, and sorted by date. This is optimized for creating list or index pages without needing to process the full content of every file.
    * **Logic:**
        * Access the file system and get a list of all filenames within the `_posts` directory.
        * Iterate over each filename. For each one, read the file's contents and use `gray-matter` to parse its front-matter metadata.
        * Create an object for each file containing a unique `id` (derived from the filename) and the extracted metadata object.
        * Collect these objects into a single array and sort it in descending order based on the `date` property from the metadata.
        * Return the final sorted array.

2.  **`getAllContentIds()`**
    * **Purpose:** To generate a list of all possible URL parameters (`id`s) that can be used for creating dynamic pages. This function is specifically required by Next.js's `getStaticPaths`.
    * **Logic:**
        * Read all filenames from the `_posts` directory.
        * Transform this list into the specific array structure that Next.js expects: `[{ params: { id: '...' } }, ...]`. The `id` value for each should be the filename minus the `.md` extension.
        * Return this formatted array.

3.  **`getContentData(id)`**
    * **Purpose:** To retrieve the complete data for a single, specific piece of content, including the processed HTML body.
    * **Logic:**
        * The function will accept a single `id` string as an argument.
        * It will construct the full path to the target file within the `_posts` directory.
        * It will read the file's contents and use `gray-matter` to parse both the metadata and the main Markdown content body.
        * It will then take the raw Markdown body and pass it through the `remark` and `remark-html` processor to convert it into a safe, renderable HTML string.
        * Finally, it will return a single object containing the `id`, the metadata, and the generated `contentHtml`.
```
./contextfiles/blogmigration.md
```
# Blog Migration Plan

## What We Are Doing

We are initiating a prompt-driven implementation to refactor the blog architecture of the etheca.watch project. This process involves migrating the blog from its current foundation (Next.js Pages Router and a custom gray-matter/remark content service) to a more modern architecture based on the shadcn/taxonomy repository.

The implementation will follow the step-by-step plan outlined in the claude.md file. Each phase, from installing new dependencies to writing the code for the new pages and components, will be executed through a series of prompts and responses.

## The Objective

The primary objective is to modernize the blog's technical foundation to improve maintainability, developer experience, and alignment with current Next.js best practices.

### The key goals are:

- **Adopt a Type-Safe Content Layer**: Replace the manual markdown parsing with Contentlayer. This will provide a robust, type-safe data layer for all MDX content, making it easier to manage and query blog posts.

- **Transition to the App Router**: Migrate the blog's routing from the Next.js Pages Router to the App Router (/app directory). This aligns the project with the latest Next.js features, including improved layouts, Server Components, and data fetching patterns.

- **Preserve Design Integrity**: A critical constraint is to perform this architectural upgrade while ensuring the final implementation seamlessly integrates with the existing, custom etheca.watch design system. The unique visual identity, styling, and CSS architecture will be preserved.
```
./contextfiles/design.md
```
# Core Visual Design Principles

This document outlines the fundamental visual design rules I must adhere to when developing, analyzing, or providing feedback on user interfaces. Each rule is a non-negotiable principle for creating coherent, accessible, and professional designs.

---

## Colors and Contrast

### **1. Use Near-Black and Near-White**

I will avoid using pure black (`#000000`) and pure white (`#FFFFFF`). Pure black creates uncomfortably high contrast, and pure white can be too bright. Use off-black(#F2F2F2) and off-white(#222222) alternatives to soften the interface.

### **2. Saturate Neutral Colors**
Neutral colors (grays, near-whites, near-blacks) should never be pure grayscale. Add a very subtle saturation (less than 5% in HSB) to my neutrals, tinting them with a primary color from the palette. This creates a more harmonious and coherent feel.

### **3. Use Warm or Cool Saturation, Not Both**
When saturating neutrals, I must maintain consistency. If I use a warm color (e.g., a reddish-gray) for one neutral, I must use warm colors for all other neutrals. Mixing warm and cool neutrals (e.g., a warm background with a cool foreground card) creates a disjointed palette.

### **4. High Contrast for Important Elements**
Key interactive elements, such as buttons, links, and primary content, must have high contrast to draw the user's attention. Secondary or structural elements, like dividers or drop-shadows, should have minimal contrast to avoid distraction.

### **5. Distinct Brightness Values in Palettes**
Every color in a palette must have a unique brightness value. This ensures that colors are distinct not just in hue but also in luminance, which improves accessibility and prevents colors from visually competing with each other.

### **6. Keep Container Brightness Within Limits**
The brightness difference between a background and a container sitting on it should be carefully managed.
* **Dark Interfaces:** Within a 12% difference in HSB brightness.
* **Light Interfaces:** Within a 7% difference in HSB brightness.

### **7. Container Borders Must Contrast with Both Surfaces**
A border on a container must be lighter than both the container and the background in a dark UI, or darker than both in a light UI. A border with a brightness value that falls between the two surfaces will look blurry and undefined.

---

## Spacing, Sizing, and Alignment

### **8. Everything Must Be Deliberate**
Every decision regarding whitespace, alignment, size, spacing, color, and shadow must have a clear rationale. If any part of the design is questioned, I must have an explanation for why it is styled that way.

### **9. Prioritize Optical Alignment**
I will not rely solely on mathematical alignment tools. Some shapes (like the 'play' icon in a button) have a visual center that differs from their geometric center. I must adjust these elements by eye to ensure they look visually balanced.

### **10. Measurements Must Be Mathematically Related**
All spacing and sizing values should derive from a consistent scale (e.g., a 4px or 8px grid). For instance, spacing could be 4px, 8px, 12px, 16px, 24px, etc. This ensures a rhythmic and coherent layout.

### **11. Align Every Element**
No element should appear to be floating randomly. Every element must be logically aligned with at least one other element on the page. This creates a strong visual connection and underlying structure.

### **12. Use a 12-Column Grid**
For responsive horizontal layouts, I will default to a 12-column grid. Its divisibility by 2, 3, 4, and 6 offers maximum flexibility for arranging content.

### **13. Space Between Points of High Contrast**
When measuring whitespace, I will measure from the edge of one high-contrast element to the edge of the next. For example, the space between two paragraphs of black text on a white background is measured from the bottom of the last line of the first paragraph to the top of the first line of the second.

### **14. Outer Padding ≥ Inner Padding**
In any container, the outer padding (the space between the internal elements and the container's edge) must be equal to or greater than the inner padding (the space between the elements themselves). This follows the Gestalt principle of proximity.

### **15. Arrange Elements by Visual Weight**
When a series of elements is arranged horizontally or vertically, they should be ordered by visual weight (from heaviest to lightest). The heaviest element should be placed at the beginning or end of the sequence, on the outermost edge. For example, two primary buttons followed by three text links.

---

## Typography

### **16. Adjust Spacing Based on Text Size**
The relationship between text size, letter spacing (tracking), and line height (leading) is inverse.
* **Large Text (Headings):** Decrease letter spacing and line height to prevent it from looking too airy.
* **Small Text (Body/Captions):** Increase letter spacing and line height to improve readability.

### **17. Keep Body Text at 16px or Above**
To ensure legibility and accessibility, the minimum size for body text is 16px (or its equivalent unit).

### **18. Aim for a 70-Character Line Length**
The ideal line length for readable body text is between 60 and 80 characters. I will aim for approximately 70 characters as a safe and effective default.

### **19. Use Two Typefaces at Most**
Using more than two typefaces in a design is rarely justified and often leads to a cluttered, unprofessional look. A single typeface is sufficient; a second can be used for contrast and hierarchy.

---

## UI Elements and Effects

### **20. Lighter Elements Appear Closer**
To simulate depth, elements that are "closer" to the user (e.g., modals, dropdowns) should be lighter than elements that are "further away." This applies to both light and dark mode interfaces.

### **21. Drop Shadow Blur = 2x Distance**
A drop shadow's blur value should be double its Y-axis offset. For example, a shadow with a `y: 4px` offset should have a `blur: 8px`. As an element gets "closer" (larger shadow), the shadow's opacity should decrease.

### **22. Put Simple on Complex, and Vice Versa**
I must avoid placing complex foreground elements on complex backgrounds (e.g., detailed text over a photograph). The rule is:
* Simple foreground on complex background (Good)
* Complex foreground on simple background (Good)
* Simple foreground on simple background (Can be plain, but acceptable)
* Complex foreground on complex background (Avoid)

### **23. Button Padding: Horizontal = 2x Vertical**
To create a classic, recognizable button shape, the horizontal padding should be twice the vertical padding. For example, `padding: 12px 24px;`.

### **24. Nest Corners Properly**
When one rounded rectangle is inside another, the inner corner radius must be smaller to create a visually parallel curve. The formula is: `Inner Radius = Outer Radius - Padding`. For example, if an outer container has a `30px` radius and `10px` of padding, the inner element should have a `20px` radius.

### **25. Don't Put Two Hard Divides Next to Each Other**
Avoid placing multiple hard visual edges (e.g., a container's border right next to where the background color changes) adjacent to one another. This creates unnecessary visual noise. I will use whitespace to separate such elements.

### **26. Don't Use Shadows in Dark Interfaces**
Shadows are generally ineffective and illogical in dark UIs. A dark surface in a dark environment would not cast a visible shadow. I will use light borders or brighter background colors to create elevation instead.

### **27. Be Consistent with Depth Techniques**
I will choose one method for representing depth (e.g., soft shadows, hard shadows, solid layers) and apply it consistently throughout the entire interface. Mixing depth techniques looks amateurish.

### **28. Lower the Contrast of Icons Paired with Text**
Icons are often visually heavier than adjacent text. To balance them, I will reduce the icon's contrast, either by lowering its opacity or choosing a slightly lighter/darker color.
```
./contextfiles/designforblog.md
```
### Project Brief: Front-end Design for the Blog Page

**Objective:**
To create a responsive and visually appealing blog index page that lists all the available articles. The design should align with the existing aesthetic of the Etheca website, using a similar dark theme, typography, and component styling, while drawing inspiration from the provided reference image for the layout and card design.

---

#### 1. Page Title Section

* **Component:** "Blog" Title Header
* **Description:**
    * At the top of the page, there will be a main heading that says "Blog".
    * This title should be styled consistently with the "Works With Your Tools" heading on the current homepage.
    * It should be centrally aligned on the page.
    * On both the left and right sides of the title, there should be a thin, vertical, light-colored line.
    * There needs to be adequate horizontal padding between the vertical lines and the text to ensure it feels balanced and not cramped. This entire element should function as a distinct, decorative page header.

---

#### 2. Blog Posts Grid Section

* **Component:** Responsive Grid Layout
* **Description:**
    * Below the main title, all the blog posts will be displayed in a responsive grid.
    * On larger screens (like desktops), the grid should display two or three post cards per row.
    * As the screen size decreases (on tablets and mobile devices), the grid should fluidly adjust. For example, it might show two cards per row on a tablet and then stack to a single-column layout with one card per row on a mobile phone.
    * The spacing between the cards in the grid (both horizontally and vertically) should be generous and consistent to maintain a clean, organized look.

---

#### 3. Individual Blog Post Card

* **Component:** Blog Post Card
* **Description:**
    * Each blog post in the grid will be represented by a clickable card that links to the full article.
    * **Enclosure/Container:** The entire card will be enclosed in a container with a subtle, light-colored border, similar to the containers seen in the reference image. The corners of this container should be slightly rounded. A faint background color, slightly lighter than the main page background, could be used to make the card "pop."
    * **Thumbnail Image:** The top portion of the card will be dedicated to a thumbnail image for the blog post. This image should fill the full width of the card's container and have slightly rounded top corners to match the container's border radius.
    * **Content Section:** Below the image, there will be a content area with some padding on all sides.
        * **Title:** The blog post's title will be displayed here. The font should be bold and larger than the rest of the text on the card, consistent with other headings on the Etheca site.
        * **Metadata (Optional but Recommended):** Below the title, you can include a line for metadata, such as the publication date or author's name. This text should be smaller and have a lighter color to create a visual hierarchy.
        * **Excerpt/Summary:** A short, two-to-three-line summary of the blog post can be included to give readers a preview of the content.
```
./contextfiles/gridimplementation.md
````
# Implementation Plan: Responsive Masonry Blog Layout

## 1. Goal

To implement a responsive, filterable, and aesthetically precise masonry blog layout that mirrors the design of the Cartesia blog. This includes a full-width featured post, a dynamic grid of other posts, and distinct vertical and horizontal grid lines.

The core of this architecture is to decouple the content (blog cards) from the layout structure (the grid), using JavaScript to intelligently calculate and apply positioning.

## 2. High-Level Architecture

The page will be composed of two primary sections, rendered within a main page component (`BlogPage.tsx`).

**Featured Post Section**: A standard, full-width component that sits at the top of the page. It is not part of the masonry grid and its logic.

**Masonry Grid Section**: A container that holds all non-featured blog posts, the grid line elements, and the filtering controls. All positioning logic will be scoped to this section.

### Component Breakdown:

- **BlogPage.tsx**: The main view component that fetches blog data and renders the FeaturedPost and MasonryGrid components.
- **FeaturedPost.tsx**: A simple presentational component for the main article.
- **MasonryGrid.tsx**: The stateful "controller" component. It will manage the filtering state, render the list of cards, and utilize a custom hook to handle the complex layout logic.
- **BlogCard.tsx**: A simple presentational component for an individual blog post in the grid.
- **useMasonryLayout.ts**: A custom React hook that will contain all the complex DOM measurement and element positioning logic, keeping the MasonryGrid.tsx component clean.

## 3. Step-by-Step Implementation Guide

### Step 3.1: The Blog Card (BlogCard.tsx)

This component is the basic building block.

**Responsibility**: To display a single blog post's content (image, title, date, etc.). It should have no knowledge of the masonry layout.

**Styling (Tailwind CSS)**:

- `position: absolute;` — This is critical. The parent (MasonryGrid) will control its top and left properties.
- `width: 350px;` — A fixed width is essential for the layout calculation. This can be adjusted with a variable.
- `height: auto;` — The height will be determined by its content.
- `border-bottom: 1px solid theme('colors.gray.200');` — This creates the horizontal grid lines.
- `transition: top 0.4s ease, left 0.4s ease, opacity 0.4s ease;` — For smooth animations when filtering or resizing.

### Step 3.2: The Grid Container & Logic (MasonryGrid.tsx & useMasonryLayout.ts)

This is the most complex part of the implementation.

#### MasonryGrid.tsx Component:

**State Management**:

```typescript
const [posts, setPosts] = useState([]); // To hold all blog posts fetched from an API.
const [activeFilter, setActiveFilter] = useState('all'); // To track the currently selected category.
```

It will derive the `filteredPosts` from the two state variables above.

**DOM References**:

- It will create and hold a useRef for the main container: `const gridRef = useRef(null);`.

**Rendering Logic**:

- Render the filter buttons. Clicking a button will update the `activeFilter` state.
- Render the main container div with `position: relative;` and pass the `gridRef` to it.
- Inside the container, map over `filteredPosts` to render the BlogCard components.
- It will also render the vertical grid line divs (see Step 3.3).
- It will call the custom hook `useMasonryLayout`, passing it the necessary refs and data.

#### useMasonryLayout.ts Custom Hook:

This hook will perform all the heavy lifting.

**Inputs**: `gridRef`, `filteredPosts`, `cardWidth`, `gap`.

**Core Functionality (within a useEffect hook)**:

This effect will run whenever the `filteredPosts` array changes (due to filtering) or on window resize.

**Layout Calculation Steps**:

1. Get the current width of the grid container from `gridRef.current.offsetWidth`.
2. Calculate the number of columns that can fit: `numColumns = Math.floor(containerWidth / (cardWidth + gap))`.
3. Create an array to track the height of each column, initialized to zeros: `columnHeights = Array(numColumns).fill(0)`.
4. Loop through each rendered blog card element. For each card:
   a. Find the shortest column by getting the minimum value in the `columnHeights` array.
   b. Get the index of that shortest column.
   c. Set the card's position:
      ```javascript
      card.style.left = `${columnIndex * (cardWidth + gap)}px`;
      card.style.top = `${columnHeights[columnIndex]}px`;
      ```
   d. Update the column's height: `columnHeights[columnIndex] += card.offsetHeight;`.
5. After positioning all cards, find the maximum height in the `columnHeights` array.
6. Set the main grid container's height to this max value: `gridRef.current.style.height = `${Math.max(...columnHeights)}px`;`. This is crucial to ensure the page layout below the grid is pushed down correctly.

### Step 3.3: The Grid Lines

This is handled in two parts, creating the illusion of a perfect grid.

**Horizontal Lines**: As defined in 3.1, this is simply the `border-bottom` of each BlogCard. Because the `useMasonryLayout` hook will stack cards perfectly on top of each other in each column, these borders will align to form continuous lines.

**Vertical Lines**:

- These will be separate div elements rendered inside the MasonryGrid container.
- The `useMasonryLayout` hook will also be responsible for calculating how many vertical lines are needed (`numColumns - 1`).

**Styling**:

- `position: absolute;`
- `top: 0;`
- `height: 100%;` (of the parent grid container)
- `width: 1px;`
- `background-color: theme('colors.gray.200');`

The hook will calculate the left position for each line and apply it via inline styles. For example, the first line's left offset would be `(cardWidth + gap) - (gap / 2)`.

## 4. Responsiveness & Animation

**Responsiveness**: The entire system is inherently responsive because the `useMasonryLayout` hook is designed to be triggered on window resize. On resize, it will automatically recalculate the number of columns and re-position all cards and vertical lines to fit the new viewport. On a mobile view, `numColumns` will become 1, and the logic will naturally stack all items in a single column and render zero vertical lines.

**Animation**: The animation is handled by the CSS transition property on the BlogCards. When the `activeFilter` changes, React re-renders the list of cards. The `useMasonryLayout` hook then calculates the new top and left positions. Because the CSS transition is present, the browser will automatically animate the cards from their old positions to their new ones, creating the desired shuffling effect.

````
./src/App.css
```css

```
./src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Covik Sans Font Implementation */
@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Italic.otf') format('opentype');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Semibold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Semibold_Italic.otf') format('opentype');
  font-weight: 600;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Bold_Italic.otf') format('opentype');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Covik Sans';
  src: url('/assets/fonnts.com-Covik_Sans_Black_Italic.otf') format('opentype');
  font-weight: 900;
  font-style: italic;
  font-display: swap;
}

@layer base {

  :root {
    --background: 240 10% 97%; /* near-white from --color-surface-gray: #f4f4f6 */
    --foreground: 240 8% 12%; /* near-black from --color-text-black: #1a1a22 */
    --card: 240 10% 97%;
    --card-foreground: 240 8% 12%;
    --popover: 240 10% 97%;
    --popover-foreground: 240 8% 12%;
    /* Primary buttons: black background, white text */
    --primary: 240 8% 12%;
    --primary-foreground: 240 8% 97%;
    --secondary: 240 5% 90%;
    --secondary-foreground: 240 8% 12%;
    --muted: 240 5% 90%;
    --muted-foreground: 240 5% 45%; /* Grey for muted text */
    --accent: 240 5% 85%;
    --accent-foreground: 240 8% 12%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --border: 240 5% 88%; /* Subtle border color */
    --input: 240 5% 88%;
    --ring: 240 8% 12%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: "Covik Sans", sans-serif;
  }
}


```
./src/components/AutomationHero.tsx
```
"use client"

import React from 'react';
import { HoverBorderGradient } from "../../components/ui/hover-border-gradient";

const AutomationHero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Inner Content Container with Vertical Borders */}
      <div className="w-full max-w-7xl mx-auto border-l border-r flex items-center justify-center relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            maskImage: 'radial-gradient(ellipse at center, white, transparent 70%)'
          }}
        />
        
        <div className="relative z-10 px-6 md:px-8 py-24 md:py-32 w-full">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-tight">
              The end of manual data entry
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed tracking-wide">
              We just observe how you work and then update your system of records accordingly
            </p>
          </div>
          
          
          <div className="pt-4">
            <HoverBorderGradient
              as="button"
              onClick={() => window.open('mailto:hello@etheca.watch', '_blank')}
              className="flex items-center justify-center"
              containerClassName="rounded-lg"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Enter the Waitlist
            </HoverBorderGradient>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationHero;
```
./src/components/BlogEntry.tsx
```
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface BlogEntryProps {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  thumbnail: string;
}

export default function BlogEntry({
  id,
  title,
  date,
  author,
  description,
  thumbnail,
}: BlogEntryProps) {
  return (
    <article className="border-b border-border pb-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thumbnail Image */}
        <div className="md:col-span-1">
          <Link href={`/blog/${id}`}>
            <div className="relative aspect-video overflow-hidden rounded-lg hover:opacity-80 transition-opacity">
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-4">
          <Link href={`/blog/${id}`}>
            <h2 className="text-2xl font-bold hover:text-muted-foreground transition-colors">
              {title}
            </h2>
          </Link>
          
          <div className="text-sm text-muted-foreground">
            {format(new Date(date), "PPP")} • {author}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          <Link 
            href={`/blog/${id}`}
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
```
./src/components/IntegrationsShowcase.tsx
```
import React from 'react';
const WorksWithToolsImage = '/images/workswithyourtools-removebg-preview.png';

const IntegrationsShowcase: React.FC = () => {
  return (
    <section className="border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 p-6 md:p-8 relative">
          <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-tight">
            Works with your tools.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide max-w-lg">
            We integrate with your favorite CRMs, project management boards, and communication apps to capture updates automatically.
          </p>
          </div>
        </div>
        
        <div className="relative border-l">
          <div className="p-6 md:p-8 flex items-center justify-center min-h-[360px] overflow-hidden">
            <img
              src={WorksWithToolsImage}
              alt="Works with your tools - integrations with CRMs and project management"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsShowcase;

```
./src/components/InvisibleHandSection.tsx
```
import React from 'react';
const InvisibleHandImage = '/images/Invisible-hand-removebg-preview.png';

const InvisibleHandSection: React.FC = () => {
  return (
    <section className="border-t relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 p-6 md:p-8 relative">
          <div
            className="absolute inset-0 opacity-80 pointer-events-none"
            style={{
              backgroundSize: '6px 6px',
              backgroundPosition: '96px 96px',
              backgroundImage: `
                linear-gradient(to right, transparent 6px, hsl(var(--border)) 7px, hsl(var(--border)) 8px, transparent 9px),
                linear-gradient(to bottom, transparent 6px, hsl(var(--border)) 7px, hsl(var(--border)) 8px, transparent 9px)
              `,
            }}
          />
          <div
            className="absolute inset-0 bg-background pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 20%, hsl(var(--background)))',
            }}
          />
          <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-tight">
            The invisible hand that updates your data
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide max-w-lg">
            Focus on your work, not data entry. Our AI learns your workflow to keep your source of truth perfectly accurate, guaranteed.
          </p>
          </div>
        </div>
        
        <div className="relative border-l">
          <div className="p-6 md:p-8 flex items-center justify-center min-h-[360px]">
            <img
              src={InvisibleHandImage}
              alt="The invisible hand that updates your data"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvisibleHandSection;

```
./src/components/Mdx.tsx
```
import Image from 'next/image'

interface MdxProps {
  code: string
}

// Custom components for MDX
const components = {
  Image,
  Callout: ({ children, ...props }: { children: React.ReactNode }) => (
    <div className="my-6 flex items-start rounded-md border border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:border-yellow-600 dark:bg-yellow-900/20" {...props}>
      <div className="ml-4">
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          {children}
        </div>
      </div>
    </div>
  ),
}

export function Mdx({ code }: MdxProps) {
  if (!code) {
    return <div>No content available</div>
  }
  
  // For now, let's use a server-side approach or dangerouslySetInnerHTML as fallback
  // This can be improved once we resolve the useMDXComponent issue
  try {
    // Attempt to use eval for MDX code - this is a temporary workaround
    const Component = new Function(code)()
    return (
      <div className="mdx">
        <Component components={components} />
      </div>
    )
  } catch (error) {
    // Fallback: render as HTML if available
    if (typeof code === 'string' && code.includes('<')) {
      return (
        <div className="mdx" dangerouslySetInnerHTML={{ __html: code }} />
      )
    }
    
    return (
      <div className="mdx">
        <div className="prose prose-lg max-w-none">
          <p>Content rendering temporarily unavailable. Please check back later.</p>
        </div>
      </div>
    )
  }
}
```
./src/components/WorkflowMappingSection.tsx
```
import React from 'react';
const StoryImage = '/images/Story-removebg-preview.png';

const WorkflowMappingSection: React.FC = () => {
  return (
    <section className="border-t border-b">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 p-6 md:p-8 relative">
          <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-tight">
            We map the chaos
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide max-w-lg">
            Our AI makes sense of your complex workflow so you don't have to. We turn that chaos into a simple prompt with the right updates, ready for your final say.
          </p>
          </div>
        </div>
        
        <div className="relative border-l">
          <div className="p-6 md:p-8 flex items-center justify-center min-h-[360px] overflow-hidden">
            <img
              src={StoryImage}
              alt="Review, Approve, Done - workflow approval process"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowMappingSection;

```
./src/lib/utils.ts
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```
