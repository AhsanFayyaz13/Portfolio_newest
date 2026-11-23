import { motion } from 'framer-motion';
import { EXPERIENCE_TIMELINE } from '../data/portfolio';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-white/10 bg-[#0A0F1C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl border-b border-white/10 pb-8">
          <p className="font-mono text-xs text-[#94A3B8]">
            03. Experience &amp; Education
          </p>
          <h2
            id="experience-heading"
            className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#F8FAFC] sm:text-4xl"
          >
            Engineering Roles, Leadership &amp; Training
          </h2>
        </div>

        {/* Vertical Timeline */}
        <ol className="relative mt-10 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-white/10 md:space-y-10 md:before:left-[215px]">
          {EXPERIENCE_TIMELINE.map((item, index) => {
            const isCurrent = item.period.toLowerCase().includes('present');

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative grid grid-cols-1 gap-3 pl-8 md:grid-cols-[200px_1fr] md:gap-12 md:pl-0"
              >
                {/* Timeline Node */}
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 left-[2px] h-3 w-3 border md:left-[210px] ${
                    isCurrent
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-white/30 bg-[#0A0F1C]'
                  }`}
                />

                {/* Period Column */}
                <div className="md:pr-4 md:text-right">
                  <span className="font-mono text-xs font-medium tracking-wide text-[#94A3B8] tabular-nums">
                    {item.period}
                  </span>
                </div>

                {/* Role Card */}
                <div className="border border-white/10 bg-[#111827] p-6 sm:p-7">
                  <div className="flex flex-col gap-1 border-b border-white/10 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-[#F8FAFC] sm:text-xl">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-[#94A3B8]">
                      {item.organization}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {item.bullets.map((bullet, bulletIdx) => (
                      <li
                        key={bulletIdx}
                        className="flex items-start gap-3 text-sm leading-[1.68] text-[#F8FAFC]/85 sm:text-[15px]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 bg-[#EA580C]"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
