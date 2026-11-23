import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, MapPin } from 'lucide-react';
import { HERO_DATA } from '../data/portfolio';
import { SafeImage } from './SafeImage';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative border-b border-white/10 bg-[#0A0F1C]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              {/* Availability Pill */}
              <div className="inline-flex max-w-full items-center gap-2.5 border border-white/10 bg-[#111827] px-3.5 py-2">
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#EA580C] opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#EA580C]" />
                </span>
                <span className="font-mono text-[11px] leading-snug text-[#F8FAFC] sm:text-xs">
                  {HERO_DATA.availability}
                </span>
              </div>

              {/* Display H1 */}
              <h1
                id="hero-heading"
                className="mt-7 max-w-[19ch] font-display text-[clamp(2.25rem,4.5vw,3.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance text-[#F8FAFC] sm:mt-8"
              >
                AI Agents and{' '}
                <span className="whitespace-nowrap">Full-Stack</span> Systems
                That Ship.
              </h1>

              {/* Positioning Subheadline */}
              <p className="mt-6 max-w-[54ch] text-base leading-[1.68] text-[#94A3B8] sm:text-lg">
                {HERO_DATA.subheadline}
              </p>

              {/* Action Row */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href={HERO_DATA.primaryCta.href}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-[#2563EB] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8]"
                >
                  {HERO_DATA.primaryCta.label}
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={HERO_DATA.secondaryCta.href}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap border border-white/15 bg-[#111827] px-6 py-3 text-sm font-medium text-[#F8FAFC] transition-colors duration-150 hover:border-white/30 hover:bg-[#161F33]"
                >
                  {HERO_DATA.secondaryCta.label}
                  <ArrowRight className="h-4 w-4 text-[#94A3B8]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quiet Swiss Editorial Metadata Strip */}
            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:mt-12 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs text-[#94A3B8]">
                  Current Role
                </p>
                <p className="mt-1 text-sm font-medium text-[#F8FAFC]">
                  {HERO_DATA.currentRole}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#94A3B8]">
                  Location
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#F8FAFC]">
                  <MapPin className="h-3.5 w-3.5 text-[#EA580C]" aria-hidden="true" />
                  {HERO_DATA.location}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#94A3B8]">
                  Core Stack
                </p>
                <p className="mt-1 font-mono text-xs text-[#F8FAFC]">
                  LangGraph · RAG · MERN
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sleek Framed Visual / Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex lg:col-span-5"
          >
            <div className="flex w-full flex-col border border-white/10 bg-[#111827]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[11px] text-[#94A3B8]">
                <span>{HERO_DATA.name}</span>
                <span className="tabular-nums">{HERO_DATA.heroFrameCoordinates}</span>
              </div>

              <div className="relative aspect-[4/4] w-full flex-1 overflow-hidden bg-[#0A0F1C] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                <SafeImage
                  src={HERO_DATA.heroImage}
                  alt={HERO_DATA.heroImageAlt}
                  fallbackTitle={HERO_DATA.name}
                  priority
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/70 via-transparent to-transparent"
                />
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 border-t border-white/15 pt-3">
                  <span className="font-mono text-xs text-[#F8FAFC]">
                    {HERO_DATA.heroFrameCaption}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-[#94A3B8] tabular-nums">
                    2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
