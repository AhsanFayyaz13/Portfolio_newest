import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from '../data/portfolio';
import {
  filterProjects,
  getProjectCategoryCounts,
} from '../utils/portfolioLogic';
import { SafeImage } from './SafeImage';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const categoryCounts = useMemo(
    () => getProjectCategoryCounts(PROJECTS, PROJECT_CATEGORIES),
    []
  );

  const visibleProjects = useMemo(
    () => filterProjects(PROJECTS, activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-white/10 bg-[#0A0F1C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="font-mono text-xs text-[#94A3B8]">
              01. Selected Work
            </p>
            <h2
              id="work-heading"
              className="mt-2.5 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#F8FAFC] sm:text-4xl"
            >
              Production Systems &amp; Case Studies
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-2.5"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category];
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap border px-3.5 py-2 text-xs font-medium transition-colors duration-150 sm:text-sm ${
                    isActive
                      ? 'border-[#2563EB] bg-[#2563EB] text-white'
                      : 'border-white/10 bg-[#111827] text-[#94A3B8] hover:border-white/25 hover:text-[#F8FAFC]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isActive ? 'text-white/90' : 'text-[#94A3B8]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div
          data-testid="projects-grid"
          className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => {
              const displayedTools = project.tools.slice(0, 5);
              const extraToolsCount = Math.max(0, project.tools.length - displayedTools.length);

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col border border-white/10 bg-[#111827] transition-colors duration-200 hover:border-white/25"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`View case study: ${project.title}`}
                    className="flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-inset"
                  >
                    {/* Uniform 16:10 Image Frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#0A0F1C]">
                      <SafeImage
                        src={project.image}
                        alt={project.imageAlt}
                        fallbackTitle={project.shortTitle}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-block border border-white/10 bg-[#0A0F1C] px-2.5 py-1 font-mono text-[11px] font-medium text-[#F8FAFC]">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-[#94A3B8] tabular-nums">
                          {project.timeline}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-[#F8FAFC] transition-colors duration-150 group-hover:text-[#60A5FA] sm:text-[1.35rem]">
                        {project.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8] sm:text-[15px]">
                        {project.hook}
                      </p>

                      {/* Tool Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {displayedTools.map((tool) => (
                          <span
                            key={tool}
                            className="border border-white/10 bg-[#0A0F1C]/80 px-2 py-0.5 font-mono text-[11px] text-[#94A3B8]"
                          >
                            {tool}
                          </span>
                        ))}
                        {extraToolsCount > 0 ? (
                          <span className="px-1.5 py-0.5 font-mono text-[11px] text-[#94A3B8] tabular-nums">
                            +{extraToolsCount}
                          </span>
                        ) : null}
                      </div>

                      {/* Card Footer Affordance */}
                      <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs font-medium text-[#F8FAFC]">
                          <span className="font-mono text-[#94A3B8]">
                            {project.role}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#F8FAFC] transition-colors group-hover:text-[#60A5FA]">
                            Case Study
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
