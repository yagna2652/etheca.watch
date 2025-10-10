'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import localFont from 'next/font/local';
import { CornerUpLeft } from 'lucide-react';

const swearText = localFont({
  src: '../../../fonts/fonnts.com-Swear-Text-Medium.otf',
  variable: '--font-swear-text',
  display: 'swap',
  weight: '500',
  style: 'italic',
});

const paperMono = localFont({
  src: '../../../fonts/PaperMono-Regular.otf',
  variable: '--font-paper-mono',
  display: 'swap',
  weight: '400',
});

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: 'easeOut' }
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

// Sample blog posts data
const blogPosts = [
  { date: '10.10.2025', title: 'What kind of software we will make?' },
  { date: '11.10.2025', title: 'Building tools for calm productivity' },
  { date: '12.10.2025', title: 'The future of workplace automation' },
];

export function BlogsClient() {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          background-color: #1c1c1c !important;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <div
        className={`w-full min-h-screen ${swearText.variable} ${paperMono.variable}`}
        style={{ backgroundColor: '#1c1c1c', color: 'white' }}
      >
        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block relative w-full min-h-screen">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Home button - fixed position */}
            <motion.div
              variants={fadeInUp}
              className="fixed"
              style={{ left: '281px', top: '165px' }}
            >
              <Link
                href="/landing"
                className="inline-flex items-center gap-1 text-sm font-[family-name:var(--font-swear-text)] italic text-white hover:text-gray-300 transition-colors"
              >
                <CornerUpLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </motion.div>

            {/* Fade gradient overlay */}
            <div
              className="fixed pointer-events-none"
              style={{
                left: '451px',
                top: '0px',
                width: '507px',
                height: '200px',
                background: 'linear-gradient(to bottom, #1c1c1c 0%, transparent 100%)',
                zIndex: 10
              }}
            />

            {/* Blogs content - scrollable with bottom padding */}
            <motion.div
              variants={fadeInUp}
              className="absolute pb-32"
              style={{ left: '451px', top: '165px', width: '507px' }}
            >
              {/* Title and divider */}
              <div className="mb-10">
                <h1 className="font-[family-name:var(--font-paper-mono)] text-sm text-[#ededed] mb-10">
                  Blogs
                </h1>
                <div className="w-full h-px bg-[#ededed]" />
              </div>

              {/* Blog posts list */}
              <div className="flex flex-col gap-[19px]">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-11 font-[family-name:var(--font-paper-mono)] text-sm">
                      <p className="text-[#777777] shrink-0">{post.date}</p>
                      <p className="text-white">{post.title}</p>
                    </div>
                    {/* Show divider only if not the last item */}
                    {index < blogPosts.length - 1 && (
                      <div className="w-full h-[0.5px] bg-[#3a3a3a]" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* MOBILE/TABLET LAYOUT */}
        <div className="lg:hidden">
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-16 px-4 md:px-8 py-12 md:py-16 pb-32 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Home button */}
            <motion.div variants={fadeInUp} className="shrink-0">
              <Link
                href="/landing"
                className="inline-flex items-center gap-1 text-sm font-[family-name:var(--font-swear-text)] italic text-white hover:text-gray-300 transition-colors"
              >
                <CornerUpLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </motion.div>

            {/* Blogs content */}
            <motion.div variants={fadeInUp} className="flex-1 max-w-2xl">
              {/* Title and divider */}
              <div className="mb-10">
                <h1 className="font-[family-name:var(--font-paper-mono)] text-sm text-[#ededed] mb-10">
                  Blogs
                </h1>
                <div className="w-full h-px bg-[#ededed]" />
              </div>

              {/* Blog posts list */}
              <div className="flex flex-col gap-[19px]">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-11 font-[family-name:var(--font-paper-mono)] text-sm">
                      <p className="text-[#777777] shrink-0">{post.date}</p>
                      <p className="text-white">{post.title}</p>
                    </div>
                    {/* Show divider only if not the last item */}
                    {index < blogPosts.length - 1 && (
                      <div className="w-full h-[0.5px] bg-[#3a3a3a]" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
