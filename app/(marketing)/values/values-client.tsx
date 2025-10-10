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
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export function ValuesClient() {
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
            {/* Home button - sticky position */}
            <motion.div
              variants={fadeInUp}
              className="fixed"
              style={{ left: '281px', top: '169px' }}
            >
              <Link
                href="/landing"
                className="inline-flex items-center gap-1 text-base font-[family-name:var(--font-swear-text)] italic text-white hover:text-gray-300 transition-colors"
              >
                <CornerUpLeft className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </motion.div>

            {/* Fade gradient overlay - positioned over values content */}
            <div
              className="fixed pointer-events-none"
              style={{
                left: '451px',
                top: '0px',
                width: '680px',
                height: '200px',
                background: 'linear-gradient(to bottom, #1c1c1c 0%, transparent 100%)',
                zIndex: 10
              }}
            />

            {/* Values content - scrollable with bottom padding */}
            <motion.div
              variants={fadeInUp}
              className="absolute pb-32"
              style={{ left: '451px', top: '169px', width: '680px' }}
            >
              {/* Title and divider */}
              <div className="mb-10">
                <h1 className="font-[family-name:var(--font-paper-mono)] text-base text-[#ededed] mb-10 uppercase tracking-wide">
                  Values
                </h1>
                <div className="w-full h-px bg-[#ededed]" />
              </div>

              {/* Values list */}
              <div className="font-[family-name:var(--font-paper-mono)] text-sm text-white leading-relaxed">
                {/* Value 1 */}
                <div className="mb-16">
                  <p className="mb-4">1. Effortless Clarity</p>
                  <p className="text-[#ededed] mb-2">We believe technology should clarify, not complicate.</p>
                  <p className="text-[#ededed] mb-0">
                    Etheca turns scattered actions into structured understanding — so teams don't waste time explaining what already happened. Clarity is our baseline, not a bonus.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="mb-16">
                  <p className="mb-4">2. Calm Productivity</p>
                  <p className="text-[#ededed] mb-2">We design for peace of mind.</p>
                  <p className="text-[#ededed] mb-2">Automation shouldn't feel like acceleration; it should feel like relief.</p>
                  <p className="text-[#ededed] mb-0">
                    Etheca quietly handles the repetitive, the reportable, and the routine — leaving space for deep work, creative flow, and focus.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="mb-16">
                  <p className="mb-4">3. Observant Design</p>
                  <p className="text-[#ededed] mb-2">Every detail we build is informed by observation, not assumption.</p>
                  <p className="text-[#ededed] mb-2">
                    Etheca watches how work naturally happens, then builds systems that fit that rhythm — never the other way around.
                  </p>
                  <p className="text-[#ededed] mb-0">We see design as a way to preserve human context, not replace it.</p>
                </div>

                {/* Value 4 */}
                <div>
                  <p className="mb-4">4. Truth in Context</p>
                  <p className="text-[#ededed] mb-2">Documentation without context is noise.</p>
                  <p className="text-[#ededed] mb-2">
                    Etheca's mission is to make every record — every insight, every action — meaningful by linking it back to why it happened.
                  </p>
                  <p className="text-[#ededed] mb-0">Our systems don't just store data; they preserve intent.</p>
                </div>
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
                className="inline-flex items-center gap-1 text-base font-[family-name:var(--font-swear-text)] italic text-white hover:text-gray-300 transition-colors"
              >
                <CornerUpLeft className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </motion.div>

            {/* Values content */}
            <motion.div variants={fadeInUp} className="flex-1 max-w-2xl">
              {/* Title and divider */}
              <div className="mb-10">
                <h1 className="font-[family-name:var(--font-paper-mono)] text-base text-[#ededed] mb-10 uppercase tracking-wide">
                  Values
                </h1>
                <div className="w-full h-px bg-[#ededed]" />
              </div>

              {/* Values list */}
              <div className="font-[family-name:var(--font-paper-mono)] text-sm text-white leading-relaxed">
                {/* Value 1 */}
                <div className="mb-16">
                  <p className="mb-4">1. Effortless Clarity</p>
                  <p className="text-[#ededed] mb-2">We believe technology should clarify, not complicate.</p>
                  <p className="text-[#ededed] mb-0">
                    Etheca turns scattered actions into structured understanding — so teams don't waste time explaining what already happened. Clarity is our baseline, not a bonus.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="mb-16">
                  <p className="mb-4">2. Calm Productivity</p>
                  <p className="text-[#ededed] mb-2">We design for peace of mind.</p>
                  <p className="text-[#ededed] mb-2">Automation shouldn't feel like acceleration; it should feel like relief.</p>
                  <p className="text-[#ededed] mb-0">
                    Etheca quietly handles the repetitive, the reportable, and the routine — leaving space for deep work, creative flow, and focus.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="mb-16">
                  <p className="mb-4">3. Observant Design</p>
                  <p className="text-[#ededed] mb-2">Every detail we build is informed by observation, not assumption.</p>
                  <p className="text-[#ededed] mb-2">
                    Etheca watches how work naturally happens, then builds systems that fit that rhythm — never the other way around.
                  </p>
                  <p className="text-[#ededed] mb-0">We see design as a way to preserve human context, not replace it.</p>
                </div>

                {/* Value 4 */}
                <div>
                  <p className="mb-4">4. Truth in Context</p>
                  <p className="text-[#ededed] mb-2">Documentation without context is noise.</p>
                  <p className="text-[#ededed] mb-2">
                    Etheca's mission is to make every record — every insight, every action — meaningful by linking it back to why it happened.
                  </p>
                  <p className="text-[#ededed] mb-0">Our systems don't just store data; they preserve intent.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
