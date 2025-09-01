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