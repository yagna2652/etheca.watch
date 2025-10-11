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
