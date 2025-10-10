'use client'; // Runs in browser - needed for animations and interactions

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';

// Load custom fonts from /fonts folder - Next.js optimizes them automatically
const swearText = localFont({
  src: '../../../fonts/fonnts.com-Swear-Text-Medium.otf',
  variable: '--font-swear-text',
  display: 'swap', // Shows fallback font while loading
  weight: '500',
  style: 'italic',
});

const paperMono = localFont({
  src: '../../../fonts/PaperMono-Regular.otf',
  variable: '--font-paper-mono',
  display: 'swap',
  weight: '400',
});

// Animation: fade in from bottom (starts invisible + 10px down, then slides up)
const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: 'easeOut' }
  },
};

// Animation: children appear one by one with 0.02s delay (like dominoes)
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

// Animation: logo scales up from 95% to 100% while fading in
const logoVariant = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }
  },
};

export function LandingPageClient() {
  return (
    <main
      // Full screen height, dark background, everything centered with responsive padding
      className={`min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-12 md:py-16 gap-9 md:gap-12 lg:gap-16 ${swearText.variable} ${paperMono.variable}`}
    >
      {/* Container that staggers animation of all children */}
      <motion.div
        className="flex flex-col items-center gap-12 md:gap-16 max-w-4xl w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Logo - responsive size: 100px mobile → 145px desktop */}
        <motion.div
          variants={logoVariant}
          className="relative w-[100px] h-[140px] md:w-[120px] md:h-[168px] lg:w-[145px] lg:h-[201px]"
        >
          {/* Next.js Image auto-optimizes and lazy-loads */}
          <Image
            src="/logo.svg"
            alt="Etheca Logo"
            fill
            className="object-contain"
            priority // Load immediately (it's above the fold)
          />
        </motion.div>

        {/* Tagline + Navigation section */}
        <motion.div
          className="flex flex-col items-center gap-9 md:gap-16 w-full"
          variants={fadeInUp}
        >
          {/* Main tagline - uses Swear Text italic, responsive size 18px → 24px */}
          <p className="font-[family-name:var(--font-swear-text)] italic text-lg md:text-xl lg:text-2xl text-center text-white leading-normal max-w-2xl px-4">
            With Etheca, we're building a better way to work
          </p>

          {/* Navigation - stacks on mobile, horizontal on tablet+ */}
          <nav className="flex flex-col sm:flex-row gap-6 md:gap-12 lg:gap-[53px] items-center font-[family-name:var(--font-paper-mono)] text-xs text-[#ededed] uppercase tracking-wide">
            {/* Each link scales slightly on hover (grows 5%) and shrinks when clicked */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/values" className="transition-colors duration-200 hover:text-white py-2 px-3">
                VALUES
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/blogs" className="transition-colors duration-200 hover:text-white py-2 px-3">
                BLOGS
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="transition-colors duration-200 hover:text-white py-2 px-3">
                CONTACT
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      </motion.div>
    </main>
  );
}
