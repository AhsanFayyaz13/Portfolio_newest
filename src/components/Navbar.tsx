import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { HERO_DATA, NAV_LINKS, type NavLinkItem } from '../data/portfolio';

interface NavbarProps {
  activeSection: NavLinkItem['id'] | null;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0F1C]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-3 whitespace-nowrap text-[#F8FAFC] transition-opacity hover:opacity-90"
            aria-label={`${HERO_DATA.name} — Back to top`}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center border border-white/15 bg-[#111827] font-mono text-xs font-medium tracking-wider text-[#F8FAFC]">
              {HERO_DATA.monogram}
            </span>
            <span className="font-display text-[15px] font-bold tracking-[-0.02em] sm:text-base">
              {HERO_DATA.name}
            </span>
          </a>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute right-0 bottom-2 left-0 h-[2px] bg-[#2563EB]"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action (Desktop) + Menu Trigger (Mobile) */}
          <div className="flex shrink-0 items-center">
            <a
              href="#contact"
              className="hidden min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8] md:inline-flex"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-[#111827] text-[#F8FAFC] transition-colors hover:border-white/25 md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 flex w-[min(86vw,340px)] flex-col border-l border-white/10 bg-[#0A0F1C]"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <span className="font-mono text-xs text-[#94A3B8]">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-[#111827] text-[#F8FAFC] transition-colors hover:border-white/25"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation links"
                className="flex flex-1 flex-col divide-y divide-white/10 px-5 py-4"
              >
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-[56px] items-center justify-between py-3 font-display text-lg font-bold transition-colors ${
                        isActive ? 'text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs font-normal text-[#94A3B8] tabular-nums">
                          0{index + 1}
                        </span>
                        {link.label}
                      </span>
                      {isActive ? (
                        <span className="h-2 w-2 bg-[#2563EB]" aria-hidden="true" />
                      ) : null}
                    </a>
                  );
                })}
              </nav>

              <div className="border-t border-white/10 p-5">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#2563EB] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
