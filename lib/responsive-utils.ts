/**
 * Responsive utility classes and functions for consistent design across all viewports
 */

// Fluid typography scale with smooth transitions
export const fluidTypography = {
  // Display sizes for headings
  'display-lg': 'text-fluid-6xl font-serif tracking-tight leading-tight',
  'display-md': 'text-fluid-5xl font-serif tracking-tight leading-tight',
  'display-sm': 'text-fluid-4xl font-serif tracking-tight leading-tight',

  // Heading sizes
  'heading-xl': 'text-fluid-3xl font-serif tracking-tight leading-tight',
  'heading-lg': 'text-fluid-2xl font-serif tracking-tight leading-tight',
  'heading-md': 'text-fluid-xl font-serif tracking-tight leading-tight',
  'heading-sm': 'text-fluid-lg font-serif tracking-tight leading-tight',

  // Body text sizes
  'body-xl': 'text-fluid-lg font-sans leading-relaxed',
  'body-lg': 'text-fluid-base font-sans leading-relaxed',
  'body-md': 'text-fluid-sm font-sans leading-relaxed',
  'body-sm': 'text-fluid-xs font-sans leading-relaxed',

  // UI text sizes
  'ui-lg': 'text-fluid-base font-sans leading-snug',
  'ui-md': 'text-fluid-sm font-sans leading-snug',
  'ui-sm': 'text-fluid-xs font-sans leading-snug',
} as const;

// Fluid spacing scale for consistent gaps and padding
export const fluidSpacing = {
  // Container padding
  'container-padding': 'px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12',

  // Section spacing
  'section-padding-y': 'py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20',
  'section-padding-sm': 'py-6 xs:py-7 sm:py-8 md:py-10 lg:py-12 xl:py-16',

  // Component gaps
  'gap-fluid-xs': 'gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4',
  'gap-fluid-sm': 'gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-6',
  'gap-fluid-md': 'gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10',
  'gap-fluid-lg': 'gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16',
  'gap-fluid-xl': 'gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20',

  // Margin spacing
  'mt-fluid-xs': 'mt-2 xs:mt-3 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4',
  'mt-fluid-sm': 'mt-3 xs:mt-4 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-6',
  'mt-fluid-md': 'mt-4 xs:mt-5 sm:mt-6 md:mt-6 lg:mt-7 xl:mt-8',
  'mt-fluid-lg': 'mt-6 xs:mt-7 sm:mt-8 md:mt-6 lg:mt-8 xl:mt-9',
  'mt-fluid-xl': 'mt-8 xs:mt-10 sm:mt-12 md:mt-10 lg:mt-12 xl:mt-16',
} as const;

// Responsive grid and layout utilities
export const responsiveLayout = {
  // Grid systems
  'grid-auto': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12',
  'grid-hero': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12',
  'grid-features': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',

  // Flex utilities
  'flex-responsive': 'flex flex-col xs:flex-row',
  'flex-center': 'flex justify-center items-center',
  'flex-between': 'flex justify-between items-center',

  // Container utilities
  'container-responsive': 'mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12',
  'content-max-width': 'w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl',
} as const;

// Interactive element sizing
export const interactiveElements = {
  // Button heights
  'btn-sm': 'h-8 xs:h-9 sm:h-10',
  'btn-md': 'h-10 xs:h-11 sm:h-12 md:h-10 lg:h-11 xl:h-10',
  'btn-lg': 'h-12 xs:h-13 sm:h-14 md:h-12 lg:h-14 xl:h-12',

  // Input heights (matching buttons)
  'input-sm': 'h-8 xs:h-9 sm:h-10',
  'input-md': 'h-10 xs:h-11 sm:h-12 md:h-10 lg:h-11 xl:h-10',
  'input-lg': 'h-12 xs:h-13 sm:h-14 md:h-12 lg:h-14 xl:h-12',

  // Padding for buttons/inputs
  'btn-padding-sm': 'px-3 xs:px-4 sm:px-4',
  'btn-padding-md': 'px-4 xs:px-5 sm:px-6 md:px-4 lg:px-5 xl:px-4',
  'btn-padding-lg': 'px-6 xs:px-7 sm:px-8 md:px-6 lg:px-8 xl:px-6',
} as const;

// Viewport-specific utilities
export const viewportUtils = {
  // Show/hide at specific breakpoints
  'mobile-only': 'block xs:hidden',
  'mobile-up': 'hidden xs:block',
  'tablet-only': 'hidden md:block lg:hidden',
  'tablet-up': 'hidden md:block',
  'desktop-only': 'hidden lg:block',

  // Responsive text alignment
  'text-responsive-center': 'text-center md:text-left',
  'text-responsive-left': 'text-center xs:text-left',
} as const;

// Combined utility function to merge responsive classes
export function createResponsiveClasses(...utilities: (keyof typeof fluidTypography | keyof typeof fluidSpacing | keyof typeof responsiveLayout | keyof typeof interactiveElements | keyof typeof viewportUtils | string)[]): string {
  return utilities
    .map(utility => {
      if (typeof utility === 'string' && !utility.includes(' ')) {
        // Check if it's a predefined utility
        return (fluidTypography as any)[utility] ||
               (fluidSpacing as any)[utility] ||
               (responsiveLayout as any)[utility] ||
               (interactiveElements as any)[utility] ||
               (viewportUtils as any)[utility] ||
               utility;
      }
      return utility;
    })
    .join(' ');
}

// Breakpoint values for JavaScript usage
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Helper function to check if viewport matches breakpoint
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}