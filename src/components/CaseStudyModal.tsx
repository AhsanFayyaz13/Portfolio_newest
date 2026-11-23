import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Code2, X } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { SafeImage } from './SafeImage';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-Over Editorial Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-3xl flex-col overflow-y-auto border-l border-white/10 bg-[#0A0F1C]"
          >
            {/* Sticky Drawer Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0A0F1C]/95 px-5 py-4 backdrop-blur-md sm:px-8">
              <div className="flex min-w-0 items-center gap-3 font-mono text-xs text-[#94A3B8]">
                <span className="truncate text-[#F8FAFC]">{project.category}</span>
                <span aria-hidden="true">/</span>
                <span className="shrink-0 tabular-nums">{project.timeline}</span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 border border-white/10 bg-[#111827] px-3 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-white/25"
              >
                <span className="hidden sm:inline">Close</span>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 px-5 py-7 sm:px-8 sm:py-9">
              {/* Hero Image */}
              <div className="aspect-[16/10] w-full overflow-hidden border border-white/10 bg-[#111827]">
                <SafeImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.shortTitle}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Title & Hook */}
              <div className="mt-7">
                <h2
                  id="case-study-title"
                  className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[#F8FAFC] sm:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#94A3B8]">
                  {project.hook}
                </p>

                {/* Action Links */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                    >
                      Live Site
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}

                  {project.sourceUrl ? (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 border border-white/15 bg-[#111827] px-5 py-2.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-white/30 hover:bg-[#161F33]"
                    >
                      <Code2 className="h-4 w-4 text-[#94A3B8]" aria-hidden="true" />
                      Source Code
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Role / Timeline / Tools Strip */}
              <div className="mt-8 grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-12">
                <div className="sm:col-span-4">
                  <p className="font-mono text-xs text-[#94A3B8]">
                    Role
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-[#F8FAFC]">
                    {project.role}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <p className="font-mono text-xs text-[#94A3B8]">
                    Timeline
                  </p>
                  <p className="mt-1.5 font-mono text-sm text-[#F8FAFC] tabular-nums">
                    {project.timeline}
                  </p>
                </div>

                <div className="sm:col-span-5">
                  <p className="font-mono text-xs text-[#94A3B8]">
                    Tools &amp; Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-white/10 bg-[#111827] px-2 py-0.5 font-mono text-[11px] text-[#F8FAFC]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenge / Approach / Outcome */}
              <div className="mt-8 space-y-8">
                <section aria-labelledby="case-challenge-heading">
                  <h3
                    id="case-challenge-heading"
                    className="font-mono text-xs text-[#FB923C]"
                  >
                    01. The Challenge
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-[#F8FAFC]/90">
                    {project.challenge}
                  </p>
                </section>

                <section aria-labelledby="case-approach-heading">
                  <h3
                    id="case-approach-heading"
                    className="font-mono text-xs text-[#60A5FA]"
                  >
                    02. The Approach
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-[#F8FAFC]/90">
                    {project.approach}
                  </p>
                </section>

                <section aria-labelledby="case-outcome-heading">
                  <h3
                    id="case-outcome-heading"
                    className="font-mono text-xs text-[#94A3B8]"
                  >
                    03. The Outcome
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-[#F8FAFC]/90">
                    {project.outcome}
                  </p>
                </section>

                {/* Architecture Highlights */}
                <div className="border border-white/10 bg-[#111827] p-5 sm:p-6">
                  <h3 className="font-mono text-xs text-[#94A3B8]">
                    System Architecture Notes
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {project.architectureHighlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[#F8FAFC]/90"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extra Visual Gallery */}
                {project.gallery.length > 0 ? (
                  <section aria-labelledby="case-gallery-heading">
                    <h3
                      id="case-gallery-heading"
                      className="font-mono text-xs text-[#94A3B8]"
                    >
                      Visual Detail &amp; System Views
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {project.gallery.map((item) => (
                        <figure
                          key={item.detailLabel}
                          className="border border-white/10 bg-[#111827]"
                        >
                          <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#0A0F1C]">
                            <SafeImage
                              src={item.image}
                              alt={`${project.shortTitle} — ${item.detailLabel}`}
                              fallbackTitle={item.detailLabel}
                              objectPosition={item.objectPosition}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <figcaption className="p-4">
                            <p className="font-mono text-xs text-[#F8FAFC]">
                              {item.detailLabel}
                            </p>
                            <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">
                              {item.caption}
                            </p>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
