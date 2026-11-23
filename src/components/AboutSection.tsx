import { motion } from 'framer-motion';
import { ABOUT_DATA } from '../data/portfolio';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-white/10 bg-[#0A0F1C] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: 3-Paragraph Editorial Story */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-[#94A3B8]">
              02. About &amp; Capabilities
            </p>
            <h2
              id="about-heading"
              className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-balance text-[#F8FAFC] sm:text-4xl"
            >
              {ABOUT_DATA.sectionTitle}
            </h2>
            <p className="mt-4 text-base text-[#94A3B8]">
              {ABOUT_DATA.sectionSubtitle}
            </p>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-8 text-[15px] leading-[1.72] text-[#F8FAFC]/85 sm:text-base">
              {ABOUT_DATA.storyParagraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[62ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Categorized Skill Cards (Zero Percentages) */}
          <div className="space-y-6 lg:col-span-7">
            {ABOUT_DATA.skillGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border border-white/10 bg-[#111827] p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                  <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-[#F8FAFC]">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-[#94A3B8] tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                  {group.summary}
                </p>

                <ul
                  aria-label={group.title}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-white/10 bg-[#0A0F1C] px-3 py-1.5 font-mono text-xs text-[#F8FAFC]/90 transition-colors duration-150 hover:border-white/25"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
